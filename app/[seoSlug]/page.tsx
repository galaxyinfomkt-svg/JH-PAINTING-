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
import { getCityContent } from '@/app/data/cityContent'
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

  // Get unique content for this city
  const cityContent = getCityContent(city.slug)

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
                <Link href="/blog">Blog</Link>
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
              <Link href="/blog" onClick={closeMenu}>Blog</Link>
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
              <Image
                src={service.heroImage}
                alt={`${service.name} in ${city.name}, MA`}
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="100vw"
                quality={75}
              />
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
                  <a href="https://g.co/kgs/hc9Rfmv" target="_blank" rel="noopener noreferrer" aria-label="Google">
                    <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  </a>
                </div>
              </div>

              <div className="footer-col">
                <h4>Quick Links</h4>
                <ul className="footer-links">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/#about">About</Link></li>
                  <li><Link href="/#services">Services</Link></li>
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/#gallery">Gallery</Link></li>
                  <li><Link href="/#reviews">Reviews</Link></li>
                  <li><Link href="/#contact">Contact</Link></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Our Services</h4>
                <ul className="footer-links">
                  <li><Link href="/services/interior-painting">Interior Painting</Link></li>
                  <li><Link href="/services/exterior-painting">Exterior Painting</Link></li>
                  <li><Link href="/services/commercial-painting">Commercial Painting</Link></li>
                  <li><Link href="/services/residential-painting">Residential Painting</Link></li>
                  <li><Link href="/services/cabinet-painting">Cabinet Painting</Link></li>
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
                <div className="footer-contact-item">
                  <Clock size={16} />
                  <span>Mon-Sat: 7AM - 6PM</span>
                </div>
              </div>
            </div>

            <div className="footer-cities">
              <h4>Service Areas - {cities.length}+ Cities in Massachusetts</h4>
              <div className="footer-cities-grid">
                {cities.map((cityItem) => (
                  <Link
                    key={cityItem.slug}
                    href={`/cities/${cityItem.slug}`}
                    className="footer-city-link"
                  >
                    {cityItem.name}
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
              sizes="100vw"
              quality={75}
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
                  {cityContent.heroHeadline.includes(city.name) ? cityContent.heroHeadline : `Professional Painters in`}<br />
                  <span style={{ color: '#D20404' }}>{cityContent.heroHeadline.includes(city.name) ? '' : `${city.name}, MA`}</span>
                </h1>

                <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '540px' }}>
                  {cityContent.heroSubheadline}
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

        {/* VSL Style Intro Section - Storytelling & Engagement */}
        {cityContent.introText && (
          <section className="vsl-intro-section">
            <div className="container">
              {/* Opening Hook */}
              <div className="vsl-hook">
                <div className="vsl-hook-badge">
                  <MapPin size={16} />
                  <span>Local {city.name} Story</span>
                </div>
                <h2 className="vsl-hook-title">
                  Why We <span className="vsl-highlight">Love</span> Painting Homes in {city.name}
                </h2>
                <p className="vsl-hook-subtitle">
                  (And Why {city.name} Homeowners Keep Coming Back to Us)
                </p>
              </div>

              {/* Story Content with Visual Elements */}
              <div className="vsl-story-grid">
                {/* Left: Video or Image */}
                <div className="vsl-media-wrapper">
                  <div className="vsl-video-card">
                    <a
                      href="https://www.youtube.com/watch?v=F_lreXzNlUI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vsl-video-link"
                    >
                      <Image
                        src="https://img.youtube.com/vi/F_lreXzNlUI/maxresdefault.jpg"
                        alt={`JH Painting Services working in ${city.name}, MA`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="vsl-video-overlay">
                        <div className="vsl-play-button">
                          <Play size={32} fill="#fff" />
                        </div>
                        <span className="vsl-watch-text">Watch Our Work</span>
                      </div>
                    </a>
                  </div>
                  <div className="vsl-video-caption">
                    <Star size={14} fill="#D20404" color="#D20404" />
                    <span>See why {city.name} homeowners trust us</span>
                  </div>
                </div>

                {/* Right: Story Text */}
                <div className="vsl-story-content">
                  <div className="vsl-story-text">
                    <p className="vsl-lead-paragraph">
                      <span className="vsl-dropcap">W</span>hen you hire a painting contractor, you&apos;re not just getting paint on walls &mdash; you&apos;re trusting someone with your home, your biggest investment.
                    </p>

                    <p>{cityContent.introText}</p>

                    <div className="vsl-highlight-box">
                      <div className="vsl-highlight-icon">
                        <Heart size={24} color="#D20404" />
                      </div>
                      <p className="vsl-highlight-text">
                        <strong>Here&apos;s the thing:</strong> We don&apos;t just paint houses &mdash; we transform homes. And we take that responsibility seriously.
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="vsl-quick-stats">
                    <div className="vsl-stat">
                      <span className="vsl-stat-number">200+</span>
                      <span className="vsl-stat-label">Homes Painted</span>
                    </div>
                    <div className="vsl-stat">
                      <span className="vsl-stat-number">5.0</span>
                      <span className="vsl-stat-label">Google Rating</span>
                    </div>
                    <div className="vsl-stat">
                      <span className="vsl-stat-number">100%</span>
                      <span className="vsl-stat-label">Satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Curiosity Builder */}
              <div className="vsl-curiosity-section">
                <h3 className="vsl-curiosity-title">
                  <Sparkles size={20} color="#D20404" />
                  What Makes Us Different?
                </h3>
                <div className="vsl-curiosity-grid">
                  <div className="vsl-curiosity-card">
                    <div className="vsl-curiosity-number">01</div>
                    <h4>We&apos;re Your Neighbors</h4>
                    <p>Based in Marlborough, we&apos;re not a faceless corporation &mdash; we&apos;re local contractors who live and work in your community.</p>
                  </div>
                  <div className="vsl-curiosity-card">
                    <div className="vsl-curiosity-number">02</div>
                    <h4>Premium Materials Only</h4>
                    <p>We use only Sherwin-Williams and Benjamin Moore paints. Why? Because cheap paint means repainting in 3 years. Ours lasts 7-10+.</p>
                  </div>
                  <div className="vsl-curiosity-card">
                    <div className="vsl-curiosity-number">03</div>
                    <h4>No Surprises, Ever</h4>
                    <p>The price we quote is the price you pay. No hidden fees, no &quot;we found more work&quot; excuses. Just honest, transparent pricing.</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="vsl-cta-wrapper">
                <p className="vsl-cta-text">Ready to see what we can do for your {city.name} home?</p>
                <div className="vsl-cta-buttons">
                  <a href="tel:+15086908886" className="vsl-cta-primary">
                    <Phone size={20} />
                    Call (508) 690-8886
                  </a>
                  <a href="#quote-form" className="vsl-cta-secondary">
                    Get Free Estimate
                    <ChevronRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Why Homeowners Choose Us - Pain Points & Solutions */}
        <section className="city-section city-section-white">
          <div className="container">
            <div className="city-section-header">
              <span className="city-badge city-badge-red">Why {city.name} Homeowners Choose Us</span>
              <h2 className="city-section-title">We Understand Your Painting Challenges</h2>
              <p className="city-section-subtitle">{cityContent.localContext}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: '3rem', marginTop: '3rem' }}>
              {/* Pain Points */}
              <div style={{ background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(210, 4, 4, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #D20404 0%, #B91C1C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertCircle size={24} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937' }}>Common Problems in {city.name}</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cityContent.painPoints.slice(0, 4).map((pain, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FCA5A5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <span style={{ color: '#DC2626', fontWeight: '700', fontSize: '0.75rem' }}>{idx + 1}</span>
                      </div>
                      <p style={{ color: '#4B5563', lineHeight: '1.6', margin: 0 }}>{pain}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(22, 163, 74, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={24} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937' }}>Our Solutions for You</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cityContent.solutions.slice(0, 4).map((solution, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#86EFAC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                        <CheckCircle2 size={14} color="#16A34A" />
                      </div>
                      <p style={{ color: '#4B5563', lineHeight: '1.6', margin: 0 }}>{solution}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Why Choose Us List */}
            <div style={{ marginTop: '3rem', background: '#F9FAFB', borderRadius: '20px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937', marginBottom: '1.5rem', textAlign: 'center' }}>
                Why {city.name} Residents Trust JH Painting Services
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {cityContent.whyChooseUs.map((reason, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <CheckCircle2 size={20} color="#D20404" />
                    <span style={{ color: '#374151', fontSize: '0.9375rem', fontWeight: '500' }}>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="city-section city-section-gray">
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
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                  />
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
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    quality={75}
                  />
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
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
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
                  Founded by <strong>Jafet</strong>, JH Painting Services is a premier painting contractor based in Marlborough, Massachusetts.
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

        {/* FAQ Section - Unique for each city */}
        <section className="city-section city-section-gray">
          <div className="container">
            <div className="city-section-header">
              <span className="city-badge city-badge-red">Frequently Asked Questions</span>
              <h2 className="city-section-title">Questions About Painting in {city.name}</h2>
              <p className="city-section-subtitle">Get answers to common questions from {city.name} homeowners</p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cityContent.faq.map((item, idx) => (
                <div key={idx} style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1F2937', marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #D20404 0%, #B91C1C 100%)', color: '#fff', fontSize: '0.875rem', fontWeight: '700', flexShrink: 0 }}>Q</span>
                    {item.question}
                  </h3>
                  <p style={{ color: '#4B5563', lineHeight: '1.7', margin: 0, paddingLeft: '2.75rem' }}>{item.answer}</p>
                </div>
              ))}
            </div>

            {/* Local Tip */}
            <div style={{ marginTop: '2rem', maxWidth: '800px', margin: '2rem auto 0', background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={20} color="#fff" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400E', marginBottom: '0.5rem' }}>Pro Tip for {city.name} Homeowners</h4>
                  <p style={{ color: '#78350F', lineHeight: '1.6', margin: 0 }}>{cityContent.localTip}</p>
                </div>
              </div>
            </div>

            {/* Nearby Areas */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <p style={{ color: '#6B7280', fontSize: '0.9375rem', marginBottom: '1rem' }}>We also serve nearby areas:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                {cityContent.nearbyAreas.map((area, idx) => {
                  const nearbyCity = cities.find(c => c.name === area)
                  return nearbyCity ? (
                    <Link
                      key={idx}
                      href={`/${getCityPageSlug(nearbyCity.slug)}`}
                      style={{ padding: '0.5rem 1rem', background: '#fff', borderRadius: '100px', color: '#374151', fontSize: '0.875rem', fontWeight: '500', textDecoration: 'none', border: '1px solid #E5E7EB', transition: 'all 0.2s ease' }}
                    >
                      {area}, MA
                    </Link>
                  ) : (
                    <span key={idx} style={{ padding: '0.5rem 1rem', background: '#fff', borderRadius: '100px', color: '#374151', fontSize: '0.875rem', fontWeight: '500', border: '1px solid #E5E7EB' }}>
                      {area}, MA
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Closing Pitch Section - SEO Content */}
        {cityContent.closingPitch && (
          <section className="city-section city-section-white" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div className="container">
              <div style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #FEF2F2 0%, #FFF7ED 100%)', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(210, 4, 4, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #D20404 0%, #B91C1C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Heart size={24} color="#fff" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937', marginBottom: '1rem' }}>Why {city.name} Trusts JH Painting Services</h3>
                    <p style={{ fontSize: '1.0625rem', lineHeight: '1.85', color: '#4B5563', margin: 0 }}>
                      {cityContent.closingPitch}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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
              <Image
                src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png"
                alt="JH Painting Services - Professional Painters in Massachusetts"
                width={150}
                height={60}
                loading="lazy"
              />
              <p>Professional painting services in {city.name} and across Massachusetts. Licensed, insured, and committed to excellence since day one.</p>
              <div className="footer-social">
                <a href="https://www.facebook.com/jhpaintingservicesMA/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/jhpaintingservices/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.youtube.com/@JHPaintingServices-br9wh" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://g.co/kgs/hc9Rfmv" target="_blank" rel="noopener noreferrer" aria-label="Google">
                  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/#about">About Us</Link></li>
                <li><Link href="/#services">Services</Link></li>
                <li><Link href="/#gallery">Gallery</Link></li>
                <li><Link href="/#reviews">Reviews</Link></li>
                <li><Link href="/#contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Our Services</h4>
              <ul className="footer-links">
                <li><Link href="/services/interior-painting">Interior Painting</Link></li>
                <li><Link href="/services/exterior-painting">Exterior Painting</Link></li>
                <li><Link href="/services/cabinet-painting">Cabinet Painting</Link></li>
                <li><Link href="/services/commercial-painting">Commercial Painting</Link></li>
                <li><Link href="/services/residential-painting">Residential Painting</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact Us</h4>
              <div className="footer-contact-info">
                <p><Phone size={16} /> <a href="tel:+15086908886">(508) 690-8886</a></p>
                <p><Mail size={16} /> <a href="mailto:contact@jhpaintingservices.com">contact@jhpaintingservices.com</a></p>
                <p><MapPin size={16} /> Serving {city.name} &amp; All MA</p>
                <p><Clock size={16} /> Mon-Sat: 7AM - 7PM</p>
              </div>
            </div>
          </div>

          <div className="footer-cities">
            <h4>Service Areas - {cities.length}+ Cities in Massachusetts</h4>
            <div className="footer-cities-grid">
              {cities.map((c) => (
                <Link key={c.slug} href={`/cities/${c.slug}`} className="footer-city-link">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} JH Painting Services. All rights reserved. | Professional Painters in Massachusetts</p>
          </div>
        </div>
      </footer>
    </>
  )
}
