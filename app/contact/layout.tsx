import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FREE Painting Quote MA | Same Day Response | (508) 690-8886',
  description: 'Get your FREE painting estimate in 24 hours. Call (508) 690-8886 or fill out our quick form. We respond SAME DAY. Interior, exterior, cabinets. 40+ 5-star reviews. Licensed & $2M insured.',
  keywords: [
    'free painting quote Massachusetts',
    'painting estimate MA',
    'painters near me free estimate',
    'painting quote same day',
    'contact painters MA',
    'painting contractors phone number',
    'free painting consultation',
    'get painting quote online',
    'painters Marlborough MA',
    'painting company contact Massachusetts',
  ],
  openGraph: {
    title: 'FREE Painting Quote | Same Day Response | JH Painting MA',
    description: 'Get your FREE painting estimate in 24 hours. Interior, exterior, cabinets. 40+ 5-star reviews. Licensed & $2M insured.',
    url: 'https://jhpaintingservices.com/contact',
    siteName: 'JH Painting Services',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'Get FREE Painting Quote - JH Painting Services Massachusetts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FREE Painting Quote MA | Same Day Response ⭐',
    description: 'Get your FREE estimate in 24 hours. 40+ 5-star reviews. Call (508) 690-8886',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
    creator: '@jhpaintingma',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/contact',
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
    'geo.placename': 'Marlborough, Massachusetts',
    'rating': 'General',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
