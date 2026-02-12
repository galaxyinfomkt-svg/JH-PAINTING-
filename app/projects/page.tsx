'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, X, ChevronLeft, ChevronRight, Play, Sparkles, Award, Users, Star, ArrowRight, Expand, Grid3X3, LayoutGrid } from '@/app/components/icons'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider'
import { BUSINESS } from '@/lib/constants'

// All project images organized by category
const allProjects = [
  // Exterior Projects
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Professional exterior house painting services in Massachusetts by JH Painting', category: 'Exterior', featured: true },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'Expert house painters in Waltham MA - exterior painting project', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp', alt: 'Professional exterior house painting in Massachusetts', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Historic church exterior painting in Waltham MA', category: 'Exterior', featured: true },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a39f38441b1a824eef7d0.webp', alt: 'House exterior after professional painting', category: 'Exterior' },

  // Interior Projects
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Professional interior painting contractors in Massachusetts', category: 'Interior', featured: true },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Bedroom interior painting services in Massachusetts by JH Painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg', alt: 'Historic church restoration interior painting in Waltham MA', category: 'Interior', featured: true },

  // Cabinet Projects
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Kitchen cabinet refinishing and painting services in MA', category: 'Cabinets', featured: true },

  // Floor & Deck Projects
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Hardwood floor refinishing services in Massachusetts by JH Painting', category: 'Floors' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp', alt: 'Professional deck staining and power washing MA', category: 'Deck', featured: true },

  // Staircase Projects
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a3027a03db26c93445285.webp', alt: 'Professional staircase refinishing Massachusetts', category: 'Staircase' },
]

// Before/After transformation pairs
const beforeAfterPairs = [
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23ad3443ab5.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg',
    beforeAlt: 'Historic church interior before restoration in Waltham MA',
    afterAlt: 'Historic church interior after professional restoration in Waltham MA',
    title: 'Church Interior Restoration',
    location: 'Waltham, MA'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23bb3443ab4.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg',
    beforeAlt: 'Historic church exterior before painting in Waltham MA',
    afterAlt: 'Historic church exterior after professional painting in Waltham MA',
    title: 'Church Exterior Painting',
    location: 'Waltham, MA'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac7eb2da7db4eacd6a2.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp',
    beforeAlt: 'Residential exterior before painting',
    afterAlt: 'Residential exterior after professional painting',
    title: 'Residential Exterior',
    location: 'Massachusetts'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a30277f301b94ac7227dc.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp',
    beforeAlt: 'Deck before power washing and staining',
    afterAlt: 'Deck after professional power washing and staining',
    title: 'Deck Restoration',
    location: 'Massachusetts'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a30274e42b930842eea35.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a3027a03db26c93445285.webp',
    beforeAlt: 'Staircase before refinishing',
    afterAlt: 'Staircase after professional refinishing',
    title: 'Staircase Refinishing',
    location: 'Massachusetts'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a39f37b4d1e5cbf3c1272.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a39f38441b1a824eef7d0.webp',
    beforeAlt: 'House exterior before painting',
    afterAlt: 'House exterior after professional painting',
    title: 'Exterior House Painting',
    location: 'Massachusetts'
  }
]

const categories = ['All', 'Exterior', 'Interior', 'Cabinets', 'Floors', 'Deck', 'Staircase']

