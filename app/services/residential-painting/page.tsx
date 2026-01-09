'use client'

import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, Facebook, Instagram, Linkedin, Home, Paintbrush, Sun, Droplets, Palette, Layers, Menu, X, ChevronDown, Home as HomeIcon, Building2, PaintBucket, DollarSign } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: HomeIcon, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
]

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

// All 114 Massachusetts cities
const allCities = [
  'Hudson', 'Southborough', 'Berlin', 'Northborough', 'Cordaville', 'Stow', 'Westborough',
  'Framingham Center', 'Bolton', 'Sudbury', 'Ashland', 'Maynard', 'Framingham', 'Hopkinton',
  'Marlborough', 'Acton', 'Holliston', 'Littleton', 'Milford', 'Medfield', 'Fayville',
  'Wayland', 'Natick', 'Weston', 'Groton', 'Wellesley Hills', 'Norfolk', 'Carlisle',
  'Lincoln', 'Concord', 'Medway', 'Woodville', 'Mendon', 'Ayer', 'Hopedale', 'Sherborn',
  'Lexington', 'Harvard', 'Westford', 'Wellesley', 'Newton', 'Needham', 'Upton', 'Bellingham',
  'Bedford', 'Chelmsford', 'Newton Center', 'Franklin', 'Waltham', 'Dover', 'Millis',
  'Burlington', 'Uxbridge', 'Shirley', 'Newton Highlands', 'Newtonville', 'Devens', 'Blackstone',
  'Watertown', 'West Newton', 'Lowell', 'Brookline', 'Woburn', 'Waban', 'Dedham', 'Billerica',
  'Auburndale', 'Chestnut Hill', 'Tewksbury', 'Nonantum', 'Northbridge', 'Medford', 'Wrentham',
  'North Billerica', 'Norwood', 'Brighton', 'Somerville', 'Wilmington', 'Douglas', 'Winchester',
  'Canton', 'Cambridge', 'Allston', 'Stoneham', 'Sutton', 'Grafton', 'Arlington', 'Belmont',
  'Tyngsboro', 'Reading', 'Wakefield', 'Millville', 'Malden', 'Dracut', 'Melrose', 'North Reading',
  'Charlestown', 'Stoughton', 'Everett', 'North Grafton', 'Randolph', 'Sharon', 'Quincy', 'Milton',
  'Millbury', 'Westwood', 'Foxboro', 'Braintree', 'Weymouth', 'Mansfield', 'Worcester',
  'North Attleboro', 'Plainville', 'Wrentham', 'Boston'
]

