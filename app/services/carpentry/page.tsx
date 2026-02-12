'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, MapPin, Hammer, Wrench, Home } from '@/app/components/icons'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider'
import { BUSINESS, VIDEOS, FORM_IDS } from '@/lib/constants'
import LazyHeroForm from '@/app/components/LazyHeroForm'

// Schema JSON-LD for Carpentry Service
const carpentrySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jhpaintingservices.com/services/carpentry#service",
      "name": "Carpentry Services Massachusetts",
      "serviceType": "Carpentry",
      "description": "Professional carpentry services in Massachusetts. Expert repairs for window frames, door frames, siding, decks, and trim work. Quality wood repairs before painting for lasting results.",
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://jhpaintingservices.com/#localbusiness",
        "name": "JH Painting Services",
        "telephone": "+1-508-690-8886",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Marlborough",
          "addressRegion": "MA",
          "postalCode": "01752",
          "addressCountry": "US"
        }
      },
      "areaServed": {
        "@type": "State",
        "name": "Massachusetts"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Carpentry Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Window Frame Repair",
              "description": "Professional repair of rotted or damaged window frames"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Door Frame Repair",
              "description": "Expert door frame repair and replacement"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Siding Repair",
              "description": "Wood siding repair and replacement services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Deck Repair",
              "description": "Deck board replacement and structural repairs"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Trim Work",
              "description": "Interior and exterior trim installation and repair"
            }
          }
        ]
      },
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg",
      "url": "https://jhpaintingservices.com/services/carpentry"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://jhpaintingservices.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://jhpaintingservices.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Carpentry",
          "item": "https://jhpaintingservices.com/services/carpentry"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What carpentry services do you offer in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer comprehensive carpentry services including window frame repair, door frame repair, siding repair, deck repairs, railing repairs, trim work, and rotted wood replacement. We handle all carpentry repairs needed before painting to ensure lasting results."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need carpentry work before painting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, addressing rotted or damaged wood before painting is essential for lasting results. Paint won't adhere properly to damaged wood, and moisture can continue to cause deterioration. We identify and repair all wood damage before applying paint for best results."
          }
        },
        {
          "@type": "Question",
          "name": "How much does carpentry repair cost in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Carpentry repair costs vary based on the extent of damage and materials needed. Window frame repairs typically range from $200-$600, door frame repairs $150-$500, and deck repairs vary by scope. Contact JH Painting at (508) 690-8886 for a free estimate."
          }
        },
        {
          "@type": "Question",
          "name": "Can you match my existing trim and molding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We carefully match existing trim profiles, wood types, and architectural details. Whether it's historic crown molding or modern baseboards, we ensure seamless repairs that blend perfectly with your home's existing woodwork."
          }
        }
      ]
    }
  ]
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Professional carpentry repair services Massachusetts', category: 'Exterior Repair' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'Window frame repair and replacement Massachusetts', category: 'Window Frames' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Door frame carpentry services MA', category: 'Door Frames' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Trim and molding repair Massachusetts', category: 'Trim Work' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Deck repair and restoration services MA', category: 'Deck Repair' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Siding repair carpentry Massachusetts', category: 'Siding Repair' },
]

// Before/After pairs for slider
const beforeAfterPairs = [
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23ad3443ab5.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg',
    beforeAlt: 'Historic church interior before restoration in Waltham MA',
    afterAlt: 'Historic church interior after professional restoration in Waltham MA'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a30277f301b94ac7227dc.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp',
    beforeAlt: 'Deck before power washing and staining',
    afterAlt: 'Deck after professional power washing and staining'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a30274e42b930842eea35.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a3027a03db26c93445285.webp',
    beforeAlt: 'Staircase before refinishing',
    afterAlt: 'Staircase after professional refinishing'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a39f37b4d1e5cbf3c1272.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a39f38441b1a824eef7d0.webp',
    beforeAlt: 'House exterior before painting',
    afterAlt: 'House exterior after professional painting'
  }
]

const painPoints = [
  {
    icon: Wrench,
    title: 'Rotted Window Frames?',
    desc: "New England weather takes a toll on wood. Rotted window frames not only look bad but allow moisture to damage your home's structure and drive up energy bills.",
    solution: 'Expert window frame repair and replacement'
  },
  {
    icon: Home,
    title: 'Damaged Siding or Trim?',
    desc: "Cracked, warped, or rotting siding compromises your home's protection and curb appeal. Paint won't stick to damaged wood, making repairs essential before any painting project.",
    solution: 'Professional siding and trim repair'
  },
  {
    icon: Hammer,
    title: 'Deck in Need of Repair?',
    desc: "Loose boards, rotted railings, and structural issues make your deck unsafe and unsightly. Don't let a damaged deck become a liability.",
    solution: 'Complete deck repair and restoration'
  }
]

const stats = [
  { number: '200+', label: 'Carpentry Projects' },
  { number: '7+', label: 'Years Experience' },
  { number: '116', label: 'Cities Served' },
  { number: '5.0', label: 'Google Rating' }
]

