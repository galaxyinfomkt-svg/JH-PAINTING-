'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { Phone, CheckCircle2, Star, ArrowRight, Paintbrush, Home, Building2, PaintBucket, Hammer } from 'lucide-react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { BUSINESS, FORM_IDS } from '@/lib/constants'

// Service data
const services = [
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    shortDesc: 'Transform your indoor spaces',
    description: 'Professional interior painting services that bring new life to your walls, ceilings, trim, and more. Expert color consultation and premium paints included.',
    icon: Paintbrush,
    features: ['Wall & Ceiling Painting', 'Trim & Baseboard Work', 'Color Consultation', 'Premium Paints'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png'
  },
  {
    slug: 'exterior-painting',
    name: 'Exterior Painting',
    shortDesc: 'Protect and beautify your home',
    description: 'Weather-resistant exterior painting that protects your home while boosting curb appeal. Complete prep work, premium paints, and lasting results.',
    icon: Home,
    features: ['Full Surface Preparation', 'Weather-Resistant Paints', 'Siding & Trim', 'Deck & Porch Painting'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064e65773e16aacef7d054.png'
  },
  {
    slug: 'commercial-painting',
    name: 'Commercial Painting',
    shortDesc: 'Professional business painting',
    description: 'Commercial painting services for offices, retail spaces, restaurants, and warehouses. Minimal disruption to your operations with flexible scheduling.',
    icon: Building2,
    features: ['Office Buildings', 'Retail Spaces', 'Restaurants', 'Warehouses'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064e65773e16aacef7d054.png'
  },
  {
    slug: 'residential-painting',
    name: 'Residential Painting',
    shortDesc: 'Complete home painting solutions',
    description: 'Full-service residential painting for homeowners across Massachusetts. Interior, exterior, and specialty finishes for your entire home.',
    icon: Home,
    features: ['Whole Home Painting', 'Room-by-Room Service', 'New Construction', 'Remodel Projects'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png'
  },
  {
    slug: 'cabinet-painting',
    name: 'Cabinet Painting',
    shortDesc: 'Refresh your kitchen for less',
    description: 'Transform your kitchen with professional cabinet refinishing. Save up to 70% compared to replacement while achieving a factory-quality finish.',
    icon: PaintBucket,
    features: ['Kitchen Cabinets', 'Bathroom Vanities', 'Built-in Units', 'Factory Finish'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png'
  },
  {
    slug: 'carpentry',
    name: 'Carpentry',
    shortDesc: 'Expert wood repairs & trim',
    description: 'Professional carpentry services for window frames, door frames, siding, decks, and trim. Quality wood repairs before painting ensure lasting results.',
    icon: Hammer,
    features: ['Window Frame Repair', 'Door Frame Repair', 'Siding & Deck Repair', 'Trim & Molding'],
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'
  }
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

      <Header />

      {/* Hero Section */}
      <section className="service-hero" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="service-hero-content" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            {/* Trust Badges */}
            <div className="trust-badges" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
              <span className="trust-badge">
                <Star size={14} fill="#FFD700" color="#FFD700" />
                5.0 Google Rating
              </span>
              <span className="trust-badge">
                <CheckCircle2 size={14} />
                Licensed & Insured
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', marginBottom: '1rem' }}>
              Professional Painting Services in Massachusetts
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
              From interior makeovers to exterior transformations, we deliver exceptional painting results for homes and businesses across the Bay State.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#services-list" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Explore Our Services
                <ArrowRight size={18} />
              </a>
              <a href={`tel:${BUSINESS.phoneRaw}`} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={18} />
                {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-list" style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '1rem', color: '#0F172A' }}>
              Our Painting Services
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
              Choose from our comprehensive range of professional painting services
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.slug} style={{
                  background: '#fff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Service Image */}
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'linear-gradient(135deg, #D20404, #A80303)',
                      borderRadius: '12px',
                      padding: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={24} color="#fff" />
                    </div>
                  </div>

                  {/* Service Content */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.375rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0F172A' }}>
                      {service.name}
                    </h3>
                    <p style={{ color: '#64748B', marginBottom: '1rem', lineHeight: '1.6' }}>
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', flex: 1 }}>
                      {service.features.map((feature, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.35rem 0',
                          color: '#475569',
                          fontSize: '0.9375rem'
                        }}>
                          <CheckCircle2 size={16} color="#22C55E" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link href={`/services/${service.slug}`} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.875rem 1.5rem',
                      background: 'linear-gradient(135deg, #D20404, #A80303)',
                      color: '#fff',
                      borderRadius: '10px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}>
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
      <section style={{ padding: '80px 0', background: '#0F172A' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>
              Why Choose JH Painting Services?
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto' }}>
              We're committed to delivering exceptional quality on every project
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { title: 'Licensed & Insured', desc: 'Full coverage for your peace of mind' },
              { title: '5-Star Reviews', desc: '40+ perfect ratings from happy customers' },
              { title: 'Premium Paints', desc: 'Benjamin Moore & Sherwin-Williams' },
              { title: 'Free Estimates', desc: 'No-obligation quotes within 24 hours' }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <CheckCircle2 size={32} color="#22C55E" style={{ marginBottom: '1rem' }} />
                <h3 style={{ color: '#fff', fontWeight: '600', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #D20404, #A80303)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>
              Ready to Transform Your Space?
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem' }}>
              Get a free, no-obligation estimate for your painting project. We'll respond within 24 hours!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`tel:${BUSINESS.phoneRaw}`} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: '#fff',
                color: '#D20404',
                borderRadius: '10px',
                fontWeight: '700',
                textDecoration: 'none',
                fontSize: '1.125rem'
              }}>
                <Phone size={20} />
                {BUSINESS.phone}
              </a>
              <Link href="/#contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: 'transparent',
                color: '#fff',
                borderRadius: '10px',
                fontWeight: '600',
                textDecoration: 'none',
                fontSize: '1.125rem',
                border: '2px solid rgba(255,255,255,0.5)'
              }}>
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
