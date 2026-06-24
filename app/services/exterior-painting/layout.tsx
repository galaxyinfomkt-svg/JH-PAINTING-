import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  // Title trimmed 73 → 56 chars (was getting truncated mid-phone-number in
  // SERP - phone was being cut off). Kept "5-Yr Warranty" as the
  // differentiator because that's the strongest trust signal for exterior
  // (warranty length is a vetted promise, not a "#1" claim).
  title: 'Exterior House Painters MA | 5-Yr Warranty | Free Quote',
  // Description trimmed 332 → 154 chars (was 2.1× over the 160 limit, so
  // Google was cutting it mid-sentence). Kept the proof-points users
  // actually scan for: paint brand + warranty + reviews + phone.
  description:
    'Exterior house painting in MA. Power wash, prep, 2 coats Benjamin Moore Aura or Sherwin-Williams Duration. 5-yr warranty. 40+ reviews. Free quote: (508) 690-8886',
  path: '/services/exterior-painting',
  ogImageAlt:
    'Professional exterior house painting in Massachusetts by JH Painting Services - before and after home transformation with premium weather-resistant paint',
  keywords: [
    'exterior painting Massachusetts',
    'exterior house painters Massachusetts',
    'exterior house painters near me',
    'exterior painters MA',
    'exterior painting services Massachusetts',
    'house painters Massachusetts',
    'durable exterior painting Massachusetts',
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
