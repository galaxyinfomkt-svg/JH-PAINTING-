import Image from 'next/image'
import Link from 'next/link'
import { projectsForCity, formatCompleted } from '@/app/data/projects'

/**
 * First-hand proof block for /massachusetts/[city] and city+service pages.
 *
 * This renders ONLY when we hold real photographs from that town. It is the
 * difference between a page that is merely different from its 115 siblings and
 * a page that is defensible: generated copy says we serve the town, this shows
 * a job we finished there, with the month and the client where nameable.
 *
 * Renders nothing at all for towns with no documented work - an empty state
 * would be worse than absence, and fabricating one is out of the question.
 */
export default function CityProof({
  citySlug,
  cityName,
  state = 'MA',
  service,
}: {
  citySlug: string
  cityName: string
  state?: string
  /** When set, prefer projects of this trade but fall back to any in town. */
  service?: string
}) {
  const all = projectsForCity(citySlug)
  if (all.length === 0) return null

  const matching = service ? all.filter((p) => p.service === service) : []
  const shown = (matching.length > 0 ? matching : all).slice(0, 3)
  const photos = shown.flatMap((p) =>
    p.photos.slice(0, 4).map((ph) => ({ ...ph, project: p }))
  )

  return (
    <section className="cityproof" aria-labelledby="cityproof-h">
      <div className="cityproof-inner">
        <p className="cityproof-eyebrow">Documented work</p>
        <h2 id="cityproof-h" className="cityproof-h">
          Jobs we&apos;ve finished in {cityName}
        </h2>
        <p className="cityproof-lede">
          These are our own site photographs from {cityName}, {state} - not stock images.
        </p>

        <ul className="cityproof-jobs">
          {shown.map((p) => (
            <li key={p.slug}>
              <span className="cityproof-jt">
                {p.client ? <strong>{p.client}: </strong> : null}
                {p.title}
                {p.space ? ` - ${p.space}` : ''}
              </span>
              <span className="cityproof-jm">
                {p.serviceLabel}
                {p.completed ? ` · ${formatCompleted(p.completed)}` : ''}
              </span>
            </li>
          ))}
        </ul>

        <div className="cityproof-grid">
          {photos.map((ph, i) => (
            <figure key={ph.src} className="cityproof-cell">
              <Image
                src={ph.thumb}
                alt={`${ph.project.serviceLabel}${
                  ph.project.space ? ` - ${ph.project.space}` : ''
                } completed by JH Painting Services in ${cityName}, ${state}`}
                width={ph.w}
                height={ph.h}
                sizes="(max-width: 640px) 50vw, 25vw"
                loading={i < 2 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
        </div>

        <Link href={`/projects#${shown[0].slug}`} className="cityproof-link">
          See the full {cityName} project gallery →
        </Link>
      </div>
    </section>
  )
}
