import Link from 'next/link'
import { cities, normalizeCitySlug } from '@/app/data/cities'

/**
 * "{Service} by town" - every /massachusetts/<city>/<service> page for this
 * service, grouped by county, linked from the /services/<service> hub.
 *
 * WHY (2026-11-25)
 * Search Console showed 536 URLs as "Discovered - currently not indexed": found,
 * never fetched. The 819 city x service pages were linked only from their own
 * city page (home -> /massachusetts -> city -> service), and the seven service
 * hubs - the strongest pages after the home page - linked none of them. This
 * puts each one a single click from its hub.
 */
export default function ServiceTownIndex({ service, serviceName }: { service: string; serviceName: string }) {
  const byCounty = new Map<string, { name: string; href: string }[]>()
  for (const c of cities) {
    const county = c.county ?? 'Other'
    if (!byCounty.has(county)) byCounty.set(county, [])
    byCounty.get(county)!.push({ name: c.name, href: `/massachusetts/${normalizeCitySlug(c.slug)}/${service}` })
  }
  const groups = [...byCounty.entries()]
    .map(([county, list]) => [county, list.sort((a, b) => a.name.localeCompare(b.name))] as const)
    .sort((a, b) => b[1].length - a[1].length)

  return (
    <section className="town-index" aria-labelledby="town-index-h">
      <div className="town-index-inner">
        <h2 id="town-index-h" className="town-index-h">{serviceName} by town</h2>
        <p className="town-index-sub">
          Each town page covers its own housing stock, weather and our nearest documented jobs.
        </p>
        {groups.map(([county, list]) => (
          <div key={county} className="town-index-group">
            <h3>{county}</h3>
            <ul>
              {list.map((t) => (
                <li key={t.href}><Link href={t.href}>{serviceName} in {t.name}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
