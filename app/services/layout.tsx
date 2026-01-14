import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Painting Services Massachusetts | Interior, Exterior, Commercial | (508) 690-8886',
  description: 'Professional painting services in Massachusetts. Interior painting, exterior painting, commercial painting, residential, cabinet refinishing, carpentry repairs. Premium paints (Benjamin Moore, Sherwin-Williams). Licensed & insured. 40+ 5-star reviews. FREE estimates - Call (508) 690-8886!',
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
  ].join(', '),
  openGraph: {
    title: 'Professional Painting Services Massachusetts | JH Painting',
    description: 'Full-service painting company in Massachusetts. Interior, exterior, commercial, residential, cabinet painting, and carpentry. Licensed & insured. FREE estimates!',
    url: 'https://jhpaintingservices.com/services',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064e65773e16aacef7d054.png',
        width: 1200,
        height: 630,
        alt: 'Professional Painting Services Massachusetts - JH Painting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Painting Services MA | Interior, Exterior, Commercial | (508) 690-8886',
    description: 'Professional painting services in Massachusetts. Interior, exterior, commercial, residential. Call for FREE estimate!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064e65773e16aacef7d054.png'],
    creator: '@jhpaintingma',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services',
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

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
