'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Mail, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, Facebook, Instagram, Linkedin, ArrowRight, Palette, Home, DollarSign, Timer, Brush, Menu, X, ChevronDown, Paintbrush, Home as HomeIcon, Building2, PaintBucket } from 'lucide-react'

const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: HomeIcon, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
]

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
          "addressLocality": "Waltham",
          "addressRegion": "MA",
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
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png",
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

// All 114 Massachusetts cities
const allCities = [
  'Hudson', 'Southborough', 'Berlin', 'Northborough', 'Cordaville', 'Stow', 'Westborough',
  'Framingham Center', 'Bolton', 'Sudbury', 'Ashland', 'Maynard', 'Framingham', 'Hopkinton',
  'Clinton', 'Boylston', 'Shrewsbury', 'Wayland', 'Cochituate', 'South Lancaster', 'Lancaster',
  'Harvard', 'West Concord', 'Natick', 'Acton', 'Sherborn', 'Holliston', 'Grafton', 'West Boylston',
  'Upton', 'Weston', 'Sterling', 'Concord', 'Hamilton', 'Lincoln', 'Wellesley', 'Sunderland',
  'Littleton Common', 'Worcester', 'Shirley', 'Milford', 'Northbridge', 'Ayer', 'Hopedale',
  'Dover', 'Millbury', 'Millis', 'Waltham', 'Carlisle', 'Millis-Clicquot', 'Medway', 'Holden',
  'Leominster', 'Medfield', 'Needham', 'Westford', 'Mendon', 'Bedford', 'Newton', 'Whitinsville',
  'Sutton', 'Lexington', 'Groton', 'Princeton', 'Auburn', 'Bellingham', 'Watertown', 'Westwood',
  'Belmont', 'Lunenburg', 'Uxbridge', 'Norfolk', 'Chelmsford', 'Paxton', 'Franklin', 'Leicester',
  'Billerica', 'Arlington', 'Pinehurst', 'Rutland', 'Norwood', 'Dedham', 'Fitchburg', 'Burlington',
  'Walpole', 'East Douglas', 'Brookline', 'Jamaica Plain', 'East Pepperell', 'Woburn', 'Pepperell',
  'Winchester', 'Millville', 'Wrentham', 'Cambridge', 'Douglas', 'Dunstable', 'Lowell', 'Blackstone',
  'Oxford', 'Somerville', 'Medford', 'Westminster', 'Wilmington', 'Townsend', 'Tyngsboro', 'Spencer',
  'Tewksbury', 'Canton', 'Sharon', 'Stoneham', 'Boston', 'Foxborough'
]

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Luxury white kitchen cabinet transformation', category: 'Kitchen Cabinets' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Modern gray cabinet refinishing', category: 'Cabinet Refinishing' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Professional spray finish cabinets', category: 'Spray Finishing' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Custom cabinet color matching', category: 'Custom Colors' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Cabinet door and drawer painting', category: 'Door Refinishing' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'Complete kitchen cabinet makeover', category: 'Full Makeover' },
]

const videos = [
  { id: 'F_lreXzNlUI', title: 'Complete Cabinet Transformation Process' },
  { id: 'LkT_HLyKibY', title: 'Professional Cabinet Spray Techniques' },
]

