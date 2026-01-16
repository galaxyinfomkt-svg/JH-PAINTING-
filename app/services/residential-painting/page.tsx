'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, MapPin, Paintbrush, Home } from 'lucide-react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { BUSINESS, VIDEOS, FORM_IDS } from '@/lib/constants'
import LazyIframe from '@/app/components/LazyIframe'
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider'

// Schema JSON-LD for Residential Painting Service
const residentialPaintingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jhpaintingservices.com/services/residential-painting#service",
      "name": "Residential Painting Services Massachusetts",
      "serviceType": "Residential Painting",
      "description": "Professional residential painting services for Massachusetts homes. Expert interior and exterior house painting, quality finishes, fair prices. Licensed and insured painters.",
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
        "name": "Residential Painting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Interior House Painting",
              "description": "Complete interior painting for bedrooms, living rooms, kitchens"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Exterior House Painting",
              "description": "Full exterior painting including siding, trim, and decks"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Whole House Painting",
              "description": "Complete interior and exterior home painting packages"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Room Painting",
              "description": "Individual room painting services"
            }
          }
        ]
      },
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png",
      "url": "https://jhpaintingservices.com/services/residential-painting"
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
          "name": "Residential Painting",
          "item": "https://jhpaintingservices.com/services/residential-painting"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does it cost to paint a house in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "House painting costs in Massachusetts vary by size and scope. Interior painting typically ranges from $2-$6 per square foot, while exterior painting ranges from $3-$7 per square foot. A typical 2,000 sq ft home interior costs $4,000-$12,000. Contact JH Painting for a free estimate."
          }
        },
        {
          "@type": "Question",
          "name": "How often should I paint my house?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Interior paint typically lasts 5-10 years depending on room usage and paint quality. Exterior paint in Massachusetts should be refreshed every 5-7 years due to weather exposure. High-traffic areas may need repainting sooner."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide color consultation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We offer complimentary color consultation to help you choose the perfect colors for your home. Our experienced team can suggest colors that complement your decor, lighting, and personal style."
          }
        },
        {
          "@type": "Question",
          "name": "Are your painters licensed and insured?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. JH Painting Services is fully licensed and insured in Massachusetts. We carry comprehensive liability insurance and workers compensation to protect both our team and your property."
          }
        }
      ]
    }
  ]
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg', alt: 'Historic church restoration interior painting in Waltham MA', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp', alt: 'Professional exterior house painting in Massachusetts', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Modern living room painting services in Massachusetts', category: 'Living Room' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Elegant bedroom painting transformation Waltham MA', category: 'Bedroom' },
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
    icon: Paintbrush,
    title: 'Walls That Look Worn & Dated?',
    desc: "Faded paint, scuff marks, and outdated colors can make your entire home feel old and uninviting. You deserve a fresh, modern look that makes you proud.",
    solution: 'Transform tired spaces into beautiful, welcoming rooms'
  },
  {
    icon: Shield,
    title: 'Worried About Messy Contractors?',
    desc: "Past experiences with sloppy painters who leave your home in chaos? We understand. Your home deserves respect and careful attention to detail.",
    solution: 'We treat your home like our own—careful prep and daily cleanup'
  },
  {
    icon: Clock,
    title: 'Afraid of Hidden Costs & Delays?',
    desc: "Sick of contractors who quote one price then add fees, or promise quick work but drag on for weeks? You need someone you can trust.",
    solution: 'Transparent pricing and reliable timelines—no surprises'
  }
]

const stats = [
  { number: '1000+', label: 'Homes Painted' },
  { number: '15+', label: 'Years Experience' },
  { number: '100%', label: 'Satisfaction Rate' },
  { number: '114', label: 'Cities Served' }
]

const services = [
  'Interior room painting',
  'Whole house interior',
  'Exterior house painting',
  'Kitchen painting',
  'Bathroom painting',
  'Living room painting',
  'Bedroom painting',
  'Basement painting',
  'Garage painting',
  'Ceiling painting',
  'Trim & molding',
  'Door & window painting',
  'Deck & fence staining',
  'Cabinet refinishing',
  'Wallpaper removal',
  'Drywall repair',
  'Color consultation',
  'Accent walls'
]

