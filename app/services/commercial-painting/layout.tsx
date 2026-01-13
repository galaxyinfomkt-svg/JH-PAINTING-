import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commercial Painters Massachusetts | #1 Business Painters Near Me | (508) 690-8886',
  description: 'Best commercial painters in Massachusetts. Professional office, retail, restaurant & warehouse painters. Minimal business disruption. Licensed & insured. 40+ 5-star reviews. FREE quotes - Call (508) 690-8886!',
  keywords: [
    'commercial painters Massachusetts',
    'commercial painters near me',
    'commercial painters MA',
    'office painters Massachusetts',
    'retail store painters',
    'restaurant painters',
    'warehouse painters Massachusetts',
    'professional commercial painters',
    'best commercial painters Massachusetts',
    'business painters MA',
    'industrial painters Massachusetts',
    'office building painters',
    'storefront painters',
    'commercial interior painters MA',
    'commercial exterior painters',
    'business painters near me',
    'local commercial painters',
  ].join(', '),
  openGraph: {
    title: 'Commercial Painters Massachusetts | Best Business Painters | JH Painting',
    description: '#1 commercial painters in Massachusetts. Office, retail, restaurant painters. Minimal disruption. Licensed & insured. FREE quotes!',
    url: 'https://jhpaintingservices.com/services/commercial-painting',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'Professional Commercial Painting Services Massachusetts - JH Painting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Painters MA | #1 Business Painters | (508) 690-8886',
    description: 'Best commercial painters in Massachusetts. Office, retail, warehouse. Licensed & insured. Call for FREE quote!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
    creator: '@jhpaintingma',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/commercial-painting',
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

export default function CommercialPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
