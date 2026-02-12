'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, MapPin, Sun, Home, Droplets } from '@/app/components/icons'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { BUSINESS, VIDEOS, FORM_IDS } from '@/lib/constants'
import LazyHeroForm from '@/app/components/LazyHeroForm'
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider'

// Schema JSON-LD for Exterior Painting Service
const exteriorPaintingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jhpaintingservices.com/services/exterior-painting#service",
      "name": "Exterior Painting Services Massachusetts",
      "serviceType": "Exterior House Painting",
      "description": "Professional exterior house painting services across Massachusetts. Complete surface preparation, power washing, premium weather-resistant paints. Protect and beautify your home exterior.",
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
        "name": "Exterior Painting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "House Siding Painting",
              "description": "Professional siding painting with weather-resistant paints"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Trim & Fascia Painting",
              "description": "Expert exterior trim, fascia, and soffit painting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Deck Staining & Sealing",
              "description": "Deck staining, sealing and restoration services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Power Washing",
              "description": "Complete surface power washing and preparation"
            }
          }
        ]
      },
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg",
      "url": "https://jhpaintingservices.com/services/exterior-painting"
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
          "name": "Exterior Painting",
          "item": "https://jhpaintingservices.com/services/exterior-painting"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does exterior house painting cost in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Exterior house painting in Massachusetts typically ranges from $3-$7 per square foot, depending on home size, siding type, condition, and paint quality. Most homes cost between $3,000-$10,000. Contact JH Painting for a free, detailed estimate."
          }
        },
        {
          "@type": "Question",
          "name": "What is the best time of year to paint a house exterior in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The best time for exterior painting in Massachusetts is late spring through early fall (May-October) when temperatures are consistently between 50-85F and humidity is moderate. We monitor weather carefully to ensure optimal paint adhesion and curing."
          }
        },
        {
          "@type": "Question",
          "name": "How long does exterior paint last in Massachusetts weather?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Quality exterior paint with proper preparation typically lasts 7-10 years in Massachusetts. Our premium paints and meticulous surface prep ensure maximum durability against New England weather conditions including snow, rain, and UV exposure."
          }
        },
        {
          "@type": "Question",
          "name": "Do you power wash before painting exteriors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, power washing is a critical step in our exterior painting process. We thoroughly clean all surfaces to remove dirt, mildew, and loose paint, ensuring optimal adhesion and a long-lasting finish."
          }
        }
      ]
    }
  ]
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Historic church exterior painting in Waltham MA', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp', alt: 'Professional exterior house painting in Massachusetts', category: 'House Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp', alt: 'Professional deck staining and power washing MA', category: 'Deck Staining' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg', alt: 'Historic church restoration interior painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Complete exterior home painting transformation Massachusetts', category: 'Full Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Professional painting services in Massachusetts', category: 'Interior' },
]

// Before/After transformation pairs
const beforeAfterPairs = [
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23ad3443ab5.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg',
    beforeAlt: 'Historic church interior before restoration in Waltham MA',
    afterAlt: 'Historic church interior after professional restoration in Waltham MA'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23bb3443ab4.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg',
    beforeAlt: 'Historic church exterior before painting in Waltham MA',
    afterAlt: 'Historic church exterior after professional painting in Waltham MA'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac7eb2da7db4eacd6a2.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp',
    beforeAlt: 'Residential exterior before painting',
    afterAlt: 'Residential exterior after professional painting'
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
    icon: Sun,
    title: 'Peeling, Cracking Paint?',
    desc: "Snow, rain, sun, and freeze-thaw cycles destroy paint. Peeling and cracking aren't just ugly—they expose your home to moisture damage and rot that costs thousands to repair.",
    solution: 'Weather-resistant paints built for New England'
  },
  {
    icon: Home,
    title: 'Embarrassed by Curb Appeal?',
    desc: "Faded, dingy siding makes your whole property look neglected—even if everything else is perfect. Your home's appearance affects property value and neighborhood perception.",
    solution: 'Transform your home in just days'
  },
  {
    icon: Droplets,
    title: 'Worried About Quality & Protection?',
    desc: "Bad exterior paint jobs fail in 1-2 years. You need proper prep, quality materials, and expert application to protect your investment for a decade or more.",
    solution: 'Thorough prep and premium paints guarantee longevity'
  }
]

const stats = [
  { number: '1000+', label: 'Exteriors Painted' },
  { number: '15+', label: 'Years Experience' },
  { number: '100%', label: 'Weather Protection' },
  { number: '114', label: 'Cities Served' }
]

