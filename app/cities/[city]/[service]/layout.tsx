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

// Pain-point focused titles that match SEARCH INTENT
const servicePainTitles: Record<string, string> = {
  'interior-painting': 'Walls Looking Tired?',
  'exterior-painting': 'Peeling Paint Outside?',
  'commercial-painting': 'Office Needs Refresh?',
  'residential-painting': 'Home Looking Dated?',
  'cabinet-painting': 'Cabinets Dated? Save 70%',
  'carpentry': 'Wood Rot Spreading?',
  'power-washing': 'Dirty Siding & Mold?',
}

// Solution-focused descriptions
const serviceSolutions: Record<string, string> = {
  'interior-painting': 'Transform tired walls into stunning rooms. Premium Benjamin Moore paints, zero mess, done in days not weeks.',
  'exterior-painting': 'Stop paint damage before it spreads. Weather-resistant paints + FREE power wash included.',
  'commercial-painting': 'Zero downtime painting. After-hours service available. We work around YOUR schedule.',
  'residential-painting': 'Love your home again. Interior + exterior experts with 40+ 5-star reviews.',
  'cabinet-painting': 'NEW kitchen look for 70% LESS than replacement. Factory-smooth spray finish, done in 3-5 days.',
  'carpentry': 'Fix rot BEFORE it spreads. Window frames, trim, siding repair by licensed pros.',
  'power-washing': 'Instant curb appeal. Decks, siding, driveways sparkling clean in one day.',
}

// Pre-render all service pages for each city at build time
export async function generateStaticParams() {
  return Object.keys(serviceNames).map(service => ({
    service
  }))
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

  const painTitle = servicePainTitles[service] || serviceName
  const solution = serviceSolutions[service] || 'Professional ' + serviceNameLower + ' by licensed pros.'

  return {
    title: painTitle + ' ' + serviceName + ' ' + city.name + ' MA | FREE Quote',
    description: solution + ' ✓ 40+ reviews ✓ $2M insured ✓ ' + city.name + ' MA. Call (508) 690-8886',
    keywords: serviceNameLower + ' ' + city.name + ' MA, fix ' + serviceNameLower + ' ' + city.name + ', ' + service + ' ' + city.name + ', painters ' + city.name + ' Massachusetts',
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
