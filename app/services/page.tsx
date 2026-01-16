'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, CheckCircle2, Star, ArrowRight, Paintbrush, Home, Building2, PaintBucket, Hammer, Clock, Shield, Award, Users, MapPin, Droplets } from 'lucide-react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import LazyIframe from '@/app/components/LazyIframe'
import { BUSINESS, FORM_IDS } from '@/lib/constants'

// Service data with price ranges
const services = [
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    shortDesc: 'Transform your indoor spaces',
    description: 'Professional interior painting services that bring new life to your walls, ceilings, trim, and more. Expert color consultation and premium paints included.',
    icon: Paintbrush,
    features: ['Wall & Ceiling Painting', 'Trim & Baseboard Work', 'Color Consultation', 'Premium Paints'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    priceRange: 'Starting at $350/room'
  },
  {
    slug: 'exterior-painting',
    name: 'Exterior Painting',
    shortDesc: 'Protect and beautify your home',
    description: 'Weather-resistant exterior painting that protects your home while boosting curb appeal. Complete prep work, premium paints, and lasting results.',
    icon: Home,
    features: ['Full Surface Preparation', 'Weather-Resistant Paints', 'Siding & Trim', 'Deck & Porch Painting'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064e65773e16aacef7d054.png',
    priceRange: 'Starting at $2,500'
  },
  {
    slug: 'commercial-painting',
    name: 'Commercial Painting',
    shortDesc: 'Professional business painting',
    description: 'Commercial painting services for offices, retail spaces, restaurants, and warehouses. Minimal disruption to your operations with flexible scheduling.',
    icon: Building2,
    features: ['Office Buildings', 'Retail Spaces', 'Restaurants', 'Warehouses'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064e65773e16aacef7d054.png',
    priceRange: 'Custom Quotes'
  },
  {
    slug: 'residential-painting',
    name: 'Residential Painting',
    shortDesc: 'Complete home painting solutions',
    description: 'Full-service residential painting for homeowners across Massachusetts. Interior, exterior, and specialty finishes for your entire home.',
    icon: Home,
    features: ['Whole Home Painting', 'Room-by-Room Service', 'New Construction', 'Remodel Projects'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    priceRange: 'Starting at $3,000'
  },
  {
    slug: 'cabinet-painting',
    name: 'Cabinet Painting',
    shortDesc: 'Refresh your kitchen for less',
    description: 'Transform your kitchen with professional cabinet refinishing. Save up to 70% compared to replacement while achieving a factory-quality finish.',
    icon: PaintBucket,
    features: ['Kitchen Cabinets', 'Bathroom Vanities', 'Built-in Units', 'Factory Finish'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    priceRange: 'Starting at $2,800'
  },
  {
    slug: 'carpentry',
    name: 'Carpentry',
    shortDesc: 'Expert wood repairs & trim',
    description: 'Professional carpentry services for window frames, door frames, siding, decks, and trim. Quality wood repairs before painting ensure lasting results.',
    icon: Hammer,
    features: ['Window Frame Repair', 'Door Frame Repair', 'Siding & Deck Repair', 'Trim & Molding'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    priceRange: 'Starting at $200'
  },
  {
    slug: 'power-washing',
    name: 'Power Washing',
    shortDesc: 'Professional pressure cleaning',
    description: 'Professional power washing services for homes, decks, driveways, patios, and more. Essential preparation for painting and property maintenance.',
    icon: Droplets,
    features: ['House Washing', 'Deck Cleaning', 'Driveway Cleaning', 'Pre-Paint Prep'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp',
    priceRange: 'Starting at $200'
  }
]

// Stats data
const stats = [
  { number: '500+', label: 'Projects Completed' },
  { number: '40+', label: '5-Star Reviews' },
  { number: '10+', label: 'Years Experience' },
  { number: '100%', label: 'Satisfaction Rate' }
]

// Why choose us data
const whyChooseUs = [
  { icon: Shield, title: 'Licensed & Insured', desc: 'Full coverage for complete peace of mind on every project' },
  { icon: Star, title: '5-Star Rated', desc: '40+ perfect ratings from satisfied homeowners' },
  { icon: Award, title: 'Premium Quality', desc: 'Benjamin Moore & Sherwin-Williams paints exclusively' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'We respect your schedule and complete on time' },
  { icon: Users, title: 'Expert Team', desc: 'Skilled painters with 10+ years of experience' },
  { icon: CheckCircle2, title: 'Free Estimates', desc: 'No-obligation quotes within 24 hours' }
]

// Service areas
const serviceAreas = [
  'Worcester', 'Framingham', 'Natick', 'Marlborough', 'Shrewsbury', 'Westborough',
  'Northborough', 'Southborough', 'Grafton', 'Millbury', 'Auburn', 'Oxford'
]

// Schema JSON-LD for Services page
const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      "name": "JH Painting Services",
      "description": "Professional painting services across Massachusetts",
      "itemListElement": services.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "url": `https://jhpaintingservices.com/services/${service.slug}`,
          "provider": {
            "@type": "LocalBusiness",
            "name": "JH Painting Services",
            "telephone": "+1-508-690-8886"
          }
        }
      }))
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
        }
      ]
    },
    {
      "@type": "LocalBusiness",
      "name": "JH Painting Services",
      "@id": "https://jhpaintingservices.com/#business",
      "url": "https://jhpaintingservices.com",
      "telephone": "+1-508-690-8886",
      "email": "jhpaintingservices1@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "346 Plantation St",
        "addressLocality": "Worcester",
        "addressRegion": "MA",
        "postalCode": "01604",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 42.2626,
        "longitude": -71.8023
      },
      "areaServed": serviceAreas.map(city => ({
        "@type": "City",
        "name": city,
        "containedInPlace": {
          "@type": "State",
          "name": "Massachusetts"
        }
      })),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "40",
        "bestRating": "5"
      }
    }
  ]
}

