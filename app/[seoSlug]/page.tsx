'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import {
  Phone, Mail, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play,
  ChevronRight, Users, Heart, Sparkles, Home as HomeIcon, Building2, PaintBucket,
  Brush, Menu, X, ChevronDown, Paintbrush, Palette, DollarSign, AlertCircle, Wrench,
  Search, CheckSquare, ThumbsUp
} from 'lucide-react'
import { getCityBySlug, cities, City } from '@/app/data/cities'
import LazyIframe from '@/app/components/LazyIframe'
import { parseSeoUrl, getCityPageSlug, getCityServicePageSlug, serviceNameMap } from '@/lib/seo-urls'

// Menu data
const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: HomeIcon, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
]

interface Props {
  params: { seoSlug: string }
}

// Service data for city+service pages
const servicesData: Record<string, {
  name: string
  heroImage: string
  challenges: Array<{ title: string }>
  neighborhoods: string[]
  housingTypes: string[]
  offerings: string[]
}> = {
  'interior-painting': {
    name: 'Interior Painting',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    challenges: [
      { title: 'Outdated or dull wall colors' },
      { title: 'Visible wall damage, cracks, or holes' },
      { title: 'Inconsistent paint finishes between rooms' },
      { title: 'Trim and ceiling that need refresh' }
    ],
    neighborhoods: ['Downtown', 'Historic District', 'Residential Areas', 'New Developments'],
    housingTypes: ['Single-Family Homes', 'Condominiums', 'Townhouses', 'Apartments'],
    offerings: ['Wall Painting', 'Ceiling Painting', 'Trim & Baseboard Painting', 'Color Consultation', 'Accent Walls', 'Wallpaper Removal']
  },
  'exterior-painting': {
    name: 'Exterior Painting',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    challenges: [
      { title: 'Peeling or chipping paint' },
      { title: 'Faded colors from sun exposure' },
      { title: 'Wood rot or water damage' },
      { title: 'Outdated curb appeal' }
    ],
    neighborhoods: ['Downtown', 'Historic District', 'Suburban Areas', 'Lakefront Properties'],
    housingTypes: ['Colonial Homes', 'Cape Cod Style', 'Victorian Houses', 'Modern Homes'],
    offerings: ['Full Exterior Painting', 'Trim & Shutters', 'Deck & Fence Staining', 'Power Washing', 'Wood Repair', 'Caulking & Sealing']
  },
  'commercial-painting': {
    name: 'Commercial Painting',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg',
    challenges: [
      { title: 'Worn or outdated appearance' },
      { title: 'Brand color consistency issues' },
      { title: 'Minimizing business disruption' },
      { title: 'Meeting building codes' }
    ],
    neighborhoods: ['Business District', 'Industrial Park', 'Shopping Centers', 'Office Complexes'],
    housingTypes: ['Office Buildings', 'Retail Stores', 'Restaurants', 'Warehouses'],
    offerings: ['Interior Commercial Painting', 'Exterior Commercial Painting', 'Epoxy Flooring', 'After-Hours Service', 'Brand Color Matching', 'Maintenance Programs']
  },
  'residential-painting': {
    name: 'Residential Painting',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg',
    challenges: [
      { title: 'Complete home transformation needs' },
      { title: 'Coordinating interior and exterior' },
      { title: 'Working around family schedule' },
      { title: 'Protecting furnishings and floors' }
    ],
    neighborhoods: ['Established Neighborhoods', 'New Construction', 'Historic Areas', 'Waterfront'],
    housingTypes: ['Single-Family Homes', 'Multi-Family Units', 'Luxury Homes', 'Starter Homes'],
    offerings: ['Complete Interior Painting', 'Full Exterior Painting', 'Garage Painting', 'Basement Finishing', 'Room-by-Room Updates', 'Move-In Ready Painting']
  },
  'cabinet-painting': {
    name: 'Cabinet Painting',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png',
    challenges: [
      { title: 'Outdated cabinet colors' },
      { title: 'Worn or damaged finishes' },
      { title: 'Kitchen needs update on budget' },
      { title: 'Bathroom vanity refresh' }
    ],
    neighborhoods: ['Kitchen Districts', 'Home Improvement Areas', 'Renovation Zones', 'Upgrade Communities'],
    housingTypes: ['Traditional Kitchens', 'Modern Kitchens', 'Bathroom Vanities', 'Built-in Cabinets'],
    offerings: ['Kitchen Cabinet Refinishing', 'Bathroom Vanity Painting', 'Hardware Updates', 'Color Transformation', 'Specialty Finishes', 'Island Painting']
  }
}

