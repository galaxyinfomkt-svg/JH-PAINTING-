import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exterior Painting Services Massachusetts | House Painters | JH Painting',
  description: 'Professional exterior house painting services across Massachusetts. Complete prep work, power washing, premium paints. Protect and beautify your home. Licensed & insured. Call (508) 690-8886 for free estimate!',
  keywords: 'exterior painting Massachusetts, house painters MA, exterior house painting, siding painting, home exterior painting Massachusetts, professional painters, power washing, JH Painting Services',
  openGraph: {
    title: 'Exterior Painting Services Massachusetts | JH Painting',
    description: 'Expert exterior painting services. Complete surface prep, premium paints, and professional craftsmanship. Licensed & insured MA contractor.',
    url: 'https://jhpaintingservices.com/services/exterior-painting',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'Professional Exterior Painting Services Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exterior Painting Services Massachusetts | JH Painting',
    description: 'Professional exterior house painting services. Expert prep and premium paints. Call (508) 690-8886!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/exterior-painting',
  },
}

export default function ExteriorPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