const services = [
  'Window frame repair & replacement',
  'Door frame repair',
  'Siding repair & replacement',
  'Deck board replacement',
  'Railing repair & installation',
  'Rotted wood replacement',
  'Fascia & soffit repair',
  'Exterior trim work',
  'Interior trim & molding',
  'Baseboard installation',
  'Crown molding',
  'Wood rot treatment'
]

const processSteps = [
  { step: '01', title: 'Free Inspection', desc: 'Thorough assessment of all wood damage and repair needs' },
  { step: '02', title: 'Detailed Quote', desc: 'Written estimate with itemized repair specifications' },
  { step: '03', title: 'Wood Removal', desc: 'Careful removal of damaged or rotted wood sections' },
  { step: '04', title: 'Quality Materials', desc: 'Premium lumber and materials matched to your home' },
  { step: '05', title: 'Expert Repair', desc: 'Skilled carpentry work with attention to detail' },
  { step: '06', title: 'Ready to Paint', desc: 'Smooth, primed surfaces ready for perfect paint adhesion' }
]

const aboutFeatures = [
  { icon: Users, text: 'Skilled Craftsmen' },
  { icon: Heart, text: 'Attention to Detail' },
  { icon: Shield, text: 'Fully Licensed & Insured' },
  { icon: Sparkles, text: 'Quality Guaranteed' }
]

