'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Star,
  Clock,
  Shield,
  ChevronDown,
  Home as HomeIcon,
  Paintbrush,
  Palette,
  Building2,
  PaintBucket,
  CheckCircle2,
  MessageSquare
} from 'lucide-react'
import LazyIframe from '../components/LazyIframe'

// Menu data
const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: HomeIcon, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
]

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact JH Painting Services",
    "description": "Contact JH Painting Services for free painting estimates in Massachusetts. Call (508) 690-8886 or fill out our online form.",
    "url": "https://jhpaintingservices.com/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "JH Painting Services",
      "telephone": "+1-508-690-8886",
      "email": "contact@jhpaintingservices.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Marlborough",
        "addressRegion": "MA",
        "postalCode": "01752",
        "addressCountry": "US"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "07:00",
          "closes": "18:00"
        }
      ]
    }
  }

  return (
    <>
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

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
              <div className="nav-dropdown" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
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
                </div>
              </div>
              <Link href="/#gallery">Gallery</Link>
              <Link href="/#reviews">Reviews</Link>
              <Link href="/contact" className="active">Contact</Link>
            </nav>

            <a href="tel:+15086908886" className="header-cta">
              <Phone size={18} />
              (508) 690-8886
            </a>

            <button className="menu-btn" onClick={toggleMenu}><Menu size={28} /></button>
          </div>
        </div>

        <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu} />
        <nav className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <Image src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png" alt="JH Painting" width={120} height={48} />
            <button className="mobile-menu-close" onClick={closeMenu}><X size={24} /></button>
          </div>
          <div className="mobile-nav">
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/#about" onClick={closeMenu}>About</Link>
            <Link href="/#gallery" onClick={closeMenu}>Gallery</Link>
            <Link href="/#reviews" onClick={closeMenu}>Reviews</Link>
            <Link href="/contact" onClick={closeMenu}>Contact</Link>
          </div>
          <a href="tel:+15086908886" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
            <Phone size={18} /> (508) 690-8886
          </a>
        </nav>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, var(--jh-navy) 0%, var(--jh-navy-dark) 100%)',
          padding: '140px 0 80px',
          position: 'relative'
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '800',
                color: '#fff',
                marginBottom: '1rem'
              }}>
                Contact JH Painting Services
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '2rem'
              }}>
                Get your free painting estimate today. We respond within 24 hours!
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="tel:+15086908886" className="btn btn-primary btn-lg">
                  <Phone size={20} /> Call (508) 690-8886
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info + Form Section */}
        <section style={{ padding: '5rem 0', background: '#fff' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: '3rem',
              alignItems: 'start'
            }}>
              {/* Contact Info */}
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--jh-dark)' }}>
                  Get In Touch
                </h2>
                <p style={{ color: 'var(--jh-text-light)', marginBottom: '2rem', lineHeight: '1.7' }}>
                  Ready to transform your home or business? Contact us today for a free, no-obligation estimate.
                  We proudly serve Marlborough and all of Massachusetts.
                </p>

                {/* Contact Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <a href="tel:+15086908886" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.5rem',
                    background: 'var(--jh-gray-50)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: 'var(--jh-dark)',
                    transition: 'all 0.3s ease',
                    border: '1px solid var(--jh-gray-200)'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'var(--jh-red)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}>
                      <Phone size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>Call Us</div>
                      <div style={{ color: 'var(--jh-red)', fontWeight: '700', fontSize: '1.25rem' }}>(508) 690-8886</div>
                    </div>
                  </a>

                  <a href="mailto:contact@jhpaintingservices.com" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.5rem',
                    background: 'var(--jh-gray-50)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: 'var(--jh-dark)',
                    transition: 'all 0.3s ease',
                    border: '1px solid var(--jh-gray-200)'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'var(--jh-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}>
                      <Mail size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>Email Us</div>
                      <div style={{ color: 'var(--jh-text-light)' }}>contact@jhpaintingservices.com</div>
                    </div>
                  </a>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.5rem',
                    background: 'var(--jh-gray-50)',
                    borderRadius: '12px',
                    border: '1px solid var(--jh-gray-200)'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'var(--jh-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>Location</div>
                      <div style={{ color: 'var(--jh-text-light)' }}>Marlborough, MA 01752</div>
                      <div style={{ color: 'var(--jh-text-light)', fontSize: '0.875rem' }}>Serving All Massachusetts</div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.5rem',
                    background: 'var(--jh-gray-50)',
                    borderRadius: '12px',
                    border: '1px solid var(--jh-gray-200)'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: '#FFB800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}>
                      <Clock size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>Business Hours</div>
                      <div style={{ color: 'var(--jh-text-light)' }}>Mon - Sat: 7:00 AM - 6:00 PM</div>
                      <div style={{ color: 'var(--jh-text-light)', fontSize: '0.875rem' }}>Sunday: Closed</div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, var(--jh-gray-50) 0%, #fff 100%)',
                  borderRadius: '12px',
                  border: '1px solid var(--jh-gray-200)'
                }}>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Shield size={20} color="var(--jh-green)" />
                      <span style={{ fontWeight: '500', fontSize: '0.9375rem' }}>Licensed & Insured</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Star size={20} color="#FFB800" fill="#FFB800" />
                      <span style={{ fontWeight: '500', fontSize: '0.9375rem' }}>5.0 Google Rating</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={20} color="var(--jh-green)" />
                      <span style={{ fontWeight: '500', fontSize: '0.9375rem' }}>Free Estimates</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                border: '1px solid var(--jh-gray-200)'
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
                    <MessageSquare size={16} />
                    Free Estimate
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--jh-dark)', marginBottom: '0.5rem' }}>
                    Request Your Free Quote
                  </h3>
                  <p style={{ color: 'var(--jh-text-light)', fontSize: '0.9375rem' }}>
                    We&apos;ll respond within 24 hours
                  </p>
                </div>

                <LazyIframe
                  src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                  style={{ width: '100%', height: '500px', border: 'none', borderRadius: '12px' }}
                  title="Contact Form - Request Free Painting Estimate"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section style={{ padding: '4rem 0', background: 'var(--jh-gray-50)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--jh-dark)', marginBottom: '0.75rem' }}>
                Proudly Serving All of Massachusetts
              </h2>
              <p style={{ color: 'var(--jh-text-light)' }}>
                Based in Marlborough, MA - we provide painting services throughout the state
              </p>
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {['Marlborough', 'Hudson', 'Framingham', 'Natick', 'Southborough', 'Westborough', 'Shrewsbury', 'Worcester', 'Boston', 'Cambridge', 'Newton', 'Waltham', 'Sudbury', 'Concord', 'Acton', 'Lexington'].map((city) => (
                <span key={city} style={{
                  padding: '0.5rem 1rem',
                  background: '#fff',
                  borderRadius: '100px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--jh-text)',
                  border: '1px solid var(--jh-gray-200)'
                }}>
                  {city}, MA
                </span>
              ))}
              <span style={{
                padding: '0.5rem 1rem',
                background: 'var(--jh-red)',
                borderRadius: '100px',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#fff'
              }}>
                + 100 More Cities
              </span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ background: 'var(--jh-red)', padding: '4rem 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>
              Ready to Get Started?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem' }}>
              Call now for a free estimate. Same day response guaranteed.
            </p>
            <a href="tel:+15086908886" className="btn btn-lg" style={{ background: '#fff', color: 'var(--jh-red)' }}>
              <Phone size={20} /> (508) 690-8886
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Image src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png" alt="JH Painting" width={150} height={60} />
              <p>Professional painting services in Marlborough and all of Massachusetts. Licensed, insured, and committed to excellence.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <Link href="/">Home</Link>
              <Link href="/#about">About Us</Link>
              <Link href="/#services">Services</Link>
              <Link href="/#gallery">Gallery</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p><Phone size={16} /> (508) 690-8886</p>
              <p><Mail size={16} /> contact@jhpaintingservices.com</p>
              <p><MapPin size={16} /> Marlborough, MA 01752</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} JH Painting Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
