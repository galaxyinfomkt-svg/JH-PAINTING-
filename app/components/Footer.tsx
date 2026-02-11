'use client'

import Link from 'next/link'
import { BUSINESS, HOURS, SOCIAL_LINKS } from '@/lib/constants'
import { cities, getCitySlugWithState } from '@/app/data/cities'

// Inline SVG icons to avoid loading entire lucide-react bundle
const MapPinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const PhoneIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const MailIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const ClockIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

// All 7 services for footer
const footerServices = [
  { name: 'Interior Painting', href: '/services/interior-painting' },
  { name: 'Exterior Painting', href: '/services/exterior-painting' },
  { name: 'Commercial Painting', href: '/services/commercial-painting' },
  { name: 'Residential Painting', href: '/services/residential-painting' },
  { name: 'Cabinet Painting', href: '/services/cabinet-painting' },
  { name: 'Carpentry', href: '/services/carpentry' },
  { name: 'Power Washing', href: '/services/power-washing' },
]

// Service-specific city links organized by region for footer SEO
const footerServiceAreas = [
  {
    name: 'Interior Painting',
    slug: 'interior-painting',
    regions: [
      { region: 'MetroWest', cities: ['marlborough', 'hudson', 'framingham', 'natick'] },
      { region: 'Worcester & Nearby', cities: ['worcester', 'shrewsbury'] },
      { region: 'Greater Boston', cities: ['newton', 'cambridge', 'boston', 'wellesley'] },
    ],
  },
  {
    name: 'Exterior Painting',
    slug: 'exterior-painting',
    regions: [
      { region: 'MetroWest', cities: ['southborough', 'northborough', 'westborough', 'concord'] },
      { region: 'Greater Boston', cities: ['lexington', 'arlington', 'brookline', 'waltham'] },
      { region: 'Norfolk & South', cities: ['needham', 'shrewsbury'] },
    ],
  },
  {
    name: 'Cabinet Painting',
    slug: 'cabinet-painting',
    regions: [
      { region: 'Greater Boston', cities: ['wellesley', 'needham', 'newton', 'weston'] },
      { region: 'MetroWest', cities: ['concord', 'sudbury', 'wayland'] },
      { region: 'Norfolk & South', cities: ['dover', 'sherborn', 'lincoln'] },
    ],
  },
  {
    name: 'Commercial Painting',
    slug: 'commercial-painting',
    regions: [
      { region: 'Greater Boston', cities: ['boston', 'cambridge', 'newton', 'somerville'] },
      { region: 'MetroWest', cities: ['framingham', 'marlborough', 'waltham'] },
      { region: 'Worcester & Nearby', cities: ['worcester', 'lowell', 'burlington'] },
    ],
  },
  {
    name: 'Residential Painting',
    slug: 'residential-painting',
    regions: [
      { region: 'MetroWest', cities: ['hudson', 'ashland', 'hopkinton', 'acton'] },
      { region: 'Nearby Towns', cities: ['maynard', 'stow', 'bolton'] },
      { region: 'Worcester & Nearby', cities: ['clinton', 'grafton', 'milford'] },
    ],
  },
  {
    name: 'Carpentry',
    slug: 'carpentry',
    regions: [
      { region: 'MetroWest', cities: ['marlborough', 'northborough', 'westborough', 'southborough'] },
      { region: 'Worcester & Nearby', cities: ['worcester', 'shrewsbury', 'grafton', 'clinton'] },
      { region: 'North Central', cities: ['leominster', 'fitchburg'] },
    ],
  },
  {
    name: 'Power Washing',
    slug: 'power-washing',
    regions: [
      { region: 'MetroWest', cities: ['hudson', 'framingham', 'natick'] },
      { region: 'Greater Boston', cities: ['lexington', 'arlington', 'dedham', 'norwood'] },
      { region: 'North Middlesex', cities: ['billerica', 'chelmsford', 'woburn'] },
    ],
  },
]

interface FooterProps {
  variant?: 'default' | 'service'
  showCities?: boolean
}

export default function Footer({ variant = 'default', showCities = true }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-rs">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Quick Links */}
            <div className="footer-column">
              <h4 className="footer-column-title">Quick Links</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/free-quote">Free Quote</Link></li>
              </ul>
            </div>

            {/* Our Services */}
            <div className="footer-column">
              <h4 className="footer-column-title">Our Services</h4>
              <ul className="footer-links">
                {footerServices.map((service) => (
                  <li key={service.href}>
                    <Link href={service.href}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="footer-column">
              <h4 className="footer-column-title">Contact Us</h4>
              <ul className="footer-contact">
                <li>
                  <PhoneIcon size={18} />
                  <a href={`tel:${BUSINESS.phoneRaw}`}>{BUSINESS.phone}</a>
                </li>
                <li>
                  <MailIcon size={18} />
                  <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                </li>
                <li>
                  <MapPinIcon size={18} />
                  <span>{BUSINESS.address}</span>
                </li>
                <li>
                  <ClockIcon size={18} />
                  <span>Mon-Fri: {HOURS.weekdays}</span>
                </li>
                <li>
                  <ClockIcon size={18} />
                  <span>Sat: {HOURS.saturday}</span>
                </li>
              </ul>
              {/* Social Media */}
              <div className="footer-social">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookIcon size={20} />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon size={20} />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <YoutubeIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service-Specific City Links */}
      {showCities && (
        <div className="footer-service-areas">
          <div className="container">
            <h3 className="footer-service-areas-title">
              Professional Painting Services Across Massachusetts
            </h3>
            <div className="footer-services-city-grid">
              {footerServiceAreas.map((serviceArea) => (
                <div key={serviceArea.slug} className="footer-service-city-col">
                  <h4 className="footer-service-city-title">
                    <Link href={`/services/${serviceArea.slug}`}>{serviceArea.name}</Link>
                  </h4>
                  {serviceArea.regions.map((r) => (
                    <div key={r.region} className="footer-region-group">
                      <span className="footer-region-label">{r.region}</span>
                      <ul className="footer-service-city-links">
                        {r.cities.map((citySlug) => {
                          const city = cities.find(c => c.slug === citySlug)
                          if (!city) return null
                          return (
                            <li key={citySlug}>
                              <Link href={`/cities/${getCitySlugWithState(city.slug)}/${serviceArea.slug}`}>
                                {city.name}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* General Service Areas */}
            <h3 className="footer-service-areas-title" style={{ marginTop: '2.5rem' }}>
              <MapPinIcon size={20} />
              Service Areas - {cities.length}+ Cities Across Massachusetts
            </h3>
            <div className="footer-cities-list">
              {cities.map((city, index) => (
                <span key={city.slug}>
                  <Link href={`/cities/${getCitySlugWithState(city.slug)}`} className="footer-city-link-rs">
                    {city.name}
                  </Link>
                  {index < cities.length - 1 && ' • '}
                </span>
              ))}
            </div>
            <div className="footer-cta-link">
              Looking for professional painting work?{' '}
              <Link href="/services/exterior-painting" className="footer-cta-link-highlight">
                Explore our Painting Services
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer Bottom */}
      <div className="footer-bottom-rs">
        <div className="container">
          <p>© {currentYear} {BUSINESS.name}. All Rights Reserved.</p>
          <p className="footer-bottom-sub">Licensed Painting & Construction Contractor | Serving Massachusetts</p>
        </div>
      </div>
    </footer>
  )
}
