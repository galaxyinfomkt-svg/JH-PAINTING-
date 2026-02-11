import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Need a Painter? All Painting Services MA | Walls to Cabinets ⭐',
  description: 'One company, ALL your painting needs. Interior, exterior, cabinets, commercial - we do it all. Premium Benjamin Moore paints. 40+ 5-star reviews. Licensed & $2M insured. FREE quote → (508) 690-8886',
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
    'all painting services',
    'full service painters MA',
    'one stop painting company',
  ].join(', '),
  openGraph: {
    title: 'All Painting Services MA | Interior, Exterior, Cabinets & More',
    description: 'One company for ALL your painting needs. Interior, exterior, cabinets, commercial, carpentry. 40+ 5-star reviews. Licensed & $2M insured. FREE estimates!',
    url: 'https://jhpaintingservices.com/services',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064e65773e16aacef7d054.png',
        width: 1200,
        height: 630,
        alt: 'All Painting Services Massachusetts - JH Painting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Painting Services MA | One Company Does It All ⭐',
    description: 'Interior, exterior, cabinets, commercial - we do it ALL. 40+ 5-star reviews. FREE estimates!',
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
