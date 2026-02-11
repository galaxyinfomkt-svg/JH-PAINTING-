import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Green Mold on Siding? Power Washing MA | Look New in 1 Day ⭐',
  description: 'Embarrassed by dirty siding, green mold, black streaks? We blast it away in ONE day. Decks, driveways, patios sparkling clean. $2M insured. FREE quote → (508) 690-8886',
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
  ].join(', '),
  openGraph: {
    title: 'Power Washing Services Massachusetts | Professional Pressure Cleaning | JH Painting',
    description: '#1 power washing services in Massachusetts. Expert deck, siding & driveway cleaning. Licensed & insured. FREE estimates!',
    url: 'https://jhpaintingservices.com/services/power-washing',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp',
        width: 1200,
        height: 630,
        alt: 'Professional Power Washing Services Massachusetts - JH Painting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power Washing Services Massachusetts | (508) 690-8886',
    description: 'Professional power washing in MA. Decks, siding, driveways. Licensed & insured. Call now for FREE estimate!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp'],
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/power-washing',
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

export default function PowerWashingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
