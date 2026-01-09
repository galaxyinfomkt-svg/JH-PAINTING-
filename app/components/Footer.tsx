'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import { cities } from '@/app/data/cities'

// Social media icons as inline SVGs
const FacebookIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

// Social media links
const socialLinks = {
  facebook: 'https://www.facebook.com/profile.php?id=61564489391475',
  instagram: 'https://www.instagram.com/jhpaintingservices_/',
  youtube: 'https://www.youtube.com/@JHPaintingServices-br9wh',
}

interface FooterProps {
  variant?: 'default' | 'service'
  showCities?: boolean
}

export default function Footer({ variant = 'default', showCities = true }: FooterProps) {
  const isServicePage = variant === 'service'
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Image
              src={BUSINESS.logo}
              alt={BUSINESS.name}
              width={160}
              height={64}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p>
              Professional painting services for homes and businesses across Massachusetts.
              Licensed, insured, and dedicated to excellence.
            </p>
            <div className="footer-social">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {isServicePage ? (
                <>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/#about">About</Link></li>
                  <li><Link href="/#services">Services</Link></li>
                  <li><Link href="/#gallery">Gallery</Link></li>
                  <li><Link href="/#reviews">Reviews</Link></li>
                  <li><Link href="/#contact">Contact</Link></li>
                </>
              ) : (
                <>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#gallery">Gallery</a></li>
                  <li><a href="#reviews">Reviews</a></li>
                  <li><a href="#contact">Contact</a></li>
                </>
              )}
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-col">
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li><Link href="/services/interior-painting">Interior Painting</Link></li>
              <li><Link href="/services/exterior-painting">Exterior Painting</Link></li>
              <li><Link href="/services/commercial-painting">Commercial Painting</Link></li>
              <li><Link href="/services/residential-painting">Residential Painting</Link></li>
              <li><Link href="/services/cabinet-painting">Cabinet Painting</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <Phone size={16} />
              <a href={`tel:${BUSINESS.phoneRaw}`}>{BUSINESS.phone}</a>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>{BUSINESS.address}</span>
            </div>
          </div>
        </div>

        {/* Service Areas - Cities */}
        {showCities && (
          <div className="footer-cities">
            <h4>Service Areas - {cities.length}+ Cities in Massachusetts</h4>
            <div className="footer-cities-grid">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="footer-city-link"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © {currentYear} {BUSINESS.name}. All Rights Reserved.
            Licensed Painting Contractor | Serving Massachusetts
          </p>
        </div>
      </div>
    </footer>
  )
}
