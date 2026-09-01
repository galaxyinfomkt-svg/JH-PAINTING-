import Image from 'next/image'
import Link from 'next/link'
import { projects, formatCompleted, totalProjectPhotos } from '@/app/data/projects'

/**
 * Home "Project Gallery" - built from app/data/projects.ts, i.e. from the
 * crew's own job photographs.
 *
 * WHAT THIS REPLACED AND WHY
 * --------------------------
 * The home page shipped six hardcoded images pulled from the GoHighLevel media
 * bucket (storage.googleapis.com/msgsndr/...). Three problems with that, in
 * order of how much they cost:
 *
 * 1. THE ALT TEXT MADE CLAIMS THE PHOTOS DID NOT SUPPORT. One tile was labelled
 *    "Exterior house painting project in Waltham Massachusetts - historic
 *    church renovation by JH Painting" while pointing at a generic CDN image.
 *    Meanwhile /public/projects/waltham-church-exterior/ holds eight actual
 *    photographs of that exact job, and they were not on the home page at all.
 *    Describing a stock image as a specific named project is the one thing the
 *    rest of this codebase - projects.ts, cityFacts.ts - explicitly refuses to
 *    do.
 *
 * 2. IT WAS THE WEAKEST PROOF ON THE PAGE. 144 real WebP photographs of 13
 *    completed jobs sit in /public and were reachable only from /projects. A
 *    homepage gallery of generic interiors is the one thing every competitor
 *    also has; a Roto-Rooter cafeteria in Marlborough finished in October 2025
 *    is not.
 *
 * 3. SIX CROSS-ORIGIN IMAGE FETCHES. The replacements are same-origin, and the
 *    grid loads the -thumb variants (~59 KB) rather than the full frames
 *    (~257 KB average, up to 666 KB).
 *
 * LAYOUT NOTE - why the tiles are 3:4 and not 4:3
 * -----------------------------------------------
 * The old grid was `aspect-ratio: 4/3` because stock photography is landscape.
 * Every real job photo here is portrait (1600x2133, and 1536x2048 for the
 * church) because they were shot on a phone on site. Forcing a portrait frame
 * into a landscape box crops away about 44% of it, which on an interior shot
 * removes the ceiling line and the trim - the parts that show the workmanship.
 * The tiles match the photographs instead.
 *
 * The old tiles also carried `cursor: pointer` while being plain <div>s that
 * did nothing when clicked, and their caption overlay was `opacity: 0` until
 * :hover, so on a phone it never appeared at all. Each tile is now a real link
 * into /projects and the caption is always visible.
 */

/** One representative photo per job, ordered to lead with the flagship work. */
const FEATURED_SLUGS = [
  'waltham-church-exterior',
  'interior-repaint-groton',
  'roto-rooter-marlborough-cafeteria',
  'interior-painting-shrewsbury',
  'interior-room-painting-boston',
  'interior-repaint-southbridge',
]

const featured = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
)

export default function HomeGallery() {
  if (featured.length === 0) return null

  return (
    <section id="gallery" className="section section-modern gallery-section">
      <div className="container">
        <div className="section-header section-header-enhanced">
          <span className="section-eyebrow">Our Portfolio</span>
          <h2>Project Gallery</h2>
          <p>
            Our own photographs from finished jobs across Massachusetts - {totalProjectPhotos} of
            them, no stock images.
          </p>
        </div>

        <div className="gallery-grid gallery-grid-proof">
          {featured.map((project) => {
            const photo = project.photos[0]
            const place = project.city ? `${project.city}, ${project.state}` : project.state
            const when = formatCompleted(project.completed)
            return (
              <Link
                key={project.slug}
                href="/projects"
                className="gallery-item gallery-item-proof"
              >
                {/* No aria-label. An aria-label REPLACES the accessible name,
                    and the visible caption below is the better name anyway -
                    overriding it with different words is the WCAG 2.5.3 "Label
                    in Name" failure this audit fixed elsewhere. The link's
                    destination is spelled out in sr-only text at the end. */}
                <Image
                  src={photo.thumb}
                  alt={`${project.serviceLabel} by JH Painting Services - ${project.title}${
                    project.space ? `, ${project.space.toLowerCase()}` : ''
                  } in ${place}`}
                  width={photo.w}
                  height={photo.h}
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <div className="gallery-item-caption">
                  <span className="gallery-item-place">{place}</span>
                  <span className="gallery-item-title">
                    {project.client ? `${project.client}: ` : ''}
                    {project.title}
                  </span>
                  <span className="gallery-item-meta">
                    {project.serviceLabel}
                    {when ? ` · ${when}` : ''}
                  </span>
                  <span className="sr-only"> - see the full project gallery</span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="gallery-cta">
          <Link href="/projects" className="btn btn-primary">
            See all {totalProjectPhotos} job photos
          </Link>
        </div>
      </div>
    </section>
  )
}
