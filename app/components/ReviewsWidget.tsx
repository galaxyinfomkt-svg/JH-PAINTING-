'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * GoHighLevel / reputationhub.site review widget.
 *
 * The official embed is a <script> + an <iframe class="lc_reviews_widget">.
 * The script's ONLY job is to listen for the iframe's `lc.setHeight`
 * postMessage and resize the iframe to fit its content. If the script isn't
 * listening when the iframe emits that message, the iframe never gets its
 * real height and the widget renders as an empty/grey box.
 *
 * A previous perf change moved the script into DeferredScripts (loaded only
 * after the first user interaction + 1s), which raced the lazy iframe and
 * dropped the height handshake - the reviews disappeared. This component
 * keeps the perf intent (nothing loads until the section nears the viewport,
 * so Lighthouse's no-scroll run is unaffected) while guaranteeing the script
 * is ready BEFORE the iframe mounts.
 */

const WIDGET_SRC =
  'https://reputationhub.site/reputation/widgets/review_widget/0Def8kzJShLPuKrPk5Jw'
const SCRIPT_SRC =
  'https://reputationhub.site/reputation/assets/review-widget.js'

export default function ReviewsWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showIframe, setShowIframe] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const start = () => {
      // If the resize script is already on the page, just mount the iframe.
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${SCRIPT_SRC}"]`
      )
      if (existing) {
        setShowIframe(true)
        return
      }

      // Load the resize listener FIRST; only mount the iframe once it's ready
      // (or failed) so the lc.setHeight handshake is never missed.
      const s = document.createElement('script')
      s.src = SCRIPT_SRC
      s.async = true
      s.onload = () => setShowIframe(true)
      s.onerror = () => setShowIframe(true) // still show reviews on script error
      document.body.appendChild(s)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect()
          start()
        }
      },
      { rootMargin: '600px', threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ minHeight: '600px', position: 'relative' }}
    >
      {showIframe && (
        <iframe
          className="lc_reviews_widget reviews-widget"
          src={WIDGET_SRC}
          frameBorder={0}
          scrolling="no"
          style={{
            minWidth: '100%',
            width: '100%',
            border: 'none',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          title="Customer Reviews"
          onLoad={() => setLoaded(true)}
        />
      )}
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--jh-gray-200, #e5e7eb)',
              borderTopColor: 'var(--jh-red, #CC0000)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      )}
    </div>
  )
}
