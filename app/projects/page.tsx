import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import ProjectsClient from './ProjectsClient'
import { projects, formatCompleted } from '@/app/data/projects'
import './projects.css'

/**
 * /projects - the portfolio.
 *
 * Rebuilt to render app/data/projects.ts: real site photographs from real
 * jobs, grouped by job rather than by loose category. The previous version
 * showed a flat pool of stock-ish marketing images with no city, date or
 * client attached, which meant it proved nothing about where we actually work.
 *
 * The page shell stays a Server Component so the ImageGallery JSON-LD below is
 * emitted in the static HTML; the gallery UI itself is the client island.
 */

const SITE = 'https://jhpaintingservices.com'

/**
 * ImageGallery + per-project ImageObject.
 *
 * `contentLocation` is the point of this block: it ties each photograph to the
 * town it was taken in, which is what connects this portfolio to the
 * /massachusetts/<city> pages as corroborating evidence rather than decoration.
 * Only towns we can actually prove get a contentLocation.
 */
const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  '@id': `${SITE}/projects#gallery`,
  name: 'JH Painting Services - completed projects in Massachusetts',
  description:
    'Original site photographs from painting, carpentry and power-washing jobs completed by JH Painting Services across Massachusetts.',
  url: `${SITE}/projects`,
  isPartOf: { '@id': `${SITE}/#website` },
  provider: { '@id': `${SITE}/#organization` },
  numberOfItems: projects.reduce((s, p) => s + p.photos.length, 0),
  associatedMedia: projects.flatMap((p) =>
    p.photos.map((ph, i) => ({
      '@type': 'ImageObject',
      '@id': `${SITE}/projects#${p.slug}-${i + 1}`,
      contentUrl: `${SITE}${ph.src}`,
      thumbnailUrl: `${SITE}${ph.thumb}`,
      width: ph.w,
      height: ph.h,
      name: `${p.client ? `${p.client} - ` : ''}${p.title}${p.city ? `, ${p.city} ${p.state}` : ''}`,
      caption: `${p.serviceLabel}${p.space ? ` - ${p.space}` : ''} by JH Painting Services${
        p.city ? ` in ${p.city}, ${p.state}` : ' in Massachusetts'
      }, ${formatCompleted(p.completed)}.`,
      ...(p.city
        ? {
            contentLocation: {
              '@type': 'Place',
              name: `${p.city}, ${p.state}`,
              address: {
                '@type': 'PostalAddress',
                addressLocality: p.city,
                addressRegion: p.state,
                addressCountry: 'US',
              },
            },
          }
        : {}),
      creator: { '@id': `${SITE}/#organization` },
      copyrightHolder: { '@id': `${SITE}/#organization` },
    }))
  ),
}

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      <Header />
      <main>
        <ProjectsClient />
      </main>
      <Footer />
    </>
  )
}
