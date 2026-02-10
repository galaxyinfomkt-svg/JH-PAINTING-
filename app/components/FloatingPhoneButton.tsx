'use client'

import { useState, useEffect } from 'react'
import { BUSINESS } from '@/lib/constants'

// Inline SVG icon to avoid loading entire lucide-react bundle
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

export default function FloatingPhoneButton() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show expanded version after scrolling 300px
      setHasScrolled(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href={`tel:${BUSINESS.phoneRaw}`}
      className={`floating-phone-btn ${hasScrolled ? 'floating-phone-btn-expanded' : ''}`}
      aria-label={`Call ${BUSINESS.name} at ${BUSINESS.phone}`}
    >
      <span className="floating-phone-icon">
        <PhoneIcon />
      </span>
      <span className="floating-phone-text">
        <span className="floating-phone-label">Free Quote</span>
        <span className="floating-phone-number">{BUSINESS.phone}</span>
      </span>
    </a>
  )
}
