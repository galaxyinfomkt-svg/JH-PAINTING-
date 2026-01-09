import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Residential Painting Services Massachusetts | Home Painters | JH Painting',
  description: 'Professional residential painting services for Massachusetts homes. Expert interior and exterior house painting. Quality finishes, fair prices. Licensed & insured. Call (508) 690-8886 for free estimate!',
  keywords: 'residential painting Massachusetts, home painters MA, house painting services, interior house painting, exterior house painting, residential paint contractors, home improvement painting, JH Painting Services',
  openGraph: {
    title: 'Residential Painting Services Massachusetts | JH Painting',
    description: 'Expert residential painting services. Transform your home with professional interior and exterior painting. Licensed & insured MA contractor.',
    url: 'https://jhpaintingservices.com/services/residential-painting',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
        width: 1200,
        height: 630,
        alt: 'Professional Residential Painting Services Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Residential Painting Services Massachusetts | JH Painting',
    description: 'Professional residential painting services for your home. Call (508) 690-8886!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png'],
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/residential-painting',
  },
}

export default function ResidentialPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
