'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import { cities } from '@/app/data/cities'

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
              <MapPin size={20} />
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
