/**
 * cityServiceComposer.ts - builds title / description / body copy for the
 * 116 x 7 city+service pages from FACTS, not from a variant pool.
 *
 * The old path (generateServiceContent + serviceVariantsExpansion) hashed the
 * slug and pulled sentence N of 8. Measured output: 35 distinct <title>
 * skeletons across 812 URLs. This module instead composes each string from the
 * city's own attributes - market tier, proximity tier, exposure profile, ZIP
 * coverage, real neighborhoods - so two cities differ because they ARE
 * different, and the difference is checkable against the dataset.
 *
 * Title length is enforced structurally: the builder measures as it assembles
 * and drops optional segments before it can overflow the SERP. 35% of the old
 * titles were over 60 chars and 46% of descriptions over 160 (worst case 226).
 */

import type { City } from './cities'
import { getCityState } from './cities'
import {
  marketTier,
  proximityTier,
  exposureProfile,
  accessProfile,
  schedulingNote,
  zipNote,
  nearbyCities,
  localAnchors,
  getCityEvidence,
} from './cityFacts'

export const SERVICE_LABELS: Record<string, string> = {
  'interior-painting': 'Interior Painting',
  'exterior-painting': 'Exterior Painting',
  'commercial-painting': 'Commercial Painting',
  'residential-painting': 'Residential Painting',
  'cabinet-painting': 'Cabinet Refinishing',
  carpentry: 'Carpentry & Rot Repair',
  'power-washing': 'Power Washing',
}

/** Short noun for tight title slots. */
const SERVICE_SHORT: Record<string, string> = {
  'interior-painting': 'Interior Painters',
  'exterior-painting': 'Exterior Painters',
  'commercial-painting': 'Commercial Painters',
  'residential-painting': 'House Painters',
  'cabinet-painting': 'Cabinet Refinishing',
  carpentry: 'Carpentry & Rot Repair',
  'power-washing': 'Power Washing',
}

const MAX_TITLE = 60
const MAX_DESC = 158

/**
 * Assemble a title from segments, appending only what still fits.
 * Guarantees <= MAX_TITLE without truncating mid-word.
 */
function fitTitle(base: string, optional: string[], sep = ' | '): string {
  let out = base
  for (const seg of optional) {
    const next = `${out}${sep}${seg}`
    if (next.length <= MAX_TITLE) out = next
    else break
  }
  return out
}

/**
 * Assemble a description that ALWAYS ends with the call-to-action.
 *
 * The naive version - append while it fits, break on the first overflow - drops
 * everything after the first long segment, which silently deleted the phone
 * number from any city whose middle sentences ran long (Worcester lost both the
 * license line and the CTA). Reserve the tail first, then fill the middle with
 * whatever fits, skipping oversized segments instead of aborting.
 */
function fitDesc(lead: string, middle: string[], tail: string): string {
  const budget = MAX_DESC - tail.length - 1
  let out = lead.length <= budget ? lead : lead.slice(0, budget).trimEnd()
  for (const s of middle) {
    const next = `${out} ${s}`
    if (next.length <= budget) out = next
    // too long: skip this segment, keep trying the shorter ones
  }
  return `${out} ${tail}`
}

export interface ComposedMeta {
  title: string
  description: string
  keywords: string
}

/**
 * The differentiator that leads the title. Chosen by the city's own facts, so
 * neighbouring towns of different size/distance get different angles.
 */
function titleAngle(city: City, serviceSlug: string): string | null {
  const prox = proximityTier(city)
  const mkt = marketTier(city)

  if (prox === 'home-turf') return 'Local Crew'
  if (serviceSlug === 'exterior-painting') {
    return exposureProfile(city).label === 'marine-influenced' ? 'Salt-Air Rated' : 'Freeze-Thaw Prep'
  }
  if (serviceSlug === 'cabinet-painting') return 'Spray Finish'
  if (serviceSlug === 'carpentry') return 'Rot Repair'
  if (serviceSlug === 'power-washing') return 'Soft Wash'
  if (serviceSlug === 'commercial-painting') return 'After Hours'
  if (mkt === 'city') return 'Permit Ready'
  return null
}

