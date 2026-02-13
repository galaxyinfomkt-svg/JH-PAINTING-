'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, Building2, Briefcase, TrendingUp } from '@/app/components/icons'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { BUSINESS, VIDEOS, FORM_IDS } from '@/lib/constants'
import LazyHeroForm from '@/app/components/LazyHeroForm'
import dynamic from 'next/dynamic'

const BeforeAfterSlider = dynamic(() => import('@/app/components/BeforeAfterSlider'), { ssr: false })

// Schema JSON-LD for Commercial Painting Service
const commercialPaintingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jhpaintingservices.com/services/commercial-painting#service",
      "name": "Commercial Painting Services Massachusetts",
      "serviceType": "Commercial Painting",
      "description": "Professional commercial painting services across Massachusetts. Office buildings, retail stores, restaurants, warehouses. Minimal business disruption, on-time completion, premium finishes.",
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
        "name": "Commercial Painting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Office Building Painting",
              "description": "Professional office space and building painting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Retail Store Painting",
              "description": "Retail and storefront painting services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Restaurant Painting",
              "description": "Restaurant and hospitality painting services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Warehouse & Industrial Painting",
              "description": "Warehouse and industrial facility painting"
            }
          }
        ]
      },
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg",
      "url": "https://jhpaintingservices.com/services/commercial-painting"
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
          "name": "Commercial Painting",
          "item": "https://jhpaintingservices.com/services/commercial-painting"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you paint during business hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer flexible scheduling including evenings and weekends to minimize disruption to your business operations. Many commercial projects are completed outside regular business hours to ensure your operations continue smoothly."
          }
        },
        {
          "@type": "Question",
          "name": "How much does commercial painting cost in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Commercial painting costs vary based on square footage, surface condition, paint type, and project complexity. Most commercial projects range from $1.50-$4 per square foot. Contact JH Painting for a free, detailed estimate for your business."
          }
        },
        {
          "@type": "Question",
          "name": "Are you licensed and insured for commercial work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, JH Painting Services is fully licensed and insured for commercial projects in Massachusetts. We carry comprehensive liability insurance and workers compensation coverage for your protection."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a commercial painting project take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Project timelines depend on size and scope. A typical office suite takes 2-4 days, while larger facilities may take 1-3 weeks. We provide detailed timelines and work efficiently to minimize business disruption."
          }
        }
      ]
    }
  ]
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Historic church exterior painting in Waltham MA', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg', alt: 'Historic church restoration interior painting in Waltham MA', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Commercial office painting services in Massachusetts', category: 'Office' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp', alt: 'Professional exterior painting Massachusetts', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Retail store and storefront painting Waltham MA', category: 'Retail' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp', alt: 'Professional deck staining and power washing MA', category: 'Deck' },
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
    title: 'Worried About Business Disruption?',
    desc: "Closing your business for painting means lost revenue and unhappy customers. You need painters who work around your schedule, not the other way around.",
    solution: 'Flexible scheduling - evenings & weekends available'
  },
  {
    title: 'Need a Professional Image?',
    desc: "Peeling paint, scuffed walls, and outdated colors send the wrong message to clients. Your space should reflect the quality of your business.",
    solution: 'Premium finishes that impress clients'
  },
  {
    title: 'Concerned About Liability?',
    desc: "Hiring uninsured contractors puts your business at risk. One accident could mean lawsuits and costly damages.",
    solution: 'Fully licensed, insured & bonded'
  }
]

const stats = [
  { number: '200+', label: 'Commercial Projects' },
  { number: '15+', label: 'Years Experience' },
  { number: '100%', label: 'On-Time Delivery' },
  { number: '117', label: 'Cities Served' }
]

const features = [
  { icon: Building2, text: 'Commercial Specialists' },
  { icon: Briefcase, text: 'Minimal Business Disruption' },
  { icon: Shield, text: 'Fully Licensed & Insured' },
  { icon: TrendingUp, text: 'Professional Results' }
]

