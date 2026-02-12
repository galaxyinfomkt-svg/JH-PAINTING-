'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, CheckCircle2, Star, Shield, Award, Clock, Users, MapPin, Play, ChevronRight, Heart, Sparkles } from '@/app/components/icons'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import LazyIframe from '@/app/components/LazyIframe'
import { BUSINESS, FORM_IDS } from '@/lib/constants'

// Testimonials data
const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Marlborough, MA',
    rating: 5,
    text: "JH Painting transformed our home! The attention to detail was incredible. They were professional, clean, and the results exceeded our expectations. Highly recommend!",
    project: 'Exterior Painting'
  },
  {
    name: 'Michael R.',
    location: 'Worcester, MA',
    rating: 5,
    text: "Best painting company we've ever worked with. Fair pricing, excellent communication, and the quality of work is outstanding. Our kitchen cabinets look brand new!",
    project: 'Cabinet Refinishing'
  },
  {
    name: 'Jennifer L.',
    location: 'Framingham, MA',
    rating: 5,
    text: "From estimate to completion, everything was seamless. The team was respectful of our home and the paint job is flawless. Will definitely use again!",
    project: 'Interior Painting'
  }
]

// Pain points that resonate with homeowners
const painPoints = [
  {
    title: "Tired of Looking at Peeling, Faded Paint?",
    description: "Your home's exterior is the first thing people see. Cracked, peeling paint doesn't just look bad—it exposes your home to water damage, rot, and expensive repairs."
  },
  {
    title: "Worried About Hiring the Wrong Contractor?",
    description: "Horror stories of painters who don't show up, leave a mess, or do sloppy work. You deserve a professional team that treats your home with respect."
  },
  {
    title: "Concerned About Fair Pricing?",
    description: "Getting quotes that are all over the map? We provide transparent, detailed estimates with no hidden fees or surprise charges."
  }
]

// What makes JH different
const differentiators = [
  { icon: Shield, title: '$2M Liability Insurance', desc: 'Your home is fully protected on every project' },
  { icon: Award, title: 'Premium Paints Only', desc: 'Benjamin Moore & Sherwin-Williams exclusively' },
  { icon: Clock, title: 'On-Time Completion', desc: 'We respect your schedule and complete when promised' },
  { icon: Users, title: '10+ Years Experience', desc: 'Skilled craftsmen who take pride in their work' },
  { icon: Star, title: '5.0 Google Rating', desc: '40+ perfect reviews from happy customers' },
  { icon: Heart, title: 'Satisfaction Guaranteed', desc: 'We stand behind every project we complete' }
]

// Stats
const stats = [
  { number: '500+', label: 'Homes Painted' },
  { number: '40+', label: '5-Star Reviews' },
  { number: '116', label: 'Cities Served' },
  { number: '7+', label: 'Years in Business' }
]

