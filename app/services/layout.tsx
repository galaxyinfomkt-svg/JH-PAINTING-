import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'All Painting Services MA | JH Painting | FREE Quote',
  description:
    'Interior, exterior, cabinets, commercial painting in MA. Benjamin Moore paints. 40+ 5-star reviews. Licensed & $2M insured. (508) 690-8886',
  path: '/services',
  ogImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064e65773e16aacef7d054.png',
  ogImageAlt: 'All Painting Services Massachusetts — JH Painting',
  keywords: [
    'painting services Massachusetts',
    'painting services near me',
    'painters MA',
    'interior painting Massachusetts',
    'exterior painting Massachusetts',
    'commercial painting MA',
    'residential painters Massachusetts',
    'cabinet painting services',
    'carpentry services MA',
    'house painters Massachusetts',
    'professional painters near me',
    'painting contractors MA',
    'all painting services',
    'full service painters MA',
    'one stop painting company',
  ],
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
