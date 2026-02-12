'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamic imports for non-critical floating components - reduces initial JS bundle
const FloatingPhoneButton = dynamic(() => import('./FloatingPhoneButton'), {
  ssr: false,
})
const FloatingSocial = dynamic(() => import('./FloatingSocial'), {
  ssr: false,
})

export default function FloatingButtons() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Delay floating buttons to reduce initial TBT - they're not needed immediately
    if (typeof window.requestIdleCallback !== 'undefined') {
      const id = window.requestIdleCallback(() => setShow(true))
      return () => window.cancelIdleCallback(id)
    }
    const timer = setTimeout(() => setShow(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <>
      <FloatingPhoneButton />
      <FloatingSocial />
    </>
  )
}
