import type React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LazyHeroForm from './LazyHeroForm'
import CapacityNotice from './CapacityNotice'
import { CITY_COUNT } from '@/app/data/cities'
import { sliderPairs } from '@/app/data/projects'

/**
 * Home layout v2 (Oct 2026), built from the client's mockup:
 * hero -> 6 services -> real results -> about + estimate form -> reviews -> CTA band.
 *
 * Kept honest on purpose: the mockup's stock house, stock people and invented
 * testimonials are replaced by the crew's own job photos, Jafet's real photo and
 * literal Google reviews (first name + initial, excerpted, never reworded).
 */

const Phone = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)
const Calendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>
)
const Shield = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
)
const Trophy = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
)
const Leaf = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
)
const Pin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)
const Users = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
)
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
)
const Roller = () => (
  <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="16" height="6" rx="2"/><path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="8" y="16" width="4" height="6" rx="1"/></svg>
)
const Stars = ({ size = 18 }: { size?: number }) => (
  <span className="hv2-stars" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ))}
  </span>
)

/** Simple service glyphs, one per card. */
const ICONS: Record<string, React.ReactNode> = {
  interior: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m14.6 17.9-10.7-2.9"/><path d="M18.4 2.6a1 1 0 1 1 3 3l-4 4a.5.5 0 0 0 0 .7l.9.9a2.4 2.4 0 0 1 0 3.4l-.9.9a.5.5 0 0 1-.7 0L8.4 7.3a.5.5 0 0 1 0-.7l.9-.9a2.4 2.4 0 0 1 3.4 0l.9.9a.5.5 0 0 0 .7 0z"/><path d="M9 8c-1.8 2.7-4 3.5-6.6 3.9a.5.5 0 0 0-.3.8l7.3 8.9a1 1 0 0 0 1.2.2C12.7 20.4 16 16.8 16 15"/></svg>,
  exterior: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>,
  cabinet: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18M3 12h18M9 7.5v1M15 7.5v1M9 15.5v1M15 15.5v1"/></svg>,
  carpentry: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.4 8.4a2.1 2.1 0 1 1-3-3L12 9"/><path d="M17.6 15 22 10.6M20.9 11.7l-1.2-1.2c-.6-.6-.9-1.3-.9-2.1v-.9L15 3.7a5.6 5.6 0 0 0-4-1.7H9.4l.9.8a6.2 6.2 0 0 1 2 4.5v1.5l2 2h.9c.8 0 1.6.3 2.1.9l1.2 1.2"/></svg>,
  commercial: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>,
  washing: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.8 4-4 0-1.2-.6-2.3-1.8-3.3S7.2 6.5 7 5.3c-.3 1.2-1 2.4-2.2 3.4S3 11 3 12.3c0 2.2 1.8 4 4 4z"/><path d="M12.6 6.6A11 11 0 0 0 14 3.5c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.9 4.9"/></svg>,
}

const SERVICES = [
  { key: 'interior', title: 'Interior Painting', desc: 'Transform your interior spaces', image: '/projects/interior-repaint-douglas/07.webp', href: '/services/interior-painting' },
  { key: 'exterior', title: 'Exterior Painting', desc: 'Protect and beautify your exterior', image: '/projects/waltham-church-exterior/01.webp', href: '/services/exterior-painting' },
  { key: 'cabinet', title: 'Cabinet Refinishing', desc: 'Upgrade your kitchen cabinets', image: '/projects/kitchen-cabinet-painting/01.webp', href: '/services/cabinet-painting' },
  { key: 'carpentry', title: 'Carpentry Work', desc: 'Expert wood repairs & trim work', image: '/projects/stair-carpentry/01.webp', href: '/services/carpentry' },
  { key: 'commercial', title: 'Commercial Painting', desc: 'Professional business painting', image: '/projects/roto-rooter-marlborough-cafeteria/cover.webp', href: '/services/commercial-painting' },
  { key: 'washing', title: 'Power Washing', desc: 'Professional pressure cleaning', image: '/projects/deck-restoration-chelmsford/01.webp', href: '/services/power-washing' },
]

