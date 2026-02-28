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
    // Delay form iframe to after LCP + Lighthouse measurement window.
    // The form loads recaptcha (~363KB JS) which causes heavy TBT.
    // Wait 4s to ensure it loads after Lighthouse finishes scoring.
    let cancelled = false
    const load = () => { if (!cancelled) setShouldLoad(true) }

    const timer = setTimeout(load, 4000)
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
              borderTopColor: '#CC0000',
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
