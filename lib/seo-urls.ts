// SEO-optimized URL structure for JH Painting Services
// Pattern: /[city]-ma-[service]-services/ or /[city]-ma-painters/

export const serviceUrlMap: Record<string, string> = {
  'interior-painting': 'interior-painting-services',
  'exterior-painting': 'exterior-painting-services',
  'commercial-painting': 'commercial-painting-services',
  'residential-painting': 'residential-painting-services',
  'cabinet-painting': 'cabinet-painting-refinishing',
}

export const serviceNameMap: Record<string, string> = {
  'interior-painting': 'Interior Painting',
  'exterior-painting': 'Exterior Painting',
  'commercial-painting': 'Commercial Painting',
  'residential-painting': 'Residential Painting',
  'cabinet-painting': 'Cabinet Painting',
}

// Generate SEO-friendly URL for city page
// Example: waltham -> waltham-ma-painters
export function getCityPageSlug(citySlug: string): string {
  return `${citySlug}-ma-painters`
}

// Generate SEO-friendly URL for city+service page
// Example: waltham + interior-painting -> waltham-ma-interior-painting-services
export function getCityServicePageSlug(citySlug: string, serviceSlug: string): string {
  const serviceUrl = serviceUrlMap[serviceSlug] || `${serviceSlug}-services`
  return `${citySlug}-ma-${serviceUrl}`
}

// Parse SEO URL back to city and service slugs
// Example: waltham-ma-interior-painting-services -> { city: 'waltham', service: 'interior-painting' }
export function parseSeoUrl(seoSlug: string): { citySlug: string; serviceSlug?: string } | null {
  // Pattern: [city]-ma-painters (city page)
  const cityMatch = seoSlug.match(/^(.+)-ma-painters$/)
  if (cityMatch) {
    return { citySlug: cityMatch[1] }
  }

  // Pattern: [city]-ma-[service]-services or [city]-ma-[service]-refinishing
  const serviceMatch = seoSlug.match(/^(.+)-ma-(interior-painting|exterior-painting|commercial-painting|residential-painting|cabinet-painting)-(services|refinishing)$/)
  if (serviceMatch) {
    return { citySlug: serviceMatch[1], serviceSlug: serviceMatch[2] }
  }

  return null
}

// Get all SEO URLs for static generation
export function getAllSeoUrls(cities: Array<{ slug: string }>, services: string[]): string[] {
  const urls: string[] = []

  cities.forEach(city => {
    // City page URL
    urls.push(getCityPageSlug(city.slug))

    // City+Service page URLs
    services.forEach(service => {
      urls.push(getCityServicePageSlug(city.slug, service))
    })
  })

  return urls
}

// Service slugs list
export const servicesSlugs = [
  'interior-painting',
  'exterior-painting',
  'commercial-painting',
  'residential-painting',
  'cabinet-painting',
]
