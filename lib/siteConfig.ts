// lib/siteConfig.ts
// ─────────────────────────────────────────────────────────────────────────────
// FONTE ÚNICA DE VERDADE (Task 7).
// Todos os textos de números do site E todo o JSON-LD leem deste arquivo.
// Mude um valor aqui → muda em todas as páginas e em todo o schema.
//
// Esta config é importada por:
//   - lib/schema.ts (gera todos os JSON-LD)
//   - lib/seo.ts (helper de metadata)
//   - app/page.tsx + city/service pages (textos visíveis: "117+ cities", etc.)
//
// Valores em INGLÊS porque são conteúdo público visível pra clientes nos EUA.
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'JH Painting Services',
  url: 'https://jhpaintingservices.com',

  phone: '+15086908886',
  phoneDisplay: '(508) 690-8886',
  email: 'contact@jhpaintingservices.com',

  logo: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png',
  image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',

  // NAP - Marlborough, MA.
  // Se a JH for Service-Area Business no Google (endereço escondido), deixe
  // streetAddress = '' e confie em areaServed. O gerador de schema omite o campo
  // automaticamente quando vazio.
  address: {
    streetAddress: '',
    addressLocality: 'Marlborough',
    addressRegion: 'MA',
    postalCode: '01752',
    addressCountry: 'US',
  },
  geo: { latitude: 42.3459, longitude: -71.5523 },

  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '16:00' },
  ],

  priceRange: '$$',
  foundingDate: '2018',
  founder: 'Jafet Henrique',

  // Estes números são exibidos no site E injetados no JSON-LD - manter sincronizados.
  rating: '5.0',
  reviewCount: '40',
  citiesServed: 117,
  projectsCompleted: 200,
  // Texto único pra resposta - antes tinha 3 variantes: "Same Day", "24hr", "24-48 hours"
  responseTime: '24-48 hours',

  sameAs: [
    'https://www.facebook.com/profile.php?id=61564489391475',
    'https://www.instagram.com/jhpaintingservices_/',
    'https://www.youtube.com/@JHPaintingServices-br9wh',
    'https://g.co/kgs/hc9Rfmv',
  ],

  // Os 7 serviços (slug = pasta em /services/[slug]).
  services: [
    { slug: 'interior-painting', name: 'Interior Painting' },
    { slug: 'exterior-painting', name: 'Exterior Painting' },
    { slug: 'commercial-painting', name: 'Commercial Painting' },
    { slug: 'residential-painting', name: 'Residential Painting' },
    { slug: 'cabinet-painting', name: 'Cabinet Painting' },
    { slug: 'carpentry', name: 'Carpentry' },
    { slug: 'power-washing', name: 'Power Washing' },
  ],
} as const

export type SiteConfig = typeof siteConfig
