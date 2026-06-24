import ReviewsWidget from './ReviewsWidget'

/**
 * Shared "What Our Customers Say" section: SSR social-proof banner + the live
 * GHL reviews widget. Dropped into every page template (home, city,
 * city/service, region, service) so reviews show site-wide, not just home.
 *
 * Server component on purpose - the only client island is ReviewsWidget.
 */
export default function ReviewsSection() {
  return (
    <section id="reviews" className="section reviews-section">
      <div className="container">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Trusted by homeowners across Massachusetts.</p>
        </div>

        {/* SSR social-proof banner - immediate proof while the widget loads */}
        <div
          role="group"
          aria-label="Customer rating summary"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            padding: '1rem 1.5rem',
            marginBottom: '1.5rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          <span aria-hidden="true" style={{ display: 'inline-flex', gap: '2px', color: '#f59e0b', fontSize: '1.25rem', letterSpacing: '2px' }}>★★★★★</span>
          <span style={{ color: '#0a0e27' }}>
            <strong>5.0</strong> from 40+ verified Google reviews
          </span>
          <a
            href="https://g.page/r/Cb984Z3qm9PsEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#CC0000', textDecoration: 'none', fontWeight: 700 }}
          >
            Read on Google ↗
          </a>
        </div>

        {/* Reserve height to prevent CLS while the widget loads */}
        <div style={{ minHeight: '800px' }}>
          <ReviewsWidget />
        </div>
      </div>
    </section>
  )
}
