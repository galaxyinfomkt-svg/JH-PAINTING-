'use client'

import { useState } from 'react'

interface LazyHeroFormProps {
  src: string
  title: string
  className?: string
  headerText?: string
}

export default function LazyHeroForm({ src, title, className, headerText }: LazyHeroFormProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      {/* Dark header bar for visual contrast */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '1.25rem 1.5rem',
        textAlign: 'center',
        borderRadius: '20px 20px 0 0',
      }}>
        <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem', margin: 0, lineHeight: 1.3 }}>
          {headerText || 'Get Your FREE Estimate'}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', margin: '0.25rem 0 0', fontWeight: 500 }}>
          No obligation · Same-day response
        </p>
      </div>
      <div className={className} style={{ minHeight: '400px', position: 'relative', background: '#f8f9fa', borderRadius: '0 0 20px 20px' }}>
        {/* Loading skeleton - shows until iframe loads */}
        {!isLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f8f9fa',
              borderRadius: '12px',
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
        {/* Form iframe - loads immediately, no lazy loading for critical conversion element */}
        <iframe
          src={src}
          title={title}
          className={className}
          onLoad={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.2s ease',
            background: '#f8f9fa',
          }}
        />
      </div>
    </div>
  )
}
