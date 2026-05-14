import type { Metadata } from 'next'
import { cities, getCityBySlug, normalizeCitySlug } from '@/app/data/cities'
import { generatePageMetadata } from '@/lib/seo'

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
    return generatePageMetadata({
      title: 'City Not Found | JH Painting Services',
      description: 'The city page you are looking for could not be found.',
      path: `/massachusetts/${citySlug}`,
      noIndex: true,
    })
  }

  return generatePageMetadata({
    title: `#1 Exterior & Interior Painters ${city.name} MA | FREE Quote | (508) 690-8886`,
    description: `Professional exterior & interior painting in ${city.name}, MA. Exterior house painting specialist with 5-year warranty. Premium Benjamin Moore & Sherwin-Williams paints. Licensed, $2M insured, EPA Lead-Safe. 40+ 5-star reviews. FREE estimate: (508) 690-8886`,
    path: `/massachusetts/${normalizeCitySlug(city.slug)}`,
    ogImageAlt: `Professional exterior and interior painting services in ${city.name}, MA by JH Painting Services`,
    keywords: `exterior painters ${city.name} MA, house painters ${city.name}, exterior painting ${city.name} Massachusetts, interior painting ${city.name} MA, painting contractor ${city.name}, exterior house painters near me ${city.name}, cabinet refinishing ${city.name} MA, painters near me ${city.name}`,
  })
}

export default async function CityLayout({ children }: Props) {
  return <>{children}</>
}