const processSteps = [
  { num: 1, title: 'Free Consultation', desc: 'We assess your project needs and provide expert recommendations.', icon: Search },
  { num: 2, title: 'Detailed Quote', desc: 'Transparent pricing with no hidden fees or surprises.', icon: CheckSquare },
  { num: 3, title: 'Color Selection', desc: 'We help you choose the perfect colors for your space.', icon: Palette },
  { num: 4, title: 'Surface Prep', desc: 'Thorough cleaning, sanding, and priming for lasting results.', icon: Wrench },
  { num: 5, title: 'Expert Application', desc: 'Professional painting with attention to every detail.', icon: Paintbrush },
  { num: 6, title: 'Final Walkthrough', desc: 'We ensure your complete satisfaction before leaving.', icon: ThumbsUp },
]

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Professional exterior house painting services in Massachusetts by JH Painting', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'Expert house painters in Massachusetts - exterior painting contractors', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Professional interior painting contractors serving Massachusetts', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Bedroom interior painting services in MA by JH Painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Kitchen cabinet refinishing and painting services in Massachusetts', category: 'Cabinets' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Hardwood floor refinishing services in Massachusetts by JH Painting', category: 'Floors' },
]

const videos = [
  { id: 'F_lreXzNlUI', title: 'Exterior Painting in Massachusetts', type: 'YouTube Short' },
  { id: 'LkT_HLyKibY', title: 'Interior Painting in Massachusetts', type: 'YouTube Short' },
]

const servicesList = [
  { slug: 'interior-painting', name: 'Interior Painting', icon: Brush },
  { slug: 'exterior-painting', name: 'Exterior Painting', icon: HomeIcon },
  { slug: 'commercial-painting', name: 'Commercial Painting', icon: Building2 },
  { slug: 'residential-painting', name: 'Residential Painting', icon: HomeIcon },
  { slug: 'cabinet-painting', name: 'Cabinet Painting', icon: PaintBucket },
]

// Generate Schema for city page
function generateCitySchema(cityName: string, countyName: string, seoSlug: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `https://jhpaintingservices.com/${seoSlug}#localbusiness`,
        "name": `JH Painting Services - ${cityName}, MA Painters`,
        "alternateName": [`${cityName} MA Painters`, `${cityName} Painting Contractors`, `JH Painting ${cityName}`],
        "description": `Professional painting services in ${cityName}, Massachusetts. Expert interior & exterior painting, cabinet refinishing. Licensed & insured painters serving ${cityName} and ${countyName}.`,
        "url": `https://jhpaintingservices.com/${seoSlug}`,
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
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "47",
          "bestRating": "5",
          "worstRating": "1"
        },
        "areaServed": {
          "@type": "City",
          "name": cityName
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jhpaintingservices.com" },
          { "@type": "ListItem", "position": 2, "name": `${cityName}, MA Painters`, "item": `https://jhpaintingservices.com/${seoSlug}` }
        ]
      }
    ]
  }
}

// Generate Schema for city+service page
function generateCityServiceSchema(cityName: string, serviceName: string, seoSlug: string, countyName: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://jhpaintingservices.com/${seoSlug}#service`,
        "name": `${serviceName} in ${cityName}, MA`,
        "serviceType": serviceName,
        "description": `Professional ${serviceName.toLowerCase()} services in ${cityName}, ${countyName}, Massachusetts. Expert painters, premium materials, licensed & insured. Free estimates available.`,
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://jhpaintingservices.com/#localbusiness",
          "name": "JH Painting Services",
          "telephone": "+1-508-690-8886"
        },
        "areaServed": {
          "@type": "City",
          "name": cityName
        },
        "url": `https://jhpaintingservices.com/${seoSlug}`
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jhpaintingservices.com" },
          { "@type": "ListItem", "position": 2, "name": serviceName, "item": `https://jhpaintingservices.com/services/${serviceName.toLowerCase().replace(/ /g, '-')}` },
          { "@type": "ListItem", "position": 3, "name": `${cityName}, MA`, "item": `https://jhpaintingservices.com/${seoSlug}` }
        ]
      }
    ]
  }
}

