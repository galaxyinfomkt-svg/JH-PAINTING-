import { Metadata } from 'next'
import { cities, getCityBySlug, normalizeCitySlug } from '@/app/data/cities'

// Pre-render all city pages at build time for instant CDN delivery
export async function generateStaticParams() {
  return cities.map(city => ({
    city: normalizeCitySlug(city.slug)
  }))
}

interface Props {
  params: Promise<{ city: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    return {
      title: 'City Not Found | JH Painting Services',
    }
  }

  const canonicalUrl = `https://jhpaintingservices.com/massachusetts/${normalizeCitySlug(city.slug)}`

  return {
    title: `#1 Exterior & Interior Painters ${city.name} MA | FREE Quote | (508) 690-8886`,
    description: `Professional exterior & interior painting in ${city.name}, MA. Exterior house painting specialist with 5-year warranty. Premium Benjamin Moore & Sherwin-Williams paints. Licensed, $2M insured, EPA Lead-Safe. 40+ 5-star reviews. FREE estimate: (508) 690-8886`,
    keywords: `exterior painters ${city.name} MA, house painters ${city.name}, exterior painting ${city.name} Massachusetts, interior painting ${city.name} MA, painting contractor ${city.name}, exterior house painters near me ${city.name}, cabinet refinishing ${city.name} MA, painters near me ${city.name}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `#1 Exterior & Interior Painters in ${city.name}, MA | JH Painting Services`,
      description: `Professional exterior & interior painting in ${city.name}, Massachusetts. Exterior painting specialist, 5-year warranty. 40+ 5-star reviews. Licensed & $2M insured. FREE estimates: (508) 690-8886`,
      url: canonicalUrl,
      siteName: 'JH Painting Services',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
          width: 1200,
          height: 630,
          alt: `Professional exterior and interior painting services in ${city.name}, MA by JH Painting Services`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `#1 Painters in ${city.name}, MA | Exterior & Interior | FREE Quote`,
      description: `Professional exterior & interior painting in ${city.name}, MA. 5-year warranty on exterior work. 40+ 5-star reviews. FREE estimates: (508) 690-8886`,
      images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
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
      'geo.placename': `${city.name}, Massachusetts`,
      ...(city.latitude && city.longitude ? {
        'geo.position': `${city.latitude};${city.longitude}`,
        'ICBM': `${city.latitude}, ${city.longitude}`,
      } : {}),
    },
  }
}

export default async function CityLayout({ children }: Props) {
  return <>{children}</>
}
