import { Metadata } from 'next'
import { regions, getRegionBySlug } from '@/app/data/regions'

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
    return { title: 'Page Not Found | JH Painting Services' }
  }

  const canonicalUrl = `https://jhpaintingservices.com/regions/${region.slug}/${service.slug}`

  return {
    title: `${service.name} ${region.name} MA | Licensed Painters | FREE Quote`,
    description: `Professional ${service.name.toLowerCase()} across ${region.name}. Serving ${region.citySlugs.length}+ cities. Licensed & $2M insured. 40+ 5-star reviews. Call (508) 690-8886`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${service.name} in ${region.name} | JH Painting Services`,
      description: `Expert ${service.name.toLowerCase()} for homes and businesses across ${region.name}. Licensed, insured, 40+ 5-star reviews.`,
      url: canonicalUrl,
      siteName: 'JH Painting Services',
      locale: 'en_US',
      type: 'website',
      images: [{
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200, height: 630,
        alt: `${service.name} in ${region.name}`,
      }],
    },
    robots: { index: true, follow: true },
  }
}

export default async function RegionServiceLayout({ children }: Props) {
  return <>{children}</>
}
