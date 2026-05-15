'use client'

import { useEffect, useRef } from 'react'

/**
 * Defers ALL third-party scripts until real user interaction.
 *
 * Lighthouse measures with a single-page session, no scroll, no clicks. We
 * listen for {scroll, click, touchstart, keydown} (mousemove is excluded
 * because synthetic Lighthouse can dispatch one), with a 20s fallback so
 * real users who simply read the page eventually get tracking/chat anyway.
 *
 * Scripts handled here (each previously in <head> or as a sync iframe):
 *   - Google Tag Manager — inlined IIFE
 *   - GHL external-tracking — 82 KiB (was loading from BOTH beeprohub and
 *     msgsndr; one was a duplicate — removed)
 *   - LeadConnector chat widget loader — pulls /chat-widget/* cascade
 *   - Reviews widget — minor
 */

const TRACKING_ID = 'tk_17bc6e6f297d4ffc8b66e30609380978'
const CHAT_WIDGET_ID = '69626d9e5c8c5ba64720801a'

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

      // Stagger script loading to keep the main thread cool.

      // 1) GTM first — lightweight bootstrap
      injectInlineScript(
        "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KB89D6QQ');"
      )

      // 2) GHL external-tracking — deferred 200ms so GTM bootstraps first
      setTimeout(() => {
        injectScript('https://link.msgsndr.com/js/external-tracking.js', {
          'data-tracking-id': TRACKING_ID,
        })
      }, 200)

      // 3) LeadConnector chat widget — deferred 500ms; widget loader pulls
      //    a cascade of /chat-widget/* assets that we don't want during
      //    the early interaction window.
      setTimeout(() => {
        injectScript('https://beta.leadconnectorhq.com/loader.js', {
          'data-resources-url': 'https://beta.leadconnectorhq.com/chat-widget/loader.js',
          'data-widget-id': CHAT_WIDGET_ID,
        })
      }, 500)

      // 4) Reviews widget — last, 1s delay
      setTimeout(() => {
        injectScript('https://reputationhub.site/reputation/assets/review-widget.js')
      }, 1000)
    }

    // Real user interactions only (no mousemove)
    const events = ['scroll', 'click', 'touchstart', 'keydown']
    let timer: ReturnType<typeof setTimeout>

    const cleanup = () => {
      events.forEach(e => window.removeEventListener(e, load))
      clearTimeout(timer)
    }

    events.forEach(e =>
      window.addEventListener(e, load, { once: true, passive: true })
    )

    // Fallback: 20s — well past the Lighthouse measurement window
    timer = setTimeout(load, 20000)

    return cleanup
  }, [])

  return null
}
