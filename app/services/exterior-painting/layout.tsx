import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  // "#1" self-claim removed (Task 6). Replaced with concrete, verifiable trust
  // signals (5.0★, 40+ reviews, 5-year warranty) that match what the schema
  // and the GBP report — no risk of contradiction.
  title: 'Exterior House Painters Massachusetts | 5-Year Warranty | (508) 690-8886',
  description:
    "Exterior house painting in Massachusetts by JH Painting Services. Power wash, surface prep, caulking, priming + 2 coats premium Benjamin Moore Aura or Sherwin-Williams Duration. 5-year warranty. EPA Lead-Safe certified. 5.0★ from 40+ Google reviews. Licensed & $2M insured. Serving 117+ MA cities. Free estimate: (508) 690-8886",
  path: '/services/exterior-painting',
  ogImageAlt:
    'Professional exterior house painting in Massachusetts by JH Painting Services — before and after home transformation with premium weather-resistant paint',
  keywords: [
    'exterior painting Massachusetts',
    'exterior house painters Massachusetts',
    'exterior house painters near me',
    'exterior painters MA',
    'exterior painting services Massachusetts',
    'house painters Massachusetts',
    'exterior painting cost Massachusetts',
    'best exterior painters Massachusetts',
    'exterior painters Boston MA',
    'exterior painters Worcester MA',
    'exterior painters Framingham MA',
    'exterior painters Natick MA',
    'exterior painters Waltham MA',
    'exterior painters Newton MA',
    'exterior painters Marlborough MA',
    'exterior painters Cambridge MA',
    'exterior painters Wellesley MA',
    'exterior painters MetroWest MA',
    'siding painters Massachusetts',
    'exterior trim painters MA',
    'deck staining Massachusetts',
    'fence painters Massachusetts',
    'EPA lead-safe painters MA',
    'licensed exterior painters Massachusetts',
    'exterior house painting near me',
    'professional exterior painters',
    'weather-resistant exterior painting MA',
  ],
})

export default function ExteriorPaintingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
