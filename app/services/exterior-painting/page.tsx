'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Mail, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, Home, Sun, Droplets, Facebook, Instagram, Linkedin, Menu, X, ChevronDown, Paintbrush, Palette, Home as HomeIcon, Building2, PaintBucket, DollarSign } from 'lucide-react'

const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: HomeIcon, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
]

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
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Exterior house painting Massachusetts', category: 'House Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'Professional exterior painters', category: 'Siding' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Quality exterior painting work', category: 'Full Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Exterior trim painting', category: 'Trim Work' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Deck staining services', category: 'Deck Staining' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Weather resistant painting', category: 'Weather Protection' },
]

const videos = [
  { id: 'F_lreXzNlUI', title: 'Exterior Transformation Project' },
  { id: 'LkT_HLyKibY', title: 'House Painting Process' },
]

// All 114 Massachusetts cities
const allCities = [
  'Hudson', 'Southborough', 'Berlin', 'Northborough', 'Cordaville', 'Stow', 'Westborough',
  'Framingham Center', 'Bolton', 'Sudbury', 'Ashland', 'Maynard', 'Framingham', 'Hopkinton',
  'Wayland', 'Acton', 'Marlborough', 'Natick', 'Holliston', 'Boxborough', 'Concord',
  'Sherborn', 'Littleton', 'Medfield', 'Harvard', 'Millis', 'Wellesley', 'Lincoln',
  'Westford', 'Weston', 'Dover', 'Medway', 'Carlisle', 'Norfolk', 'Needham', 'Milford',
  'Lexington', 'Groton', 'Walpole', 'Dedham', 'Newton', 'Chelmsford', 'Bedford',
  'Franklin', 'Bellingham', 'Brookline', 'Wrentham', 'Dunstable', 'Burlington', 'Foxborough',
  'Sharon', 'Canton', 'Woburn', 'Pepperell', 'Townsend', 'Milton', 'Watertown', 'Norwood',
  'Tyngsborough', 'Randolph', 'Stoughton', 'Quincy', 'Arlington', 'Belmont', 'Braintree',
  'Cambridge', 'Lowell', 'Somerville', 'Medford', 'Malden', 'Everett', 'Revere', 'Chelsea',
  'Winthrop', 'Lynn', 'Saugus', 'Peabody', 'Salem', 'Beverly', 'Danvers', 'Marblehead',
  'Swampscott', 'Nahant', 'Wakefield', 'Melrose', 'Stoneham', 'Reading', 'Wilmington',
  'Billerica', 'Tewksbury', 'Dracut', 'Andover', 'North Andover', 'Lawrence', 'Methuen',
  'Haverhill', 'Amesbury', 'Newburyport', 'Newbury', 'Rowley', 'Ipswich', 'Hamilton',
  'Wenham', 'Topsfield', 'Middleton', 'North Reading', 'Lynnfield', 'Winchester',
  'Weymouth', 'Holbrook', 'Avon', 'Brockton', 'Easton', 'Mansfield', 'Norton', 'Attleboro',
  'North Attleboro', 'Plainville', 'Wrentham', 'Boston'
]

