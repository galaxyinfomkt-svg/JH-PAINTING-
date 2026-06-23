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

  // Title + description rewritten. Old template was 51 base chars + city
  // name, which truncated in SERP for any city name ≥10 chars (32 of our
  // 117 cities — Framingham Center, Marlborough, Westborough, etc.).
  //
  // New target shapes that fit even the LONGEST city name (Framingham
  // Center = 17 chars):
  //   - title: "Painters in {City}, MA | Free Quote | JH Painting"
  //     → 41 base + city = 58 chars worst case (≤60 ✓)
  //   - desc: "Painters in {City}, MA — 5.0★ from 40+ reviews. Licensed,
  //     $2M insured. Benjamin Moore & Sherwin-Williams. Free quote:
  //     (508) 690-8886"
  //     → 113 base + city = 130 chars worst case (≤160 ✓)
  return generatePageMetadata({
    title: `Painters in ${city.name}, MA | Free Quote | JH Painting`,
    description: `Painters in ${city.name}, MA — 5.0★ from 40+ reviews. Licensed, $2M insured. Benjamin Moore & Sherwin-Williams. Free quote: (508) 690-8886`,
    path: `/massachusetts/${normalizeCitySlug(city.slug)}`,
    ogImageAlt: `Professional exterior and interior painting services in ${city.name}, MA by JH Painting Services`,
    keywords: `painters ${city.name} MA, house painters ${city.name}, exterior painting ${city.name}, interior painting ${city.name} MA, painting contractor ${city.name}, painters near me ${city.name}, cabinet refinishing ${city.name}`,
  })
}

export default async function CityLayout({ children }: Props) {
  return <>{children}</>
}
