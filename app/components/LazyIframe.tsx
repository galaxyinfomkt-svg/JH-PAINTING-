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
}: LazyIframeProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
        rootMargin: '200px',
        threshold: 0,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ minHeight: style?.minHeight || '300px', ...style }}>
      {isVisible ? (
        <iframe
          src={src}
          title={title}
          className={className}
          style={style}
          frameBorder={frameBorder}
          scrolling={scrolling}
          allowFullScreen={allowFullScreen}
          referrerPolicy={referrerPolicy}
        />
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
