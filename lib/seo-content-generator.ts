/**
 * SEO Content Generator - Creates unique, dynamic content for each city/service page
 * This prevents duplicate content penalties from Google
 */

import type { City } from '@/app/data/cities'

// Service-specific content variations
const serviceContent = {
  'interior-painting': {
    name: 'Interior Painting',
    nameVariants: ['interior house painting', 'indoor painting', 'interior wall painting', 'home interior painting'],
    benefits: [
      'Transform tired, outdated rooms into stunning living spaces',
      'Increase your home\'s value with professional interior finishes',
      'Create the perfect atmosphere for every room in your home',
      'Eliminate scuff marks, stains, and wear from daily life',
    ],
    features: [
      'premium low-VOC paints safe for families and pets',
      'expert color consultation to find your perfect palette',
      'meticulous wall preparation including patching and sanding',
      'detailed trim, ceiling, and baseboard painting',
      'furniture protection and daily cleanup',
    ],
    painPoints: [
      'walls covered in scuff marks and fingerprints',
      'outdated colors that make rooms feel dark and cramped',
      'peeling or bubbling paint from poor previous work',
      'DIY disasters that need professional correction',
    ],
    rooms: ['living rooms', 'bedrooms', 'kitchens', 'bathrooms', 'dining rooms', 'home offices', 'basements', 'hallways'],
  },
  'exterior-painting': {
    name: 'Exterior Painting',
    nameVariants: ['exterior house painting', 'outdoor painting', 'home exterior painting', 'outside painting'],
    benefits: [
      'Protect your home from harsh New England weather',
      'Dramatically boost your curb appeal and property value',
      'Prevent costly damage from moisture, rot, and decay',
      'Give your home a fresh, modern appearance',
    ],
    features: [
      'weather-resistant premium paints that last 10+ years',
      'thorough power washing and surface preparation',
      'complete wood rot repair before painting',
      'professional caulking and sealing of all gaps',
      'expert color matching to neighborhood aesthetics',
    ],
    painPoints: [
      'peeling, cracking, or faded exterior paint',
      'wood rot around windows, doors, and trim',
      'mold or mildew growth on siding',
      'embarrassingly outdated curb appeal',
    ],
    surfaces: ['siding', 'trim', 'shutters', 'doors', 'porches', 'decks', 'fences', 'railings'],
  },
  'cabinet-painting': {
    name: 'Cabinet Painting',
    nameVariants: ['cabinet refinishing', 'kitchen cabinet painting', 'cabinet restoration', 'cabinet makeover'],
    benefits: [
      'Save 70% compared to full cabinet replacement',
      'Transform dated cabinets into modern showpieces',
      'Update your kitchen in days, not weeks',
      'Add thousands to your home\'s value',
    ],
    features: [
      'professional spray-applied finish for flawless results',
      'thorough degreasing and surface preparation',
      'durable conversion varnish that resists chips and scratches',
      'hardware updates and soft-close hinges available',
      'minimal disruption to your kitchen routine',
    ],
    painPoints: [
      'dated oak or cherry cabinets from the 90s',
      'worn, scratched, or peeling cabinet finish',
      'kitchen that looks tired despite being clean',
      'can\'t afford $15,000-$30,000 for new cabinets',
    ],
    types: ['kitchen cabinets', 'bathroom vanities', 'built-ins', 'entertainment centers', 'laundry cabinets'],
  },
  'commercial-painting': {
    name: 'Commercial Painting',
    nameVariants: ['business painting', 'office painting', 'commercial building painting', 'retail painting'],
    benefits: [
      'Impress customers with a professional appearance',
      'Boost employee morale with fresh, clean workspaces',
      'Minimize business disruption with flexible scheduling',
      'Maintain brand consistency across all locations',
    ],
    features: [
      'night and weekend work available',
      'precise color matching for brand standards',
      'durable high-traffic paints that resist wear',
      'full insurance and safety compliance',
      'project management for multi-phase jobs',
    ],
    painPoints: [
      'worn, outdated office appearance driving away customers',
      'tight deadlines before grand opening or new tenant',
      'need to maintain business operations during painting',
      'previous painters who caused business disruption',
    ],
    types: ['offices', 'retail stores', 'restaurants', 'warehouses', 'medical facilities', 'schools'],
  },
  'residential-painting': {
    name: 'Residential Painting',
    nameVariants: ['house painting', 'home painting', 'residential home painting', 'whole house painting'],
    benefits: [
      'Complete transformation inside and out',
      'One contractor for all your painting needs',
      'Coordinated colors throughout your home',
      'Increase home value and curb appeal',
    ],
    features: [
      'full interior and exterior services',
      'comprehensive color consultation',
      'expert coordination for whole-house projects',
      'premium paints from Benjamin Moore and Sherwin-Williams',
      'detailed project planning and timeline',
    ],
    painPoints: [
      'home looking tired inside and out',
      'multiple rooms needing different treatments',
      'preparing home for sale or new life chapter',
      'coordinating multiple contractors is overwhelming',
    ],
    areas: ['entire home interior', 'full exterior', 'specific rooms', 'additions', 'renovated spaces'],
  },
  'carpentry': {
    name: 'Carpentry',
    nameVariants: ['carpentry services', 'wood repair', 'trim carpentry', 'carpentry repairs'],
    benefits: [
      'Fix structural issues before they become costly problems',
      'Restore rotted wood to like-new condition',
      'Ensure paint adheres properly to sound surfaces',
      'Protect your investment with proper repairs',
    ],
    features: [
      'complete wood rot replacement',
      'window and door frame repair',
      'trim and molding installation',
      'deck repair and restoration',
      'seamless blending with existing woodwork',
    ],
    painPoints: [
      'soft, spongy wood around windows and doors',
      'rotted deck boards and railings',
      'damaged trim that painters just painted over',
      'gaps and cracks letting in drafts and moisture',
    ],
    repairs: ['window frames', 'door frames', 'siding', 'fascia boards', 'soffits', 'deck boards', 'railings', 'trim'],
  },
  'power-washing': {
    name: 'Power Washing',
    nameVariants: ['pressure washing', 'power cleaning', 'pressure cleaning', 'soft washing'],
    benefits: [
      'Restore surfaces to like-new condition instantly',
      'Remove years of built-up grime and mold',
      'Prepare surfaces properly for painting or staining',
      'Improve curb appeal with clean, bright surfaces',
    ],
    features: [
      'professional-grade equipment for thorough cleaning',
      'soft wash techniques for delicate surfaces',
      'eco-friendly cleaning solutions',
      'safe for all surface types',
      'prepares surfaces for painting or staining',
    ],
    painPoints: [
      'green mold and mildew covering siding',
      'black stains on driveway and walkways',
      'gray, weathered deck that looks abandoned',
      'dirty exterior making home look neglected',
    ],
    surfaces: ['driveways', 'sidewalks', 'decks', 'patios', 'siding', 'fences', 'pool decks', 'retaining walls'],
  },
}

