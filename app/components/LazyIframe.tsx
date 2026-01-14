'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyIframeProps {
  src: string
  title: string
  className?: string
  style?: React.CSSProperties
  frameBorder?: number
  scrolling?: string
  allowFullScreen?: boolean
  referrerPolicy?: React.HTMLAttributeReferrerPolicy
  priority?: boolean // Load immediately without lazy loading
}

export default function LazyIframe({
  src,
  title,
  className,
  style,
  frameBorder,
  scrolling,
  allowFullScreen,
  referrerPolicy,
  priority = false,
}: LazyIframeProps) {
  const [isVisible, setIsVisible] = useState(priority)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return // Skip observer if priority loading

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '500px', // Increased from 200px - start loading earlier
        threshold: 0,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  return (
    <div ref={containerRef} style={{ minHeight: style?.minHeight || '300px', position: 'relative', ...style }}>
      {isVisible ? (
        <>
          {!isLoaded && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--jh-gray-100, #f3f4f6)',
                borderRadius: '8px',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid var(--jh-gray-200, #e5e7eb)',
                  borderTopColor: 'var(--jh-red, #D20404)',
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
            style={{ ...style, opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
            frameBorder={frameBorder}
            scrolling={scrolling}
            allowFullScreen={allowFullScreen}
            referrerPolicy={referrerPolicy}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            minHeight: style?.minHeight || '300px',
            background: 'var(--jh-gray-100, #f3f4f6)',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--jh-gray-200, #e5e7eb)',
              borderTopColor: 'var(--jh-red, #D20404)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      )}
    </div>
  )
}
