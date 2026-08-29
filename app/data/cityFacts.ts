/**
 * cityFacts.ts - the factual substrate for city and city+service pages.
 *
 * WHY THIS EXISTS
 * ---------------
 * The previous approach generated "unique" pages by hashing the city slug and
 * picking a sentence from a pool of 5-8 pre-written variants. Measured against
 * the real dataset that produced 35 distinct <title> skeletons for 812 URLs -
 * about 23 pages per skeleton, differing only by the city name. That is the
 * definition of a doorway page, and no amount of extra variants fixes it,
 * because Google does not score lexical diversity. It scores whether a page
 * carries information the other pages do not.
 *
 * So this module does not store prose. It stores FACTS, and the composer
 * derives prose from them. Two cities produce different copy because they have
 * different attributes - not because a hash landed on a different index.
 *
 * THE HONESTY RULE
 * ----------------
 * Every value here is either (a) already present in cities.ts, i.e. data the
 * business supplied, or (b) computed from it by a pure function you can read.
 * Nothing is invented. There are deliberately NO fabricated statistics - no
 * "68% of homes here are pre-1978", no made-up permit fees, no invented median
 * home age. That kind of number is exactly what got audited as unverifiable
 * claim, and inventing more of it would trade one quality problem for a worse
 * credibility problem.
 *
 * Where genuinely differentiating local knowledge is missing, the honest fix is
 * `cityEvidence` at the bottom: real project photos, real reviews, real job
 * notes, entered per city by the business. That is the only content that can
 * make 116 city pages permanently defensible, and it is the ceiling on how far
 * generated copy can carry this section of the site.
 */

import { cities, type City } from './cities'
import { projects } from './projects'

