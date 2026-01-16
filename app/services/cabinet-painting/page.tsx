'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, MapPin, Palette, DollarSign, Timer } from 'lucide-react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { BUSINESS, VIDEOS, FORM_IDS } from '@/lib/constants'
import LazyIframe from '@/app/components/LazyIframe'
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider'

// Schema JSON-LD for Cabinet Painting Service
const cabinetPaintingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jhpaintingservices.com/services/cabinet-painting#service",
      "name": "Cabinet Painting & Refinishing Services Massachusetts",
      "serviceType": "Cabinet Painting",
      "description": "Professional cabinet painting and refinishing services in Massachusetts. Transform your kitchen cabinets for 70% less than replacement. Expert spray finishing, premium materials, flawless results.",
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
        "name": "Cabinet Painting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Kitchen Cabinet Painting",
              "description": "Complete kitchen cabinet painting and transformation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cabinet Spray Finishing",
              "description": "Professional spray finish for smooth, factory-like results"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cabinet Door Refinishing",
              "description": "Cabinet door and drawer front refinishing"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bathroom Vanity Painting",
              "description": "Bathroom vanity cabinet refinishing services"
            }
          }
        ]
      },
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg",
      "url": "https://jhpaintingservices.com/services/cabinet-painting"
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
          "name": "Cabinet Painting",
          "item": "https://jhpaintingservices.com/services/cabinet-painting"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does cabinet painting cost in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cabinet painting in Massachusetts typically costs $3,000-$7,000 for a standard kitchen, which is 70% less than full cabinet replacement. The exact cost depends on cabinet size, condition, and finish type. Contact JH Painting for a free estimate."
          }
        },
        {
          "@type": "Question",
          "name": "How long does cabinet painting take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Professional cabinet painting typically takes 5-7 days for a standard kitchen. This includes proper cleaning, sanding, priming, painting multiple coats, and curing time to ensure a durable, long-lasting finish."
          }
        },
        {
          "@type": "Question",
          "name": "Is cabinet painting better than cabinet replacement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cabinet painting is an excellent alternative to replacement if your cabinets are structurally sound. You save 70% of the cost, keep existing layout, and can achieve a completely new look. Modern paints provide durable, beautiful finishes that last for years."
          }
        },
        {
          "@type": "Question",
          "name": "What type of paint do you use on cabinets?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use premium cabinet-grade paints from Benjamin Moore and Sherwin-Williams, specifically formulated for high-traffic kitchen environments. These paints provide excellent adhesion, durability, and a smooth, professional finish."
          }
        }
      ]
    }
  ]
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg', alt: 'Historic church restoration interior painting in Waltham MA', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Modern gray cabinet refinishing services Waltham MA', category: 'Cabinet Refinishing' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Professional spray finish cabinet painting Massachusetts', category: 'Spray Finishing' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp', alt: 'Professional exterior painting Massachusetts', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp', alt: 'Professional deck staining and power washing MA', category: 'Deck' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Historic church exterior painting in Waltham MA', category: 'Exterior' },
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
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a3027a03db26c93445285.webp',
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
    icon: DollarSign,
    title: 'New Cabinets Too Expensive?',
    desc: "Full kitchen cabinet replacement can cost $15,000-$50,000. That's a massive investment that most homeowners can't justify. But outdated cabinets drag down your entire kitchen.",
    solution: 'Save 70% with professional cabinet painting'
  },
  {
    icon: Timer,
    title: 'Weeks of Kitchen Downtime?',
    desc: "Cabinet replacement means weeks without a functional kitchen—demolition, installation, countertop adjustments. It's disruptive and stressful for the whole family.",
    solution: 'Cabinet painting takes just 5-7 days'
  },
  {
    icon: Palette,
    title: 'Tired of the Same Old Look?',
    desc: "Your kitchen cabinets set the tone for the entire space. Outdated oak, honey maple, or worn finishes make even clean kitchens look dated and dull.",
    solution: 'Modern colors and smooth finishes transform your kitchen'
  }
]

const stats = [
  { number: '500+', label: 'Cabinets Refinished' },
  { number: '70%', label: 'Cost Savings' },
  { number: '5-7', label: 'Days Average' },
  { number: '114', label: 'Cities Served' }
]