// Weather/climate descriptions by region
const climateDescriptions = {
  coastal: 'salt air, ocean humidity, and intense coastal weather',
  inland: 'extreme temperature swings, heavy snow, and humid summers',
  suburban: 'mature tree coverage, shade moisture, and seasonal weather extremes',
}

// Sentence starters for variety
const sentenceStarters = [
  'For homeowners in',
  'Residents of',
  'If you live in',
  'Whether you\'re in',
  'Throughout',
  'Across',
  'In the heart of',
  'From',
]

/**
 * Generates unique hero text for city pages
 */
export function generateCityHeroText(city: City): string {
  const countyContext = city.county ? ` in ${city.county}` : ''
  const neighborhoodContext = city.neighborhoods?.length
    ? `, including ${city.neighborhoods.slice(0, 2).join(' and ')}`
    : ''

  const variations = [
    `${city.name}, Massachusetts${countyContext} deserves painters who understand local architecture and New England's demanding climate. JH Painting Services has transformed countless homes${neighborhoodContext}, delivering premium results that protect your investment and enhance your property's beauty. Our ${city.population || 'growing'} community trusts us for interior excellence, exterior durability, and cabinet transformations that save thousands over replacement.`,

    `When ${city.name} homeowners need painting done right, they call JH Painting Services. We've built our reputation throughout ${city.county || 'Massachusetts'} by delivering exceptional craftsmanship, using Benjamin Moore and Sherwin-Williams paints, and treating every home like our own. From historic properties to modern builds${neighborhoodContext}, we bring the expertise your ${city.name} home deserves.`,

    `Your ${city.name} home faces unique challenges – from harsh winters to humid summers. JH Painting Services specializes in protecting and beautifying homes throughout ${city.county || 'the area'}${neighborhoodContext}. With 40+ five-star reviews and a commitment to excellence, we're the painters ${city.name} residents recommend to their neighbors.`,
  ]

  // Use city slug hash to consistently select variation
  const index = Math.abs(hashCode(city.slug)) % variations.length
  return variations[index]
}

