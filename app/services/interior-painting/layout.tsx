import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Interior Painters MA | JH Painting | FREE Quote',
  description: 'Expert interior painting in Massachusetts. Premium Benjamin Moore paints, zero mess, done in days. 40+ 5-star reviews. Licensed & $2M insured. (508) 690-8886',
  path: '/services/interior-painting',
  ogImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
  ogImageAlt: 'Professional Interior Painting Services Massachusetts - JH Painting',
  keywords: [
    'interior painters Massachusetts',
    'interior house painters near me',
    'interior painters MA',
    'wall painters Massachusetts',
    'ceiling painters',
    'trim painters',
    'professional interior painters',
    'best interior painters Massachusetts',
    'room painters MA',
    'house painters near me',
    'bedroom painters',
    'living room painters',
    'kitchen painters',
    'bathroom painters MA',
    'residential interior painters',
    'home interior painters MA',
    'local interior painters',
    'interior painters near me',
  ],
})

export default function InteriorPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
