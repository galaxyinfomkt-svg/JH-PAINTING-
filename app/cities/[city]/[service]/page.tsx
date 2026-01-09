'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import {
  Phone, Mail, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play,
  ChevronRight, ChevronDown, Sparkles, Home as HomeIcon, Building2,
  PaintBucket, Paintbrush, Palette, Menu, X, AlertCircle, Wrench,
  Users, DollarSign, Search, CheckSquare, ThumbsUp
} from 'lucide-react'
import { getCityBySlug, cities } from '@/app/data/cities'

interface Props {
  params: {
    city: string
    service: string
  }
}

// Menu data for navigation
const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: HomeIcon, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
]

// Generate Schema JSON-LD for city+service pages
function generateCityServiceSchema(cityName: string, serviceName: string, serviceSlug: string, citySlug: string, countyName: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://jhpaintingservices.com/cities/${citySlug}/${serviceSlug}#service`,
        "name": `${serviceName} in ${cityName}, MA`,
        "serviceType": serviceName,
        "description": `Professional ${serviceName.toLowerCase()} services in ${cityName}, ${countyName}, Massachusetts. Expert painters, premium materials, licensed & insured. Free estimates available.`,
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://jhpaintingservices.com/#localbusiness",
          "name": "JH Painting Services",
          "telephone": "+1-508-690-8886",
          "email": "contact@jhpaintingservices.com",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": cityName,
            "addressRegion": "MA",
            "addressCountry": "US"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "47",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        "areaServed": {
          "@type": "City",
          "name": cityName,
          "containedInPlace": {
            "@type": "State",
            "name": "Massachusetts"
          }
        },
        "url": `https://jhpaintingservices.com/cities/${citySlug}/${serviceSlug}`,
        "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jhpaintingservices.com" },
          { "@type": "ListItem", "position": 2, "name": serviceName, "item": `https://jhpaintingservices.com/services/${serviceSlug}` },
          { "@type": "ListItem", "position": 3, "name": `${cityName}, MA`, "item": `https://jhpaintingservices.com/cities/${citySlug}/${serviceSlug}` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How much does ${serviceName.toLowerCase()} cost in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${serviceName} costs in ${cityName}, MA vary based on project size, preparation needed, and paint quality. Interior painting typically ranges from $2-$6 per sq ft, exterior from $3-$7 per sq ft. Contact JH Painting at (508) 690-8886 for a free, accurate quote for your ${cityName} project.`
            }
          },
          {
            "@type": "Question",
            "name": `Are you licensed for ${serviceName.toLowerCase()} in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes! JH Painting Services is fully licensed and insured to provide ${serviceName.toLowerCase()} in ${cityName} and throughout Massachusetts. We carry $1 million in liability coverage and workers' compensation insurance for all employees.`
            }
          },
          {
            "@type": "Question",
            "name": `Do you offer free estimates for ${serviceName.toLowerCase()} in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Absolutely! We provide free, no-obligation estimates for all ${serviceName.toLowerCase()} projects in ${cityName}. Call (508) 690-8886 or fill out our online form to schedule your free consultation. We typically respond within 24 hours.`
            }
          },
          {
            "@type": "Question",
            "name": `How long does ${serviceName.toLowerCase()} take in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Project timelines vary based on scope. A single room typically takes 1-2 days. A full interior takes 4-7 days. Exterior painting for an average ${cityName} home takes 5-10 days depending on weather and prep work. We provide accurate timelines in our estimates.`
            }
          },
          {
            "@type": "Question",
            "name": "What paint brands do you use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We exclusively use premium paints from Sherwin-Williams and Benjamin Moore. These industry-leading brands offer superior coverage, durability, and color retention. For exteriors, we use paints specifically formulated to withstand Massachusetts' harsh winters and humid summers."
            }
          }
        ]
      }
    ]
  }
}