export default function VSLPage() {
  const [activeVideo, setActiveVideo] = useState<'exterior' | 'interior'>('exterior')

  return (
    <>
      <Header />

      <main>
        {/* Hero Section with Video */}
        <section className="vsl-hero">
          <div className="container">
            <div className="vsl-hero-content">
              <div className="vsl-hero-badges">
                <span className="vsl-badge">
                  <MapPin size={16} />
                  Serving All Massachusetts
                </span>
                <span className="vsl-badge vsl-badge-rating">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  5.0 Rating
                </span>
              </div>

              <h1>
                Transform Your Home with{' '}
                <span className="vsl-hero-accent">Massachusetts' Most Trusted Painters</span>
              </h1>

              <p className="vsl-hero-subtitle">
                Watch how we've helped hundreds of homeowners across Massachusetts protect and beautify their homes with professional painting services.
              </p>
            </div>

            {/* Video Player */}
            <div className="vsl-video-section">
              <div className="vsl-video-tabs">
                <button
                  className={`vsl-video-tab ${activeVideo === 'exterior' ? 'active' : ''}`}
                  onClick={() => setActiveVideo('exterior')}
                >
                  <Play size={16} />
                  Exterior Painting
                </button>
                <button
                  className={`vsl-video-tab ${activeVideo === 'interior' ? 'active' : ''}`}
                  onClick={() => setActiveVideo('interior')}
                >
                  <Play size={16} />
                  Interior Painting
                </button>
              </div>

              <div className="vsl-video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo === 'exterior' ? 'F_lreXzNlUI' : 'LkT_HLyKibY'}?rel=0&modestbranding=1`}
                  title={activeVideo === 'exterior' ? 'JH Painting Exterior Work' : 'JH Painting Interior Work'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="vsl-video-iframe"
                />
              </div>
            </div>

            {/* CTA below video */}
            <div className="vsl-hero-cta">
              <a href={`tel:${BUSINESS.phoneRaw}`} className="btn btn-primary btn-xl">
                <Phone size={24} />
                Call Now: {BUSINESS.phone}
              </a>
              <span className="vsl-cta-text">Free estimates • No obligation</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="vsl-stats">
          <div className="container">
            <div className="vsl-stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="vsl-stat">
                  <span className="vsl-stat-number">{stat.number}</span>
                  <span className="vsl-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="vsl-pain-section">
          <div className="container">
            <div className="vsl-section-header">
              <span className="vsl-eyebrow">Sound Familiar?</span>
              <h2>The Struggles Every Homeowner Faces</h2>
            </div>

            <div className="vsl-pain-grid">
              {painPoints.map((pain, idx) => (
                <div key={idx} className="vsl-pain-card">
                  <h3>{pain.title}</h3>
                  <p>{pain.description}</p>
                </div>
              ))}
            </div>

            <div className="vsl-solution-box">
              <h3>The Solution? A Painting Company That Actually Cares.</h3>
              <p>
                JH Painting Services has helped over 500 Massachusetts homeowners transform their properties with professional, hassle-free painting services. We show up on time, communicate clearly, and deliver results that exceed expectations.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="vsl-why-section">
          <div className="container">
            <div className="vsl-section-header">
              <span className="vsl-eyebrow">Why JH Painting?</span>
              <h2>What Makes Us Different</h2>
            </div>

            <div className="vsl-why-grid">
              {differentiators.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="vsl-why-card">
                    <div className="vsl-why-icon">
                      <Icon size={32} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="vsl-testimonials">
          <div className="container">
            <div className="vsl-section-header">
              <span className="vsl-eyebrow">Real Results</span>
              <h2>What Our Customers Say</h2>
            </div>

            <div className="vsl-testimonials-grid">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="vsl-testimonial-card">
                  <div className="vsl-testimonial-stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#FFB800" color="#FFB800" />
                    ))}
                  </div>
                  <p className="vsl-testimonial-text">"{testimonial.text}"</p>
                  <div className="vsl-testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.location}</span>
                    <span className="vsl-testimonial-project">{testimonial.project}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="vsl-final-cta">
          <div className="container">
            <div className="vsl-final-cta-content">
              <h2>Ready to Transform Your Home?</h2>
              <p>
                Join the 500+ Massachusetts homeowners who trust JH Painting Services for their painting projects. Get your free, no-obligation estimate today.
              </p>

              <div className="vsl-final-cta-form">
                <LazyIframe
                  src={`https://api.leadconnectorhq.com/widget/form/${FORM_IDS.servicePages}`}
                  title="Get Your Free Estimate"
                  className="vsl-form-iframe"
                />
              </div>

              <div className="vsl-final-cta-phone">
                <span>Or call us directly:</span>
                <a href={`tel:${BUSINESS.phoneRaw}`} className="vsl-phone-link">
                  <Phone size={24} />
                  {BUSINESS.phone}
                </a>
              </div>

              <div className="vsl-trust-badges">
                <div className="vsl-trust-badge">
                  <Shield size={20} />
                  <span>$2M Insured</span>
                </div>
                <div className="vsl-trust-badge">
                  <Award size={20} />
                  <span>Licensed Pro</span>
                </div>
                <div className="vsl-trust-badge">
                  <Star size={20} />
                  <span>5.0 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .vsl-hero {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 100px 0 60px;
          text-align: center;
        }

        .vsl-hero-content {
          max-width: 900px;
          margin: 0 auto 3rem;
        }

        .vsl-hero-badges {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .vsl-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.1);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.9);
        }

        .vsl-badge-rating {
          background: rgba(255,184,0,0.2);
          color: #FFB800;
        }

        .vsl-hero h1 {
          font-size: 2.75rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .vsl-hero-accent {
          color: var(--jh-red);
        }

        .vsl-hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.8);
          max-width: 700px;
          margin: 0 auto;
        }

        .vsl-video-section {
          max-width: 900px;
          margin: 0 auto 2rem;
        }

        .vsl-video-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .vsl-video-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: 2px solid rgba(255,255,255,0.3);
          background: transparent;
          color: rgba(255,255,255,0.8);
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .vsl-video-tab:hover {
          border-color: var(--jh-red);
          color: white;
        }

        .vsl-video-tab.active {
          background: var(--jh-red);
          border-color: var(--jh-red);
          color: white;
        }

        .vsl-video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .vsl-video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .vsl-hero-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .vsl-hero-cta .btn-xl {
          font-size: 1.25rem;
          padding: 1rem 2.5rem;
        }

        .vsl-cta-text {
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
        }

        .vsl-stats {
          padding: 60px 0;
          background: #f8fafc;
        }

        .vsl-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .vsl-stat {
          text-align: center;
        }

        .vsl-stat-number {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          color: var(--jh-red);
        }

        .vsl-stat-label {
          font-size: 1rem;
          color: #64748b;
        }

        .vsl-section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .vsl-eyebrow {
          display: inline-block;
          background: rgba(210,4,4,0.1);
          color: var(--jh-red);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .vsl-section-header h2 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #1e293b;
        }

        .vsl-pain-section {
          padding: 80px 0;
          background: white;
        }

        .vsl-pain-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .vsl-pain-card {
          padding: 2rem;
          background: #fef2f2;
          border-radius: 16px;
          border-left: 4px solid var(--jh-red);
        }

        .vsl-pain-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .vsl-pain-card p {
          color: #64748b;
          line-height: 1.7;
        }

        .vsl-solution-box {
          background: linear-gradient(135deg, var(--jh-red) 0%, var(--jh-red-dark) 100%);
          padding: 3rem;
          border-radius: 16px;
          text-align: center;
          color: white;
        }

        .vsl-solution-box h3 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
        }

        .vsl-solution-box p {
          font-size: 1.125rem;
          max-width: 800px;
          margin: 0 auto;
          opacity: 0.95;
        }

        .vsl-why-section {
          padding: 80px 0;
          background: #f8fafc;
        }

        .vsl-why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .vsl-why-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .vsl-why-icon {
          width: 70px;
          height: 70px;
          background: rgba(210,4,4,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--jh-red);
        }

        .vsl-why-card h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .vsl-why-card p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .vsl-testimonials {
          padding: 80px 0;
          background: white;
        }

        .vsl-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .vsl-testimonial-card {
          background: #f8fafc;
          padding: 2rem;
          border-radius: 16px;
        }

        .vsl-testimonial-stars {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .vsl-testimonial-text {
          font-size: 1rem;
          color: #475569;
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 1.5rem;
        }

        .vsl-testimonial-author {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .vsl-testimonial-author strong {
          color: #1e293b;
        }

        .vsl-testimonial-author span {
          font-size: 0.875rem;
          color: #64748b;
        }

        .vsl-testimonial-project {
          color: var(--jh-red) !important;
          font-weight: 600;
        }

        .vsl-final-cta {
          padding: 80px 0;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        }

        .vsl-final-cta-content {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
          color: white;
        }

        .vsl-final-cta h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .vsl-final-cta p {
          font-size: 1.125rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .vsl-final-cta-form {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .vsl-form-iframe {
          width: 100%;
          min-height: 450px;
          border: none;
        }

        .vsl-final-cta-phone {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .vsl-final-cta-phone span {
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .vsl-phone-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--jh-red);
          text-decoration: none;
        }

        .vsl-trust-badges {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .vsl-trust-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .vsl-why-grid,
          .vsl-testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .vsl-pain-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .vsl-hero {
            padding: 80px 0 40px;
          }

          .vsl-hero h1 {
            font-size: 1.75rem;
          }

          .vsl-hero-subtitle {
            font-size: 1rem;
          }

          .vsl-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .vsl-why-grid,
          .vsl-testimonials-grid {
            grid-template-columns: 1fr;
          }

          .vsl-final-cta h2 {
            font-size: 1.75rem;
          }

          .vsl-video-tabs {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  )
}
