'use client'

import { useState, useEffect } from 'react'

interface LazyHeroFormProps {
  src: string
  title: string
  className?: string
}

export default function LazyHeroForm({ src, title, className }: LazyHeroFormProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Delay hero form iframe to prioritize hero image (LCP element).
    // The form is always visible in the hero, so IntersectionObserver fires immediately
    // and competes with hero image for bandwidth. Using requestIdleCallback ensures
    // the browser finishes rendering LCP first before loading the iframe.
    let cancelled = false
    const load = () => { if (!cancelled) setShouldLoad(true) }

    if (typeof window.requestIdleCallback !== 'undefined') {
      const id = window.requestIdleCallback(load, { timeout: 3000 })
      return () => { cancelled = true; window.cancelIdleCallback(id) }
    }
    const timer = setTimeout(load, 2500)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '620px' }}>
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '3px solid #e2e8f0',
              borderTopColor: '#D20404',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      )}
      {shouldLoad && (
        <iframe
          src={src}
          title={title}
          className={className}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        />
      )}
    </div>
  )
}
