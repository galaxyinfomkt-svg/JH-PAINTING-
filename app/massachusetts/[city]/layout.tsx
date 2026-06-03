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

  // Title + description rewritten (Task 6). "#1" claim removed — Google
  // penalises unverifiable rank superlatives, and the meta would conflict
  // with the AggregateRating schema ("5.0 from 40 reviews" doesn't equal
  // "#1 by whom?"). Target shape per the Tarefa 6 spec:
  //   - title ≤60 chars: "House Painters in {City}, MA | Free Estimate | JH Painting"
  //   - meta ≤160 chars: "Top-rated painters in {City}, MA — 5.0★ from 40+
  //     reviews, licensed & $2M insured. Benjamin Moore & Sherwin-Williams.
  //     Free estimate: (508) 690-8886"
  return generatePageMetadata({
    title: `House Painters in ${city.name}, MA | Free Estimate | JH Painting`,
    description: `Top-rated painters in ${city.name}, MA — 5.0★ from 40+ reviews, licensed & $2M insured. Benjamin Moore & Sherwin-Williams. Free estimate: (508) 690-8886`,
    path: `/massachusetts/${normalizeCitySlug(city.slug)}`,
    ogImageAlt: `Professional exterior and interior painting services in ${city.name}, MA by JH Painting Services`,
    keywords: `exterior painters ${city.name} MA, house painters ${city.name}, exterior painting ${city.name} Massachusetts, interior painting ${city.name} MA, painting contractor ${city.name}, exterior house painters near me ${city.name}, cabinet refinishing ${city.name} MA, painters near me ${city.name}`,
  })
}

export default async function CityLayout({ children }: Props) {
  return <>{children}</>
}
