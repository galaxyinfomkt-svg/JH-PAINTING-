'use client'

import { Phone } from 'lucide-react'

export default function FloatingPhoneButton() {
  return (
    <a
      href="tel:+15086908886"
      className="floating-phone-btn"
      aria-label="Call JH Painting Services at (508) 690-8886"
    >
      <Phone />
    </a>
  )
}