const processSteps = [
  { step: '01', title: 'Free Consultation', desc: 'In-home assessment, detailed estimate, and personalized recommendations' },
  { step: '02', title: 'Color Selection', desc: 'Expert color consultation with samples to find your perfect palette' },
  { step: '03', title: 'Preparation', desc: 'Complete furniture protection, repairs, and meticulous surface prep' },
  { step: '04', title: 'Professional Painting', desc: 'Expert application with premium paints and attention to detail' },
  { step: '05', title: 'Quality Inspection', desc: 'Thorough inspection ensuring every detail meets our high standards' },
  { step: '06', title: 'Final Walkthrough', desc: 'Complete cleanup and walkthrough to ensure your satisfaction' }
]

const aboutFeatures = [
  { icon: Shield, text: 'Licensed & Insured' },
  { icon: Award, text: '15+ Years Experience' },
  { icon: Users, text: '1000+ Happy Clients' },
  { icon: Heart, text: 'Family Owned' }
]

export default function ResidentialPaintingPage() {
  return (
    <>
      <Header />

      {/* Schema JSON-LD for SEO */}
      <Script
        id="residential-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(residentialPaintingSchema)
        }}
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png"
            alt="Professional Residential Painting Services Massachusetts"
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
                  Residential Painting
                </span>{' '}
                Services
              </h1>

              <p className="service-hero-desc">
                Transform your Massachusetts home with expert residential painting. From single rooms to complete home makeovers, we deliver stunning results that exceed expectations.
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
                  { icon: Award, text: 'Expert Craftsmen' },
                  { icon: Clock, text: 'On-Time Service' }
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
                  Fast response • No obligation • Residential painting experts
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
              Tired of Living with Outdated, Peeling Paint?
            </h2>
            <p className="service-section-subtitle">
              We understand the frustration. Your home should be your sanctuary, not a source of stress.
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
            <span className="service-badge-dark">Complete Home Painting Solutions</span>
            <h2 className="service-section-title-light">
              Residential Painting Services
            </h2>
            <p className="service-section-subtitle-light">
              From single rooms to complete home transformations, we deliver stunning results
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
            <span className="service-badge-red">Our Proven Process</span>
            <h2 className="service-section-title">
              6 Steps to Your Dream Home
            </h2>
            <p className="service-section-subtitle">
              We follow a systematic approach to ensure flawless results every time
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
            <span className="service-badge-red">Our Portfolio</span>
            <h2 className="service-section-title">
              Recent Home Transformations
            </h2>
            <p className="service-section-subtitle">
              See the stunning transformations we have created for Massachusetts homeowners
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
            <span className="service-badge-dark">See Us In Action</span>
            <h2 className="service-section-title-light">
              Watch Our Work
            </h2>
            <p className="service-section-subtitle-light">
              See the quality and care we bring to every residential painting project
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
                <div className="service-about-experience-label">Years of Excellence</div>
              </div>
            </div>

            <div>
              <span className="service-badge-red">About JH Painting</span>
              <h2 className="service-about-title">
                Your Trusted Home Painting Partner
              </h2>
              <p className="service-about-desc">
                At JH Painting, we understand that inviting contractors into your home is a big decision. That is why we have built our reputation on trust, quality, and respect for your space.
              </p>
              <p className="service-about-desc">
                When you choose us for your residential painting project, you are partnering with professionals who genuinely care about transforming your space while treating your home like our own.
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
            Ready to Transform Your Home?
          </h2>
          <p className="service-cta-desc">
            Get a free estimate and color consultation. Experience the JH Painting difference.
          </p>
          <div className="service-cta-buttons">
            <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-btn-white">
              <Phone size={20} />
              Call {BUSINESS.phone}
            </a>
            <Link href="/#contact" className="service-cta-btn-outline">
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
