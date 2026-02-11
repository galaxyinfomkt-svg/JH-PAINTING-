import type { Metadata } from 'next'
import Link from 'next/link'
import { cities, getCitySlugWithState } from '@/app/data/cities'

export const metadata: Metadata = {
  title: 'Painters Near Me MA | 140+ Cities Served | Find Your Local Painter ⭐',
  description: 'Looking for painters near you in Massachusetts? We serve 140+ cities: Boston, Worcester, Cambridge, Newton, Framingham & more. 40+ 5-star reviews. Licensed & $2M insured. FREE quote → (508) 690-8886',
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
  openGraph: {
    title: 'Find Painters Near You | 140+ MA Cities | JH Painting',
    description: 'Professional painters serving 140+ Massachusetts cities. Find your local painter. 40+ 5-star reviews. Licensed & $2M insured.',
    url: 'https://jhpaintingservices.com/cities',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'Painters Near Me Massachusetts - JH Painting Service Areas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Painters Near Me MA | 140+ Cities ⭐',
    description: 'Find professional painters in your Massachusetts city. 40+ 5-star reviews.',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
    creator: '@jhpaintingma',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/cities',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function CitiesPage() {
  // Group cities by distance range
  const nearbyHQ = cities.filter(c => c.distance <= 10)
  const nearby = cities.filter(c => c.distance > 10 && c.distance <= 20)
  const extended = cities.filter(c => c.distance > 20)

  return (
    <main className="cities-index-page">
      {/* Hero Section */}
      <section className="cities-hero">
        <div className="container">
          <h1>Service Areas</h1>
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
                  href={`/cities/${getCitySlugWithState(city.slug)}`}
                  className="city-card"
                >
                  <span className="city-name">{city.name}</span>
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
                  href={`/cities/${getCitySlugWithState(city.slug)}`}
                  className="city-card"
                >
                  <span className="city-name">{city.name}</span>
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
                  href={`/cities/${getCitySlugWithState(city.slug)}`}
                  className="city-card"
                >
                  <span className="city-name">{city.name}</span>
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
  )
}
