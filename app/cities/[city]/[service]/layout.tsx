import { Metadata } from 'next'
import { getCityBySlug, getCitySlugWithState } from '@/app/data/cities'

interface Props {
  params: Promise<{ city: string; service: string }>
  children: React.ReactNode
}

const serviceNames: Record<string, string> = {
  'interior-painting': 'Interior Painting',
  'exterior-painting': 'Exterior Painting',
  'commercial-painting': 'Commercial Painting',
  'residential-painting': 'Residential Painting',
  'cabinet-painting': 'Cabinet Painting',
  'carpentry': 'Carpentry',
  'power-washing': 'Power Washing',
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }): Promise<Metadata> {
  const { city: citySlug, service } = await params
  const city = getCityBySlug(citySlug)
  const serviceName = serviceNames[service] || service.replace(/-/g, ' ')
  const serviceNameLower = serviceName.toLowerCase()

  if (!city) {
    return {
      title: 'Service Not Found | JH Painting Services',
    }
  }

  const canonicalSlug = getCitySlugWithState(city.slug)
  const canonicalUrl = 'https://jhpaintingservices.com/cities/' + canonicalSlug + '/' + service

  return {
    title: serviceName + ' in ' + city.name + ', MA | JH Painting Services',
    description: 'Professional ' + serviceNameLower + ' services in ' + city.name + ', Massachusetts. Expert painters, premium materials, 40+ 5-star reviews. Licensed & $2M insured. FREE estimates: (508) 690-8886',
    keywords: serviceNameLower + ' ' + city.name + ' MA, ' + service + ' ' + city.name + ', painters ' + city.name + ' Massachusetts, ' + serviceNameLower + ' contractor ' + city.name,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: serviceName + ' in ' + city.name + ', MA | JH Painting Services',
      description: 'Professional ' + serviceNameLower + ' in ' + city.name + ', Massachusetts. 40+ 5-star reviews. FREE estimates!',
      url: canonicalUrl,
      siteName: 'JH Painting Services',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
          width: 1200,
          height: 630,
          alt: serviceName + ' Services in ' + city.name + ', MA',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: serviceName + ' in ' + city.name + ', MA | JH Painting Services',
      description: 'Professional ' + serviceNameLower + ' in ' + city.name + ', MA. 40+ 5-star reviews. FREE estimates!',
      images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
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
  }
}

export default async function CityServiceLayout({ children }: Props) {
  return <>{children}</>
}
