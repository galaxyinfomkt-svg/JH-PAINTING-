import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import FloatingPhoneButton from './components/FloatingPhoneButton'

// Optimize font loading - only load essential weights for better FCP
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'Professional Painting Services in Massachusetts | JH Painting',
  description: 'Expert painting services in Massachusetts. Interior, exterior, cabinet refinishing, floor finishing. Licensed, insured contractors. Free estimates today.',
  keywords: 'painting Massachusetts, exterior painting MA, interior painting Massachusetts, house painters MA, cabinet refinishing Massachusetts, professional painters Massachusetts, JH Painting Services',
  authors: [{ name: 'JH Painting Services' }],
  openGraph: {
    title: 'Professional Painting Services in Massachusetts | JH Painting',
    description: 'Expert interior & exterior painting services across Massachusetts. Licensed & insured contractors. Free estimates.',
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
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://storage.googleapis.com" />
        <link rel="dns-prefetch" href="https://beta.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://reputationhub.site" />
        {/* Preload critical LCP image for faster loading */}
        <link
          rel="preload"
          as="image"
          href="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
          fetchPriority="high"
        />
        <link rel="canonical" href="https://jhpaintingservices.com/" />
        <meta name="geo.region" content="US-MA" />
        <meta name="geo.placename" content="Massachusetts" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "additionalType": ["HousePainter", "HomeAndConstructionBusiness", "ProfessionalService", "Painter", "Painting", "Carpenter", "ConstructionCompany"],
              "@id": "https://jhpaintingservices.com/#organization",
              "name": "JH Painting Services",
              "alternateName": ["JH Painting", "JH Painting Services Massachusetts", "JH Painting MA"],
              "description": "Professional painting services across Massachusetts. Expert exterior & interior painting, cabinet refinishing, and floor restoration for homes and businesses throughout the Bay State. Licensed painter, carpenter, deck builder, and pressure washing service.",
              "url": "https://jhpaintingservices.com",
              "telephone": "+1-508-690-8886",
              "email": "contact@jhpaintingservices.com",
              "foundingDate": "2018-07",
              "founder": {
                "@type": "Person",
                "name": "Jafet Henrique",
                "jobTitle": "Owner & Founder"
              },
              "logo": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png",
              "image": [
                "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg",
                "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/6913825a96d06ab2e07a6439.png"
              ],
              "priceRange": "$$",
              "currenciesAccepted": "USD",
              "paymentAccepted": "Cash, Credit Card, Check",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Marlborough",
                "addressRegion": "MA",
                "postalCode": "01752",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 42.3459,
                "longitude": -71.5526
              },
              "hasMap": "https://maps.google.com/?cid=17086082612398292159",
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
                "https://www.instagram.com/jhpaintingservices_/",
                "https://www.youtube.com/@JHPaintingServices-br9wh",
                "https://maps.google.com/?cid=17086082612398292159"
              ],
              "areaServed": {
                "@type": "State",
                "name": "Massachusetts"
              },
              "knowsAbout": ["Interior Painting", "Exterior Painting", "Cabinet Painting", "Commercial Painting", "Residential Painting", "Deck Building", "Carpentry", "Pressure Washing", "Window Tinting"],
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Interior Painting",
                    "description": "Professional interior painting services including walls, ceilings, trim, and color consultation"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Exterior Painting",
                    "description": "Expert exterior house painting with complete prep work and premium weather-resistant paints"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Cabinet Painting",
                    "description": "Kitchen cabinet refinishing and painting, save 70% vs replacement"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Commercial Painting",
                    "description": "Professional commercial painting for offices, retail, restaurants, and warehouses"
                  }
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "40",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Verified Customer"
                  },
                  "reviewBody": "Excellent work by JH Painting. Professional, on-time, and the quality is outstanding. Highly recommend for any painting project in Massachusetts."
                }
              ]
            })
          }}
        />
      </head>
      <body>
        {children}
        <FloatingPhoneButton />
        {/* LeadConnector Chat Widget - Load after page is idle */}
        <Script
          src="https://beta.leadconnectorhq.com/loader.js"
          data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69626d9e5c8c5ba64720801a"
          strategy="lazyOnload"
        />
        {/* Reviews Widget Script - Load after page is idle */}
        <Script
          src="https://reputationhub.site/reputation/assets/review-widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
