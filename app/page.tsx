import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import HomeHeader from './components/HomeHeader'
import LazyIframe from './components/LazyIframe'
import LazyHeroForm from './components/LazyHeroForm'
import Footer from './components/Footer'

// Dynamic imports for below-fold sections — reduces initial JS bundle and TBT
const HomeVideoSection = dynamic(() => import('./components/HomeVideoSection'))
const HomeFAQ = dynamic(() => import('./components/HomeFAQ'))
const HomeBeforeAfter = dynamic(() => import('./components/HomeBeforeAfter'))

// SVG icons - plain functions for server rendering
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
)

const StarIcon = ({ size = 16, fill }: { size?: number; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
)

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
)

const DollarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
)

const ChevronRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
)

const PaintbrushIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg>
)

const HardHatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/></svg>
)

const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
)

const ClipboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
)

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
)

// Data — 7 services for RS-style grid
const services = [
  {
    title: 'Exterior Painting',
    description: 'Professional exterior house painting with complete prep work and two coats of premium paint.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    href: '/services/exterior-painting',
    featured: true,
  },
  {
    title: 'Interior Painting',
    description: 'Transform your home\'s interior with premium low-VOC paints and meticulous attention to detail.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    href: '/services/interior-painting',
  },
  {
    title: 'Cabinet Refinishing',
    description: 'Upgrade your kitchen with professional cabinet refinishing. Save up to 70% vs replacement.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png',
    href: '/services/cabinet-painting',
  },
  {
    title: 'Commercial Painting',
    description: 'Professional painting for offices, retail spaces, and restaurants. Minimal disruption to your business.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg',
    href: '/services/commercial-painting',
  },
  {
    title: 'Residential Painting',
    description: 'Complete home painting solutions from single rooms to entire house transformations.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg',
    href: '/services/residential-painting',
  },
  {
    title: 'Carpentry',
    description: 'Expert carpentry services including trim, molding, deck building, and structural repairs.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg',
    href: '/services/carpentry',
  },
  {
    title: 'Power Washing',
    description: 'Restore your property\'s appearance with professional power washing for decks, siding, and driveways.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    href: '/services/power-washing',
  },
]

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Professional exterior house painting services in Massachusetts by JH Painting', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'Expert house painters in Waltham MA - exterior painting project', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Professional interior painting contractors in Massachusetts', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Bedroom interior painting services in Massachusetts by JH Painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Kitchen cabinet refinishing and painting services in MA', category: 'Cabinets' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Hardwood floor refinishing services in Massachusetts by JH Painting', category: 'Floors' },
]

