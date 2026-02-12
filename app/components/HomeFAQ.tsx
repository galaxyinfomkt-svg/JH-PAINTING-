'use client'

import { useState } from 'react'

const ChevronDownIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
)

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)

const homepageFaqs = [
  {
    question: "How much does it cost to paint a house in Massachusetts?",
    answer: "Interior painting typically costs $3-$5 per square foot, while exterior painting runs $4-$7 per square foot depending on your home's size, condition, and complexity. A typical interior project costs $4,000-$8,000, and exteriors run $5,000-$15,000. We provide free, detailed estimates with transparent pricing - no hidden fees or surprises."
  },
  {
    question: "How long does a painting project take?",
    answer: "Most interior room painting takes 1-2 days per room. A full interior typically takes 3-7 days. Exterior painting usually takes 5-10 days depending on home size and weather conditions. We'll provide a specific timeline during your free estimate and keep you updated throughout the project."
  },
  {
    question: "What paint brands do you use?",
    answer: "We exclusively use premium paints from Benjamin Moore and Sherwin-Williams. These top-tier paints are specifically formulated to withstand New England's harsh climate - our freeze-thaw cycles, humidity, and intense UV exposure. Quality paint lasts 7-10+ years versus 3-5 years for budget alternatives."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Yes! JH Painting Services is fully licensed in Massachusetts and carries comprehensive liability insurance and workers' compensation coverage. We're also EPA Lead-Safe Certified for homes built before 1978. Your home and family are fully protected when you work with us."
  },
  {
    question: "Do you offer free estimates?",
    answer: "Absolutely! We provide free, no-obligation estimates for all projects. We'll visit your property, discuss your vision, assess the scope of work, and provide a detailed written estimate. There's never any pressure to commit - take your time and compare."
  },
  {
    question: "What areas do you serve?",
    answer: "We serve 114+ cities across Massachusetts including Boston, Cambridge, Worcester, Marlborough, and the entire MetroWest region. Our crews travel throughout the state, and being based in Marlborough, we offer competitive pricing across our service area."
  },
  {
    question: "How do I prepare for my painting project?",
    answer: "We handle most preparation! For interiors, simply clear small items from surfaces and move furniture away from walls (or we can do this). For exteriors, ensure we have access to your home's perimeter. We'll cover and protect everything else - floors, furniture, landscaping, and fixtures."
  },
  {
    question: "What is your warranty?",
    answer: "We stand behind our work with strong warranties: 5 years on exterior painting and 3 years on interior painting. Our warranty covers peeling, blistering, cracking, and fading under normal conditions. If something isn't right, we'll fix it - no questions asked."
  }
]

export default function HomeFAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="section faq-section-home">
      <div className="container">
        <div className="section-header section-header-enhanced">
          <span className="section-eyebrow">Got Questions?</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about our painting services. Can&apos;t find your answer? Call us at (508) 690-8886.</p>
        </div>

        <div className="faq-grid-home">
          {homepageFaqs.map((faq, idx) => (
            <div key={idx} className={`faq-item-home ${openFaqIndex === idx ? 'open' : ''}`}>
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="faq-question-home"
                aria-expanded={openFaqIndex === idx ? "true" : "false"}
              >
                <h3>{faq.question}</h3>
                <ChevronDownIcon size={24} />
              </button>
              <div className={`faq-answer-home ${openFaqIndex === idx ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta-home">
          <p>Still have questions? We&apos;re here to help!</p>
          <a href="tel:+15086908886" className="btn btn-primary">
            <PhoneIcon />
            Call (508) 690-8886
          </a>
        </div>
      </div>
    </section>
  )
}