export default function CarpentryPage() {
  return (
    <>
      <Header />

      {/* Schema JSON-LD for SEO */}
      <Script
        id="carpentry-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(carpentrySchema)
        }}
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
            alt="Professional Carpentry Services Massachusetts"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={75}
          />
          <div className="service-hero-overlay" />
        </div>

        <div className="container service-hero-content">
          <div className="service-hero-grid">
            {/* Hero Text */}
            <div>
              <div className="service-hero-badges">
                <span className="service-badge-location">
                  <MapPin size={16} />
                  Serving All Massachusetts
                </span>
                <span className="service-badge-rating">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  5.0 Rating
                </span>
              </div>

              <h1 className="service-hero-title">
                Professional{' '}
                <span className="service-hero-title-accent">
                  Carpentry
                </span>{' '}
                Services
              </h1>

              <p className="service-hero-desc">
                Expert carpentry repairs for window frames, door frames, siding, decks, and trim. Quality wood repairs before painting ensure lasting, beautiful results.
              </p>

              <div className="service-hero-ctas">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-primary">
                  <Phone size={20} />
                  {BUSINESS.phone}
                </a>
                <Link href="/#contact" className="service-cta-secondary">
                  Get Free Estimate
                  <ChevronRight size={20} />
                </Link>
              </div>

              <div className="service-hero-features">
                {[
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Award, text: 'Quality Craftsmanship' },
                  { icon: Clock, text: 'Fast Turnaround' }
                ].map((item, idx) => (
                  <div key={idx} className="service-hero-feature">
                    <item.icon size={18} className="service-hero-feature-icon" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form Card - Clean style */}
            <div className="hero-form-card">
              <LazyHeroForm
                className="hero-form-iframe"
                src={`https://api.leadconnectorhq.com/widget/form/${FORM_IDS.contact}`}
                title="Contact Form"
              />
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
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span className="rating">5</span>
            <Link href="/#reviews">
              See Our Reviews
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <section className="service-stats-bar">
        <div className="container">
          <div className="service-stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="service-stat">
                <div className="service-stat-number">{stat.number}</div>
                <div className="service-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="service-section-white">
        <div className="container">
          <div className="service-section-header">
            <h2 className="service-section-title">
              Don't Let Wood Damage Compromise Your Home
            </h2>
            <p className="service-section-subtitle">
              We don't take carpentry lightly. Quality repairs are essential for lasting paint jobs.
            </p>
          </div>

          <div className="service-pain-grid">
            {painPoints.map((item, idx) => (
              <div key={idx} className="service-pain-card">
                <div className="service-pain-icon">
                  <item.icon size={24} color="#fff" />
                </div>
                <h3 className="service-pain-title">{item.title}</h3>
                <p className="service-pain-desc">{item.desc}</p>
                <p className="service-pain-solution">
                  <CheckCircle2 size={18} />
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="before-after-section">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-red">See the Difference</span>
            <h2 className="service-section-title">
              Before & After Transformations
            </h2>
            <p className="service-section-subtitle">
              Drag the slider to see our quality work
            </p>
          </div>

          <div className="before-after-grid">
            {beforeAfterPairs.map((pair, idx) => (
              <BeforeAfterSlider
                key={idx}
                beforeImage={pair.before}
                afterImage={pair.after}
                beforeAlt={pair.beforeAlt}
                afterAlt={pair.afterAlt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="service-section-dark">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-dark">Our Carpentry Services</span>
            <h2 className="service-section-title-light">
              Complete Wood Repair Solutions
            </h2>
            <p className="service-section-subtitle-light">
              Professional carpentry for all your home repair needs
            </p>
          </div>

          <div className="service-list-grid">
            {services.map((service, idx) => (
              <div key={idx} className="service-list-item">
                <CheckCircle2 size={24} className="service-list-icon" />
                <span className="service-list-text">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="service-section-white">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-red">Our Process</span>
            <h2 className="service-section-title">
              6-Step Carpentry Process
            </h2>
            <p className="service-section-subtitle">
              Quality repairs that prepare your home for a perfect paint job
            </p>
          </div>

          <div className="service-process-grid">
            {processSteps.map((item, idx) => (
              <div key={idx} className="service-process-card">
                <div className="service-process-bg-number">{item.step}</div>
                <div className="service-process-number">{item.step}</div>
                <h3 className="service-process-title">{item.title}</h3>
                <p className="service-process-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="service-section-gray">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-red">Our Work</span>
            <h2 className="service-section-title">
              Carpentry Project Gallery
            </h2>
            <p className="service-section-subtitle">
              See examples of our quality carpentry work
            </p>
          </div>

          <div className="service-gallery-grid">
            {galleryImages.map((image, idx) => (
              <div key={idx} className="service-gallery-item">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
                <div className="service-gallery-overlay" />
                <div className="service-gallery-content">
                  <span className="service-gallery-category">{image.category}</span>
                  <p className="service-gallery-title">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="service-section-dark">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-dark">Watch Our Work</span>
            <h2 className="service-section-title-light">
              See Our Team in Action
            </h2>
            <p className="service-section-subtitle-light">
              Watch our expert carpentry and painting work
            </p>
          </div>

          <div className="service-video-grid">
            {VIDEOS.slice(0, 2).map((video, idx) => (
              <a
                key={idx}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="service-video-card"
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
                <div className="service-video-overlay">
                  <div className="service-video-play">
                    <Play size={32} fill="#fff" color="#fff" />
                  </div>
                </div>
                <div className="service-video-title">
                  <p>{video.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="service-section-white">
        <div className="container">
          <div className="service-about-grid">
            <div className="service-about-image-wrapper">
              <div className="service-about-image">
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                  alt="Jafet Henrique - Owner of JH Painting Services in Massachusetts"
                  fill
                  loading="lazy"
                  className="object-cover"
                  style={{ objectPosition: 'top center' }}
                />
              </div>
              <div className="service-about-experience">
                <div className="service-about-experience-number">7+</div>
                <div className="service-about-experience-label">Years Experience</div>
              </div>
            </div>

            <div>
              <span className="service-badge-red">About Us</span>
              <h2 className="service-about-title">
                Quality Carpentry by JH Painting Services
              </h2>
              <p className="service-about-desc">
                At JH Painting Services, we understand that quality carpentry is the foundation of a lasting paint job. Owner Jafet Henrique and his team don't take carpentry lightly—we know that repairing broken frames, siding, or any damaged wood prior to painting is essential for beautiful, long-lasting results.
              </p>
              <p className="service-about-desc">
                Whether it's rotted window sills, damaged door frames, weathered decks, or worn railings, we have the expertise to restore your home's woodwork to like-new condition. Our carpentry services prepare surfaces perfectly for paint, ensuring your investment lasts for years to come.
              </p>

              <div className="service-about-features">
                {aboutFeatures.map((item, idx) => (
                  <div key={idx} className="service-about-feature">
                    <item.icon size={24} className="service-about-feature-icon" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="service-section-gray">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-red">Related Services</span>
            <h2 className="service-section-title">
              Complete Home Improvement
            </h2>
            <p className="service-section-subtitle">
              Combine carpentry with our other expert services
            </p>
          </div>

          <div className="service-related-grid">
            <Link href="/services/exterior-painting" className="service-related-card">
              <h3>Exterior Painting</h3>
              <p>Complete exterior painting after carpentry repairs</p>
              <span>Learn More <ChevronRight size={16} /></span>
            </Link>
            <Link href="/services/interior-painting" className="service-related-card">
              <h3>Interior Painting</h3>
              <p>Interior trim and surface painting</p>
              <span>Learn More <ChevronRight size={16} /></span>
            </Link>
            <Link href="/services/cabinet-painting" className="service-related-card">
              <h3>Cabinet Painting</h3>
              <p>Transform your kitchen cabinets</p>
              <span>Learn More <ChevronRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta-red">
        <div className="service-cta-pattern" />
        <div className="container service-cta-content">
          <h2 className="service-cta-title">
            Ready to Repair Your Home's Woodwork?
          </h2>
          <p className="service-cta-desc">
            Get a free estimate for professional carpentry services in Massachusetts.
          </p>
          <div className="service-cta-buttons">
            <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-btn-white">
              <Phone size={20} />
              Call {BUSINESS.phone}
            </a>
            <Link href="/#contact" className="service-cta-btn-outline">
              Request Free Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