const servicesData: Record<string, {
  name: string
  title: string
  description: string
  heroImage: string
  challenges: { title: string; description: string }[]
  offerings: string[]
  neighborhoods: string[]
  housingTypes: string[]
}> = {
  'interior-painting': {
    name: 'Interior Painting',
    title: 'Professional Interior Painting',
    description: 'Transform your interior spaces with expert wall painting, ceiling painting, trim work, and color consultation.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    challenges: [
      { title: 'Peeling & flaking paint', description: 'We have proven solutions for this common problem.' },
      { title: 'Outdated colors', description: 'We have proven solutions for this common problem.' },
      { title: 'Water stains & damage', description: 'We have proven solutions for this common problem.' },
      { title: 'Uneven finishes', description: 'We have proven solutions for this common problem.' },
    ],
    offerings: ['Wall painting', 'Ceiling painting', 'Trim & baseboard painting', 'Door & frame painting', 'Accent walls', 'Drywall repair', 'Color consultation', 'Wallpaper removal'],
    neighborhoods: ['Downtown', 'Historic District', 'Suburban Areas', 'Residential Neighborhoods', 'And all surrounding areas'],
    housingTypes: ['Colonial homes', 'Victorian houses', 'Modern condos', 'Apartments', 'New construction'],
  },
  'exterior-painting': {
    name: 'Exterior Painting',
    title: 'Expert Exterior Painting',
    description: 'Protect and beautify your property exterior with premium weather-resistant paints and professional preparation.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    challenges: [
      { title: 'Weather damage', description: 'We have proven solutions for this common problem.' },
      { title: 'Peeling & chipping', description: 'We have proven solutions for this common problem.' },
      { title: 'Fading colors', description: 'We have proven solutions for this common problem.' },
      { title: 'Wood rot', description: 'We have proven solutions for this common problem.' },
    ],
    offerings: ['Full exterior painting', 'Siding painting', 'Trim & fascia', 'Shutters & doors', 'Deck staining', 'Power washing', 'Wood repair', 'Caulking & sealing'],
    neighborhoods: ['Downtown', 'Historic District', 'Suburban Areas', 'Residential Neighborhoods', 'And all surrounding areas'],
    housingTypes: ['Single-family homes', 'Multi-family homes', 'Historic properties', 'New construction', 'Condominiums'],
  },
  'commercial-painting': {
    name: 'Commercial Painting',
    title: 'Commercial Painting Services',
    description: 'Professional painting services for businesses with minimal disruption and maximum results.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg',
    challenges: [
      { title: 'Business disruption', description: 'We have proven solutions for this common problem.' },
      { title: 'Tight deadlines', description: 'We have proven solutions for this common problem.' },
      { title: 'Brand consistency', description: 'We have proven solutions for this common problem.' },
      { title: 'Safety compliance', description: 'We have proven solutions for this common problem.' },
    ],
    offerings: ['Office painting', 'Retail stores', 'Restaurants', 'Warehouses', 'Medical facilities', 'Educational facilities', 'Multi-tenant buildings', 'Industrial spaces'],
    neighborhoods: ['Business District', 'Industrial Area', 'Commercial Zones', 'Shopping Centers', 'And all surrounding areas'],
    housingTypes: ['Office buildings', 'Retail spaces', 'Restaurants', 'Warehouses', 'Healthcare facilities'],
  },
  'residential-painting': {
    name: 'Residential Painting',
    title: 'Residential Painting Services',
    description: 'Complete home painting solutions for interior and exterior projects of any size.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    challenges: [
      { title: 'Busy schedules', description: 'We have proven solutions for this common problem.' },
      { title: 'Quality concerns', description: 'We have proven solutions for this common problem.' },
      { title: 'Color decisions', description: 'We have proven solutions for this common problem.' },
      { title: 'Budget constraints', description: 'We have proven solutions for this common problem.' },
    ],
    offerings: ['Interior painting', 'Exterior painting', 'Whole house painting', 'Single room refresh', 'Accent walls', 'Trim work', 'Cabinet painting', 'Deck staining'],
    neighborhoods: ['Downtown', 'Historic District', 'Suburban Areas', 'Residential Neighborhoods', 'And all surrounding areas'],
    housingTypes: ['Single-family homes', 'Condos & townhouses', 'Apartments', 'Historic homes', 'New construction'],
  },
  'cabinet-painting': {
    name: 'Cabinet Painting',
    title: 'Cabinet Painting & Refinishing',
    description: 'Transform your kitchen cabinets for a fraction of replacement cost with our expert refinishing services.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png',
    challenges: [
      { title: 'Outdated cabinets', description: 'We have proven solutions for this common problem.' },
      { title: 'Worn finishes', description: 'We have proven solutions for this common problem.' },
      { title: 'Grease buildup', description: 'We have proven solutions for this common problem.' },
      { title: 'Color changes', description: 'We have proven solutions for this common problem.' },
    ],
    offerings: ['Cabinet painting', 'Cabinet refinishing', 'Door replacement', 'Hardware updates', 'Kitchen cabinets', 'Bathroom vanities', 'Built-in cabinets', 'Garage cabinets'],
    neighborhoods: ['Downtown', 'Historic District', 'Suburban Areas', 'Residential Neighborhoods', 'And all surrounding areas'],
    housingTypes: ['Modern kitchens', 'Traditional kitchens', 'Contemporary styles', 'Vintage restoration', 'Custom cabinetry'],
  },
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Exterior painting project' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'House painters Massachusetts' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Interior painting' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Interior painting bedroom' },
]

