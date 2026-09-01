import Link from 'next/link'
import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer'
import { BUSINESS } from '@/lib/constants'
import { CITY_COUNT } from './data/cities'

/**
 * Custom 404.
 *
 * There was no not-found.tsx, so a missing URL rendered Next's bare default:
 * the string "404 This page could not be found." on a blank page, with no
 * header, no navigation and no way back into the site. Two things made that
 * worse than usual here:
 *
 *   - The root layout still wraps it, so the page also showed the unstyled
 *     "Skip to main content" link and the fixed mobile CTA bar floating over
 *     an otherwise empty screen.
 *   - middleware.ts carries a large set of legacy-URL redirects, which means
 *     old inbound links are a live traffic source. Anything the redirect map
 *     misses used to land on a dead end.
 *
 * A visitor who mistypes a city or follows a stale link now gets the header,
 * the phone number and a route back to the pages that matter.
 */
export const metadata: Metadata = {
  title: 'Page Not Found | JH Painting Services',
  description: 'The page you are looking for could not be found.',
  robots: { index: false, follow: true },
}

const DESTINATIONS = [
  { href: '/services', label: 'All painting services', desc: 'Interior, exterior, cabinets, commercial, carpentry, power washing' },
  { href: '/massachusetts', label: 'Service areas', desc: `Every one of the ${CITY_COUNT} Massachusetts cities we cover` },
  { href: '/projects', label: 'Our work', desc: 'Photographs from jobs we have finished' },
  { href: '/contact', label: 'Free estimate', desc: 'Tell us about your project and we will get back to you' },
]

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="nf">
        <div className="container nf-inner">
          <p className="nf-code">404</p>
          <h1 className="nf-title">We couldn&apos;t find that page</h1>
          <p className="nf-lede">
            The link may be out of date, or the address may have a typo. Everything below is
            still here.
          </p>

          <ul className="nf-links">
            {DESTINATIONS.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="nf-link">
                  <span className="nf-link-label">{d.label}</span>
                  <span className="nf-link-desc">{d.desc}</span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="nf-call">
            Or call us directly:{' '}
            <a href={`tel:${BUSINESS.phoneRaw}`} className="nf-phone">
              {BUSINESS.phone}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
