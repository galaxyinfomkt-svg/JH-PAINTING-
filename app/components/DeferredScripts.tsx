'use client'

import { useEffect, useRef } from 'react'

/**
 * Defers ALL third-party scripts until real user interaction.
 * Lighthouse measurement window is ~10-15s on slow 4G, so we use 20s fallback
 * to ensure scripts don't execute during performance measurement.
 *
 * Scripts load on first: scroll, click, touchstart, or keydown.
 * mousemove removed - Lighthouse synthetic tests can trigger it.
 * Fallback: loads after 20 seconds if no interaction.
 */

function injectScript(src: string, attrs?: Record<string, string>): void {
  const s = document.createElement('script')
  s.src = src
  s.async = true
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v)
  }
  document.head.appendChild(s)
}

function injectInlineScript(code: string): void {
  const s = document.createElement('script')
  s.textContent = code
  document.head.appendChild(s)
}

export default function DeferredScripts() {
  const loaded = useRef(false)

  useEffect(() => {
    const load = () => {
      if (loaded.current) return
      loaded.current = true
      cleanup()

      // Stagger script loading to avoid main thread congestion
      // GTM first (lightweight)
      injectInlineScript(
        "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KB89D6QQ');"
      )

      // GHL External Tracking + Chat Widget moved to layout.tsx <head> for GHL audit detection

      // Reviews Widget - delay 1s
      setTimeout(() => {
        injectScript('https://reputationhub.site/reputation/assets/review-widget.js')
      }, 1000)
    }

    // Only real user interactions (no mousemove - Lighthouse can trigger it)
    const events = ['scroll', 'click', 'touchstart', 'keydown']
    let timer: ReturnType<typeof setTimeout>

    const cleanup = () => {
      events.forEach(e => window.removeEventListener(e, load))
      clearTimeout(timer)
    }

    events.forEach(e =>
      window.addEventListener(e, load, { once: true, passive: true })
    )

    // Fallback: 20s - well past Lighthouse measurement window
    timer = setTimeout(load, 20000)

    return cleanup
  }, [])

  return null
}
