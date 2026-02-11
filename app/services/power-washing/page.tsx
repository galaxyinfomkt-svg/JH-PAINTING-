'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider'
import { BUSINESS, FORM_IDS } from '@/lib/constants'
import LazyHeroForm from '@/app/components/LazyHeroForm'

// Inline SVG icons to reduce bundle size
const PhoneIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const CheckCircle2Icon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
  </svg>
)
const StarIcon = ({ size = 24, fill = 'none' }: { size?: number; fill?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const ClockIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
const ShieldIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
  </svg>
)
const AwardIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)
const ChevronRightIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)
const UsersIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const HeartIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
)
const SparklesIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
)
const MapPinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const DropletsIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
  </svg>
)
const HomeIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const BrushIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>
  </svg>
)

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
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a30274e42b930842eea35.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a3027a03db26c93445285.webp',
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
    icon: DropletsIcon,
    title: 'Dirty, Stained Surfaces?',
    desc: "Dirt, mold, mildew, and algae make your home look old and neglected. Regular cleaning won't remove years of buildup. You need professional equipment to restore your property's appearance.",
    solution: 'Professional power washing removes years of buildup'
  },
  {
    icon: HomeIcon,
    title: 'Planning to Paint Soon?',
    desc: "Paint won't adhere properly to dirty surfaces. Skipping power washing means your new paint job won't last. Proper prep is essential for a paint job that lasts 7-10 years.",
    solution: 'Essential pre-paint prep for lasting results'
  },
  {
    icon: BrushIcon,
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
  { icon: UsersIcon, text: 'Experienced Technicians' },
  { icon: HeartIcon, text: 'Attention to Detail' },
  { icon: ShieldIcon, text: 'Fully Licensed & Insured' },
  { icon: SparklesIcon, text: 'Satisfaction Guaranteed' }
]

export default function PowerWashingPage() {
  return (
    <>
      <Header />

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
                  <MapPinIcon size={16} />
                  Serving All Massachusetts
                </span>
                <span className="service-badge-rating">
                  <StarIcon size={14} fill="currentColor" />
                  <StarIcon size={14} fill="currentColor" />
                  <StarIcon size={14} fill="currentColor" />
                  <StarIcon size={14} fill="currentColor" />
                  <StarIcon size={14} fill="currentColor" />
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

              <p className="service-hero-desc">
                Restore your property&apos;s appearance with professional power washing. We clean homes,
                decks, driveways, patios, and more. Essential preparation for painting projects
                and property maintenance across Massachusetts.
              </p>

              <div className="service-hero-ctas">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-primary">
                  <PhoneIcon size={20} />
                  {BUSINESS.phone}
                </a>
                <Link href="/contact" className="service-cta-secondary">
                  Get Free Estimate
                  <ChevronRightIcon size={20} />
                </Link>
              </div>

              <div className="service-hero-features">
                <div className="service-hero-feature">
                  <ShieldIcon size={18} />
                  <span>$2M Insured</span>
                </div>
                <div className="service-hero-feature">
                  <AwardIcon size={18} />
                  <span>7+ Years Experience</span>
                </div>
                <div className="service-hero-feature">
                  <ClockIcon size={18} />
                  <span>Same-Week Service</span>
                </div>
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
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
            </div>
            <span className="rating">5</span>
            <Link href="/#reviews">
              See Our Reviews
              <ChevronRightIcon size={14} />
            </Link>
          </div>
        </div>
      </div>

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
                      <CheckCircle2Icon size={18} />
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
                  <CheckCircle2Icon size={20} className="service-offering-icon" />
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
        <section className="service-cta-red">
          <div className="container">
            <div className="service-cta-content">
              <h2 className="service-cta-title">Ready to Restore Your Property?</h2>
              <p className="service-cta-subtitle">Get a free power washing estimate today. Professional service, guaranteed results.</p>
              <div className="service-cta-buttons">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-btn-white">
                  <PhoneIcon size={20} />
                  Call {BUSINESS.phone}
                </a>
                <Link href="/contact" className="service-cta-btn-outline">
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
