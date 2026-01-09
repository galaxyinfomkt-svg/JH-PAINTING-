'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, Mail, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, Building2, Briefcase, TrendingUp, Facebook, Instagram, Linkedin, Menu, X, ChevronDown, Paintbrush, Palette, Home as HomeIcon, PaintBucket, DollarSign } from 'lucide-react'

const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: HomeIcon, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
]

// Schema JSON-LD for Commercial Painting Service
const commercialPaintingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jhpaintingservices.com/services/commercial-painting#service",
      "name": "Commercial Painting Services Massachusetts",
      "serviceType": "Commercial Painting",
      "description": "Professional commercial painting services across Massachusetts. Office buildings, retail stores, restaurants, warehouses. Minimal business disruption, on-time completion, premium finishes.",
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
        "name": "Commercial Painting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Office Building Painting",
              "description": "Professional office space and building painting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Retail Store Painting",
              "description": "Retail and storefront painting services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Restaurant Painting",
              "description": "Restaurant and hospitality painting services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Warehouse & Industrial Painting",
              "description": "Warehouse and industrial facility painting"
            }
          }
        ]
      },
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg",
      "url": "https://jhpaintingservices.com/services/commercial-painting"
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
          "name": "Commercial Painting",
          "item": "https://jhpaintingservices.com/services/commercial-painting"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you paint during business hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer flexible scheduling including evenings and weekends to minimize disruption to your business operations. Many commercial projects are completed outside regular business hours to ensure your operations continue smoothly."
          }
        },
        {
          "@type": "Question",
          "name": "How much does commercial painting cost in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Commercial painting costs vary based on square footage, surface condition, paint type, and project complexity. Most commercial projects range from $1.50-$4 per square foot. Contact JH Painting for a free, detailed estimate for your business."
          }
        },
        {
          "@type": "Question",
          "name": "Are you licensed and insured for commercial work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, JH Painting Services is fully licensed and insured for commercial projects in Massachusetts. We carry comprehensive liability insurance and workers compensation coverage for your protection."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a commercial painting project take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Project timelines depend on size and scope. A typical office suite takes 2-4 days, while larger facilities may take 1-3 weeks. We provide detailed timelines and work efficiently to minimize business disruption."
          }
        }
      ]
    }
  ]
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Commercial office painting', category: 'Office' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Retail store painting', category: 'Retail' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Restaurant painting', category: 'Restaurant' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Warehouse painting', category: 'Industrial' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'Commercial exterior', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Professional commercial work', category: 'Commercial' },
]