/**
 * Generates unique intro paragraph for city+service pages
 */
export function generateServiceIntro(city: City, serviceSlug: string): string {
  const service = serviceContent[serviceSlug as keyof typeof serviceContent]
  if (!service) return ''

  const countyContext = city.county ? `${city.county}` : 'Massachusetts'
  const landmarks = city.landmarks?.length ? city.landmarks[0] : 'the area'
  const neighborhoods = city.neighborhoods?.length
    ? city.neighborhoods.slice(0, 2).join(', ')
    : 'neighborhoods throughout town'

  const hash = hashCode(`${city.slug}-${serviceSlug}`)
  const starterIndex = Math.abs(hash) % sentenceStarters.length
  const benefitIndex = Math.abs(hash) % service.benefits.length
  const featureIndex = Math.abs(hash) % service.features.length

  return `${sentenceStarters[starterIndex]} ${city.name}, ${service.name.toLowerCase()} transforms your property while protecting your investment. Serving ${neighborhoods} and areas near ${landmarks}, JH Painting Services brings professional expertise that ${city.name} homeowners trust. Our ${countyContext} clients choose us for ${service.features[featureIndex]} and results that exceed expectations. ${service.benefits[benefitIndex]} – that's the JH Painting difference that's earned us 40+ five-star Google reviews from families just like yours in ${city.name}, MA.`
}

/**
 * Generates unique pain points section for city+service pages
 */
export function generateServicePainPoints(city: City, serviceSlug: string): string[] {
  const service = serviceContent[serviceSlug as keyof typeof serviceContent]
  if (!service) return []

  const hash = hashCode(`${city.slug}-${serviceSlug}-pain`)
  const countyContext = city.county || 'your area'

  // Create unique pain points by combining service pain points with city context
  return service.painPoints.map((pain, i) => {
    const variations = [
      `${city.name} homes often suffer from ${pain} – and our ${countyContext} climate makes it worse`,
      `We see countless ${city.name} properties struggling with ${pain}, especially in older neighborhoods`,
      `If your ${city.name} home has ${pain}, you're not alone – it's one of the most common issues we fix`,
      `Many ${city.name} homeowners call us about ${pain} caused by years of New England weather`,
    ]
    const varIndex = Math.abs(hash + i) % variations.length
    return variations[varIndex]
  })
}

/**
 * Generates unique solutions section for city+service pages
 */
export function generateServiceSolutions(city: City, serviceSlug: string): string[] {
  const service = serviceContent[serviceSlug as keyof typeof serviceContent]
  if (!service) return []

  const hash = hashCode(`${city.slug}-${serviceSlug}-solution`)

  return service.features.map((feature, i) => {
    const variations = [
      `For ${city.name} homes, we provide ${feature} that stands up to local conditions`,
      `Our ${city.name} clients benefit from ${feature}, customized for ${city.county || 'Massachusetts'} properties`,
      `We deliver ${feature} that ${city.name} homeowners rave about in their reviews`,
      `${city.name} projects include ${feature} as part of our comprehensive service`,
    ]
    const varIndex = Math.abs(hash + i) % variations.length
    return variations[varIndex]
  })
}

/**
 * Generates unique "Why Choose Us" content for city pages
 */
export function generateWhyChooseUs(city: City): string[] {
  const distance = city.distance
  const countyContext = city.county || 'Massachusetts'
  const landmarks = city.landmarks?.slice(0, 2).join(', ') || 'local attractions'

  const baseReasons = [
    distance < 10
      ? `Just ${distance.toFixed(1)} miles from our headquarters – we're your true local painters serving ${city.name}`
      : `Proudly serving ${city.name} and all of ${countyContext} with fast response times`,
    `Deep knowledge of ${city.name}'s architecture, from historic homes to modern construction`,
    `Familiar with ${city.name} neighborhoods and landmarks like ${landmarks}`,
    `Premium Benjamin Moore and Sherwin-Williams paints built for ${countyContext}'s climate`,
    `40+ five-star Google reviews from families throughout ${countyContext}`,
    `Fully licensed, insured, and EPA Lead-Safe Certified for ${city.name} homes`,
    `Written warranties: 5 years exterior, 3 years interior – backed by our local reputation`,
  ]

  return baseReasons
}

