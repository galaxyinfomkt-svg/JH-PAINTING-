'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles } from 'lucide-react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { BUSINESS, VIDEOS, FORM_IDS } from '@/lib/constants'
import LazyIframe from '@/app/components/LazyIframe'

// Schema JSON-LD for Interior Painting Service
const interiorPaintingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://jhpaintingservices.com/services/interior-painting#service",
      "name": "Interior Painting Services Massachusetts",
      "serviceType": "Interior Painting",
      "description": "Professional interior painting services across Massachusetts. Transform your home with expert wall painting, trim work, ceiling painting, and color consultation. Premium paints and meticulous preparation.",
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://jhpaintingservices.com/#localbusiness",
        "name": "JH Painting Services",
        "telephone": "+1-508-690-8886",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Marlborough",
          "addressRegion": "MA",
          "postalCode": "01752",
          "addressCountry": "US"
        }
      },
      "areaServed": {
        "@type": "State",
        "name": "Massachusetts"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Interior Painting Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Wall Painting",
              "description": "Professional wall painting with premium paints"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ceiling Painting",
              "description": "Expert ceiling painting and finishing"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Trim & Baseboard Painting",
              "description": "Detailed trim, baseboard, and molding painting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Color Consultation",
              "description": "Expert color selection and consultation"
            }
          }
        ]
      },
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png",
      "url": "https://jhpaintingservices.com/services/interior-painting"
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
          "name": "Interior Painting",
          "item": "https://jhpaintingservices.com/services/interior-painting"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does interior painting cost in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Interior painting costs in Massachusetts typically range from $2-$6 per square foot, depending on room size, wall condition, paint quality, and scope of work. Most rooms cost between $300-$800. Contact JH Painting for a free, detailed estimate tailored to your project."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to paint an interior room?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A typical bedroom or living room takes 1-2 days to complete, including proper prep work, priming, and two coats of paint. Larger rooms or those requiring extensive preparation may take longer. We always provide accurate timelines in our free estimates."
          }
        },
        {
          "@type": "Question",
          "name": "What paint brands do you use for interior painting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use premium paint brands including Benjamin Moore, Sherwin-Williams, and other top-quality paints. These provide superior coverage, durability, and a beautiful finish that lasts for years."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to move furniture before painting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We handle furniture moving as part of our service. We carefully move and cover furniture, protect floors with drop cloths, and ensure everything is put back after the job is complete. Large items should be moved to the center of the room."
          }
        }
      ]
    }
  ]
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg', alt: 'Historic church restoration interior painting in Waltham MA', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Professional interior living room painting in Massachusetts', category: 'Living Room' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Expert bedroom painting services in Waltham MA', category: 'Bedroom' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp', alt: 'Professional exterior painting Massachusetts', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp', alt: 'Deck staining and power washing services', category: 'Deck' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Historic church exterior painting in Waltham MA', category: 'Exterior' },
]

const painPoints = [
  {
    title: 'Scuff Marks & Stains Everywhere?',
    desc: "Kids, pets, daily life—your walls show it all. Those marks and stains don't go away with cleaning. You need a fresh coat that covers everything and looks pristine.",
    solution: 'We prep, prime, and paint for a flawless finish'
  },
  {
    title: "Can't Pick the Right Color?",
    desc: "Thousands of paint colors, endless opinions—it's overwhelming. What if you choose wrong? Our color experts guide you to the perfect shade that complements your style and lighting.",
    solution: 'Free expert color consultation included'
  },
  {
    title: 'Worried About the Mess?',
    desc: "Paint drips on floors, furniture covered in plastic for weeks, the smell—painting sounds like a nightmare. We protect everything, work clean, and use low-VOC paints so you can enjoy the process.",
    solution: 'Meticulous prep and daily cleanup guaranteed'
  }
]

const stats = [
  { number: '500+', label: 'Interiors Painted' },
  { number: '15+', label: 'Years Experience' },
  { number: '100%', label: 'Satisfaction Rate' },
  { number: '117', label: 'Cities Served' }
]

const features = [
  { icon: Users, text: 'Family-Owned Business' },
  { icon: Heart, text: 'Customer-First Approach' },
  { icon: Shield, text: 'Fully Licensed & Insured' },
  { icon: Sparkles, text: 'Premium Quality Paints' }
]

