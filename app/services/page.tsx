'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import LazyIframe from '@/app/components/LazyIframe'
import { BUSINESS, FORM_IDS } from '@/lib/constants'

// Inline SVG icons to reduce bundle size
const PhoneIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const CheckCircle2Icon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
  </svg>
)
const StarIcon = ({ size = 24, fill = 'none', color = 'currentColor' }: { size?: number; fill?: string; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const ArrowRightIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
)
const PaintbrushIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/><path d="M14.5 17.5 4.5 15"/>
  </svg>
)
const HomeIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const Building2Icon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
  </svg>
)
const PaintBucketIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/>
  </svg>
)
const HammerIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/>
  </svg>
)
const ClockIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)
const ShieldIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
  </svg>
)
const AwardIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)
const UsersIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const MapPinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const DropletsIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
  </svg>
)

// Service data with price ranges
const services = [
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    shortDesc: 'Transform your indoor spaces',
    description: 'Professional interior painting services that bring new life to your walls, ceilings, trim, and more. Expert color consultation and premium paints included.',
    icon: PaintbrushIcon,
    features: ['Wall & Ceiling Painting', 'Trim & Baseboard Work', 'Color Consultation', 'Premium Paints'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    priceRange: 'Starting at $350/room'
  },
  {
    slug: 'exterior-painting',
    name: 'Exterior Painting',
    shortDesc: 'Protect and beautify your home',
    description: 'Weather-resistant exterior painting that protects your home while boosting curb appeal. Complete prep work, premium paints, and lasting results.',
    icon: HomeIcon,
    features: ['Full Surface Preparation', 'Weather-Resistant Paints', 'Siding & Trim', 'Deck & Porch Painting'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064e65773e16aacef7d054.png',
    priceRange: 'Starting at $2,500'
  },
  {
    slug: 'commercial-painting',
    name: 'Commercial Painting',
    shortDesc: 'Professional business painting',
    description: 'Commercial painting services for offices, retail spaces, restaurants, and warehouses. Minimal disruption to your operations with flexible scheduling.',
    icon: Building2Icon,
    features: ['Office Buildings', 'Retail Spaces', 'Restaurants', 'Warehouses'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064e65773e16aacef7d054.png',
    priceRange: 'Custom Quotes'
  },
  {
    slug: 'residential-painting',
    name: 'Residential Painting',
    shortDesc: 'Complete home painting solutions',
    description: 'Full-service residential painting for homeowners across Massachusetts. Interior, exterior, and specialty finishes for your entire home.',
    icon: HomeIcon,
    features: ['Whole Home Painting', 'Room-by-Room Service', 'New Construction', 'Remodel Projects'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    priceRange: 'Starting at $3,000'
  },
  {
    slug: 'cabinet-painting',
    name: 'Cabinet Painting',
    shortDesc: 'Refresh your kitchen for less',
    description: 'Transform your kitchen with professional cabinet refinishing. Save up to 70% compared to replacement while achieving a factory-quality finish.',
    icon: PaintBucketIcon,
    features: ['Kitchen Cabinets', 'Bathroom Vanities', 'Built-in Units', 'Factory Finish'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    priceRange: 'Starting at $2,800'
  },
  {
    slug: 'carpentry',
    name: 'Carpentry',
    shortDesc: 'Expert wood repairs & trim',
    description: 'Professional carpentry services for window frames, door frames, siding, decks, and trim. Quality wood repairs before painting ensure lasting results.',
    icon: HammerIcon,
    features: ['Window Frame Repair', 'Door Frame Repair', 'Siding & Deck Repair', 'Trim & Molding'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    priceRange: 'Starting at $200'
  },
  {
    slug: 'power-washing',
    name: 'Power Washing',
    shortDesc: 'Professional pressure cleaning',
    description: 'Professional power washing services for homes, decks, driveways, patios, and more. Essential preparation for painting and property maintenance.',
    icon: DropletsIcon,
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
  { icon: ShieldIcon, title: 'Licensed & Insured', desc: 'Full coverage for complete peace of mind on every project' },
  { icon: StarIcon, title: '5-Star Rated', desc: '40+ perfect ratings from satisfied homeowners' },
  { icon: AwardIcon, title: 'Premium Quality', desc: 'Benjamin Moore & Sherwin-Williams paints exclusively' },
  { icon: ClockIcon, title: 'On-Time Delivery', desc: 'We respect your schedule and complete on time' },
  { icon: UsersIcon, title: 'Expert Team', desc: 'Skilled painters with 10+ years of experience' },
  { icon: CheckCircle2Icon, title: 'Free Estimates', desc: 'No-obligation quotes within 24 hours' }
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
                  <StarIcon size={14} fill="#FFD700" color="#FFD700" />
                  5.0 Google Rating
                </span>
                <span className="trust-badge">
                  <CheckCircle2Icon size={14} />
                  Licensed & Insured
                </span>
              </div>

              <h1>Professional Painting Services in Massachusetts</h1>

              <p className="service-hero-subtitle">
                From interior makeovers to exterior transformations, we deliver exceptional painting results for homes and businesses across the Bay State. Premium paints, expert craftsmanship, and guaranteed satisfaction.
              </p>

              <div className="service-hero-features">
                <div className="service-hero-feature">
                  <CheckCircle2Icon size={18} />
                  <span>Benjamin Moore & Sherwin-Williams Paints</span>
                </div>
                <div className="service-hero-feature">
                  <CheckCircle2Icon size={18} />
                  <span>Free Color Consultation</span>
                </div>
                <div className="service-hero-feature">
                  <CheckCircle2Icon size={18} />
                  <span>100% Satisfaction Guarantee</span>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="service-hero-cta-mobile">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-primary btn-lg">
                  <PhoneIcon size={20} />
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
                <StarIcon key={star} size={18} fill="#FFD700" color="#FFD700" />
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
                          <CheckCircle2Icon size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link href={`/services/${service.slug}`} className="services-page-card-btn">
                      Learn More
                      <ArrowRightIcon size={18} />
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
                <MapPinIcon size={16} />
                <span>{city}, MA</span>
              </div>
            ))}
          </div>

          <div className="service-areas-cta">
            <p>Don't see your city? We likely serve your area too!</p>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-outline">
              <PhoneIcon size={18} />
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
                <PhoneIcon size={20} />
                {BUSINESS.phone}
              </a>
              <Link href="/#contact" className="btn btn-outline-white btn-lg">
                Request Free Estimate
                <ArrowRightIcon size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="service" />
    </>
  )
}
