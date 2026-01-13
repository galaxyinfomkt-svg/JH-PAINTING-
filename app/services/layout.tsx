import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Painting Services in Massachusetts | JH Painting',
  description: 'Expert interior, exterior, cabinet, commercial & residential painting services across Massachusetts. Licensed & insured painters. Premium paints. Free estimates. Call (508) 690-8886!',
  keywords: 'painting services Massachusetts, interior painting MA, exterior painting MA, cabinet painting, commercial painting, residential painting, house painters Massachusetts',
  openGraph: {
    title: 'Professional Painting Services in Massachusetts | JH Painting',
    description: 'Expert interior, exterior, cabinet, commercial & residential painting services across Massachusetts. Licensed & insured. Free estimates!',
    url: 'https://jhpaintingservices.com/services',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/services',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
