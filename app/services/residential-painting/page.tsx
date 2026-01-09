'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles, MapPin, Paintbrush, Home } from 'lucide-react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { BUSINESS, ALL_CITY_NAMES, VIDEOS, FORM_IDS } from '@/lib/constants'

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

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Modern living room painting', category: 'Living Room' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Elegant bedroom transformation', category: 'Bedroom' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Kitchen cabinet and wall painting', category: 'Kitchen' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Exterior house painting', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'Full home makeover', category: 'Whole House' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Fresh bathroom painting', category: 'Bathroom' },
]

const painPoints = [
  {
    icon: Paintbrush,
    title: 'Walls That Look Worn & Dated?',
    desc: "Faded paint, scuff marks, and outdated colors can make your entire home feel old and uninviting. You deserve a fresh, modern look that makes you proud.",
    solution: 'Transform tired spaces into beautiful, welcoming rooms'
  },
  {
    icon: Shield,
    title: 'Worried About Messy Contractors?',
    desc: "Past experiences with sloppy painters who leave your home in chaos? We understand. Your home deserves respect and careful attention to detail.",
    solution: 'We treat your home like our own—careful prep and daily cleanup'
  },
  {
    icon: Clock,
    title: 'Afraid of Hidden Costs & Delays?',
    desc: "Sick of contractors who quote one price then add fees, or promise quick work but drag on for weeks? You need someone you can trust.",
    solution: 'Transparent pricing and reliable timelines—no surprises'
  }
]

const stats = [
  { number: '1000+', label: 'Homes Painted' },
  { number: '15+', label: 'Years Experience' },
  { number: '100%', label: 'Satisfaction Rate' },
  { number: '114', label: 'Cities Served' }
]

const services = [
  'Interior room painting',
  'Whole house interior',
  'Exterior house painting',
  'Kitchen painting',
  'Bathroom painting',
  'Living room painting',
  'Bedroom painting',
  'Basement painting',
  'Garage painting',
  'Ceiling painting',
  'Trim & molding',
  'Door & window painting',
  'Deck & fence staining',
  'Cabinet refinishing',
  'Wallpaper removal',
  'Drywall repair',
  'Color consultation',
  'Accent walls'
]

const processSteps = [
  { step: '01', title: 'Free Consultation', desc: 'In-home assessment, detailed estimate, and personalized recommendations' },
  { step: '02', title: 'Color Selection', desc: 'Expert color consultation with samples to find your perfect palette' },
  { step: '03', title: 'Preparation', desc: 'Complete furniture protection, repairs, and meticulous surface prep' },
  { step: '04', title: 'Professional Painting', desc: 'Expert application with premium paints and attention to detail' },
  { step: '05', title: 'Quality Inspection', desc: 'Thorough inspection ensuring every detail meets our high standards' },
  { step: '06', title: 'Final Walkthrough', desc: 'Complete cleanup and walkthrough to ensure your satisfaction' }
]

const aboutFeatures = [
  { icon: Shield, text: 'Licensed & Insured' },
  { icon: Award, text: '15+ Years Experience' },
  { icon: Users, text: '1000+ Happy Clients' },
  { icon: Heart, text: 'Family Owned' }
]