// Real before/after frames. Exterior is the Waltham church job (photos on the GHL media bucket).
const pairOf = (slug: string, i = 0) => {
  const p = sliderPairs([[slug, i]])[0]
  return { before: p.before, after: p.after, alt: p.afterAlt }
}
const RESULTS = [
  { label: 'Exterior Painting', before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23bb3443ab4.webp', after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Church exterior in Waltham, MA before and after painting by JH Painting Services', href: '/services/exterior-painting' },
  { label: 'Cabinet Refinishing', ...pairOf('built-in-painting-wrentham'), href: '/services/cabinet-painting' },
  { label: 'Interior Painting', ...pairOf('interior-repaint-douglas'), href: '/services/interior-painting' },
  { label: 'Carpentry Work', ...pairOf('stair-carpentry'), href: '/services/carpentry' },
]

// Literal Google reviews (excerpts marked with an ellipsis), first name + initial only.
const REVIEWS = [
  { name: 'Sue L.', initials: 'SL', text: 'Jafet and his team were extremely polite, responsive and thoughtful- even removing shoes without being asked before entering the house. They showed up exactly on time and were so quiet and efficient.' },
  { name: 'Nick A.', initials: 'NA', text: 'Great service and amazing work. Jafet was very precise with the work done and reasonable price. The quality of work exceeded expectations.' },
  { name: 'Julie C.', initials: 'JC', text: 'They did a wonderful job on my house! They were very clean, professional and friendly.' },
]

