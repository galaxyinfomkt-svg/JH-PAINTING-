/**
 * housing.ts - real, town-level housing facts for the city and city x service pages.
 *
 * WHY THIS EXISTS
 * Search Console (Oct 2026) had ~940 of these pages in "Crawled / Discovered -
 * currently not indexed". The composed copy was different per town, but it
 * carried the same INFORMATION on every page: distance, freeze-thaw, ZIPs.
 * Google keeps pages that tell the reader something they cannot get from the
 * page next door. For a painting contractor the most useful town-level fact is
 * the housing stock: how old it is (lead paint, plaster, prep), how much of it
 * is detached single-family (full exterior elevations) and how much is rented
 * (landlord / property-manager work). Those numbers differ by town and they
 * change the job.
 *
 * SOURCE: U.S. Census Bureau, American Community Survey 5-year estimates,
 * pulled from Census Reporter by _tools/census_facts.py into censusHousing.json.
 * Numbers are rounded and cited on the page. Nothing here is estimated by us.
 *
 * Villages without their own Census geography (Cordaville, Jamaica Plain...)
 * carry their parent town's figures, and the copy says so (`dataFor`).
 */

import raw from './censusHousing.json'
import { projects, coverOf, formatCompleted, type Project } from './projects'

export interface HousingFacts {
  housingUnits: number
  pctBuiltBefore1980: number
  pctBuiltBefore1940: number
  medianYearBuilt: number | null
  pctOwnerOccupied: number | null
  pctSingleFamilyDetached: number | null
  medianHomeValue: number | null
  lat: number
  lon: number
  dataFor: string | null
}

const data = raw as { source: string; cities: Record<string, HousingFacts> }

export const HOUSING_SOURCE = data.source

export function housingFor(slug: string): HousingFacts | undefined {
  return data.cities[slug]
}

const fmt = (n: number) => n.toLocaleString('en-US')
const money = (n: number) => `$${fmt(Math.round(n / 1000) * 1000)}`
const ofTen = (pct: number) => Math.max(0, Math.min(10, Math.round(pct / 10)))

/** Stat tiles for the "Homes in {city}" block. */
export function housingStats(slug: string): { label: string; value: string }[] {
  const h = housingFor(slug)
  if (!h) return []
  const out = [
    { label: 'Homes built before 1980', value: `${h.pctBuiltBefore1980}%` },
    { label: 'Median year built', value: h.medianYearBuilt ? String(h.medianYearBuilt) : '-' },
    { label: 'Single-family detached', value: h.pctSingleFamilyDetached != null ? `${h.pctSingleFamilyDetached}%` : '-' },
    { label: 'Owner-occupied', value: h.pctOwnerOccupied != null ? `${h.pctOwnerOccupied}%` : '-' },
  ]
  return out.filter((s) => s.value !== '-')
}


/**
 * Two short paragraphs: what the numbers are, then what they change for THIS
 * service. Every sentence is either a Census figure or a consequence that holds
 * for any house with that characteristic - no claims about specific homes.
 */
