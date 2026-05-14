import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Cabinet Painting MA | Save 70% | JH Painting',
  description: 'Cabinet painting & refinishing in Massachusetts. Factory-smooth spray finish, save 70% vs replacement. 40+ 5-star reviews. (508) 690-8886',
  path: '/services/cabinet-painting',
  ogImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png',
  ogImageAlt: 'Professional Cabinet Painting & Refinishing Massachusetts - JH Painting',
  keywords: [
    'cabinet painters Massachusetts',
    'cabinet painters near me',
    'cabinet painters MA',
    'kitchen cabinet painters Massachusetts',
    'cabinet spray painters',
    'professional cabinet painters',
    'best cabinet painters Massachusetts',
    'kitchen cabinet painters MA',
    'cabinet painters near me',
    'bathroom cabinet painters',
    'cabinet refinishing painters Massachusetts',
    'cabinet painters MA',
    'local cabinet painters',
  ],
})

export default function CabinetPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