export default function ResidentialPaintingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const playVideo = (videoId: string) => {
    setActiveVideo(videoId)
    setIsVideoPlaying(true)
  }

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
        id="residential-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(residentialPaintingSchema)
        }}
      />

      {/* Hero Section with Background Image */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}>
          <Image
            src="/images/residential-painting-hero.jpg"
            alt="Professional residential painting services in Massachusetts"
            fill
            style={{ objectFit: 'cover' }}
            priority
            quality={90}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.70) 50%, rgba(0, 0, 0, 0.60) 100%)'
          }}></div>
        </div>

        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(198, 40, 40, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(198, 40, 40, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(198, 40, 40, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(198, 40, 40, 0.3)',
                padding: '0.5rem 1rem',
                borderRadius: '100px',
                marginBottom: '1.5rem',
                color: '#fff'
              }}>
                <Home size={16} style={{ color: '#f87171' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Trusted Home Painting Experts</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '800',
                color: '#fff',
                lineHeight: '1.1',
                marginBottom: '1.5rem'
              }}>
                Professional <span style={{
                  background: 'linear-gradient(135deg, #f87171 0%, #C62828 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Residential Painting</span> Services
              </h1>

              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: '1.8',
                marginBottom: '2rem',
                maxWidth: '540px'
              }}>
                Transform your Massachusetts home with expert residential painting. From single rooms to complete home makeovers, we deliver stunning results that exceed expectations.
              </p>

              {/* Rating Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>5.0 Rating</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>•</span>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>1000+ Happy Homeowners</span>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <a href="tel:+15086908886" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #C62828 0%, #d32f2f 100%)',
                  color: '#fff',
                  padding: '1rem 2rem',
                  borderRadius: '100px',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  boxShadow: '0 20px 40px rgba(198, 40, 40, 0.4)',
                  transition: 'all 0.3s ease'
                }}>
                  <Phone size={20} />
                  (508) 690-8886
                </a>
                <Link href="/#contact" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: '#fff',
                  padding: '1rem 2rem',
                  borderRadius: '100px',
                  fontWeight: '600',
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>
                  Get Free Estimate
                  <ChevronRight size={18} />
                </Link>
              </div>

              {/* Trust Badges */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                {[
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Award, text: 'Expert Craftsmen' },
                  { icon: Clock, text: 'On-Time Service' }
                ].map((badge, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    <badge.icon size={18} style={{ color: '#f87171' }} />
                    <span style={{ fontSize: '0.9375rem' }}>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Quote Form */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: '#0F172A',
                  marginBottom: '0.5rem'
                }}>
                  Get Your Free Quote
                </h2>
                <p style={{ color: '#64748b', fontSize: '1rem' }}>
                  Fast response within 24 hours
                </p>
              </div>

              <iframe
                src="https://api.leadconnectorhq.com/widget/form/sHtpugX84PdhrVDEcQrj"
                style={{
                  width: '100%',
                  height: '400px',
                  border: 'none',
                  borderRadius: '12px'
                }}
                title="Request a free residential painting quote"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Bar */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '3rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5
        }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { number: '1000+', label: 'Homes Painted' },
              { number: '15+', label: 'Years Experience' },
              { number: '100%', label: 'Satisfaction Rate' },
              { number: '114', label: 'Cities Served' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #fff 0%, #f87171 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section style={{
        background: '#fff',
        padding: '6rem 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(198, 40, 40, 0.1) 0%, rgba(198, 40, 40, 0.05) 100%)',
              color: '#C62828',
              padding: '0.5rem 1.5rem',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              WE UNDERSTAND YOUR CONCERNS
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '1rem'
            }}>
              Tired of Living with Outdated, Peeling Paint?
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: '1.8' }}>
              We understand the frustration. Your home should be your sanctuary, not a source of stress.
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
                icon: Paintbrush,
                title: 'Walls That Look Worn & Dated?',
                problem: 'Faded paint, scuff marks, and outdated colors can make your entire home feel old and uninviting. You deserve a fresh, modern look.',
                solution: 'We transform tired spaces into beautiful, welcoming rooms that make you proud to come home.'
              },
              {
                icon: Shield,
                title: 'Worried About Messy Contractors?',
                problem: 'Past experiences with sloppy painters who leave your home in chaos? We get it.',
                solution: 'We treat your home like our own—with careful prep, daily cleanup, and respect for your space.'
              },
              {
                icon: Clock,
                title: 'Afraid of Hidden Costs & Delays?',
                problem: 'Sick of contractors who quote one price then add fees, or promise quick work but drag on for weeks?',
                solution: 'We provide transparent pricing and reliable timelines—no surprises, no excuses.'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #fff 100%)',
                borderRadius: '20px',
                padding: '2.5rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #C62828, #d32f2f)'
                }}></div>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, rgba(198, 40, 40, 0.1) 0%, rgba(198, 40, 40, 0.05) 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <item.icon size={28} color="#C62828" />
                </div>
                <h3 style={{
                  fontSize: '1.375rem',
                  fontWeight: '700',
                  color: '#0F172A',
                  marginBottom: '1rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  lineHeight: '1.7',
                  marginBottom: '1rem'
                }}>
                  {item.problem}
                </p>
                <p style={{
                  color: '#C62828',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}>
                  <CheckCircle2 size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '6rem 0',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(198, 40, 40, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(198, 40, 40, 0.2)',
              color: '#f87171',
              padding: '0.5rem 1.5rem',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              COMPLETE HOME PAINTING SOLUTIONS
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#fff',
              marginBottom: '1rem'
            }}>
              Residential Painting Services
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8' }}>
              From single rooms to complete home transformations, we deliver stunning results with premium materials and expert craftsmanship.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              'Interior Room Painting',
              'Whole House Interior',
              'Exterior House Painting',
              'Kitchen Painting',
              'Bathroom Painting',
              'Living Room Painting',
              'Bedroom Painting',
              'Basement Painting',
              'Garage Painting',
              'Ceiling Painting',
              'Trim & Molding',
              'Door & Window Painting',
              'Deck & Fence Staining',
              'Cabinet Refinishing',
              'Wallpaper Removal',
              'Drywall Repair',
              'Color Consultation',
              'Accent Walls'
            ].map((service, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                transition: 'all 0.3s ease'
              }}>
                <CheckCircle2 size={22} color="#4ade80" />
                <span style={{ color: '#fff', fontSize: '1.0625rem', fontWeight: '500' }}>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{
        background: '#fff',
        padding: '6rem 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(198, 40, 40, 0.1) 0%, rgba(198, 40, 40, 0.05) 100%)',
              color: '#C62828',
              padding: '0.5rem 1.5rem',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              OUR PROVEN PROCESS
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '1rem'
            }}>
              6 Steps to Your Dream Home
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: '1.8' }}>
              We follow a systematic approach to ensure flawless results every time.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { step: '01', title: 'Free Consultation', desc: 'In-home assessment, detailed estimate, and personalized recommendations' },
              { step: '02', title: 'Color Selection', desc: 'Expert color consultation with samples to find your perfect palette' },
              { step: '03', title: 'Preparation', desc: 'Complete furniture protection, repairs, and meticulous surface prep' },
              { step: '04', title: 'Professional Painting', desc: 'Expert application with premium paints and attention to detail' },
              { step: '05', title: 'Quality Inspection', desc: 'Thorough inspection ensuring every detail meets our high standards' },
              { step: '06', title: 'Final Walkthrough', desc: 'Complete cleanup and walkthrough to ensure your satisfaction' }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #fff 100%)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  fontSize: '3rem',
                  fontWeight: '800',
                  color: 'rgba(198, 40, 40, 0.1)'
                }}>
                  {item.step}
                </div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #C62828 0%, #d32f2f 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  {item.step}
                </div>
                <h3 style={{
                  fontSize: '1.375rem',
                  fontWeight: '700',
                  color: '#0F172A',
                  marginBottom: '0.75rem'
                }}>
                  {item.title}
                </h3>
                <p style={{ color: '#64748b', lineHeight: '1.7', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        padding: '6rem 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(198, 40, 40, 0.1) 0%, rgba(198, 40, 40, 0.05) 100%)',
              color: '#C62828',
              padding: '0.5rem 1.5rem',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              OUR PORTFOLIO
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '1rem'
            }}>
              Recent Home Transformations
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: '1.8' }}>
              See the stunning transformations we have created for Massachusetts homeowners
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
              { src: '/images/residential-1.jpg', title: 'Modern Living Room', location: 'Waltham, MA' },
              { src: '/images/residential-2.jpg', title: 'Elegant Kitchen', location: 'Newton, MA' },
              { src: '/images/residential-3.jpg', title: 'Master Bedroom', location: 'Brookline, MA' },
              { src: '/images/residential-4.jpg', title: 'Cozy Family Room', location: 'Wellesley, MA' },
              { src: '/images/residential-5.jpg', title: 'Fresh Dining Room', location: 'Needham, MA' },
              { src: '/images/residential-6.jpg', title: 'Bright Bathroom', location: 'Cambridge, MA' }
            ].map((project, idx) => (
              <div key={idx} style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                background: '#fff'
              }}>
                <div style={{
                  position: 'relative',
                  height: '280px',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    right: '1.5rem'
                  }}>
                    <h3 style={{
                      color: '#fff',
                      fontSize: '1.375rem',
                      fontWeight: '700',
                      marginBottom: '0.25rem'
                    }}>
                      {project.title}
                    </h3>
                    <p style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.9375rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <MapPin size={14} />
                      {project.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section style={{
        background: '#fff',
        padding: '6rem 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(198, 40, 40, 0.1) 0%, rgba(198, 40, 40, 0.05) 100%)',
              color: '#C62828',
              padding: '0.5rem 1.5rem',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              SEE US IN ACTION
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '1rem'
            }}>
              Watch Our Work
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: '1.8' }}>
              See the quality and care we bring to every residential painting project
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { id: 'jLHB4QqL3xU', title: 'Home Painting Process' },
              { id: 'jLHB4QqL3xU', title: 'Customer Testimonials' }
            ].map((video, idx) => (
              <div key={idx} style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}>
                {activeVideo === video.id ? (
                  <iframe
                    width="100%"
                    height="280"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: 'block' }}
                  />
                ) : (
                  <div
                    onClick={() => playVideo(video.id)}
                    style={{
                      position: 'relative',
                      height: '280px',
                      cursor: 'pointer',
                      background: `url(https://img.youtube.com/vi/${video.id}/maxresdefault.jpg) center/cover`
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #C62828 0%, #d32f2f 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 30px rgba(198, 40, 40, 0.5)'
                      }}>
                        <Play size={36} color="#fff" fill="#fff" />
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '1.5rem',
                      left: '1.5rem',
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: '1.125rem'
                    }}>
                      {video.title}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        padding: '6rem 0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            gap: '4rem',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div>
              <span style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, rgba(198, 40, 40, 0.1) 0%, rgba(198, 40, 40, 0.05) 100%)',
                color: '#C62828',
                padding: '0.5rem 1.5rem',
                borderRadius: '100px',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                ABOUT JH PAINTING
              </span>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: '800',
                color: '#0F172A',
                marginBottom: '1.5rem',
                lineHeight: '1.2'
              }}>
                Your Trusted Home Painting Partner
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#64748b',
                lineHeight: '1.8',
                marginBottom: '1.5rem'
              }}>
                At JH Painting, we understand that inviting contractors into your home is a big decision. That is why we have built our reputation on trust, quality, and respect for your space.
              </p>
              <p style={{
                fontSize: '1.125rem',
                color: '#64748b',
                lineHeight: '1.8',
                marginBottom: '2rem'
              }}>
                When you choose us for your residential painting project, you are partnering with professionals who genuinely care about transforming your space while treating your home like our own.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem'
              }}>
                {[
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Award, text: '15+ Years Experience' },
                  { icon: Users, text: '1000+ Happy Clients' },
                  { icon: Heart, text: 'Family Owned' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, rgba(198, 40, 40, 0.1) 0%, rgba(198, 40, 40, 0.05) 100%)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <item.icon size={20} color="#C62828" />
                    </div>
                    <span style={{ fontWeight: '600', color: '#0F172A' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              position: 'relative'
            }}>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
              }}>
                <Image
                  src="/images/jh-owner.png"
                  alt="JH Painting Owner - Professional residential painting contractor"
                  width={500}
                  height={600}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                background: 'linear-gradient(135deg, #C62828 0%, #d32f2f 100%)',
                color: '#fff',
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                boxShadow: '0 15px 30px rgba(198, 40, 40, 0.4)'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '800' }}>15+</div>
                <div style={{ fontSize: '0.9375rem', opacity: 0.9 }}>Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #C62828 0%, #d32f2f 50%, #b71c1c 100%)',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            color: '#fff',
            marginBottom: '1.5rem'
          }}>
            Ready to Transform Your Home?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            Get a free estimate and color consultation. Experience the JH Painting difference.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+15086908886" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: '#fff',
              color: '#C62828',
              padding: '1.25rem 2.5rem',
              borderRadius: '100px',
              fontWeight: '700',
              fontSize: '1.125rem',
              textDecoration: 'none',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
            }}>
              <Phone size={22} />
              Call (508) 690-8886
            </a>
            <Link href="/#contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.5)',
              color: '#fff',
              padding: '1.25rem 2.5rem',
              borderRadius: '100px',
              fontWeight: '600',
              fontSize: '1.125rem',
              textDecoration: 'none'
            }}>
              Get Free Quote
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '6rem 0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(198, 40, 40, 0.2)',
              color: '#f87171',
              padding: '0.5rem 1.5rem',
              borderRadius: '100px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              SERVICE AREAS
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#fff',
              marginBottom: '1rem'
            }}>
              Serving Homeowners Across Massachusetts
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8' }}>
              Professional residential painting services available throughout 114 cities
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {allCities.map((city, idx) => (
              <Link
                key={idx}
                href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  padding: '0.5rem 1rem',
                  borderRadius: '100px',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#0a0f1a',
        padding: '5rem 0 2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}>
            {/* Company Info */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #C62828 0%, #d32f2f 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={28} color="#fff" />
                </div>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#fff'
                }}>JH Painting</span>
              </div>
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                lineHeight: '1.8',
                marginBottom: '1.5rem'
              }}>
                Professional residential painting services for Massachusetts homeowners. Transform your home with expert craftsmanship and premium finishes.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit JH Painting on Facebook" style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none'
                }}>
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit JH Painting on Instagram" style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none'
                }}>
                  <Instagram size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit JH Painting on LinkedIn" style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none'
                }}>
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{
                color: '#fff',
                fontSize: '1.125rem',
                fontWeight: '700',
                marginBottom: '1.5rem'
              }}>
                Our Services
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { name: 'Interior Painting', href: '/services/interior-painting' },
                  { name: 'Exterior Painting', href: '/services/exterior-painting' },
                  { name: 'Cabinet Painting', href: '/services/cabinet-painting' },
                  { name: 'Commercial Painting', href: '/services/commercial-painting' },
                  { name: 'Residential Painting', href: '/services/residential-painting' }
                ].map((link, idx) => (
                  <li key={idx} style={{ marginBottom: '0.75rem' }}>
                    <Link href={link.href} style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'color 0.3s ease'
                    }}>
                      <ChevronRight size={16} />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 style={{
                color: '#fff',
                fontSize: '1.125rem',
                fontWeight: '700',
                marginBottom: '1.5rem'
              }}>
                Contact Us
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="tel:+15086908886" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(198, 40, 40, 0.2)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Phone size={18} color="#f87171" />
                  </div>
                  (508) 690-8886
                </a>
                <a href="mailto:jhonatan@jhpainting.com" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(198, 40, 40, 0.2)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={18} color="#f87171" />
                  </div>
                  jhonatan@jhpainting.com
                </a>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(198, 40, 40, 0.2)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={18} color="#f87171" />
                  </div>
                  <span>Serving All of Massachusetts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas in Footer */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '3rem',
            marginBottom: '3rem'
          }}>
            <h3 style={{
              color: '#fff',
              fontSize: '1.125rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Service Areas - 114 Massachusetts Cities
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center'
            }}>
              {allCities.map((city, idx) => (
                <Link
                  key={idx}
                  href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.8125rem',
                    textDecoration: 'none',
                    padding: '0.25rem 0.5rem'
                  }}
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.875rem',
              margin: 0
            }}>
              © 2024 JH Painting. All rights reserved. Licensed & Insured.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