export default function ResidentialPaintingPage() {
  return (
    <>
      <Header />

      {/* Schema JSON-LD for SEO */}
      <Script
        id="residential-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(residentialPaintingSchema)
        }}
      />

      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png"
            alt="Professional Residential Painting Services Massachusetts"
            fill
            className="object-cover"
            priority
          />
          <div className="service-hero-overlay" />
        </div>

        <div className="container service-hero-content">
          <div className="service-hero-grid">
            {/* Hero Text */}
            <div>
              <div className="service-hero-badges">
                <span className="service-badge-location">
                  <MapPin size={16} />
                  Serving All Massachusetts
                </span>
                <span className="service-badge-rating">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  5.0 Rating
                </span>
              </div>

              <h1 className="service-hero-title">
                Professional{' '}
                <span className="service-hero-title-accent">
                  Residential Painting
                </span>{' '}
                Services
              </h1>

              <p className="service-hero-desc">
                Transform your Massachusetts home with expert residential painting. From single rooms to complete home makeovers, we deliver stunning results that exceed expectations.
              </p>

              <div className="service-hero-ctas">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-primary">
                  <Phone size={20} />
                  {BUSINESS.phone}
                </a>
                <Link href="/#contact" className="service-cta-secondary">
                  Get Free Estimate
                  <ChevronRight size={20} />
                </Link>
              </div>

              <div className="service-hero-features">
                {[
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Award, text: 'Expert Craftsmen' },
                  { icon: Clock, text: 'On-Time Service' }
                ].map((item, idx) => (
                  <div key={idx} className="service-hero-feature">
                    <item.icon size={18} className="service-hero-feature-icon" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form Card */}
            <div className="service-form-card">
              <div className="text-center mb-6">
                <h2 className="service-form-title">
                  Get Your Free Quote
                </h2>
                <p className="service-form-subtitle">
                  Fast response • No obligation • Residential painting experts
                </p>
              </div>
              <iframe
                src={`https://api.leadconnectorhq.com/widget/form/${FORM_IDS.contact}`}
                title="Contact Form"
                loading="lazy"
                className="service-form-iframe"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="service-stats-bar">
        <div className="container">
          <div className="service-stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="service-stat">
                <div className="service-stat-number">{stat.number}</div>
                <div className="service-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="service-section-white">
        <div className="container">
          <div className="service-section-header">
            <h2 className="service-section-title">
              Tired of Living with Outdated, Peeling Paint?
            </h2>
            <p className="service-section-subtitle">
              We understand the frustration. Your home should be your sanctuary, not a source of stress.
            </p>
          </div>

          <div className="service-pain-grid">
            {painPoints.map((item, idx) => (
              <div key={idx} className="service-pain-card">
                <div className="service-pain-icon">
                  <item.icon size={24} color="#fff" />
                </div>
                <h3 className="service-pain-title">{item.title}</h3>
                <p className="service-pain-desc">{item.desc}</p>
                <p className="service-pain-solution">
                  <CheckCircle2 size={18} />
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="service-section-dark">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-dark">Complete Home Painting Solutions</span>
            <h2 className="service-section-title-light">
              Residential Painting Services
            </h2>
            <p className="service-section-subtitle-light">
              From single rooms to complete home transformations, we deliver stunning results
            </p>
          </div>

          <div className="service-list-grid">
            {services.map((service, idx) => (
              <div key={idx} className="service-list-item">
                <CheckCircle2 size={24} className="service-list-icon" />
                <span className="service-list-text">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="service-section-white">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-red">Our Proven Process</span>
            <h2 className="service-section-title">
              6 Steps to Your Dream Home
            </h2>
            <p className="service-section-subtitle">
              We follow a systematic approach to ensure flawless results every time
            </p>
          </div>

          <div className="service-process-grid">
            {processSteps.map((item, idx) => (
              <div key={idx} className="service-process-card">
                <div className="service-process-bg-number">{item.step}</div>
                <div className="service-process-number">{item.step}</div>
                <h3 className="service-process-title">{item.title}</h3>
                <p className="service-process-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="service-section-gray">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-red">Our Portfolio</span>
            <h2 className="service-section-title">
              Recent Home Transformations
            </h2>
            <p className="service-section-subtitle">
              See the stunning transformations we have created for Massachusetts homeowners
            </p>
          </div>

          <div className="service-gallery-grid">
            {galleryImages.map((image, idx) => (
              <div key={idx} className="service-gallery-item">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
                <div className="service-gallery-overlay" />
                <div className="service-gallery-content">
                  <span className="service-gallery-category">{image.category}</span>
                  <p className="service-gallery-title">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="service-section-dark">
        <div className="container">
          <div className="service-section-header">
            <span className="service-badge-dark">See Us In Action</span>
            <h2 className="service-section-title-light">
              Watch Our Work
            </h2>
            <p className="service-section-subtitle-light">
              See the quality and care we bring to every residential painting project
            </p>
          </div>

          <div className="service-video-grid">
            {VIDEOS.slice(0, 2).map((video, idx) => (
              <a
                key={idx}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="service-video-card"
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="service-video-overlay">
                  <div className="service-video-play">
                    <Play size={32} fill="#fff" color="#fff" />
                  </div>
                </div>
                <div className="service-video-title">
                  <p>{video.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="service-section-white">
        <div className="container">
          <div className="service-about-grid">
            <div className="service-about-image-wrapper">
              <div className="service-about-image">
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac03fd033dc1.png"
                  alt="Jafet Herra - Owner of JH Painting Services"
                  width={500}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="service-about-experience">
                <div className="service-about-experience-number">15+</div>
                <div className="service-about-experience-label">Years of Excellence</div>
              </div>
            </div>

            <div>
              <span className="service-badge-red">About JH Painting</span>
              <h2 className="service-about-title">
                Your Trusted Home Painting Partner
              </h2>
              <p className="service-about-desc">
                At JH Painting, we understand that inviting contractors into your home is a big decision. That is why we have built our reputation on trust, quality, and respect for your space.
              </p>
              <p className="service-about-desc">
                When you choose us for your residential painting project, you are partnering with professionals who genuinely care about transforming your space while treating your home like our own.
              </p>

              <div className="service-about-features">
                {aboutFeatures.map((item, idx) => (
                  <div key={idx} className="service-about-feature">
                    <item.icon size={24} className="service-about-feature-icon" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta-red">
        <div className="service-cta-pattern" />
        <div className="container service-cta-content">
          <h2 className="service-cta-title">
            Ready to Transform Your Home?
          </h2>
          <p className="service-cta-desc">
            Get a free estimate and color consultation. Experience the JH Painting difference.
          </p>
          <div className="service-cta-buttons">
            <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-btn-white">
              <Phone size={20} />
              Call {BUSINESS.phone}
            </a>
            <Link href="/#contact" className="service-cta-btn-outline">
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="service-areas-section">
        <div className="container">
          <div className="service-section-header">
            <h2 className="service-section-title">
              Serving Homeowners Across Massachusetts
            </h2>
            <p className="service-section-subtitle">
              Professional residential painting services available throughout 114 cities
            </p>
          </div>

          <div className="service-areas-grid">
            {ALL_CITY_NAMES.map((city, idx) => (
              <Link
                key={idx}
                href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}/residential-painting`}
                className="service-area-link"
              >
                {city}
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/cities" className="service-areas-btn">
              View All 114 Cities
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
