// lib/faqData.ts
// ─────────────────────────────────────────────────────────────────────────────
// Perguntas/respostas que alimentam o FAQPage schema.
// Texto em INGLÊS porque é conteúdo público do site, visto por clientes nos EUA.
//
// REGRA DE OURO: este texto tem que ser IGUAL ao FAQ renderizado na página.
// Se você mudar a cópia visível, mude aqui também (e vice-versa), senão o
// Google invalida o rich result.
// ─────────────────────────────────────────────────────────────────────────────

export type Faq = { q: string; a: string }

// FAQ da HOME
export const homeFaqs: Faq[] = [
  {
    q: 'How do I get a painting estimate in Massachusetts?',
    a: "We provide free, no-obligation estimates for all painting projects in Massachusetts. Call (508) 690-8886 or fill out our online form. We'll visit your property, assess the scope of work, discuss your color preferences, and provide a detailed written estimate - typically within 24-48 hours.",
  },
  {
    q: 'How long does a painting project take?',
    a: 'Most interior room painting takes 1-2 days per room. A full interior typically takes 3-7 days. Exterior painting usually takes 5-10 days depending on home size and weather. We provide a specific timeline during your free estimate and keep you updated throughout.',
  },
  {
    q: 'What paint brands do you use?',
    a: "We exclusively use premium paints from Benjamin Moore and Sherwin-Williams, formulated to withstand New England's freeze-thaw cycles, humidity, and UV exposure. Quality paint lasts 7-10+ years versus 3-5 years for lesser-grade alternatives.",
  },
  {
    q: 'Are you licensed and insured?',
    a: "Yes. JH Painting Services is fully licensed in Massachusetts and carries comprehensive liability insurance and workers' compensation coverage. We're also EPA Lead-Safe Certified for homes built before 1978.",
  },
  {
    q: 'Do you offer free estimates?',
    a: "Absolutely. We provide free, no-obligation estimates for all projects. We'll visit your property, discuss your vision, assess the scope of work, and provide a detailed written estimate with no pressure to commit.",
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve 117+ cities across Massachusetts including Boston, Cambridge, Worcester, Marlborough, and the entire MetroWest region. Based in Marlborough, we cover MetroWest, Greater Boston, Worcester County, and beyond.',
  },
  {
    q: 'How do I prepare for my painting project?',
    a: 'We handle most preparation. For interiors, clear small items from surfaces and move furniture away from walls (or we can do it). For exteriors, ensure we have access to your home’s perimeter. We cover and protect floors, furniture, landscaping, and fixtures.',
  },
  {
    q: 'What is your warranty?',
    a: 'We stand behind our work with a 5-year warranty on exterior painting and a 3-year warranty on interior painting, covering peeling, blistering, cracking, and fading under normal conditions.',
  },
]

// FAQ das páginas de CIDADE - parametrizado por {city}.
export function cityFaqs(city: string): Faq[] {
  return [
    {
      q: `Are you actually located near ${city}?`,
      a: `Yes! JH Painting Services proudly serves ${city}, MA, and we're based in nearby Marlborough. We're not a franchise or out-of-town company - our owner Jafet and many crew members are local. When you hire us, you're supporting a local business invested in the community.`,
    },
    {
      q: `Do you work on historic homes in ${city}?`,
      a: `Absolutely. We have extensive experience with older homes, including proper lead paint protocols (we're EPA Lead-Safe Certified), period-appropriate color selection, and restoration of historic architectural details. We treat these homes with the respect they deserve.`,
    },
    {
      q: `How quickly can you start a project in ${city}?`,
      a: `We can often start within days, not weeks. We offer same-day estimates and priority scheduling. During peak season (May-September) we recommend booking 2-3 weeks in advance, but we always try to accommodate urgent requests.`,
    },
    {
      q: `What paint brands do you use for ${city} homes?`,
      a: `We exclusively use premium Benjamin Moore and Sherwin-Williams paints formulated for New England's extreme weather. For exteriors we typically recommend Benjamin Moore Aura or Sherwin-Williams Duration; for interiors we use low-VOC and zero-VOC options that are safe for your family.`,
    },
    {
      q: `Do you offer free estimates in ${city}?`,
      a: `Yes! We provide free, detailed written estimates for all ${city} projects, usually scheduled within 24-48 hours. Each estimate includes a complete scope of work, materials, and a clear project timeline.`,
    },
    {
      q: 'How do you handle Massachusetts weather when painting exteriors?',
      a: 'We only paint exteriors when temperatures are between 50-85°F with low humidity and no rain in the forecast. We use paints formulated for temperature extremes, apply proper primers for moisture protection, and ensure adequate dry time between coats.',
    },
    {
      q: `What is your warranty on painting work in ${city}?`,
      a: `We offer a 5-year warranty on exterior painting and a 3-year warranty on interior painting, covering peeling, blistering, flaking, and fading under normal conditions. Because we're local, warranty service is quick and easy.`,
    },
    {
      q: 'Can you match colors from my existing paint or help me choose new colors?',
      a: 'Absolutely. We offer professional color matching using spectrophotometer technology, plus complimentary color consultation. We can show you how colors look in different lighting and bring large samples to your home before you commit.',
    },
  ]
}