export default function ServicesPage() {
  return (
    <>
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <Header variant="service" />

      {/* Hero Section with Background Image */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064e65773e16aacef7d054.png"
            alt="Professional Painting Services Massachusetts"
            fill
            className="object-cover"
            priority
          />
          <div className="service-hero-overlay" />
        </div>

        <div className="container service-hero-container">
          <div className="service-hero-grid">
            {/* Hero Text */}
            <div className="service-hero-text">
              {/* Trust Badges */}
              <div className="trust-badges">
                <span className="trust-badge">
                  <Star size={14} fill="#FFD700" color="#FFD700" />
                  5.0 Google Rating
                </span>
                <span className="trust-badge">
                  <CheckCircle2 size={14} />
                  Licensed & Insured
                </span>
              </div>

              <h1>Professional Painting Services in Massachusetts</h1>

              <p className="service-hero-subtitle">
                From interior makeovers to exterior transformations, we deliver exceptional painting results for homes and businesses across the Bay State. Premium paints, expert craftsmanship, and guaranteed satisfaction.
              </p>

              <div className="service-hero-features">
                <div className="service-hero-feature">
                  <CheckCircle2 size={18} />
                  <span>Benjamin Moore & Sherwin-Williams Paints</span>
                </div>
                <div className="service-hero-feature">
                  <CheckCircle2 size={18} />
                  <span>Free Color Consultation</span>
                </div>
                <div className="service-hero-feature">
                  <CheckCircle2 size={18} />
                  <span>100% Satisfaction Guarantee</span>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="service-hero-cta-mobile">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-primary btn-lg">
                  <Phone size={20} />
                  Call {BUSINESS.phone}
                </a>
              </div>
            </div>

            {/* Quote Form Card */}
            <div className="service-form-card">
              <div className="service-form-header">
                <h3>Get Your FREE Estimate</h3>
                <p>Fast response • No obligation</p>
              </div>
              <LazyIframe
                src={FORM_IDS.servicePages}
                title="Request a Free Painting Estimate"
                style={{
                  width: '100%',
                  height: '450px',
                  minHeight: '450px',
                  border: 'none',
                  borderRadius: '0 0 16px 16px',
                }}
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Bar */}
      <div className="google-reviews-bar">
        <div className="container">
          <div className="google-reviews-content">
            <Image
              src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/6806c2564277e4317f7f98f6.png"
              alt="Google"
              width={80}
              height={26}
              style={{ marginRight: '12px' }}
            />
            <div className="google-reviews-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} fill="#FFD700" color="#FFD700" />
              ))}
            </div>
            <span className="google-reviews-text">
              <strong>5.0</strong> rating from <strong>40+</strong> reviews
            </span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <section className="service-stats-bar">
        <div className="container">
          <div className="service-stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="service-stat-item">
                <span className="service-stat-number">{stat.number}</span>
                <span className="service-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-list" className="service-section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Services</span>
            <h2>Comprehensive Painting Solutions</h2>
            <p>Choose from our complete range of professional painting services designed to meet every need</p>
          </div>

          <div className="services-page-grid">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.slug} className="services-page-card">
                  {/* Service Image */}
                  <div className="services-page-card-image">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="services-page-card-icon">
                      <Icon size={24} />
                    </div>
                    <div className="services-page-card-price">
                      {service.priceRange}
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="services-page-card-content">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>

                    {/* Features */}
                    <ul className="services-page-card-features">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link href={`/services/${service.slug}`} className="services-page-card-btn">
                      Learn More
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="service-section-dark">
        <div className="container">
          <div className="section-header section-header-light">
            <span className="section-badge section-badge-light">Why Choose Us</span>
            <h2>The JH Painting Difference</h2>
            <p>We're committed to delivering exceptional quality on every project</p>
          </div>

          <div className="why-choose-grid">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="why-choose-card">
                  <div className="why-choose-icon">
                    <Icon size={28} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="service-section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Service Areas</span>
            <h2>Proudly Serving Central Massachusetts</h2>
            <p>Professional painting services available throughout Worcester County and beyond</p>
          </div>

          <div className="service-areas-grid">
            {serviceAreas.map((city, idx) => (
              <div key={idx} className="service-area-item">
                <MapPin size={16} />
                <span>{city}, MA</span>
              </div>
            ))}
          </div>

          <div className="service-areas-cta">
            <p>Don't see your city? We likely serve your area too!</p>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-outline">
              <Phone size={18} />
              Call to Confirm Service Area
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta-red">
        <div className="container">
          <div className="service-cta-content">
            <h2>Ready to Transform Your Space?</h2>
            <p>Get a free, no-obligation estimate for your painting project. We'll respond within 24 hours!</p>
            <div className="service-cta-buttons">
              <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-white btn-lg">
                <Phone size={20} />
                {BUSINESS.phone}
              </a>
              <Link href="/#contact" className="btn btn-outline-white btn-lg">
                Request Free Estimate
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="service" />
    </>
  )
}
