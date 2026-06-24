/**
 * Indexing policy for the programmatic city × service pages.
 *
 * 117 cities × 7 services = ~819 pages whose body is mostly spun/templated
 * content. Google crawls them but won't index near-duplicate thin pages at
 * scale ("Crawled - currently not indexed"). So we only let the HIGH-DEMAND
 * combos into the index and mark the long tail `noindex, follow`:
 *   - low-volume services (commercial/carpentry/power-washing) at city level,
 *   - and any service in a small, far-out town with little search demand.
 *
 * `noindex, follow` keeps the page reachable for users AND lets link equity
 * flow through it - it just stops diluting crawl budget and the site-wide
 * quality signal, which is what frees Google to index the pages that matter.
 *
 * The dedicated /services/* pages still cover the excluded services site-wide.
 */

// Residential-intent services with real city-level search volume.
export const INDEXABLE_SERVICES = new Set<string>([
  'exterior-painting',
  'interior-painting',
  'cabinet-painting',
  'residential-painting',
])

// Population strings look like "20,000+", "3,000+", "72,000+".
export function parsePopulation(pop?: string): number {
  if (!pop) return 0
  const n = parseInt(pop.replace(/[^0-9]/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

/**
 * Should this city+service page be indexable?
 * Index when the service has demand AND the city is either sizable
 * (>= 15k people) or close to our base (<= 12 miles). Everything else is
 * noindex,follow.
 */
export function shouldIndexCityService(
  city: { population?: string; distance?: number },
  serviceSlug: string
): boolean {
  if (!INDEXABLE_SERVICES.has(serviceSlug)) return false
  const pop = parsePopulation(city.population)
  const dist = typeof city.distance === 'number' ? city.distance : 999
  return pop >= 15000 || dist <= 12
}
