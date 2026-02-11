import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Peeling Paint? Exterior Painters MA | Fix It Before Winter ⭐',
  description: 'Paint peeling off your house? Stop the damage NOW before winter makes it worse. FREE power wash + weather-resistant paints that LAST 10+ years. 40+ 5-star reviews. Call (508) 690-8886',
  keywords: [
    'exterior painters Massachusetts',
    'exterior house painters near me',
    'exterior painters MA',
    'house painters Massachusetts',
    'siding painters',
    'exterior trim painters',
    'professional exterior painters',
    'best exterior painters Massachusetts',
    'home exterior painters MA',
    'house painters near me',
    'deck painters',
    'porch painters',
    'fence painters Massachusetts',
    'residential exterior painters',
    'home exterior painters MA',
    'local exterior painters',
    'exterior painters near me',
  ].join(', '),
  openGraph: {
    title: 'Exterior House Painters Massachusetts | Best Painters | JH Painting',
    description: '#1 exterior house painters in Massachusetts. Expert house painters with power washing & premium paints. Licensed & insured. FREE estimates!',
    url: 'https://jhpaintingservices.com/services/exterior-painting',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'Professional Exterior House Painting Massachusetts - JH Painting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exterior House Painters MA | #1 Painters | (508) 690-8886',
    description: 'Best exterior painters in Massachusetts. Power washing + premium paints. Licensed & insured. Call for FREE estimate!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
    creator: '@jhpaintingma',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/exterior-painting',
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

export default function ExteriorPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