const stats = [
  { number: '500+', label: 'Projects Completed', icon: Sparkles },
  { number: '7+', label: 'Years Experience', icon: Award },
  { number: '100%', label: 'Satisfaction Rate', icon: Star },
  { number: '40+', label: '5-Star Reviews', icon: Users },
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry')
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === selectedCategory)

  const featuredProjects = allProjects.filter(p => p.featured)

  const openLightbox = (src: string) => {
    const index = filteredProjects.findIndex(p => p.src === src)
    setLightboxIndex(index)
    setLightboxImage(src)
  }

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredProjects.length
    setLightboxIndex(nextIndex)
    setLightboxImage(filteredProjects[nextIndex].src)
  }

  const prevImage = () => {
    const prevIndex = (lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length
    setLightboxIndex(prevIndex)
    setLightboxImage(filteredProjects[prevIndex].src)
  }

  return (
    <>
      <Header />

      <main className="projects-page">
        {/* Immersive Hero Section */}
        <section className="projects-hero" ref={heroRef}>
          <div className="hero-background">
            <div className="hero-image-grid">
              {featuredProjects.slice(0, 6).map((project, idx) => (
                <div key={idx} className={`hero-grid-item hero-grid-item-${idx + 1}`}>
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    sizes="50vw"
                    style={{ objectFit: 'cover' }}
                    priority={idx < 2}
                  />
                </div>
              ))}
            </div>
            <div className="hero-overlay" />
          </div>

          <div className="container">
            <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
              <div className="hero-badge">
                <Sparkles size={16} />
                <span>Premium Portfolio</span>
              </div>
              <h1>
                <span className="hero-title-line">Transforming Spaces</span>
                <span className="hero-title-line hero-title-accent">Creating Masterpieces</span>
              </h1>
              <p className="hero-description">
                Every project tells a story of transformation. Explore our collection of
                stunning painting projects across Massachusetts — from historic restorations
                to modern home makeovers.
              </p>
              <div className="hero-stats">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon
                  return (
                    <div key={idx} className="hero-stat">
                      <Icon size={20} className="hero-stat-icon" />
                      <span className="hero-stat-number">{stat.number}</span>
                      <span className="hero-stat-label">{stat.label}</span>
                    </div>
                  )
                })}
              </div>
              <div className="hero-cta">
                <a href="#transformations" className="btn-hero-primary">
                  <Play size={18} />
                  View Transformations
                </a>
                <a href="#gallery" className="btn-hero-secondary">
                  Browse Gallery
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="hero-scroll-indicator">
            <div className="scroll-mouse">
              <div className="scroll-wheel" />
            </div>
            <span>Scroll to explore</span>
          </div>
        </section>

        {/* Before/After Transformations */}
        <section className="transformations-section" id="transformations">
          <div className="container">
            <div className="section-header-modern">
              <div className="section-header-content">
                <span className="section-badge">
                  <Sparkles size={14} />
                  See The Magic
                </span>
                <h2>Before & After Transformations</h2>
                <p>Drag the slider to witness the incredible transformations we deliver.
                   Each project represents our commitment to excellence.</p>
              </div>
            </div>

            <div className="transformations-grid">
              {beforeAfterPairs.map((pair, idx) => (
                <div key={idx} className="transformation-card">
                  <div className="transformation-slider-wrapper">
                    <BeforeAfterSlider
                      beforeImage={pair.before}
                      afterImage={pair.after}
                      beforeAlt={pair.beforeAlt}
                      afterAlt={pair.afterAlt}
                    />
                  </div>
                  <div className="transformation-info">
                    <h3>{pair.title}</h3>
                    <span className="transformation-location">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {pair.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="gallery-section" id="gallery">
          <div className="container">
            <div className="gallery-header">
              <div className="gallery-header-left">
                <span className="section-badge">
                  <Award size={14} />
                  Our Work
                </span>
                <h2>Project Gallery</h2>
                <p>Browse our complete collection of painting masterpieces</p>
              </div>

              <div className="gallery-controls">
                <div className="view-toggle">
                  <button
                    type="button"
                    className={`view-btn ${viewMode === 'masonry' ? 'active' : ''}`}
                    onClick={() => setViewMode('masonry')}
                    aria-label="Masonry view"
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    type="button"
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="filter-container">
              <div className="filter-pills">
                {categories.map(cat => (
                  <button
                    type="button"
                    key={cat}
                    className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                    {selectedCategory === cat && (
                      <span className="filter-count">
                        {cat === 'All' ? allProjects.length : allProjects.filter(p => p.category === cat).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className={`gallery-grid ${viewMode}`}>
              {filteredProjects.map((project, idx) => (
                <div
                  key={idx}
                  className={`gallery-item ${project.featured ? 'featured' : ''} gallery-item-${idx}`}
                  onClick={() => openLightbox(project.src)}
                >
                  <div className="gallery-item-inner">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="gallery-item-overlay">
                      <div className="gallery-item-content">
                        <span className="gallery-item-category">{project.category}</span>
                        <p className="gallery-item-title">{project.alt}</p>
                        <button type="button" className="gallery-item-expand" aria-label="Expand image">
                          <Expand size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-background">
            <div className="cta-pattern" />
          </div>
          <div className="container">
            <div className="cta-content">
              <div className="cta-text">
                <span className="cta-badge">Start Your Project</span>
                <h2>Ready to Transform Your Space?</h2>
                <p>Join hundreds of satisfied Massachusetts homeowners who trusted us with their painting projects.</p>
              </div>
              <div className="cta-actions">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="cta-btn-primary">
                  <Phone size={20} />
                  <span>
                    <small>Call Now</small>
                    <strong>{BUSINESS.phone}</strong>
                  </span>
                </a>
                <Link href="/#contact" className="cta-btn-secondary">
                  Get Free Estimate
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Lightbox Modal */}
      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <div className="lightbox-backdrop" />
          <button type="button" className="lightbox-close" onClick={() => setLightboxImage(null)} aria-label="Close lightbox">
            <X size={28} />
          </button>

          <button type="button" className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Previous image">
            <ChevronLeft size={32} />
          </button>

          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="lightbox-image-wrapper">
              <Image
                src={lightboxImage}
                alt={filteredProjects[lightboxIndex]?.alt || 'Project image'}
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div className="lightbox-info">
              <span className="lightbox-counter">{lightboxIndex + 1} / {filteredProjects.length}</span>
              <p className="lightbox-caption">{filteredProjects[lightboxIndex]?.alt}</p>
            </div>
          </div>

          <button type="button" className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Next image">
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      <Footer />

      <style jsx>{`
        /* ========================================
           PROJECTS PAGE - MODERN STUNNING DESIGN
           ======================================== */

        .projects-page {
          --gradient-primary: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          --gradient-accent: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          --glass-bg: rgba(255, 255, 255, 0.03);
          --glass-border: rgba(255, 255, 255, 0.1);
        }

        /* ========================================
           IMMERSIVE HERO SECTION
           ======================================== */

        .projects-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 120px 0 80px;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-image-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 4px;
          opacity: 0.4;
        }

        .hero-grid-item {
          position: relative;
          overflow: hidden;
        }

        .hero-grid-item-1 { grid-column: 1; grid-row: 1; }
        .hero-grid-item-2 { grid-column: 2; grid-row: 1 / 3; }
        .hero-grid-item-3 { grid-column: 3; grid-row: 1; }
        .hero-grid-item-4 { grid-column: 1; grid-row: 2; }
        .hero-grid-item-5 { grid-column: 3; grid-row: 2; }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(15, 23, 42, 0.9) 0%,
            rgba(15, 23, 42, 0.95) 50%,
            rgba(15, 23, 42, 1) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gradient-accent);
          color: white;
          padding: 10px 20px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
        }

        .projects-hero h1 {
          margin: 0 0 1.5rem;
        }

        .hero-title-line {
          display: block;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          color: white;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .hero-title-accent {
          background: linear-gradient(90deg, #f97316, #dc2626, #f97316);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        .hero-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 1.5rem 2rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          min-width: 140px;
        }

        .hero-stat-icon {
          color: #dc2626;
          margin-bottom: 4px;
        }

        .hero-stat-number {
          font-size: 1.75rem;
          font-weight: 800;
          color: white;
        }

        .hero-stat-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .hero-cta {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-hero-primary,
        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-hero-primary {
          background: var(--gradient-accent);
          color: white;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
        }

        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(220, 38, 38, 0.5);
        }

        .btn-hero-secondary {
          background: var(--glass-bg);
          color: white;
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(10px);
        }

        .btn-hero-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.8rem;
          animation: float 2s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        .scroll-mouse {
          width: 24px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }

        .scroll-wheel {
          width: 4px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 2px;
          animation: scroll-wheel 1.5s ease-in-out infinite;
        }

        @keyframes scroll-wheel {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.3; transform: translateY(6px); }
        }

        /* ========================================
           TRANSFORMATIONS SECTION
           ======================================== */

        .transformations-section {
          padding: 100px 0;
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
        }

        .section-header-modern {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
          border: 1px solid rgba(220, 38, 38, 0.2);
        }

        .section-header-modern h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: white;
          margin: 0 0 1rem;
        }

        .section-header-modern p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .transformations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .transformation-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .transformation-card:hover {
          transform: translateY(-8px);
          border-color: rgba(220, 38, 38, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .transformation-slider-wrapper {
          aspect-ratio: 16/10;
        }

        .transformation-info {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .transformation-info h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .transformation-location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .transformation-location svg {
          width: 14px;
          height: 14px;
        }

        /* ========================================
           GALLERY SECTION
           ======================================== */

        .gallery-section {
          padding: 100px 0;
          background: #f8fafc;
        }

        .gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .gallery-header-left h2 {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #0f172a;
          margin: 0.5rem 0;
        }

        .gallery-header-left p {
          color: #64748b;
          margin: 0;
        }

        .gallery-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .view-toggle {
          display: flex;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 4px;
        }

        .view-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          border-radius: 8px;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-btn.active {
          background: #0f172a;
          color: white;
        }

        .view-btn:hover:not(.active) {
          background: #f1f5f9;
        }

        .filter-container {
          margin-bottom: 3rem;
        }

        .filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-pill:hover {
          border-color: #dc2626;
          color: #dc2626;
        }

        .filter-pill.active {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }

        .filter-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 24px;
          padding: 0 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        /* Gallery Grid Layouts */
        .gallery-grid {
          display: grid;
          gap: 1.5rem;
        }

        .gallery-grid.masonry {
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-auto-rows: 250px;
        }

        .gallery-grid.masonry .gallery-item.featured {
          grid-row: span 2;
        }

        .gallery-grid.grid {
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        }

        .gallery-item {
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gallery-item-inner {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 250px;
        }

        .gallery-grid.grid .gallery-item-inner {
          aspect-ratio: 4/3;
        }

        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.3) 40%,
            transparent 100%
          );
          opacity: 0;
          transition: all 0.4s ease;
          display: flex;
          align-items: flex-end;
        }

        .gallery-item:hover .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-item:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        .gallery-item-content {
          padding: 2rem;
          width: 100%;
        }

        .gallery-item-category {
          display: inline-block;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.75rem;
        }

        .gallery-item-title {
          color: white;
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .gallery-item-expand {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s ease;
        }

        .gallery-item:hover .gallery-item-expand {
          opacity: 1;
          transform: scale(1);
        }

        .gallery-item-expand:hover {
          background: white;
          color: #0f172a;
        }

        /* ========================================
           CTA SECTION
           ======================================== */

        .cta-section {
          position: relative;
          padding: 100px 0;
          overflow: hidden;
        }

        .cta-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        }

        .cta-pattern {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .cta-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .cta-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }

        .cta-text h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: white;
          margin: 0 0 1rem;
        }

        .cta-text p {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          max-width: 500px;
        }

        .cta-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cta-btn-primary {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 28px;
          background: white;
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .cta-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .cta-btn-primary svg {
          width: 24px;
          height: 24px;
          color: #dc2626;
        }

        .cta-btn-primary span {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .cta-btn-primary small {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cta-btn-primary strong {
          font-size: 1.25rem;
          color: #0f172a;
        }

        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 28px;
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          color: white;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .cta-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        /* ========================================
           LIGHTBOX
           ======================================== */

        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .lightbox-prev {
          left: 20px;
        }

        .lightbox-next {
          right: 20px;
        }

        .lightbox-content {
          position: relative;
          z-index: 5;
          width: calc(100% - 200px);
          height: calc(100% - 120px);
          max-width: 1400px;
        }

        .lightbox-image-wrapper {
          position: relative;
          width: 100%;
          height: calc(100% - 60px);
        }

        .lightbox-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding-top: 1rem;
        }

        .lightbox-counter {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }

        .lightbox-caption {
          color: white;
          font-size: 0.95rem;
          text-align: center;
          margin: 0;
        }

        /* ========================================
           RESPONSIVE DESIGN
           ======================================== */

        @media (max-width: 1024px) {
          .hero-image-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .hero-grid-item-2 {
            grid-column: 2;
            grid-row: 1;
          }

          .hero-grid-item-3,
          .hero-grid-item-5 {
            display: none;
          }

          .transformations-grid {
            grid-template-columns: 1fr;
          }

          .lightbox-content {
            width: calc(100% - 100px);
          }
        }

        @media (max-width: 768px) {
          .projects-hero {
            padding: 100px 0 60px;
            min-height: auto;
          }

          .hero-image-grid {
            display: none;
          }

          .hero-overlay {
            background: var(--gradient-primary);
          }

          .hero-stats {
            gap: 1rem;
          }

          .hero-stat {
            padding: 1rem;
            min-width: 100px;
          }

          .hero-stat-number {
            font-size: 1.5rem;
          }

          .hero-scroll-indicator {
            display: none;
          }

          .gallery-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .gallery-grid.masonry,
          .gallery-grid.grid {
            grid-template-columns: 1fr;
          }

          .gallery-grid.masonry .gallery-item.featured {
            grid-row: span 1;
          }

          .cta-content {
            flex-direction: column;
            text-align: center;
          }

          .cta-text {
            text-align: center;
          }

          .cta-text p {
            margin: 0 auto;
          }

          .cta-actions {
            width: 100%;
          }

          .cta-btn-primary {
            justify-content: center;
          }

          .lightbox-content {
            width: calc(100% - 40px);
            height: calc(100% - 80px);
          }

          .lightbox-nav {
            width: 44px;
            height: 44px;
          }

          .lightbox-prev {
            left: 10px;
          }

          .lightbox-next {
            right: 10px;
          }

          .filter-pill {
            padding: 10px 18px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .hero-badge {
            font-size: 0.75rem;
            padding: 8px 14px;
          }

          .hero-stats {
            flex-direction: column;
            align-items: center;
          }

          .hero-stat {
            width: 100%;
            max-width: 200px;
          }

          .btn-hero-primary,
          .btn-hero-secondary {
            width: 100%;
            justify-content: center;
          }

          .filter-pills {
            gap: 0.5rem;
          }

          .filter-pill {
            padding: 8px 14px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  )
}
