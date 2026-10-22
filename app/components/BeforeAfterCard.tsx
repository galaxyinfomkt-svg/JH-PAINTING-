import Link from 'next/link'
import BeforeAfterSlider from './BeforeAfterSlider'
import type { SliderPair } from '@/app/data/projects'

/**
 * A before/after slider plus, for real pairs, the line that says where the job
 * was: "Project in Douglas, MA: ...", with the town linked to its page. On a
 * service page that link is the first-hand bridge from the trade to the town.
 * The older CDN pairs carry no city, so they render as the bare slider.
 */
export default function BeforeAfterCard({ pair }: { pair: SliderPair }) {
  return (
    <figure className="ba-card">
      <BeforeAfterSlider
        beforeImage={pair.before}
        afterImage={pair.after}
        beforeAlt={pair.beforeAlt}
        afterAlt={pair.afterAlt}
        beforeLabel={pair.beforeLabel}
      />
      {pair.city && pair.citySlug ? (
        <figcaption className="ba-card-cap">
          Project in <Link href={`/massachusetts/${pair.citySlug}`}>{pair.city}, MA</Link>
          {pair.caption ? `: ${pair.caption}` : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
