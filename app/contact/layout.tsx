import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  // Title was already 59 chars — good. Aligning "Same Day" with the
  // siteConfig.responseTime ("24-48 hours") to stop the 3-version mismatch
  // (some pages said Same Day, some 24hr, some 24-48 hours).
  title: 'Free Painting Quote MA | 24–48 hr Response | (508) 690-8886',
  // Description trimmed 192 → 153 chars. Removed redundant "SAME DAY"
  // claim that contradicted the consistent "24–48 hours" we use everywhere.
  description:
    'Free painting estimate in 24–48 hours. Call (508) 690-8886 or fill the form. Interior, exterior, cabinets. 40+ 5-star reviews. Licensed & $2M insured.',
  path: '/contact',
  ogImageAlt: 'Get FREE Painting Quote — JH Painting Services Massachusetts',
  keywords: [
    'free painting quote Massachusetts',
    'painting estimate MA',
    'painters near me free estimate',
    'painting quote same day',
    'contact painters MA',
    'painting contractors phone number',
    'free painting consultation',
    'get painting quote online',
    'painters Marlborough MA',
    'painting company contact Massachusetts',
  ],
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
