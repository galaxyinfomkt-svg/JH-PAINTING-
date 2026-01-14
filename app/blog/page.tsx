'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  ArrowRight,
  Search,
  Home as HomeIcon,
  Paintbrush,
  Palette,
  Building2,
  PaintBucket,
  BookOpen,
} from 'lucide-react'
import { blogPosts, blogCategories, getFeaturedPosts } from '../data/blogPosts'

const menuServices = [
  { name: 'Interior Painting', href: '/services/interior-painting', icon: Paintbrush, description: 'Transform your interior spaces' },
  { name: 'Exterior Painting', href: '/services/exterior-painting', icon: HomeIcon, description: 'Protect and beautify your exterior' },
  { name: 'Commercial Painting', href: '/services/commercial-painting', icon: Building2, description: 'Professional business painting' },
  { name: 'Residential Painting', href: '/services/residential-painting', icon: PaintBucket, description: 'Complete home painting solutions' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting', icon: Palette, description: 'Upgrade your kitchen cabinets' },
]

export default function BlogPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const featuredPosts = getFeaturedPosts(2)

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

  const filteredPosts = blogPosts.filter(post => {
    // Convert category name to slug format for comparison (e.g., 'Color Guide' -> 'color-guide')
    const postCategorySlug = post.category.toLowerCase().replace(/ /g, '-')
    const matchesCategory = selectedCategory === 'all' || postCategorySlug === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <>
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
        {/* Blog Hero */}
        <section className="blog-hero">
          <div className="blog-hero-bg">
            <Image
              src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
              alt="Professional Painting Tips and Guides"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="blog-hero-overlay" />
          <div className="container">
            <div className="blog-hero-content">
              <div className="blog-hero-badge">
                <BookOpen size={16} />
                Expert Painting Insights
              </div>
              <h1>Painting Tips, Guides &amp; Inspiration</h1>
              <p>Expert advice from Massachusetts&apos; trusted painting professionals. Learn about colors, techniques, costs, and more.</p>

              {/* Search Bar */}
              <div className="blog-search-wrapper">
                <Search size={20} className="blog-search-icon" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="blog-search-input"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && searchQuery === '' && selectedCategory === 'all' && (
          <section className="blog-featured-section">
            <div className="container">
              <div className="blog-section-header">
                <h2>Featured Articles</h2>
                <p>Our most popular and helpful guides</p>
              </div>
              <div className="blog-featured-grid">
                {featuredPosts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-featured-card">
                    <div className="blog-featured-image">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="blog-featured-category">{post.category}</div>
                    </div>
                    <div className="blog-featured-content">
                      <div className="blog-featured-meta">
                        <span><Calendar size={14} /> {formatDate(post.date)}</span>
                        <span><Clock size={14} /> {post.readTime}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="blog-featured-author">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          width={40}
                          height={40}
                          className="blog-featured-author-image"
                        />
                        <div>
                          <span className="blog-featured-author-name">{post.author}</span>
                          <span className="blog-featured-author-title">Owner &amp; Expert Painter</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Blog Content */}
        <section className="blog-main-section">
          <div className="container">
            <div className="blog-layout">
              {/* Posts Grid */}
              <div className="blog-posts-container">
                {/* Category Filter */}
                <div className="blog-category-filter">
                  {blogCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      className={`blog-category-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.slug)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Results Count */}
                <div className="blog-results-info">
                  <span>{filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found</span>
                </div>

                {/* Posts Grid */}
                <div className="blog-posts-grid">
                  {filteredPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-post-card">
                      <div className="blog-post-image">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="blog-post-category">{post.category}</div>
                      </div>
                      <div className="blog-post-content">
                        <div className="blog-post-meta">
                          <span><Calendar size={12} /> {formatDate(post.date)}</span>
                          <span><Clock size={12} /> {post.readTime}</span>
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <div className="blog-post-tags">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="blog-post-tag">
                              <Tag size={10} /> {tag}
                            </span>
                          ))}
                        </div>
                        <span className="blog-post-link">
                          Read Article <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="blog-no-results">
                    <Search size={48} />
                    <h3>No articles found</h3>
                    <p>Try adjusting your search or filter to find what you&apos;re looking for.</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
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
        </section>

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
            <p>&copy; 2025 JH Painting Services. All Rights Reserved. Licensed Painting Contractor | Serving Massachusetts</p>
          </div>
        </div>
      </footer>
    </>
  )
}
