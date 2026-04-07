import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '#1 Exterior House Painters Massachusetts | 5-Year Warranty | FREE Quote | (508) 690-8886',
  description: 'Massachusetts\' #1 exterior house painting contractor. Complete exterior painting: power washing, surface prep, caulking, priming + 2 coats premium Benjamin Moore Aura or Sherwin-Williams Duration paint. 5-year warranty. EPA Lead-Safe certified. 40+ 5-star Google reviews. Licensed & $2M insured. Serving 140+ MA cities. FREE estimates: (508) 690-8886',
  keywords: [
    'exterior painting Massachusetts',
    'exterior house painters Massachusetts',
    'exterior house painters near me',
    'exterior painters MA',
    'exterior painting services Massachusetts',
    'house painters Massachusetts',
    'exterior painting cost Massachusetts',
    'best exterior painters Massachusetts',
    'exterior painters Boston MA',
    'exterior painters Worcester MA',
    'exterior painters Framingham MA',
    'exterior painters Natick MA',
    'exterior painters Waltham MA',
    'exterior painters Newton MA',
    'exterior painters Marlborough MA',
    'exterior painters Cambridge MA',
    'exterior painters Wellesley MA',
    'exterior painters MetroWest MA',
    'siding painters Massachusetts',
    'exterior trim painters MA',
    'deck staining Massachusetts',
    'fence painters Massachusetts',
    'EPA lead-safe painters MA',
    'licensed exterior painters Massachusetts',
    'exterior house painting near me',
    'professional exterior painters',
    'weather-resistant exterior painting MA',
  ].join(', '),
  openGraph: {
    title: '#1 Exterior House Painters Massachusetts | 5-Year Warranty | FREE Quote',
    description: 'Massachusetts\' trusted exterior house painting specialist. Premium weather-resistant paints, complete prep work, 5-year warranty. 40+ 5-star Google reviews. Licensed, $2M insured, EPA Lead-Safe. FREE estimates: (508) 690-8886',
    url: 'https://jhpaintingservices.com/services/exterior-painting',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'Professional exterior house painting in Massachusetts by JH Painting Services - before and after home transformation with premium weather-resistant paint',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '#1 Exterior House Painters MA | 5-Year Warranty | (508) 690-8886',
    description: 'Massachusetts exterior painting specialist. Premium Benjamin Moore & Sherwin-Williams paints. 5-year warranty. Licensed & $2M insured. FREE estimate!',
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
    'geo.placename': 'Marlborough, Massachusetts',
    'geo.position': '42.3459;-71.5526',
    'ICBM': '42.3459, -71.5526',
    'DC.title': 'Exterior House Painting Massachusetts - JH Painting Services',
    'DC.subject': 'Exterior Painting, House Painters, Massachusetts',
    'classification': 'Exterior Painting Contractor',
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
