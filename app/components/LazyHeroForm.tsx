'use client'

import { useState } from 'react'

interface LazyHeroFormProps {
  src: string
  title: string
  className?: string
}

export default function LazyHeroForm({ src, title, className }: LazyHeroFormProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={className} style={{ minHeight: '400px', position: 'relative' }}>
      {/* Loading skeleton - shows until iframe loads */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            zIndex: 1,
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
      {/* Form iframe - loads immediately, no lazy loading for critical conversion element */}
      <iframe
        src={src}
        title={title}
        className={className}
        onLoad={() => setIsLoaded(true)}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />
    </div>
  )
}
