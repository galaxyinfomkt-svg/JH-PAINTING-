import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Professional Painting Services MA | JH Painting Services',
  description: 'See why 500+ Massachusetts homeowners choose JH Painting Services. Licensed, $2M insured, EPA Lead-Safe certified. 40+ 5-star reviews. FREE estimates: (508) 690-8886',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Watch Our Painting Work | JH Painting Services',
    description: 'See how we transform Massachusetts homes with professional painting. Watch our exterior and interior painting videos.',
    url: 'https://jhpaintingservices.com/vsl',
    siteName: 'JH Painting Services',
    type: 'website',
    videos: [
      {
        url: 'https://www.youtube.com/watch?v=F_lreXzNlUI',
        width: 1280,
        height: 720,
        type: 'text/html',
      },
      {
        url: 'https://www.youtube.com/watch?v=LkT_HLyKibY',
        width: 1280,
        height: 720,
        type: 'text/html',
      },
    ],
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com/vsl',
  },
}

// Video schema for Google indexing
const videoSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "VideoObject",
      "@id": "https://jhpaintingservices.com/vsl#exterior-video",
      "name": "JH Painting Exterior Work - Professional House Painting Massachusetts",
      "description": "Watch JH Painting Services transform homes across Massachusetts with professional exterior painting. See our attention to detail, surface preparation, and quality results.",
      "thumbnailUrl": "https://img.youtube.com/vi/F_lreXzNlUI/maxresdefault.jpg",
      "uploadDate": "2024-01-15",
      "duration": "PT3M30S",
      "contentUrl": "https://www.youtube.com/watch?v=F_lreXzNlUI",
      "embedUrl": "https://www.youtube.com/embed/F_lreXzNlUI",
      "publisher": {
        "@type": "Organization",
        "name": "JH Painting Services",
        "logo": {
          "@type": "ImageObject",
          "url": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png"
        }
      },
      "potentialAction": {
        "@type": "WatchAction",
        "target": "https://www.youtube.com/watch?v=F_lreXzNlUI"
      }
    },
    {
      "@type": "VideoObject",
      "@id": "https://jhpaintingservices.com/vsl#interior-video",
      "name": "JH Painting Interior Work - Professional Interior Painting Massachusetts",
      "description": "Watch JH Painting Services transform interiors across Massachusetts with professional interior painting. Premium paints, expert preparation, and flawless finishes.",
      "thumbnailUrl": "https://img.youtube.com/vi/LkT_HLyKibY/maxresdefault.jpg",
      "uploadDate": "2024-01-15",
      "duration": "PT2M45S",
      "contentUrl": "https://www.youtube.com/watch?v=LkT_HLyKibY",
      "embedUrl": "https://www.youtube.com/embed/LkT_HLyKibY",
      "publisher": {
        "@type": "Organization",
        "name": "JH Painting Services",
        "logo": {
          "@type": "ImageObject",
          "url": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png"
        }
      },
      "potentialAction": {
        "@type": "WatchAction",
        "target": "https://www.youtube.com/watch?v=LkT_HLyKibY"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://jhpaintingservices.com/vsl",
      "name": "Watch Our Work | JH Painting Services",
      "description": "Watch video testimonials and see our painting work across Massachusetts.",
      "url": "https://jhpaintingservices.com/vsl",
      "isPartOf": {
        "@type": "WebSite",
        "name": "JH Painting Services",
        "url": "https://jhpaintingservices.com"
      }
    }
  ]
}

export default function VSLLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script
        id="vsl-video-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      {children}
    </>
  )
}
