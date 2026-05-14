import type { Metadata } from 'next'
import { cities, getCityBySlug, getCitySlugWithState } from '@/app/data/cities'
import { generatePageMetadata } from '@/lib/seo'

// Pre-render all city pages at build time for instant CDN delivery
export async function generateStaticParams() {
  return cities.map(city => ({
    city: getCitySlugWithState(city.slug)
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
      path: `/cities/${citySlug}`,
      noIndex: true,
    })
  }

  const canonicalSlug = getCitySlugWithState(city.slug)

  return generatePageMetadata({
    title: `Painters ${city.name} MA | Peeling Paint? We Fix It Fast FREE Quote`,
    description: `Tired of peeling paint ruining your ${city.name} home? Our painters fix it RIGHT the first time. ✓ 40+ 5-star reviews ✓ Licensed & $2M insured ✓ Premium paints that LAST. Get FREE quote (508) 690-8886`,
    path: `/cities/${canonicalSlug}`,
    ogImageAlt: `Professional Painting Services in ${city.name}, MA`,
    keywords: `painters ${city.name} MA, house painters ${city.name}, fix peeling paint ${city.name}, painting contractor ${city.name} Massachusetts, interior painting ${city.name}, exterior painting ${city.name}, reliable painters ${city.name}`,
  })
}

export default async function CityLayout({ children }: Props) {
  return <>{children}</>
}
