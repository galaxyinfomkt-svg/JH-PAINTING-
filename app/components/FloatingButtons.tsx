'use client'

import dynamic from 'next/dynamic'

// Dynamic imports for non-critical floating components - reduces initial JS bundle
const FloatingPhoneButton = dynamic(() => import('./FloatingPhoneButton'), {
  ssr: false,
})
const FloatingSocial = dynamic(() => import('./FloatingSocial'), {
  ssr: false,
})

export default function FloatingButtons() {
  return (
    <>
      <FloatingPhoneButton />
      <FloatingSocial />
    </>
  )
}
