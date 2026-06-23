// lib/schema.ts
// ─────────────────────────────────────────────────────────────────────────────
// Geradores de JSON-LD (schema.org). Todos puxam do siteConfig.
//   getLocalBusiness(city?, citySlug?)  → HousePainter / LocalBusiness
//   getService({...})                   → Service
//   getFaqPage(faqs)                    → FAQPage
//   getBreadcrumb(items)                → BreadcrumbList
//   getWebSite()                        → WebSite (só na home)
//
// Use o componente <JsonLd /> pra renderizar - ver app/components/JsonLd.tsx.
// ─────────────────────────────────────────────────────────────────────────────

import { siteConfig as s } from './siteConfig'

// @id estável = uma única entidade "negócio" consolidada em todas as páginas.
const BUSINESS_ID = `${s.url}/#business`

type Node = Record<string, unknown>

function slugify(city: string): string {
  return city
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

// ── LocalBusiness / HousePainter ────────────────────────────────────────────
// Passe city (e o citySlug que você já usa na rota) nas páginas /massachusetts/[city].
// Omita tudo na home.
export function getLocalBusiness(city?: string, citySlug?: string): Node {
  const areaServed: Node[] = [{ '@type': 'State', name: 'Massachusetts' }]
  if (city) areaServed.unshift({ '@type': 'City', name: `${city}, MA` })

  return {
    '@context': 'https://schema.org',
    '@type': 'HousePainter',
    '@id': BUSINESS_ID,
    name: s.name,
    url: city ? `${s.url}/massachusetts/${citySlug ?? slugify(city)}` : s.url,
    telephone: s.phone,
    email: s.email,
    image: s.image,
    logo: s.logo,
    priceRange: s.priceRange,
    foundingDate: s.foundingDate,
    founder: { '@type': 'Person', name: s.founder },
    address: {
      '@type': 'PostalAddress',
      // streetAddress só entra se estiver preenchido no siteConfig.
      ...(s.address.streetAddress ? { streetAddress: s.address.streetAddress } : {}),
      addressLocality: s.address.addressLocality,
      addressRegion: s.address.addressRegion,
      postalCode: s.address.postalCode,
      addressCountry: s.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: s.geo.latitude,
      longitude: s.geo.longitude,
    },
    areaServed,
    openingHoursSpecification: s.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...h.days],
      opens: h.opens,
      closes: h.closes,
    })),
    // Reflete a nota REAL do Google. Mantenha sincronizado com siteConfig e
    // com reviews visíveis na página (política do Google).
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: s.rating,
      reviewCount: s.reviewCount,
    },
    sameAs: [...s.sameAs],
    // Catálogo de serviços - ajuda buscadores e IA a entenderem o que a JH faz.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Painting Services',
      itemListElement: s.services.map((svc) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: city ? `${svc.name} in ${city}, MA` : svc.name,
        },
      })),
    },
  }
}

// ── Service ─────────────────────────────────────────────────────────────────
// Use em /services/[slug] e em /massachusetts/[city]/[service].
export function getService(opts: {
  name: string
  slug: string
  description: string
  city?: string
  citySlug?: string
}): Node {
  const { name, slug, description, city, citySlug } = opts
  const url = city
    ? `${s.url}/massachusetts/${citySlug ?? slugify(city)}/${slug}`
    : `${s.url}/services/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: city ? `${name} in ${city}, MA` : `${name} in Massachusetts`,
    serviceType: name,
    url,
    description,
    provider: { '@type': 'HousePainter', '@id': BUSINESS_ID, name: s.name },
    areaServed: city
      ? { '@type': 'City', name: `${city}, MA` }
      : { '@type': 'State', name: 'Massachusetts' },
  }
}

// ── FAQPage ─────────────────────────────────────────────────────────────────
// REGRA DE OURO: o texto aqui PRECISA bater com o FAQ visível na página
// (exigência do Google). Veja lib/faqData.ts.
export function getFaqPage(faqs: { q: string; a: string }[]): Node {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// ── BreadcrumbList ──────────────────────────────────────────────────────────
export function getBreadcrumb(items: { name: string; url: string }[]): Node {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

// ── WebSite (apenas na home - bom pra entidade de marca) ────────────────────
export function getWebSite(): Node {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: s.name,
    url: s.url,
    publisher: { '@type': 'HousePainter', '@id': BUSINESS_ID },
  }
}
