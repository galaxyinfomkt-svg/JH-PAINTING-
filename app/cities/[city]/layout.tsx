import type { Metadata } from 'next'
import { getCityBySlug, cities, getCitySlugWithState } from '@/app/data/cities'

interface Props {
  params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  // getCityBySlug now handles both "acton" and "acton-ma" formats
  const city = getCityBySlug(citySlug)

  if (!city) {
    return {
      title: 'City Not Found | JH Painting Services',
      description: 'The requested city page was not found.',
    }
  }

  const cityName = city.name
  const countyName = city.county || 'Massachusetts'
  const zipCode = city.zipCodes?.[0] || ''

  // SEO-optimized title - max 60 chars for Google display with CTR triggers
  const title = `${cityName} Painters | #1 Rated | FREE Quote (508) 690-8886`

  // Use state suffix in URL for canonical and og:url
  const citySlugWithState = citySlug.endsWith('-ma') || citySlug.endsWith('-ri')
    ? citySlug
    : getCitySlugWithState(city.slug)

  return {
    title,
    description: `Looking for painters in ${cityName}? JH Painting is #1 rated in ${countyName}! Interior & exterior painting, cabinets. 40+ 5-star reviews, licensed, $2M insured. Same-day quotes. Call NOW: (508) 690-8886`,
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
      title: `${cityName} MA Painters | 5-Star Rated | Call (508) 690-8886`,
      description: `Need painters in ${cityName}? JH Painting: 40+ 5-star reviews, licensed & $2M insured. Interior, exterior, cabinets. Same-day FREE quotes!`,
      url: `https://jhpaintingservices.com/cities/${citySlugWithState}`,
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
      title: `${cityName} Painters | 5-Star | (508) 690-8886`,
      description: `Top-rated painters in ${cityName}, MA. 40+ reviews, licensed, $2M insured. FREE same-day quotes!`,
      images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
      creator: '@jhpaintingma',
    },
    alternates: {
      canonical: `https://jhpaintingservices.com/cities/${citySlugWithState}`,
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
    // Use city slug with state suffix (e.g., "acton-ma")
    city: getCitySlugWithState(city.slug),
  }))
}

export default function CityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