const processSteps = [
  { num: 1, title: 'Free Consultation', desc: 'We visit your property, discuss your vision, and provide a detailed quote.', icon: Phone },
  { num: 2, title: 'Color Selection', desc: 'Our experts help you choose the perfect colors for your space.', icon: Palette },
  { num: 3, title: 'Surface Preparation', desc: 'We handle all permits and create a detailed project timeline.', icon: Wrench },
  { num: 4, title: 'Expert Painting', desc: 'Our skilled craftsmen complete your project with precision.', icon: Paintbrush },
  { num: 5, title: 'Quality Inspection', desc: 'We inspect every aspect and ensure compliance with standards.', icon: Search },
  { num: 6, title: 'Final Walkthrough', desc: 'You review the completed work to ensure complete satisfaction.', icon: CheckSquare },
]

const nearbyCities = ['Boston', 'Cambridge', 'Brookline', 'Newton', 'Waltham', 'Framingham', 'Quincy', 'Somerville']

export default function CityServicePage({ params }: Props) {
  const city = getCityBySlug(params.city)
  const service = servicesData[params.service as keyof typeof servicesData]

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => {
    setMenuOpen(false)
    setMobileServicesOpen(false)
  }
  const toggleMobileServices = () => setMobileServicesOpen(!mobileServicesOpen)

  if (!city || !service) {
    notFound()
  }

  const cityServiceSchema = generateCityServiceSchema(city.name, service.name, params.service, params.city, city.county || 'Massachusetts')

  const faqs = [
    {
      q: `How much does ${service.name.toLowerCase()} cost in ${city.name}?`,
      a: `${service.name} costs in ${city.name}, MA vary based on project size, surface condition, and paint quality. We provide free, detailed estimates for accurate pricing. Call (508) 690-8886 for your free quote.`
    },
    {
      q: `Are you licensed and insured in ${city.name}?`,
      a: `Yes! JH Painting Services is fully licensed and insured to work in ${city.name} and throughout Massachusetts. We carry $1 million in liability coverage and workers' compensation for all employees.`
    },
    {
      q: `How long does ${service.name.toLowerCase()} take?`,
      a: `Project timelines vary based on scope. A single room typically takes 1-2 days, a full interior 4-7 days, and exterior painting 5-10 days. We provide accurate timelines in our free estimates.`
    },
    {
      q: 'What paint brands do you use?',
      a: 'We exclusively use premium paints from Sherwin-Williams and Benjamin Moore. These brands offer superior coverage, durability, and color retention, especially important for Massachusetts weather conditions.'
    },
  ]

  const otherServices = Object.entries(servicesData)
    .filter(([slug]) => slug !== params.service)
    .slice(0, 5)

  return (
    <>
      {/* Schema JSON-LD */}
      <Script
        id={`city-service-schema-${params.city}-${params.service}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityServiceSchema) }}
      />

      {/* Top Bar - Shows specific city */}
      <div className={`top-bar ${scrolled ? 'hidden' : ''}`}>
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <span className="top-bar-item">
                <MapPin size={12} />
                <span className="top-bar-city-name">Serving {city.name}, MA</span>
              </span>
              <a href="mailto:contact@jhpaintingservices.com" className="top-bar-item">
                <Mail size={12} />
                contact@jhpaintingservices.com
              </a>
            </div>
            <a href="tel:+15086908886" className="top-bar-phone-btn">
              <Phone size={12} />
              (508) 690-8886
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container">
          <div className="header-main">
            <Link href="/" className="logo">
              <Image
                src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png"
                alt="JH Painting Services Logo"
                width={160}
                height={64}
                priority
              />
            </Link>

            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/#about">About</Link>

              <div
                className="nav-dropdown"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="nav-dropdown-toggle">
                  Services
                  <ChevronDown size={16} className={`nav-dropdown-icon ${servicesOpen ? 'open' : ''}`} />
                </button>

                <div className={`nav-dropdown-menu ${servicesOpen ? 'open' : ''}`}>
                  <div className="nav-dropdown-grid">
                    {menuServices.map((svc, index) => {
                      const Icon = svc.icon
                      return (
                        <Link key={index} href={svc.href} className="nav-dropdown-item">
                          <div className="nav-dropdown-item-icon"><Icon size={20} /></div>
                          <div className="nav-dropdown-item-content">
                            <span className="nav-dropdown-item-title">{svc.name}</span>
                            <span className="nav-dropdown-item-desc">{svc.description}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  <Link href="/services" className="nav-dropdown-footer">
                    View All Services <ChevronRight size={16} />
                  </Link>
                </div>
              </div>

              <Link href="/#gallery">Gallery</Link>
              <Link href="/#reviews">Reviews</Link>
              <Link href="/#contact">Contact</Link>
            </nav>

            <button className="menu-btn" onClick={toggleMenu} aria-label="Open menu">
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu} />

        {/* Mobile Menu */}
        <nav className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <Image
              src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png"
              alt="JH Painting Services"
              width={120}
              height={48}
            />
            <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <div className="mobile-nav">
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/#about" onClick={closeMenu}>About</Link>

            <div className="mobile-nav-dropdown">
              <button
                type="button"
                className={`mobile-nav-dropdown-toggle ${mobileServicesOpen ? 'open' : ''}`}
                onClick={toggleMobileServices}
              >
                Services
                <ChevronDown size={18} className={`mobile-nav-dropdown-icon ${mobileServicesOpen ? 'open' : ''}`} />
              </button>

              <div className={`mobile-nav-dropdown-content ${mobileServicesOpen ? 'open' : ''}`}>
                {menuServices.map((svc, index) => {
                  const Icon = svc.icon
                  return (
                    <Link key={index} href={svc.href} onClick={closeMenu} className="mobile-nav-dropdown-item">
                      <div className="mobile-nav-dropdown-item-icon"><Icon size={18} /></div>
                      <div className="mobile-nav-dropdown-item-content">
                        <span className="mobile-nav-dropdown-item-title">{svc.name}</span>
                        <span className="mobile-nav-dropdown-item-desc">{svc.description}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            <Link href="/#gallery" onClick={closeMenu}>Gallery</Link>
            <Link href="/#reviews" onClick={closeMenu}>Reviews</Link>
            <Link href="/#contact" onClick={closeMenu}>Contact</Link>
          </div>
          <a href="tel:+15086908886" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
            <Phone size={18} />
            (508) 690-8886
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section className="hero" style={{ minHeight: '90vh' }}>
          <div className="hero-bg">
            <Image
              src={service.heroImage}
              alt={`${service.name} in ${city.name}, MA`}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="hero-overlay" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.6) 100%)' }} />

          <div className="hero-content container">
            {/* Breadcrumbs */}
            <nav style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <Link href="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</Link>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>/</span>
                <Link href={`/services/${params.service}`} style={{ color: 'rgba(255,255,255,0.7)' }}>{service.name}</Link>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>/</span>
                <span style={{ color: '#DC2626', fontWeight: '600' }}>{city.name}, MA</span>
              </div>
            </nav>

            <div className="hero-grid">
              <div className="hero-text">
                <div className="hero-top-badges">
                  <span className="hero-location-badge">
                    <MapPin size={16} />
                    Serving {city.name}, MA
                  </span>
                  <span className="hero-rating-badge">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <span className="hero-rating-text">5 (47 reviews)</span>
                  </span>
                </div>

                <h1 className="hero-title">
                  Professional <strong style={{ color: '#DC2626' }}>{service.name}</strong> in {city.name}, MA
                </h1>

                <p className="hero-subtitle">
                  {service.description} Our skilled crew provides precision {service.name.toLowerCase()} using premium materials and proven techniques that ensure long-lasting quality.
                </p>

                <div className="hero-buttons">
                  <a href="tel:+15086908886" className="btn btn-primary btn-lg">
                    <Phone size={20} />
                    Call (508) 690-8886
                  </a>
                  <a href="#quote-form" className="btn btn-outline btn-lg" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                    Get Free Estimate
                  </a>
                </div>

                <div className="hero-trust-badges">
                  <span className="hero-trust-badge"><Shield size={16} /> Licensed & Insured</span>
                  <span className="hero-trust-badge"><Clock size={16} /> Same Day Response</span>
                  <span className="hero-trust-badge"><DollarSign size={16} /> Free Estimates</span>
                </div>
              </div>

              {/* Quote Form */}
              <div id="quote-form" className="hero-form-card">
                <div className="hero-form-header">
                  <h2 className="hero-form-title">Get Your Free Quote</h2>
                  <p className="hero-form-subtitle">{service.name} in {city.name}, MA</p>
                </div>
                <iframe
                  className="hero-form-iframe"
                  src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                  title="Contact Form"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar Layout */}
        <div className="container" style={{ padding: '4rem 1rem' }}>
          <div className="city-service-layout">
            {/* Main Content Column */}
            <div className="city-service-main">

              {/* Challenges Section */}
              <section className="city-service-section">
                <div className="section-icon-header">
                  <Wrench size={24} />
                  <h2>Common {service.name} Challenges in {city.name}</h2>
                </div>
                <p style={{ marginBottom: '2rem', color: 'var(--jh-text-light)' }}>
                  {city.name} homeowners face unique challenges when it comes to {service.name.toLowerCase()}. Here are the most common issues we solve:
                </p>
                <div className="challenges-grid">
                  {service.challenges.map((challenge, idx) => (
                    <div key={idx} className="challenge-card">
                      <div className="challenge-icon">
                        <AlertCircle size={20} />
                      </div>
                      <div>
                        <h4>{challenge.title}</h4>
                        <p>We have proven solutions for this common {city.name} problem.</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="expert-solution-box">
                  <CheckCircle2 size={24} />
                  <div>
                    <h4>Expert Solutions for {city.name}</h4>
                    <p>Our team has extensive experience solving these exact challenges for {city.name} homeowners. We've completed hundreds of successful {service.name.toLowerCase()} projects in the area and know exactly how to deliver results that last.</p>
                  </div>
                </div>
              </section>

              {/* Your Trusted Contractor Section */}
              <section className="city-service-section trusted-contractor-section">
                <div className="section-icon-header">
                  <MapPin size={24} />
                  <h2>Your Trusted {service.name} Contractor in {city.name}</h2>
                </div>
                <p style={{ marginBottom: '2rem' }}>
                  As a {city.name}-area {service.name.toLowerCase()} specialist, we understand the local housing market, climate conditions, and what {city.name} homeowners need. Our proximity means faster response times, better communication, and a contractor who truly knows your community.
                </p>
                <div className="neighborhoods-grid">
                  <div className="neighborhood-card">
                    <div className="neighborhood-icon"><HomeIcon size={20} /></div>
                    <h4>{city.name} Neighborhoods We Serve</h4>
                    <ul>
                      {service.neighborhoods.map((n, i) => (
                        <li key={i}><CheckCircle2 size={14} /> {n.replace('Downtown', `${city.name} Center`).replace('Historic District', `Historic ${city.name}`)}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="neighborhood-card">
                    <div className="neighborhood-icon"><Building2 size={20} /></div>
                    <h4>{city.name} Housing Types We Work On</h4>
                    <ul>
                      {service.housingTypes.map((h, i) => (
                        <li key={i}><CheckCircle2 size={14} /> {h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Process Steps */}
              <section className="city-service-section">
                <h2>Our {service.name} Process</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--jh-text-light)' }}>
                  We follow a proven 6-step process to ensure exceptional results on every {city.name} project:
                </p>
                <div className="process-grid-service">
                  {processSteps.map((step) => (
                    <div key={step.num} className="process-step-card">
                      <div className="process-step-num">0{step.num}</div>
                      <div className="process-step-icon">
                        <step.icon size={26} />
                      </div>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* What We Offer */}
              <section className="city-service-section">
                <h2>What We Offer</h2>
                <div className="offerings-grid">
                  {service.offerings.map((offering, idx) => (
                    <div key={idx} className="offering-item">
                      <CheckCircle2 size={20} />
                      <span>{offering}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Choose Us */}
              <section className="city-service-section">
                <h2>Why {city.name} Chooses JH Painting Services</h2>
                <div className="why-choose-grid">
                  <div className="why-choose-item">
                    <div className="why-choose-icon"><Shield size={24} /></div>
                    <div>
                      <h4>Licensed & Insured</h4>
                      <p>Full coverage protection</p>
                    </div>
                  </div>
                  <div className="why-choose-item">
                    <div className="why-choose-icon"><Star size={24} /></div>
                    <div>
                      <h4>5-Star Rated</h4>
                      <p>47+ Google reviews</p>
                    </div>
                  </div>
                  <div className="why-choose-item">
                    <div className="why-choose-icon"><Clock size={24} /></div>
                    <div>
                      <h4>On-Time Completion</h4>
                      <p>We respect your schedule</p>
                    </div>
                  </div>
                  <div className="why-choose-item">
                    <div className="why-choose-icon"><DollarSign size={24} /></div>
                    <div>
                      <h4>Free Estimates</h4>
                      <p>No obligation quotes</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Gallery */}
              <section className="city-service-section">
                <h2>See Our Work in Action</h2>
                <p style={{ marginBottom: '2rem', color: 'var(--jh-text-light)' }}>
                  Watch our expert team tackle {service.name.toLowerCase()} and more across Massachusetts.
                </p>
                <div className="gallery-grid-service">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="gallery-item-service">
                      <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </section>

              {/* Service Area Map */}
              <section className="city-service-section">
                <div className="section-icon-header">
                  <MapPin size={24} />
                  <h2>Service Area: {city.name}, MA</h2>
                </div>
                <div className="map-container-service">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(city.name + ', Massachusetts')}&zoom=12`}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${city.name} MA Map`}
                    style={{ width: '100%', height: '300px', border: 'none', borderRadius: '12px' }}
                  />
                </div>
                <p style={{ marginTop: '1rem', color: 'var(--jh-text-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HomeIcon size={16} /> Based in Waltham, we provide {service.name.toLowerCase()} throughout {city.name} and surrounding areas.
                </p>
              </section>

              {/* FAQs */}
              <section className="city-service-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list-service">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className={`faq-item-service ${openFaqIndex === idx ? 'open' : ''}`}>
                      <button
                        className="faq-question-service"
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      >
                        {faq.q}
                        <ChevronDown size={20} className={openFaqIndex === idx ? 'rotate' : ''} />
                      </button>
                      <div className={`faq-answer-service ${openFaqIndex === idx ? 'open' : ''}`}>
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="city-service-sidebar">
              {/* Sticky Form */}
              <div className="sidebar-form-card">
                <h3>Get a Free Estimate</h3>
                <p>{service.name} in {city.name}, MA</p>
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                  title="Contact Form"
                  loading="lazy"
                  style={{ width: '100%', height: '400px', border: 'none' }}
                />
                <div className="sidebar-cta-box">
                  <span>Call Us Now</span>
                  <a href="tel:+15086908886">(508) 690-8886</a>
                </div>
              </div>

              {/* Other Services */}
              <div className="sidebar-card">
                <h4>Other Services in This Area</h4>
                <ul className="sidebar-links">
                  {otherServices.map(([slug, svc]) => (
                    <li key={slug}>
                      <Link href={`/cities/${params.city}/${slug}`}>
                        <ChevronRight size={14} /> {svc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nearby Cities */}
              <div className="sidebar-card">
                <h4>{service.name} Nearby</h4>
                <ul className="sidebar-links">
                  {nearbyCities.filter(c => c !== city.name).slice(0, 6).map((nearbyCity) => (
                    <li key={nearbyCity}>
                      <Link href={`/cities/${nearbyCity.toLowerCase().replace(/ /g, '-')}/${params.service}`}>
                        <ChevronRight size={14} /> {nearbyCity}, MA
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Transform Your {city.name} Property?</h2>
              <p>Expert {service.name.toLowerCase()} with free estimates, no obligation.</p>
              <a href="tel:+15086908886" className="btn btn-lg">
                <Phone size={20} />
                Call (508) 690-8886
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Image
                src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png"
                alt="JH Painting Services"
                width={160}
                height={64}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <p>Professional painting services for homes and businesses across Massachusetts. Licensed, insured, and dedicated to excellence.</p>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/#about">About</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/#gallery">Gallery</Link></li>
                <li><Link href="/#reviews">Reviews</Link></li>
                <li><Link href="/#contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact Us</h4>
              <div className="footer-contact-item">
                <Phone size={16} />
                <a href="tel:+15086908886">(508) 690-8886</a>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} />
                <a href="mailto:contact@jhpaintingservices.com">contact@jhpaintingservices.com</a>
              </div>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>Serving All of Massachusetts</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 JH Painting Services. All Rights Reserved. Licensed Painting Contractor | Serving Massachusetts</p>
          </div>
        </div>
      </footer>
    </>
  )
}
