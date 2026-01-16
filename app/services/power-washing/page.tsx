'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, CheckCircle2, Star, Clock, Shield, Award, ChevronRight, Users, Heart, Sparkles, MapPin, Droplets, Home, Brush } from 'lucide-react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider'
import { BUSINESS, VIDEOS, FORM_IDS } from '@/lib/constants'
import LazyIframe from '@/app/components/LazyIframe'

// Schema JSON-LD for Power Washing Service
const powerWashingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jhpaintingservices.com/services/power-washing#service",
      "name": "Power Washing Services Massachusetts",
      "serviceType": "Power Washing",
      "description": "Professional power washing and pressure cleaning services in Massachusetts. Expert cleaning for homes, decks, driveways, patios, and siding. Restore your property's appearance before painting.",
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
        "name": "Power Washing Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "House Washing",
              "description": "Professional exterior house washing to remove dirt, mold, and mildew"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Deck Cleaning",
              "description": "Deep cleaning of wood and composite decks"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Driveway Cleaning",
              "description": "Remove oil stains, dirt, and grime from driveways"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Patio & Walkway Cleaning",
              "description": "Restore patios, walkways, and outdoor surfaces"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fence Cleaning",
              "description": "Clean and restore wood and vinyl fences"
            }
          }
        ]
      },
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp",
      "url": "https://jhpaintingservices.com/services/power-washing"
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
          "name": "Power Washing",
          "item": "https://jhpaintingservices.com/services/power-washing"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How often should I power wash my house?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We recommend power washing your home's exterior at least once a year, or before any exterior painting project. Massachusetts weather with its humidity and seasonal changes can cause mold, mildew, and algae buildup that should be removed regularly."
          }
        },
        {
          "@type": "Question",
          "name": "Is power washing safe for all surfaces?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use different pressure levels and techniques for different surfaces. Soft washing is used for delicate surfaces like painted wood and siding, while higher pressure is appropriate for concrete and stone. Our experienced technicians know exactly what settings to use for each surface type."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to power wash before painting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Power washing is essential before any exterior painting project. It removes dirt, mold, mildew, loose paint, and other contaminants that prevent proper paint adhesion. This step is critical for a long-lasting paint job."
          }
        },
        {
          "@type": "Question",
          "name": "How much does power washing cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Power washing costs vary based on the size of the area and type of surface. House washing typically ranges from $200-$500, decks $100-$300, and driveways $100-$250. We provide free estimates for all power washing projects."
          }
        }
      ]
    }
  ]
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp', alt: 'Professional deck power washing services Massachusetts', category: 'Deck Cleaning' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'House exterior power washing Massachusetts', category: 'House Washing' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'Exterior cleaning services Waltham MA', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp', alt: 'Professional power washing before painting', category: 'Pre-Paint Prep' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Church exterior power washing restoration', category: 'Commercial' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Patio and hardscape cleaning Massachusetts', category: 'Patio' },
]

// Before/After pairs for slider
const beforeAfterPairs = [
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a30277f301b94ac7227dc.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp',
    beforeAlt: 'Deck before power washing and staining',
    afterAlt: 'Deck after professional power washing and staining'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23bb3443ab4.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg',
    beforeAlt: 'Historic church exterior before cleaning',
    afterAlt: 'Historic church exterior after power washing'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac7eb2da7db4eacd6a2.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp',
    beforeAlt: 'House exterior before power washing',
    afterAlt: 'House exterior after professional cleaning'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a39f37b4d1e5cbf3c1272.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a39f38441b1a824eef7d0.webp',
    beforeAlt: 'Home exterior before cleaning',
    afterAlt: 'Home exterior after power washing'
  }
]