export function housingNarrative(cityName: string, slug: string, serviceSlug?: string): string[] {
  const h = housingFor(slug)
  if (!h) return []
  const old = h.pctBuiltBefore1980
  const veryOld = h.pctBuiltBefore1940
  const det = h.pctSingleFamilyDetached
  const own = h.pctOwnerOccupied
  const rent = own != null ? 100 - own : null

  // A village without its own Census geography is described through its town, by name.
  const subj = h.dataFor ? `${h.dataFor}, the town that includes ${cityName},` : cityName
  const first =
    `${subj} has about ${fmt(h.housingUnits)} homes. ` +
    `${old}% were built before 1980` +
    (h.medianYearBuilt ? `, and the median home dates from ${h.medianYearBuilt}` : '') +
    `. ${veryOld >= 15 ? `${veryOld}% are older than 1940.` : ''}` +
    (det != null ? ` ${det}% are single-family detached houses` : '') +
    (own != null ? `${det != null ? ' and' : ''} ${own}% are owner-occupied.` : '.')

  const lead =
    old >= 50
      ? `With roughly ${ofTen(old)} in 10 homes here built before 1980, lead-safe work practices are the normal case, not the exception: any paint disturbed on a pre-1978 surface is covered by the EPA RRP rule.`
      : `About ${ofTen(old)} in 10 homes here predate 1980, so we confirm the build year before any sanding or scraping and switch to lead-safe practices on pre-1978 surfaces.`

  const byService: Record<string, string> = {
    'exterior-painting':
      (det != null && det >= 60
        ? `Most ${cityName} homes are detached, so an exterior job usually means four full elevations, trim and doors rather than a single facade. `
        : det != null && det >= 40
        ? `${cityName} is a mix: about half the homes are detached, the rest attached or multi-unit, so an exterior job can be four full elevations or one shared facade coordinated with neighbours. `
        : `Most ${cityName} housing is attached or multi-unit, so exterior work is often a shared facade, a porch stack or a single elevation coordinated with neighbours. `) +
      (old >= 50 ? `On older clapboard, scraping to sound wood and spot-priming bare spots is most of the job; the topcoat is the short part. ` : '') +
      lead,
    'interior-painting':
      (veryOld >= 20
        ? `With ${veryOld}% of homes older than 1940, plaster walls are common here; hairline cracks get stabilised and skim-coated before paint, or they reprint within a season. `
        : `Most ${cityName} interiors are drywall, so prep is mainly patching anchor holes and dents and sanding repairs flush before the first coat. `) +
      lead,
    'cabinet-painting':
      `Kitchen cabinets in homes built before 1978 may carry an original painted finish, so we confirm the build year before sanding doors. ` +
      `Doors and drawer fronts come off, everything is degreased and de-glossed, and the finish is sprayed rather than brushed.`,
    carpentry:
      `${old >= 50 ? `With most of the housing stock here more than 45 years old, rot` : 'Rot'} shows up first at sills, the bottom of door casings and trim joints. We cut back to sound wood and replace it before paint, rather than filling soft wood. ` +
      lead,
    'power-washing':
      (det != null && det >= 60
        ? `With ${det}% of homes detached, most ${cityName} washing jobs are full-house siding plus a deck or porch. `
        : det != null && det >= 40
        ? `About half of ${cityName}'s homes are detached and the rest attached or multi-unit, so washing jobs range from a single house and deck to a whole building. `
        : `Most of ${cityName}'s housing is attached or multi-unit, so washing is often scheduled by building rather than by house. `) +
      `We soft-wash siding and keep pressure for hard surfaces and decks, which matters more on older boards.`,
    'commercial-painting':
      (rent != null && rent >= 35
        ? `About ${rent}% of ${cityName} homes are renter-occupied, so a good share of local work is for landlords and property managers: turnovers between tenants and common areas done without closing the building. `
        : `Commercial work in ${cityName} is scheduled after hours or by section so the business keeps running. `) +
      lead,
    'residential-painting':
      `Whether it's inside, outside or both, the age of the house sets the prep. ` + lead,
  }

  const second = serviceSlug ? byService[serviceSlug] ?? lead : lead
  return [first.replace(/\s+/g, ' ').trim(), second]
}

/** Housing-based FAQ entries for city x service pages. */
export function housingFaq(cityName: string, slug: string, serviceSlug: string): { question: string; answer: string }[] {
  const h = housingFor(slug)
  if (!h) return []
  const [facts, impact] = housingNarrative(cityName, slug, serviceSlug)
  const out = [
    { question: `How old are the homes in ${cityName}, and why does it matter for the job?`, answer: `${facts} ${impact}` },
  ]
  const near = nearestProject(slug, serviceSlug)
  if (near) {
    out.push({
      question: `What's the closest job you've completed to ${cityName}?`,
      answer: (near.sameTown
        ? `Right here in ${cityName}: ${near.project.title.toLowerCase()}${near.project.completed ? `, finished in ${formatCompleted(near.project.completed)}` : ''}.`
        : `${near.project.city}, about ${near.miles} miles from ${cityName}: ${near.project.title.toLowerCase()}${near.project.space ? ` (${near.project.space.toLowerCase()})` : ''}${near.project.completed ? `, finished in ${formatCompleted(near.project.completed)}` : ''}.`) +
        (near.project.pairs?.length ? ' Before-and-after photos are on our projects page.' : ' Photos are on our projects page.'),
    })
  }
  return out
}

function miles(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 3958.8, toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon)
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(x))
}

/**
 * The nearest documented job (real photos in projects.ts), by straight-line
 * distance between town centres. Prefers jobs with a before/after pair.
 */
export function nearestProject(slug: string, serviceSlug?: string):
  | { project: Project; miles: number; sameTown: boolean }
  | undefined {
  const here = housingFor(slug)
  if (!here) return undefined
  // Score = miles, minus a bonus for the same trade and for having a before/after pair,
  // so a matching job a few miles further still wins over an unrelated one next door.
  const ranked = projects
    .filter((p) => p.citySlug && housingFor(p.citySlug))
    .map((p) => {
      const d = p.citySlug === slug ? 0 : miles(here, housingFor(p.citySlug as string) as HousingFacts)
      const score = d - (serviceSlug && p.service === serviceSlug ? 8 : 0) - (p.pairs?.length ? 2 : 0)
      return { p, d, score }
    })
    .sort((a, b) => a.score - b.score)
  const best = ranked[0]
  if (!best) return undefined
  return { project: best.p, miles: Math.max(1, Math.round(best.d)), sameTown: best.d === 0 }
}

export { coverOf }