export function composeMeta(city: City, serviceSlug: string): ComposedMeta {
  const st = getCityState(city)
  const short = SERVICE_SHORT[serviceSlug] ?? SERVICE_LABELS[serviceSlug] ?? serviceSlug
  const label = SERVICE_LABELS[serviceSlug] ?? serviceSlug

  // ---- title: "<Service> <City>, <ST>" + as many qualifiers as fit ----
  const base = `${short} ${city.name}, ${st}`
  const angle = titleAngle(city, serviceSlug)
  const title = fitTitle(base, [angle, 'JH Painting'].filter(Boolean) as string[])

  // ---- description: composed from this city's real attributes ----
  const anchors = localAnchors(city)
  const hood = anchors.neighborhoods[0]
  const zips = city.zipCodes ?? []
  const exposure = exposureProfile(city)

  const lead = `${label} in ${city.name}, ${st} by JH Painting Services.`

  // Ordered most-specific first: whatever fits gets in, the CTA is guaranteed.
  const middle: string[] = []
  if (proximityTier(city) === 'home-turf') {
    middle.push(`We're ${city.distance.toFixed(0)} miles away, so the same crew starts and finishes.`)
  } else if (hood) {
    middle.push(`Serving ${hood} and the rest of ${city.name}.`)
  } else if (city.county) {
    middle.push(`Serving ${city.name} and ${city.county}.`)
  }

  if (serviceSlug === 'exterior-painting') {
    middle.push(
      exposure.label === 'marine-influenced'
        ? 'Salt-air spec: back-primed trim, marine-grade caulk.'
        : 'Freeze-thaw prep: moisture control before topcoat.'
    )
  } else if (zips.length === 1) {
    middle.push(`ZIP ${zips[0]}.`)
  }
  middle.push('Licensed, $2M insured, EPA Lead-Safe.')

  const description = fitDesc(lead, middle, 'Free estimate: (508) 690-8886')

  // ---- keywords: grounded in real place names, not repeated boilerplate ----
  const kw = [
    `${label.toLowerCase()} ${city.name} ${st}`,
    `${city.name} ${short.toLowerCase()}`,
    ...anchors.neighborhoods.slice(0, 2).map((n) => `painters ${n}`),
    city.county ? `${label.toLowerCase()} ${city.county}` : null,
    zips[0] ? `painters ${zips[0]}` : null,
  ].filter(Boolean) as string[]

  return { title, description, keywords: kw.join(', ') }
}

// ─────────────────────────────────────────────────────────────────────────────
// Body copy
// ─────────────────────────────────────────────────────────────────────────────

export interface ComposedBody {
  intro: string
  /** Local conditions section - genuinely city-specific. */
  conditions: string
  /** Logistics / access - derived from market + proximity tier. */
  logistics: string
  /** Coverage line built from real ZIPs and neighborhoods. */
  coverage: string
  /** Nearby cities, computed by real proximity - for internal linking. */
  nearby: { name: string; slug: string }[]
  /** First-hand proof if the business has entered any for this city. */
  evidence: ReturnType<typeof getCityEvidence>
  /** True when this page carries more than generated copy. */
  hasProof: boolean
  /** What actually goes wrong on THIS city's buildings, for this service. */
  painPoints: { title: string; desc: string; solution: string }[]
  /** Reasons grounded in this city's facts, not generic badges. */
  whyChooseUs: string[]
  /** Questions answered with this city's real numbers. */
  faq: { question: string; answer: string }[]
  /** Closing paragraph, city-aware. */
  closingPitch: string
  /** One-line summary used as the section subhead. */
  summary: string

  // ---- names the existing city+service page template already reads ----
  /** Alias of `intro`. */
  heroIntro: string
  /** Alias of `summary`. */
  uniqueDescription: string
  /**
   * conditions + logistics + coverage joined. The template renders one
   * "local context" block, and all three are city-specific, so they belong
   * together rather than one being dropped.
   */
  localContext: string
}

/**
 * Failure modes stated in terms of this city's exposure and building stock.
 * The service decides WHAT fails; the city decides WHY it fails here.
 */
