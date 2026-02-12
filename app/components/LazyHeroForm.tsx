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
    <div style={{ position: 'relative', minHeight: '400px' }}>
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
