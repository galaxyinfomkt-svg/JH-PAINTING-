// SEO-optimized URL structure for JH Painting Services
// Pattern optimized to BEAT competitors like FastPro and CertaPro
// Keywords: city + state + service + descriptor

// URL patterns for each service (keyword-rich, beats competitors)
export const serviceUrlMap: Record<string, string> = {
  'interior-painting': 'interior-house-painters',
  'exterior-painting': 'exterior-house-painters',
  'commercial-painting': 'commercial-painters',
  'residential-painting': 'residential-painters',
  'cabinet-painting': 'cabinet-painters',
  'carpentry': 'carpentry-services',
  'power-washing': 'power-washing-services',
}

// Service names for display
export const serviceNameMap: Record<string, string> = {
  'interior-painting': 'Interior House Painters',
  'exterior-painting': 'Exterior House Painters',
  'commercial-painting': 'Commercial Painters',
  'residential-painting': 'Residential Painters',
  'cabinet-painting': 'Cabinet Painters',
  'carpentry': 'Carpentry Services',
  'power-washing': 'Power Washing Services',
}

// SEO titles for each service (keyword optimized)
export const serviceSeoTitles: Record<string, string> = {
  'interior-painting': 'Interior House Painters',
  'exterior-painting': 'Exterior House Painters',
  'commercial-painting': 'Commercial Painters',
  'residential-painting': 'Residential Painters',
  'cabinet-painting': 'Cabinet Painters',
  'carpentry': 'Carpentry Services',
  'power-washing': 'Power Washing Services',
}

// Generate SEO-friendly URL for city page
// Example: marlborough -> marlborough-ma-painters
// Better than: certapro.com/ashland/marlborough-professional-painters/
// Better than: fastpropainters.com/service-areas/marlborough-ma-painting-company
export function getCityPageSlug(citySlug: string): string {
  return `${citySlug}-ma-painters`
}

// Generate SEO-friendly URL for city+service page
// Example: marlborough + interior-painting -> marlborough-ma-interior-house-painting
export function getCityServicePageSlug(citySlug: string, serviceSlug: string): string {
  const serviceUrl = serviceUrlMap[serviceSlug] || `${serviceSlug}-services`
  return `${citySlug}-ma-${serviceUrl}`
}

// Parse SEO URL back to city and service slugs
export function parseSeoUrl(seoSlug: string): { citySlug: string; serviceSlug?: string } | null {
  // Pattern: [city]-ma-painters (city page)
  const cityMatch = seoSlug.match(/^(.+)-ma-painters$/)
  if (cityMatch) {
    return { citySlug: cityMatch[1] }
  }

  // Pattern: [city]-ma-interior-house-painters
  const interiorMatch = seoSlug.match(/^(.+)-ma-interior-house-painters$/)
  if (interiorMatch) {
    return { citySlug: interiorMatch[1], serviceSlug: 'interior-painting' }
  }

  // Pattern: [city]-ma-exterior-house-painters
  const exteriorMatch = seoSlug.match(/^(.+)-ma-exterior-house-painters$/)
  if (exteriorMatch) {
    return { citySlug: exteriorMatch[1], serviceSlug: 'exterior-painting' }
  }

  // Pattern: [city]-ma-commercial-painters
  const commercialMatch = seoSlug.match(/^(.+)-ma-commercial-painters$/)
  if (commercialMatch) {
    return { citySlug: commercialMatch[1], serviceSlug: 'commercial-painting' }
  }

  // Pattern: [city]-ma-residential-painters
  const residentialMatch = seoSlug.match(/^(.+)-ma-residential-painters$/)
  if (residentialMatch) {
    return { citySlug: residentialMatch[1], serviceSlug: 'residential-painting' }
  }

  // Pattern: [city]-ma-cabinet-painters
  const cabinetMatch = seoSlug.match(/^(.+)-ma-cabinet-painters$/)
  if (cabinetMatch) {
    return { citySlug: cabinetMatch[1], serviceSlug: 'cabinet-painting' }
  }

  // Pattern: [city]-ma-carpentry-services
  const carpentryMatch = seoSlug.match(/^(.+)-ma-carpentry-services$/)
  if (carpentryMatch) {
    return { citySlug: carpentryMatch[1], serviceSlug: 'carpentry' }
  }

  // Pattern: [city]-ma-power-washing-services
  const powerWashingMatch = seoSlug.match(/^(.+)-ma-power-washing-services$/)
  if (powerWashingMatch) {
    return { citySlug: powerWashingMatch[1], serviceSlug: 'power-washing' }
  }

  // Legacy patterns for backward compatibility (old URLs)
  const legacyContractorsMatch = seoSlug.match(/^(.+)-ma-painting-contractors$/)
  if (legacyContractorsMatch) {
    return { citySlug: legacyContractorsMatch[1] }
  }

  const legacyInteriorMatch = seoSlug.match(/^(.+)-ma-interior-house-painting$/)
  if (legacyInteriorMatch) {
    return { citySlug: legacyInteriorMatch[1], serviceSlug: 'interior-painting' }
  }

  const legacyExteriorMatch = seoSlug.match(/^(.+)-ma-exterior-house-painting$/)
  if (legacyExteriorMatch) {
    return { citySlug: legacyExteriorMatch[1], serviceSlug: 'exterior-painting' }
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
  'carpentry',
  'power-washing',
]
