import type { Metadata } from 'next'
import { regions, getRegionBySlug } from '@/app/data/regions'
import { generatePageMetadata } from '@/lib/seo'

export async function generateStaticParams() {
  return regions.map(region => ({
    region: region.slug,
  }))
}

interface Props {
  params: Promise<{ region: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region: regionSlug } = await params
  const region = getRegionBySlug(regionSlug)

  if (!region) {
    return generatePageMetadata({
      title: 'Region Not Found | JH Painting Services',
      description: 'The region page you are looking for could not be found.',
      path: `/regions/${regionSlug}`,
      noIndex: true,
    })
  }

  return generatePageMetadata({
    title: `Painters ${region.name} MA | Licensed & Insured | FREE Quote`,
    description: `${region.description} Licensed & $2M insured. 40+ 5-star reviews. Call (508) 690-8886`,
    path: `/regions/${region.slug}`,
    ogImageAlt: `Professional Painting Services in ${region.name}`,
    keywords: `painters ${region.name} MA, house painters ${region.name}, painting services ${region.name} Massachusetts`,
  })
}

export default async function RegionLayout({ params, children }: Props) {
  const { region: regionSlug } = await params
  const region = getRegionBySlug(regionSlug)

  const breadcrumbSchema = region ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jhpaintingservices.com' },
      { '@type': 'ListItem', position: 2, name: 'Massachusetts', item: 'https://jhpaintingservices.com/massachusetts' },
      { '@type': 'ListItem', position: 3, name: region.name, item: `https://jhpaintingservices.com/regions/${region.slug}` },
    ],
  } : null

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {children}
    </>
  )
}
