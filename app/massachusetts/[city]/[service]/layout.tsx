import type { Metadata } from 'next'
import { getCityBySlug, normalizeCitySlug } from '@/app/data/cities'
import { generateServiceContent } from '@/app/data/cityContent'
import { shouldIndexCityService } from '@/app/data/indexing'
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
      description: 'The city service page you are looking for could not be found.',
      path: `/massachusetts/${citySlug}/${service}`,
      noIndex: true,
    })
  }

  const painTitle = servicePainTitles[service] || serviceName
  const solution = serviceSolutions[service] || 'Professional ' + serviceNameLower + ' by licensed pros.'

  // Pull city+service-specific unique title/description/keywords from the multi-factor
  // generator. Each of the 833 city+service URLs gets a distinct title/desc/keyword string
  // selected from 5-variant pools using a hash of (slug + service + distance bracket +
  // population bracket + county). Falls back to legacy template when generator has no pool.
  const uniqueContent = generateServiceContent(
    city.name,
    city.slug,
    service,
    city.county,
    city.population,
    city.landmarks,
    city.neighborhoods,
    city.distance
  )

  const isExterior = service === 'exterior-painting'
  const fallbackDesc = isExterior
    ? `Expert exterior house painting in ${city.name}, MA. Power washing, surface prep, caulking, priming + 2 coats of premium Benjamin Moore Aura or Sherwin-Williams Duration paint. 5-year warranty. EPA Lead-Safe certified. 40+ 5-star reviews. Licensed & $2M insured. FREE estimate: (508) 690-8886`
    : solution + ' ✓ 40+ reviews ✓ $2M insured ✓ ' + city.name + ' MA. Call (508) 690-8886'

  const fallbackKeywords = isExterior
    ? `exterior painting ${city.name} MA, exterior house painters ${city.name}, exterior painting near me ${city.name}, house painters ${city.name} Massachusetts, exterior painting cost ${city.name} MA, exterior painters near me, ${city.name} MA painting contractors, best exterior painters ${city.name}, EPA lead-safe painters ${city.name} MA`
    : serviceNameLower + ' ' + city.name + ' MA, fix ' + serviceNameLower + ' ' + city.name + ', ' + service + ' ' + city.name + ', painters ' + city.name + ' Massachusetts'

  const fallbackTitle = isExterior
    ? `Exterior Painting ${city.name} MA | 5-Year Warranty | FREE Quote | (508) 690-8886`
    : painTitle + ' ' + serviceName + ' ' + city.name + ' MA | FREE Quote'

  const title = uniqueContent.uniqueTitle || fallbackTitle
  const description = uniqueContent.uniqueDescriptionMeta || fallbackDesc
  const keywords = uniqueContent.uniqueKeywords || fallbackKeywords

  return generatePageMetadata({
    title,
    description,
    keywords,
    path: `/massachusetts/${normalizeCitySlug(city.slug)}/${service}`,
    // Long-tail (low-demand) city+service combos are noindex,follow so they
    // stop diluting crawl budget; high-demand combos stay indexable.
    noIndex: !shouldIndexCityService(city, service),
    ogImageAlt: isExterior
      ? `Professional exterior house painting in ${city.name}, MA by JH Painting Services - licensed painters`
      : `${serviceName} Services in ${city.name}, MA by JH Painting Services`,
  })
}

export default async function CityServiceLayout({ children }: Props) {
  return <>{children}</>
}
