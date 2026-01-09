'use client'

import { Phone } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

export default function FloatingPhoneButton() {
  return (
    <a
      href={`tel:${BUSINESS.phoneRaw}`}
      className="floating-phone-btn"
      aria-label={`Call ${BUSINESS.name} at ${BUSINESS.phone}`}
    >
      <Phone />
    </a>
  )
}
