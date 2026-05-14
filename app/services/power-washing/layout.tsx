import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Power Washing MA | JH Painting | FREE Quote',
  description: 'Professional power washing in Massachusetts. Decks, driveways, siding sparkling clean in one day. $2M insured. (508) 690-8886',
  path: '/services/power-washing',
  ogImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp',
  ogImageAlt: 'Professional Power Washing Services Massachusetts - JH Painting',
  keywords: [
    'power washing Massachusetts',
    'pressure washing MA',
    'power washing services near me',
    'deck power washing',
    'siding power washing',
    'driveway pressure washing',
    'patio cleaning Massachusetts',
    'professional power washing',
    'house pressure washing MA',
    'commercial power washing',
    'residential power washing',
    'exterior cleaning services',
    'power washing contractors MA',
    'pressure cleaning services',
  ],
})

export default function PowerWashingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