const services = [
  'Kitchen cabinet painting',
  'Cabinet door refinishing',
  'Drawer front painting',
  'Bathroom vanity painting',
  'Built-in cabinet painting',
  'Pantry cabinet refinishing',
  'Island cabinet painting',
  'Hardware update assistance',
  'Color consultation',
  'Professional spray finishing',
  'Premium cabinet paints',
  'Durable factory-like finish'
]

const processSteps = [
  { step: '01', title: 'Free Consultation', desc: 'In-home assessment, color consultation, and detailed quote' },
  { step: '02', title: 'Door Removal', desc: 'Careful removal and labeling of all doors, drawers, and hardware' },
  { step: '03', title: 'Deep Cleaning', desc: 'Thorough degreasing and cleaning of all cabinet surfaces' },
  { step: '04', title: 'Prep & Priming', desc: 'Sanding, filling, and premium primer application' },
  { step: '05', title: 'Spray Application', desc: 'Professional spray finishing for smooth, even coverage' },
  { step: '06', title: 'Reinstallation', desc: 'Careful reinstallation, hardware mounting, and final inspection' }
]

const aboutFeatures = [
  { icon: Users, text: 'Family-Owned Business' },
  { icon: Heart, text: 'Detail-Oriented Approach' },
  { icon: Shield, text: 'Fully Licensed & Insured' },
  { icon: Sparkles, text: 'Factory-Quality Finish' }
]

export default function CabinetPaintingPage() {
  return (
    <>
      <Header />

      {/* Schema JSON-LD for SEO */}
      <Script
        id="cabinet-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cabinetPaintingSchema)
        }}
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg"
            alt="Professional Cabinet Painting Services Massachusetts"
            fill
            className="object-cover"
            priority
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
                  Cabinet Painting
                </span>{' '}
                Services
              </h1>

              <p className="service-hero-desc">
                Transform your kitchen cabinets for 70% less than replacement. Expert spray finishing, premium paints, and factory-quality results that last for years.
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
                  { icon: Award, text: 'Save 70% vs Replacement' },
                  { icon: Clock, text: '5-7 Day Turnaround' }
                ].map((item, idx) => (
                  <div key={idx} className="service-hero-feature">
                    <item.icon size={18} className="service-hero-feature-icon" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form Card */}
            <div className="service-form-card">
              <div className="text-center mb-6">
                <h2 className="service-form-title">
                  Get Your Free Quote
                </h2>
                <p className="service-form-subtitle">
                  Fast response • No obligation • Cabinet painting experts
                </p>
              </div>
              <LazyIframe
                src={`https://api.leadconnectorhq.com/widget/form/${FORM_IDS.contact}`}
                title="Contact Form"
                className="service-form-iframe"
                style={{ minHeight: '450px' }}
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
              Dreaming of a Kitchen Transformation Without the Massive Price Tag?
            </h2>
            <p className="service-section-subtitle">
              Cabinet painting delivers stunning results at a fraction of the cost of replacement.
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
            <span className="service-badge-dark">Our Cabinet Services</span>
            <h2 className="service-section-title-light">
              Complete Cabinet Refinishing Solutions
            </h2>
            <p className="service-section-subtitle-light">
              Professional cabinet painting with factory-quality results
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
              6-Step Cabinet Painting Process
            </h2>
            <p className="service-section-subtitle">
              Meticulous preparation and expert application for flawless results
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
              Cabinet Transformation Gallery
            </h2>
            <p className="service-section-subtitle">
              See the stunning cabinet makeovers we have completed
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
              See Our Cabinet Transformations
            </h2>
            <p className="service-section-subtitle-light">
              Watch our expert cabinet painting process in action
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
                Meet Jafet Henrique, Your Cabinet Painting Expert
              </h2>
              <p className="service-about-desc">
                With over 15 years of experience transforming kitchens across Massachusetts, JH Painting Services has perfected the art of cabinet refinishing. Owner Jafet Henrique leads every project with dedication to achieving factory-quality finishes.
              </p>
              <p className="service-about-desc">
                We understand that your kitchen is the heart of your home. That's why we use premium cabinet-grade paints and professional spray equipment to deliver smooth, durable finishes that look beautiful and stand up to daily use for years to come.
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
            Ready to Transform Your Kitchen Cabinets?
          </h2>
          <p className="service-cta-desc">
            Get a free estimate and see how much you can save with professional cabinet painting.
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
