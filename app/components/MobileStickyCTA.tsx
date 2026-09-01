'use client'

/**
 * MobileStickyCTA - bottom-fixed bar with two CTAs, mobile-only.
 *
 * Spec:
 *   - Hidden on viewports >= 768px (`.mobile-sticky-cta` in globals.css).
 *   - Two equal-width buttons:
 *       Left  -> "Call Now"      -> tel:+15086908886
 *       Right -> "Free Estimate" -> the page's own form, else /contact
 *   - Bottom offset so it doesn't overlap the LeadConnector chat bubble.
 *
 * Rendered ONCE from app/layout.tsx so it appears on every public page.
 *
 * WHY THE ESTIMATE HREF IS RESOLVED AT RUNTIME
 * --------------------------------------------
 * This used to be a hardcoded `href="#quote-form"`. That anchor only exists on
 * the home page and the city / city+service pages. On the other 49 prerendered
 * pages - all seven /services/* pages, /contact, /services, /about, /projects,
 * /massachusetts, /blog and all 33 blog posts, /vsl - there was no element with
 * that id, so the site's primary mobile call-to-action did nothing at all when
 * tapped. On a contractor site where most traffic is mobile, that is the
 * conversion button being dead on roughly a third of the pages that rank.
 *
 * The fix has to hold for pages that have a form and pages that don't, so:
 *   - SSR renders `/contact#quote-form`, which is a real URL on every page and
 *     works with no JavaScript at all.
 *   - After hydration, if THIS page contains #quote-form, the href is upgraded
 *     to the in-page anchor so the tap scrolls instead of navigating.
 * There is no state in which the button points at nothing.
 */

import { useEstimateHref } from './useEstimateHref'

export default function MobileStickyCTA() {
  const estimateHref = useEstimateHref()

  return (
    <div
      role="navigation"
      aria-label="Quick contact"
      style={{
        position: 'fixed',
        left: '0.75rem',
        right: '0.75rem',
        bottom: '0.75rem',
        zIndex: 9990, // below the chat widget (~10000) so the chat stays clickable
        display: 'flex',
        gap: '0.5rem',
        pointerEvents: 'auto',
      }}
      className="mobile-sticky-cta"
    >
      <a
        href="tel:+15086908886"
        style={{
          flex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          padding: '0.875rem 0.5rem',
          background: '#CC0000',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.9375rem',
          textDecoration: 'none',
          borderRadius: '10px',
          boxShadow: '0 6px 18px rgba(204,0,0,0.4)',
          textAlign: 'center',
        }}
        aria-label="Call JH Painting Services now"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call Now
      </a>
      <a
        href={estimateHref}
        style={{
          flex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          padding: '0.875rem 0.5rem',
          background: '#0a0e27',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.9375rem',
          textDecoration: 'none',
          borderRadius: '10px',
          boxShadow: '0 6px 18px rgba(10,14,39,0.4)',
          textAlign: 'center',
          border: '2px solid rgba(255,255,255,0.15)',
        }}
        aria-label="Get a free painting estimate"
      >
        Free Estimate
      </a>
    </div>
  )
}
