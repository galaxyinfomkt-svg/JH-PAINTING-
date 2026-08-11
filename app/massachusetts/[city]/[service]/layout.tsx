import type { Metadata } from 'next'
import { getCityBySlug, getCityState, normalizeCitySlug } from '@/app/data/cities'
import { composeMeta, SERVICE_LABELS } from '@/app/data/cityServiceComposer'
import { shouldIndexCityService } from '@/app/data/indexing'
import { generatePageMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ city: string; service: string }>
  children: React.ReactNode
}

// Service labels live in cityServiceComposer.ts (SERVICE_LABELS) so the route,
// the composer, and the body copy cannot drift apart.
//
// The old `servicePainTitles` / `serviceSolutions` maps were deleted with the
// variant-pool generator: titles like "Walls Looking Tired? Interior Painting
// {City} MA | FREE Quote" overflowed the SERP and buried the actual search
// term behind a slogan.

// Pre-render all service pages for each city at build time
export async function generateStaticParams() {
  return Object.keys(SERVICE_LABELS).map(service => ({
    service
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }): Promise<Metadata> {
  const { city: citySlug, service } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    return generatePageMetadata({
      title: 'Service Not Found | JH Painting Services',
      description: 'The city service page you are looking for could not be found.',
      path: `/massachusetts/${citySlug}/${service}`,
      noIndex: true,
    })
  }

  // Meta is COMPOSED from this city's own attributes (market tier, distance to
  // our base, marine vs inland exposure, real neighborhoods, real ZIPs) rather
  // than selected from a pool of pre-written variants.
  //
  // The old path hashed the slug and picked variant N of 5, which produced 35
  // distinct title skeletons across all 812 city+service URLs - roughly 23
  // pages sharing each one. It also overflowed the SERP on 35% of titles and
  // 46% of descriptions (worst case 226 chars). composeMeta() measures as it
  // assembles, so overflow is structurally impossible and the phone CTA is
  // always the last thing kept.
  const { title, description, keywords } = composeMeta(city, service)

  return generatePageMetadata({
    title,
    description,
    keywords,
    path: `/massachusetts/${normalizeCitySlug(city.slug)}/${service}`,
    noIndex: !shouldIndexCityService(city, service),
    ogImageAlt: `${SERVICE_LABELS[service] ?? service.replace(/-/g, ' ')} in ${city.name}, ${getCityState(city)} by JH Painting Services`,
  })
}

export default async function CityServiceLayout({ children }: Props) {
  return <>{children}</>
}
