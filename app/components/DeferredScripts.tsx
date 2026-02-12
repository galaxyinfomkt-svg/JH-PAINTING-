'use client'

import { useEffect, useRef } from 'react'

/**
 * Defers ALL third-party scripts until user interaction.
 * This eliminates ~800-1000ms of TBT caused by GTM, GHL, chat widget, and reviews widget
 * executing during the Lighthouse measurement window.
 *
 * Scripts load on first: scroll, click, mousemove, touchstart, or keydown.
 * Fallback: loads after 8 seconds if no interaction.
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

      // Google Tag Manager
      injectInlineScript(
        "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KB89D6QQ');"
      )

      // GHL External Tracking
      injectScript('https://link.msgsndr.com/js/external-tracking.js', {
        'data-tracking-id': 'tk_17bc6e6f297d4ffc8b66e30609380978',
      })

      // LeadConnector Chat Widget
      injectScript('https://beta.leadconnectorhq.com/loader.js', {
        'data-resources-url': 'https://beta.leadconnectorhq.com/chat-widget/loader.js',
        'data-widget-id': '69626d9e5c8c5ba64720801a',
      })

      // Reviews Widget
      injectScript('https://reputationhub.site/reputation/assets/review-widget.js')

      cleanup()
    }

    const events = ['scroll', 'click', 'mousemove', 'touchstart', 'keydown']
    let timer: ReturnType<typeof setTimeout>

    const cleanup = () => {
      events.forEach(e => window.removeEventListener(e, load))
      clearTimeout(timer)
    }

    events.forEach(e =>
      window.addEventListener(e, load, { once: true, passive: true })
    )

    // Fallback: load after 8 seconds if no user interaction
    timer = setTimeout(load, 8000)

    return cleanup
  }, [])

  return null
}
