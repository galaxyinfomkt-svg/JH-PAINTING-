import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kitchen Cabinets Dated? Cabinet Painting MA | Save 70% vs New ⭐',
  description: 'Hate your old kitchen cabinets? DON\'T replace them. Our spray finish looks factory-new for 70% LESS. Done in 3-5 days, not months. 40+ 5-star reviews. FREE quote → (508) 690-8886',
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
  ].join(', '),
  openGraph: {
    title: 'Cabinet Painters Massachusetts | Best Cabinet Painters | JH Painting',
    description: '#1 cabinet painters in Massachusetts. Save 70% vs replacement! Expert spray finish. Licensed & insured. FREE estimates!',
    url: 'https://jhpaintingservices.com/services/cabinet-painting',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png',
        width: 1200,
        height: 630,
        alt: 'Professional Cabinet Painting & Refinishing Massachusetts - JH Painting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cabinet Painters MA | #1 Cabinet Painters | (508) 690-8886',
    description: 'Best cabinet painters in Massachusetts. Save 70% vs replacement! Expert spray finish. Call for FREE estimate!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png'],
    creator: '@jhpaintingma',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/cabinet-painting',
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

export default function CabinetPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
