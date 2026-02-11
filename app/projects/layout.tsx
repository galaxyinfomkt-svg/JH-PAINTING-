import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work | Before & After Painting Projects MA | See the Difference ⭐',
  description: 'See real painting transformations in Massachusetts. Before & after photos of interior, exterior, cabinet painting. 40+ 5-star reviews. View our portfolio & get inspired!',
  keywords: [
    'painting before after Massachusetts',
    'painting portfolio MA',
    'painting projects gallery',
    'house painting examples',
    'interior painting photos',
    'exterior painting before after',
    'cabinet painting transformations',
    'painting contractor portfolio',
    'real painting results MA',
    'professional painting examples',
  ].join(', '),
  openGraph: {
    title: 'Painting Projects Gallery | Before & After | JH Painting MA',
    description: 'Real painting transformations in Massachusetts. Interior, exterior, cabinets. See the JH Painting difference.',
    url: 'https://jhpaintingservices.com/projects',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'Painting Projects Portfolio - JH Painting Services Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Painting Before & After MA | See Our Work ⭐',
    description: 'Real painting transformations. Interior, exterior, cabinets. View portfolio!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
    creator: '@jhpaintingma',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/projects',
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

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