export default function CabinetPaintingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

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

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <a href="tel:+15086908886" className="top-bar-item">
              <Phone size={14} />
              <span>(508) 690-8886</span>
            </a>
            <a href="mailto:jhpaintingservices1@gmail.com" className="top-bar-item">
              <Mail size={14} />
              <span>jhpaintingservices1@gmail.com</span>
            </a>
          </div>
          <div className="top-bar-right">
            <span className="top-bar-item">
              <Clock size={14} />
              <span>Mon-Sat: 7AM-6PM</span>
            </span>
            <span className="top-bar-badge">Free Estimates!</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-content">
          <Link href="/" className="logo">
            <span className="logo-jh">JH</span>
            <span className="logo-text">Painting Services</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link href="/" className="nav-link">Home</Link>
            <div
              className="nav-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="nav-link nav-dropdown-trigger">
                Services
                <ChevronDown size={16} className={`nav-chevron ${servicesOpen ? 'nav-chevron-open' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="nav-dropdown-menu">
                  {menuServices.map((service) => (
                    <Link key={service.href} href={service.href} className="nav-dropdown-item">
                      <service.icon size={20} className="nav-dropdown-icon" />
                      <div>
                        <div className="nav-dropdown-title">{service.name}</div>
                        <div className="nav-dropdown-desc">{service.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/#about" className="nav-link">About</Link>
            <Link href="/#gallery" className="nav-link">Gallery</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
          </nav>

          {/* CTA Button */}
          <a href="tel:+15086908886" className="header-cta">
            <Phone size={18} />
            <span>Call Now</span>
          </a>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="mobile-menu-btn" aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay">
          <nav className="mobile-menu">
            <Link href="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link>
            <div className="mobile-nav-group">
              <button onClick={toggleMobileServices} className="mobile-nav-link mobile-nav-trigger">
                Services
                <ChevronDown size={20} className={`mobile-chevron ${mobileServicesOpen ? 'mobile-chevron-open' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="mobile-submenu">
                  {menuServices.map((service) => (
                    <Link key={service.href} href={service.href} className="mobile-submenu-link" onClick={closeMenu}>
                      <service.icon size={18} />
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/#about" className="mobile-nav-link" onClick={closeMenu}>About</Link>
            <Link href="/#gallery" className="mobile-nav-link" onClick={closeMenu}>Gallery</Link>
            <Link href="/#contact" className="mobile-nav-link" onClick={closeMenu}>Contact</Link>
            <a href="tel:+15086908886" className="mobile-cta" onClick={closeMenu}>
              <Phone size={20} />
              Call (508) 690-8886
            </a>
          </nav>
        </div>
      )}

      {/* Schema JSON-LD for SEO */}
      <Script
        id="cabinet-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cabinetPaintingSchema)
        }}
      />

      {/* Ultra Luxury Hero Section */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png"
            alt="Professional Cabinet Painting Services Massachusetts - Transform Your Kitchen"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.70) 50%, rgba(0, 0, 0, 0.60) 100%)'
          }} />
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(198, 40, 40, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(198, 40, 40, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(30px)'
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '120px', paddingBottom: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '4rem', alignItems: 'center' }}>
            {/* Hero Text */}
            <div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}>
                  <MapPin size={16} style={{ color: '#C62828' }} />
                  Serving 114 Cities in Massachusetts
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.625rem 1.25rem',
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)'
                }}>
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  5.0 Google Rating
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
                fontWeight: '800',
                color: '#fff',
                lineHeight: '1.05',
                marginBottom: '1.75rem',
                letterSpacing: '-0.02em'
              }}>
                Transform Your Kitchen with{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #C62828 0%, #E53935 50%, #EF5350 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Professional Cabinet Painting
                </span>
              </h1>

              <p style={{
                fontSize: '1.375rem',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.7',
                marginBottom: '2.5rem',
                maxWidth: '620px',
                fontWeight: '400'
              }}>
                Save 70-90% compared to cabinet replacement. Our expert refinishing delivers a factory-fresh, durable finish that transforms outdated kitchens into stunning showpieces.
              </p>

              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <a href="tel:+15086908886" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.125rem 2.5rem',
                  background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                  color: '#fff',
                  borderRadius: '100px',
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(198, 40, 40, 0.5), 0 4px 10px rgba(198, 40, 40, 0.3)',
                  transition: 'all 0.3s ease',
                  border: 'none'
                }}>
                  <Phone size={22} />
                  (508) 690-8886
                </a>
                <Link href="/#contact" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.125rem 2.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  color: '#fff',
                  borderRadius: '100px',
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}>
                  Get Free Estimate
                  <ArrowRight size={20} />
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                {[
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Award, text: 'Cabinet Specialists' },
                  { icon: Timer, text: '3-7 Day Projects' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    padding: '0.5rem 0'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'rgba(198, 40, 40, 0.2)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <item.icon size={18} style={{ color: '#EF5350' }} />
                    </div>
                    <span style={{ fontSize: '0.9375rem', fontWeight: '600' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Quote Form Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '28px',
              padding: '2.5rem',
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(90deg, #C62828 0%, #E53935 50%, #EF5350 100%)'
              }} />
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, rgba(198, 40, 40, 0.1) 0%, rgba(239, 83, 80, 0.1) 100%)',
                  borderRadius: '100px',
                  marginBottom: '1rem'
                }}>
                  <Sparkles size={16} style={{ color: '#C62828' }} />
                  <span style={{ color: '#C62828', fontWeight: '700', fontSize: '0.875rem' }}>FREE ESTIMATE</span>
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
                  Get Your Quote Today
                </h2>
                <p style={{ color: '#64748B', fontSize: '1rem' }}>
                  Save up to 90% vs. cabinet replacement
                </p>
              </div>
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/t2TbHgsNLXqLPQdo8ryx"
                style={{ width: '100%', height: '400px', border: 'none', borderRadius: '16px' }}
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Stats Bar */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '2rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { number: '500+', label: 'Kitchens Transformed', icon: Home },
              { number: '15+', label: 'Years Experience', icon: Award },
              { number: '70-90%', label: 'Cost Savings', icon: DollarSign },
              { number: '3-7', label: 'Day Completion', icon: Timer }
            ].map((stat, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                padding: '1rem',
                borderRight: idx < 3 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <stat.icon size={24} style={{ color: '#C62828' }} />
                  <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff' }}>{stat.number}</span>
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: '600'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition - Pain Points */}
      <section style={{ padding: '6rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.625rem 1.5rem',
              background: 'linear-gradient(135deg, rgba(198, 40, 40, 0.1) 0%, rgba(239, 83, 80, 0.1) 100%)',
              color: '#C62828',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '700',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Why Cabinet Painting?
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Tired of Your Outdated Kitchen?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#64748B',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Transform your kitchen without the $20,000+ price tag. Professional cabinet painting delivers stunning results at a fraction of the cost.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              {
                icon: DollarSign,
                title: "Can't Afford $20,000+ for New Cabinets?",
                desc: "Cabinet replacement costs a fortune and takes weeks. Professional cabinet painting gives you that fresh, modern look for 70-90% less—usually $1,500-$5,000 instead of $15,000-$40,000+.",
                solution: 'Save thousands with professional refinishing'
              },
              {
                icon: Palette,
                title: 'Dated Wood Stain or Yellow Laminate?',
                desc: "That 1990s oak or yellowed white makes your whole kitchen look old—even if everything else is updated. Fresh paint in a modern color transforms your space instantly.",
                solution: 'Any color you want—white, gray, navy, sage'
              },
              {
                icon: Shield,
                title: "Worried It Won't Last?",
                desc: "DIY cabinet painting often chips and peels within months. Our professional process—proper cleaning, sanding, priming, and spray finishing with cabinet-grade paint—delivers durable results that last for years.",
                solution: 'Factory-like finish built to withstand daily use'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '2.5rem',
                background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                borderRadius: '24px',
                borderLeft: '5px solid #C62828',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 20px rgba(198, 40, 40, 0.3)'
                }}>
                  <item.icon size={28} color="#fff" />
                </div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem', lineHeight: '1.3' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#64748B', lineHeight: '1.8', marginBottom: '1.25rem', fontSize: '1rem' }}>
                  {item.desc}
                </p>
                <p style={{
                  color: '#C62828',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  fontSize: '1rem'
                }}>
                  <CheckCircle2 size={20} />
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dramatic Cost Comparison */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(198, 40, 40, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{
                display: 'inline-block',
                padding: '0.625rem 1.5rem',
                background: 'rgba(198, 40, 40, 0.2)',
                color: '#EF5350',
                borderRadius: '100px',
                fontSize: '0.875rem',
                fontWeight: '700',
                marginBottom: '1.25rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                border: '1px solid rgba(198, 40, 40, 0.3)'
              }}>
                Smart Investment
              </span>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '800',
                color: '#fff',
                marginBottom: '1rem'
              }}>
                Save Thousands on Your Kitchen Upgrade
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
                Same stunning results, fraction of the price and time
              </p>
            </div>

            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                borderRadius: '28px',
                color: '#fff',
                boxShadow: '0 25px 50px rgba(198, 40, 40, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '2rem 2.5rem 1rem 1.5rem',
                  borderRadius: '0 0 0 30px',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  Best Value
                </div>
                <Brush size={48} style={{ marginBottom: '1.5rem', opacity: 0.9 }} />
                <div style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: '1' }}>
                  $1,500-$5,000
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  Cabinet Painting
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1.5rem' }}>
                  Professional spray finish refinishing
                </div>
                <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: 0 }}>
                  {['3-7 day completion', 'Minimal disruption', 'Factory-quality finish', 'Any color available'].map((item, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem',
                      fontSize: '0.9375rem'
                    }}>
                      <CheckCircle2 size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '28px',
                border: '2px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Home size={48} style={{ marginBottom: '1.5rem', color: '#64748B' }} />
                <div style={{ fontSize: '4rem', fontWeight: '800', color: '#64748B', marginBottom: '0.5rem', lineHeight: '1' }}>
                  $15,000-$40,000+
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>
                  Cabinet Replacement
                </div>
                <div style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '1.5rem' }}>
                  Full removal and new installation
                </div>
                <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: 0 }}>
                  {['4-8 week timeline', 'Major disruption', 'Limited style options', 'Hidden costs add up'].map((item, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem',
                      fontSize: '0.9375rem',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid rgba(255, 255, 255, 0.3)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Premium */}
      <section style={{ padding: '6rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.625rem 1.5rem',
              background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
              color: '#fff',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '700',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Our Services
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '1rem'
            }}>
              Complete Cabinet Refinishing Services
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              Everything you need for a stunning cabinet transformation
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              'Kitchen cabinet painting & refinishing',
              'Bathroom vanity painting',
              'Built-in cabinet refinishing',
              'Laundry room cabinet painting',
              'Cabinet door & drawer refinishing',
              'Cabinet frame painting',
              'Hardware removal & reinstallation',
              'Professional degreasing & cleaning',
              'Surface preparation & sanding',
              'Premium primer application',
              'Spray finishing for smooth results',
              'Custom color matching services'
            ].map((service, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <CheckCircle2 size={22} color="#fff" />
                </div>
                <span style={{ fontSize: '1rem', color: '#0F172A', fontWeight: '600' }}>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Premium Dark */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.625rem 1.5rem',
              background: 'rgba(198, 40, 40, 0.2)',
              color: '#EF5350',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '700',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              border: '1px solid rgba(198, 40, 40, 0.3)'
            }}>
              Our Process
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#fff',
              marginBottom: '1rem'
            }}>
              Professional 6-Step Cabinet Painting Process
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
              Our proven process ensures a flawless, factory-quality finish every time
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { num: '01', title: 'Free Consultation', desc: 'We evaluate your cabinets, discuss colors, and provide a detailed quote' },
              { num: '02', title: 'Expert Preparation', desc: 'Remove doors, drawers, and hardware; thorough cleaning and degreasing' },
              { num: '03', title: 'Surface Preparation', desc: 'Professional sanding and repair of any damage for the perfect base' },
              { num: '04', title: 'Premium Priming', desc: 'Apply bonding primer specifically designed for cabinet surfaces' },
              { num: '05', title: 'Spray Application', desc: 'Multiple coats of cabinet-grade paint using professional spray equipment' },
              { num: '06', title: 'Reassembly & Inspection', desc: 'Proper curing, careful reassembly, and thorough quality inspection' }
            ].map((step, idx) => (
              <div key={idx} style={{
                padding: '2.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  fontSize: '4rem',
                  fontWeight: '800',
                  color: 'rgba(198, 40, 40, 0.15)',
                  lineHeight: '1'
                }}>
                  {step.num}
                </div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: '#fff'
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: '700', color: '#fff', marginBottom: '0.75rem' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0, lineHeight: '1.7', fontSize: '1rem' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery - Premium */}
      <section style={{ padding: '6rem 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.625rem 1.5rem',
              background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
              color: '#fff',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '700',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Our Work
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '1rem'
            }}>
              Cabinet Transformation Gallery
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              From outdated to outstanding—see real results from Massachusetts homeowners
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {galleryImages.map((image, idx) => (
              <div key={idx} style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                aspectRatio: '4/3'
              }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, transparent 60%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1.75rem',
                  left: '1.75rem',
                  right: '1.75rem'
                }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                    color: '#fff',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {image.category}
                  </span>
                  <p style={{ color: '#fff', fontWeight: '600', margin: 0, fontSize: '1.125rem' }}>{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.625rem 1.5rem',
              background: 'rgba(198, 40, 40, 0.2)',
              color: '#EF5350',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '700',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              border: '1px solid rgba(198, 40, 40, 0.3)'
            }}>
              Watch Our Work
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#fff',
              marginBottom: '1rem'
            }}>
              See Our Cabinet Transformations
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
              Watch our professional cabinet painting process in action
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
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
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)'
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
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s ease'
                }}>
                  <div style={{
                    width: '90px',
                    height: '90px',
                    background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 15px 40px rgba(198, 40, 40, 0.5)'
                  }}>
                    <Play size={36} fill="#fff" color="#fff" style={{ marginLeft: '4px' }} />
                  </div>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '1.75rem',
                  left: '1.75rem',
                  right: '1.75rem'
                }}>
                  <p style={{ color: '#fff', fontWeight: '700', fontSize: '1.25rem', margin: 0 }}>{video.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Color Options */}
      <section style={{ padding: '6rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.625rem 1.5rem',
              background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
              color: '#fff',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '700',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Color Options
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '1rem'
            }}>
              Popular Cabinet Colors
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              Choose from trending colors or we can match any shade you desire
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { name: 'Classic White', color: '#FFFFFF', border: true, popular: true },
              { name: 'Soft Cream', color: '#FAF9F6', border: true, popular: false },
              { name: 'Warm Gray', color: '#6B7280', border: false, popular: true },
              { name: 'Navy Blue', color: '#1E3A5F', border: false, popular: true },
              { name: 'Sage Green', color: '#87A878', border: false, popular: false },
              { name: 'Elegant Black', color: '#1F2937', border: false, popular: false },
            ].map((color, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#F8FAFC',
                borderRadius: '20px',
                position: 'relative'
              }}>
                {color.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.25rem 0.75rem',
                    background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                    color: '#fff',
                    borderRadius: '100px',
                    fontSize: '0.625rem',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>
                    Popular
                  </span>
                )}
                <div style={{
                  width: '100px',
                  height: '100px',
                  background: color.color,
                  borderRadius: '50%',
                  margin: '0 auto 1.25rem',
                  border: color.border ? '3px solid #E2E8F0' : 'none',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }} />
                <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0F172A' }}>
                  {color.name}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '1.125rem', color: '#64748B', marginTop: '3rem', textAlign: 'center' }}>
            Plus <strong>hundreds of custom colors</strong> available. We can match any color you desire!
          </p>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: '6rem 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '5rem',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)'
              }}>
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac03fd033dc1.png"
                  alt="Jafet Herra - Cabinet Painting Expert Massachusetts"
                  width={550}
                  height={650}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-2rem',
                right: '-1rem',
                background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                padding: '2rem',
                borderRadius: '20px',
                color: '#fff',
                boxShadow: '0 15px 40px rgba(198, 40, 40, 0.4)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1' }}>15+</div>
                <div style={{ fontSize: '1rem', opacity: 0.9, fontWeight: '600' }}>Years Experience</div>
              </div>
            </div>

            <div>
              <span style={{
                display: 'inline-block',
                padding: '0.625rem 1.5rem',
                background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                color: '#fff',
                borderRadius: '100px',
                fontSize: '0.875rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                About Us
              </span>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: '800',
                color: '#0F172A',
                marginBottom: '1.75rem',
                lineHeight: '1.2'
              }}>
                Massachusetts' Trusted Cabinet Painting Specialists
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                If your cabinet boxes are solid and the doors aren't damaged, there's absolutely no reason to rip them out and spend $20,000+ on replacements. The bones of your kitchen are fine—they just need a fresh look.
              </p>
              <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.8', marginBottom: '2rem' }}>
                We transform outdated oak, yellowed white, or worn laminate into modern, beautiful cabinets in any color you want. Because we use proper cabinet-specific paints and professional spray techniques, the finish is smooth, durable, and built to last for years.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {[
                  { icon: Users, text: 'Family-Owned Business' },
                  { icon: Heart, text: 'Customer-First Approach' },
                  { icon: Shield, text: 'Fully Licensed & Insured' },
                  { icon: Sparkles, text: 'Cabinet-Grade Paints' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem',
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                  }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      background: 'linear-gradient(135deg, rgba(198, 40, 40, 0.1) 0%, rgba(239, 83, 80, 0.1) 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <item.icon size={22} style={{ color: '#C62828' }} />
                    </div>
                    <span style={{ fontWeight: '700', color: '#0F172A', fontSize: '0.9375rem' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#fff',
              marginBottom: '1.25rem'
            }}>
              Ready to Transform Your Kitchen Cabinets?
            </h2>
            <p style={{ fontSize: '1.375rem', color: 'rgba(255, 255, 255, 0.95)', marginBottom: '2.5rem' }}>
              Get a free estimate today. Save thousands compared to cabinet replacement with results that last for years.
            </p>
            <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+15086908886" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem 2.5rem',
                background: '#fff',
                color: '#C62828',
                borderRadius: '100px',
                fontWeight: '800',
                fontSize: '1.125rem',
                textDecoration: 'none',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)'
              }}>
                <Phone size={22} />
                Call (508) 690-8886
              </a>
              <Link href="/#contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem 2.5rem',
                background: 'transparent',
                color: '#fff',
                borderRadius: '100px',
                fontWeight: '700',
                fontSize: '1.125rem',
                textDecoration: 'none',
                border: '2px solid rgba(255, 255, 255, 0.5)'
              }}>
                Request Free Quote
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas with ALL Cities */}
      <section style={{ padding: '6rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.625rem 1.5rem',
              background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
              color: '#fff',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '700',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Service Areas
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem' }}>
              Cabinet Painting Services Across Massachusetts
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B' }}>
              Serving <strong>114 cities</strong> with professional cabinet refinishing
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            maxWidth: '1200px',
            margin: '0 auto 3rem'
          }}>
            {allCities.map((city, idx) => (
              <Link
                key={idx}
                href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}/cabinet-painting`}
                style={{
                  padding: '0.625rem 1.25rem',
                  background: '#F8FAFC',
                  borderRadius: '100px',
                  color: '#475569',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: '500',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.3s ease'
                }}
              >
                {city}
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/cities" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              color: '#fff',
              borderRadius: '100px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}>
              View All 114 Service Areas
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#fff', padding: '5rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
            {/* Brand */}
            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1.25rem' }}>
                <span style={{ color: '#C62828' }}>JH</span> Painting Services
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.8', marginBottom: '1.75rem', fontSize: '1rem' }}>
                Massachusetts' trusted cabinet painting specialists. Transform your kitchen for a fraction of replacement cost with our expert refinishing services.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { icon: Facebook, href: 'https://www.facebook.com/jhpaintingservicesma' },
                  { icon: Instagram, href: 'https://www.instagram.com/jhpaintingservices' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/company/jh-painting-services' }
                ].map((social, idx) => (
                  <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    transition: 'all 0.3s ease'
                  }}>
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((link, idx) => (
                  <li key={idx}>
                    <Link href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <ChevronRight size={16} style={{ color: '#C62828' }} />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Our Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Interior Painting', 'Exterior Painting', 'Commercial Painting', 'Residential Painting', 'Cabinet Painting'].map((service, idx) => (
                  <li key={idx}>
                    <Link href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`} style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <ChevronRight size={16} style={{ color: '#C62828' }} />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Contact Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <a href="tel:+15086908886" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(198, 40, 40, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Phone size={20} style={{ color: '#EF5350' }} />
                  </div>
                  (508) 690-8886
                </a>
                <a href="mailto:jhpaintingservices1@gmail.com" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '0.9375rem'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(198, 40, 40, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={20} style={{ color: '#EF5350' }} />
                  </div>
                  jhpaintingservices1@gmail.com
                </a>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9375rem'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(198, 40, 40, 0.2)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={20} style={{ color: '#EF5350' }} />
                  </div>
                  <span>Serving All of Massachusetts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Cities - ALL 114 */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2.5rem', marginBottom: '2.5rem' }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Cabinet Painting Service Areas - 114 Massachusetts Cities
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem 0.5rem' }}>
              {allCities.map((city, idx) => (
                <Link
                  key={idx}
                  href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    textDecoration: 'none',
                    fontSize: '0.8125rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {city}{idx < allCities.length - 1 ? ' •' : ''}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9375rem', margin: 0 }}>
              © {new Date().getFullYear()} JH Painting Services. All rights reserved. | Licensed & Insured | Serving Massachusetts Since 2009
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
