import type { Metadata } from 'next'
import { getCityBySlug, cities } from '@/app/data/cities'

interface Props {
  params: { city: string; service: string }
}

const services: Record<string, { name: string; description: string }> = {
  'interior-painting': {
    name: 'Interior Painting',
    description: 'interior painting services including walls, ceilings, trim, and color consultation',
  },
  'exterior-painting': {
    name: 'Exterior Painting',
    description: 'exterior house painting with power washing, prep work, and premium weather-resistant paints',
  },
  'commercial-painting': {
    name: 'Commercial Painting',
    description: 'commercial painting for offices, retail stores, restaurants, and warehouses',
  },
  'residential-painting': {
    name: 'Residential Painting',
    description: 'complete residential painting solutions for homes and apartments',
  },
  'cabinet-painting': {
    name: 'Cabinet Painting',
    description: 'kitchen cabinet painting and refinishing for a fraction of replacement cost',
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
  const serviceName = service.name

  return {
    title: `${serviceName} in ${cityName} MA | Professional Painters | JH Painting Services`,
    description: `Looking for ${serviceName.toLowerCase()} in ${cityName}, Massachusetts? JH Painting offers expert ${service.description} in ${cityName}, ${countyName}. Licensed & insured painters. Free estimates! Call (508) 690-8886.`,
    keywords: `${serviceName.toLowerCase()} ${cityName} MA, ${cityName} painters, ${serviceName.toLowerCase()} contractors ${cityName}, painting services ${cityName} Massachusetts, best ${serviceName.toLowerCase()} ${cityName}, professional painters ${cityName} MA, house painters ${cityName}`,
    openGraph: {
      title: `${serviceName} in ${cityName} MA | JH Painting Services`,
      description: `Expert ${serviceName.toLowerCase()} in ${cityName}, Massachusetts. Licensed & insured. Free estimates!`,
      url: `https://jhpaintingservices.com/cities/${params.city}/${params.service}`,
      siteName: 'JH Painting Services',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
          width: 1200,
          height: 630,
          alt: `${serviceName} in ${cityName} MA`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${serviceName} in ${cityName} MA | JH Painting`,
      description: `Expert ${serviceName.toLowerCase()} in ${cityName}, Massachusetts. Call (508) 690-8886!`,
      images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
    },
    alternates: {
      canonical: `https://jhpaintingservices.com/cities/${params.city}/${params.service}`,
    },
    robots: {
      index: true,
      follow: true,
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
