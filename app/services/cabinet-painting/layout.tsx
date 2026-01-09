import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cabinet Painting Services Massachusetts | Kitchen Cabinet Refinishing | JH Painting',
  description: 'Professional cabinet painting and refinishing services in Massachusetts. Transform your kitchen cabinets for 70% less than replacement. Expert spray finishing, premium materials. Licensed & insured. Call (508) 690-8886 for free estimate!',
  keywords: 'cabinet painting Massachusetts, kitchen cabinet refinishing MA, cabinet spray painting, cabinet transformation, kitchen makeover Massachusetts, professional cabinet painters, JH Painting Services',
  openGraph: {
    title: 'Cabinet Painting Services Massachusetts | JH Painting',
    description: 'Transform your kitchen cabinets with professional cabinet painting. Save 70% vs replacement. Licensed & insured Massachusetts contractor.',
    url: 'https://jhpaintingservices.com/services/cabinet-painting',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png',
        width: 1200,
        height: 630,
        alt: 'Professional Cabinet Painting Services Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cabinet Painting Services Massachusetts | JH Painting',
    description: 'Professional cabinet painting and refinishing. Save 70% vs replacement. Call (508) 690-8886!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png'],
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/cabinet-painting',
  },
}

export default function CabinetPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