const painPoints = [
  {
    icon: Droplets,
    title: 'Dirty, Stained Surfaces?',
    desc: "Dirt, mold, mildew, and algae make your home look old and neglected. Regular cleaning won't remove years of buildup. You need professional equipment to restore your property's appearance.",
    solution: 'Professional power washing removes years of buildup'
  },
  {
    icon: Home,
    title: 'Planning to Paint Soon?',
    desc: "Paint won't adhere properly to dirty surfaces. Skipping power washing means your new paint job won't last. Proper prep is essential for a paint job that lasts 7-10 years.",
    solution: 'Essential pre-paint prep for lasting results'
  },
  {
    icon: Brush,
    title: 'Slippery Decks & Walkways?',
    desc: "Algae and mold make outdoor surfaces dangerously slippery, especially when wet. This is a safety hazard for your family and guests. Don't wait for an accident.",
    solution: 'Restore safety with professional cleaning'
  }
]

const stats = [
  { number: '500+', label: 'Power Wash Jobs' },
  { number: '7+', label: 'Years Experience' },
  { number: '116', label: 'Cities Served' },
  { number: '5.0', label: 'Google Rating' }
]

const services = [
  'House exterior washing',
  'Deck cleaning & restoration',
  'Driveway cleaning',
  'Patio & walkway cleaning',
  'Fence cleaning',
  'Siding cleaning',
  'Brick & stone cleaning',
  'Concrete cleaning',
  'Pre-paint surface prep',
  'Mold & mildew removal',
  'Gutter exterior cleaning',
  'Commercial property washing'
]

const processSteps = [
  { step: '01', title: 'Free Estimate', desc: 'We assess your property and provide a detailed quote' },
  { step: '02', title: 'Surface Prep', desc: 'We protect plants, windows, and sensitive areas' },
  { step: '03', title: 'Pre-Treatment', desc: 'Apply cleaning solutions for tough stains and mold' },
  { step: '04', title: 'Power Washing', desc: 'Professional cleaning with appropriate pressure levels' },
  { step: '05', title: 'Detail Work', desc: 'Extra attention to stubborn spots and edges' },
  { step: '06', title: 'Final Rinse', desc: 'Thorough rinse and inspection of all surfaces' }
]

const aboutFeatures = [
  { icon: Users, text: 'Experienced Technicians' },
  { icon: Heart, text: 'Attention to Detail' },
  { icon: Shield, text: 'Fully Licensed & Insured' },
  { icon: Sparkles, text: 'Satisfaction Guaranteed' }
]

