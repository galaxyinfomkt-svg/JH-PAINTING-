import type { Metadata } from 'next'
import { regions, getRegionBySlug } from '@/app/data/regions'
import { generatePageMetadata, composeTitle, fitDescription } from '@/lib/seo'

const services = [
  { name: 'Interior Painting', slug: 'interior-painting' },
  { name: 'Exterior Painting', slug: 'exterior-painting' },
  { name: 'Cabinet Painting', slug: 'cabinet-painting' },
  { name: 'Commercial Painting', slug: 'commercial-painting' },
  { name: 'Residential Painting', slug: 'residential-painting' },
  { name: 'Carpentry', slug: 'carpentry' },
  { name: 'Power Washing', slug: 'power-washing' },
]

export async function generateStaticParams() {
  const params: { region: string; service: string }[] = []
  for (const region of regions) {
    for (const svc of services) {
      params.push({ region: region.slug, service: svc.slug })
    }
  }
  return params
}

interface Props {
  params: Promise<{ region: string; service: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: { params: Promise<{ region: string; service: string }> }): Promise<Metadata> {
  const { region: regionSlug, service: serviceSlug } = await params
  const region = getRegionBySlug(regionSlug)
  const service = services.find(s => s.slug === serviceSlug)

  if (!region || !service) {
    return generatePageMetadata({
      title: 'Page Not Found | JH Painting Services',
      description: 'The page you are looking for could not be found.',
      path: `/regions/${regionSlug}/${serviceSlug}`,
      noIndex: true,
    })
  }

  return generatePageMetadata({
    // Budgeted. "Residential Painting" (20) + "North Middlesex & Merrimack
    // Valley" (34) leaves no room for a fixed suffix, so the suffixes are
    // dropped in priority order instead of being truncated by Google.
    title: composeTitle(`${service.name} in ${region.name}`, [', MA', ' | JH Painting']),
    description: fitDescription(
      `Professional ${service.name.toLowerCase()} across ${region.name}. Serving ${region.citySlugs.length}+ cities. Licensed & $2M insured. 40+ 5-star reviews.`,
      'Call (508) 690-8886'
    ),
    path: `/regions/${region.slug}/${service.slug}`,
    ogImageAlt: `${service.name} in ${region.name}`,
    keywords: `${service.name} ${region.name} MA, ${service.name.toLowerCase()} ${region.name}, painters ${region.name} Massachusetts`,
  })
}

export default async function RegionServiceLayout({ children }: Props) {
  return <>{children}</>
}
