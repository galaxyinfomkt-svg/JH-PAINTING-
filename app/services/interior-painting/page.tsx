'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Mail, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, Menu, X, ChevronDown, Paintbrush, Palette, Home as HomeIcon, Building2, PaintBucket, DollarSign, Facebook, Instagram, Linkedin } from 'lucide-react'

// Menu data for navigation
const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: HomeIcon, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
]

// Schema JSON-LD for Interior Painting Service
const interiorPaintingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jhpaintingservices.com/services/interior-painting#service",
      "name": "Interior Painting Services Massachusetts",
      "serviceType": "Interior Painting",
      "description": "Professional interior painting services across Massachusetts. Transform your home with expert wall painting, trim work, ceiling painting, and color consultation. Premium paints and meticulous preparation.",
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
        "name": "Interior Painting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Wall Painting",
              "description": "Professional wall painting with premium paints"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ceiling Painting",
              "description": "Expert ceiling painting and finishing"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Trim & Baseboard Painting",
              "description": "Detailed trim, baseboard, and molding painting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Color Consultation",
              "description": "Expert color selection and consultation"
            }
          }
        ]
      },
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png",
      "url": "https://jhpaintingservices.com/services/interior-painting"
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
          "name": "Interior Painting",
          "item": "https://jhpaintingservices.com/services/interior-painting"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does interior painting cost in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Interior painting costs in Massachusetts typically range from $2-$6 per square foot, depending on room size, wall condition, paint quality, and scope of work. Most rooms cost between $300-$800. Contact JH Painting for a free, detailed estimate tailored to your project."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to paint an interior room?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A typical bedroom or living room takes 1-2 days to complete, including proper prep work, priming, and two coats of paint. Larger rooms or those requiring extensive preparation may take longer. We always provide accurate timelines in our free estimates."
          }
        },
        {
          "@type": "Question",
          "name": "What paint brands do you use for interior painting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use premium paint brands including Benjamin Moore, Sherwin-Williams, and other top-quality paints. These provide superior coverage, durability, and a beautiful finish that lasts for years."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to move furniture before painting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We handle furniture moving as part of our service. We carefully move and cover furniture, protect floors with drop cloths, and ensure everything is put back after the job is complete. Large items should be moved to the center of the room."
          }
        }
      ]
    }
  ]
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Interior painting living room', category: 'Living Room' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Interior painting bedroom', category: 'Bedroom' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Interior floor refinishing', category: 'Floors' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Cabinet painting', category: 'Cabinets' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Professional painting work', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'House painters Massachusetts', category: 'Exterior' },
]

const videos = [
  { id: 'F_lreXzNlUI', title: 'Historic Church Transformation' },
  { id: 'LkT_HLyKibY', title: 'Interior Painting Process' },
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

export default function InteriorPaintingPage() {
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
      {/* Schema JSON-LD for SEO */}
      <Script
        id="interior-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(interiorPaintingSchema)
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
                Serving All Massachusetts
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

            <a href="tel:+15086908886" className="btn btn-primary header-cta">
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
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png"
            alt="Professional Interior Painting Services Massachusetts"
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
                  Interior Painting
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
                Transform your indoor spaces with expert interior painting. Quality craftsmanship, premium paints, and meticulous attention to detail for homes and businesses across Massachusetts.
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
                  { icon: Award, text: 'Expert Craftsmen' },
                  { icon: Clock, text: 'On-Time Service' }
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
                  Fast response • No obligation • Interior painting experts
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
              { number: '500+', label: 'Interiors Painted' },
              { number: '15+', label: 'Years Experience' },
              { number: '100%', label: 'Satisfaction Rate' },
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
              Frustrated with Dull, Damaged Interior Walls?
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '700px', margin: '0 auto' }}>
              You deserve a space that looks as good as you imagined. Let's fix what's holding you back.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              {
                title: 'Scuff Marks & Stains Everywhere?',
                desc: "Kids, pets, daily life—your walls show it all. Those marks and stains don't go away with cleaning. You need a fresh coat that covers everything and looks pristine.",
                solution: 'We prep, prime, and paint for a flawless finish'
              },
              {
                title: "Can't Pick the Right Color?",
                desc: "Thousands of paint colors, endless opinions—it's overwhelming. What if you choose wrong? Our color experts guide you to the perfect shade that complements your style and lighting.",
                solution: 'Free expert color consultation included'
              },
              {
                title: 'Worried About the Mess?',
                desc: "Paint drips on floors, furniture covered in plastic for weeks, the smell—painting sounds like a nightmare. We protect everything, work clean, and use low-VOC paints so you can enjoy the process.",
                solution: 'Meticulous prep and daily cleanup guaranteed'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '2rem',
                background: '#F8FAFC',
                borderRadius: '16px',
                borderLeft: '4px solid #C62828'
              }}>
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
              Interior Painting Gallery
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              Beautiful interior transformations across Massachusetts
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
              See Our Interior Transformations
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
              Watch how we transform spaces with professional painting
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
                Meet Jafet Herra, Your Interior Painting Expert
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Founded with a passion for perfection, JH Painting Services has been transforming interiors across Massachusetts for over 15 years. Owner Jafet Herra leads every project with dedication to quality and customer satisfaction.
              </p>
              <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.8', marginBottom: '2rem' }}>
                We understand that your interior reflects your personality. From cozy bedrooms to professional offices, we deliver flawless finishes that exceed expectations. Our attention to detail, clean work practices, and premium materials set us apart.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {[
                  { icon: Users, text: 'Family-Owned Business' },
                  { icon: Heart, text: 'Customer-First Approach' },
                  { icon: Shield, text: 'Fully Licensed & Insured' },
                  { icon: Sparkles, text: 'Premium Quality Paints' }
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
              Ready to Transform Your Interior?
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem' }}>
              Get a free estimate today and see the JH Painting difference. Professional results, on time and on budget.
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
              Interior Painting Service Areas
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
            maxWidth: '1000px',
            margin: '0 auto 2rem'
          }}>
            {allCities.map((city, idx) => (
              <Link
                key={idx}
                href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}/interior-painting`}
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
      </main>

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
                Professional interior painting services across Massachusetts. Quality craftsmanship, premium materials, and exceptional customer service.
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