export default function HomePage() {
  return (
    <>
      <HomeHeader />

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section - RS Development Group Style */}
        <section id="home" className="hero hero-simplified">
          <div className="hero-bg">
            <Image
              src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
              alt="Professional Painting Services Massachusetts"
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={35}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="hero-overlay" />

          <div className="hero-content container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div className="hero-text">
                {/* Service area badge - RS style */}
                <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', background: 'rgba(200,16,46,0.9)', borderRadius: '100px', color: '#fff', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                  Serving 117+ Massachusetts Cities
                </p>

                {/* 5-Star rating badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '2px', color: '#C8102E' }}>
                    <StarIcon size={18} fill="#C8102E" />
                    <StarIcon size={18} fill="#C8102E" />
                    <StarIcon size={18} fill="#C8102E" />
                    <StarIcon size={18} fill="#C8102E" />
                    <StarIcon size={18} fill="#C8102E" />
                  </div>
                  <span style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600 }}>5.0 Rating | 50+ Reviews</span>
                </div>

                {/* Headline */}
                <h1 className="hero-title-emotional">
                  Professional Painting<br />
                  <span className="hero-title-accent">Contractor in Massachusetts</span>
                </h1>

                <p className="hero-description-short" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '560px' }}>
                  Premium Benjamin Moore & Sherwin-Williams paints. Licensed & $2M insured. From interior painting to complete home exteriors, we deliver quality craftsmanship you can trust.
                </p>

                {/* Dual CTA - RS style (Gold + White border) */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  <a href="tel:+15086908886" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', background: 'linear-gradient(135deg, #C8102E 0%, #9B0A1E 100%)', color: '#fff', borderRadius: '8px', fontSize: '1.125rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 10px 40px rgba(200,16,46,0.35)', transition: 'all 0.3s ease', border: 'none' }}>
                    <PhoneIcon />
                    Call (508) 690-8886
                  </a>
                  <a href="#quote-form" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: 'transparent', color: '#fff', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}>
                    Get Free Estimate
                    <ChevronRightIcon size={18} />
                  </a>
                </div>

                {/* Trust indicators - RS style */}
                <div className="hero-trust-compact">
                  <span className="hero-trust-item">
                    <ShieldIcon />
                    Licensed & Insured
                  </span>
                  <span className="hero-trust-divider">|</span>
                  <span className="hero-trust-item">
                    <ClockIcon />
                    Same Day Response
                  </span>
                  <span className="hero-trust-divider">|</span>
                  <span className="hero-trust-item">
                    <DollarIcon />
                    Free Estimates
                  </span>
                </div>
              </div>

              {/* Quote Form Card */}
              <div id="quote-form" className="hero-form-card">
                <LazyHeroForm
                  className="hero-form-iframe"
                  src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                  title="Get Your Free Painting Estimate"
                />
              </div>
            </div>
          </div>
        </section>

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
              <a href="https://g.page/r/Cb984Z3qm9PsEAE/review" target="_blank" rel="noopener noreferrer" aria-label="See our Google reviews - 5 star rating">
                See Our Reviews
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

        {/* Services Section - RS 3-Column Grid with 7 Services */}
        <section id="services" className="section section-modern">
          <div className="container">
            <div className="services-section-header section-header-enhanced">
              <span className="section-eyebrow">What We Offer</span>
              <h2>Our Professional <span>Services</span></h2>
              <p>From expert <strong>painting and finishing work</strong> to complete home exteriors, we deliver quality craftsmanship on every project.</p>
              <div className="underline"></div>
            </div>

            <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}>
              {services.map((service, index) => (
                <Link href={service.href} key={index} className="service-card service-card-enhanced">
                  {service.featured && <span className="service-card-featured">Featured Service</span>}
                  <div className="service-card-image">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={400}
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className="service-card-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span className="service-link">
                      Learn More <ChevronRightIcon size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - RS Dark Style with Stats */}
        <section id="about" className="section section-modern about-section-dark">
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <div className="about-underline"></div>
                <h2>About <span>JH Painting Services</span></h2>
                <p>
                  Founded by <strong>Jafet</strong>, JH Painting Services is a premier painting contractor based in Marlborough, Massachusetts. With years of hands-on experience in the painting industry, Jafet and his team have built a reputation on delivering exceptional craftsmanship, honest pricing, and reliable service to homeowners across the state.
                </p>
                <p>
                  Under Jafet&apos;s leadership, our team specializes in <strong>exterior and interior painting</strong> - the foundation of every beautiful home. From complete home transformations to single room refreshes, we ensure that every project is completed with attention to detail and using quality materials.
                </p>
                <p>
                  Beyond painting, we offer comprehensive home improvement services including cabinet refinishing, floor restoration, and deck staining. Whether you&apos;re updating your home&apos;s curb appeal, refreshing a single room, or planning a full renovation, we have the skills and experience to deliver outstanding results.
                </p>

                {/* Stats Grid - RS Style */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                  {[
                    { value: '117+', label: 'Cities Served' },
                    { value: '50+', label: 'Google Reviews' },
                    { value: '100%', label: 'Licensed' },
                    { value: '24hr', label: 'Response Time' },
                  ].map((stat, i) => (
                    <div key={i} style={{ textAlign: 'center', padding: '1.25rem 0.75rem', background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.2)', borderRadius: '12px' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#C8102E', lineHeight: 1.2 }}>{stat.value}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginTop: '0.25rem' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-image-wrapper">
                <div className="about-image">
                  <Image
                    src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                    alt="Jafet - Owner of JH Painting Services Massachusetts"
                    width={600}
                    height={600}
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'contain', borderRadius: '16px', width: '100%', height: 'auto' }}
                  />
                </div>
                <div className="trusted-contractor-badge">
                  <div className="trusted-contractor-badge-icon">
                    <AwardIcon />
                  </div>
                  <div className="trusted-contractor-badge-content">
                    <span className="trusted-contractor-badge-title">Trusted Contractor</span>
                    <span className="trusted-contractor-badge-subtitle">Massachusetts Licensed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - RS 4-Step Style */}
        <section className="section section-modern">
          <div className="container">
            <div className="section-header section-header-enhanced">
              <span className="section-eyebrow">How It Works</span>
              <h2>Our Process</h2>
              <p>From initial consultation to final walkthrough, we make the painting process simple and stress-free.</p>
            </div>

            <div className="process-grid-home" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '1.5rem' }}>
              {[
                { num: '01', icon: PhoneIcon, title: 'Free Consultation', desc: 'Call or text us. We\'ll discuss your project goals, timeline, and provide expert recommendations.' },
                { num: '02', icon: ClipboardIcon, title: 'Detailed Estimate', desc: 'We provide a transparent, written estimate with clear pricing. No hidden fees, no surprises.' },
                { num: '03', icon: HardHatIcon, title: 'Expert Painting', desc: 'Our skilled team handles everything—prep, painting, and cleanup with premium materials.' },
                { num: '04', icon: EyeIcon, title: 'Final Walkthrough', desc: 'We walk through every detail with you. If anything isn\'t perfect, we make it right. Guaranteed.' },
              ].map((step, index) => (
                <div key={index} className="process-card-home process-step-enhanced">
                  <div className="process-card-home-num">{step.num}</div>
                  <div className="process-card-home-icon">
                    <step.icon />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Painting Services - RS Featured Section */}
        <section id="exterior-painting" className="section detail-section detail-section-rs">
          <div className="container">
            <div className="detail-grid">
              <div className="detail-image-wrapper">
                <span className="detail-badge">
                  <StarIcon size={14} fill="currentColor" />
                  Our Specialty
                </span>
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
                  alt="Waltham Church Exterior Painting by JH Painting Services"
                  width={600}
                  height={450}
                  loading="lazy"
                  quality={65}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '16px' }}
                />
              </div>

              <div className="detail-content">
                <h2>
                  <PaintbrushIcon size={28} />
                  Exterior House Painting
                </h2>
                <p>
                  From homes to historic landmarks like the Waltham Church, JH Painting Services delivers professional exterior painting that transforms any property and protects it from New England&apos;s harsh weather conditions. Our Waltham Church project showcased our ability to handle large-scale exterior work with precision and care.
                </p>
                <p>
                  Our comprehensive process includes thorough surface preparation—power washing, scraping, sanding, caulking, and priming—followed by two coats of premium grade A paint. We specialize in:
                </p>

                <ul className="detail-list">
                  <li><CheckIcon /> Power Washing</li>
                  <li><CheckIcon /> Scraping & Sanding</li>
                  <li><CheckIcon /> Caulking Gaps</li>
                  <li><CheckIcon /> Premium Primer</li>
                  <li><CheckIcon /> Two Coats of Paint</li>
                  <li><CheckIcon /> Trim & Shutters</li>
                </ul>

                <a href="#contact" className="btn btn-primary">
                  Get Your Free Estimate
                  <ChevronRightIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Interior Painting Detail */}
        <section id="interior-painting" className="section detail-section" style={{ background: 'var(--jh-gray-50)' }}>
          <div className="container">
            <div className="detail-grid" style={{ direction: 'rtl' }}>
              <div className="detail-content" style={{ direction: 'ltr' }}>
                <span className="section-eyebrow">Transform Your Space</span>
                <h2>Interior Painting Services</h2>
                <p>
                  Ready to refresh your living space? We provide expert interior painting services throughout Massachusetts with premium low-VOC paints that are safe for your family.
                </p>
                <p>
                  Our meticulous process includes furniture protection, wall preparation, precision cutting-in, and smooth rolling techniques. We offer free color consultations.
                </p>

                <ul className="detail-list" style={{ direction: 'ltr' }}>
                  <li><CheckIcon /> Walls & Ceilings</li>
                  <li><CheckIcon /> Trim & Baseboards</li>
                  <li><CheckIcon /> Doors & Frames</li>
                  <li><CheckIcon /> Accent Walls</li>
                  <li><CheckIcon /> Drywall Repair</li>
                  <li><CheckIcon /> Color Consultation</li>
                </ul>

                <a href="#contact" className="btn btn-secondary">Get Your Free Estimate</a>
              </div>

              <div className="detail-image" style={{ direction: 'ltr' }}>
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png"
                  alt="Interior Painting Massachusetts"
                  width={600}
                  height={450}
                  loading="lazy"
                  quality={65}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - RS Style with Gold Icons */}
        <section className="section section-modern">
          <div className="container">
            <div className="section-header section-header-enhanced">
              <span className="section-eyebrow">Why Choose Us</span>
              <h2>Why Choose JH Painting Services</h2>
              <p>Massachusetts trusts us for expert painting services.</p>
            </div>

            <div className="why-grid">
              {[
                { icon: ShieldIcon, title: 'Licensed & Insured', desc: 'Fully licensed with $2M general liability insurance and workers compensation' },
                { icon: StarIcon, title: '5-Star Rated', desc: '50+ verified 5-star Google reviews from satisfied homeowners' },
                { icon: ClockIcon, title: 'On-Time Completion', desc: 'We respect your schedule and deliver every project on time' },
                { icon: DollarIcon, title: 'Free Estimates', desc: 'Transparent pricing with detailed written estimates, no obligation' },
              ].map((item, index) => (
                <div key={index} className="why-card why-card-enhanced">
                  <div className="why-icon">
                    <item.icon />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <HomeVideoSection />

        {/* Gallery Section */}
        <section id="gallery" className="section section-modern gallery-section">
          <div className="container">
            <div className="section-header section-header-enhanced">
              <span className="section-eyebrow">Our Portfolio</span>
              <h2>Project Gallery</h2>
              <p>Browse through our portfolio of completed projects across Massachusetts.</p>
            </div>

            <div className="gallery-grid">
              {galleryImages.map((img, index) => (
                <div key={index} className="gallery-item gallery-item-enhanced">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                  <div className="gallery-item-overlay">
                    <span>{img.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Section - ORIGINAL PRESERVED */}
        <HomeBeforeAfter />

        {/* Reviews Section */}
        <section id="reviews" className="section reviews-section">
          <div className="container">
            <div className="section-header">
              <h2>What Our Customers Say</h2>
              <p>Trusted by homeowners across Massachusetts.</p>
            </div>

            <LazyIframe
              className="lc_reviews_widget reviews-widget"
              src="https://reputationhub.site/reputation/widgets/review_widget/0Def8kzJShLPuKrPk5Jw"
              frameBorder={0}
              scrolling="no"
              style={{ minWidth: '100%', width: '100%', border: 'none', minHeight: '800px' }}
              title="Customer Reviews"
            />
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
                  src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                  title="Contact Form"
                  style={{ minHeight: '500px' }}
                />
              </div>

              <div className="contact-info">
                <div className="contact-info-card">
                  <h3>Contact Us Directly</h3>

                  <div className="contact-item">
                    <div className="contact-item-icon" style={{ background: 'rgba(200,16,46,0.1)', color: '#C8102E' }}>
                      <PhoneIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Phone</h4>
                      <a href="tel:+15086908886">(508) 690-8886</a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon" style={{ background: 'rgba(200,16,46,0.1)', color: '#C8102E' }}>
                      <MailIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Email</h4>
                      <a href="mailto:contact@jhpaintingservices.com">contact@jhpaintingservices.com</a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon" style={{ background: 'rgba(200,16,46,0.1)', color: '#C8102E' }}>
                      <MapPinIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Service Area</h4>
                      <p>Serving 117+ cities across Massachusetts</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon" style={{ background: 'rgba(200,16,46,0.1)', color: '#C8102E' }}>
                      <ClockIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Business Hours</h4>
                      <p>Mon-Fri: 7AM-6PM | Sat: 8AM-4PM</p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--jh-line)' }}>
                    <a href="https://www.facebook.com/profile.php?id=61564489391475" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0a0e27', color: '#C8102E', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Facebook">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/jhpaintingservices_/" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0a0e27', color: '#C8102E', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Instagram">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://www.youtube.com/@JHPaintingServices-br9wh" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0a0e27', color: '#C8102E', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="YouTube">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  </div>
                </div>

                {/* Map */}
                <div className="map-container">
                  <a href="https://g.co/kgs/hc9Rfmv" target="_blank" rel="noopener noreferrer" className="static-map-link" aria-label="View JH Painting Services on Google Maps">
                    <div className="static-map-placeholder" style={{ border: '2px solid #C8102E' }}>
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

        {/* CTA Section - RS Gold Banner Style */}
        <section className="cta-section cta-section-enhanced" style={{ background: 'linear-gradient(135deg, #C8102E 0%, #9B0A1E 100%)' }}>
          <div className="container">
            <div className="cta-content" style={{ color: '#fff' }}>
              <h2 style={{ color: '#fff' }}>Ready to Transform Your Home?</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)' }}>Licensed & $2M insured. 5-star rated. Same-day response on all estimates.</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="tel:+15086908886" className="btn btn-lg" style={{ background: '#fff', color: '#C8102E', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                  <PhoneIcon />
                  Call (508) 690-8886
                </a>
                <a href="#quote-form" className="btn btn-lg" style={{ background: 'transparent', color: '#fff', border: '2px solid #fff' }}>
                  Get Free Estimate
                  <ChevronRightIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
