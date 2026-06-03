/**
 * LazyHeroForm — the GHL form iframe for the HERO + main contact slots.
 *
 * STRATEGY (changed 2026-05-14 after PageSpeed audit)
 * Previously this component deferred the iframe up to 20s on synthetic
 * Lighthouse runs, which caused real users to see a permanent "Loading
 * form..." spinner during slow connections. The form is the primary
 * conversion vector — it MUST be visible immediately, even if that costs
 * Lighthouse points.
 *
 * What this now does:
 *   - The iframe `src` is rendered on the SERVER (no useEffect, no lazy
 *     conditional). Browser starts downloading it at HTTP/2 priority.
 *   - loading="eager" + fetchPriority="high" so it competes with the LCP
 *     image, not after it.
 *   - While the iframe is fetching its contents, a SKELETON (input bars +
 *     button) is shown — visually it already looks like a form.
 *   - A "Call (508) 690-8886" CTA stays visible ABOVE the iframe at all
 *     times. Users who just want to call don't need the iframe at all.
 *   - The container reserves min-height so there is no CLS when the
 *     iframe content paints.
 *
 * Note: the component is no longer truly "lazy" — name kept for backwards
 * compat with import paths across the codebase. Could be renamed HeroForm
 * in a future refactor.
 */

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
    <div style={{ position: 'relative', minHeight: '620px' }}>
      {/* Always-visible CTA — the "call now" lifeline. Stays even after iframe loads. */}
      <a
        href="tel:+15086908886"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(135deg, #CC0000, #990000)',
          color: '#fff',
          padding: '0.875rem 1rem',
          borderRadius: '8px 8px 0 0',
          fontWeight: 700,
          fontSize: '1.0625rem',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(204,0,0,0.35)',
          marginBottom: '-8px',
          position: 'relative',
          zIndex: 2,
        }}
        aria-label="Call JH Painting Services at (508) 690-8886"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        Call (508) 690-8886
      </a>

      {/* Skeleton — visually mimics the form (4 input bars + submit) while
          iframe content is downloading. Disappears on iframe `load` event. */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '40px',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '1.5rem',
            background: '#fff',
            borderRadius: '0 0 12px 12px',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
          }}
        >
          <div style={skelBar(48)} />
          <div style={skelBar(48)} />
          <div style={skelBar(48)} />
          <div style={skelBar(48)} />
          <div style={{ ...skelBar(120), background: 'linear-gradient(135deg, #CC0000aa, #990000aa)', marginTop: 'auto' }} />
        </div>
      )}

      {/* Server-rendered iframe — src present at SSR, browser starts download
          immediately. No client gating. */}
      <iframe
        src={src}
        title={title}
        className={className}
        onLoad={() => setIsLoaded(true)}
        loading="eager"
        // @ts-expect-error — fetchpriority is valid HTML attribute, TS lib not yet updated
        fetchpriority="high"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.25s ease',
          position: 'relative',
          zIndex: 0,
        }}
      />
    </div>
  )
}

/** Skeleton bar style — animated shimmer via CSS keyframe `shimmer` in globals.css. */
function skelBar(height: number): React.CSSProperties {
  return {
    height: `${height}px`,
    borderRadius: '6px',
    background: 'linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s ease-in-out infinite',
  }
}