const videos = [
  { id: 'F_lreXzNlUI', title: 'Commercial Painting Project' },
  { id: 'LkT_HLyKibY', title: 'Business Transformation' },
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

export default function CommercialPaintingPage() {
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
        id="commercial-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(commercialPaintingSchema)
        }}
      />

      {/* Luxury Hero Section */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png"
            alt="Professional Commercial Painting Services Massachusetts"
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
                  Commercial Painting
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
                Expert painting solutions for Massachusetts businesses. Minimal disruption, maximum quality. From offices to retail spaces, we deliver professional results on your schedule.
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
                  { icon: Shield, text: 'Fully Insured' },
                  { icon: Clock, text: 'Flexible Scheduling' },
                  { icon: Award, text: 'Minimal Disruption' }
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
                  Fast response • No obligation • Commercial painting experts
                </p>
              </div>
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/t2TbHgsNLXqLPQdo8ryx"
                style={{ width: '100%', height: '400px', border: 'none', borderRadius: '12px' }}
                scrolling="no"
                title="Commercial Painting Quote Form"
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
              { number: '200+', label: 'Businesses Served' },
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
              Is Your Business Looking Unprofessional?
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748B', maxWidth: '700px', margin: '0 auto' }}>
              First impressions matter. Your business deserves to look as professional as your services.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              {
                icon: Clock,
                title: 'Worried About Downtime?',
                desc: "You cannot afford to close for days while painters work. We schedule around your business hours—evenings, weekends, whatever works. Your operations continue uninterrupted.",
                solution: 'Flexible scheduling to minimize disruption'
              },
              {
                icon: TrendingUp,
                title: 'Need It Done Fast?',
                desc: "Commercial projects have tight timelines. We bring the crew size and efficiency needed to complete your project on schedule, without sacrificing quality.",
                solution: 'Professional teams for fast, quality results'
              },
              {
                icon: Briefcase,
                title: 'Concerned About Professionalism?',
                desc: "Your clients and employees will see our team. We arrive on time, work professionally, maintain a clean site, and communicate clearly throughout the project.",
                solution: 'Fully insured, professional commercial painters'
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

      {/* Industries Section */}
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
              Industries We Serve
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '1rem' }}>
              Commercial Painting for Every Business
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
              From small offices to large facilities, we have the experience to handle any commercial project
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              'Office Buildings',
              'Retail Stores',
              'Restaurants & Bars',
              'Hotels & Motels',
              'Medical Facilities',
              'Schools & Universities',
              'Warehouses',
              'Manufacturing',
              'Apartment Complexes',
              'Shopping Centers',
              'Gyms & Fitness Centers',
              'Banks & Financial'
            ].map((industry, idx) => (
              <div key={idx} style={{
                padding: '1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center'
              }}>
                <Building2 size={28} style={{ color: '#C62828', marginBottom: '0.75rem' }} />
                <span style={{ color: '#fff', fontSize: '0.9375rem', fontWeight: '500', display: 'block' }}>{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              Our Services
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem' }}>
              Complete Commercial Painting Solutions
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              'Office building painting (interior & exterior)',
              'Retail store and shopping center painting',
              'Restaurant and hospitality painting',
              'Industrial facility and warehouse painting',
              'Medical office and healthcare facility painting',
              'School and educational facility painting',
              'Apartment complex and multi-unit painting',
              'Parking garage and structure painting',
              'Storefront and facade painting',
              'Commercial ceiling and wall painting',
              'Epoxy floor coating',
              'Line striping and marking'
            ].map((service, idx) => (
              <div key={idx} style={{
                padding: '1.5rem',
                background: '#F8FAFC',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <CheckCircle2 size={24} style={{ color: '#C62828', flexShrink: 0 }} />
                <span style={{ color: '#0F172A', fontSize: '1rem', fontWeight: '500' }}>{service}</span>
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
              Commercial Painting Gallery
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              Professional commercial transformations across Massachusetts
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
              See Our Commercial Transformations
            </h2>
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
                  justifyContent: 'center'
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
                  left: '1.5rem'
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
                <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>200+</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Businesses Served</div>
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
                Your Commercial Painting Partner
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Commercial painting is different from residential work. Your business cannot shut down for days. Your customers and employees will see our crew. You need results that last and look professional.
              </p>
              <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.8', marginBottom: '2rem' }}>
                That is why we specialize in commercial projects. We arrive when you need us—early morning, late evening, weekends. We work efficiently with larger crews to meet tight deadlines. We use commercial-grade paints designed for high-traffic areas.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {[
                  { icon: Users, text: 'Professional Crews' },
                  { icon: Heart, text: 'Client-First Approach' },
                  { icon: Shield, text: 'Fully Licensed & Insured' },
                  { icon: Sparkles, text: 'Commercial-Grade Paints' }
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
              Ready to Enhance Your Business?
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem' }}>
              Get a free commercial painting estimate today. Professional results, minimal disruption.
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
              Commercial Painting Service Areas
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B' }}>
              Serving businesses in 114 cities across Massachusetts
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
                href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}/commercial-painting`}
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
                Professional commercial painting services across Massachusetts. Minimal disruption, premium results, and exceptional customer service.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://www.facebook.com/jhpaintingservicesma" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/jhpaintingservices" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <Instagram size={20} />
                </a>
                <a href="https://www.linkedin.com/company/jh-painting-services" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
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
                    <Link href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
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
                    <Link href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
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
