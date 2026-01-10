import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commercial Painting Services in Massachusetts | JH Painting',
  description: 'Professional commercial painting in Massachusetts. Office, retail, restaurant, warehouse painting. Minimal disruption. Licensed contractors. Free quotes.',
  keywords: 'commercial painting Massachusetts, business painters MA, office painting, retail store painting, commercial painter Massachusetts, industrial painting, professional painters, JH Painting Services',
  openGraph: {
    title: 'Commercial Painting Services Massachusetts | JH Painting',
    description: 'Expert commercial painting services. Office buildings, retail, restaurants, and warehouses. Licensed & insured MA contractor.',
    url: 'https://jhpaintingservices.com/services/commercial-painting',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'Professional Commercial Painting Services Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Painting Services Massachusetts | JH Painting',
    description: 'Professional commercial painting services for businesses. Call (508) 690-8886!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/commercial-painting',
  },
}

export default function CommercialPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