export function HV2Hero() {
  return (
    <section id="home" className="hv2-hero">
      <div className="hv2-hero-media">
        {/* Real job photo: Douglas, MA living room after the repaint (projects.ts). */}
        <Image
          src="/hero/interior-douglas-living-room-panel.webp"
          alt="Living room of a Douglas, Massachusetts home after an interior repaint by JH Painting Services, sage and greige walls under a vaulted ceiling"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 760px) 100vw, 55vw"
          quality={72}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hv2-hero-fade" />
      <div className="hv2-wrap hv2-hero-inner">
        <div className="hero-text">
          <p className="hv2-eyebrow-light">Residential &amp; Commercial</p>
          <h1 className="hv2-h1">
            Professional <span>Painting Services</span> in Massachusetts
          </h1>
          <p className="hero-description-short hv2-lead">
            Transform your home with quality painting, cabinet refinishing and carpentry work you can trust.
          </p>
          <ul className="hv2-trust">
            <li><Shield /><span>Licensed<br />&amp; Insured</span></li>
            <li><Trophy /><span>5-Year<br />Warranty</span></li>
            <li><Leaf /><span>EPA<br />Lead-Safe Certified</span></li>
          </ul>
          <div className="hv2-ctas">
            <a href="tel:+15086908886" className="hv2-btn hv2-btn-red"><Phone /> (508) 690-8886</a>
            <a href="#quote-form" className="hv2-btn hv2-btn-ghost"><Calendar /> Get a Free Estimate</a>
          </div>
          <p className="hv2-rating">
            <Stars /> <strong>5.0 Rating | 40+ Reviews</strong>
            <span>Trusted by homeowners across Massachusetts</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export function HV2Services() {
  return (
    <section id="services" className="hv2-section">
      <div className="hv2-wrap">
        <p className="hv2-eyebrow">Our Services</p>
        <h2 className="hv2-h2">Complete Painting &amp; Home Improvement Services</h2>
        <span className="hv2-rule" />
        <div className="hv2-svc-grid">
          {SERVICES.map((s) => (
            <Link key={s.key} href={s.href} className="hv2-svc">
              <span className="hv2-svc-img">
                <Image src={s.image} alt={`${s.title} by JH Painting Services`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" quality={70} loading="lazy" style={{ objectFit: 'cover' }} />
              </span>
              <span className="hv2-svc-icon">{ICONS[s.key]}</span>
              <span className="hv2-svc-title">{s.title}</span>
              <span className="hv2-svc-desc">{s.desc}</span>
              <span className="hv2-svc-go"><Arrow /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HV2Results() {
  return (
    <section id="our-work" className="hv2-section hv2-dark">
      <div className="hv2-wrap">
        <p className="hv2-eyebrow">Our Work</p>
        <h2 className="hv2-h2 hv2-h2-light">Real Results, Happier Homes</h2>
        <p className="hv2-sub-light">See the transformation our painting services can make.</p>
        <div className="hv2-res-grid">
          {RESULTS.map((r) => (
            <Link key={r.label} href={r.href} className="hv2-res">
              <span className="hv2-res-frame">
                <span className="hv2-res-half">
                  <Image src={r.before} alt={`Before: ${r.alt}`} fill sizes="(max-width: 760px) 50vw, 25vw" quality={70} loading="lazy" style={{ objectFit: 'cover' }} />
                  <em className="hv2-tag hv2-tag-before">Before</em>
                </span>
                <span className="hv2-res-half">
                  <Image src={r.after} alt={`After: ${r.alt}`} fill sizes="(max-width: 760px) 50vw, 25vw" quality={70} loading="lazy" style={{ objectFit: 'cover' }} />
                  <em className="hv2-tag hv2-tag-after">After</em>
                </span>
              </span>
              <span className="hv2-res-label">{r.label}</span>
            </Link>
          ))}
        </div>
        <p className="hv2-res-more"><Link href="/projects">See every documented job →</Link></p>
      </div>
    </section>
  )
}

export function HV2About() {
  return (
    <section id="about" className="hv2-section hv2-about">
      <div className="hv2-wrap hv2-about-grid">
        <div className="hv2-about-photo">
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
            alt="Jafet, owner of JH Painting Services in Marlborough, Massachusetts"
            fill
            sizes="(max-width: 900px) 90vw, 300px"
            quality={75}
            loading="lazy"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
        <div className="hv2-about-text">
          <p className="hv2-eyebrow hv2-left">About Us</p>
          <h2 className="hv2-h2 hv2-left">A Local Painting Company You Can Trust</h2>
          <p>
            Founded by <strong>Jafet</strong>, JH Painting Services is a painting contractor based in Marlborough,
            Massachusetts, serving homeowners and businesses across the state. We take pride in exceptional
            craftsmanship, reliable service and long-lasting results.
          </p>
          <ul className="hv2-checks">
            <li><Shield /> Licensed &amp; Insured ($2M)</li>
            <li><Trophy /> 5-Year Warranty on Exterior Work</li>
            <li><Users /> EPA Lead-Safe Certified</li>
            <li><Pin /> Serving {CITY_COUNT} Massachusetts Cities</li>
          </ul>
        </div>
        <div id="quote-form" className="hv2-form">
          <p className="hv2-eyebrow hv2-left">Get a Free Estimate</p>
          <h3>Request Your Free Estimate</h3>
          <p className="hv2-form-sub">Fill out the form and we&apos;ll get back to you quickly.</p>
          <CapacityNotice />
          <LazyHeroForm
            className="hv2-form-iframe"
            src="https://api.leadconnectorhq.com/widget/form/gmVSZsO5e3S0pbXmmnPn"
            title="Get Your Free Painting Estimate"
          />
        </div>
      </div>
    </section>
  )
}

export function HV2Reviews() {
  return (
    <section id="reviews" className="hv2-section hv2-soft">
      <div className="hv2-wrap">
        <p className="hv2-eyebrow">Our Customers</p>
        <h2 className="hv2-h2">What Homeowners Say About Us</h2>
        <div className="hv2-rev-grid">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="hv2-rev">
              <Stars size={20} />
              <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption>
                <span className="hv2-avatar" aria-hidden="true">{r.initials}</span>
                <span><strong>{r.name}</strong><em>Google review</em></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="hv2-res-more hv2-dark-link">
          <a href="https://g.page/r/Cb984Z3qm9PsEAE/review" target="_blank" rel="noopener noreferrer">5.0 from 40+ Google reviews. Read them on Google ↗</a>
        </p>
      </div>
    </section>
  )
}

export function HV2Cta() {
  return (
    <section className="hv2-cta">
      <div className="hv2-wrap hv2-cta-inner">
        <span className="hv2-cta-icon"><Roller /></span>
        <div className="hv2-cta-text">
          <h2>Ready to Transform Your Home?</h2>
          <p>Contact JH Painting Services today for your free estimate.</p>
        </div>
        <div className="hv2-ctas">
          <a href="tel:+15086908886" className="hv2-btn hv2-btn-red"><Phone /> (508) 690-8886</a>
          <a href="#quote-form" className="hv2-btn hv2-btn-ghost"><Calendar /> Get a Free Estimate</a>
        </div>
      </div>
    </section>
  )
}
