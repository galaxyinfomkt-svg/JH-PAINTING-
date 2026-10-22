'use client'

import dynamic from 'next/dynamic'
import { sliderPairs, type SliderPair } from '@/app/data/projects'

const BeforeAfterCard = dynamic(() => import('./BeforeAfterCard'), {
  ssr: false,
  loading: () => <div style={{ height: '400px', background: '#f3f4f6', borderRadius: '16px' }} />,
})

/* Real pairs first: the crew's own frames, same room and same angle (projects.ts).
   The church exterior stays so exterior work is still represented. */
const beforeAfterPairs: SliderPair[] = [
  ...sliderPairs([
    ['interior-repaint-douglas', 0],
    ['interior-repaint-douglas', 10],
    ['interior-repaint-douglas', 11],
    ['interior-repaint-douglas', 2],
    ['interior-repaint-groton', 0],
    ['roto-rooter-marlborough-cafeteria', 0],
    ['deck-restoration-chelmsford', 0],
  ]),
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23bb3443ab4.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg',
    beforeAlt: 'Waltham Church exterior before historic renewal painting',
    afterAlt: 'Waltham Church exterior after incredible transformation by JH Painting'
  }
]

export default function HomeBeforeAfter() {
  return (
    <section className="before-after-section">
      <div className="container">
        <div className="section-header section-header-enhanced">
          <span className="section-eyebrow">See The Difference</span>
          <h2>Before & After Transformations</h2>
          <p>Drag the slider to see the amazing results we deliver for our Massachusetts clients.</p>
        </div>

        <div className="before-after-grid">
          {beforeAfterPairs.map((pair, idx) => (
            <BeforeAfterCard key={idx} pair={pair} />
          ))}
        </div>
      </div>
    </section>
  )
}
