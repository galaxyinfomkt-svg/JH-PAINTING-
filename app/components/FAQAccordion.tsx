'use client'

import { useState } from 'react'

interface FAQ {
  question: string
  answer: string
}

const ChevronDownIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
)

export default function FAQAccordion({ faqs, className = 'city-faq-list' }: { faqs: FAQ[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={className}>
      {faqs.map((faq, idx) => (
        <div key={idx} className={`city-faq-item ${openIndex === idx ? 'open' : ''}`}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="city-faq-question"
          >
            <h3>{faq.question}</h3>
            <ChevronDownIcon size={24} />
          </button>
          <div style={{
            maxHeight: openIndex === idx ? '500px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <p className="city-faq-answer">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
