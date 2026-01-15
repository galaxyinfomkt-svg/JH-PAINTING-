'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyHeroFormProps {
  src: string
  title: string
  className?: string
}

export default function LazyHeroForm({ src, title, className }: LazyHeroFormProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Use requestIdleCallback for non-critical loading
    const loadForm = () => {
      setIsVisible(true)
    }

    // Load after LCP is complete - reduced delay for faster perceived loading
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, options?: { timeout: number }) => void }).requestIdleCallback(loadForm, { timeout: 500 })
      } else {
        loadForm()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ minHeight: '400px' }}>
      {isVisible ? (
        <iframe
          src={src}
          title={title}
          className={className}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            minHeight: '400px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '3px solid rgba(255,255,255,0.2)',
              borderTopColor: '#D20404',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      )}
    </div>
  )
}
