/**
 * MobileStickyCTA - bottom-fixed bar with two CTAs, mobile-only.
 *
 * Spec (Task 10):
 *   - Hidden on viewports ≥ 768px (`@media (min-width: 768px)` disables it).
 *   - Two equal-width buttons:
 *       Left  → "Call Now"          → tel:+15086908886
 *       Right → "Free Estimate"     → #quote-form (scrolls into view)
 *   - Bottom offset (1rem) so it doesn't overlap the LeadConnector chat
 *     widget bubble (which sits in the bottom-right corner ~80px tall).
 *   - High contrast on dark bg so it works over any hero image.
 *   - This is a Server Component - no client JS. Pure CSS + anchors. Visible
 *     in initial paint, no hydration delay.
 *
 * Rendered ONCE from app/layout.tsx so it appears on every public page.
 * Hidden on /thank-you page is handled via the noIndex route's own layout
 * if needed in a future iteration.
 */

export default function MobileStickyCTA() {
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
        // The hidden-on-desktop logic lives in the className → see globals.css
        // selector `.mobile-sticky-cta` block (added in this commit if missing).
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
          background: 'linear-gradient(135deg, #CC0000, #990000)',
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        Call Now
      </a>
      <a
        href="#quote-form"
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
        aria-label="Scroll to free estimate form"
      >
        Free Estimate
      </a>
    </div>
  )
}
