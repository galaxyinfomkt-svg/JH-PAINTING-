'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Clock,
  Calendar,
  Tag,
  ArrowLeft,
  Share2,
  Facebook,
  Linkedin,
  Home as HomeIcon,
  Paintbrush,
  Palette,
  Building2,
  PaintBucket,
  Star,
  Shield,
  Check,
} from 'lucide-react'
import { BlogPost } from '../../data/blogPosts'

const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: HomeIcon, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
]

interface BlogPostClientProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://jhpaintingservices.com/blog/${post.slug}`

  // Generate Article schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://jhpaintingservices.com/blog/${post.slug}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "image": {
          "@type": "ImageObject",
          "url": post.image,
          "width": 1200,
          "height": 630
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
          "@type": "Person",
          "name": post.author,
          "url": "https://jhpaintingservices.com",
          "image": post.authorImage
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://jhpaintingservices.com/#organization",
          "name": "JH Painting Services",
          "logo": {
            "@type": "ImageObject",
            "url": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png",
            "width": 400,
            "height": 160
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://jhpaintingservices.com/blog/${post.slug}`
        },
        "keywords": post.tags.join(", "),
        "articleSection": post.category,
        "wordCount": post.content.split(/\s+/).length,
        "inLanguage": "en-US"
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
            "name": "Blog",
            "item": "https://jhpaintingservices.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://jhpaintingservices.com/blog/${post.slug}`
          }
        ]
      }
    ]
  }

  return (
    <>
      {/* Article Schema JSON-LD */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

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
                        <Link key={index} href={service.href} className="nav-dropdown-item">
                          <div className="nav-dropdown-item-icon"><Icon size={20} /></div>
                          <div className="nav-dropdown-item-content">
                            <span className="nav-dropdown-item-title">{service.name}</span>
                            <span className="nav-dropdown-item-desc">{service.description}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  <Link href="/services" className="nav-dropdown-footer">
                    View All Services <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
              <Link href="/blog" className="nav-active">Blog</Link>
              <Link href="/#reviews">Reviews</Link>
              <Link href="/#contact">Contact</Link>
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

        {/* Mobile Menu */}
        <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu} />
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
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/#about" onClick={closeMenu}>About</Link>
            <div className="mobile-nav-dropdown">
              <button
                type="button"
                className={`mobile-nav-dropdown-toggle ${mobileServicesOpen ? 'open' : ''}`}
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                Services
                <ChevronDown size={18} className={`mobile-nav-dropdown-icon ${mobileServicesOpen ? 'open' : ''}`} />
              </button>
              <div className={`mobile-nav-dropdown-content ${mobileServicesOpen ? 'open' : ''}`}>
                {menuServices.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <Link key={index} href={service.href} onClick={closeMenu} className="mobile-nav-dropdown-item">
                      <div className="mobile-nav-dropdown-item-icon"><Icon size={18} /></div>
                      <div className="mobile-nav-dropdown-item-content">
                        <span className="mobile-nav-dropdown-item-title">{service.name}</span>
                        <span className="mobile-nav-dropdown-item-desc">{service.description}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
            <Link href="/blog" onClick={closeMenu}>Blog</Link>
            <Link href="/#reviews" onClick={closeMenu}>Reviews</Link>
            <Link href="/#contact" onClick={closeMenu}>Contact</Link>
          </div>
          <a href="tel:+15086908886" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
            <Phone size={18} />
            (508) 690-8886
          </a>
        </nav>
      </header>

      <main>
        {/* Breadcrumb */}
        <div className="blog-breadcrumb">
          <div className="container">
            <Link href="/blog" className="blog-breadcrumb-back">
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
            <nav className="blog-breadcrumb-nav">
              <Link href="/">Home</Link>
              <ChevronRight size={14} />
              <Link href="/blog">Blog</Link>
              <ChevronRight size={14} />
              <span>{post.category}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <article className="blog-article">
          <div className="container">
            <header className="blog-article-header">
              <div className="blog-article-category">{post.category}</div>
              <h1>{post.title}</h1>
              <div className="blog-article-meta">
                <div className="blog-article-author">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={48}
                    height={48}
                    className="blog-article-author-image"
                  />
                  <div>
                    <span className="blog-article-author-name">{post.author}</span>
                    <span className="blog-article-author-title">Owner &amp; Expert Painter</span>
                  </div>
                </div>
                <div className="blog-article-info">
                  <span><Calendar size={14} /> {formatDate(post.date)}</span>
                  <span><Clock size={14} /> {post.readTime}</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="blog-article-image">
              <Image
                src={post.image}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>

            <div className="blog-article-layout">
              {/* Main Content */}
              <div className="blog-article-content">
                <div className="blog-article-body" dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />

                {/* Tags */}
                <div className="blog-article-tags">
                  <span className="blog-article-tags-label"><Tag size={16} /> Tags:</span>
                  {post.tags.map((tag) => (
                    <Link href={`/blog?tag=${tag}`} key={tag} className="blog-article-tag">
                      {tag}
                    </Link>
                  ))}
                </div>

                {/* Share */}
                <div className="blog-article-share">
                  <span className="blog-article-share-label"><Share2 size={16} /> Share this article:</span>
                  <div className="blog-article-share-buttons">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-share-btn facebook"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-share-btn twitter"
                    >
                      <X size={18} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-share-btn linkedin"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>

                {/* Author Box */}
                <div className="blog-author-box">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={100}
                    height={100}
                    className="blog-author-box-image"
                  />
                  <div className="blog-author-box-content">
                    <h4>About the Author</h4>
                    <h3>{post.author}</h3>
                    <p>Jafet is the owner and founder of JH Painting Services, bringing years of professional painting experience to Massachusetts homeowners. With a passion for quality craftsmanship and customer satisfaction, Jafet has built JH Painting into one of the most trusted painting contractors in the state.</p>
                    <div className="blog-author-box-stats">
                      <span><Star size={14} fill="currentColor" /> 5.0 Google Rating</span>
                      <span><Shield size={14} /> Licensed &amp; Insured</span>
                      <span><Check size={14} /> 200+ Projects Completed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="blog-sidebar">
                {/* CTA Card */}
                <div className="blog-sidebar-cta">
                  <h3>Need Professional Painting?</h3>
                  <p>Get a free estimate from Massachusetts&apos; trusted painting experts.</p>
                  <a href="tel:+15086908886" className="btn btn-primary btn-block">
                    <Phone size={18} />
                    (508) 690-8886
                  </a>
                  <Link href="/#contact" className="btn btn-outline btn-block">
                    Request Free Quote
                  </Link>
                </div>

                {/* Contact Form */}
                <div className="blog-sidebar-form">
                  <h4>Get Your Free Quote</h4>
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                    title="Contact Form"
                    loading="lazy"
                    className="blog-sidebar-form-iframe"
                  />
                </div>

                {/* Map */}
                <div className="blog-sidebar-map">
                  <h4>Our Service Area</h4>
                  <div className="blog-sidebar-map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1517205.5747339479!2d-71.68353554999999!3d42.0369155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60c735e8062f080f%3A0xecd39bea9de17cbf!2sJH%20Painting%20Services!5e0!3m2!1sen!2sbr!4v1768058870291!5m2!1sen!2sbr"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="JH Painting Services Location"
                    />
                  </div>
                  <p className="blog-sidebar-map-text">Serving 114+ cities across Massachusetts</p>
                </div>

                {/* Services */}
                <div className="blog-sidebar-card">
                  <h4>Our Services</h4>
                  <ul className="blog-sidebar-services">
                    <li><Link href="/services/interior-painting"><Paintbrush size={16} /> Interior Painting</Link></li>
                    <li><Link href="/services/exterior-painting"><HomeIcon size={16} /> Exterior Painting</Link></li>
                    <li><Link href="/services/cabinet-painting"><Palette size={16} /> Cabinet Painting</Link></li>
                    <li><Link href="/services/commercial-painting"><Building2 size={16} /> Commercial Painting</Link></li>
                    <li><Link href="/services/residential-painting"><PaintBucket size={16} /> Residential Painting</Link></li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="blog-sidebar-card">
                  <h4>Contact Us</h4>
                  <div className="blog-sidebar-contact">
                    <a href="tel:+15086908886"><Phone size={16} /> (508) 690-8886</a>
                    <a href="mailto:contact@jhpaintingservices.com"><Mail size={16} /> contact@jhpaintingservices.com</a>
                    <span><MapPin size={16} /> Marlborough, Massachusetts</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="blog-related-section">
            <div className="container">
              <h2>Related Articles</h2>
              <div className="blog-related-grid">
                {relatedPosts.map((relatedPost) => (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.slug} className="blog-post-card">
                    <div className="blog-post-image">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="blog-post-category">{relatedPost.category}</div>
                    </div>
                    <div className="blog-post-content">
                      <div className="blog-post-meta">
                        <span><Calendar size={12} /> {formatDate(relatedPost.date)}</span>
                        <span><Clock size={12} /> {relatedPost.readTime}</span>
                      </div>
                      <h3>{relatedPost.title}</h3>
                      <p>{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="blog-related-more">
                <Link href="/blog" className="btn btn-outline btn-lg">
                  View All Articles
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Transform Your Space?</h2>
              <p>Expert painting services backed by 5-star reviews. Free estimates, no obligation.</p>
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
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/#about">About</Link></li>
                <li><Link href="/#services">Services</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/#reviews">Reviews</Link></li>
                <li><Link href="/#contact">Contact</Link></li>
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

          <div className="footer-bottom">
            <p>&copy; 2026 JH Painting Services. All Rights Reserved. Licensed Painting Contractor | Serving Massachusetts</p>
          </div>
        </div>
      </footer>
    </>
  )
}

// Helper function to format markdown-like content to HTML
function formatContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Lists
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(cell => cell.trim())
      if (cells.some(cell => cell.includes('---'))) {
        return ''
      }
      const cellsHtml = cells.map(cell => `<td>${cell.trim()}</td>`).join('')
      return `<tr>${cellsHtml}</tr>`
    })
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Line breaks
    .replace(/\n/g, '<br />')
}
