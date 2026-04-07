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
    // Load form on first user interaction OR when browser is idle.
    // requestIdleCallback loads near-instantly after paint (~100ms).
    // Interaction events catch users who engage before idle fires.
    // 2s fallback for browsers without requestIdleCallback.
    let cancelled = false
    const load = () => {
      if (cancelled) return
      cancelled = true
      setShouldLoad(true)
      cleanup()
    }

    const events = ['scroll', 'click', 'touchstart', 'keydown']
    const cleanup = () => {
      events.forEach(e => window.removeEventListener(e, load))
      clearTimeout(timer)
      if (idleId) cancelIdleCallback(idleId)
    }

    // Load on user interaction
    events.forEach(e =>
      window.addEventListener(e, load, { once: true, passive: true })
    )

    // Load when browser is idle (fastest path)
    let idleId: number | null = null
    if ('requestIdleCallback' in window) {
      idleId = requestIdleCallback(load, { timeout: 1000 })
    }

    // Fallback: 2s for browsers without requestIdleCallback
    const timer = setTimeout(load, 2000)
    return cleanup
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '620px' }}>
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            gap: '1.5rem',
            padding: '2rem',
          }}
        >
          {/* Quick-action CTA while form loads */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#fff', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', opacity: 0.9 }}>
              Get Your Free Estimate Now
            </p>
            <a
              href="tel:+15086908886"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#CC0000',
                color: '#fff',
                padding: '0.875rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '1.125rem',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(204,0,0,0.4)',
              }}
            >
              Call (508) 690-8886
            </a>
          </div>
          <div
            style={{
              width: '28px',
              height: '28px',
              border: '3px solid #e2e8f0',
              borderTopColor: '#CC0000',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8125rem' }}>Loading form...</p>
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
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </div>
  )
}
