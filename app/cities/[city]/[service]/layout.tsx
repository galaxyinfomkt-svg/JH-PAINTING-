import type { Metadata } from 'next'
import { getCityBySlug, getCitySlugWithState } from '@/app/data/cities'
import { generatePageMetadata } from '@/lib/seo'

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
    return generatePageMetadata({
      title: 'Service Not Found | JH Painting Services',
      description: 'The service page you are looking for could not be found.',
      path: `/cities/${citySlug}/${service}`,
      noIndex: true,
    })
  }

  const canonicalSlug = getCitySlugWithState(city.slug)
  const painTitle = servicePainTitles[service] || serviceName
  const solution = serviceSolutions[service] || 'Professional ' + serviceNameLower + ' by licensed pros.'

  return generatePageMetadata({
    title: painTitle + ' ' + serviceName + ' ' + city.name + ' MA | FREE Quote',
    description: solution + ' ✓ 40+ reviews ✓ $2M insured ✓ ' + city.name + ' MA. Call (508) 690-8886',
    path: `/cities/${canonicalSlug}/${service}`,
    ogImageAlt: serviceName + ' Services in ' + city.name + ', MA',
    keywords: serviceNameLower + ' ' + city.name + ' MA, fix ' + serviceNameLower + ' ' + city.name + ', ' + service + ' ' + city.name + ', painters ' + city.name + ' Massachusetts',
  })
}

export default async function CityServiceLayout({ children }: Props) {
  return <>{children}</>
}
