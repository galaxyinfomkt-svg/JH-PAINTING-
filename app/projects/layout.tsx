import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  // 67 -> 45 chars. The old title carried two separators and a slogan, so
  // Google cut it after "Projects MA" and the slogan never rendered.
  title: 'Our Work | Painting Projects in Massachusetts',
  description:
    // 196 -> 152 chars. Everything after "insured" was truncated, including
    // the phone number the snippet is supposed to end on.
    'Our own photos of finished painting jobs across Massachusetts: interior, exterior, cabinets, commercial. $2M insured. Free estimate: (508) 690-8886',
  path: '/projects',
  ogImageAlt: 'Painting Projects Portfolio - JH Painting Services Massachusetts',
  keywords: [
    'painting before after Massachusetts',
    'painting portfolio MA',
    'painting projects gallery',
    'house painting examples',
    'interior painting photos',
    'exterior painting before after',
    'cabinet painting transformations',
    'painting contractor portfolio',
    'real painting results MA',
    'professional painting examples',
  ],
})

/**
 * Projects gallery structured data: marks the index as a CollectionPage of
 * ImageObjects (before/after photos) + adds the breadcrumb. Helps Google
 * Image Search index the gallery as a single named portfolio.
 */
const projectsIndexSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://jhpaintingservices.com/projects#collection',
      url: 'https://jhpaintingservices.com/projects',
      name: 'JH Painting Projects - Before & After Massachusetts',
      description:
        'Real painting transformations by JH Painting Services across Massachusetts. Interior, exterior, cabinet refinishing. Licensed & $2M insured. Call (508) 690-8886.',
      isPartOf: { '@id': 'https://jhpaintingservices.com/#website' },
      about: { '@id': 'https://jhpaintingservices.com/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jhpaintingservices.com' },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://jhpaintingservices.com/projects' },
      ],
    },
  ],
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsIndexSchema) }}
      />
      {children}
    </>
  )
}
