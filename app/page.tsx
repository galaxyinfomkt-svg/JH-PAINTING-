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
  Check,
  Star,
  Shield,
  Clock,
  DollarSign,
  ChevronRight,
  ChevronDown,
  Play,
  Home as HomeIcon,
  Paintbrush,
  Palette,
  HardHat,
  Building2,
  PaintBucket,
  Award
} from 'lucide-react'
import { cities } from './data/cities'
import LazyIframe from './components/LazyIframe'

// Data
const services = [
  {
    title: 'Exterior Painting',
    description: 'Professional exterior house painting with complete prep work and two coats of premium paint.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    href: '/services/exterior-painting',
    featured: true,
  },
  {
    title: 'Interior Painting',
    description: 'Transform your home\'s interior with premium low-VOC paints and meticulous attention to detail.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    href: '/services/interior-painting',
  },
  {
    title: 'Cabinet Refinishing',
    description: 'Upgrade your kitchen with professional cabinet refinishing. Save up to 70% vs replacement.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png',
    href: '/services/cabinet-painting',
  },
  {
    title: 'Floor Refinishing',
    description: 'Restore hardwood floors with expert sanding, staining, and sealing services.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg',
    href: '/services/residential-painting',
  },
]

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Professional exterior house painting services in Massachusetts by JH Painting', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'Expert house painters in Waltham MA - exterior painting project', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Professional interior painting contractors in Massachusetts', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Bedroom interior painting services in Massachusetts by JH Painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Kitchen cabinet refinishing and painting services in MA', category: 'Cabinets' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Hardwood floor refinishing services in Massachusetts by JH Painting', category: 'Floors' },
]

const videos = [
  { id: 'F_lreXzNlUI', title: 'Exterior Painting in Massachusetts', type: 'YouTube Short' },
  { id: 'LkT_HLyKibY', title: 'Interior Painting in Massachusetts', type: 'YouTube Short' },
]

// Menu data
const menuServices = [
  {
    name: 'Interior Painting',
    href: '/services/interior-painting',
    icon: Paintbrush,
    description: 'Transform your interior spaces'
  },
  {
    name: 'Exterior Painting',
    href: '/services/exterior-painting',
    icon: HomeIcon,
    description: 'Protect and beautify your exterior'
  },
  {
    name: 'Commercial Painting',
    href: '/services/commercial-painting',
    icon: Building2,
    description: 'Professional business painting'
  },
  {
    name: 'Residential Painting',
    href: '/services/residential-painting',
    icon: PaintBucket,
    description: 'Complete home painting solutions'
  },
  {
    name: 'Cabinet Painting',
    href: '/services/cabinet-painting',
    icon: Palette,
    description: 'Upgrade your kitchen cabinets'
  },
]

