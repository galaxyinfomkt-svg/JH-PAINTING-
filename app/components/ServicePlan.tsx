import Link from 'next/link'
import { composeServicePlan, composeCityPlan } from '@/app/data/servicePlan'

/**
 * "Planning {service} in {city}" - what this town's housing era, building mix,
 * size, value and weather change about THIS service, plus the three closest
 * jobs we actually documented. See app/data/servicePlan.ts for the why and the
 * sources. Renders nothing for a town without Census data.
 */
export default function ServicePlan({
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
  const plan =
    service && serviceName
      ? composeServicePlan(cityName, citySlug, service, serviceName)
      : composeCityPlan(cityName, citySlug)
  if (!plan) return null

  return (
    <section className="housing" aria-labelledby="plan-h">
      <div className="housing-inner">
        <p className="housing-eyebrow">Before we quote</p>
        <h2 id="plan-h" className="housing-h">{plan.heading}</h2>

        {plan.facts.length > 0 && (
          <dl className="housing-stats">
            {plan.facts.map((f) => (
              <div key={f.label}>
                <dd>{f.value}</dd>
                <dt>{f.label}</dt>
              </div>
            ))}
          </dl>
        )}

        {plan.paragraphs.map((p, i) => (
          <p key={i} className="housing-p">{p}</p>
        ))}

        {plan.jobs.length > 0 && (
          <div className="housing-near">
            <h3 className="housing-near-h">
              Documented jobs closest to {cityName}
            </h3>
            <ul className="plan-jobs">
              {plan.jobs.map((j) => (
                <li key={j.project.slug}>
                  <strong>{j.sameTown ? `${j.project.city} (this town)` : `${j.project.city}, about ${j.miles} mi away`}</strong>
                  {': '}
                  {j.project.title}
                  {j.project.space ? ` (${j.project.space.toLowerCase()})` : ''}
                  {j.completed ? `, ${j.completed}` : ''}
                  {j.project.pairs?.length ? ', with before-and-after photos' : ''}.
                </li>
              ))}
            </ul>
            <Link href="/projects" className="housing-link">See the photos from every job →</Link>
          </div>
        )}

        <p className="housing-src">Sources: {plan.sources.join('; ')}.</p>
      </div>
    </section>
  )
}