export default function SeoPage({ params }: Props) {
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

  // Parse the SEO slug to get city and optional service
  const parsed = parseSeoUrl(params.seoSlug)

  if (!parsed) {
    notFound()
  }

  const city = getCityBySlug(parsed.citySlug)

  if (!city) {
    notFound()
  }

  const isServicePage = !!parsed.serviceSlug
  const service = parsed.serviceSlug ? servicesData[parsed.serviceSlug] : null
  const serviceName = parsed.serviceSlug ? serviceNameMap[parsed.serviceSlug] : null

  const schema = isServicePage && serviceName
    ? generateCityServiceSchema(city.name, serviceName, params.seoSlug, city.county || 'Massachusetts')
    : generateCitySchema(city.name, city.county || 'Massachusetts', params.seoSlug)

  // Render City+Service page
  if (isServicePage && service) {
    return (
      <>
        <Script
          id={`seo-schema-${params.seoSlug}`}
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
                  <span className="top-bar-city-name">{service.name} in {city.name}, MA</span>
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
                <Link href="/#contact">Contact</Link>
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
              <Link href="/#contact" onClick={closeMenu}>Contact</Link>
            </div>
            <a href="tel:+15086908886" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
              <Phone size={18} /> (508) 690-8886
            </a>
          </nav>
        </header>

        <main id="main-content">
          {/* Hero Section */}
          <section className="hero" style={{ minHeight: '90vh' }}>
            <div className="hero-bg">
              <Image src={service.heroImage} alt={`${service.name} in ${city.name}, MA`} fill style={{ objectFit: 'cover' }} priority />
              <div className="hero-overlay" />
            </div>
            <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '120px' }}>
              <div className="hero-grid">
                <div className="hero-content">
                  <div className="hero-badge-row">
                    <span className="hero-location-badge"><MapPin size={16} /> {city.name}, MA</span>
                    <span className="hero-rating-badge"><Star size={14} fill="#FFD700" color="#FFD700" /> 5.0 Google Rating</span>
                  </div>
                  <h1 className="hero-title">{service.name} Services in {city.name}, Massachusetts</h1>
                  <p className="hero-subtitle">
                    Professional {service.name.toLowerCase()} by licensed contractors serving {city.name} and {city.county}.
                    Premium materials, expert craftsmanship, 100% satisfaction guaranteed.
                  </p>
                  <div className="hero-cta-row">
                    <a href="tel:+15086908886" className="btn btn-primary btn-lg"><Phone size={18} /> (508) 690-8886</a>
                    <a href="#quote-form" className="btn btn-outline btn-lg">Get Free Estimate</a>
                  </div>
                  <div className="hero-trust-badges">
                    <span className="hero-trust-badge"><Shield size={16} /> Licensed & Insured</span>
                    <span className="hero-trust-badge"><Clock size={16} /> Same Day Response</span>
                    <span className="hero-trust-badge"><DollarSign size={16} /> Free Estimates</span>
                  </div>
                </div>

                <div id="quote-form" className="hero-form-card">
                  <div className="hero-form-header">
                    <h2 className="hero-form-title">Get Your Free Quote</h2>
                    <p className="hero-form-subtitle">{service.name} in {city.name}, MA</p>
                  </div>
                  <iframe
                    className="hero-form-iframe"
                    src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                    title="Contact Form"
                    loading="lazy"
                  />
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
                <Link href="/#reviews">See Our Reviews <ChevronRight size={14} /></Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container" style={{ padding: '4rem 1rem' }}>
            <div className="city-service-layout">
              <div className="city-service-main">
                {/* Challenges Section */}
                <section className="city-service-section">
                  <div className="section-icon-header">
                    <Wrench size={24} />
                    <h2>Common {service.name} Challenges in {city.name}</h2>
                  </div>
                  <p style={{ marginBottom: '2rem', color: 'var(--jh-text-light)' }}>
                    {city.name} homeowners face unique challenges when it comes to {service.name.toLowerCase()}. Here are the most common issues we solve:
                  </p>
                  <div className="challenges-grid">
                    {service.challenges.map((challenge, idx) => (
                      <div key={idx} className="challenge-card">
                        <div className="challenge-icon"><AlertCircle size={20} /></div>
                        <div>
                          <h4>{challenge.title}</h4>
                          <p>We have proven solutions for this common {city.name} problem.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Process Steps */}
                <section className="city-service-section">
                  <h2>Our {service.name} Process</h2>
                  <div className="process-grid-service">
                    {processSteps.map((step) => (
                      <div key={step.num} className="process-step-card">
                        <div className="process-step-num">0{step.num}</div>
                        <div className="process-step-icon"><step.icon size={26} /></div>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* What We Offer */}
                <section className="city-service-section">
                  <h2>What We Offer</h2>
                  <div className="offerings-grid">
                    {service.offerings.map((offering, idx) => (
                      <div key={idx} className="offering-item">
                        <CheckCircle2 size={20} />
                        <span>{offering}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Why Choose Us */}
                <section className="city-service-section">
                  <h2>Why {city.name} Chooses JH Painting Services</h2>
                  <div className="why-choose-grid">
                    <div className="why-choose-item">
                      <div className="why-choose-icon"><Shield size={24} /></div>
                      <div><h4>Licensed & Insured</h4><p>Full coverage protection</p></div>
                    </div>
                    <div className="why-choose-item">
                      <div className="why-choose-icon"><Star size={24} /></div>
                      <div><h4>5-Star Rated</h4><p>47+ Google Reviews</p></div>
                    </div>
                    <div className="why-choose-item">
                      <div className="why-choose-icon"><Clock size={24} /></div>
                      <div><h4>Fast Response</h4><p>Same day estimates</p></div>
                    </div>
                    <div className="why-choose-item">
                      <div className="why-choose-icon"><Award size={24} /></div>
                      <div><h4>Quality Guaranteed</h4><p>100% satisfaction</p></div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <aside className="city-service-sidebar">
                <div className="sidebar-cta-card">
                  <h3>Get Your Free {service.name} Quote</h3>
                  <p>Professional {service.name.toLowerCase()} in {city.name}, MA</p>
                  <a href="tel:+15086908886" className="btn btn-primary" style={{ width: '100%' }}>
                    <Phone size={18} /> Call (508) 690-8886
                  </a>
                  <a href="#quote-form" className="btn btn-outline" style={{ width: '100%', marginTop: '0.75rem' }}>
                    Request Quote Online
                  </a>
                </div>

                <div className="sidebar-services-card">
                  <h4>Our Services in {city.name}</h4>
                  <ul>
                    {servicesList.map((svc, idx) => (
                      <li key={idx}>
                        <Link href={`/${getCityServicePageSlug(city.slug, svc.slug)}`}>
                          <svc.icon size={16} /> {svc.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>

          {/* CTA Section */}
          <section className="section" style={{ background: 'var(--jh-red)', padding: '4rem 0' }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>
                Ready for Professional {service.name} in {city.name}?
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
                <p>Professional painting services in {city.name} and Massachusetts. Licensed, insured, and committed to excellence.</p>
              </div>
              <div className="footer-links">
                <h4>Quick Links</h4>
                <Link href="/">Home</Link>
                <Link href="/#about">About Us</Link>
                <Link href="/#services">Services</Link>
                <Link href="/#gallery">Gallery</Link>
                <Link href="/#contact">Contact</Link>
              </div>
              <div className="footer-contact">
                <h4>Contact Us</h4>
                <p><Phone size={16} /> (508) 690-8886</p>
                <p><Mail size={16} /> contact@jhpaintingservices.com</p>
                <p><MapPin size={16} /> Serving {city.name}, MA</p>
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

  // Render City page (painters page)
  return (
    <>
      <Script
        id={`seo-schema-${params.seoSlug}`}
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
              <Link href="/#contact">Contact</Link>
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
            <Link href="/#contact" onClick={closeMenu}>Contact</Link>
          </div>
          <a href="tel:+15086908886" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
            <Phone size={18} /> (508) 690-8886
          </a>
        </nav>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
              alt={`Professional Painters in ${city.name}, Massachusetts`}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.70) 50%, rgba(0, 0, 0, 0.60) 100%)' }} />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '120px', paddingBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', borderRadius: '100px', color: '#fff', fontSize: '0.875rem', fontWeight: '500', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                    <MapPin size={16} />
                    {city.name}, Massachusetts
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 193, 7, 0.2) 100%)', backdropFilter: 'blur(10px)', borderRadius: '100px', color: '#FFD700', fontSize: '0.875rem', fontWeight: '600', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
                    <Star size={14} fill="#FFD700" />
                    5.0 Google Rating
                  </span>
                </div>

                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', color: '#fff', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                  Professional Painters in<br />
                  <span style={{ color: '#D20404' }}>{city.name}, MA</span>
                </h1>

                <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '540px' }}>
                  Transform your home with {city.name}&apos;s most trusted painting contractors. Interior & exterior painting, cabinet refinishing, and more. Licensed, insured, and committed to excellence.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <a href="tel:+15086908886" className="btn btn-primary btn-lg">
                    <Phone size={18} />
                    Call (508) 690-8886
                  </a>
                  <a href="#quote-form" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', color: '#fff', borderRadius: '12px', fontSize: '1.125rem', fontWeight: '600', textDecoration: 'none', border: '2px solid rgba(255, 255, 255, 0.3)', transition: 'all 0.3s ease' }}>
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

              <div id="quote-form" style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '2rem', boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)', borderRadius: '100px', color: '#166534', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem' }}>
                    <Sparkles size={16} />
                    Free Estimate
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>
                    Get Your Free Quote
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9375rem' }}>
                    We&apos;ll respond within 24 hours
                  </p>
                </div>

                <LazyIframe
                  src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                  style={{ width: '100%', height: '450px', border: 'none', borderRadius: '12px' }}
                  title="Contact Form - Request Free Painting Estimate"
                />
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
              <Link href="/#reviews">See Our Reviews <ChevronRight size={14} /></Link>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section className="city-section city-section-white">
          <div className="container">
            <div className="city-section-header">
              <span className="city-badge city-badge-red">Our Services in {city.name}</span>
              <h2 className="city-section-title">Professional Painting Services</h2>
              <p className="city-section-subtitle">Expert painting solutions tailored for {city.name} homes and businesses</p>
            </div>

            <div className="city-services-grid">
              {servicesList.map((svc, idx) => (
                <Link key={idx} href={`/${getCityServicePageSlug(city.slug, svc.slug)}`} className="city-service-card">
                  <div className="city-service-icon">
                    <svc.icon size={32} color="#fff" />
                  </div>
                  <h3 className="city-service-title">{svc.name}</h3>
                  <p className="city-service-desc">Professional {svc.name.toLowerCase()} services in {city.name}, MA</p>
                  <span className="city-service-link">Learn More <ChevronRight size={18} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="city-section city-section-dark">
          <div className="container">
            <div className="city-section-header">
              <span className="city-badge city-badge-dark">Our Portfolio</span>
              <h2 className="city-section-title">{city.name} Project Gallery</h2>
              <p className="city-section-subtitle">See the quality transformations we&apos;ve delivered throughout {city.name} and Massachusetts</p>
            </div>

            <div className="city-gallery-grid">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="city-gallery-item">
                  <Image src={img.src} alt={img.alt} fill loading="lazy" style={{ objectFit: 'cover' }} />
                  <div className="city-gallery-overlay">
                    <div>
                      <span className="city-gallery-category">{img.category}</span>
                      <p className="city-gallery-text">{img.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="section video-section-rs">
          <div className="container">
            <div className="section-header">
              <h2>See Our Work in Action</h2>
              <p>Watch our expert team tackle painting projects across Massachusetts.</p>
            </div>

            <div className="video-grid-rs">
              {videos.map((video, idx) => (
                <a key={idx} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="video-card-rs">
                  <Image src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt={video.title} fill loading="lazy" style={{ objectFit: 'cover' }} />
                  <div className="video-card-rs-overlay">
                    <div className="video-card-rs-play"><Play size={20} /></div>
                    <h4>{video.title}</h4>
                    <span><Play size={12} />{video.type}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="video-section-cta">
              <a href="https://www.youtube.com/@JHPaintingServices-br9wh" target="_blank" rel="noopener noreferrer" className="btn btn-lg">
                <Play size={18} />
                Watch More on YouTube
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="city-section city-section-white">
          <div className="container">
            <div className="city-about-grid">
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

              <div className="city-about-content">
                <span className="city-badge city-badge-red">About JH Painting Services</span>
                <h2>Your Trusted {city.name} Painting Contractor</h2>
                <p>
                  Founded by <strong>Jafet</strong>, JH Painting Services is a premier painting contractor based in Waltham, Massachusetts.
                  With years of hands-on experience, we&apos;ve built our reputation on delivering exceptional craftsmanship,
                  honest pricing, and reliable service to homeowners across {city.name} and all of {city.county}.
                </p>
                <p>
                  We specialize in interior and exterior painting, using only premium materials designed to withstand
                  Massachusetts weather. Our meticulous attention to detail ensures results that exceed expectations.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                  <a href="tel:+15086908886" className="btn btn-primary">
                    <Phone size={18} /> Call Now
                  </a>
                  <a href="#quote-form" className="btn btn-outline">Get Free Quote</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section" style={{ background: 'var(--jh-red)', padding: '4rem 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>
              Ready to Transform Your {city.name} Home?
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
              <p>Professional painting services in {city.name} and Massachusetts. Licensed, insured, and committed to excellence.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <Link href="/">Home</Link>
              <Link href="/#about">About Us</Link>
              <Link href="/#services">Services</Link>
              <Link href="/#gallery">Gallery</Link>
              <Link href="/#contact">Contact</Link>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p><Phone size={16} /> (508) 690-8886</p>
              <p><Mail size={16} /> contact@jhpaintingservices.com</p>
              <p><MapPin size={16} /> Serving {city.name}, MA</p>
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
