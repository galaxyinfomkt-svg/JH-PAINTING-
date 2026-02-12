'use client'

import dynamic from 'next/dynamic'

const BeforeAfterSlider = dynamic(() => import('./BeforeAfterSlider'), {
  ssr: false,
  loading: () => <div style={{ height: '400px', background: '#f3f4f6', borderRadius: '16px' }} />,
})

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
