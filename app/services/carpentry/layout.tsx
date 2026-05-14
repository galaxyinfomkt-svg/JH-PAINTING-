import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Carpentry Repair MA | JH Painting | FREE Quote',
  description: 'Professional carpentry in Massachusetts. Window frames, doors, decks, trim, siding repair. Licensed & $2M insured. (508) 690-8886',
  path: '/services/carpentry',
  ogImageAlt: 'Professional Carpentry Services Massachusetts - JH Painting',
  keywords: [
    'carpentry services Massachusetts',
    'carpentry near me',
    'carpentry MA',
    'wood repair Massachusetts',
    'window frame repair MA',
    'door frame repair Massachusetts',
    'siding repair Massachusetts',
    'deck repair MA',
    'trim carpentry Massachusetts',
    'rotten wood repair MA',
    'carpentry contractors Massachusetts',
    'professional carpentry services',
    'home carpentry repairs',
  ],
})

export default function CarpentryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