/**
 * Generates unique FAQ content for city+service pages
 */
export function generateServiceFAQ(city: City, serviceSlug: string): { question: string; answer: string }[] {
  const service = serviceContent[serviceSlug as keyof typeof serviceContent]
  if (!service) return []

  const countyContext = city.county || 'Massachusetts'
  const zipCode = city.zipCodes?.[0] || ''
  const zipContext = zipCode ? ` ${zipCode}` : ''

  return [
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${city.name}, MA?`,
      answer: `${service.name} costs in ${city.name}${zipContext} depend on your project's scope, surface condition, and material choices. For ${city.name} homes, interior painting typically runs $3-$5/sq ft, exteriors $4-$7/sq ft, and cabinet refinishing $3,500-$8,000 for average kitchens. We provide free, detailed estimates with no hidden fees. Call (508) 690-8886 for your ${city.name} project quote.`
    },
    {
      question: `Do you serve ${city.name}, MA${zipContext}?`,
      answer: `Absolutely! ${city.name} is ${city.distance < 10 ? 'one of our closest service areas' : 'well within our service area'}, just ${city.distance.toFixed(1)} miles from our Marlborough headquarters. We have many satisfied customers throughout ${city.name} and ${countyContext}. Call (508) 690-8886 for a free estimate!`
    },
    {
      question: `What makes JH Painting the best choice for ${service.name.toLowerCase()} in ${city.name}?`,
      answer: `${city.name} homeowners choose JH Painting for our ${service.features[0]}, extensive local experience in ${countyContext}, and 40+ five-star reviews. We understand ${city.name}'s unique architecture and climate challenges, use premium paints from Benjamin Moore and Sherwin-Williams, and back our work with written warranties.`
    },
    {
      question: `How long does ${service.name.toLowerCase()} take in ${city.name}?`,
      answer: `Project timelines in ${city.name} vary by scope. A typical room takes 1-2 days, full interior 4-7 days, exterior 5-10 days, and kitchen cabinets 5-7 days. We provide detailed timelines in your free estimate and work efficiently to minimize disruption to your ${city.name} household.`
    },
    {
      question: `When is the best time for ${service.name.toLowerCase()} in ${city.name}?`,
      answer: `For ${city.name} exteriors, late spring through early fall (May-October) is ideal when temperatures stay between 50-85°F. Interior and cabinet painting can be done year-round in ${city.name}. We recommend booking 2-3 weeks ahead during peak season (May-September) to secure your preferred dates.`
    },
  ]
}

/**
 * Generates unique closing paragraph for pages
 */
export function generateClosingPitch(city: City, serviceSlug?: string): string {
  const service = serviceSlug ? serviceContent[serviceSlug as keyof typeof serviceContent] : null
  const serviceName = service ? service.name.toLowerCase() : 'painting'
  const countyContext = city.county || 'the area'

  const variations = [
    `Ready to transform your ${city.name} home with professional ${serviceName}? JH Painting Services has earned the trust of homeowners throughout ${countyContext} with exceptional craftsmanship and genuine care. Contact us at (508) 690-8886 for your free estimate and discover why your ${city.name} neighbors recommend us.`,

    `Your ${city.name} home deserves the best ${serviceName} services ${countyContext} has to offer. From our premium materials to our meticulous attention to detail, JH Painting delivers results that protect your investment and enhance your property's beauty. Call (508) 690-8886 today – we'd be honored to serve you.`,

    `Don't settle for average ${serviceName} in ${city.name}. With JH Painting Services, you get local expertise, premium quality, and the peace of mind that comes from working with trusted professionals. Reach out at (508) 690-8886 for your free, no-obligation estimate.`,
  ]

  const hash = hashCode(`${city.slug}-${serviceSlug || 'city'}-close`)
  return variations[Math.abs(hash) % variations.length]
}

/**
 * Simple hash function for consistent content generation
 */
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash
}

/**
 * Export service content for external use
 */
export { serviceContent }
