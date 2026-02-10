import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interior House Painters MA | #1 Painters | FREE Quote | 5-Star',
  description: 'Best interior house painters in Massachusetts. Professional painters for walls, ceilings, trim & baseboards. Premium Benjamin Moore & Sherwin-Williams paints. Licensed & insured. 40+ 5-star reviews. FREE estimates - Call (508) 690-8886 today!',
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
  ].join(', '),
  openGraph: {
    title: 'Interior House Painters Massachusetts | Best Interior Painters | JH Painting',
    description: '#1 interior house painters in Massachusetts. Expert wall, ceiling & trim painters. Premium paints, flawless finish. Licensed & insured. FREE estimates!',
    url: 'https://jhpaintingservices.com/services/interior-painting',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
        width: 1200,
        height: 630,
        alt: 'Professional Interior Painting Services Massachusetts - JH Painting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interior House Painters Massachusetts | #1 Painters | (508) 690-8886',
    description: 'Best interior painters in MA. Premium paints, expert painters. Licensed & insured. Call now for FREE estimate!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png'],
    creator: '@jhpaintingma',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/interior-painting',
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

export default function InteriorPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
