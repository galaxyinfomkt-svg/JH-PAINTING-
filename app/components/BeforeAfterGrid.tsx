/**
 * BeforeAfterGrid — wraps the BeforeAfterSlider for the gallery layout.
 *
 * Previously imported the slider with `ssr: false` which meant the initial
 * server-rendered HTML contained ONLY a gray placeholder — no images, no
 * structure. The conversion-critical before/after pairs were invisible at
 * paint and only appeared after client-side hydration (often 1–3s on slow
 * connections, after the Lighthouse window).
 *
 * Fix: import the slider normally so its <Image> tags render in SSR HTML.
 * The slider still hydrates as a client component for the drag interaction.
 * Initial paint shows BOTH images (with the after on top by default) so the
 * user sees the transformation immediately; drag interactivity arrives at
 * hydration without any visual change.
 */

import BeforeAfterSlider from './BeforeAfterSlider'

interface Pair {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
}

export default function BeforeAfterGrid({ pairs }: { pairs: Pair[] }) {
  return (
    <div className="before-after-grid">
      {pairs.map((pair, idx) => (
        <BeforeAfterSlider
          key={idx}
          beforeImage={pair.before}
          afterImage={pair.after}
          beforeAlt={pair.beforeAlt}
          afterAlt={pair.afterAlt}
        />
      ))}
    </div>
  )
}