// ─────────────────────────────────────────────────────────────────────────────
// Population parsing - ONE implementation.
// cities.ts stores population as "72,000+". The variant hash used to call
// parseInt() on that directly, which stops at the comma: parseInt("675,000+")
// returns 675. Every one of the 116 cities therefore landed in the "<5000"
// bucket and the "population factor" of the multi-factor hash was dead code.
// ─────────────────────────────────────────────────────────────────────────────
export function parsePopulation(pop?: string): number {
  if (!pop) return 0
  const n = parseInt(String(pop).replace(/[^0-9]/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

// ─────────────────────────────────────────────────────────────────────────────
// Derived, verifiable dimensions
// ─────────────────────────────────────────────────────────────────────────────

/** How big the local market is. Drives which concerns the copy leads with. */
export type MarketTier = 'city' | 'large-town' | 'town' | 'village'

export function marketTier(city: City): MarketTier {
  const p = parsePopulation(city.population)
  if (p >= 50000) return 'city'
  if (p >= 20000) return 'large-town'
  if (p >= 7000) return 'town'
  return 'village'
}

/** Crew logistics, straight from the real distance to the Marlborough base. */
export type ProximityTier = 'home-turf' | 'core' | 'extended' | 'outer'

export function proximityTier(city: City): ProximityTier {
  const d = city.distance
  if (d <= 8) return 'home-turf'
  if (d <= 16) return 'core'
  if (d <= 25) return 'extended'
  return 'outer'
}

/**
 * Scheduling language tied to the actual distance. Not a promise the business
 * cannot keep - the tiers were chosen so the closest towns get the strongest
 * claim and the far ones get an honest one.
 */
/** The town the business is actually based in. */
export const HQ_SLUG = 'marlborough'

export function schedulingNote(city: City): string {
  // Marlborough is the shop itself. Its distance is 0, so the generic
  // "N miles from our Marlborough shop" line would read "Marlborough is 0.0
  // miles from our Marlborough shop".
  if (city.slug === HQ_SLUG) {
    return `${city.name} is where the shop is. Our crews start the day here, which means a walk-through can usually happen the same week and a small job does not have to wait for a full crew day to be worth the trip.`
  }
  switch (proximityTier(city)) {
    case 'home-turf':
      return `${city.name} is ${city.distance.toFixed(1)} miles from our Marlborough shop, so our crews are on site without a travel surcharge and we can usually walk the job within a couple of days.`
    case 'core':
      return `At ${city.distance.toFixed(1)} miles out, ${city.name} sits inside our daily service loop - the same crew starts and finishes your job rather than rotating between distant sites.`
    case 'extended':
      return `${city.name} is ${city.distance.toFixed(1)} miles from our base. We schedule work here in blocks so the crew stays on your property start to finish instead of splitting days.`
    case 'outer':
      return `${city.name} is at the outer edge of our service area, ${city.distance.toFixed(1)} miles out. We take work here as full-property projects rather than single rooms, so the trip is worth it for both sides.`
  }
}

/**
 * What actually attacks paint on this property, by geography. Inland Worcester
 * County towns live on freeze-thaw; the eastern Suffolk/Norfolk edge adds
 * marine air. Both are real, both change the product spec.
 */
export function exposureProfile(city: City): { label: string; detail: string } {
  const county = city.county || ''
  const marine = /Suffolk|Norfolk|Bristol|Providence/.test(county)
  if (marine) {
    return {
      label: 'marine-influenced',
      detail: `${city.name} sits in the eastern, marine-influenced part of our area. Airborne salt and high summer humidity push paint failure at the joints first - end grain, sills, and the underside of trim - so caulk grade and back-priming matter more here than film thickness does.`,
    }
  }
  return {
    label: 'inland freeze-thaw',
    detail: `${city.name} is inland, where the driver is freeze-thaw: water gets behind the film in the fall, freezes, and lifts it in sheets by spring. That makes moisture control during prep - not the paint brand - the thing that decides whether the job lasts eight years or two.`,
  }
}

/**
 * Access and staging constraints, derived from market size. A Boston
 * triple-decker block and a Bolton lot are genuinely different jobs.
 */
export function accessProfile(city: City): string {
  switch (marketTier(city)) {
    case 'city':
      return `Working in ${city.name} means dealing with permit parking, tight setbacks, and neighbors within arm's reach of the ladder. We stage compact, pull permits where the city requires them, and keep the sidewalk clear.`
    case 'large-town':
      return `${city.name} properties usually give us driveway staging but not much side yard, so we sequence one elevation at a time and keep your access open throughout.`
    case 'town':
      return `Most ${city.name} properties have room to stage equipment on site, which means we can run full elevations at once and finish faster than a tight urban lot allows.`
    case 'village':
      return `${city.name} jobs are typically open-lot properties where we can set up scaffolding and run the whole exterior in one sequence, with no parking permits to chase.`
  }
}

/** Real ZIP coverage - straight from the dataset, no invention. */
export function zipNote(city: City): string | null {
  const z = city.zipCodes
  if (!z || z.length === 0) return null
  if (z.length === 1) return `We cover ZIP ${z[0]}.`
  if (z.length <= 4) return `We cover ZIPs ${z.slice(0, -1).join(', ')} and ${z[z.length - 1]}.`
  return `We cover all ${z.length} ${city.name} ZIP codes, ${z[0]} through ${z[z.length - 1]}.`
}

/**
 * Genuinely nearby cities: same county, closest by real distance-from-base
 * delta. Replaces the fixed ['Marlborough','Framingham','Worcester','Natick']
 * that every generated city page repeated regardless of geography.
 */
export function nearbyCities(city: City, limit = 4): City[] {
  return cities
    .filter((c) => c.slug !== city.slug)
    .map((c) => ({
      c,
      score:
        Math.abs(c.distance - city.distance) +
        (c.county === city.county ? 0 : 14),
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((x) => x.c)
}

/** Neighborhoods / landmarks the business already recorded for this city. */
export function localAnchors(city: City): { neighborhoods: string[]; landmarks: string[] } {
  return {
    neighborhoods: city.neighborhoods ?? [],
    landmarks: city.landmarks ?? [],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// cityEvidence - the part that actually decides whether these pages survive.
//
// Generated copy built from the facts above makes each page genuinely
// different. It does NOT make each page *valuable* - only first-hand evidence
// does that, and no code can synthesise it. Fill this in from real jobs.
//
// A city with an entry here should outrank a city without one, and the
// indexing policy in indexing.ts reads exactly that signal.
// ─────────────────────────────────────────────────────────────────────────────
export interface CityProject {
  /** What was actually done: "1908 Victorian, full exterior repaint + sill replacement" */
  summary: string
  /** Street, neighborhood, or development - anything that proves presence. */
  where?: string
  /** Real photo URL from the job. */
  image?: string
  /** Month/year completed, e.g. "2025-06". */
  completed?: string
  /** Verbatim customer words, only if the customer actually said them. */
  quote?: string
  /** Attribution as shown publicly, e.g. "Emily C." */
  quoteBy?: string
}

export interface CityEvidence {
  projects: CityProject[]
  /** Anything true and specific: local permit quirks, HOA rules, common housing stock. */
  notes?: string[]
}

/**
 * Derived from app/data/projects.ts - the real portfolio.
 *
 * This is NOT hand-written. It reads the same photographs shown on /projects,
 * so a city page can never claim work that the portfolio cannot show. Add a
 * project to projects.ts and the matching city page gains its evidence
 * automatically; there is no second list to keep in sync and no way to seed a
 * plausible-sounding job that does not exist.
 */
export const cityEvidence: Record<string, CityEvidence> = (() => {
  const map: Record<string, CityEvidence> = {}
  for (const p of projects) {
    if (!p.citySlug) continue
    const entry = (map[p.citySlug] ??= { projects: [] })
    entry.projects.push({
      summary: `${p.client ? `${p.client}: ` : ''}${p.title}${p.space ? ` (${p.space})` : ''}`,
      where: p.city ? `${p.city}, ${p.state}` : undefined,
      image: p.photos[0]?.src,
      completed: p.completed,
    })
  }
  return map
})()

export function getCityEvidence(slug: string): CityEvidence | undefined {
  const e = cityEvidence[slug]
  return e && e.projects.length > 0 ? e : undefined
}

/** Cities where we can show photographic proof of completed work. */
export const citiesWithEvidence = Object.keys(cityEvidence).sort()

/** True when a city page carries first-hand proof, not just generated copy. */
export function hasFirstHandEvidence(slug: string): boolean {
  return getCityEvidence(slug) !== undefined
}
