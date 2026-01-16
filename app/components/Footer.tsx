'use client'

import Link from 'next/link'
import { BUSINESS } from '@/lib/constants'
import { cities } from '@/app/data/cities'

// Inline SVG icon to avoid loading entire lucide-react bundle
const MapPinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

interface FooterProps {
  variant?: 'default' | 'service'
  showCities?: boolean
}

export default function Footer({ variant = 'default', showCities = true }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-rs">
      {/* Service Areas Section */}
      {showCities && (
        <div className="footer-service-areas">
          <div className="container">
            <h3 className="footer-service-areas-title">
              <MapPinIcon size={20} />
              Service Areas - {cities.length}+ Cities Across Massachusetts
            </h3>
            <div className="footer-cities-list">
              {cities.map((city, index) => (
                <span key={city.slug}>
                  <Link href={`/cities/${city.slug}`} className="footer-city-link-rs">
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
