import { Metadata } from 'next'
import { cities } from '@/app/data/cities'
import { getCityBySlug } from '@/app/data/cities'
import { parseSeoUrl, getCityPageSlug, getCityServicePageSlug, servicesSlugs, serviceNameMap, serviceSeoTitles } from '@/lib/seo-urls'

interface Props {
  children: React.ReactNode
  params: { seoSlug: string }
}

// Extended service keywords for maximum SEO coverage
const serviceKeywords: Record<string, string[]> = {
  'interior-painting': ['interior painters', 'wall painters', 'ceiling painters', 'trim painters', 'room painters', 'interior house painters', 'bedroom painters', 'living room painters', 'kitchen painters'],
  'exterior-painting': ['exterior painters', 'house painters', 'siding painters', 'deck painters', 'exterior house painters', 'outdoor painters', 'home exterior painters', 'porch painters'],
  'commercial-painting': ['commercial painters', 'office painters', 'retail painters', 'business painters', 'industrial painters', 'warehouse painters', 'restaurant painters'],
  'residential-painting': ['residential painters', 'home painters', 'house painters', 'apartment painters', 'condo painters', 'townhouse painters', 'full house painters'],
  'cabinet-painting': ['cabinet painters', 'cabinet refinishing painters', 'kitchen cabinet painters', 'cabinet spray painters', 'bathroom cabinet painters'],
}

// Generate all static paths for city and city+service pages
export function generateStaticParams() {
  const params: { seoSlug: string }[] = []

  cities.forEach(city => {
    // City page: marlborough-ma-painting-contractors
    params.push({ seoSlug: getCityPageSlug(city.slug) })

    // City+Service pages: marlborough-ma-interior-house-painting
    servicesSlugs.forEach(service => {
      params.push({ seoSlug: getCityServicePageSlug(city.slug, service) })
    })
  })

  return params
}

// Generate dynamic metadata for SEO - ULTRA OPTIMIZED TO DOMINATE GOOGLE
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

  const zipCode = city.zipCodes?.[0] || ''
  const countyName = city.county || 'Massachusetts'

  if (parsed.serviceSlug) {
    // City + Service page - MAXIMUM KEYWORD OPTIMIZATION
    const serviceName = serviceNameMap[parsed.serviceSlug] || 'Painting'
    const seoTitle = serviceSeoTitles[parsed.serviceSlug] || serviceName
    const extraKeywords = serviceKeywords[parsed.serviceSlug] || []

    // Title format: "Interior House Painters Marlborough MA | #1 Painters 01752 | (508) 690-8886"
    const title = `${seoTitle} ${city.name} MA | #1 Painters${zipCode ? ` ${zipCode}` : ''} | (508) 690-8886`

    // Extended keywords for this city+service
    const allKeywords = [
      `${serviceName.toLowerCase()} ${city.name} MA`,
      `${city.name} ${serviceName.toLowerCase()}`,
      `best ${serviceName.toLowerCase()} ${city.name}`,
      `${serviceName.toLowerCase()} near me ${city.name}`,
      `house painters ${city.name} MA ${zipCode}`,
      `professional painters ${city.name}`,
      `${city.name} MA painters`,
      `painters ${city.name} Massachusetts`,
      `local painters ${city.name} MA`,
      `affordable painters ${city.name}`,
      `licensed painters ${city.name}`,
      `${countyName} painters`,
      ...extraKeywords.map(k => `${k} ${city.name}`),
      ...extraKeywords.map(k => `${k} ${city.name} MA`),
    ]

    return {
      title,
      description: `Best ${serviceName.toLowerCase()} in ${city.name}, MA ${zipCode}. #1 rated painters in ${countyName}. Benjamin Moore & Sherwin-Williams paints. Licensed & insured. 40+ 5-star Google reviews. FREE estimates - Call (508) 690-8886 today!`,
      keywords: allKeywords.join(', '),
      openGraph: {
        title: `${seoTitle} ${city.name} MA | Best ${serviceName} Company | JH Painting`,
        description: `#1 ${serviceName.toLowerCase()} in ${city.name}, Massachusetts. Premium paints, expert painters. Licensed & insured. FREE estimates!`,
        url: `https://jhpaintingservices.com/${params.seoSlug}`,
        siteName: 'JH Painting Services',
        images: [
          {
            url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
            width: 1200,
            height: 630,
            alt: `${seoTitle} in ${city.name}, MA - JH Painting Services`,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${seoTitle} ${city.name} MA | (508) 690-8886`,
        description: `Best ${serviceName.toLowerCase()} in ${city.name}, MA. Licensed & insured. Call for FREE estimate!`,
        images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
        creator: '@jhpaintingma',
      },
      alternates: {
        canonical: `https://jhpaintingservices.com/${params.seoSlug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      other: {
        'geo.region': 'US-MA',
        'geo.placename': city.name,
      },
    }
  }

  // City page (painters) - MAXIMUM KEYWORD OPTIMIZATION
  // Title format: "Painters Marlborough MA | #1 House Painters 01752 | (508) 690-8886"
  const title = `Painters ${city.name} MA | #1 House Painters${zipCode ? ` ${zipCode}` : ''} | (508) 690-8886`

  // Extended keywords for city page
  const allKeywords = [
    `painters ${city.name} MA`,
    `house painters ${city.name} MA`,
    `house painters ${city.name} Massachusetts`,
    `${city.name} painters`,
    `painters near me ${city.name} MA`,
    `best painters ${city.name}`,
    `interior painters ${city.name} MA`,
    `exterior painters ${city.name} MA`,
    `local painters ${city.name}`,
    `professional painters ${city.name} MA ${zipCode}`,
    `residential painters ${city.name}`,
    `commercial painters ${city.name} MA`,
    `cabinet painters ${city.name}`,
    `${countyName} painters`,
    `affordable painters ${city.name}`,
    `licensed painters ${city.name} MA`,
    `painters near me ${city.name}`,
    `${city.name} MA house painters`,
  ]

  return {
    title,
    description: `Best painters in ${city.name}, MA ${zipCode}. #1 rated house painters in ${countyName}. Interior, exterior, cabinet painters. Benjamin Moore & Sherwin-Williams paints. Licensed & insured. 40+ 5-star Google reviews. FREE estimates - Call (508) 690-8886!`,
    keywords: allKeywords.join(', '),
    openGraph: {
      title: `Painters ${city.name} MA | Best House Painters | JH Painting`,
      description: `#1 painters in ${city.name}, Massachusetts. Interior & exterior house painters, cabinet painters. Licensed & insured. FREE estimates!`,
      url: `https://jhpaintingservices.com/${params.seoSlug}`,
      siteName: 'JH Painting Services',
      images: [
        {
          url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
          width: 1200,
          height: 630,
          alt: `Professional Painters in ${city.name}, MA - JH Painting Services`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Painters ${city.name} MA | #1 House Painters | (508) 690-8886`,
      description: `Best house painters in ${city.name}, MA. Licensed & insured. Call for FREE estimate!`,
      images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
      creator: '@jhpaintingma',
    },
    alternates: {
      canonical: `https://jhpaintingservices.com/${params.seoSlug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': 'US-MA',
      'geo.placename': city.name,
    },
  }
}

export default function SeoSlugLayout({ children }: Props) {
  return <>{children}</>
}
