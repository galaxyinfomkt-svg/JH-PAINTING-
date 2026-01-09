import type { Metadata } from 'next'
import './globals.css'
import FloatingPhoneButton from './components/FloatingPhoneButton'

export const metadata: Metadata = {
  title: 'JH Painting Services Massachusetts | Expert Exterior & Interior Painting MA',
  description: 'Professional painting services across Massachusetts. Exterior painting, interior painting, cabinet refinishing & floor refinishing. Licensed & insured. Call (508) 690-8886!',
  keywords: 'painting Massachusetts, exterior painting MA, interior painting Massachusetts, house painters MA, cabinet refinishing Massachusetts, professional painters Massachusetts, JH Painting Services',
  authors: [{ name: 'JH Painting Services' }],
  openGraph: {
    title: 'JH Painting Services - Expert Painting Across Massachusetts',
    description: 'Professional painting services across Massachusetts. Licensed & insured. Call (508) 690-8886!',
    url: 'https://jhpaintingservices.com',
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
    title: 'JH Painting Services - Expert Painting Across Massachusetts',
    description: 'Professional painting services across Massachusetts. Licensed & insured.',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/6913817e042d1336f8bbb7a6.png',
    apple: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/6913817e042d1336f8bbb7a6.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://jhpaintingservices.com/" />
        <meta name="geo.region" content="US-MA" />
        <meta name="geo.placename" content="Massachusetts" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "additionalType": ["HousePainter", "HomeAndConstructionBusiness", "ProfessionalService"],
              "@id": "https://jhpaintingservices.com/#organization",
              "name": "JH Painting Services",
              "alternateName": ["JH Painting", "JH Painting Services Massachusetts"],
              "description": "Professional painting services across Massachusetts. Expert exterior & interior painting, cabinet refinishing, and floor restoration for homes and businesses throughout the Bay State.",
              "url": "https://jhpaintingservices.com",
              "telephone": "+1-508-690-8886",
              "email": "contact@jhpaintingservices.com",
              "founder": {
                "@type": "Person",
                "name": "Jafet",
                "jobTitle": "Owner & Founder"
              },
              "image": [
                "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg",
                "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/6913825a96d06ab2e07a6439.png"
              ],
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Waltham",
                "addressRegion": "MA",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 42.3765,
                "longitude": -71.2356
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "07:00",
                  "closes": "18:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61564489391475",
                "https://www.instagram.com/jhpaintingservices/",
                "https://www.youtube.com/@JHPaintingServices-br9wh"
              ],
              "areaServed": {
                "@type": "State",
                "name": "Massachusetts"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "200",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />
      </head>
      <body>
        {children}
        <FloatingPhoneButton />
      </body>
    </html>
  )
}
