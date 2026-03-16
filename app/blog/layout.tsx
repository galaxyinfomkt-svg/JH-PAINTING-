import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Painting Tips & Cost Guides MA | JH Painting Blog',
  description: 'How much does painting cost in Massachusetts? Best paint colors? DIY vs pro? Expert tips from MA painters with 40+ 5-star reviews. (508) 690-8886',
  keywords: [
    'how much does painting cost Massachusetts',
    'painting cost per square foot MA',
    'best paint colors 2024',
    'DIY vs professional painting',
    'interior painting tips',
    'exterior painting guide',
    'cabinet painting cost MA',
    'house painting prices Massachusetts',
    'painting preparation tips',
    'how to choose paint colors',
    'painting contractor advice',
    'home painting blog MA',
  ].join(', '),
  openGraph: {
    title: 'Painting Tips MA | How Much Does Painting Cost? | Expert Guides',
    description: 'Expert answers to your painting questions. Costs, colors, tips from Massachusetts pros with 40+ 5-star reviews.',
    url: 'https://jhpaintingservices.com/blog',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'Painting Tips and Guides - JH Painting Services Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Painting Tips MA | Cost Guides & Expert Advice',
    description: 'How much does painting cost in MA? Best colors? DIY vs pro? Get expert answers.',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
    creator: '@jhpaintingma',
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
  alternates: {
    canonical: 'https://jhpaintingservices.com/blog',
  },
  other: {
    'geo.region': 'US-MA',
    'geo.placename': 'Massachusetts',
    'rating': 'General',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