export default function ExteriorPaintingPage() {
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
            <Image
              src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png"
              alt="JH Painting Services Logo"
              width={160}
              height={64}
              priority
            />
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
        id="exterior-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(exteriorPaintingSchema)
        }}
      />

      {/* Luxury Hero Section */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
            alt="Professional Exterior Painting Services Massachusetts"
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
                  Serving All Massachusetts
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
                  5.0 Rating
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '800',
                color: '#fff',
                lineHeight: '1.1',
                marginBottom: '1.5rem'
              }}>
                Professional{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Exterior Painting
                </span>{' '}
                Services
              </h1>

              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.7',
                marginBottom: '2rem',
                maxWidth: '600px'
              }}>
                Protect and beautify your home's exterior with weather-resistant finishes built for Massachusetts climate. Premium paints, expert application, and lasting protection for 10-15 years.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <a href="tel:+15086908886" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                  color: '#fff',
                  borderRadius: '100px',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(198, 40, 40, 0.4)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  <Phone size={20} />
                  (508) 690-8886
                </a>
                <Link href="/#contact" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  borderRadius: '100px',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}>
                  Get Free Estimate
                  <ChevronRight size={20} />
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Award, text: 'Weather-Resistant' },
                  { icon: Clock, text: '10-15 Year Protection' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    <item.icon size={18} style={{ color: '#C62828' }} />
                    <span style={{ fontSize: '0.9375rem' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem' }}>
                  Get Your Free Quote
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9375rem' }}>
                  Fast response • No obligation • Exterior painting experts
                </p>
              </div>
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/t2TbHgsNLXqLPQdo8ryx"
                style={{ width: '100%', height: '400px', border: 'none', borderRadius: '12px' }}
                scrolling="no"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Bar */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { number: '1000+', label: 'Exteriors Painted' },
              { number: '15+', label: 'Years Experience' },
              { number: '100%', label: 'Weather Protection' },
              { number: '114', label: 'Cities Served' }
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#C62828' }}>{stat.number}</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem' }}>
              Is Your Home's Exterior Weathered and Fading?
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '700px', margin: '0 auto' }}>
              Massachusetts weather is brutal on exterior paint. Let's protect your investment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {[
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
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '2rem',
                background: '#F8FAFC',
                borderRadius: '16px',
                borderLeft: '4px solid #C62828'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <item.icon size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#64748B', lineHeight: '1.7', marginBottom: '1rem' }}>
                  {item.desc}
                </p>
                <p style={{ color: '#C62828', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} />
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '5rem 0', background: '#0F172A' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'rgba(198, 40, 40, 0.2)',
              color: '#C62828',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem',
              border: '1px solid rgba(198, 40, 40, 0.3)'
            }}>
              Our Exterior Services
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '1rem' }}>
              Complete Exterior Painting Solutions
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
              Protecting Massachusetts homes from the elements with premium finishes
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            {[
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
            ].map((service, idx) => (
              <div key={idx} style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <CheckCircle2 size={24} style={{ color: '#C62828', flexShrink: 0 }} />
                <span style={{ color: '#fff', fontSize: '1rem', fontWeight: '500' }}>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
              color: '#fff',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Our Process
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem' }}>
              6-Step Exterior Painting Process
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              Thorough preparation and expert application for lasting results
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              { step: '01', title: 'Inspection & Estimate', desc: 'Thorough assessment of your exterior and detailed free quote' },
              { step: '02', title: 'Power Washing', desc: 'Deep cleaning of all surfaces to remove dirt, mold, and loose paint' },
              { step: '03', title: 'Surface Prep & Repair', desc: 'Scraping, sanding, caulking, and wood repairs for perfect adhesion' },
              { step: '04', title: 'Priming', desc: 'Quality primer application for optimal paint adhesion and coverage' },
              { step: '05', title: 'Professional Painting', desc: 'Expert application of premium exterior paint with multiple coats' },
              { step: '06', title: 'Final Inspection', desc: 'Quality check and customer walkthrough to ensure satisfaction' }
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '2rem',
                background: '#F8FAFC',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  fontSize: '4rem',
                  fontWeight: '900',
                  color: 'rgba(198, 40, 40, 0.1)',
                  lineHeight: 1
                }}>
                  {item.step}
                </div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '1.25rem'
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#64748B', lineHeight: '1.7', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
              color: '#fff',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Our Work
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem' }}>
              Exterior Painting Gallery
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              Beautiful exterior transformations across Massachusetts
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {galleryImages.map((image, idx) => (
              <div key={idx} style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                aspectRatio: '4/3'
              }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem'
                }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.375rem 0.75rem',
                    background: 'rgba(198, 40, 40, 0.9)',
                    color: '#fff',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    {image.category}
                  </span>
                  <p style={{ color: '#fff', fontWeight: '600', margin: 0 }}>{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section style={{ padding: '5rem 0', background: '#0F172A' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'rgba(198, 40, 40, 0.2)',
              color: '#C62828',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem',
              border: '1px solid rgba(198, 40, 40, 0.3)'
            }}>
              Watch Our Work
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '1rem' }}>
              See Our Exterior Transformations
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
              Watch how we protect and beautify homes
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
                  borderRadius: '16px',
                  overflow: 'hidden',
                  aspectRatio: '16/9',
                  display: 'block',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
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
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(198, 40, 40, 0.5)'
                  }}>
                    <Play size={32} fill="#fff" color="#fff" />
                  </div>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem'
                }}>
                  <p style={{ color: '#fff', fontWeight: '600', fontSize: '1.125rem', margin: 0 }}>{video.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
              }}>
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac03fd033dc1.png"
                  alt="Jafet Herra - Owner of JH Painting Services"
                  width={500}
                  height={600}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1.5rem',
                background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                padding: '1.5rem',
                borderRadius: '16px',
                color: '#fff',
                boxShadow: '0 10px 30px rgba(198, 40, 40, 0.4)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>15+</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Years Experience</div>
              </div>
            </div>

            <div>
              <span style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
                color: '#fff',
                borderRadius: '100px',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                About Us
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Meet Jafet Herra, Your Exterior Painting Expert
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                With over 15 years of experience protecting Massachusetts homes from the elements, JH Painting Services understands what it takes to deliver exterior paint jobs that last. Owner Jafet Herra leads every project with dedication to quality and weather-resistant finishes.
              </p>
              <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.8', marginBottom: '2rem' }}>
                We know Massachusetts weather—harsh winters, humid summers, and everything in between. That's why we use premium, weather-resistant paints and follow meticulous preparation processes that ensure your exterior paint job protects your home for 10-15 years.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {[
                  { icon: Users, text: 'Family-Owned Business' },
                  { icon: Heart, text: 'Customer-First Approach' },
                  { icon: Shield, text: 'Fully Licensed & Insured' },
                  { icon: Sparkles, text: 'Weather-Resistant Paints' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: '#F8FAFC',
                    borderRadius: '12px'
                  }}>
                    <item.icon size={24} style={{ color: '#C62828' }} />
                    <span style={{ fontWeight: '600', color: '#0F172A' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '1rem' }}>
              Ready to Transform Your Home's Exterior?
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem' }}>
              Get a free estimate today and protect your investment with professional exterior painting.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+15086908886" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: '#fff',
                color: '#C62828',
                borderRadius: '100px',
                fontWeight: '700',
                fontSize: '1.125rem',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}>
                <Phone size={20} />
                Call (508) 690-8886
              </a>
              <Link href="/#contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: 'transparent',
                color: '#fff',
                borderRadius: '100px',
                fontWeight: '600',
                fontSize: '1.125rem',
                textDecoration: 'none',
                border: '2px solid rgba(255, 255, 255, 0.5)'
              }}>
                Request Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem' }}>
              Exterior Painting Service Areas
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B' }}>
              Serving 114 cities across Massachusetts
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            maxWidth: '1200px',
            margin: '0 auto 2rem'
          }}>
            {allCities.map((city, idx) => (
              <Link
                key={idx}
                href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}/exterior-painting`}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#fff',
                  borderRadius: '100px',
                  color: '#64748B',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
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
              padding: '0.75rem 1.5rem',
              background: '#0F172A',
              color: '#fff',
              borderRadius: '100px',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              View All 114 Cities
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0F172A', color: '#fff', padding: '4rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            {/* Brand */}
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>
                <span style={{ color: '#C62828' }}>JH</span> Painting Services
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Professional exterior painting services across Massachusetts. Weather-resistant finishes, premium materials, and exceptional customer service.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://www.facebook.com/jhpaintingservicesma" target="_blank" rel="noopener noreferrer" style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  transition: 'background 0.3s ease'
                }}>
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/jhpaintingservices" target="_blank" rel="noopener noreferrer" style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  transition: 'background 0.3s ease'
                }}>
                  <Instagram size={20} />
                </a>
                <a href="https://www.linkedin.com/company/jh-painting-services" target="_blank" rel="noopener noreferrer" style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  transition: 'background 0.3s ease'
                }}>
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((link, idx) => (
                  <li key={idx}>
                    <Link href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Our Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Interior Painting', 'Exterior Painting', 'Commercial Painting', 'Residential Painting', 'Cabinet Painting'].map((service, idx) => (
                  <li key={idx}>
                    <Link href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.3s ease' }}>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Contact Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="tel:+15086908886" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  <Phone size={18} style={{ color: '#C62828' }} />
                  (508) 690-8886
                </a>
                <a href="mailto:jhpaintingservices1@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  <Mail size={18} style={{ color: '#C62828' }} />
                  jhpaintingservices1@gmail.com
                </a>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  <MapPin size={18} style={{ color: '#C62828', flexShrink: 0, marginTop: '2px' }} />
                  <span>Serving All of Massachusetts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Cities */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Service Areas
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {allCities.map((city, idx) => (
                <Link
                  key={idx}
                  href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none', fontSize: '0.875rem' }}
                >
                  {city}{idx < allCities.length - 1 ? ' •' : ''}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem', margin: 0 }}>
              © {new Date().getFullYear()} JH Painting Services. All rights reserved. | Licensed & Insured
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
