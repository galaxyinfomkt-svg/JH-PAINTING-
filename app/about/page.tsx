import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { credentials, publishedCredentials, hasPublishedCredentials, founder } from '@/lib/credentials'
import { projects, projectCities, totalProjectPhotos } from '@/app/data/projects'
import { CITY_COUNT } from '@/app/data/cities'
import { STATS, yearsInBusiness } from '@/lib/constants'
import './about.css'

/**
 * /about
 *
 * This page was linked from the footer of roughly 1,033 pages and returned a
 * 404. For a contractor who works inside somebody's home, "who is responsible
 * for this business" is the first thing a Google quality rater looks for, so
 * the gap was costing every page on the site, not just this URL.
 *
 * Everything here is either already published elsewhere on the site or is
 * verifiable. License numbers render only when lib/credentials.ts holds them;
 * an empty number prints nothing rather than a claim nobody can check.
 */

const SITE = 'https://jhpaintingservices.com'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE}/about#page`,
  url: `${SITE}/about`,
  name: 'About JH Painting Services',
  isPartOf: { '@id': `${SITE}/#website` },
  about: { '@id': `${SITE}/#organization` },
  // References the Person node already declared in the root layout instead of
  // minting a second founder entity.
  mainEntity: { '@id': `${SITE}/#founder` },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE}/about` },
    ],
  },
}

export default function AboutPage() {
  const years = yearsInBusiness()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main className="ab">
        <header className="ab-top">
          <p className="ab-brow">About</p>
          <h1 className="ab-h1">Who you are hiring</h1>
          <p className="ab-lede">
            JH Painting Services is a painting and carpentry contractor based in Marlborough,
            Massachusetts. {founder.name} founded it in {founder.since} and still runs the crews.
          </p>
        </header>

        <section className="ab-sec">
          <h2>The owner</h2>
          <p>
            {founder.name} is the {founder.role.toLowerCase()}. He is on site or reachable by phone
            on every job. That is the practical difference between us and a company where you meet a
            salesperson once and never see anyone from the office again.
          </p>
          <p>
            The business has painted Massachusetts homes and commercial buildings for {years} years
            out of Marlborough. Our crews work in English, Portuguese and Spanish.
          </p>
        </section>

        <section className="ab-sec">
          <h2>What we are licensed to do</h2>
          <p>
            Two credentials matter for residential painting in Massachusetts. It is worth knowing
            what they are before you hire anyone, including us.
          </p>

          <dl className="ab-creds">
            {credentials.map((c) => {
              const has = c.number.trim().length > 0
              return (
                <div key={c.name} className={has ? 'ab-cred ab-cred-on' : 'ab-cred'}>
                  <dt>
                    {c.name}
                    {c.issuer ? <span className="ab-issuer">{c.issuer}</span> : null}
                  </dt>
                  <dd>
                    <p>{c.plain}</p>
                    {has ? (
                      <p className="ab-num">
                        <strong>{c.number}</strong>
                        {c.verifyUrl ? (
                          <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer">
                            Verify with the issuer
                          </a>
                        ) : null}
                      </p>
                    ) : (
                      <p className="ab-pending">
                        We provide our current certificate with every written estimate.
                        {c.verifyUrl ? (
                          <>
                            {' '}
                            You can also search the public register{' '}
                            <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer">
                              here
                            </a>
                            .
                          </>
                        ) : null}
                      </p>
                    )}
                  </dd>
                </div>
              )
            })}
          </dl>

          {!hasPublishedCredentials() && (
            <p className="ab-note">
              We print a license number here only once it is confirmed current. A number on a website
              that turns out to be expired, or to belong to a different business with a similar name,
              is worse than no number at all. Ask us for the certificate and check it against the
              state register yourself.
            </p>
          )}
        </section>

        <section className="ab-sec">
          <h2>What we can show you</h2>
          <p>
            Anyone can claim experience. These are photographs from our own job sites, not stock
            images, grouped by the job they came from.
          </p>
          <dl className="ab-stats">
            <div>
              <dt>Documented jobs</dt>
              <dd>{projects.length}</dd>
            </div>
            <div>
              <dt>Site photographs</dt>
              <dd>{totalProjectPhotos}</dd>
            </div>
            <div>
              <dt>Towns photographed</dt>
              <dd>{projectCities.length}</dd>
            </div>
            <div>
              <dt>Google rating</dt>
              <dd>
                {STATS.rating.toFixed(1)}
                <span>from {STATS.reviewLabel} reviews</span>
              </dd>
            </div>
          </dl>
          <p>
            <Link href="/projects" className="ab-link">
              See the job archive
            </Link>
          </p>
        </section>

        <section className="ab-sec">
          <h2>Where we work</h2>
          <p>
            We cover {CITY_COUNT} Massachusetts communities from Marlborough, reaching most of
            MetroWest, Greater Boston, Worcester County and the Blackstone Valley. The towns we hold
            job photographs for are {projectCities.join(', ')}.
          </p>
          <p>
            <Link href="/massachusetts" className="ab-link">
              Full service area
            </Link>
          </p>
        </section>

        <section className="ab-sec ab-contact">
          <h2>Talk to us</h2>
          <p>
            A walk-through costs nothing. We look at the actual surfaces, tell you what needs repair
            before coating and what does not, and put the scope in writing before anything starts.
          </p>
          <div className="ab-btns">
            <a href="tel:+15086908886" className="ab-btn ab-btn-solid">
              Call (508) 690-8886
            </a>
            <Link href="/contact" className="ab-btn ab-btn-line">
              Request an estimate
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