export default function CommercialPaintingPage() {
  return (
    <>
      {/* Schema JSON-LD for SEO */}
      <Script
        id="commercial-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(commercialPaintingSchema)
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content">

      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg"
            alt="Professional Commercial Painting Services Massachusetts"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={35}
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
                  Commercial Painting
                </span>{' '}
                Services
              </h1>

              <p className="service-hero-desc">
                Transform your business space with expert commercial painting. Offices, retail stores, restaurants, and warehouses across Massachusetts. Minimal disruption, maximum impact.
              </p>

              <div className="service-hero-ctas">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-primary">
                  <Phone size={20} />
                  {BUSINESS.phone}
                </a>
                <Link href="/#contact" className="service-cta-secondary">
                  Get Your Free Estimate
                  <ChevronRight size={20} />
                </Link>
              </div>

              <div className="service-hero-features">
                {[
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Award, text: 'Expert Craftsmen' },
                  { icon: Clock, text: 'Flexible Scheduling' }
                ].map((item, idx) => (
                  <div key={idx} className="service-hero-feature">
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form Card - Clean style */}
            <div className="hero-form-card">
              <LazyHeroForm
                className="hero-form-iframe"
                src={`https://api.leadconnectorhq.com/widget/form/${FORM_IDS.quote}`}
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
            <a href="https://g.page/r/Cb984Z3qm9PsEAE/review" target="_blank" rel="noopener noreferrer">
              See Our Reviews
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Trust Indicators Bar */}
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
      <section className="service-section service-section-white">
        <div className="container">
          <div className="service-section-header">
            <h2 className="service-section-title">
              Your Business Deserves Better Than Amateur Painters
            </h2>
            <p className="service-section-subtitle">
              Don&apos;t let subpar painting hurt your professional image. We solve these common business painting challenges.
            </p>
          </div>

          <div className="service-pain-grid">
            {painPoints.map((item, idx) => (
              <div key={idx} className="service-pain-card">
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

      {/* Photo Gallery */}
      <section className="service-section service-section-gray">
        <div className="container">
          <div className="service-section-header">
            <span className="service-section-badge">Our Work</span>
            <h2 className="service-section-title">Commercial Painting Gallery</h2>
            <p className="service-section-subtitle">
              Professional commercial transformations across Massachusetts
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
                  quality={75}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="service-gallery-overlay">
                  <div>
                    <span className="service-gallery-badge">{image.category}</span>
                    <p className="service-gallery-label">{image.alt}</p>
                  </div>
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
      <section className="service-section service-section-dark">
        <div className="container">
          <div className="service-section-header">
            <h2 className="service-section-title service-section-title-light">
              See Our Commercial Transformations
            </h2>
            <p className="service-section-subtitle service-section-subtitle-light">
              Watch how we transform business spaces with professional painting
            </p>
          </div>

          <div className="service-video-grid">
            {VIDEOS.map((video, idx) => (
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
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="service-video-overlay">
                  <div className="service-video-play">
                    <Play size={32} fill="#fff" color="#fff" />
                  </div>
                </div>
                <p className="service-video-title">{video.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="service-section service-section-white">
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
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="service-about-experience">
                <div className="service-about-experience-number">15+</div>
                <div className="service-about-experience-label">Years Experience</div>
              </div>
            </div>

            <div className="service-about-content">
              <span className="service-section-badge">About Us</span>
              <h2>Commercial Painting Specialists You Can Trust</h2>
              <p>
                JH Painting Services has been delivering exceptional commercial painting results across Massachusetts for over 15 years. We understand that your business space represents your brand.
              </p>
              <p>
                From small offices to large industrial facilities, we bring the same dedication to quality and professionalism. Our flexible scheduling ensures minimal disruption to your operations.
              </p>

              <div className="service-about-features">
                {features.map((item, idx) => (
                  <div key={idx} className="service-about-feature">
                    <item.icon size={24} />
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
        <div className="container">
          <div className="service-cta-content">
            <h2 className="service-cta-title">Ready to Transform Your Business Space?</h2>
            <p className="service-cta-subtitle">
              Licensed, $2M insured & 5-star rated. Same-day response on all estimates. No obligation.
            </p>
            <div className="service-cta-buttons">
              <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-btn-white">
                <Phone size={20} />
                Call {BUSINESS.phone}
              </a>
              <Link href="/#contact" className="service-cta-btn-outline">
                Get Your Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
