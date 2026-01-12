import { Metadata } from 'next'
import { cities } from '@/app/data/cities'
import { getCityBySlug } from '@/app/data/cities'
import { parseSeoUrl, getCityPageSlug, getCityServicePageSlug, servicesSlugs, serviceNameMap } from '@/lib/seo-urls'

interface Props {
  children: React.ReactNode
  params: { seoSlug: string }
}

// Generate all static paths for city and city+service pages
export function generateStaticParams() {
  const params: { seoSlug: string }[] = []

  cities.forEach(city => {
    // City page: waltham-ma-painters
    params.push({ seoSlug: getCityPageSlug(city.slug) })

    // City+Service pages: waltham-ma-interior-painting-services
    servicesSlugs.forEach(service => {
      params.push({ seoSlug: getCityServicePageSlug(city.slug, service) })
    })
  })

  return params
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { seoSlug: string } }): Promise<Metadata> {
  const parsed = parseSeoUrl(params.seoSlug)

  if (!parsed) {
    return {
      title: 'Page Not Found | JH Painting Services',
      description: 'The page you are looking for does not exist.',
    }
  }

  const city = getCityBySlug(parsed.citySlug)

  if (!city) {
    return {
      title: 'Page Not Found | JH Painting Services',
      description: 'The page you are looking for does not exist.',
    }
  }

  if (parsed.serviceSlug) {
    // City + Service page
    const serviceName = serviceNameMap[parsed.serviceSlug] || 'Painting'
    return {
      title: `${serviceName} ${city.name}, MA | Professional Painters | JH Painting Services`,
      description: `Professional ${serviceName.toLowerCase()} services in ${city.name}, Massachusetts. Licensed & insured painters serving ${city.name} and ${city.county}. Free estimates. Call (508) 690-8886.`,
      keywords: [
        `${serviceName.toLowerCase()} ${city.name} MA`,
        `${city.name} ${serviceName.toLowerCase()} contractors`,
        `painters ${city.name} massachusetts`,
        `${serviceName.toLowerCase()} services ${city.name}`,
        `house painters ${city.name} MA`,
        `professional painters ${city.name}`,
        `${city.name} painting company`,
      ],
      openGraph: {
        title: `${serviceName} in ${city.name}, MA | JH Painting Services`,
        description: `Professional ${serviceName.toLowerCase()} services in ${city.name}, Massachusetts. Licensed & insured. Free estimates available.`,
        url: `https://jhpaintingservices.com/${params.seoSlug}`,
        siteName: 'JH Painting Services',
        images: [
          {
            url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
            width: 1200,
            height: 630,
            alt: `${serviceName} Services in ${city.name}, MA`,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${serviceName} ${city.name}, MA | JH Painting Services`,
        description: `Professional ${serviceName.toLowerCase()} in ${city.name}, Massachusetts. Licensed & insured painters.`,
        images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
      },
      alternates: {
        canonical: `https://jhpaintingservices.com/${params.seoSlug}`,
      },
    }
  }

  // City page (painters)
  return {
    title: `Painters ${city.name}, MA | Professional Painting Contractors | JH Painting Services`,
    description: `Top-rated painters in ${city.name}, Massachusetts. Interior & exterior painting, cabinet refinishing. Licensed & insured. 40+ 5-star reviews. Free estimates. Call (508) 690-8886.`,
    keywords: [
      `painters ${city.name} MA`,
      `${city.name} painting contractors`,
      `house painters ${city.name} massachusetts`,
      `painting services ${city.name}`,
      `interior painters ${city.name} MA`,
      `exterior painters ${city.name} MA`,
      `${city.name} painting company`,
      `professional painters near ${city.name}`,
    ],
    openGraph: {
      title: `Painters in ${city.name}, MA | JH Painting Services`,
      description: `Professional painting services in ${city.name}, Massachusetts. Interior & exterior painting, cabinet refinishing. Licensed & insured.`,
      url: `https://jhpaintingservices.com/${params.seoSlug}`,
      siteName: 'JH Painting Services',
      images: [
        {
          url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
          width: 1200,
          height: 630,
          alt: `Professional Painters in ${city.name}, MA`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Painters ${city.name}, MA | JH Painting Services`,
      description: `Professional painters in ${city.name}, Massachusetts. Licensed & insured painting contractors.`,
      images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
    },
    alternates: {
      canonical: `https://jhpaintingservices.com/${params.seoSlug}`,
    },
  }
}

export default function SeoSlugLayout({ children }: Props) {
  return <>{children}</>
}
