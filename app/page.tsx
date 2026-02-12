import Image from 'next/image'
import Link from 'next/link'
import HomeHeader from './components/HomeHeader'
import HomeVideoSection from './components/HomeVideoSection'
import HomeFAQ from './components/HomeFAQ'
import HomeBeforeAfter from './components/HomeBeforeAfter'
import LazyIframe from './components/LazyIframe'
import Footer from './components/Footer'

// SVG icons - plain functions for server rendering (no memo needed)
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

// Data
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
    title: 'Floor Refinishing',
    description: 'Restore hardwood floors with expert sanding, staining, and sealing services.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg',
    href: '/services/residential-painting',
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
        {/* Hero Section - Simplified for CRO */}
        <section id="home" className="hero hero-simplified">
          <div className="hero-bg">
            <Image
              src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
              alt="Professional Painting Services Massachusetts"
              fill
              priority
              sizes="100vw"
              quality={75}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="hero-overlay" />

          <div className="hero-content container">
            <div className="hero-centered">
              <div className="hero-text">
                {/* Single trust indicator */}
                <div className="hero-rating-badge-centered">
                  <StarIcon size={16} fill="currentColor" />
                  <StarIcon size={16} fill="currentColor" />
                  <StarIcon size={16} fill="currentColor" />
                  <StarIcon size={16} fill="currentColor" />
                  <StarIcon size={16} fill="currentColor" />
                  <span className="hero-rating-text">5.0 Rating · 40+ Reviews</span>
                </div>

                {/* Emotional headline */}
                <h1 className="hero-title-emotional">
                  Transform Your Home.<br />
                  <span className="hero-title-accent">No Stress. No Surprises.</span>
                </h1>

                <p className="hero-description-short">
                  Massachusetts&apos; trusted painters. Premium quality, honest pricing,
                  and results that speak for themselves.
                </p>

                {/* Single primary CTA */}
                <div className="hero-cta-single">
                  <a href="tel:+15086908886" className="btn btn-primary btn-xl hero-phone-btn">
                    <PhoneIcon />
                    <span className="hero-cta-text">
                      <span className="hero-cta-label">Free Estimate</span>
                      <span className="hero-cta-number">(508) 690-8886</span>
                    </span>
                  </a>
                  <span className="hero-cta-subtext">Call now for same-day response</span>
                </div>

                {/* Compact trust badges - max 3 */}
                <div className="hero-trust-compact">
                  <span className="hero-trust-item">
                    <ShieldIcon />
                    Licensed & $2M Insured
                  </span>
                  <span className="hero-trust-divider">·</span>
                  <span className="hero-trust-item">
                    <CheckIcon />
                    200+ Happy Customers
                  </span>
                  <span className="hero-trust-divider">·</span>
                  <span className="hero-trust-item">
                    <ClockIcon />
                    Since 2018
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Reviews Bar */}
        <div className="google-reviews-bar">
          <div className="container">
            <div className="google-reviews-bar-content">
              <svg className="google-icon" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google Reviews</span>
              <div className="stars">
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
                <StarIcon size={16} fill="currentColor" />
              </div>
              <span className="rating">5</span>
              <a href="#reviews">
                See Our Reviews
                <ChevronRightIcon size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges Section - Yelp, Thumbtack, Google */}
        <section className="trust-badges-section">
          <div className="container">
            <div className="trust-badges-wrapper">
              <span className="trust-badges-label">Trusted & Verified On:</span>
              <div className="trust-badges-logos">
                <a
                  href="https://www.yelp.com/biz/jh-painting-services-marlborough?utm_campaign=www_business_share_popup&utm_medium=copy_link&utm_source=(direct)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trust-badge-link"
                  aria-label="View JH Painting on Yelp"
                >
                  <svg viewBox="0 0 384 512" fill="currentColor" className="trust-badge-icon yelp-icon">
                    <path d="M42.9 240.32l99.62 48.61c19.2 9.4 16.2 37.51-4.5 42.71L30.5 358.45a22.79 22.79 0 0 1-28.21-19.6 197.16 197.16 0 0 1 9-85.32 22.8 22.8 0 0 1 31.61-13.21zm44 239.25a199.45 199.45 0 0 0 79.42 32.11A22.78 22.78 0 0 0 192.94 490l3.9-110.82c.7-21.3-25.5-31.91-39.81-16.1l-74.21 82.4a22.82 22.82 0 0 0 4.09 34.09zm145.34-109.92l58.81 94a22.93 22.93 0 0 0 34 5.5 198.36 198.36 0 0 0 52.71-67.61A22.8 22.8 0 0 0 367.61 373.5l-108.51-45.71c-20-8.4-38.91 12.91-27.91 31.81zm148.33-132.23a197.44 197.44 0 0 0-50.41-69.31 22.77 22.77 0 0 0-34 4.4l-62 91.92c-11.9 17.7 4.7 40.61 25.2 34.71L366 268.63a22.82 22.82 0 0 0 14.61-31.21zM62.11 30.18a22.86 22.86 0 0 0-9.9 32l104.12 180.44c11.7 20.2 42.61 11.9 42.61-11.4V22.88a22.67 22.67 0 0 0-24.5-22.8 320.37 320.37 0 0 0-112.33 30.1z"/>
                  </svg>
                  <span className="trust-badge-text">Yelp</span>
                </a>
                <a
                  href="https://www.thumbtack.com/ma/marlborough/exterior-painting/jh-painting-services-inc/service/335756687285510374?utm_medium=web&utm_source=txt&surface=sp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trust-badge-link"
                  aria-label="View JH Painting on Thumbtack"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="trust-badge-icon thumbtack-icon">
                    <circle cx="12" cy="12" r="12" fill="#009FD9"/>
                    <path d="M17.5 8.5L15.5 10.5L13.5 8.5L11.5 10.5L9.5 8.5L7.5 10.5L6 9L9 6L12 9L15 6L18 9L16.5 10.5L17.5 8.5Z" fill="white"/>
                    <path d="M12 11L8 15L9.5 16.5L12 14L14.5 16.5L16 15L12 11Z" fill="white"/>
                    <path d="M12 14V19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="trust-badge-text">Thumbtack</span>
                </a>
                <a
                  href="https://g.co/kgs/hc9Rfmv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trust-badge-link"
                  aria-label="View JH Painting on Google"
                >
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

        {/* Services Section */}
        <section id="services" className="section section-modern">
          <div className="container">
            <div className="services-section-header section-header-enhanced">
              <span className="section-eyebrow">What We Offer</span>
              <h2>Our <span>Services</span></h2>
              <p>From expert <strong>painting and finishing work</strong> to complete home exteriors, we deliver quality craftsmanship on every project.</p>
              <div className="underline"></div>
            </div>

            <div className="services-grid">
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

        {/* About Section - Dark RS Style */}
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
              </div>

              <div className="about-image-wrapper">
                <div className="about-image">
                  <Image
                    src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                    alt="Jafet - Owner of JH Painting Services Massachusetts"
                    width={600}
                    height={600}
                    loading="lazy"
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

        {/* Process Section - RS Style */}
        <section className="section section-modern">
          <div className="container">
            <div className="section-header section-header-enhanced">
              <span className="section-eyebrow">How It Works</span>
              <h2>Our Process</h2>
              <p>From initial consultation to project completion, we make the painting process simple and stress-free.</p>
            </div>

            <div className="process-grid-home process-grid-3">
              {[
                { num: '01', icon: PhoneIcon, title: 'Free Quote', desc: 'Call or text us. We\'ll discuss your project and provide a detailed estimate within 24 hours.' },
                { num: '02', icon: HardHatIcon, title: 'We Paint', desc: 'Our expert team handles everything—prep, painting, and cleanup. You just relax.' },
                { num: '03', icon: CheckIcon, title: 'Love It', desc: 'We ensure you\'re 100% satisfied. If not, we\'ll make it right. Guaranteed.' },
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

        {/* Exterior Painting Detail - RS Style */}
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
                  alt="Exterior Painting Massachusetts"
                  width={600}
                  height={450}
                  loading="lazy"
                  style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '16px' }}
                />
              </div>

              <div className="detail-content">
                <h2>
                  <PaintbrushIcon size={28} />
                  Exterior House Painting
                </h2>
                <p>
                  Looking to boost your home&apos;s curb appeal? JH Painting Services delivers professional exterior house painting that transforms your property and protects it from New England&apos;s harsh weather conditions.
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
                  Learn More About Exterior Painting
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
                <h3>Transform Your Space</h3>
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

                <a href="#contact" className="btn btn-secondary">Get Free Estimate</a>
              </div>

              <div className="detail-image" style={{ direction: 'ltr' }}>
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png"
                  alt="Interior Painting Massachusetts"
                  width={600}
                  height={450}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section section-modern">
          <div className="container">
            <div className="section-header section-header-enhanced">
              <span className="section-eyebrow">Why Choose Us</span>
              <h2>Why Choose JH Painting Services</h2>
              <p>Massachusetts trusts us for expert painting services.</p>
            </div>

            <div className="why-grid">
              {[
                { icon: ShieldIcon, title: 'Licensed & Insured', desc: 'Fully licensed with comprehensive insurance' },
                { icon: StarIcon, title: '5-Star Rated', desc: '40+ verified Google reviews' },
                { icon: ClockIcon, title: 'On-Time Completion', desc: 'We deliver projects on schedule' },
                { icon: DollarIcon, title: 'Free Estimates', desc: 'Transparent pricing, no obligation' },
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

        {/* Video Section - Client Island */}
        <HomeVideoSection />

        {/* Gallery Section */}
        <section id="gallery" className="section section-modern gallery-section">
          <div className="container">
            <div className="section-header section-header-enhanced">
              <span className="section-eyebrow">Our Portfolio</span>
              <h2>Our Work Gallery</h2>
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

        {/* Before/After Section - Client Island */}
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

        {/* Contact Section */}
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
                    <div className="contact-item-icon">
                      <PhoneIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Phone</h4>
                      <a href="tel:+15086908886">(508) 690-8886</a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <MailIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Email</h4>
                      <a href="mailto:contact@jhpaintingservices.com">contact@jhpaintingservices.com</a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <MapPinIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Service Area</h4>
                      <p>Serving 114+ cities across Massachusetts</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <ClockIcon />
                    </div>
                    <div className="contact-item-content">
                      <h4>Business Hours</h4>
                      <p>Mon-Sat: 7AM - 6PM</p>
                    </div>
                  </div>
                </div>

                <div className="map-container">
                  <a
                    href="https://g.co/kgs/hc9Rfmv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="static-map-link"
                    aria-label="View JH Painting Services on Google Maps"
                  >
                    <div className="static-map-placeholder">
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

        {/* FAQ Section - Client Island */}
        <HomeFAQ />

        {/* CTA Section */}
        <section className="cta-section cta-section-enhanced">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Start Your Painting Project?</h2>
              <p>Expert painting services. Free estimates, no obligation.</p>
              <a href="tel:+15086908886" className="btn btn-lg">
                <PhoneIcon />
                Call (508) 690-8886
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
