'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { Phone, Mail, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, Home, Building2, PaintBucket, Brush, Menu, X, ChevronDown, Paintbrush, Palette, DollarSign, Hammer, Droplets } from 'lucide-react'
import { getCityBySlug, cities } from '@/app/data/cities'
import { getCityContent } from '@/app/data/cityContent'
import LazyIframe from '@/app/components/LazyIframe'
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider'

// Menu data
const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: Home, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
  { name: 'Carpentry', href: '/services/carpentry', icon: Hammer, description: 'Expert wood repairs & trim work' },
  { name: 'Power Washing', href: '/services/power-washing', icon: Droplets, description: 'Professional pressure cleaning' },
]

interface Props {
  params: { city: string }
}

// Generate Schema JSON-LD for the city page
function generateCitySchema(cityName: string, countyName: string, citySlug: string, faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://jhpaintingservices.com/cities/${citySlug}#localbusiness`,
        "name": `JH Painting Services - ${cityName}`,
        "alternateName": [`${cityName} Painters`, `JH Painting ${cityName}`],
        "description": `Professional painting services in ${cityName}, Massachusetts. Expert interior & exterior painting, cabinet refinishing. Licensed & insured painters serving ${cityName} and ${countyName}.`,
        "url": `https://jhpaintingservices.com/cities/${citySlug}`,
        "telephone": "+1-508-690-8886",
        "email": "contact@jhpaintingservices.com",
        "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityName,
          "addressRegion": "MA",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 42.3765,
          "longitude": -71.2356
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "07:00",
            "closes": "18:00"
          }
        ],
        "areaServed": {
          "@type": "City",
          "name": cityName,
          "containedInPlace": {
            "@type": "State",
            "name": "Massachusetts"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "40",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `Painting Services in ${cityName}`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Interior Painting in ${cityName}`,
                "description": `Professional interior painting services in ${cityName}, MA`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Exterior Painting in ${cityName}`,
                "description": `Professional exterior house painting in ${cityName}, MA`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Cabinet Painting in ${cityName}`,
                "description": `Kitchen cabinet refinishing in ${cityName}, MA`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Commercial Painting in ${cityName}`,
                "description": `Commercial painting services in ${cityName}, MA`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Carpentry Services in ${cityName}`,
                "description": `Professional carpentry and wood repairs in ${cityName}, MA`
              }
            }
          ]
        }
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
            "name": "Service Areas",
            "item": "https://jhpaintingservices.com/cities"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${cityName} Painters`,
            "item": `https://jhpaintingservices.com/cities/${citySlug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  }
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg', alt: 'Historic church restoration interior painting in Waltham MA', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Historic church exterior painting in Waltham MA', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp', alt: 'Professional exterior house painting services in Massachusetts', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp', alt: 'Deck staining and power washing services in Massachusetts', category: 'Deck' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Bedroom interior painting services in MA by JH Painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Professional interior painting contractors serving Massachusetts', category: 'Interior' },
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

const videos = [
  { id: 'F_lreXzNlUI', title: 'Exterior Painting in Massachusetts', type: 'YouTube Short' },
  { id: 'LkT_HLyKibY', title: 'Interior Painting in Massachusetts', type: 'YouTube Short' },
]

// Use all cities from the actual cities list
const footerCities = cities.map(c => c.name)

const servicesList = [
  { slug: 'interior-painting', name: 'Interior Painting', icon: Brush },
  { slug: 'exterior-painting', name: 'Exterior Painting', icon: Home },
  { slug: 'commercial-painting', name: 'Commercial Painting', icon: Building2 },
  { slug: 'residential-painting', name: 'Residential Painting', icon: Home },
  { slug: 'cabinet-painting', name: 'Cabinet Painting', icon: PaintBucket },
]

export default function CityPage({ params }: Props) {
  const city = getCityBySlug(params.city)
  const cityContent = getCityContent(params.city)
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

  if (!city) {
    notFound()
  }

  const citySchema = generateCitySchema(city.name, city.county || 'Massachusetts', params.city, cityContent.faq)

  return (
    <>
      {/* Schema JSON-LD for SEO */}
      <Script
        id={`city-schema-${params.city}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(citySchema)
        }}
      />

      {/* Top Bar */}
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
            <a href="tel:+15086908886" className="top-bar-phone-btn" aria-label="Call JH Painting Services at 508-690-8886">
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

              {/* Services Dropdown */}
              <div
                className="nav-dropdown"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="nav-dropdown-toggle" aria-expanded={servicesOpen ? "true" : "false"} aria-haspopup="true">
                  Services
                  <ChevronDown size={16} className={`nav-dropdown-icon ${servicesOpen ? 'open' : ''}`} />
                </button>

                <div className={`nav-dropdown-menu ${servicesOpen ? 'open' : ''}`}>
                  <div className="nav-dropdown-grid">
                    {menuServices.map((service, index) => {
                      const Icon = service.icon
                      return (
                        <Link key={index} href={service.href} className="nav-dropdown-item">
                          <div className="nav-dropdown-item-icon">
                            <Icon size={20} />
                          </div>
                          <div className="nav-dropdown-item-content">
                            <span className="nav-dropdown-item-title">{service.name}</span>
                            <span className="nav-dropdown-item-desc">{service.description}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  <Link href="/services" className="nav-dropdown-footer">
                    View All Services
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>

              <Link href="/#gallery">Gallery</Link>
              <Link href="/#reviews">Reviews</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/#contact">Contact</Link>
            </nav>

            <a href="tel:+15086908886" className="header-cta" aria-label="Call JH Painting Services at 508-690-8886">
              <Phone size={18} />
              (508) 690-8886
            </a>

            <button className="menu-btn" onClick={toggleMenu} aria-label="Open menu">
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`}
          onClick={closeMenu}
        />

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

            {/* Mobile Services Accordion */}
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
                {menuServices.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <Link key={index} href={service.href} onClick={closeMenu} className="mobile-nav-dropdown-item">
                      <div className="mobile-nav-dropdown-item-icon">
                        <Icon size={18} />
                      </div>
                      <div className="mobile-nav-dropdown-item-content">
                        <span className="mobile-nav-dropdown-item-title">{service.name}</span>
                        <span className="mobile-nav-dropdown-item-desc">{service.description}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            <Link href="/#gallery" onClick={closeMenu}>Gallery</Link>
            <Link href="/#reviews" onClick={closeMenu}>Reviews</Link>
            <Link href="/blog" onClick={closeMenu}>Blog</Link>
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

      {/* Luxury Hero Section */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
            alt={`Professional Painting Services in ${city.name}, Massachusetts`}
            fill
            style={{ objectFit: 'cover' }}
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6NT04Mj4uQkJCLkpKTk5OWlpVVV5eXl5eXl7/2wBDARUXFx4aHh4lISElXkI2Ql5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl7/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAHxAAAgICAgMBAAAAAAAAAAAAAQIAAwQREiExQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ANmNkY9lJx8ipLKm5KyuAQNb8H2JTU"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.70) 50%, rgba(0, 0, 0, 0.60) 100%)'
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '120px', paddingBottom: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Hero Text */}
            <div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <MapPin size={16} />
                  {city.name}, Massachusetts
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #D20404 0%, #A80303 100%)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  5.0
                </span>
              </div>

              <h1 className="hero-title" style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '800',
                color: '#fff',
                lineHeight: '1.05',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}>
                <span className="hero-title-number">#1</span> <span className="hero-title-highlight">Painting</span><br />
                <span className="hero-title-highlight">Contractor</span> <span className="hero-title-in">in</span><br />
                <span className="hero-title-city">{city.name}, MA</span>
              </h1>

              <p className="hero-cities" style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                lineHeight: '1.5',
                marginBottom: '1rem',
                fontWeight: '500'
              }}>
                Interior & Exterior Painting<br />
                Cabinet Refinishing & More
              </p>
              <p className="hero-description" style={{
                fontSize: '1.0625rem',
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: '1.7',
                marginBottom: '2rem',
                maxWidth: '600px'
              }}>
                Looking for professional painters in {city.name}, MA? JH Painting Services delivers premium interior and exterior painting,
                cabinet refinishing, and deck staining for {city.name} homeowners. Fully licensed, insured, and backed by 40+ five-star
                Google reviews. We use Sherwin-Williams and Benjamin Moore paints for lasting results. Free estimates, no hidden fees.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <a href="tel:+15086908886" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #D20404 0%, #A80303 100%)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 10px 40px rgba(220, 38, 38, 0.4)',
                  transition: 'all 0.3s ease'
                }}>
                  <Phone size={20} />
                  (508) 690-8886
                </a>
                <a href="#quote-form" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}>
                  Get Free Estimate
                  <ChevronRight size={20} />
                </a>
              </div>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Clock, text: 'Same Day Response' },
                  { icon: Award, text: '40+ 5-Star Google Reviews' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                    <item.icon size={18} color="#D20404" />
                    <span style={{ fontSize: '0.9375rem', fontWeight: '500' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form Card */}
            <div id="quote-form" style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
                  borderRadius: '100px',
                  color: '#166534',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  <Sparkles size={16} />
                  Free Estimate
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>
                  Get Your Free Quote
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9375rem' }}>
                  We'll respond within 24 hours
                </p>
              </div>

              <LazyIframe
                src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                style={{ width: '100%', height: '450px', border: 'none', borderRadius: '12px' }}
                title="Contact Form - Request Free Painting Estimate"
              />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginTop: '1rem',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#D20404" color="#D20404" />)}
                </div>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem' }}>5.0 on Google Reviews</span>
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

      {/* Trust Indicators Bar */}
      <section style={{ background: '#0F172A', padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { value: '200+', label: 'Projects Completed' },
              { value: '5.0', label: 'Google Rating' },
              { value: '114+', label: 'Cities Served' },
              { value: '100%', label: 'Satisfaction' }
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#D20404' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VSL Style Story Section */}
      <section className="vsl-intro-section">
        <div className="container">
          {/* Opening Hook */}
          <div className="vsl-hook">
            <div className="vsl-hook-badge">
              <MapPin size={16} />
              <span>Local {city.name} Story</span>
            </div>
            <h2 className="vsl-hook-title">
              Why We <span className="vsl-highlight">Love</span> Painting Homes in {city.name}
            </h2>
            <p className="vsl-hook-subtitle">
              (And Why {city.name} Homeowners Keep Coming Back to Us)
            </p>
          </div>

          {/* Story Content with Visual Elements */}
          <div className="vsl-story-grid">
            {/* Left: Video */}
            <div className="vsl-media-wrapper">
              <div className="vsl-video-card">
                <a
                  href="https://www.youtube.com/watch?v=F_lreXzNlUI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vsl-video-link"
                >
                  <Image
                    src="https://img.youtube.com/vi/F_lreXzNlUI/maxresdefault.jpg"
                    alt={`JH Painting Services working in ${city.name}, MA`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="vsl-video-overlay">
                    <div className="vsl-play-button">
                      <Play size={32} fill="#fff" />
                    </div>
                    <span className="vsl-watch-text">Watch Our Work</span>
                  </div>
                </a>
              </div>
              <div className="vsl-video-caption">
                <Star size={14} fill="#D20404" color="#D20404" />
                <span>See why {city.name} homeowners trust us</span>
              </div>
            </div>

            {/* Right: Story Text */}
            <div className="vsl-story-content">
              <div className="vsl-story-text">
                <p className="vsl-lead-paragraph">
                  <span className="vsl-dropcap">W</span>hen you hire a painting contractor, you&apos;re not just getting paint on walls &mdash; you&apos;re trusting someone with your home, your biggest investment.
                </p>

                <p>
                  At JH Painting Services, we understand that {city.name} homeowners have high standards. Your home isn&apos;t just a building &mdash; it&apos;s where memories are made, families grow, and life happens. That&apos;s why we approach every project with the care and attention it deserves.
                </p>

                <div className="vsl-highlight-box">
                  <div className="vsl-highlight-icon">
                    <Heart size={24} color="#D20404" />
                  </div>
                  <p className="vsl-highlight-text">
                    <strong>Here&apos;s the thing:</strong> We don&apos;t just paint houses &mdash; we transform homes. And we take that responsibility seriously.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="vsl-quick-stats">
                <div className="vsl-stat">
                  <span className="vsl-stat-number">200+</span>
                  <span className="vsl-stat-label">Homes Painted</span>
                </div>
                <div className="vsl-stat">
                  <span className="vsl-stat-number">5.0</span>
                  <span className="vsl-stat-label">Google Rating</span>
                </div>
                <div className="vsl-stat">
                  <span className="vsl-stat-number">100%</span>
                  <span className="vsl-stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Curiosity Builder */}
          <div className="vsl-curiosity-section">
            <h3 className="vsl-curiosity-title">
              <Sparkles size={20} color="#D20404" />
              What Makes Us Different?
            </h3>
            <div className="vsl-curiosity-grid">
              <div className="vsl-curiosity-card">
                <div className="vsl-curiosity-number">01</div>
                <h4>We&apos;re Your Neighbors</h4>
                <p>Based in Marlborough, we&apos;re not a faceless corporation &mdash; we&apos;re local contractors who live and work in your community.</p>
              </div>
              <div className="vsl-curiosity-card">
                <div className="vsl-curiosity-number">02</div>
                <h4>Premium Materials Only</h4>
                <p>We use only Sherwin-Williams and Benjamin Moore paints. Why? Because cheap paint means repainting in 3 years. Ours lasts 7-10+.</p>
              </div>
              <div className="vsl-curiosity-card">
                <div className="vsl-curiosity-number">03</div>
                <h4>No Surprises, Ever</h4>
                <p>The price we quote is the price you pay. No hidden fees, no &quot;we found more work&quot; excuses. Just honest, transparent pricing.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="vsl-cta-wrapper">
            <p className="vsl-cta-text">Ready to see what we can do for your {city.name} home?</p>
            <div className="vsl-cta-buttons">
              <a href="tel:+15086908886" className="vsl-cta-primary">
                <Phone size={20} />
                Call (508) 690-8886
              </a>
              <a href="#quote-form" className="vsl-cta-secondary">
                Get Free Estimate
                <ChevronRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services in City Section */}
      <section className="city-section city-section-white">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-red">
              Our Services in {city.name}
            </span>
            <h2 className="city-section-title">
              Professional Painting Services
            </h2>
            <p className="city-section-subtitle">
              Expert painting solutions tailored for {city.name} homes and businesses
            </p>
          </div>

          <div className="city-services-grid">
            {servicesList.map((service, idx) => (
              <Link
                key={idx}
                href={`/cities/${params.city}/${service.slug}`}
                className="city-service-card"
              >
                <div className="city-service-icon">
                  <service.icon size={32} color="#fff" />
                </div>
                <h3 className="city-service-title">
                  {service.name}
                </h3>
                <p className="city-service-desc">
                  Professional {service.name.toLowerCase()} services in {city.name}, MA
                </p>
                <span className="city-service-link">
                  Learn More <ChevronRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="city-section city-section-dark">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-dark">
              Our Portfolio
            </span>
            <h2 className="city-section-title">
              {city.name} Project Gallery
            </h2>
            <p className="city-section-subtitle">
              See the quality transformations we've delivered throughout {city.name} and Massachusetts
            </p>
          </div>

          <div className="city-gallery-grid">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="city-gallery-item">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
                <div className="city-gallery-overlay">
                  <div>
                    <span className="city-gallery-category">
                      {img.category}
                    </span>
                    <p className="city-gallery-text">{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after Gallery */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1rem' }}>Like what you see?</p>
            <a href="tel:+15086908886" className="city-cta-btn">
              <Phone size={20} />
              Get a Free Quote
            </a>
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

      {/* Video Section - Modern RS Style */}
      <section className="section video-section-rs">
        <div className="container">
          <div className="section-header">
            <h2>See Our Work in Action</h2>
            <p>Watch our expert team tackle painting projects across Massachusetts.</p>
          </div>

          <div className="video-grid-rs">
            {videos.map((video, idx) => (
              <a
                key={idx}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card-rs"
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  fill
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
                <div className="video-card-rs-overlay">
                  <div className="video-card-rs-play">
                    <Play size={20} />
                  </div>
                  <h4>{video.title}</h4>
                  <span>
                    <Play size={12} />
                    {video.type}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="video-section-cta">
            <a
              href="https://www.youtube.com/@JHPaintingServices-br9wh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg"
            >
              <Play size={18} />
              Watch More on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="city-section city-section-white">
        <div className="container">
          <div className="city-about-grid">
            {/* About Image */}
            <div className="city-about-image-wrapper">
              <div className="city-about-image">
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                  alt="Jafet Henrique - Owner of JH Painting Services in Massachusetts"
                  width={600}
                  height={500}
                  loading="lazy"
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              </div>
              <div className="city-about-badge">
                <div className="city-about-badge-number">40+</div>
                <div className="city-about-badge-label">5-Star Google Reviews</div>
              </div>
            </div>

            {/* About Content */}
            <div className="city-about-content">
              <span className="city-badge city-badge-red">
                About JH Painting Services
              </span>
              <h2>
                Your Trusted {city.name} Painting Contractor
              </h2>
              <p>
                Founded by <strong>Jafet</strong>, JH Painting Services is a premier painting contractor based in Marlborough, Massachusetts.
                With years of hands-on experience, we've built our reputation on delivering exceptional craftsmanship,
                honest pricing, and reliable service to homeowners across {city.name} and all of {city.county}.
              </p>
              <p>
                We specialize in interior and exterior painting, using only premium materials designed to withstand
                Massachusetts weather. Our meticulous attention to detail ensures results that exceed expectations.
              </p>

              <div className="city-about-features">
                {[
                  { icon: Shield, title: 'Licensed & Insured' },
                  { icon: Award, title: 'Expert Craftsmen' },
                  { icon: Users, title: `Local ${city.name} Team` },
                  { icon: Heart, title: '100% Satisfaction' }
                ].map((item, idx) => (
                  <div key={idx} className="city-about-feature">
                    <div className="city-about-feature-icon">
                      <item.icon size={24} color="#D20404" />
                    </div>
                    <span className="city-about-feature-text">{item.title}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+15086908886" className="city-cta-btn">
                <Phone size={20} />
                Call (508) 690-8886
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section - Expanded */}
      <section className="city-section city-section-gray">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-red">
              We Understand Your Frustrations
            </span>
            <h2 className="city-section-title">
              Tired of Painters Who Disappoint?
            </h2>
            <p className="city-section-subtitle">
              If you've hired painters before in {city.name}, you've probably experienced the frustration:
              contractors who show up late (or not at all), sloppy work that starts peeling within months,
              or that dreaded phone call about "unexpected costs." It's exhausting, and you deserve better.
            </p>
          </div>

          <div className="city-pain-grid" style={{ marginBottom: '4rem' }}>
            {[
              {
                problem: "Contractors who ghost you or show up whenever they feel like it",
                solution: "We confirm every appointment 24 hours in advance and arrive within a 30-minute window. Our crew shows up in uniform, ready to work. If we're ever running late (rare!), you'll get a call immediately.",
                icon: Clock
              },
              {
                problem: "Cheap paint that peels, cracks, or fades within months",
                solution: "We use only premium Sherwin-Williams and Benjamin Moore paints rated to withstand Massachusetts winters and humid summers. Combined with our meticulous 5-step prep process, your paint job will look stunning for 7-10+ years.",
                icon: Shield
              },
              {
                problem: "Hidden fees, surprise costs, and bait-and-switch pricing",
                solution: "Our detailed written estimates itemize every cost upfront—labor, materials, prep work, everything. The price we quote is the price you pay. No surprises, no 'additional charges discovered during the project.'",
                icon: DollarSign
              },
              {
                problem: "Messy crews who damage your furniture and leave chaos behind",
                solution: "We treat your home with respect. All furniture is carefully covered with drop cloths, floors are protected, and we clean up completely every day. You won't find paint splatter on your floors or handprints on your walls.",
                icon: Home
              },
              {
                problem: "Painters who cut corners when you're not watching",
                solution: "Our crews are trained craftsmen, not day laborers. We properly prep every surface (sanding, patching, priming), apply the right number of coats, and our crew lead inspects every job before we consider it complete.",
                icon: CheckCircle2
              },
              {
                problem: "Companies that disappear after the check clears",
                solution: `We're a locally-owned ${city.name} area business with a reputation to protect. We stand behind every job with our satisfaction guarantee. If something isn't right, we'll fix it—no arguments, no excuses.`,
                icon: Award
              }
            ].map((item, idx) => (
              <div key={idx} className="city-pain-card">
                <div className="city-pain-icon">
                  <item.icon size={28} color="#fff" />
                </div>
                <h3 className="city-pain-problem">
                  "{item.problem}"
                </h3>
                <p className="city-pain-solution">
                  <strong>Our Promise:</strong> {item.solution}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial in Pain Points */}
          <div className="city-testimonial">
            <div className="city-testimonial-stars">
              {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="#D20404" color="#D20404" />)}
            </div>
            <blockquote className="city-testimonial-quote">
              "After two bad experiences with other painters in {city.name}, I was skeptical. But JH Painting
              completely changed my mind. They showed up on time, kept my house spotless, and the quality
              is incredible. Three years later, it still looks brand new. I recommend them to everyone!"
            </blockquote>
            <div className="city-testimonial-author">
              — Sarah M., {city.name} Homeowner
            </div>
            <a href="tel:+15086908886" className="city-cta-btn" style={{ marginTop: '1.5rem' }}>
              <Phone size={18} />
              Get Your Free Estimate Today
            </a>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="city-section city-section-white">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-blue">
              Our Proven Process
            </span>
            <h2 className="city-section-title">
              How We Transform Your {city.name} Property
            </h2>
            <p className="city-section-subtitle">
              Every successful painting project follows a proven process. Here's exactly what happens when you choose JH Painting Services—no surprises, no guesswork, just professional results.
            </p>
          </div>

          <div className="city-process-grid">
            {[
              {
                step: '1',
                title: 'Free Consultation & Detailed Estimate',
                description: `We visit your ${city.name} property, discuss your vision, assess the scope of work, and provide a comprehensive written estimate. We'll explain every line item, answer your questions, and never pressure you to sign on the spot. Take your time—we're confident you'll choose us.`,
                duration: 'Same-day or next-day appointments available'
              },
              {
                step: '2',
                title: 'Color Consultation & Material Selection',
                description: "Not sure what color to choose? Our color consultants help you select the perfect palette for your space. We'll show you large samples on your actual walls so you can see how colors look in your lighting. We use only premium paints from Sherwin-Williams and Benjamin Moore.",
                duration: 'Included free with your project'
              },
              {
                step: '3',
                title: 'Professional Surface Preparation',
                description: "This is where cheap painters cut corners—and where we shine. We thoroughly clean all surfaces, fill cracks and holes, sand rough areas, caulk gaps, apply primer where needed, and mask off trim, floors, and fixtures. Proper prep is 70% of a great paint job.",
                duration: '1-2 days depending on project size'
              },
              {
                step: '4',
                title: 'Expert Paint Application',
                description: "Our skilled painters apply your chosen paint with precision, using the right techniques for each surface. We apply multiple coats as needed, maintain wet edges to prevent lap marks, and ensure consistent coverage. No drips, no missed spots, no brush marks.",
                duration: 'Varies by project scope'
              },
              {
                step: '5',
                title: 'Quality Inspection & Touch-Ups',
                description: "Before we consider any job complete, our crew lead performs a detailed inspection under multiple lighting conditions. We touch up any imperfections, ensure clean lines, and make sure every detail meets our high standards—and yours.",
                duration: 'Final walkthrough with you'
              },
              {
                step: '6',
                title: 'Complete Cleanup & Final Walkthrough',
                description: "We remove all protective coverings, clean up completely, and dispose of all materials properly. Then we walk through the finished project with you, ensuring your complete satisfaction. You won't pay until you're 100% happy.",
                duration: 'Same day as project completion'
              }
            ].map((process, idx) => (
              <div key={idx} className="city-process-card">
                <div className="city-process-number">
                  {process.step}
                </div>
                <div className="city-process-content">
                  <h3>{process.title}</h3>
                  <p>{process.description}</p>
                  <span className="city-process-duration">{process.duration}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after Process */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p className="city-section-subtitle" style={{ marginBottom: '1.5rem' }}>
              Ready to start your {city.name} painting project?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+15086908886" className="city-cta-btn">
                <Phone size={20} />
                Call (508) 690-8886
              </a>
              <a href="#quote-form" className="city-cta-btn-outline city-cta-btn-dark">
                Request Free Estimate
                <ChevronRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded FAQ Section */}
      <section className="city-section city-section-dark">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-dark">
              Frequently Asked Questions
            </span>
            <h2 className="city-section-title">
              Your {city.name} Painting Questions Answered
            </h2>
            <p className="city-section-subtitle">
              We believe in transparency. Here are answers to the questions {city.name} homeowners ask most often.
            </p>
          </div>

          <div className="city-faq-grid">
            {cityContent.faq.map((faq, idx) => (
              <div key={idx} className={`city-faq-item ${openFaqIndex === idx ? 'open' : ''}`}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="city-faq-question"
                >
                  <h3>{faq.question}</h3>
                  <ChevronDown
                    size={24}
                    color="#D20404"
                    style={{
                      transition: 'transform 0.3s ease',
                      transform: openFaqIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  />
                </button>
                <div style={{
                  maxHeight: openFaqIndex === idx ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
                }}>
                  <p className="city-faq-answer">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p className="city-section-subtitle" style={{ marginBottom: '1.5rem' }}>
              Have a question we didn't answer? We're here to help!
            </p>
            <a href="tel:+15086908886" className="city-cta-btn">
              <Phone size={20} />
              Call (508) 690-8886
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="city-section city-section-gray">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-green">
              The JH Painting Difference
            </span>
            <h2 className="city-section-title">
              Why {city.name} Homeowners Choose JH Painting
            </h2>
            <p className="city-section-subtitle">
              With dozens of painting contractors in the {city.name} area, why do homeowners consistently choose us? Here's what sets JH Painting Services apart.
            </p>
          </div>

          <div className="city-why-grid">
            {[
              {
                title: 'Owner-Operated Quality',
                description: `Unlike large franchises where you never see the owner, Jafet personally oversees every ${city.name} project. You're not just another number—you're a neighbor. This hands-on approach ensures consistent quality and accountability that big companies simply can't match.`,
                icon: Users
              },
              {
                title: 'Trained Professional Crews',
                description: "Our painters aren't day laborers picked up from a parking lot. They're skilled craftsmen with years of experience, trained in our specific methods and quality standards. Every crew member is background-checked, drug-tested, and committed to excellence.",
                icon: Award
              },
              {
                title: 'Premium Materials Only',
                description: "We never cut costs on materials. We use top-tier Sherwin-Williams and Benjamin Moore paints, professional-grade primers, and quality tools. Better materials mean better coverage, richer colors, and a finish that lasts years longer than budget alternatives.",
                icon: Shield
              },
              {
                title: 'Meticulous Preparation',
                description: "Many painters rush through prep work—the part you don't see. We spend the necessary time properly preparing every surface because we know this invisible work determines how long your paint job lasts. Cutting corners here means peeling paint in months, not years.",
                icon: CheckCircle2
              },
              {
                title: 'Clear Communication',
                description: `We keep you informed at every stage. You'll know exactly when we're arriving, what we're doing each day, and when we'll be finished. Questions? Concerns? Jafet is always available by phone. No wondering what's happening with your ${city.name} home.`,
                icon: Phone
              },
              {
                title: 'Respect for Your Home',
                description: "We treat every home like our own. Shoes come off or get covered, furniture is carefully protected, and we clean up completely every day. You shouldn't have to live in chaos while we work. When we leave, the only trace of our visit is your beautiful new paint.",
                icon: Heart
              }
            ].map((item, idx) => (
              <div key={idx} className="city-why-card">
                <div className="city-why-icon">
                  <item.icon size={28} color="#fff" />
                </div>
                <h3 className="city-why-title">{item.title}</h3>
                <p className="city-why-desc">{item.description}</p>
              </div>
            ))}
          </div>

          {/* CTA after Why Choose Us */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="tel:+15086908886" className="city-cta-btn">
              <Phone size={20} />
              Call for Your Free Estimate
            </a>
          </div>
        </div>
      </section>

      {/* Local SEO Content Section */}
      <section className="city-seo-section">
        <div className="container">
          <div className="city-seo-content">
            <h2 className="city-seo-title">
              Professional Painting Services for {city.name}, Massachusetts Homes
            </h2>

            <div className="city-seo-text">
              <p>
                As a trusted painting contractor serving {city.name} and the greater {city.county} area, JH Painting Services understands the unique needs of Massachusetts homeowners. Our New England climate—with its harsh winters, humid summers, and dramatic temperature swings—demands painting solutions that go beyond what works in milder regions.
              </p>

              <p>
                {city.name} homes, whether historic properties or modern constructions, each present their own painting challenges. Older homes often have lead paint concerns, multiple layers of previous paint, and architectural details requiring careful attention. Newer homes may have different substrate materials and finishes. Our experienced crews have worked on all types of {city.name} properties and know exactly how to approach each situation.
              </p>

              <h3 className="city-seo-subtitle">
                Interior Painting in {city.name}
              </h3>
              <p>
                Transform your {city.name} home's interior with professional painting that enhances your living space. We paint living rooms, bedrooms, kitchens, bathrooms, hallways, ceilings, trim, and doors. Our interior services include complete color consultation, furniture protection, thorough surface preparation, premium paint application, and meticulous cleanup. Whether you're refreshing a single room or repainting your entire home, we deliver stunning results that last.
              </p>

              <h3 className="city-seo-subtitle">
                Exterior Painting in {city.name}
              </h3>
              <p>
                Protect your {city.name} home from the elements while boosting curb appeal with professional exterior painting. Massachusetts weather is tough on exterior surfaces—freeze-thaw cycles, snow, ice, rain, and intense summer sun all take their toll. We use premium exterior paints specifically formulated to withstand these conditions, properly prepare all surfaces, and apply the right products for each material type (wood siding, vinyl, stucco, brick, trim).
              </p>

              <h3 className="city-seo-subtitle">
                Cabinet Painting & Refinishing
              </h3>
              <p>
                Want to transform your {city.name} kitchen without the cost of new cabinets? Our cabinet painting service delivers a factory-finish look at a fraction of replacement cost. We properly prepare cabinet surfaces, apply primer and multiple coats of durable cabinet-specific paint, and reinstall hardware for a complete transformation. Most kitchen cabinet projects are completed in 5-7 days.
              </p>

              <h3 className="city-seo-subtitle">
                Commercial Painting Services
              </h3>
              <p>
                {city.name} businesses trust JH Painting for professional commercial painting that minimizes disruption to operations. We work around your schedule—evenings, weekends, or overnight—to complete projects without affecting your business. From offices and retail spaces to restaurants and medical facilities, we deliver commercial-quality results that enhance your professional image.
              </p>

              <div className="city-seo-cta-box">
                <h3 className="city-seo-cta-title">
                  Ready to Get Started?
                </h3>
                <p className="city-seo-cta-text">
                  Join the hundreds of {city.name} homeowners who have trusted JH Painting Services to transform their properties. Call today for your free, no-obligation estimate.
                </p>
                <div className="city-seo-cta-buttons">
                  <a href="tel:+15086908886" className="city-cta-btn">
                    <Phone size={18} />
                    (508) 690-8886
                  </a>
                  <a href="#quote-form" className="city-cta-btn-outline">
                    Get Free Estimate
                    <ChevronRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="city-cta-section">
        <div className="city-cta-pattern" />
        <div className="container">
          <div className="city-cta-content">
            <h2 className="city-cta-title">
              Ready to Transform Your {city.name} Property?
            </h2>
            <p className="city-cta-subtitle">
              Get a free, detailed estimate for your painting project today.
              No obligation, no pressure—just honest advice and transparent pricing.
            </p>
            <div className="city-cta-buttons">
              <a href="tel:+15086908886" className="city-cta-btn-white">
                <Phone size={24} />
                (508) 690-8886
              </a>
              <a href="#quote-form" className="city-cta-btn-glass">
                <Mail size={24} />
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="city-areas-section">
        <div className="container">
          <div className="city-areas-content">
            <div className="city-areas-header">
              <h2 className="city-areas-title">
                Serving 114+ Cities Across Massachusetts
              </h2>
              <p className="city-areas-subtitle">
                Professional painting services throughout the state
              </p>
            </div>

            <div className="city-areas-grid">
              {footerCities.map((footerCity, idx) => (
                <Link
                  key={idx}
                  href={`/cities/${footerCity.toLowerCase().replace(/ /g, '-')}`}
                  className={`city-areas-link ${footerCity === city.name ? 'city-areas-link-active' : ''}`}
                >
                  {footerCity}
                </Link>
              ))}
              <Link href="/cities" className="city-areas-link-all">
                View All Cities <ChevronRight size={16} />
              </Link>
            </div>
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
              <div className="footer-social">
                <a href="https://www.facebook.com/profile.php?id=61564489391475" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/jhpaintingservices_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
                </a>
                <a href="https://www.youtube.com/@JHPaintingServices-br9wh" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://g.co/kgs/hc9Rfmv" target="_blank" rel="noopener noreferrer" aria-label="Google">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/#about">About</Link></li>
                <li><Link href="/#services">Services</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/#gallery">Gallery</Link></li>
                <li><Link href="/#reviews">Reviews</Link></li>
                <li><Link href="/#contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Our Services</h4>
              <ul className="footer-links">
                <li><Link href="/services/interior-painting">Interior Painting</Link></li>
                <li><Link href="/services/exterior-painting">Exterior Painting</Link></li>
                <li><Link href="/services/commercial-painting">Commercial Painting</Link></li>
                <li><Link href="/services/residential-painting">Residential Painting</Link></li>
                <li><Link href="/services/cabinet-painting">Cabinet Painting</Link></li>
                <li><Link href="/services/carpentry">Carpentry</Link></li>
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
              <div className="footer-contact-item">
                <Clock size={16} />
                <span>Mon-Sat: 7AM - 6PM</span>
              </div>
            </div>
          </div>

          {/* Service Areas - Cities */}
          <div className="footer-cities">
            <h4>Service Areas - {cities.length}+ Cities in Massachusetts</h4>
            <div className="footer-cities-grid">
              {cities.map((cityItem) => (
                <Link
                  key={cityItem.slug}
                  href={`/cities/${cityItem.slug}`}
                  className="footer-city-link"
                >
                  {cityItem.name}
                </Link>
              ))}
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
