'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Paintbrush,
  Home as HomeIcon,
  Building2,
  PaintBucket,
  Palette,
} from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

// Menu services data
const menuServices = [
  {
    name: 'Interior Painting',
    href: '/services/interior-painting',
    icon: Paintbrush,
    description: 'Transform your interior spaces',
  },
  {
    name: 'Exterior Painting',
    href: '/services/exterior-painting',
    icon: HomeIcon,
    description: 'Protect and beautify your exterior',
  },
  {
    name: 'Commercial Painting',
    href: '/services/commercial-painting',
    icon: Building2,
    description: 'Professional business painting',
  },
  {
    name: 'Residential Painting',
    href: '/services/residential-painting',
    icon: PaintBucket,
    description: 'Complete home painting solutions',
  },
  {
    name: 'Cabinet Painting',
    href: '/services/cabinet-painting',
    icon: Palette,
    description: 'Upgrade your kitchen cabinets',
  },
]

interface HeaderProps {
  variant?: 'default' | 'service'
}

export default function Header({ variant = 'default' }: HeaderProps) {
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

  // For service pages, use Link components; for homepage, use anchor links
  const isServicePage = variant === 'service'

  return (
    <>
      {/* Top Bar */}
      <div className={`top-bar ${scrolled ? 'hidden' : ''}`}>
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <span className="top-bar-item">
                <MapPin size={12} />
                {BUSINESS.address}
              </span>
              <a href={`mailto:${BUSINESS.email}`} className="top-bar-item">
                <Mail size={12} />
                {BUSINESS.email}
              </a>
            </div>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="top-bar-phone-btn">
              <Phone size={12} />
              {BUSINESS.phone}
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
                src={BUSINESS.logo}
                alt={`${BUSINESS.name} Logo`}
                width={160}
                height={64}
                priority
              />
            </Link>

            <nav className="nav">
              {isServicePage ? (
                <Link href="/">Home</Link>
              ) : (
                <a href="#home">Home</a>
              )}
              {isServicePage ? (
                <Link href="/#about">About</Link>
              ) : (
                <a href="#about">About</a>
              )}

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

              {isServicePage ? (
                <Link href="/#gallery">Gallery</Link>
              ) : (
                <a href="#gallery">Gallery</a>
              )}
              <Link href="/blog">Blog</Link>
              {isServicePage ? (
                <Link href="/#reviews">Reviews</Link>
              ) : (
                <a href="#reviews">Reviews</a>
              )}
              {isServicePage ? (
                <Link href="/#contact">Contact</Link>
              ) : (
                <a href="#contact">Contact</a>
              )}
            </nav>

            <a href={`tel:${BUSINESS.phoneRaw}`} className="header-cta">
              <Phone size={18} />
              {BUSINESS.phone}
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
              src={BUSINESS.logo}
              alt={BUSINESS.name}
              width={120}
              height={48}
            />
            <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <div className="mobile-nav">
            {isServicePage ? (
              <Link href="/" onClick={closeMenu}>Home</Link>
            ) : (
              <a href="#home" onClick={closeMenu}>Home</a>
            )}
            {isServicePage ? (
              <Link href="/#about" onClick={closeMenu}>About</Link>
            ) : (
              <a href="#about" onClick={closeMenu}>About</a>
            )}

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

            {isServicePage ? (
              <Link href="/#gallery" onClick={closeMenu}>Gallery</Link>
            ) : (
              <a href="#gallery" onClick={closeMenu}>Gallery</a>
            )}
            <Link href="/blog" onClick={closeMenu}>Blog</Link>
            {isServicePage ? (
              <Link href="/#reviews" onClick={closeMenu}>Reviews</Link>
            ) : (
              <a href="#reviews" onClick={closeMenu}>Reviews</a>
            )}
            {isServicePage ? (
              <Link href="/#contact" onClick={closeMenu}>Contact</Link>
            ) : (
              <a href="#contact" onClick={closeMenu}>Contact</a>
            )}
          </div>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
            <Phone size={18} />
            {BUSINESS.phone}
          </a>
        </nav>
      </header>
    </>
  )
}