function composePainPoints(
  city: City,
  serviceSlug: string
): { title: string; desc: string; solution: string }[] {
  const exp = exposureProfile(city)
  const isMarine = exp.label === 'marine-influenced'
  const tier = marketTier(city)
  const dense = tier === 'city' || tier === 'large-town'

  const climate = isMarine
    ? {
        title: 'Salt air is opening your joints',
        desc: `In ${city.name}, airborne salt and summer humidity attack end grain first. Failure shows up at trim joints, window sills and the underside of clapboards long before the flat surfaces look tired.`,
        solution: 'Back-primed replacements, marine-grade elastomeric caulk at every joint',
      }
    : {
        title: 'Freeze-thaw is lifting the film',
        desc: `${city.name} runs a full inland freeze-thaw cycle. Water gets behind the paint in autumn, freezes, and pushes the film off in sheets by spring - which is why a coat applied over damp substrate rarely reaches year three.`,
        solution: 'Moisture readings before topcoat, no application over damp substrate',
      }

  const access = dense
    ? {
        title: 'Tight lots make prep get skipped',
        desc: `Crews working close quarters in ${city.name} tend to shortcut staging - and prep is the first thing cut when the ladder has nowhere to go.`,
        solution: 'Compact staging rigs and one elevation at a time, so prep is never the compromise',
      }
    : {
        title: 'Full-elevation work gets split across visits',
        desc: `Open lots in ${city.name} let a crew run whole elevations at once, but contractors who juggle several towns a day leave lap marks where they stopped and restarted.`,
        solution: 'Blocked scheduling so each elevation is coated wet-edge, start to finish',
      }

  const byService: Record<string, { title: string; desc: string; solution: string }> = {
    'exterior-painting': {
      title: 'Paint applied over the last failure',
      desc: 'Recoating without removing the failing layer buys one season. The new film is only as sound as what it sits on.',
      solution: 'Scrape to sound substrate, spot-prime bare wood, then two full coats',
    },
    'interior-painting': {
      title: 'Old plaster telegraphing through',
      desc: `Plenty of ${city.name} interiors are plaster over lath, not drywall. Fresh paint over unrepaired hairline cracks simply reprints them within a season.`,
      solution: 'Crack stabilisation and skim-coat before any finish goes on',
    },
    'cabinet-painting': {
      title: 'Brush marks where a spray finish belongs',
      desc: 'Cabinet doors show every ridge. A rolled or brushed finish reads as a repaint from across the room - the whole point is that it should not.',
      solution: 'Degrease, de-gloss, then sprayed catalysed finish, doors done off-site',
    },
    carpentry: {
      title: 'Rot painted over instead of cut out',
      desc: 'Filler over soft wood hides the problem for a season and traps moisture against sound framing behind it.',
      solution: 'Cut back to sound wood, splice new stock, prime all six faces before install',
    },
    'power-washing': {
      title: 'Pressure used where soft wash is needed',
      desc: 'High pressure on siding drives water behind the boards and etches the surface. The stain lifts; so does the substrate.',
      solution: 'Soft wash with the right detergent dwell time, pressure matched to material',
    },
    'commercial-painting': {
      title: 'Work that shuts down your floor',
      desc: 'A daytime crew in an occupied building costs more in lost trading than the paint does.',
      solution: 'After-hours and weekend scheduling, contained work zones, morning handback',
    },
    'residential-painting': {
      title: 'Interior and exterior run as two disconnected jobs',
      desc: 'Two contractors, two schedules, and a seam where neither takes responsibility.',
      solution: 'One crew, one written scope covering the whole property',
    },
  }

  const svc = byService[serviceSlug]
  return [climate, svc, access].filter(Boolean) as {
    title: string
    desc: string
    solution: string
  }[]
}

/** Reasons that reference this city's real numbers rather than generic badges. */
function composeWhyChooseUs(city: City, serviceSlug: string): string[] {
  const st = getCityState(city)
  const out: string[] = []
  const prox = proximityTier(city)

  if (prox === 'home-turf') {
    out.push(`Based ${city.distance.toFixed(1)} miles away in Marlborough - ${city.name} is day-trip range, so no travel surcharge and no rotating crews`)
  } else if (prox === 'core') {
    out.push(`${city.name} sits inside our daily service loop at ${city.distance.toFixed(1)} miles - the crew that starts your job finishes it`)
  } else {
    out.push(`We schedule ${city.name} work in blocks so the crew stays on your property rather than splitting the day across towns`)
  }

  const z = city.zipCodes ?? []
  if (z.length > 1) out.push(`Covering all ${z.length} ${city.name} ZIP codes, not just the town centre`)
  else if (z.length === 1) out.push(`Covering ${city.name} ZIP ${z[0]}`)

  const hoods = city.neighborhoods ?? []
  if (hoods.length >= 2) out.push(`Familiar with ${hoods.slice(0, 3).join(', ')} and the housing stock in each`)

  out.push(
    exposureProfile(city).label === 'marine-influenced'
      ? `Spec built for eastern ${st} exposure: back-primed trim and marine-grade caulk at every joint`
      : `Spec built for inland freeze-thaw: moisture readings before any topcoat goes on`
  )
  out.push('Licensed, $2M insured and EPA Lead-Safe certified for pre-1978 buildings')
  out.push('Written scope before work starts - what is included, what is not, and the sequence')
  return out
}

