import { Metadata } from 'next'
import { getCityBySlug, getCitySlugWithState } from '@/app/data/cities'

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

  const canonicalSlug = getCitySlugWithState(city.slug)
  const canonicalUrl = `https://jhpaintingservices.com/cities/${canonicalSlug}`

  return {
    title: `Painters ${city.name} MA | Peeling Paint? We Fix It Fast ⭐ FREE Quote`,
    description: `Tired of peeling paint ruining your ${city.name} home? Our painters fix it RIGHT the first time. ✓ 40+ 5-star reviews ✓ Licensed & $2M insured ✓ Premium paints that LAST. Get FREE quote → (508) 690-8886`,
    keywords: `painters ${city.name} MA, house painters ${city.name}, fix peeling paint ${city.name}, painting contractor ${city.name} Massachusetts, interior painting ${city.name}, exterior painting ${city.name}, reliable painters ${city.name}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `#1 Painters in ${city.name}, MA | JH Painting Services`,
      description: `Professional painting services in ${city.name}, Massachusetts. Interior & exterior painting, cabinet refinishing. 40+ 5-star reviews. FREE estimates!`,
      url: canonicalUrl,
      siteName: 'JH Painting Services',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
          width: 1200,
          height: 630,
          alt: `Professional Painting Services in ${city.name}, MA`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `#1 Painters in ${city.name}, MA | JH Painting Services`,
      description: `Professional painting in ${city.name}, MA. Interior & exterior, cabinet refinishing. 40+ 5-star reviews. FREE estimates!`,
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
  }
}

export default async function CityLayout({ children }: Props) {
  return <>{children}</>
}