export default function PowerWashingPage() {
  return (
    <>
      <Header variant="service" />

      {/* Schema JSON-LD for SEO */}
      <Script
        id="power-washing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(powerWashingSchema)
        }}
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp"
            alt="Professional Power Washing Services Massachusetts"
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
                  Power Washing
                </span>{' '}
                Services in Massachusetts
              </h1>

              <p className="service-hero-description">
                Restore your property's appearance with professional power washing. We clean homes,
                decks, driveways, patios, and more. Essential preparation for painting projects
                and property maintenance across Massachusetts.
              </p>

              <div className="service-hero-trust">
                <div className="service-trust-item">
                  <Shield size={20} />
                  <span>$2M Insured</span>
                </div>
                <div className="service-trust-item">
                  <Award size={20} />
                  <span>7+ Years Experience</span>
                </div>
                <div className="service-trust-item">
                  <Clock size={20} />
                  <span>Same-Week Service</span>
                </div>
              </div>

              <div className="service-hero-cta">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-primary btn-lg">
                  <Phone size={20} />
                  Call {BUSINESS.phone}
                </a>
                <Link href="/contact" className="btn btn-outline btn-lg">
                  Get Free Estimate
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>

            {/* Hero Form */}
            <div className="service-hero-form-wrapper">
              <div className="service-form-card">
                <div className="service-form-header">
                  <h3>Get Your Free Estimate</h3>
                  <p>Fast response • No obligation</p>
                </div>
                <LazyIframe
                  src={`https://api.leadconnectorhq.com/widget/form/${FORM_IDS.servicePages}`}
                  title="Power Washing Quote Form"
                  className="service-form-iframe"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Stats Section */}
        <section className="service-stats">
          <div className="container">
            <div className="service-stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="service-stat-card">
                  <span className="service-stat-number">{stat.number}</span>
                  <span className="service-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="service-section service-section-light">
          <div className="container">
            <div className="service-section-header">
              <span className="service-section-eyebrow">Common Challenges</span>
              <h2 className="service-section-title">Is Your Property Looking Its Best?</h2>
              <p className="service-section-subtitle">
                We solve the toughest cleaning challenges for Massachusetts homeowners
              </p>
            </div>

            <div className="service-pain-points-grid">
              {painPoints.map((point, idx) => {
                const Icon = point.icon
                return (
                  <div key={idx} className="service-pain-card">
                    <div className="service-pain-icon">
                      <Icon size={32} />
                    </div>
                    <h3>{point.title}</h3>
                    <p>{point.desc}</p>
                    <div className="service-pain-solution">
                      <CheckCircle2 size={18} />
                      <span>{point.solution}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Services List Section */}
        <section className="service-section">
          <div className="container">
            <div className="service-section-header">
              <span className="service-section-eyebrow">Our Services</span>
              <h2 className="service-section-title">Complete Power Washing Solutions</h2>
              <p className="service-section-subtitle">
                Professional cleaning for every surface on your property
              </p>
            </div>

            <div className="service-offerings-grid">
              {services.map((service, idx) => (
                <div key={idx} className="service-offering-item">
                  <CheckCircle2 size={20} className="service-offering-icon" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="service-section service-section-light">
          <div className="container">
            <div className="service-section-header">
              <span className="service-section-eyebrow">Our Work</span>
              <h2 className="service-section-title">Power Washing Gallery</h2>
              <p className="service-section-subtitle">See the difference professional cleaning makes</p>
            </div>

            <div className="service-gallery-grid">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="service-gallery-item">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="service-gallery-overlay">
                    <span className="service-gallery-category">{img.category}</span>
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

        {/* Process Section */}
        <section className="service-section">
          <div className="container">
            <div className="service-section-header">
              <span className="service-section-eyebrow">Our Process</span>
              <h2 className="service-section-title">How We Work</h2>
              <p className="service-section-subtitle">
                Professional power washing from start to finish
              </p>
            </div>

            <div className="service-process-grid">
              {processSteps.map((step, idx) => (
                <div key={idx} className="service-process-card">
                  <span className="service-process-number">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="service-section service-section-dark">
          <div className="container">
            <div className="service-about-grid">
              <div className="service-about-content">
                <span className="service-section-eyebrow service-section-eyebrow-light">Why Choose Us</span>
                <h2 className="service-section-title service-section-title-light">
                  Massachusetts' Trusted Power Washing Experts
                </h2>
                <p className="service-about-text">
                  JH Painting Services has been providing professional power washing services across
                  Massachusetts for over 7 years. We understand that proper surface cleaning is essential
                  for both maintenance and preparation for painting projects.
                </p>
                <p className="service-about-text">
                  Our experienced technicians use professional-grade equipment and environmentally
                  friendly cleaning solutions. We adjust our techniques for each surface type to
                  ensure thorough cleaning without damage.
                </p>

                <div className="service-about-features">
                  {aboutFeatures.map((feature, idx) => {
                    const Icon = feature.icon
                    return (
                      <div key={idx} className="service-about-feature">
                        <Icon size={24} />
                        <span>{feature.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="service-about-image">
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp"
                  alt="JH Painting Services Power Washing Team"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta-section">
          <div className="container">
            <div className="service-cta-content">
              <h2>Ready to Restore Your Property?</h2>
              <p>Get a free power washing estimate today. Professional service, guaranteed results.</p>
              <div className="service-cta-buttons">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-white btn-lg">
                  <Phone size={20} />
                  Call {BUSINESS.phone}
                </a>
                <Link href="/contact" className="btn btn-outline-white btn-lg">
                  Schedule Free Estimate
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
