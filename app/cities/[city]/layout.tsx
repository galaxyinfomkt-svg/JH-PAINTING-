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

  return {
    title: `#1 Painting Contractor in ${cityName}, MA | JH Painting Services`,
    description: `#1 rated painting contractor in ${cityName}, MA. Expert interior & exterior painting, cabinet refinishing. Licensed & insured. 5-star rated with 40+ reviews. Free estimates.`,
    keywords: `painters ${cityName} MA, house painters ${cityName}, painting contractors ${cityName} Massachusetts, interior painting ${cityName}, exterior painting ${cityName}, ${cityName} painting company, best painters in ${cityName}, residential painting ${cityName} MA, commercial painting ${cityName}, cabinet painting ${cityName}`,
    openGraph: {
      title: `#1 Painting Contractor in ${cityName}, MA | JH Painting`,
      description: `#1 rated painting contractor in ${cityName}, Massachusetts. Interior, exterior, cabinet painting. Licensed & insured. Free estimates!`,
      url: `https://jhpaintingservices.com/cities/${params.city}`,
      siteName: 'JH Painting Services',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
          width: 1200,
          height: 630,
          alt: `Professional Painting Services in ${cityName} MA`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `#1 Painting Contractor in ${cityName}, MA | JH Painting`,
      description: `#1 rated painting contractor in ${cityName}, MA. Call (508) 690-8886!`,
      images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
    },
    alternates: {
      canonical: `https://jhpaintingservices.com/cities/${params.city}`,
    },
    robots: {
      index: true,
      follow: true,
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
