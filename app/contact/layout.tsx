import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | JH Painting Services Marlborough MA | (508) 690-8886',
  description: 'Contact JH Painting Services in Marlborough, MA for free painting estimates. Call (508) 690-8886. Interior & exterior painting, cabinet refinishing. Licensed & insured. Same day response!',
  keywords: [
    'contact JH Painting Services',
    'painting estimate Marlborough MA',
    'painters Marlborough Massachusetts',
    'painting contractors phone number',
    'free painting quote MA',
    'painting company contact',
  ],
  openGraph: {
    title: 'Contact JH Painting Services | Marlborough MA Painters',
    description: 'Get your free painting estimate today. Call (508) 690-8886 or fill out our online form. Serving Marlborough and all of Massachusetts.',
    url: 'https://jhpaintingservices.com/contact',
    siteName: 'JH Painting Services',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'Contact JH Painting Services - Marlborough MA Painters',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact JH Painting Services | (508) 690-8886',
    description: 'Free painting estimates in Marlborough, MA. Licensed & insured painters.',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
