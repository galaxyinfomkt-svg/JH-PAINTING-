import Link from 'next/link'
import Image from 'next/image'
import { housingStats, housingNarrative, nearestProject, HOUSING_SOURCE, coverOf } from '@/app/data/housing'
import { sliderPairs, formatCompleted } from '@/app/data/projects'
import BeforeAfterCard from './BeforeAfterCard'

/**
 * "Homes in {city}" - Census housing facts for the town and what they change for
 * this service, plus the nearest job we've actually documented. Renders nothing
 * for a town without Census data. See app/data/housing.ts for the why.
 */
export default function HousingBlock({
  citySlug,
  cityName,
  service,
  serviceName,
}: {
  citySlug: string
  cityName: string
  service?: string
  serviceName?: string
}) {
  const stats = housingStats(citySlug)
  if (stats.length === 0) return null
  const [facts, impact] = housingNarrative(cityName, citySlug, service)
  const near = nearestProject(citySlug, service)
  // Same-town jobs are already shown by CityProof; here we show the closest one elsewhere.
  const showNear = near && !near.sameTown
  const pair = showNear && near.project.pairs?.length ? sliderPairs([[near.project.slug, 0]])[0] : undefined

  return (
    <section className="housing" aria-labelledby="housing-h">
      <div className="housing-inner">
        <p className="housing-eyebrow">Local housing stock</p>
        <h2 id="housing-h" className="housing-h">
          Homes in {cityName}{serviceName ? ` and what they mean for ${serviceName.toLowerCase()}` : ''}
        </h2>
        <dl className="housing-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dd>{s.value}</dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="housing-p">{facts}</p>
        <p className="housing-p">{impact}</p>
        <p className="housing-src">Source: {HOUSING_SOURCE}.</p>

        {showNear ? (
          <div className="housing-near">
            <h3 className="housing-near-h">
              Our closest documented job: {near.project.city}, about {near.miles} miles from {cityName}
            </h3>
            <p className="housing-p">
              {near.project.client ? `${near.project.client}: ` : ''}
              {near.project.title}
              {near.project.space ? ` (${near.project.space.toLowerCase()})` : ''}
              {near.project.completed ? `, ${formatCompleted(near.project.completed)}` : ''}. Photographed by our crew on site.
            </p>
            {pair ? (
              <div className="housing-near-ba"><BeforeAfterCard pair={pair} /></div>
            ) : (
              <Image
                src={coverOf(near.project).thumb}
                alt={`${near.project.serviceLabel} by JH Painting Services in ${near.project.city}, MA`}
                width={coverOf(near.project).w}
                height={coverOf(near.project).h}
                sizes="(max-width: 640px) 90vw, 420px"
                className="housing-near-img"
                loading="lazy"
              />
            )}
            <Link href="/projects" className="housing-link">See every documented job →</Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
