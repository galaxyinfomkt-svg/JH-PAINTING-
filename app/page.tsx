import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import HomeHeader from './components/HomeHeader'
import LazyIframe from './components/LazyIframe'
import ReviewsWidget from './components/ReviewsWidget'
import Footer from './components/Footer'
import { generatePageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/siteConfig'
import { CITY_COUNT } from '@/app/data/cities'
import HomeGallery from './components/HomeGallery'
import { HV2Hero, HV2Services, HV2Results, HV2About, HV2Reviews, HV2Cta } from './components/HomeV2'

/**
 * HOME page metadata.
 * Title is brand-first + phone (~62 chars, fits SERP without truncation).
 * Description leads with the value prop, lists trust signals, and CLOSES WITH
 * THE PHONE NUMBER - that's the lever that makes Google render the tel right
 * inside the snippet (Wolfs Siding gets its (774) 484-1895 the same way).
 */
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
)

const StarIcon = ({ size = 16, fill }: { size?: number; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
)

const ChevronRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
)

export const metadata: Metadata = generatePageMetadata({
  // Title trimmed to 56 chars so the phone makes it into the SERP and
  // nothing truncates. Brand last is intentional - Google often boosts
  // brand recognition when the keyword leads.
  title: 'Painters in Massachusetts | (508) 690-8886 | JH Painting',
  // Description trimmed from 254 → 153 chars (under Google's 160 cap).
  // Phone at the END so the SERP snippet ends on the dial action.
  description:
    "MA painting contractor since 2018. Exterior, interior, cabinets. Licensed, $2M insured. 40+ 5-star Google reviews. Free estimate: (508) 690-8886",
  path: '/',
  ogImageAlt:
    'Professional exterior house painting by JH Painting Services in Massachusetts - before and after transformation',
  keywords: [
    'exterior painting Massachusetts',
    'exterior house painters MA',
    'exterior painting near me',
    'house painters Massachusetts',
    'painting contractor Massachusetts',
    'professional painters Massachusetts',
    'exterior painters Marlborough MA',
    'exterior painters Boston MA',
    'exterior painters Worcester MA',
    'exterior painters Framingham MA',
    'interior painters MA',
    'cabinet refinishing Massachusetts',
    'JH Painting Services',
    'licensed painters Massachusetts',
    'EPA lead-safe painters MA',
  ],
})

// Dynamic imports for below-fold sections - reduces initial JS bundle and TBT
const HomeVideoSection = dynamic(() => import('./components/HomeVideoSection'))
const HomeFAQ = dynamic(() => import('./components/HomeFAQ'))

// SVG icons - plain functions for server rendering
// The hardcoded `galleryImages` array that used to live here is gone. It held
// six GoHighLevel CDN URLs whose alt text named specific projects the images
// were not of. app/components/HomeGallery.tsx now builds this section from
// app/data/projects.ts - the crew's own photographs - so the caption and the
// picture can no longer disagree.

/**
 * Home-specific structured data - FAQ + WebPage objects that previously lived
 * in the root layout's @graph. Moving them here means the FAQ rich-result
 * eligibility applies ONLY to the home URL (Google flags FAQ schema on every
 * page as spammy duplicate). The WebPage object tells Google that "/" is the
 * canonical entry-point page for the JH Painting site.
 */
const homePageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://jhpaintingservices.com/#webpage',
      url: 'https://jhpaintingservices.com',
      name: 'JH Painting Services | Painters Massachusetts | (508) 690-8886',
      isPartOf: { '@id': 'https://jhpaintingservices.com/#website' },
      about: { '@id': 'https://jhpaintingservices.com/#organization' },
      description:
        `Award-winning exterior and interior painting contractor serving ${CITY_COUNT} Massachusetts cities since 2018. Licensed, $2M insured, EPA Lead-Safe certified. 40+ Google reviews. Call (508) 690-8886 for a free estimate.`,
      inLanguage: 'en-US',
      datePublished: '2018-07-01',
      dateModified: '2026-05-14',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.hero-text h1', '.hero-description-short'],
      },
      significantLink: [
        'https://jhpaintingservices.com/services/exterior-painting',
        'https://jhpaintingservices.com/contact',
        'https://jhpaintingservices.com/services/interior-painting',
        'https://jhpaintingservices.com/massachusetts',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does a house painting project take in Massachusetts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Project timelines in Massachusetts depend on size and scope. A single interior room typically takes 1-2 days, a full interior 4-7 days, and exterior painting for most homes 5-10 days depending on weather and prep. Cabinet refinishing is usually complete in 5-7 days. Contact JH Painting at (508) 690-8886 for a free, detailed estimate with an accurate timeline.",
          },
        },
        {
          '@type': 'Question',
          name: 'Are you licensed and insured?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes! JH Painting Services is fully licensed in Massachusetts and carries $2,000,000 in general liability insurance plus workers' compensation coverage. We're also EPA Lead-Safe certified, which is essential for homes built before 1978. We're happy to provide proof of insurance upon request.",
          },
        },
        {
          '@type': 'Question',
          name: 'What areas do you serve in Massachusetts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `JH Painting Services is based in Marlborough and serves ${CITY_COUNT} cities across Massachusetts including Boston, Worcester, Cambridge, Newton, Framingham, Natick, Wellesley, Lexington, Concord, and all MetroWest communities. We travel up to 50 miles from Marlborough. Call (508) 690-8886.`,
          },
        },
        {
          '@type': 'Question',
          name: 'How quickly can I get an estimate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We typically schedule estimates within 24-48 hours. Call us at (508) 690-8886 or fill out our online form for a free, no-obligation quote. We respond to all inquiries within 24 hours and provide detailed written estimates.',
          },
        },
        {
          '@type': 'Question',
          name: 'What paint brands do you use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "We exclusively use premium paints from Benjamin Moore and Sherwin-Williams. These brands offer superior durability, coverage, and color retention. For exteriors, we recommend paints specifically formulated for New England's harsh weather conditions.",
          },
        },
        {
          '@type': 'Question',
          name: 'Do you offer a warranty on your painting work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! We stand behind our work with a 5-year warranty on exterior painting and a 3-year warranty on interior painting. Our warranty covers peeling, blistering, and flaking under normal conditions. Your satisfaction is guaranteed. Call (508) 690-8886.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does exterior house painting last in Massachusetts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'With proper preparation and premium paints, our exterior paint jobs last 10-15 years in Massachusetts weather. The key is thorough surface prep: power washing, scraping, sanding, caulking gaps, priming bare wood, and applying two full coats of weather-resistant paint. We back our exterior work with a 5-year warranty.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you handle lead paint on older Massachusetts homes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. JH Painting Services is EPA Lead-Safe Certified (RRP Rule compliant), which is required by law for any painting work on homes built before 1978 in Massachusetts. Many older homes in Boston, Cambridge, Newton, Waltham, and historic MetroWest towns contain lead paint. We follow strict EPA protocols to safely contain and remove lead paint, protecting your family during and after the project.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best time of year for exterior painting in Massachusetts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The best time for exterior painting in Massachusetts is late spring through early fall (May through October), when temperatures consistently stay above 50°F and humidity is moderate. We recommend scheduling your exterior project early in the season to avoid the rush. Contact JH Painting at (508) 690-8886 to get on our schedule.',
          },
        },
      ],
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <HomeHeader />

      {/* Main Content */}
      <main id="main-content">
        {/* Home v2 layout (client mockup, Oct 2026) - see app/components/HomeV2.tsx */}
        <HV2Hero />
        {/* Google Reviews Bar */}
        <div className="google-reviews-bar">
          <div className="container">
            <div className="google-reviews-bar-content">
              <svg className="google-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google Reviews</span>
              <div className="stars" aria-hidden="true">
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
              </div>
              <span className="rating">5.0</span>
              {/* The aria-label here used to read "See our Google reviews - 5
                  star rating", which does not contain the visible words "See
                  Our Reviews" - a WCAG 2.5.3 Label in Name failure, so voice
                  control could not activate it. The extra context is appended
                  to the visible text instead, hidden from sight but present in
                  the accessible name. */}
              <a href="https://g.page/r/Cb984Z3qm9PsEAE/review" target="_blank" rel="noopener noreferrer">
                See Our Reviews<span className="sr-only"> on Google, rated 5 out of 5 stars</span>
                <ChevronRightIcon size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges Section */}
        <section className="trust-badges-section">
          <div className="container">
            <div className="trust-badges-wrapper">
              <span className="trust-badges-label">Trusted & Verified On:</span>
              <div className="trust-badges-logos">
                <a href="https://www.yelp.com/biz/jh-painting-services-marlborough?utm_campaign=www_business_share_popup&utm_medium=copy_link&utm_source=(direct)" target="_blank" rel="noopener noreferrer" className="trust-badge-link" aria-label="View JH Painting on Yelp">
                  <svg viewBox="0 0 384 512" fill="currentColor" className="trust-badge-icon yelp-icon">
                    <path d="M42.9 240.32l99.62 48.61c19.2 9.4 16.2 37.51-4.5 42.71L30.5 358.45a22.79 22.79 0 0 1-28.21-19.6 197.16 197.16 0 0 1 9-85.32 22.8 22.8 0 0 1 31.61-13.21zm44 239.25a199.45 199.45 0 0 0 79.42 32.11A22.78 22.78 0 0 0 192.94 490l3.9-110.82c.7-21.3-25.5-31.91-39.81-16.1l-74.21 82.4a22.82 22.82 0 0 0 4.09 34.09zm145.34-109.92l58.81 94a22.93 22.93 0 0 0 34 5.5 198.36 198.36 0 0 0 52.71-67.61A22.8 22.8 0 0 0 367.61 373.5l-108.51-45.71c-20-8.4-38.91 12.91-27.91 31.81zm148.33-132.23a197.44 197.44 0 0 0-50.41-69.31 22.77 22.77 0 0 0-34 4.4l-62 91.92c-11.9 17.7 4.7 40.61 25.2 34.71L366 268.63a22.82 22.82 0 0 0 14.61-31.21zM62.11 30.18a22.86 22.86 0 0 0-9.9 32l104.12 180.44c11.7 20.2 42.61 11.9 42.61-11.4V22.88a22.67 22.67 0 0 0-24.5-22.8 320.37 320.37 0 0 0-112.33 30.1z"/>
                  </svg>
                  <span className="trust-badge-text">Yelp</span>
                </a>
                <a href="https://www.thumbtack.com/ma/marlborough/exterior-painting/jh-painting-services-inc/service/335756687285510374?utm_medium=web&utm_source=txt&surface=sp" target="_blank" rel="noopener noreferrer" className="trust-badge-link" aria-label="View JH Painting on Thumbtack">
                  <svg viewBox="0 0 24 24" fill="none" className="trust-badge-icon thumbtack-icon">
                    <circle cx="12" cy="12" r="12" fill="#009FD9"/>
                    <path d="M17.5 8.5L15.5 10.5L13.5 8.5L11.5 10.5L9.5 8.5L7.5 10.5L6 9L9 6L12 9L15 6L18 9L16.5 10.5L17.5 8.5Z" fill="white"/>
                    <path d="M12 11L8 15L9.5 16.5L12 14L14.5 16.5L16 15L12 11Z" fill="white"/>
                    <path d="M12 14V19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="trust-badge-text">Thumbtack</span>
                </a>
                <a href="https://g.co/kgs/hc9Rfmv" target="_blank" rel="noopener noreferrer" className="trust-badge-link" aria-label="View JH Painting on Google">
                  <svg viewBox="0 0 24 24" fill="none" className="trust-badge-icon google-badge-icon">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="trust-badge-text">Google</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <HV2Services />
        <HV2Results />
        <HV2About />
        <HV2Reviews />
        {/* Live Google reviews (kept from v1, under the three quoted reviews) */}
        <section className="section reviews-section" style={{ paddingTop: 0, background: '#f6f7fa' }}>
          <div className="container">
            {/*
              Static social-proof banner - SSR'd, no third-party JS, no lazy
              loading. Gives the user (and Google crawlers) immediate proof
              while the ReviewsWidget below downloads the live GHL reviews widget.
              Numbers come from siteConfig (single source of truth - Task 7).
            */}
            <div
              role="group"
              aria-label="Customer rating summary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
                padding: '1rem 1.5rem',
                marginBottom: '1.5rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              <span aria-hidden="true" style={{ display: 'inline-flex', gap: '2px', color: '#B45309', fontSize: '1.25rem', letterSpacing: '2px' }}>★★★★★</span>
              <span style={{ color: '#0a0e27' }}>
                <strong>5.0</strong> from 40+ verified Google reviews
              </span>
              <a
                href="https://g.page/r/Cb984Z3qm9PsEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#CC0000', textDecoration: 'none', fontWeight: 700 }}
              >
                Read on Google ↗
              </a>
            </div>

            {/* Reserve height to prevent CLS while the widget loads */}
            <div style={{ minHeight: '800px' }}>
              <ReviewsWidget />
            </div>
          </div>
        </section>


        {/* Video Section */}
        <HomeVideoSection />

        {/* Gallery Section - real job photographs, see HomeGallery */}
        <HomeGallery />

        {/* Why Choose Us - Service Overview for AI citation */}
        <section className="section section-modern" style={{ background: '#fff' }}>
          <div className="container">
            <div className="section-header section-header-enhanced">
              <span className="section-eyebrow">Our Services</span>
              <h2>Professional Painting Services - Massachusetts</h2>
              <p>Complete painting solutions for homes and businesses. All estimates are free.</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                <caption style={{ textAlign: 'left', marginBottom: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>Every project includes free color consultation, premium paints, thorough preparation, and a satisfaction guarantee. Contact us for your personalized free estimate.</caption>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#111827' }}>Service</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#111827' }}>Typical Timeline</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: '#111827' }}>What&apos;s Included</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Interior Painting</td>
                    <td style={{ padding: '0.75rem 1rem' }}>1-5 days</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Walls, ceiling, trim, baseboards, 2 coats premium paint</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Exterior Painting</td>
                    <td style={{ padding: '0.75rem 1rem' }}>3-7 days</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Power wash, scrape, prime, caulk, 2 coats weather-resistant paint</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Cabinet Refinishing</td>
                    <td style={{ padding: '0.75rem 1rem' }}>5-7 days</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Degrease, sand, prime, spray finish, hardware reinstall</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Commercial Painting</td>
                    <td style={{ padding: '0.75rem 1rem' }}>Custom schedule</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>After-hours available, minimal disruption, brand color matching</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Power Washing</td>
                    <td style={{ padding: '0.75rem 1rem' }}>1 day</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Driveways, siding, decks, patios, fences</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f3f4f6', background: '#f9fafb' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Carpentry</td>
                    <td style={{ padding: '0.75rem 1rem' }}>1-3 days</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Trim, baseboards, crown molding, wood repair, deck repair</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Deck Staining</td>
                    <td style={{ padding: '0.75rem 1rem' }}>1-2 days</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Clean, sand, stain or paint, seal</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>* All estimates are free with no obligation. Call <a href="tel:+15086908886" style={{ color: '#CC0000', fontWeight: 600 }}>(508) 690-8886</a> for your personalized quote.</p>
          </div>
        </section>

        {/* Contact Section - RS 2-Column Style */}
        <section id="contact" className="section">
          <div className="container">
            <div className="section-header">
              <h2>Get Your Free Estimate Today</h2>
              <p>Ready to start your project? Contact us for a free, no-obligation estimate.</p>
            </div>

            <div className="contact-grid">
              <div className="contact-form-card">
                <h3>Request Your Free Estimate</h3>
                <LazyIframe
                  className="contact-form-iframe"
                  src="https://api.leadconnectorhq.com/widget/form/gmVSZsO5e3S0pbXmmnPn"
                  title="Contact Form"
                  style={{ minHeight: '500px' }}
                />
              </div>

              <div className="contact-info">
                <div className="contact-info-card">
                  <h3>Contact Us Directly</h3>

                  <div className="contact-item">
                    <div className="contact-item-icon" style={{ background: 'rgba(204,0,0,0.1)', color: '#CC0000' }}>
                      <PhoneIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Phone</h4>
                      <a href="tel:+15086908886">(508) 690-8886</a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon" style={{ background: 'rgba(204,0,0,0.1)', color: '#CC0000' }}>
                      <MailIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Email</h4>
                      <a href="mailto:contact@jhpaintingservices.com">contact@jhpaintingservices.com</a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon" style={{ background: 'rgba(204,0,0,0.1)', color: '#CC0000' }}>
                      <MapPinIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Service Area</h4>
                      <p>Serving {CITY_COUNT} cities across Massachusetts</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon" style={{ background: 'rgba(204,0,0,0.1)', color: '#CC0000' }}>
                      <ClockIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Business Hours</h4>
                      <p>Mon-Fri: 7AM-6PM | Sat: 8AM-4PM</p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--jh-line)' }}>
                    <a href="https://www.facebook.com/profile.php?id=61564489391475" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', color: '#CC0000', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Facebook">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/jhpaintingservices_/" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', color: '#CC0000', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Instagram">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://www.youtube.com/@JHPaintingServices-br9wh" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', color: '#CC0000', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="YouTube">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  </div>
                </div>

                {/* Map */}
                <div className="map-container">
                  <a href="https://g.co/kgs/hc9Rfmv" target="_blank" rel="noopener noreferrer" className="static-map-link">
                    <div className="static-map-placeholder" style={{ border: '2px solid #CC0000' }}>
                      <MapPinIcon />
                      <span className="static-map-title">JH Painting Services</span>
                      <span className="static-map-address">Serving All of Massachusetts</span>
                      <span className="static-map-cta">
                        <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        View on Google Maps
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <HomeFAQ />

        <HV2Cta />
      </main>

      <Footer />
    </>
  )
}
