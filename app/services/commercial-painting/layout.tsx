import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Commercial Painters MA | JH Painting | FREE Quote',
  description: 'Commercial painting in Massachusetts. Offices, retail, restaurants. After-hours available, zero disruption. $2M insured. (508) 690-8886',
  path: '/services/commercial-painting',
  ogImageAlt: 'Professional Commercial Painting Services Massachusetts - JH Painting',
  keywords: [
    'commercial painters Massachusetts',
    'commercial painters near me',
    'commercial painters MA',
    'office painters Massachusetts',
    'retail store painters',
    'restaurant painters',
    'warehouse painters Massachusetts',
    'professional commercial painters',
    'best commercial painters Massachusetts',
    'business painters MA',
    'industrial painters Massachusetts',
    'office building painters',
    'storefront painters',
    'commercial interior painters MA',
    'commercial exterior painters',
    'business painters near me',
    'local commercial painters',
  ],
})

export default function CommercialPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
