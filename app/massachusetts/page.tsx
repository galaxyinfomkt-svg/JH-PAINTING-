import type { Metadata } from 'next'
import Link from 'next/link'
import { cities, normalizeCitySlug } from '@/app/data/cities'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  // Title trimmed 67 → 55 chars. Dropped redundant "Find Your Local
  // Painter" - the URL itself + "Near Me" already signal that.
  title: 'Painters Near Me MA | 117+ Cities | JH Painting',
  // Description trimmed 200 → 152 chars. Cut the question phrasing
  // ("Looking for...?") that wastes SERP characters before the trust
  // signals; led directly with the city count + named cities.
  description: 'Painters near you across 117+ MA cities: Boston, Worcester, Cambridge, Newton, Framingham. 5.0★ from 40+ reviews. Free quote: (508) 690-8886',
  path: '/massachusetts',
  ogImageAlt: 'Painters Near Me Massachusetts - JH Painting Service Areas',
  keywords: [
    'painters near me Massachusetts',
    'painters near me MA',
    'house painters near me',
    'local painters Massachusetts',
    'painting contractors MA',
    'painters Boston',
    'painters Worcester',
    'painters Cambridge',
    'painters Newton',
    'painters Framingham',
    'find painters MA',
    'painting services my area',
  ].join(', '),
})

export default function MassachusettsPage() {
  // Group cities by distance range
  const nearbyHQ = cities.filter(c => c.distance <= 10)
  const nearby = cities.filter(c => c.distance > 10 && c.distance <= 20)
  const extended = cities.filter(c => c.distance > 20)

  // Build ItemList schema for all cities
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'JH Painting Services - Massachusetts Service Areas',
    description: 'Professional painting services available in ' + cities.length + '+ cities across Massachusetts. Licensed, $2M insured, EPA Lead-Safe certified.',
    numberOfItems: cities.length,
    itemListElement: cities.map((city, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: city.name + ', Massachusetts',
      url: 'https://jhpaintingservices.com/massachusetts/' + normalizeCitySlug(city.slug),
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://jhpaintingservices.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Massachusetts Service Areas',
        item: 'https://jhpaintingservices.com/massachusetts',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <main className="cities-index-page">
      {/* Hero Section */}
      <section className="cities-hero">
        <div className="container">
          <h1>Painters Near Me in Massachusetts - {cities.length}+ Cities Served</h1>
          <p className="cities-hero-subtitle">
            Professional painting services across <strong>{cities.length}+ cities</strong> in Massachusetts.
            <br />Licensed, insured, and trusted by homeowners statewide.
          </p>
          <a href="tel:+15086908886" className="btn btn-primary btn-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call (508) 690-8886
          </a>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="cities-list-section">
        <div className="container">
          {/* Near HQ */}
          <div className="cities-group">
            <h2>
              <span className="cities-group-badge">Near HQ</span>
              Cities Within 10 Miles of Marlborough
            </h2>
            <div className="cities-grid">
              {nearbyHQ.map((city) => (
                <Link
                  key={city.slug}
                  href={`/massachusetts/${normalizeCitySlug(city.slug)}`}
                  className="city-card"
                  aria-label={`Painters in ${city.name}, MA - JH Painting Services`}
                  title={`Painters in ${city.name}, MA - JH Painting Services`}
                >
                  <span className="city-name">{city.name}, MA Painters</span>
                  <span className="city-meta">{city.county}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* 10-20 miles */}
          <div className="cities-group">
            <h2>Cities 10-20 Miles</h2>
            <div className="cities-grid">
              {nearby.map((city) => (
                <Link
                  key={city.slug}
                  href={`/massachusetts/${normalizeCitySlug(city.slug)}`}
                  className="city-card"
                  aria-label={`Painters in ${city.name}, MA - JH Painting Services`}
                  title={`Painters in ${city.name}, MA - JH Painting Services`}
                >
                  <span className="city-name">{city.name}, MA Painters</span>
                  <span className="city-meta">{city.county}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Extended service area */}
          <div className="cities-group">
            <h2>Extended Service Area (20+ Miles)</h2>
            <div className="cities-grid">
              {extended.map((city) => (
                <Link
                  key={city.slug}
                  href={`/massachusetts/${normalizeCitySlug(city.slug)}`}
                  className="city-card"
                  aria-label={`Painters in ${city.name}, MA - JH Painting Services`}
                  title={`Painters in ${city.name}, MA - JH Painting Services`}
                >
                  <span className="city-name">{city.name}, MA Painters</span>
                  <span className="city-meta">{city.county}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cities-cta">
        <div className="container">
          <h2>Don&apos;t See Your City?</h2>
          <p>We may still serve your area! Call us to check availability.</p>
          <a href="tel:+15086908886" className="btn btn-primary btn-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call (508) 690-8886
          </a>
        </div>
      </section>
    </main>
    </>
  )
}
