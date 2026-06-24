import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Painting Tips & Expert Guides MA | JH Painting Blog',
  description:
    'Which paints last longest in Massachusetts? Best paint colors? DIY vs pro? Expert tips from MA painters with 40+ 5-star reviews. (508) 690-8886',
  path: '/blog',
  ogImageAlt: 'Painting Tips and Guides - JH Painting Services Massachusetts',
  keywords: [
    'best painters Massachusetts',
    'interior painting tips MA',
    'best paint colors 2024',
    'DIY vs professional painting',
    'interior painting tips',
    'exterior painting guide',
    'cabinet painting ideas MA',
    'house painting guide Massachusetts',
    'painting preparation tips',
    'how to choose paint colors',
    'painting contractor advice',
    'home painting blog MA',
  ],
})

/**
 * Blog index structured data: marks the index as a Blog/CollectionPage so Google
 * understands it's a content hub (improves chance of Top Stories / News carousel
 * surfacing) and adds a BreadcrumbList so the SERP shows the path.
 */
const blogIndexSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      '@id': 'https://jhpaintingservices.com/blog#blog',
      url: 'https://jhpaintingservices.com/blog',
      name: 'JH Painting Blog - Painting Tips & Expert Guides MA',
      description:
        'Expert painting tips, color guides, and how-to advice from a Massachusetts painting contractor with 40+ five-star reviews.',
      publisher: { '@id': 'https://jhpaintingservices.com/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jhpaintingservices.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://jhpaintingservices.com/blog' },
      ],
    },
  ],
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
      />
      {children}
    </>
  )
}
