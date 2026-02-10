import type { Metadata } from 'next'
import { getCityBySlug, cities, getCitySlugWithState, isTier1City } from '@/app/data/cities'

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
  const population = city.population || ''
  const landmark = city.landmarks?.[0] || ''

  // SEO-optimized title - max 60 chars for Google display with CTR triggers
  const title = `${cityName} Painters | #1 Rated | FREE Quote | 5-Star`

  // Use state suffix in URL for canonical and og:url
  const citySlugWithState = citySlug.endsWith('-ma') || citySlug.endsWith('-ri')
    ? citySlug
    : getCitySlugWithState(city.slug)

  // Tier-1 cities get full indexing; tier-2 cities get noindex to avoid doorway page penalties
  const shouldIndex = isTier1City(citySlug)

  // Generate unique meta descriptions based on city characteristics
  const distanceFromHQ = city.distance
  let description: string

  if (distanceFromHQ <= 10) {
    // Very close cities - emphasize quick response
    description = `${cityName} painters - just ${Math.round(distanceFromHQ)} miles from our HQ! JH Painting offers same-day estimates in ${countyName}. Interior, exterior, cabinets. 40+ 5-star reviews. Licensed & $2M insured. Call: (508) 690-8886`
  } else if (landmark) {
    // Cities with landmarks - use local reference
    description = `Professional painters serving ${cityName}, MA${zipCode ? ` (${zipCode})` : ''} near ${landmark}. Interior & exterior painting, cabinet refinishing. ${countyName}'s trusted choice. 40+ 5-star reviews. FREE quotes: (508) 690-8886`
  } else if (population && population.includes('50,000') || population.includes('100,000') || population.includes('200,000')) {
    // Major cities
    description = `${cityName}'s top-rated painting contractor! JH Painting serves ${population} residents with expert interior & exterior painting. Licensed, $2M insured, 40+ 5-star reviews. Get FREE estimate: (508) 690-8886`
  } else {
    // Default template with county and zip
    description = `Looking for painters in ${cityName}${zipCode ? `, MA ${zipCode}` : ''}? JH Painting is #1 rated in ${countyName}! Interior & exterior painting, cabinets. 40+ 5-star reviews, licensed, $2M insured. Call: (508) 690-8886`
  }

  return {
    title,
    description,
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
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
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