/** FAQ answered with this city's actual numbers. */
function composeFaq(city: City, serviceSlug: string): { question: string; answer: string }[] {
  const st = getCityState(city)
  const label = (SERVICE_LABELS[serviceSlug] ?? serviceSlug).toLowerCase()
  const z = city.zipCodes ?? []
  const hoods = city.neighborhoods ?? []
  const exp = exposureProfile(city)

  const faq = [
    {
      question: `Do you cover all of ${city.name}, ${st}?`,
      answer: `${zipNote(city) ?? `We cover ${city.name} in full.`}${
        hoods.length ? ` ${hoods.slice(0, 3).join(', ')} included.` : ''
      } We're ${city.distance.toFixed(1)} miles from our Marlborough base, ${
        proximityTier(city) === 'home-turf' || proximityTier(city) === 'core'
          ? 'which puts you inside our daily service loop.'
          : 'so we schedule work here in blocks rather than single-room visits.'
      }`,
    },
    {
      question: `What makes ${label} different in ${city.name} than elsewhere?`,
      answer: exp.detail,
    },
    {
      question: `How do you handle access and staging on ${city.name} properties?`,
      answer: accessProfile(city),
    },
    {
      question: `Is my ${city.name} home likely to need lead-safe work?`,
      answer: `Any building put up before 1978 may contain lead paint, and disturbing it is regulated under the EPA RRP rule regardless of which town you're in. We're EPA Lead-Safe certified and we test before disturbing painted surfaces on older ${city.name} properties rather than assuming. If your home is newer, that step simply doesn't apply.`,
    },
  ]
  return faq
}

function composeClosing(city: City, serviceSlug: string): string {
  const st = getCityState(city)
  const label = (SERVICE_LABELS[serviceSlug] ?? serviceSlug).toLowerCase()
  return `If you want ${label} done in ${city.name}, ${st}, the next step is a walk-through: we look at the actual surfaces, tell you what needs repair before coating and what doesn't, and put the scope in writing before anything starts. ${schedulingNote(
    city
  )} Call (508) 690-8886.`
}

export function composeBody(city: City, serviceSlug: string): ComposedBody {
  const st = getCityState(city)
  const label = SERVICE_LABELS[serviceSlug] ?? serviceSlug
  const anchors = localAnchors(city)
  const exposure = exposureProfile(city)
  const ev = getCityEvidence(city.slug)

  const hoods = anchors.neighborhoods
  const marks = anchors.landmarks

  const introParts = [
    `JH Painting Services handles ${label.toLowerCase()} for homes and buildings in ${city.name}, ${st}.`,
    schedulingNote(city),
  ]
  if (marks.length) {
    introParts.push(
      `We've worked across ${city.name} - from the streets around ${marks[0]}${marks[1] ? ` to ${marks[1]}` : ''}.`
    )
  }

  const coverageBits: string[] = []
  const z = zipNote(city)
  if (z) coverageBits.push(z)
  if (hoods.length) {
    coverageBits.push(
      hoods.length === 1
        ? `${hoods[0]} included.`
        : `That includes ${hoods.slice(0, -1).join(', ')} and ${hoods[hoods.length - 1]}.`
    )
  }
  if (city.county) coverageBits.push(`${city.name} sits in ${city.county}.`)

  const intro = introParts.join(' ')
  const conditions = exposure.detail
  const logistics = accessProfile(city)
  const coverage = coverageBits.join(' ')
  const summary = `${label} for ${city.name}, ${st} homes and buildings${
    city.county ? ` in ${city.county}` : ''
  }.`

  return {
    intro,
    conditions,
    logistics,
    coverage,
    heroIntro: intro,
    uniqueDescription: summary,
    localContext: [conditions, logistics, coverage].filter(Boolean).join(' '),
    nearby: nearbyCities(city, 4).map((c) => ({
      name: c.name,
      slug: c.slug.endsWith('-ma') ? c.slug.slice(0, -3) : c.slug,
    })),
    evidence: ev,
    hasProof: ev !== undefined,
    painPoints: composePainPoints(city, serviceSlug),
    whyChooseUs: composeWhyChooseUs(city, serviceSlug),
    faq: composeFaq(city, serviceSlug),
    closingPitch: composeClosing(city, serviceSlug),
    summary,
  }
}