export default function InteriorPaintingPage() {
  return (
    <>
      {/* Schema JSON-LD for SEO */}
      <Script
        id="interior-painting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(interiorPaintingSchema)
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content">

      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg">
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png"
            alt="Professional Interior Painting Services Massachusetts"
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
                  Interior Painting
                </span>{' '}
                Services
              </h1>

              <p className="service-hero-desc">
                Transform your indoor spaces with expert interior painting. Quality craftsmanship, premium paints, and meticulous attention to detail for homes and businesses across Massachusetts.
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
                    <item.icon size={18} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form Card */}
            <div className="service-form-card">
              <div className="service-form-header">
                <h2 className="service-form-title">Get Your Free Quote</h2>
                <p className="service-form-subtitle">
                  Fast response • No obligation • Interior painting experts
                </p>
              </div>
              <LazyIframe
                src={`https://api.leadconnectorhq.com/widget/form/${FORM_IDS.quote}`}
                className="service-form-iframe"
                title="Contact Form"
                style={{ minHeight: '450px' }}
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
            <Link href="/#reviews">
              See Our Reviews
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Indicators Bar */}
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
      <section className="service-section service-section-white">
        <div className="container">
          <div className="service-section-header">
            <h2 className="service-section-title">
              Frustrated with Dull, Damaged Interior Walls?
            </h2>
            <p className="service-section-subtitle">
              You deserve a space that looks as good as you imagined. Let&apos;s fix what&apos;s holding you back.
            </p>
          </div>

          <div className="service-pain-grid">
            {painPoints.map((item, idx) => (
              <div key={idx} className="service-pain-card">
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

      {/* Photo Gallery */}
      <section className="service-section service-section-gray">
        <div className="container">
          <div className="service-section-header">
            <span className="service-section-badge">Our Work</span>
            <h2 className="service-section-title">Interior Painting Gallery</h2>
            <p className="service-section-subtitle">
              Beautiful interior transformations across Massachusetts
            </p>
          </div>

          <div className="service-gallery-grid">
            {galleryImages.map((image, idx) => (
              <div key={idx} className="service-gallery-item">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
                <div className="service-gallery-overlay">
                  <div>
                    <span className="service-gallery-badge">{image.category}</span>
                    <p className="service-gallery-label">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="service-section service-section-dark">
        <div className="container">
          <div className="service-section-header">
            <h2 className="service-section-title service-section-title-light">
              See Our Interior Transformations
            </h2>
            <p className="service-section-subtitle service-section-subtitle-light">
              Watch how we transform spaces with professional painting
            </p>
          </div>

          <div className="service-video-grid">
            {VIDEOS.map((video, idx) => (
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
                  loading="lazy"
                  className="object-cover"
                />
                <div className="service-video-overlay">
                  <div className="service-video-play">
                    <Play size={32} fill="#fff" color="#fff" />
                  </div>
                </div>
                <p className="service-video-title">{video.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="service-section service-section-white">
        <div className="container">
          <div className="service-about-grid">
            <div className="service-about-image-wrapper">
              <div className="service-about-image">
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                  alt="Jafet Henrique - Owner of JH Painting Services in Massachusetts"
                  fill
                  loading="lazy"
                  className="object-cover"
                  style={{ objectPosition: 'top center' }}
                />
              </div>
              <div className="service-about-experience">
                <div className="service-about-experience-number">15+</div>
                <div className="service-about-experience-label">Years Experience</div>
              </div>
            </div>

            <div className="service-about-content">
              <span className="service-section-badge">About Us</span>
              <h2>Meet Jafet Henrique, Your Interior Painting Expert</h2>
              <p>
                Founded with a passion for perfection, JH Painting Services has been transforming interiors across Massachusetts for over 15 years. Owner Jafet Henrique leads every project with dedication to quality and customer satisfaction.
              </p>
              <p>
                We understand that your interior reflects your personality. From cozy bedrooms to professional offices, we deliver flawless finishes that exceed expectations. Our attention to detail, clean work practices, and premium materials set us apart.
              </p>

              <div className="service-about-features">
                {features.map((item, idx) => (
                  <div key={idx} className="service-about-feature">
                    <item.icon size={24} />
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
        <div className="container">
          <div className="service-cta-content">
            <h2 className="service-cta-title">Ready to Transform Your Interior?</h2>
            <p className="service-cta-subtitle">
              Get a free estimate today and see the JH Painting difference. Professional results, on time and on budget.
            </p>
            <div className="service-cta-buttons">
              <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-btn-white">
                <Phone size={20} />
                Call {BUSINESS.phone}
              </a>
              <Link href="/#contact" className="service-cta-btn-outline">
                Request Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