const services = [
  'Complete house exterior painting',
  'Wood, vinyl & aluminum siding',
  'Stucco and masonry painting',
  'Trim, fascia & soffit painting',
  'Deck and fence staining',
  'Door and shutter painting',
  'Power washing & surface prep',
  'Caulking and wood repair',
  'Color consultation services',
  'Premium weather-resistant paints',
  'Garage door painting',
  'Foundation coating'
]

const processSteps = [
  { step: '01', title: 'Inspection & Estimate', desc: 'Thorough assessment of your exterior and detailed free quote' },
  { step: '02', title: 'Power Washing', desc: 'Deep cleaning of all surfaces to remove dirt, mold, and loose paint' },
  { step: '03', title: 'Surface Prep & Repair', desc: 'Scraping, sanding, caulking, and wood repairs for perfect adhesion' },
  { step: '04', title: 'Priming', desc: 'Quality primer application for optimal paint adhesion and coverage' },
  { step: '05', title: 'Professional Painting', desc: 'Expert application of premium exterior paint with multiple coats' },
  { step: '06', title: 'Final Inspection', desc: 'Quality check and customer walkthrough to ensure satisfaction' }
]

const aboutFeatures = [
  { icon: Users, text: 'Family-Owned Business' },
  { icon: Heart, text: 'Customer-First Approach' },
  { icon: Shield, text: 'Fully Licensed & Insured' },
  { icon: Sparkles, text: 'Weather-Resistant Paints' }
]

export default function ExteriorPaintingPage() {
  return (
    <>
      <Header />

      {/* Schema JSON-LD for SEO */}
      <Script
        id="exterior-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(exteriorPaintingSchema)
        }}
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
            alt="Professional Exterior Painting Services Massachusetts"
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
                  Exterior Painting
                </span>{' '}
                Services
              </h1>

              <p className="service-hero-desc">
                Protect and beautify your home's exterior with weather-resistant finishes built for Massachusetts climate. Premium paints, expert application, and lasting protection for 10-15 years.
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
                  { icon: Award, text: 'Weather-Resistant' },
                  { icon: Clock, text: '10-15 Year Protection' }
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
              Is Your Home's Exterior Weathered and Fading?
            </h2>
            <p className="service-section-subtitle">
              Massachusetts weather is brutal on exterior paint. Let's protect your investment.
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

      {/* Services Section */}
      <section className="service-section-dark">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-dark">Our Exterior Services</span>
            <h2 className="service-section-title-light">
              Complete Exterior Painting Solutions
            </h2>
            <p className="service-section-subtitle-light">
              Protecting Massachusetts homes from the elements with premium finishes
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
              6-Step Exterior Painting Process
            </h2>
            <p className="service-section-subtitle">
              Thorough preparation and expert application for lasting results
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
              Exterior Painting Gallery
            </h2>
            <p className="service-section-subtitle">
              Beautiful exterior transformations across Massachusetts
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

      {/* Before/After Section */}
      <section className="before-after-section">
        <div className="container">
          <div className="section-header section-header-enhanced">
            <span className="section-eyebrow">See The Difference</span>
            <h2>Before & After Transformations</h2>
            <p>Drag the slider to see the amazing results we deliver for our Massachusetts clients.</p>
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

      {/* Video Section */}
      <section className="service-section-dark">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-dark">Watch Our Work</span>
            <h2 className="service-section-title-light">
              See Our Exterior Transformations
            </h2>
            <p className="service-section-subtitle-light">
              Watch how we protect and beautify homes
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
                <div className="service-about-experience-number">15+</div>
                <div className="service-about-experience-label">Years Experience</div>
              </div>
            </div>

            <div>
              <span className="service-badge-red">About Us</span>
              <h2 className="service-about-title">
                Meet Jafet Henrique, Your Exterior Painting Expert
              </h2>
              <p className="service-about-desc">
                With over 15 years of experience protecting Massachusetts homes from the elements, JH Painting Services understands what it takes to deliver exterior paint jobs that last. Owner Jafet Henrique leads every project with dedication to quality and weather-resistant finishes.
              </p>
              <p className="service-about-desc">
                We know Massachusetts weather—harsh winters, humid summers, and everything in between. That's why we use premium, weather-resistant paints and follow meticulous preparation processes that ensure your exterior paint job protects your home for 10-15 years.
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

      {/* CTA Section */}
      <section className="service-cta-red">
        <div className="service-cta-pattern" />
        <div className="container service-cta-content">
          <h2 className="service-cta-title">
            Ready to Transform Your Home's Exterior?
          </h2>
          <p className="service-cta-desc">
            Get a free estimate today and protect your investment with professional exterior painting.
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
