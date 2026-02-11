import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wood Rot Spreading? Carpentry Repair MA | Fix Before It\'s Worse ⭐',
  description: 'Noticed rot on your trim or siding? DON\'T ignore it. Small rot becomes BIG damage fast. We fix windows, doors, decks, trim. Licensed & $2M insured. FREE inspection → (508) 690-8886',
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
  ].join(', '),
  openGraph: {
    title: 'Carpentry Services Massachusetts | Expert Wood Repairs | JH Painting',
    description: 'Professional carpentry services in Massachusetts. Window frames, door repairs, siding, decks. Licensed & insured. FREE estimates!',
    url: 'https://jhpaintingservices.com/services/carpentry',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'Professional Carpentry Services Massachusetts - JH Painting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carpentry Services MA | Expert Wood Repairs | (508) 690-8886',
    description: 'Professional carpentry in Massachusetts. Window frames, doors, siding, decks. Call for FREE estimate!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
    creator: '@jhpaintingma',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/carpentry',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'US-MA',
    'geo.placename': 'Massachusetts',
    'rating': 'General',
  },
}

export default function CarpentryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
