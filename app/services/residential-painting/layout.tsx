import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Residential Painters Massachusetts | #1 Home Painters Near Me | (508) 690-8886',
  description: 'Best residential painters in Massachusetts. Expert interior & exterior home painters. Full house, single room, apartments. Premium paints. Licensed & insured. 40+ 5-star reviews. FREE estimates - Call (508) 690-8886!',
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
  ].join(', '),
  openGraph: {
    title: 'Residential Painters Massachusetts | Best Home Painters | JH Painting',
    description: '#1 residential painters in Massachusetts. Expert interior & exterior home painters. Premium paints. Licensed & insured. FREE estimates!',
    url: 'https://jhpaintingservices.com/services/residential-painting',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
        width: 1200,
        height: 630,
        alt: 'Professional Residential Painting Services Massachusetts - JH Painting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Residential Painters MA | #1 Home Painters | (508) 690-8886',
    description: 'Best home painters in Massachusetts. Interior & exterior. Premium paints. Licensed & insured. Call for FREE estimate!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png'],
    creator: '@jhpaintingma',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/residential-painting',
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

export default function ResidentialPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
