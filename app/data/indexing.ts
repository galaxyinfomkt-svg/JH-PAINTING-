/**
 * Indexing policy for the programmatic city × service pages.
 *
 * POLICY CHANGE (business decision, 2026-08)
 * ------------------------------------------
 * Previously 524 of the 812 city × service pages (65%) were noindex,follow.
 * The owner's decision is to make ALL of them indexable, on the condition that
 * they are genuinely unique rather than one template with the city name
 * swapped. This file implements the indexing half of that decision; the
 * uniqueness half lives in cityServiceComposer.ts + cityFacts.ts.
 *
 * WHAT ACTUALLY CHANGED UNDER THE PAGES
 * -------------------------------------
 * Meta and body copy are no longer selected from a pool of pre-written
 * sentences by hashing the slug. They are composed from each city's own
 * attributes - distance to our Marlborough base, market tier, marine vs inland
 * exposure, real ZIP codes, real neighborhoods, real nearest cities. Measured
 * across all 812 URLs, distinct meta-description skeletons went from 35 to 603
 * and SERP overflow went from 35%/46% (title/description) to 0%/0%.
 *
 * THE HONEST CAVEAT - READ THIS BEFORE ASSUMING THE PROBLEM IS SOLVED
 * ------------------------------------------------------------------
 * Composed-from-facts copy makes the pages genuinely DIFFERENT. It does not by
 * itself make them VALUABLE. Google's bar for a local service page is
 * first-hand evidence: a photo of a job actually done in that city, a review
 * from a customer who lives there, a note about that town's permit or HOA
 * quirks. No generator can manufacture that, and inventing it would be
 * fabrication.
 *
 * So the realistic expectation is: cities WITH entries in `cityEvidence`
 * (app/data/cityFacts.ts) should hold their rankings; cities without may still
 * land in "Crawled - currently not indexed" no matter how varied the wording
 * is. That is not a bug in this file - it is Google correctly noticing that a
 * page adds no information. The fix is to fill cityEvidence from real jobs.
 *
 * If Search Console shows the long tail failing to index after this change,
 * flip REQUIRE_EVIDENCE_FOR_LONG_TAIL to true: that reverts to indexing only
 * the high-demand combos plus any city that has real proof attached.
 */

import { hasFirstHandEvidence } from './cityFacts'

/** Every service we publish city-level pages for. */
export const ALL_SERVICES = [
  'interior-painting',
  'exterior-painting',
  'commercial-painting',
  'residential-painting',
  'cabinet-painting',
  'carpentry',
  'power-washing',
] as const

/**
 * Services with genuine city-level residential search demand. Kept for the
 * fallback path below - NOT used while the open policy is active.
 */
export const HIGH_DEMAND_SERVICES = new Set<string>([
  'exterior-painting',
  'interior-painting',
  'cabinet-painting',
  'residential-painting',
])

/**
 * Escape hatch. Leave false to honour the "index everything" decision.
 * Set true if the long tail proves un-indexable and you want crawl budget back.
 */
export const REQUIRE_EVIDENCE_FOR_LONG_TAIL = false

/**
 * Population strings look like "20,000+", "3,000+", "72,000+".
 *
 * NOTE: strip non-digits BEFORE parseInt. Calling parseInt("675,000+")
 * directly returns 675 because it stops at the comma - that exact bug made the
 * population factor of the old variant hash a dead constant for all 116
 * cities. cityFacts.ts re-exports this single implementation; do not write a
 * second one.
 */
export function parsePopulation(pop?: string): number {
  if (!pop) return 0
  const n = parseInt(String(pop).replace(/[^0-9]/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

export interface IndexableCity {
  slug: string
  population?: string
  distance?: number
}

/**
 * Should this city+service page be indexable?
 *
 * Open policy (current): yes, for every real city+service combination.
 * Guarded policy (REQUIRE_EVIDENCE_FOR_LONG_TAIL = true): high-demand service
 * in a sizable-or-close city, OR any city that carries first-hand evidence.
 */
export function shouldIndexCityService(
  city: IndexableCity,
  serviceSlug: string
): boolean {
  if (!(ALL_SERVICES as readonly string[]).includes(serviceSlug)) return false

  if (!REQUIRE_EVIDENCE_FOR_LONG_TAIL) return true

  if (hasFirstHandEvidence(city.slug)) return true

  if (!HIGH_DEMAND_SERVICES.has(serviceSlug)) return false
  const pop = parsePopulation(city.population)
  const dist = typeof city.distance === 'number' ? city.distance : 999
  return pop >= 15000 || dist <= 12
}
