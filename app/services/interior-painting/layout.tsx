import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interior Painting Services Massachusetts | House Painters | JH Painting',
  description: 'Professional interior painting services across Massachusetts. Transform your home with expert wall painting, trim work, and color consultation. Premium paints, meticulous prep. Licensed & insured. Call (508) 690-8886 for free estimate!',
  keywords: 'interior painting Massachusetts, house painters MA, wall painting services, interior house painting, room painting Massachusetts, professional painters, trim painting, JH Painting Services',
  openGraph: {
    title: 'Interior Painting Services Massachusetts | JH Painting',
    description: 'Expert interior painting services. Transform your living spaces with premium paints and professional craftsmanship. Licensed & insured MA contractor.',
    url: 'https://jhpaintingservices.com/services/interior-painting',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
        width: 1200,
        height: 630,
        alt: 'Professional Interior Painting Services Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interior Painting Services Massachusetts | JH Painting',
    description: 'Professional interior painting services. Expert painters, premium paints. Call (508) 690-8886!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png'],
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services/interior-painting',
  },
}

export default function InteriorPaintingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
