import { Metadata } from 'next'
import { regions, getRegionBySlug } from '@/app/data/regions'

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
    return { title: 'Region Not Found | JH Painting Services' }
  }

  const canonicalUrl = `https://jhpaintingservices.com/regions/${region.slug}`

  return {
    title: `Painters ${region.name} MA | Licensed & Insured | FREE Quote`,
    description: `${region.description} Licensed & $2M insured. 40+ 5-star reviews. Call (508) 690-8886`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `#1 Painters in ${region.name} | JH Painting Services`,
      description: `Professional painting services across ${region.name}. Interior & exterior painting, cabinet refinishing, carpentry. 40+ 5-star reviews.`,
      url: canonicalUrl,
      siteName: 'JH Painting Services',
      locale: 'en_US',
      type: 'website',
      images: [{
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200, height: 630,
        alt: `Professional Painting Services in ${region.name}`,
      }],
    },
    robots: { index: true, follow: true },
  }
}

export default async function RegionLayout({ children }: Props) {
  return <>{children}</>
}
