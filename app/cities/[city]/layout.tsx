import type { Metadata } from 'next'
import { getCityBySlug, cities } from '@/app/data/cities'

interface Props {
  params: { city: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city)

  if (!city) {
    return {
      title: 'City Not Found | JH Painting Services',
      description: 'The requested city page was not found.',
    }
  }

  const cityName = city.name
  const countyName = city.county || 'Massachusetts'
  const zipCode = city.zipCodes?.[0] || ''

  // SEO-optimized title with ZIP code for local search
  const title = `Painters ${cityName} MA | #1 House Painters ${zipCode} | (508) 690-8886`

  return {
    title,
    description: `Best painters in ${cityName}, MA ${zipCode}. #1 rated house painters in ${countyName}. Interior, exterior, cabinet painters. Benjamin Moore & Sherwin-Williams paints. Licensed & insured. 40+ 5-star reviews. FREE estimates - Call (508) 690-8886!`,
    keywords: [
      `painters ${cityName} MA`,
      `house painters ${cityName}`,
      `house painters ${cityName} Massachusetts`,
      `interior painters ${cityName}`,
      `exterior painters ${cityName}`,
      `${cityName} painters`,
      `best painters in ${cityName}`,
      `residential painters ${cityName} MA`,
      `commercial painters ${cityName}`,
      `cabinet painters ${cityName}`,
      `house painters ${cityName} MA ${zipCode}`,
      `local painters ${cityName}`,
      `professional painters near ${cityName}`,
      `painters near me ${cityName}`,
      `${cityName} MA painters`,
      `${countyName} painters`,
      `affordable painters ${cityName}`,
      `licensed painters ${cityName} MA`,
    ].join(', '),
    openGraph: {
      title: `Painters ${cityName} MA | Best House Painters | JH Painting`,
      description: `#1 rated painters in ${cityName}, Massachusetts. Interior & exterior house painters, cabinet painters. Licensed & insured. FREE estimates!`,
      url: `https://jhpaintingservices.com/cities/${params.city}`,
      siteName: 'JH Painting Services',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
          width: 1200,
          height: 630,
          alt: `Professional House Painters in ${cityName} MA - JH Painting Services`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Painters ${cityName} MA | #1 House Painters | (508) 690-8886`,
      description: `Best house painters in ${cityName}, MA. Licensed & insured. Call for FREE estimate!`,
      images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
      creator: '@jhpaintingma',
    },
    alternates: {
      canonical: `https://jhpaintingservices.com/cities/${params.city}`,
    },
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
    other: {
      'geo.region': 'US-MA',
      'geo.placename': cityName,
      'geo.position': city.zipCodes?.[0] ? `${cityName}, MA ${city.zipCodes[0]}` : `${cityName}, MA`,
      'ICBM': city.zipCodes?.[0] || '',
    },
  }
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }))
}

export default function CityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
