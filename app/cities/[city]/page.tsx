'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { Phone, Mail, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, Home, Building2, PaintBucket, Brush, Menu, X, ChevronDown, Paintbrush, Palette, DollarSign } from 'lucide-react'
import { getCityBySlug, cities } from '@/app/data/cities'

// Menu data
const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: Home, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
]

interface Props {
  params: { city: string }
}

// Generate Schema JSON-LD for the city page
function generateCitySchema(cityName: string, countyName: string, citySlug: string) {
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
          "reviewCount": "200",
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
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How much does it cost to paint a house in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `House painting costs in ${cityName}, MA depend on several factors: square footage, number of rooms, ceiling height, current wall condition, and paint quality. Interior painting typically ranges from $2-$6 per square foot, while exterior painting ranges from $3-$7 per square foot. For a typical 2,000 sq ft ${cityName} home, interior painting averages $4,000-$8,000, and exterior painting averages $6,000-$12,000. Contact JH Painting for a free, detailed estimate for your ${cityName} home.`
            }
          },
          {
            "@type": "Question",
            "name": `Are you licensed and insured to paint in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Absolutely. JH Painting Services is fully licensed to operate in ${cityName} and throughout Massachusetts. We carry comprehensive general liability insurance ($1 million coverage) and workers' compensation insurance for all our employees. This protects you from any liability if an accident occurs on your property. We're happy to provide proof of insurance upon request.`
            }
          },
          {
            "@type": "Question",
            "name": `How long does it take to paint a house in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Project timelines vary based on scope. A single room typically takes 1-2 days. A full interior (3-4 bedrooms) usually takes 4-7 days. Exterior painting for an average ${cityName} home takes 5-10 days, depending on weather and prep work needed. We provide accurate timelines in our estimates and keep you updated throughout the project.`
            }
          },
          {
            "@type": "Question",
            "name": `Do you offer free estimates in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Absolutely! We offer free, no-obligation estimates for all ${cityName} residents. Call (508) 690-8886 or fill out our online form to schedule your free consultation. We'll visit your property, discuss your project, and provide a detailed written estimate—usually within 24-48 hours.`
            }
          },
          {
            "@type": "Question",
            "name": "What brands of paint do you use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We exclusively use premium paints from Sherwin-Williams and Benjamin Moore. These industry-leading brands offer superior coverage, durability, and color retention. For exteriors, we use paints specifically formulated to withstand Massachusetts' harsh winters and humid summers. The slight premium in material cost is far outweighed by the longevity of the finish—often 7-10+ years versus 3-5 years for budget paints."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to move my furniture before you start?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No! We handle all furniture moving and protection. Our crews carefully move furniture to the center of each room and cover everything with protective drop cloths. We also cover floors, mask trim, and protect light fixtures. At the end of each day, we return furniture to its original position so your home remains livable during the project."
            }
          },
          {
            "@type": "Question",
            "name": "What's included in surface preparation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Proper preparation is crucial for a lasting paint job. Our prep work includes: cleaning surfaces to remove dust, dirt, and cobwebs; filling nail holes, cracks, and dents with premium filler; sanding rough spots and previous drips; caulking gaps around trim and windows; scraping loose or peeling paint; priming bare wood, stains, and repaired areas. This prep work is included in our estimates—no hidden charges."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer any warranty or guarantee?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! We stand behind every job with our satisfaction guarantee. If you're not completely happy with any aspect of our work, we'll make it right—no arguments, no excuses. Additionally, our workmanship carries a 2-year warranty against peeling, cracking, or bubbling under normal conditions. We're not satisfied until you are."
            }
          },
          {
            "@type": "Question",
            "name": `Can you help me choose paint colors for my ${cityName} home?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Absolutely! Color selection can be overwhelming with thousands of options. We offer complimentary color consultations where we help you choose colors that complement your ${cityName} home's architecture, lighting, and existing décor. We can provide large paint samples to test on your walls so you can see exactly how colors look in your space before committing.`
            }
          },
          {
            "@type": "Question",
            "name": "How do you handle weather delays for exterior painting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Massachusetts weather can be unpredictable. We monitor forecasts closely and only paint exteriors when conditions are optimal (above 50°F, low humidity, no rain expected). If weather delays your project, we communicate promptly and reschedule at the earliest opportunity. Your home's exterior will be painted under ideal conditions for the best possible result."
            }
          }
        ]
      }
    ]
  }
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Exterior painting project', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'House painters Massachusetts', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Interior painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Interior painting bedroom', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Cabinet refinishing', category: 'Cabinets' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Floor refinishing', category: 'Floors' },
]

