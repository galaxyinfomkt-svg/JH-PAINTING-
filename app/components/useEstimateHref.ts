'use client'

import { useEffect, useState } from 'react'

/**
 * Resolves where a "Get Free Estimate" control should point on THIS page.
 *
 * The site has two shared estimate CTAs - the mobile sticky bar and the mobile
 * menu button in the header - and both were hardcoded to `href="#quote-form"`.
 * That anchor exists on the home page and on the city / city+service pages, but
 * not on the seven /services/* pages, /contact, /services, /about, /projects,
 * /massachusetts, /blog, the 33 blog posts or /vsl. On those the primary CTA
 * simply did nothing when tapped.
 *
 * Resolution has to work for pages with a form and pages without, so:
 *   - the server renders `/contact#quote-form`, which is a real URL everywhere
 *     and needs no JavaScript;
 *   - after hydration, if this page contains #quote-form the href upgrades to
 *     the in-page anchor so the tap scrolls instead of navigating.
 *
 * There is no state in which the control points at nothing.
 */
export const ESTIMATE_FALLBACK_HREF = '/contact#quote-form'

export function useEstimateHref(): string {
  const [href, setHref] = useState(ESTIMATE_FALLBACK_HREF)

  useEffect(() => {
    const resolve = () =>
      setHref(document.getElementById('quote-form') ? '#quote-form' : ESTIMATE_FALLBACK_HREF)
    resolve()
    // A form card can mount after us: LazyIframe defers its container behind an
    // IntersectionObserver, and the App Router keeps these components mounted
    // across client navigations.
    const mo = new MutationObserver(resolve)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [])

  return href
}
