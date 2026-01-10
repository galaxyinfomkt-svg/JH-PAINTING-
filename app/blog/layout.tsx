import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Painting Tips & Guides | JH Painting Services Blog',
  description: 'Expert painting tips, color guides, and home improvement advice from Massachusetts professional painters. Learn about interior, exterior, and cabinet painting.',
  keywords: 'painting tips, paint colors, interior painting guide, exterior painting massachusetts, cabinet refinishing, home improvement blog, painting costs, DIY vs professional painting',
  openGraph: {
    title: 'Painting Tips & Guides | JH Painting Services Blog',
    description: 'Expert painting tips and home improvement advice from Massachusetts professional painters.',
    url: 'https://jhpaintingservices.com/blog',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Painting Tips & Guides | JH Painting Services',
    description: 'Expert painting tips from Massachusetts professional painters.',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
