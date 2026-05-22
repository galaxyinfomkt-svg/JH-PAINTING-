import Link from 'next/link'
import { cities, normalizeCitySlug, type City } from '@/app/data/cities'
import { getRegionForCity } from '@/app/data/regions'

interface Props {
  /** Slug of the current city (without -ma suffix). */
  citySlug: string
  /** Display name of the current city — excluded from the related list. */
  cityName: string
  /** Optional service slug. If passed, related cities link to the same service variant. */
  serviceSlug?: string
  /** Cap on related cities shown. */
  limit?: number
}

// Same-region city links surface the topical cluster Google uses for local
// service hubs: when a user lands on /massachusetts/wellesley, this component
// pushes them to Newton, Brookline, Needham — the cities a real Wellesley
// homeowner would actually consider — plus the region hub page itself.
// Without it, the city pages were dead-end leaves with no horizontal links.
export default function RelatedCities({ citySlug, cityName, serviceSlug, limit = 8 }: Props) {
  const region = getRegionForCity(citySlug)
  if (!region) return null

  const citiesBySlug = new Map<string, City>(cities.map(c => [c.slug, c]))

  const siblings = region.citySlugs
    .filter(slug => slug !== citySlug)
    .map(slug => citiesBySlug.get(slug))
    .filter((c): c is City => Boolean(c))
    .slice(0, limit)

  if (siblings.length === 0) return null

  const buildHref = (slug: string): string => {
    const path = `/massachusetts/${normalizeCitySlug(slug)}`
    return serviceSlug ? `${path}/${serviceSlug}` : path
  }

  return (
    <section
      aria-labelledby="related-cities-heading"
      style={{ padding: '3rem 0', background: '#f8f9fa' }}
    >
      <div className="container">
        <h2
          id="related-cities-heading"
          style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0a0e27' }}
        >
          Painters in Other {region.name} Communities
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
          We also serve homeowners near {cityName} across the {region.name} region.
          <Link
            href={`/regions/${region.slug}${serviceSlug ? `/${serviceSlug}` : ''}`}
            style={{ marginLeft: '0.5rem', color: '#CC0000', fontWeight: 600 }}
          >
            See the full {region.name} service hub →
          </Link>
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '0.5rem',
          }}
        >
          {siblings.map(c => (
            <Link
              key={c.slug}
              href={buildHref(c.slug)}
              style={{
                padding: '0.625rem 0.875rem',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#1a1a1a',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Painters in {c.name}, MA →
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