export default function HomePage() {
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
            <a href="/" className="logo">
              <Image
                src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png"
                alt="JH Painting Services Logo"
                width={160}
                height={64}
                priority
              />
            </a>

            <nav className="nav">
              <a href="#home">Home</a>
              <a href="#about">About</a>

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
                        <a key={index} href={service.href} className="nav-dropdown-item">
                          <div className="nav-dropdown-item-icon">
                            <Icon size={20} />
                          </div>
                          <div className="nav-dropdown-item-content">
                            <span className="nav-dropdown-item-title">{service.name}</span>
                            <span className="nav-dropdown-item-desc">{service.description}</span>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                  <a href="/services" className="nav-dropdown-footer">
                    View All Services
                    <ChevronRight size={16} />
                  </a>
                </div>
              </div>

              <a href="#gallery">Gallery</a>
              <Link href="/blog">Blog</Link>
              <a href="#reviews">Reviews</a>
              <a href="#contact">Contact</a>
            </nav>

            <a href="tel:+15086908886" className="header-cta">
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
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>

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
                    <a key={index} href={service.href} onClick={closeMenu} className="mobile-nav-dropdown-item">
                      <div className="mobile-nav-dropdown-item-icon">
                        <Icon size={18} />
                      </div>
                      <div className="mobile-nav-dropdown-item-content">
                        <span className="mobile-nav-dropdown-item-title">{service.name}</span>
                        <span className="mobile-nav-dropdown-item-desc">{service.description}</span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            <a href="#gallery" onClick={closeMenu}>Gallery</a>
            <Link href="/blog" onClick={closeMenu}>Blog</Link>
            <a href="#reviews" onClick={closeMenu}>Reviews</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
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
        <section id="home" className="hero">
          <div className="hero-bg">
            <Image
              src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
              alt="Professional Painting Services Massachusetts"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
              fetchPriority="high"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6NT04Mj4uQkJCLkpKTk5OWlpVVV5eXl5eXl7/2wBDARUXFx4aHh4lISElXkI2Ql5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl7/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAHxAAAgICAgMBAAAAAAAAAAAAAQIAAwQREiExQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ANmNkY9lJx8ipLKm5KyuAQNb8H2JTU"
            />
          </div>
          <div className="hero-overlay" />

          <div className="hero-content container">
            <div className="hero-grid">
              <div className="hero-text">
                <div className="hero-top-badges">
                  <span className="hero-location-badge">
                    <MapPin size={16} />
                    Serving 75+ MA Cities
                  </span>
                  <span className="hero-rating-badge">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <span className="hero-rating-text">5.0 (40 Google reviews)</span>
                  </span>
                </div>

                <h1 className="hero-title">
                  <span className="hero-title-number">#1</span> <span className="hero-title-highlight">Painting</span><br />
                  <span className="hero-title-highlight">Contractor</span> <span className="hero-title-in">in</span><br />
                  <span className="hero-title-state">Massachusetts</span>
                </h1>

                <p className="hero-subtitle hero-cities">
                  Marlborough, Boston, Cambridge,<br />
                  Worcester & Beyond
                </p>

                <p className="hero-description">
                  Professional interior and exterior painting services for homes and businesses across Massachusetts.
                  Licensed, insured, and trusted by 200+ families. Premium paints, expert craftsmanship, and
                  100% satisfaction guaranteed. Get your free estimate today.
                </p>

                <div className="hero-buttons">
                  <a href="tel:+15086908886" className="btn btn-primary btn-lg">
                    <Phone size={20} />
                    Call (508) 690-8886
                  </a>
                  <a href="#contact" className="btn btn-outline btn-lg" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                    Get Free Estimate
                  </a>
                </div>

                <div className="hero-trust-badges">
                  <span className="hero-trust-badge">
                    <Shield size={16} />
                    Licensed & Insured
                  </span>
                  <span className="hero-trust-badge">
                    <Clock size={16} />
                    Same Day Response
                  </span>
                  <span className="hero-trust-badge">
                    <DollarSign size={16} />
                    Free Estimates
                  </span>
                </div>
              </div>

              <div className="hero-form-card">
                <div className="hero-form-header">
                  <h2 className="hero-form-title">Get Your Free Quote</h2>
                  <p className="hero-form-subtitle">Fill out the form and we'll get back to you within 24 hours.</p>
                </div>
                <iframe
                  className="hero-form-iframe"
                  src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                  title="Contact Form"
                  loading="lazy"
                />
                <div className="hero-google-badge">
                  <span>⭐</span>
                  <span>Google Reviews</span>
                  <strong>5★</strong>
                  <span style={{ color: 'var(--jh-text-light)' }}>See Our Reviews</span>
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
              <a href="#reviews">
                See Our Reviews
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="section">
          <div className="container">
            <div className="services-section-header">
              <h2>Our <span>Services</span></h2>
              <p>From expert <strong>painting and finishing work</strong> to complete home exteriors, we deliver quality craftsmanship on every project.</p>
              <div className="underline"></div>
            </div>

            <div className="services-grid">
              {services.map((service, index) => (
                <Link href={service.href} key={index} className="service-card">
                  {service.featured && <span className="service-card-featured">Featured Service</span>}
                  <div className="service-card-image">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={400}
                      loading="lazy"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className="service-card-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span className="service-link">
                      Learn More <ChevronRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Dark RS Style */}
        <section id="about" className="section about-section-dark">
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <div className="about-underline"></div>
                <h2>About <span>JH Painting Services</span></h2>
                <p>
                  Founded by <strong>Jafet</strong>, JH Painting Services is a premier painting contractor based in Marlborough, Massachusetts. With years of hands-on experience in the painting industry, Jafet and his team have built a reputation on delivering exceptional craftsmanship, honest pricing, and reliable service to homeowners across the state.
                </p>
                <p>
                  Under Jafet&apos;s leadership, our team specializes in <strong>exterior and interior painting</strong> - the foundation of every beautiful home. From complete home transformations to single room refreshes, we ensure that every project is completed with attention to detail and using quality materials.
                </p>
                <p>
                  Beyond painting, we offer comprehensive home improvement services including cabinet refinishing, floor restoration, and deck staining. Whether you&apos;re updating your home&apos;s curb appeal, refreshing a single room, or planning a full renovation, we have the skills and experience to deliver outstanding results.
                </p>
              </div>

              <div className="about-image-wrapper">
                <div className="about-image">
                  <Image
                    src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                    alt="Jafet - Owner of JH Painting Services Massachusetts"
                    width={600}
                    height={600}
                    loading="lazy"
                    style={{ objectFit: 'contain', borderRadius: '16px', width: '100%', height: 'auto' }}
                  />
                </div>
                <div className="trusted-contractor-badge">
                  <div className="trusted-contractor-badge-icon">
                    <Award size={20} />
                  </div>
                  <div className="trusted-contractor-badge-content">
                    <span className="trusted-contractor-badge-title">Trusted Contractor</span>
                    <span className="trusted-contractor-badge-subtitle">Massachusetts Licensed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - RS Style */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Our Process</h2>
              <p>From initial consultation to project completion, we make the painting process simple and stress-free.</p>
            </div>

            <div className="process-grid-home">
              {[
                { num: '01', icon: Phone, title: 'Free Consultation', desc: 'Call us or fill out our form. We\'ll discuss your project needs and schedule a site visit at your convenience.' },
                { num: '02', icon: DollarSign, title: 'Detailed Estimate', desc: 'We provide a comprehensive written estimate with transparent pricing. No hidden fees, no surprises.' },
                { num: '03', icon: HardHat, title: 'Expert Painting', desc: 'Our skilled team executes your project with precision, keeping you informed every step of the way.' },
                { num: '04', icon: Check, title: 'Final Walkthrough', desc: 'We walk through the completed project together, ensuring everything meets your expectations.' },
              ].map((step, index) => (
                <div key={index} className="process-card-home">
                  <div className="process-card-home-num">{step.num}</div>
                  <div className="process-card-home-icon">
                    <step.icon size={24} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exterior Painting Detail - RS Style */}
        <section id="exterior-painting" className="section detail-section detail-section-rs">
          <div className="container">
            <div className="detail-grid">
              <div className="detail-image-wrapper">
                <span className="detail-badge">
                  <Star size={14} fill="currentColor" />
                  Our Specialty
                </span>
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
                  alt="Exterior Painting Massachusetts"
                  width={600}
                  height={450}
                  loading="lazy"
                  style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '16px' }}
                />
              </div>

              <div className="detail-content">
                <h2>
                  <Paintbrush size={28} />
                  Exterior House Painting
                </h2>
                <p>
                  Looking to boost your home&apos;s curb appeal? JH Painting Services delivers professional exterior house painting that transforms your property and protects it from New England&apos;s harsh weather conditions.
                </p>
                <p>
                  Our comprehensive process includes thorough surface preparation—power washing, scraping, sanding, caulking, and priming—followed by two coats of premium grade A paint. We specialize in:
                </p>

                <ul className="detail-list">
                  <li><Check size={18} /> Power Washing</li>
                  <li><Check size={18} /> Scraping & Sanding</li>
                  <li><Check size={18} /> Caulking Gaps</li>
                  <li><Check size={18} /> Premium Primer</li>
                  <li><Check size={18} /> Two Coats of Paint</li>
                  <li><Check size={18} /> Trim & Shutters</li>
                </ul>

                <a href="#contact" className="btn btn-primary">
                  Learn More About Exterior Painting
                  <ChevronRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Interior Painting Detail */}
        <section id="interior-painting" className="section detail-section" style={{ background: 'var(--jh-gray-50)' }}>
          <div className="container">
            <div className="detail-grid" style={{ direction: 'rtl' }}>
              <div className="detail-content" style={{ direction: 'ltr' }}>
                <h3>Transform Your Space</h3>
                <h2>Interior Painting Services</h2>
                <p>
                  Ready to refresh your living space? We provide expert interior painting services throughout Massachusetts with premium low-VOC paints that are safe for your family.
                </p>
                <p>
                  Our meticulous process includes furniture protection, wall preparation, precision cutting-in, and smooth rolling techniques. We offer free color consultations.
                </p>

                <ul className="detail-list" style={{ direction: 'ltr' }}>
                  <li><Check size={18} /> Walls & Ceilings</li>
                  <li><Check size={18} /> Trim & Baseboards</li>
                  <li><Check size={18} /> Doors & Frames</li>
                  <li><Check size={18} /> Accent Walls</li>
                  <li><Check size={18} /> Drywall Repair</li>
                  <li><Check size={18} /> Color Consultation</li>
                </ul>

                <a href="#contact" className="btn btn-secondary">Get Free Estimate</a>
              </div>

              <div className="detail-image" style={{ direction: 'ltr' }}>
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png"
                  alt="Interior Painting Massachusetts"
                  width={600}
                  height={450}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Why Choose JH Painting Services</h2>
              <p>Massachusetts trusts us for expert painting services.</p>
            </div>

            <div className="why-grid">
              {[
                { icon: Shield, title: 'Licensed & Insured', desc: 'Fully licensed with comprehensive insurance' },
                { icon: Star, title: '5-Star Rated', desc: '40+ verified Google reviews' },
                { icon: Clock, title: 'On-Time Completion', desc: 'We deliver projects on schedule' },
                { icon: DollarSign, title: 'Free Estimates', desc: 'Transparent pricing, no obligation' },
              ].map((item, index) => (
                <div key={index} className="why-card">
                  <div className="why-icon">
                    <item.icon size={24} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section - RS Style Dark */}
        <section className="section video-section-rs">
          <div className="container">
            <div className="section-header">
              <h2>See Our Work in Action</h2>
              <p>Watch our expert team tackle painting projects across Massachusetts.</p>
            </div>

            <div className="video-grid-rs">
              {videos.map((video, index) => (
                <a
                  key={index}
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

        {/* Gallery Section */}
        <section id="gallery" className="section gallery-section">
          <div className="container">
            <div className="section-header">
              <h2>Our Work Gallery</h2>
              <p>Browse through our portfolio of completed projects across Massachusetts.</p>
            </div>

            <div className="gallery-grid">
              {galleryImages.map((img, index) => (
                <div key={index} className="gallery-item">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300}
                    loading="lazy"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                  <div className="gallery-item-overlay">
                    <span>{img.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="section reviews-section">
          <div className="container">
            <div className="section-header">
              <h2>What Our Customers Say</h2>
              <p>Trusted by homeowners across Massachusetts.</p>
            </div>

            <LazyIframe
              className="lc_reviews_widget reviews-widget"
              src="https://reputationhub.site/reputation/widgets/review_widget/0Def8kzJShLPuKrPk5Jw"
              frameBorder={0}
              scrolling="no"
              style={{ minWidth: '100%', width: '100%', border: 'none', minHeight: '400px' }}
              title="Customer Reviews"
            />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container">
            <div className="section-header">
              <h2>Get Your Free Estimate Today</h2>
              <p>Ready to start your project? Contact us for a free, no-obligation estimate.</p>
            </div>

            <div className="contact-grid">
              <div className="contact-form-card">
                <h3>Request Your Free Estimate</h3>
                <LazyIframe
                  className="contact-form-iframe"
                  src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                  title="Contact Form"
                  style={{ minHeight: '500px' }}
                />
              </div>

              <div className="contact-info">
                <div className="contact-info-card">
                  <h3>Contact Us Directly</h3>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <Phone size={20} />
                    </div>
                    <div className="contact-item-content">
                      <h4>Phone</h4>
                      <a href="tel:+15086908886">(508) 690-8886</a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <Mail size={20} />
                    </div>
                    <div className="contact-item-content">
                      <h4>Email</h4>
                      <a href="mailto:contact@jhpaintingservices.com">contact@jhpaintingservices.com</a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="contact-item-content">
                      <h4>Service Area</h4>
                      <p>Serving 114+ cities across Massachusetts</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <Clock size={20} />
                    </div>
                    <div className="contact-item-content">
                      <h4>Business Hours</h4>
                      <p>Mon-Sat: 7AM - 6PM</p>
                    </div>
                  </div>
                </div>

                <div className="map-container">
                  <LazyIframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1517205.5747339479!2d-71.68353554999999!3d42.0369155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60c735e8062f080f%3A0xecd39bea9de17cbf!2sJH%20Painting%20Services!5e0!3m2!1sen!2sbr!4v1768058870291!5m2!1sen!2sbr"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="JH Painting Services Location - Serving All of Massachusetts"
                    style={{ minHeight: '300px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Start Your Painting Project?</h2>
              <p>Expert painting services. Free estimates, no obligation.</p>
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
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#contact">Contact</a></li>
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

          {/* Service Areas - Cities */}
          <div className="footer-cities">
            <h4>Service Areas - {cities.length}+ Cities in Massachusetts</h4>
            <div className="footer-cities-grid">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="footer-city-link"
                >
                  {city.name}
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