const videos = [
  { id: 'F_lreXzNlUI', title: 'Historic Church Transformation' },
  { id: 'LkT_HLyKibY', title: 'Interior Painting Process' },
]

const footerCities = [
  'Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Brockton',
  'New Bedford', 'Quincy', 'Lynn', 'Fall River', 'Newton', 'Somerville',
  'Framingham', 'Waltham', 'Brookline', 'Medford', 'Malden', 'Revere'
]

const servicesList = [
  { slug: 'interior-painting', name: 'Interior Painting', icon: Brush },
  { slug: 'exterior-painting', name: 'Exterior Painting', icon: Home },
  { slug: 'commercial-painting', name: 'Commercial Painting', icon: Building2 },
  { slug: 'residential-painting', name: 'Residential Painting', icon: Home },
  { slug: 'cabinet-painting', name: 'Cabinet Painting', icon: PaintBucket },
]

export default function CityPage({ params }: Props) {
  const city = getCityBySlug(params.city)
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

  const citySchema = generateCitySchema(city.name, city.county || 'Massachusetts', params.city)

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

      {/* Skip Link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

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

              {/* Services Dropdown */}
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
              <Link href="/#contact">Contact</Link>
            </nav>

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
            alt={`Professional Painting Services in ${city.name}`}
            fill
            style={{ objectFit: 'cover' }}
            priority
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
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
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

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '800',
                color: '#fff',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}>
                Premium <span style={{ color: '#DC2626' }}>Painting Services</span> in {city.name}
              </h1>

              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.7',
                marginBottom: '1rem',
                maxWidth: '600px'
              }}>
                Are you tired of looking at faded, peeling paint that makes your {city.name} home look neglected?
                Frustrated by contractors who don't show up or deliver subpar work? You're not alone.
              </p>
              <p style={{
                fontSize: '1.125rem',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.7',
                marginBottom: '2rem',
                maxWidth: '600px'
              }}>
                JH Painting Services transforms properties throughout {city.name} and {city.county} with
                premium craftsmanship, transparent pricing, and the reliability you deserve.
                Over 200 homeowners have trusted us with their most valuable investment—their home.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <a href="tel:+15086908886" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
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
                  { icon: Award, text: '200+ 5-Star Reviews' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                    <item.icon size={18} color="#DC2626" />
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
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>
                  Get Your Free Quote
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9375rem' }}>
                  We'll respond within 24 hours
                </p>
              </div>

              <iframe
                src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                style={{ width: '100%', height: '450px', border: 'none', borderRadius: '12px' }}
                title="Contact Form"
                loading="lazy"
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
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#DC2626" color="#DC2626" />)}
                </div>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem' }}>5.0 on Google Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#DC2626' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services in City Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              borderRadius: '100px',
              color: '#92400E',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.25rem'
            }}>
              Our Services in {city.name}
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '1rem' }}>
              Professional Painting Services
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.7' }}>
              Expert painting solutions tailored for {city.name} homes and businesses
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: '1200px', margin: '0 auto' }}>
            {servicesList.map((service, idx) => (
              <Link
                key={idx}
                href={`/cities/${params.city}/${service.slug}`}
                style={{
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 24px rgba(220, 38, 38, 0.3)'
                }}>
                  <service.icon size={28} color="#fff" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.75rem' }}>
                  {service.name}
                </h3>
                <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Professional {service.name.toLowerCase()} services in {city.name}, MA
                </p>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#DC2626', fontWeight: '600' }}>
                  Learn More <ChevronRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section style={{ padding: '5rem 0', background: '#0F172A' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              background: 'rgba(245, 158, 11, 0.2)',
              borderRadius: '100px',
              color: '#DC2626',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.25rem',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              Our Portfolio
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#fff', lineHeight: '1.2', marginBottom: '1rem' }}>
              {city.name} Project Gallery
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.7' }}>
              See the quality transformations we've delivered throughout {city.name} and Massachusetts
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {galleryImages.map((img, idx) => (
              <div key={idx} style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                cursor: 'pointer'
              }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.5rem'
                }}>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      background: '#DC2626',
                      borderRadius: '100px',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      {img.category}
                    </span>
                    <p style={{ color: '#fff', fontSize: '1rem', fontWeight: '500' }}>{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after Gallery */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ color: '#64748B', marginBottom: '1rem' }}>Like what you see?</p>
            <a href="tel:+15086908886" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '1.125rem',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)'
            }}>
              <Phone size={20} />
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
              borderRadius: '100px',
              color: '#1D4ED8',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.25rem'
            }}>
              Watch Our Work
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '1rem' }}>
              See Our Team in Action
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.7' }}>
              Watch how we transform properties with precision and care
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {videos.map((video, idx) => (
              <a
                key={idx}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  aspectRatio: '16/9',
                  display: 'block',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)'
                }}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s ease'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    boxShadow: '0 10px 30px rgba(220, 38, 38, 0.5)'
                  }}>
                    <Play size={32} color="#fff" fill="#fff" />
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700' }}>{video.title}</h3>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>Watch on YouTube</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            gap: '4rem',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* About Image */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)'
              }}>
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                  alt="Jafet - Owner of JH Painting Services"
                  width={600}
                  height={500}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                boxShadow: '0 15px 40px rgba(220, 38, 38, 0.4)'
              }}>
                <div style={{ color: '#fff', fontSize: '2rem', fontWeight: '800' }}>200+</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem', fontWeight: '500' }}>5-Star Reviews</div>
              </div>
            </div>

            {/* About Content */}
            <div>
              <span style={{
                display: 'inline-block',
                padding: '0.5rem 1.25rem',
                background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
                borderRadius: '100px',
                color: '#DC2626',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1.25rem'
              }}>
                About JH Painting Services
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '1.5rem' }}>
                Your Trusted {city.name} Painting Contractor
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Founded by <strong>Jafet</strong>, JH Painting Services is a premier painting contractor based in Waltham, Massachusetts.
                With years of hands-on experience, we've built our reputation on delivering exceptional craftsmanship,
                honest pricing, and reliable service to homeowners across {city.name} and all of {city.county}.
              </p>
              <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: '1.8', marginBottom: '2rem' }}>
                We specialize in interior and exterior painting, using only premium materials designed to withstand
                Massachusetts weather. Our meticulous attention to detail ensures results that exceed expectations.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                  { icon: Shield, title: 'Licensed & Insured' },
                  { icon: Award, title: 'Expert Craftsmen' },
                  { icon: Users, title: `Local ${city.name} Team` },
                  { icon: Heart, title: '100% Satisfaction' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #FEF3F2 0%, #FEE2E2 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <item.icon size={24} color="#DC2626" />
                    </div>
                    <span style={{ fontSize: '1rem', fontWeight: '600', color: '#0F172A' }}>{item.title}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+15086908886" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '1.125rem',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)'
              }}>
                <Phone size={20} />
                Call (508) 690-8886
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section - Expanded */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
              borderRadius: '100px',
              color: '#DC2626',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.25rem'
            }}>
              We Understand Your Frustrations
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '1rem' }}>
              Tired of Painters Who Disappoint?
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.8', marginBottom: '1rem' }}>
              If you've hired painters before in {city.name}, you've probably experienced the frustration:
              contractors who show up late (or not at all), sloppy work that starts peeling within months,
              or that dreaded phone call about "unexpected costs." It's exhausting, and you deserve better.
            </p>
            <p style={{ fontSize: '1.0625rem', color: '#475569', lineHeight: '1.7' }}>
              At JH Painting Services, we've built our entire business around solving these exact problems.
              Here's how we're different:
            </p>
          </div>

          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', maxWidth: '1200px', margin: '0 auto 4rem' }}>
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
              <div key={idx} style={{
                padding: '2.5rem',
                background: '#fff',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 24px rgba(220, 38, 38, 0.3)'
                }}>
                  <item.icon size={28} color="#fff" />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#DC2626', marginBottom: '1rem' }}>
                  "{item.problem}"
                </h3>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.7' }}>
                  <strong style={{ color: '#0F172A' }}>Our Promise:</strong> {item.solution}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial in Pain Points */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2.5rem',
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '24px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="#DC2626" color="#DC2626" />)}
            </div>
            <blockquote style={{ fontSize: '1.25rem', color: '#fff', fontStyle: 'italic', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              "After two bad experiences with other painters in {city.name}, I was skeptical. But JH Painting
              completely changed my mind. They showed up on time, kept my house spotless, and the quality
              is incredible. Three years later, it still looks brand new. I recommend them to everyone!"
            </blockquote>
            <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600', marginBottom: '1.5rem' }}>
              — Sarah M., {city.name} Homeowner
            </div>
            <a href="tel:+15086908886" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4)'
            }}>
              <Phone size={18} />
              Get Your Free Estimate Today
            </a>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
              borderRadius: '100px',
              color: '#1D4ED8',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.25rem'
            }}>
              Our Proven Process
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '1rem' }}>
              How We Transform Your {city.name} Property
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.8' }}>
              Every successful painting project follows a proven process. Here's exactly what happens when you choose JH Painting Services—no surprises, no guesswork, just professional results.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
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
              <div key={idx} style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '2rem',
                padding: '2rem',
                background: idx % 2 === 0 ? '#F8FAFC' : '#fff',
                borderRadius: '20px',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  boxShadow: '0 8px 24px rgba(220, 38, 38, 0.3)',
                  flexShrink: 0
                }}>
                  {process.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.75rem' }}>
                    {process.title}
                  </h3>
                  <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.7', marginBottom: '0.75rem' }}>
                    {process.description}
                  </p>
                  <span style={{ fontSize: '0.875rem', color: '#DC2626', fontWeight: '600' }}>
                    {process.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after Process */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ fontSize: '1.125rem', color: '#64748B', marginBottom: '1.5rem' }}>
              Ready to start your {city.name} painting project?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+15086908886" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '1.125rem',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)'
              }}>
                <Phone size={20} />
                Call (508) 690-8886
              </a>
              <a href="#quote-form" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                background: '#0F172A',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '1.125rem',
                fontWeight: '600',
                textDecoration: 'none',
                border: '2px solid #E2E8F0'
              }}>
                Request Free Estimate
                <ChevronRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded FAQ Section */}
      <section style={{ padding: '5rem 0', background: '#0F172A' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              background: 'rgba(220, 38, 38, 0.2)',
              borderRadius: '100px',
              color: '#DC2626',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.25rem',
              border: '1px solid rgba(220, 38, 38, 0.3)'
            }}>
              Frequently Asked Questions
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#fff', lineHeight: '1.2', marginBottom: '1rem' }}>
              Your {city.name} Painting Questions Answered
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.7' }}>
              We believe in transparency. Here are answers to the questions {city.name} homeowners ask most often.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {[
              {
                question: `How much does it cost to paint a house in ${city.name}?`,
                answer: `House painting costs in ${city.name} depend on several factors: square footage, number of rooms, ceiling height, current wall condition, and paint quality. Interior painting typically ranges from $2-$6 per square foot, while exterior painting ranges from $3-$7 per square foot. For a typical 2,000 sq ft ${city.name} home, interior painting averages $4,000-$8,000, and exterior painting averages $6,000-$12,000. We provide free, detailed estimates so you know exactly what to expect.`
              },
              {
                question: `Are you licensed and insured to paint in ${city.name}?`,
                answer: `Absolutely. JH Painting Services is fully licensed to operate in ${city.name} and throughout Massachusetts. We carry comprehensive general liability insurance ($1 million coverage) and workers' compensation insurance for all our employees. This protects you from any liability if an accident occurs on your property. We're happy to provide proof of insurance upon request.`
              },
              {
                question: `How long does a typical painting project take in ${city.name}?`,
                answer: `Project timelines vary based on scope. A single room typically takes 1-2 days. A full interior (3-4 bedrooms) usually takes 4-7 days. Exterior painting for an average ${city.name} home takes 5-10 days, depending on weather and prep work needed. We provide accurate timelines in our estimates and keep you updated throughout the project.`
              },
              {
                question: "What brands of paint do you use?",
                answer: "We exclusively use premium paints from Sherwin-Williams and Benjamin Moore. These industry-leading brands offer superior coverage, durability, and color retention. For exteriors, we use paints specifically formulated to withstand Massachusetts' harsh winters and humid summers. The slight premium in material cost is far outweighed by the longevity of the finish—often 7-10+ years versus 3-5 years for budget paints."
              },
              {
                question: "Do I need to move my furniture before you start?",
                answer: "No! We handle all furniture moving and protection. Our crews carefully move furniture to the center of each room and cover everything with protective drop cloths. We also cover floors, mask trim, and protect light fixtures. At the end of each day, we return furniture to its original position so your home remains livable during the project."
              },
              {
                question: "What's included in surface preparation?",
                answer: "Proper preparation is crucial for a lasting paint job. Our prep work includes: cleaning surfaces to remove dust, dirt, and cobwebs; filling nail holes, cracks, and dents with premium filler; sanding rough spots and previous drips; caulking gaps around trim and windows; scraping loose or peeling paint; priming bare wood, stains, and repaired areas. This prep work is included in our estimates—no hidden charges."
              },
              {
                question: "How do you handle weather delays for exterior painting?",
                answer: `Massachusetts weather can be unpredictable. We monitor forecasts closely and only paint exteriors when conditions are optimal (above 50°F, low humidity, no rain expected). If weather delays your project, we communicate promptly and reschedule at the earliest opportunity. Your ${city.name} home's exterior will be painted under ideal conditions for the best possible result.`
              },
              {
                question: "Do you offer any warranty or guarantee?",
                answer: "Yes! We stand behind every job with our satisfaction guarantee. If you're not completely happy with any aspect of our work, we'll make it right—no arguments, no excuses. Additionally, our workmanship carries a 2-year warranty against peeling, cracking, or bubbling under normal conditions. We're not satisfied until you are."
              },
              {
                question: "Can you help me choose paint colors?",
                answer: `Absolutely! Color selection can be overwhelming with thousands of options. We offer complimentary color consultations where we help you choose colors that complement your ${city.name} home's architecture, lighting, and existing décor. We can provide large paint samples to test on your walls so you can see exactly how colors look in your space before committing.`
              },
              {
                question: "How do I get a free estimate?",
                answer: `Getting a free estimate is easy! Call us at (508) 690-8886 or fill out the form on this page. We'll schedule a convenient time to visit your ${city.name} property, discuss your project, and provide a detailed written estimate—usually within 24-48 hours. There's no obligation and no pressure. We're confident our quality and pricing will earn your business.`
              }
            ].map((faq, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem 2rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    textAlign: 'left'
                  }}
                >
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#fff', margin: 0 }}>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={24}
                    color="#DC2626"
                    style={{
                      flexShrink: 0,
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
                  <p style={{
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: '1.7',
                    padding: '0 2rem 1.5rem 2rem',
                    margin: 0
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem' }}>
              Have a question we didn't answer? We're here to help!
            </p>
            <a href="tel:+15086908886" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '1.125rem',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(220, 38, 38, 0.4)'
            }}>
              <Phone size={20} />
              Call (508) 690-8886
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
              borderRadius: '100px',
              color: '#166534',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.25rem'
            }}>
              The JH Painting Difference
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '1rem' }}>
              Why {city.name} Homeowners Choose JH Painting
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.8' }}>
              With dozens of painting contractors in the {city.name} area, why do homeowners consistently choose us? Here's what sets JH Painting Services apart.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', maxWidth: '1200px', margin: '0 auto' }}>
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
              <div key={idx} style={{
                padding: '2rem',
                background: '#fff',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <item.icon size={28} color="#166534" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.7' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA after Why Choose Us */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="tel:+15086908886" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '1.125rem',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)'
            }}>
              <Phone size={20} />
              Call for Your Free Estimate
            </a>
          </div>
        </div>
      </section>

      {/* Local SEO Content Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: '800', color: '#0F172A', lineHeight: '1.3', marginBottom: '1.5rem' }}>
              Professional Painting Services for {city.name}, Massachusetts Homes
            </h2>

            <div style={{ fontSize: '1.0625rem', color: '#475569', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                As a trusted painting contractor serving {city.name} and the greater {city.county} area, JH Painting Services understands the unique needs of Massachusetts homeowners. Our New England climate—with its harsh winters, humid summers, and dramatic temperature swings—demands painting solutions that go beyond what works in milder regions.
              </p>

              <p style={{ marginBottom: '1.5rem' }}>
                {city.name} homes, whether historic properties or modern constructions, each present their own painting challenges. Older homes often have lead paint concerns, multiple layers of previous paint, and architectural details requiring careful attention. Newer homes may have different substrate materials and finishes. Our experienced crews have worked on all types of {city.name} properties and know exactly how to approach each situation.
              </p>

              <h3 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#0F172A', marginTop: '2rem', marginBottom: '1rem' }}>
                Interior Painting in {city.name}
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Transform your {city.name} home's interior with professional painting that enhances your living space. We paint living rooms, bedrooms, kitchens, bathrooms, hallways, ceilings, trim, and doors. Our interior services include complete color consultation, furniture protection, thorough surface preparation, premium paint application, and meticulous cleanup. Whether you're refreshing a single room or repainting your entire home, we deliver stunning results that last.
              </p>

              <h3 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#0F172A', marginTop: '2rem', marginBottom: '1rem' }}>
                Exterior Painting in {city.name}
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Protect your {city.name} home from the elements while boosting curb appeal with professional exterior painting. Massachusetts weather is tough on exterior surfaces—freeze-thaw cycles, snow, ice, rain, and intense summer sun all take their toll. We use premium exterior paints specifically formulated to withstand these conditions, properly prepare all surfaces, and apply the right products for each material type (wood siding, vinyl, stucco, brick, trim).
              </p>

              <h3 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#0F172A', marginTop: '2rem', marginBottom: '1rem' }}>
                Cabinet Painting & Refinishing
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Want to transform your {city.name} kitchen without the cost of new cabinets? Our cabinet painting service delivers a factory-finish look at a fraction of replacement cost. We properly prepare cabinet surfaces, apply primer and multiple coats of durable cabinet-specific paint, and reinstall hardware for a complete transformation. Most kitchen cabinet projects are completed in 5-7 days.
              </p>

              <h3 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#0F172A', marginTop: '2rem', marginBottom: '1rem' }}>
                Commercial Painting Services
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>
                {city.name} businesses trust JH Painting for professional commercial painting that minimizes disruption to operations. We work around your schedule—evenings, weekends, or overnight—to complete projects without affecting your business. From offices and retail spaces to restaurants and medical facilities, we deliver commercial-quality results that enhance your professional image.
              </p>

              <div style={{
                marginTop: '2.5rem',
                padding: '2rem',
                background: 'linear-gradient(135deg, #FEF3F2 0%, #FEE2E2 100%)',
                borderRadius: '16px',
                border: '1px solid #FECACA'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#DC2626', marginBottom: '1rem' }}>
                  Ready to Get Started?
                </h3>
                <p style={{ color: '#7F1D1D', marginBottom: '1.5rem' }}>
                  Join the hundreds of {city.name} homeowners who have trusted JH Painting Services to transform their properties. Call today for your free, no-obligation estimate.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="tel:+15086908886" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.5rem',
                    background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                    color: '#fff',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}>
                    <Phone size={18} />
                    (508) 690-8886
                  </a>
                  <a href="#quote-form" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.5rem',
                    background: '#fff',
                    color: '#DC2626',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    border: '2px solid #DC2626'
                  }}>
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
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: '#fff', marginBottom: '1.5rem' }}>
              Ready to Transform Your {city.name} Property?
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
              Get a free, detailed estimate for your painting project today.
              No obligation, no pressure—just honest advice and transparent pricing.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+15086908886" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem 2.5rem',
                background: '#fff',
                color: '#DC2626',
                borderRadius: '12px',
                fontSize: '1.25rem',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
              }}>
                <Phone size={24} />
                (508) 690-8886
              </a>
              <a href="#quote-form" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem 2.5rem',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '1.25rem',
                fontWeight: '600',
                textDecoration: 'none',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>
                <Mail size={24} />
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section style={{ padding: '4rem 0', background: '#0F172A' }}>
        <div className="container">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', marginBottom: '0.75rem' }}>
                Serving 114+ Cities Across Massachusetts
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem' }}>
                Professional painting services throughout the state
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              {footerCities.map((footerCity, idx) => (
                <Link
                  key={idx}
                  href={`/cities/${footerCity.toLowerCase().replace(/ /g, '-')}`}
                  style={{
                    padding: '0.5rem 1rem',
                    background: footerCity === city.name ? 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '100px',
                    color: '#fff',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {footerCity}
                </Link>
              ))}
              <Link
                href="/cities"
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                View All Cities <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer style={{ background: '#030712', padding: '4rem 0 2rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            maxWidth: '1200px',
            margin: '0 auto',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Brand */}
            <div>
              <Image
                src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png"
                alt="JH Painting Services"
                width={160}
                height={64}
                style={{ filter: 'brightness(0) invert(1)', marginBottom: '1.5rem' }}
              />
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Professional painting services for homes and businesses across Massachusetts.
                Licensed, insured, and dedicated to excellence.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { href: 'https://www.facebook.com/profile.php?id=61564489391475', label: 'Facebook' },
                  { href: 'https://www.instagram.com/jhpaintingservices_/', label: 'Instagram' },
                  { href: 'https://www.youtube.com/@JHPaintingServices-br9wh', label: 'YouTube' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={social.label}
                  >
                    {social.label === 'Facebook' && (
                      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    )}
                    {social.label === 'Instagram' && (
                      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
                    )}
                    {social.label === 'YouTube' && (
                      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About Us', href: '/#about' },
                  { label: 'Services', href: '/services' },
                  { label: 'Gallery', href: '/#gallery' },
                  { label: 'Reviews', href: '/#reviews' },
                  { label: 'Contact', href: '/#contact' }
                ].map((link, idx) => (
                  <li key={idx} style={{ marginBottom: '0.75rem' }}>
                    <Link href={link.href} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9375rem' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Our Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {servicesList.map((svc, idx) => (
                  <li key={idx} style={{ marginBottom: '0.75rem' }}>
                    <Link href={`/services/${svc.slug}`} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9375rem' }}>
                      {svc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Contact Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="tel:+15086908886" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  <Phone size={18} color="#DC2626" />
                  (508) 690-8886
                </a>
                <a href="mailto:contact@jhpaintingservices.com" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  <Mail size={18} color="#DC2626" />
                  contact@jhpaintingservices.com
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  <MapPin size={18} color="#DC2626" />
                  Serving All of Massachusetts
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  <Clock size={18} color="#DC2626" />
                  Mon-Sat: 7AM - 6PM
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
              © 2025 JH Painting Services. All Rights Reserved. Licensed Painting Contractor | Serving Massachusetts
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
