import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'House Painters MA | JH Painting | FREE Quote',
  description: 'Residential painting in Massachusetts. Interior + exterior experts. Transform your home in days. 40+ 5-star reviews. Licensed & $2M insured. (508) 690-8886',
  path: '/services/residential-painting',
  ogImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
  ogImageAlt: 'Professional Residential Painting Services Massachusetts - JH Painting',
  keywords: [
    'residential painters Massachusetts',
    'home painters near me',
    'residential painters MA',
    'house painters Massachusetts',
    'home painters',
    'residential house painters',
    'professional home painters',
    'best residential painters Massachusetts',
    'house painters near me',
    'apartment painters',
    'condo painters',
    'townhouse painters Massachusetts',
    'whole house painters MA',
    'full house painters',
    'home painters MA',
    'local home painters',
    'residential painters near me',
  ],
})

export default function ResidentialPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
