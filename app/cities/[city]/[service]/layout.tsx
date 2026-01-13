import type { Metadata } from 'next'
import { getCityBySlug, cities } from '@/app/data/cities'

interface Props {
  params: { city: string; service: string }
}

// SEO-optimized service data with rich descriptions
const services: Record<string, {
  name: string
  seoTitle: string
  description: string
  shortDesc: string
  keywords: string[]
}> = {
  'interior-painting': {
    name: 'Interior House Painters',
    seoTitle: 'Interior House Painters',
    description: 'professional interior painters for walls, ceilings, trim, baseboards, and expert color consultation',
    shortDesc: 'walls, ceilings, trim painters',
    keywords: ['interior painters', 'wall painters', 'ceiling painters', 'trim painters', 'room painters', 'house painters'],
  },
  'exterior-painting': {
    name: 'Exterior House Painters',
    seoTitle: 'Exterior House Painters',
    description: 'expert exterior house painters with power washing, surface preparation, and premium weather-resistant paints',
    shortDesc: 'siding, trim, deck painters',
    keywords: ['exterior painters', 'house painters', 'siding painters', 'deck painters', 'outdoor painters'],
  },
  'commercial-painting': {
    name: 'Commercial Painters',
    seoTitle: 'Commercial Painters',
    description: 'professional commercial painters for offices, retail stores, restaurants, warehouses, and business facilities',
    shortDesc: 'office, retail, restaurant painters',
    keywords: ['commercial painters', 'office painters', 'retail painters', 'business painters', 'industrial painters'],
  },
  'residential-painting': {
    name: 'Residential Painters',
    seoTitle: 'Residential Painters',
    description: 'complete residential painters for homes, apartments, condos, and townhouses',
    shortDesc: 'full home painters',
    keywords: ['residential painters', 'home painters', 'house painters', 'apartment painters', 'condo painters'],
  },
  'cabinet-painting': {
    name: 'Cabinet Painters',
    seoTitle: 'Cabinet Painters',
    description: 'professional cabinet painters and refinishing - save 70% vs replacement with expert spray finish',
    shortDesc: 'kitchen cabinet painters',
    keywords: ['cabinet painters', 'cabinet refinishing', 'kitchen cabinet painters', 'cabinet spray painters'],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city)
  const service = services[params.service]

  if (!city || !service) {
    return {
      title: 'Page Not Found | JH Painting Services',
      description: 'The requested page was not found.',
    }
  }

  const cityName = city.name
  const countyName = city.county || 'Massachusetts'
  const zipCode = city.zipCodes?.[0] || ''

  // SEO-optimized title: Service + City + State + ZIP + Phone
  const title = `${service.seoTitle} ${cityName} MA | Best ${service.name} ${zipCode} | (508) 690-8886`

  // Extended keywords for this city+service combination
  const extendedKeywords = [
    `${service.name.toLowerCase()} ${cityName} MA`,
    `${cityName} ${service.name.toLowerCase()}`,
    `best ${service.name.toLowerCase()} ${cityName}`,
    `${service.name.toLowerCase()} near me ${cityName}`,
    `professional ${service.name.toLowerCase()} ${cityName}`,
    `${cityName} MA ${service.name.toLowerCase()}`,
    `affordable ${service.name.toLowerCase()} ${cityName}`,
    `licensed ${service.name.toLowerCase()} ${cityName}`,
    `${countyName} ${service.name.toLowerCase()}`,
    `${service.name.toLowerCase()} ${zipCode}`,
    ...service.keywords.map(k => `${k} ${cityName}`),
    ...service.keywords.map(k => `${k} ${cityName} MA`),
  ]

  return {
    title,
    description: `Best ${service.name.toLowerCase()} in ${cityName}, MA ${zipCode}. JH Painting offers ${service.description} in ${cityName}, ${countyName}. Premium paints (Benjamin Moore, Sherwin-Williams). Licensed & insured. 40+ 5-star reviews. FREE estimates - Call (508) 690-8886!`,
    keywords: extendedKeywords.join(', '),
    openGraph: {
      title: `${service.seoTitle} ${cityName} MA | Best ${service.name} | JH Painting`,
      description: `#1 rated ${service.name.toLowerCase()} in ${cityName}, Massachusetts. ${service.shortDesc}. Licensed & insured. FREE estimates!`,
      url: `https://jhpaintingservices.com/cities/${params.city}/${params.service}`,
      siteName: 'JH Painting Services',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
          width: 1200,
          height: 630,
          alt: `${service.name} in ${cityName} MA - JH Painting Services`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.seoTitle} ${cityName} MA | (508) 690-8886`,
      description: `Best ${service.name.toLowerCase()} in ${cityName}, MA. Licensed & insured. Call for FREE estimate!`,
      images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
      creator: '@jhpaintingma',
    },
    alternates: {
      canonical: `https://jhpaintingservices.com/cities/${params.city}/${params.service}`,
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
    },
  }
}

const serviceList = ['interior-painting', 'exterior-painting', 'commercial-painting', 'residential-painting', 'cabinet-painting']

export async function generateStaticParams() {
  const params: { city: string; service: string }[] = []

  for (const city of cities) {
    for (const service of serviceList) {
      params.push({
        city: city.slug,
        service: service,
      })
    }
  }

  return params
}

export default function CityServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
