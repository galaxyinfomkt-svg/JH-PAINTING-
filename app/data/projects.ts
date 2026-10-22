/**
 * projects.ts - REAL completed work, sourced from the company's own job photos.
 *
 * Every entry here corresponds to a folder of original photographs taken on
 * site. The photos were converted from the crew's iPhone HEIC originals to
 * WebP and are served from /public/projects/<slug>/.
 *
 * HONESTY RULE - the same one that governs cityFacts.ts:
 * The only facts recorded here are the ones the source material actually
 * proves: the city, the type of work, the space, the client name where the
 * client is identifiable in the photos, and the month the photos were taken.
 * No invented square footage, no invented paint codes, no invented customer
 * quotes. If a detail is not visible in the photo or recorded in the file
 * metadata, it is not written here.
 *
 * This is the first-hand evidence the SEO audit identified as the missing
 * ingredient: it is what no competitor can copy, and it is what makes a city
 * page defensible rather than merely different.
 */

export interface ProjectPhoto {
  src: string
  thumb: string
  w: number
  h: number
}

/**
 * One before/after pair, same room and same angle, both frames from the job's own
 * photographs. beforeLabel is 'Prep' when the first frame was taken after work had
 * started (floors covered, doors off) - calling that "before" would overstate it.
 */
export interface BeforeAfterPair {
  before: ProjectPhoto
  after: ProjectPhoto
  beforeLabel?: 'Before' | 'Prep'
  /** What the pair shows, in plain words. Only what is visible in the two frames. */
  caption: string
}

export interface Project {
  slug: string
  title: string
  /** Named only when the business is identifiable in the source photos. */
  client?: string
  city: string | null
  citySlug: string | null
  state: string
  /** Matches a /services/<slug> route. */
  service: string
  serviceLabel: string
  /** The specific space, when the photos show one. */
  space?: string
  /** YYYY-MM the photos were taken. Absent when the originals carry no date. */
  completed?: string
  /** Card cover. Falls back to photos[0]; set when the strongest finished frame is not first. */
  cover?: ProjectPhoto
  photos: ProjectPhoto[]
  pairs?: BeforeAfterPair[]
}

export const projects: Project[] = [
  {
    slug: 'interior-repaint-douglas',
    title: 'Whole-Home Interior Repaint',
    city: 'Douglas',
    citySlug: 'douglas',
    state: 'MA',
    service: 'interior-painting',
    serviceLabel: 'Interior Painting',
    space: 'Living room, dining room, four bedrooms and master bath',
    completed: '2026-10',
    photos: [
      { src: '/projects/interior-repaint-douglas/01.webp', thumb: '/projects/interior-repaint-douglas/01-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/02.webp', thumb: '/projects/interior-repaint-douglas/02-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/03.webp', thumb: '/projects/interior-repaint-douglas/03-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/04.webp', thumb: '/projects/interior-repaint-douglas/04-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/05.webp', thumb: '/projects/interior-repaint-douglas/05-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/06.webp', thumb: '/projects/interior-repaint-douglas/06-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/07.webp', thumb: '/projects/interior-repaint-douglas/07-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/08.webp', thumb: '/projects/interior-repaint-douglas/08-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/09.webp', thumb: '/projects/interior-repaint-douglas/09-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/10.webp', thumb: '/projects/interior-repaint-douglas/10-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/11.webp', thumb: '/projects/interior-repaint-douglas/11-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/12.webp', thumb: '/projects/interior-repaint-douglas/12-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/13.webp', thumb: '/projects/interior-repaint-douglas/13-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/14.webp', thumb: '/projects/interior-repaint-douglas/14-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/15.webp', thumb: '/projects/interior-repaint-douglas/15-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/16.webp', thumb: '/projects/interior-repaint-douglas/16-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/17.webp', thumb: '/projects/interior-repaint-douglas/17-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/18.webp', thumb: '/projects/interior-repaint-douglas/18-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/19.webp', thumb: '/projects/interior-repaint-douglas/19-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/20.webp', thumb: '/projects/interior-repaint-douglas/20-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/21.webp', thumb: '/projects/interior-repaint-douglas/21-thumb.webp', w: 1200, h: 1600 },
      { src: '/projects/interior-repaint-douglas/22.webp', thumb: '/projects/interior-repaint-douglas/22-thumb.webp', w: 1200, h: 1600 },
    ],
    pairs: [
      {
        before: { src: '/projects/interior-repaint-douglas/ba-01-before.webp', thumb: '/projects/interior-repaint-douglas/ba-01-before-thumb.webp', w: 1200, h: 1600 },
        after: { src: '/projects/interior-repaint-douglas/ba-01-after.webp', thumb: '/projects/interior-repaint-douglas/ba-01-after-thumb.webp', w: 1200, h: 1600 },
        caption: "Living room: dark brown accent and tan walls, repainted in sage and greige.",
      },
      {
        before: { src: '/projects/interior-repaint-douglas/ba-02-before.webp', thumb: '/projects/interior-repaint-douglas/ba-02-before-thumb.webp', w: 1200, h: 1600 },
        after: { src: '/projects/interior-repaint-douglas/ba-02-after.webp', thumb: '/projects/interior-repaint-douglas/ba-02-after-thumb.webp', w: 1200, h: 1600 },
        caption: "Living room under the vaulted ceiling, before and after.",
      },
      {
        before: { src: '/projects/interior-repaint-douglas/ba-03-before.webp', thumb: '/projects/interior-repaint-douglas/ba-03-before-thumb.webp', w: 1200, h: 1600 },
        after: { src: '/projects/interior-repaint-douglas/ba-03-after.webp', thumb: '/projects/interior-repaint-douglas/ba-03-after-thumb.webp', w: 1200, h: 1600 },
        caption: "Dining room: red wainscoting repainted sage green, cream walls above.",
      },
      {
        before: { src: '/projects/interior-repaint-douglas/ba-04-before.webp', thumb: '/projects/interior-repaint-douglas/ba-04-before-thumb.webp', w: 1200, h: 1600 },
        after: { src: '/projects/interior-repaint-douglas/ba-04-after.webp', thumb: '/projects/interior-repaint-douglas/ba-04-after-thumb.webp', w: 1200, h: 1600 },
        caption: "Dining room toward the French doors, before and after.",
      },
      {
        before: { src: '/projects/interior-repaint-douglas/ba-05-before.webp', thumb: '/projects/interior-repaint-douglas/ba-05-before-thumb.webp', w: 1200, h: 1600 },
        after: { src: '/projects/interior-repaint-douglas/ba-05-after.webp', thumb: '/projects/interior-repaint-douglas/ba-05-after-thumb.webp', w: 1200, h: 1600 },
        caption: "Bedroom: tired gray walls refreshed in a lighter neutral.",
      },
      {
        before: { src: '/projects/interior-repaint-douglas/ba-06-before.webp', thumb: '/projects/interior-repaint-douglas/ba-06-before-thumb.webp', w: 1200, h: 1600 },
        after: { src: '/projects/interior-repaint-douglas/ba-06-after.webp', thumb: '/projects/interior-repaint-douglas/ba-06-after-thumb.webp', w: 1200, h: 1600 },
        caption: "Bedroom: shelving removed, holes patched, sage and teal repainted in pink with a lilac accent wall.",
      },
      {
        before: { src: '/projects/interior-repaint-douglas/ba-07-before.webp', thumb: '/projects/interior-repaint-douglas/ba-07-before-thumb.webp', w: 1200, h: 1600 },
        after: { src: '/projects/interior-repaint-douglas/ba-07-after.webp', thumb: '/projects/interior-repaint-douglas/ba-07-after-thumb.webp', w: 1200, h: 1600 },
        caption: "Bedroom: teal and gray walls patched and repainted in cream with an olive accent wall.",
      },
      {
        before: { src: '/projects/interior-repaint-douglas/ba-08-before.webp', thumb: '/projects/interior-repaint-douglas/ba-08-before-thumb.webp', w: 1200, h: 1600 },
        after: { src: '/projects/interior-repaint-douglas/ba-08-after.webp', thumb: '/projects/interior-repaint-douglas/ba-08-after-thumb.webp', w: 1200, h: 1600 },
        caption: "Master bedroom: dark khaki walls repainted in a soft lavender.",
      },
      {
        before: { src: '/projects/interior-repaint-douglas/ba-09-before.webp', thumb: '/projects/interior-repaint-douglas/ba-09-before-thumb.webp', w: 1200, h: 1600 },
        after: { src: '/projects/interior-repaint-douglas/ba-09-after.webp', thumb: '/projects/interior-repaint-douglas/ba-09-after-thumb.webp', w: 1200, h: 1600 },
        caption: "Master bathroom: khaki walls repainted in light lavender.",
      },
      {
        before: { src: '/projects/interior-repaint-douglas/ba-10-before.webp', thumb: '/projects/interior-repaint-douglas/ba-10-before-thumb.webp', w: 1200, h: 1600 },
        after: { src: '/projects/interior-repaint-douglas/ba-10-after.webp', thumb: '/projects/interior-repaint-douglas/ba-10-after-thumb.webp', w: 1200, h: 1600 },
        caption: "Master bathroom vanity wall, before and after.",
      },
    ],
  },
  {
    slug: 'interior-repaint-northbridge',
    title: 'Living Room Repaint',
    city: 'Northbridge',
    citySlug: 'northbridge',
    state: 'MA',
    service: 'interior-painting',
    serviceLabel: 'Interior Painting',
    space: 'Living room above the wainscoting',
    completed: '2025-03',
    photos: [
      { src: '/projects/interior-repaint-northbridge/01.webp', thumb: '/projects/interior-repaint-northbridge/01-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-northbridge/02.webp', thumb: '/projects/interior-repaint-northbridge/02-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-northbridge/03.webp', thumb: '/projects/interior-repaint-northbridge/03-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-northbridge/04.webp', thumb: '/projects/interior-repaint-northbridge/04-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-northbridge/05.webp', thumb: '/projects/interior-repaint-northbridge/05-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-northbridge/06.webp', thumb: '/projects/interior-repaint-northbridge/06-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-northbridge/07.webp', thumb: '/projects/interior-repaint-northbridge/07-thumb.webp', w: 1600, h: 2133 },
    ],
    pairs: [
      {
        before: { src: '/projects/interior-repaint-northbridge/ba-01-before.webp', thumb: '/projects/interior-repaint-northbridge/ba-01-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/interior-repaint-northbridge/ba-01-after.webp', thumb: '/projects/interior-repaint-northbridge/ba-01-after-thumb.webp', w: 1600, h: 2133 },
        caption: "Sage green upper walls repainted light gray above the white wainscoting.",
      },
      {
        before: { src: '/projects/interior-repaint-northbridge/ba-02-before.webp', thumb: '/projects/interior-repaint-northbridge/ba-02-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/interior-repaint-northbridge/ba-02-after.webp', thumb: '/projects/interior-repaint-northbridge/ba-02-after-thumb.webp', w: 1600, h: 2133 },
        caption: "Looking into the next room, before and after.",
      },
      {
        before: { src: '/projects/interior-repaint-northbridge/ba-03-before.webp', thumb: '/projects/interior-repaint-northbridge/ba-03-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/interior-repaint-northbridge/ba-03-after.webp', thumb: '/projects/interior-repaint-northbridge/ba-03-after-thumb.webp', w: 1600, h: 2133 },
        caption: "The full length of the room, before and after.",
      },
    ],
  },
  {
    slug: 'interior-repaint-groton',
    title: 'Whole-Home Interior Repaint',
    city: 'Groton',
    citySlug: 'groton',
    state: 'MA',
    service: 'interior-painting',
    serviceLabel: 'Interior Painting',
    space: 'Hallway, landing and bedrooms',
    cover: { src: '/projects/interior-repaint-groton/cover.webp', thumb: '/projects/interior-repaint-groton/cover-thumb.webp', w: 1600, h: 2133 },
    pairs: [
      {
        before: { src: '/projects/interior-repaint-groton/ba-01-before.webp', thumb: '/projects/interior-repaint-groton/ba-01-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/interior-repaint-groton/ba-01-after.webp', thumb: '/projects/interior-repaint-groton/ba-01-after-thumb.webp', w: 1600, h: 2133 },
        caption: "Living room: a deep blue accent wall up the full height of the cathedral ceiling.",
      },
      {
        before: { src: '/projects/interior-repaint-groton/ba-02-before.webp', thumb: '/projects/interior-repaint-groton/ba-02-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/interior-repaint-groton/ba-02-after.webp', thumb: '/projects/interior-repaint-groton/ba-02-after-thumb.webp', w: 1600, h: 2133 },
        beforeLabel: 'Prep',
        caption: "Bedroom: floors covered and doors off for prep, finished in blue-gray.",
      },
      {
        before: { src: '/projects/interior-repaint-groton/ba-03-before.webp', thumb: '/projects/interior-repaint-groton/ba-03-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/interior-repaint-groton/ba-03-after.webp', thumb: '/projects/interior-repaint-groton/ba-03-after-thumb.webp', w: 1600, h: 2133 },
        beforeLabel: 'Prep',
        caption: "Bedroom: prep stage and the finished room in blue-gray.",
      },
    ],
    photos: [
      { src: '/projects/interior-repaint-groton/01.webp', thumb: '/projects/interior-repaint-groton/01-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-groton/02.webp', thumb: '/projects/interior-repaint-groton/02-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-groton/03.webp', thumb: '/projects/interior-repaint-groton/03-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-groton/04.webp', thumb: '/projects/interior-repaint-groton/04-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-groton/05.webp', thumb: '/projects/interior-repaint-groton/05-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-groton/06.webp', thumb: '/projects/interior-repaint-groton/06-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-groton/07.webp', thumb: '/projects/interior-repaint-groton/07-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-groton/08.webp', thumb: '/projects/interior-repaint-groton/08-thumb.webp', w: 1600, h: 2133 },
    ],
  },
  {
    slug: 'interior-repaint-southbridge',
    title: 'Occupied Home Interior Repaint',
    city: 'Southbridge',
    citySlug: 'southbridge',
    state: 'MA',
    service: 'interior-painting',
    serviceLabel: 'Interior Painting',
    space: 'Living, dining, bedrooms and baths',
    cover: { src: '/projects/interior-repaint-southbridge/cover.webp', thumb: '/projects/interior-repaint-southbridge/cover-thumb.webp', w: 1600, h: 2133 },
    pairs: [
      {
        before: { src: '/projects/interior-repaint-southbridge/ba-01-before.webp', thumb: '/projects/interior-repaint-southbridge/ba-01-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/interior-repaint-southbridge/ba-01-after.webp', thumb: '/projects/interior-repaint-southbridge/ba-01-after-thumb.webp', w: 1600, h: 2133 },
        caption: "Bedroom: beige walls repainted in a clean gray.",
      },
      {
        before: { src: '/projects/interior-repaint-southbridge/ba-02-before.webp', thumb: '/projects/interior-repaint-southbridge/ba-02-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/interior-repaint-southbridge/ba-02-after.webp', thumb: '/projects/interior-repaint-southbridge/ba-02-after-thumb.webp', w: 1600, h: 2133 },
        caption: "Bedroom repainted while the family lived in the home.",
      },
      {
        before: { src: '/projects/interior-repaint-southbridge/ba-03-before.webp', thumb: '/projects/interior-repaint-southbridge/ba-03-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/interior-repaint-southbridge/ba-03-after.webp', thumb: '/projects/interior-repaint-southbridge/ba-03-after-thumb.webp', w: 1600, h: 2133 },
        caption: "Hallway walls and trim refreshed.",
      },
      {
        before: { src: '/projects/interior-repaint-southbridge/ba-04-before.webp', thumb: '/projects/interior-repaint-southbridge/ba-04-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/interior-repaint-southbridge/ba-04-after.webp', thumb: '/projects/interior-repaint-southbridge/ba-04-after-thumb.webp', w: 1600, h: 2133 },
        caption: "Bathroom walls repainted.",
      },
      {
        before: { src: '/projects/interior-repaint-southbridge/ba-05-before.webp', thumb: '/projects/interior-repaint-southbridge/ba-05-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/interior-repaint-southbridge/ba-05-after.webp', thumb: '/projects/interior-repaint-southbridge/ba-05-after-thumb.webp', w: 1600, h: 2133 },
        beforeLabel: 'Prep',
        caption: "Bathroom vanity sanded and prepped, then painted white.",
      },
    ],
    photos: [
      { src: '/projects/interior-repaint-southbridge/01.webp', thumb: '/projects/interior-repaint-southbridge/01-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-southbridge/02.webp', thumb: '/projects/interior-repaint-southbridge/02-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-southbridge/03.webp', thumb: '/projects/interior-repaint-southbridge/03-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-southbridge/04.webp', thumb: '/projects/interior-repaint-southbridge/04-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-southbridge/05.webp', thumb: '/projects/interior-repaint-southbridge/05-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-southbridge/06.webp', thumb: '/projects/interior-repaint-southbridge/06-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-southbridge/07.webp', thumb: '/projects/interior-repaint-southbridge/07-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-repaint-southbridge/08.webp', thumb: '/projects/interior-repaint-southbridge/08-thumb.webp', w: 1600, h: 2133 },
    ],
  },
  {
    slug: 'roto-rooter-marlborough-cafeteria',
    title: 'Cafeteria',
    client: 'Roto-Rooter',
    city: 'Marlborough',
    citySlug: 'marlborough',
    state: 'MA',
    service: 'commercial-painting',
    serviceLabel: 'Commercial Interior Painting',
    space: 'Employee cafeteria',
    completed: '2025-10',
    cover: { src: '/projects/roto-rooter-marlborough-cafeteria/cover.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/cover-thumb.webp', w: 1600, h: 2133 },
    pairs: [
      {
        before: { src: '/projects/roto-rooter-marlborough-cafeteria/ba-01-before.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/ba-01-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/roto-rooter-marlborough-cafeteria/ba-01-after.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/ba-01-after-thumb.webp', w: 1600, h: 2133 },
        caption: "Cream walls repainted in a crisp blue.",
      },
      {
        before: { src: '/projects/roto-rooter-marlborough-cafeteria/ba-02-before.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/ba-02-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/roto-rooter-marlborough-cafeteria/ba-02-after.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/ba-02-after-thumb.webp', w: 1600, h: 2133 },
        caption: "The full length of the cafeteria, before and after.",
      },
      {
        before: { src: '/projects/roto-rooter-marlborough-cafeteria/ba-03-before.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/ba-03-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/roto-rooter-marlborough-cafeteria/ba-03-after.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/ba-03-after-thumb.webp', w: 1600, h: 2133 },
        caption: "The entry wall, repainted to carry the company's lettering.",
      },
    ],
    photos: [
      { src: '/projects/roto-rooter-marlborough-cafeteria/01.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/01-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-cafeteria/02.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/02-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-cafeteria/03.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/03-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-cafeteria/04.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/04-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-cafeteria/05.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/05-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-cafeteria/06.webp', thumb: '/projects/roto-rooter-marlborough-cafeteria/06-thumb.webp', w: 1600, h: 2133 },
    ],
  },
  {
    slug: 'roto-rooter-marlborough-training-room',
    title: 'Training Room',
    client: 'Roto-Rooter',
    city: 'Marlborough',
    citySlug: 'marlborough',
    state: 'MA',
    service: 'commercial-painting',
    serviceLabel: 'Commercial Interior Painting',
    space: 'Training room',
    completed: '2025-10',
    photos: [
      { src: '/projects/roto-rooter-marlborough-training-room/01.webp', thumb: '/projects/roto-rooter-marlborough-training-room/01-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-training-room/02.webp', thumb: '/projects/roto-rooter-marlborough-training-room/02-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-training-room/03.webp', thumb: '/projects/roto-rooter-marlborough-training-room/03-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-training-room/04.webp', thumb: '/projects/roto-rooter-marlborough-training-room/04-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-training-room/05.webp', thumb: '/projects/roto-rooter-marlborough-training-room/05-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-training-room/06.webp', thumb: '/projects/roto-rooter-marlborough-training-room/06-thumb.webp', w: 1600, h: 2133 },
    ],
  },
  {
    slug: 'roto-rooter-marlborough-office',
    title: 'Offices',
    client: 'Roto-Rooter',
    city: 'Marlborough',
    citySlug: 'marlborough',
    state: 'MA',
    service: 'commercial-painting',
    serviceLabel: 'Commercial Interior Painting',
    space: 'Office floor',
    completed: '2025-10',
    cover: { src: '/projects/roto-rooter-marlborough-office/cover.webp', thumb: '/projects/roto-rooter-marlborough-office/cover-thumb.webp', w: 1600, h: 2133 },
    pairs: [
      {
        before: { src: '/projects/roto-rooter-marlborough-office/ba-01-before.webp', thumb: '/projects/roto-rooter-marlborough-office/ba-01-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/roto-rooter-marlborough-office/ba-01-after.webp', thumb: '/projects/roto-rooter-marlborough-office/ba-01-after-thumb.webp', w: 1600, h: 2133 },
        caption: "Office walls repainted in a warm gold-beige.",
      },
      {
        before: { src: '/projects/roto-rooter-marlborough-office/ba-02-before.webp', thumb: '/projects/roto-rooter-marlborough-office/ba-02-before-thumb.webp', w: 1600, h: 2133 },
        after: { src: '/projects/roto-rooter-marlborough-office/ba-02-after.webp', thumb: '/projects/roto-rooter-marlborough-office/ba-02-after-thumb.webp', w: 1600, h: 2133 },
        caption: "The seating area wall, before and after.",
      },
    ],
    photos: [
      { src: '/projects/roto-rooter-marlborough-office/01.webp', thumb: '/projects/roto-rooter-marlborough-office/01-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-office/02.webp', thumb: '/projects/roto-rooter-marlborough-office/02-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-office/03.webp', thumb: '/projects/roto-rooter-marlborough-office/03-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-office/04.webp', thumb: '/projects/roto-rooter-marlborough-office/04-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-office/05.webp', thumb: '/projects/roto-rooter-marlborough-office/05-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/roto-rooter-marlborough-office/06.webp', thumb: '/projects/roto-rooter-marlborough-office/06-thumb.webp', w: 1600, h: 2133 },
    ],
  },
  {
    slug: 'waltham-church-exterior',
    title: 'Church Exterior Restoration',
    city: 'Waltham',
    citySlug: 'waltham',
    state: 'MA',
    service: 'exterior-painting',
    serviceLabel: 'Exterior Painting',
    space: 'Church building',
    completed: '2025-09',
    photos: [
      { src: '/projects/waltham-church-exterior/01.webp', thumb: '/projects/waltham-church-exterior/01-thumb.webp', w: 1536, h: 2048 },
      { src: '/projects/waltham-church-exterior/02.webp', thumb: '/projects/waltham-church-exterior/02-thumb.webp', w: 1536, h: 2048 },
      { src: '/projects/waltham-church-exterior/03.webp', thumb: '/projects/waltham-church-exterior/03-thumb.webp', w: 1536, h: 2048 },
      { src: '/projects/waltham-church-exterior/04.webp', thumb: '/projects/waltham-church-exterior/04-thumb.webp', w: 1536, h: 2048 },
      { src: '/projects/waltham-church-exterior/05.webp', thumb: '/projects/waltham-church-exterior/05-thumb.webp', w: 1536, h: 2048 },
      { src: '/projects/waltham-church-exterior/06.webp', thumb: '/projects/waltham-church-exterior/06-thumb.webp', w: 1536, h: 2048 },
      { src: '/projects/waltham-church-exterior/07.webp', thumb: '/projects/waltham-church-exterior/07-thumb.webp', w: 1536, h: 2048 },
      { src: '/projects/waltham-church-exterior/08.webp', thumb: '/projects/waltham-church-exterior/08-thumb.webp', w: 1536, h: 2048 },
    ],
  },
  {
    slug: 'interior-painting-shrewsbury',
    title: 'Whole-Home Interior Repaint',
    city: 'Shrewsbury',
    citySlug: 'shrewsbury',
    state: 'MA',
    service: 'interior-painting',
    serviceLabel: 'Interior Painting',
    completed: '2025-04',
    photos: [
      { src: '/projects/interior-painting-shrewsbury/01.webp', thumb: '/projects/interior-painting-shrewsbury/01-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-painting-shrewsbury/02.webp', thumb: '/projects/interior-painting-shrewsbury/02-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-painting-shrewsbury/03.webp', thumb: '/projects/interior-painting-shrewsbury/03-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-painting-shrewsbury/04.webp', thumb: '/projects/interior-painting-shrewsbury/04-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-painting-shrewsbury/05.webp', thumb: '/projects/interior-painting-shrewsbury/05-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-painting-shrewsbury/06.webp', thumb: '/projects/interior-painting-shrewsbury/06-thumb.webp', w: 1600, h: 2133 },
    ],
  },
  {
    slug: 'interior-painting-concord',
    title: 'Interior Repaint',
    city: 'Concord',
    citySlug: 'concord',
    state: 'MA',
    service: 'interior-painting',
    serviceLabel: 'Interior Painting',
    completed: '2024-11',
    photos: [
      { src: '/projects/interior-painting-concord/01.webp', thumb: '/projects/interior-painting-concord/01-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-painting-concord/02.webp', thumb: '/projects/interior-painting-concord/02-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-painting-concord/03.webp', thumb: '/projects/interior-painting-concord/03-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-painting-concord/04.webp', thumb: '/projects/interior-painting-concord/04-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-painting-concord/05.webp', thumb: '/projects/interior-painting-concord/05-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-painting-concord/06.webp', thumb: '/projects/interior-painting-concord/06-thumb.webp', w: 1600, h: 2133 },
    ],
  },
  {
    slug: 'interior-room-painting-boston',
    title: 'Room-by-Room Interior',
    city: 'Boston',
    citySlug: 'boston',
    state: 'MA',
    service: 'interior-painting',
    serviceLabel: 'Interior Painting',
    completed: '2024-05',
    photos: [
      { src: '/projects/interior-room-painting-boston/01.webp', thumb: '/projects/interior-room-painting-boston/01-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-room-painting-boston/02.webp', thumb: '/projects/interior-room-painting-boston/02-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-room-painting-boston/03.webp', thumb: '/projects/interior-room-painting-boston/03-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-room-painting-boston/04.webp', thumb: '/projects/interior-room-painting-boston/04-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-room-painting-boston/05.webp', thumb: '/projects/interior-room-painting-boston/05-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/interior-room-painting-boston/06.webp', thumb: '/projects/interior-room-painting-boston/06-thumb.webp', w: 1600, h: 2133 },
    ],
  },
  {
    slug: 'interior-painting-hudson',
    title: 'Interior Repaint',
    city: 'Hudson',
    citySlug: 'hudson',
    state: 'MA',
    service: 'interior-painting',
    serviceLabel: 'Interior Painting',
    completed: '2024-10',
    photos: [
      { src: '/projects/interior-painting-hudson/01.webp', thumb: '/projects/interior-painting-hudson/01-thumb.webp', w: 1600, h: 1200 },
      { src: '/projects/interior-painting-hudson/02.webp', thumb: '/projects/interior-painting-hudson/02-thumb.webp', w: 1600, h: 1200 },
      { src: '/projects/interior-painting-hudson/03.webp', thumb: '/projects/interior-painting-hudson/03-thumb.webp', w: 1600, h: 1200 },
    ],
  },
  {
    slug: 'painting-newton',
    title: 'Residential Painting',
    city: 'Newton',
    citySlug: 'newton',
    state: 'MA',
    service: 'residential-painting',
    serviceLabel: 'Residential Painting',
    completed: '2024-10',
    photos: [
      { src: '/projects/painting-newton/01.webp', thumb: '/projects/painting-newton/01-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/painting-newton/02.webp', thumb: '/projects/painting-newton/02-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/painting-newton/03.webp', thumb: '/projects/painting-newton/03-thumb.webp', w: 1600, h: 2133 },
    ],
  },
  {
    slug: 'bathroom-painting',
    title: 'Bathroom Repaint',
    city: 'Concord',
    citySlug: 'concord',
    state: 'MA',
    service: 'interior-painting',
    serviceLabel: 'Interior Painting',
    space: 'Bathroom',
    completed: '2026-03',
    photos: [
      { src: '/projects/bathroom-painting/01.webp', thumb: '/projects/bathroom-painting/01-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/bathroom-painting/02.webp', thumb: '/projects/bathroom-painting/02-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/bathroom-painting/03.webp', thumb: '/projects/bathroom-painting/03-thumb.webp', w: 1600, h: 2133 },
      { src: '/projects/bathroom-painting/04.webp', thumb: '/projects/bathroom-painting/04-thumb.webp', w: 1600, h: 2133 },
    ],
  },
  {
    slug: 'pressure-washing',
    title: 'Roof & Siding Soft Wash',
    city: null,
    citySlug: null,
    state: 'MA',
    service: 'power-washing',
    serviceLabel: 'Power Washing',
    completed: '2024-03',
    photos: [
      { src: '/projects/pressure-washing/01.webp', thumb: '/projects/pressure-washing/01-thumb.webp', w: 1290, h: 1282 },
      { src: '/projects/pressure-washing/02.webp', thumb: '/projects/pressure-washing/02-thumb.webp', w: 1290, h: 962 },
    ],
  },]

/** Distinct cities we can prove we've worked in, sorted alphabetically. */
export const projectCities = Array.from(
  new Set(projects.map((p) => p.city).filter((c): c is string => Boolean(c)))
).sort()

/** Distinct service slugs represented in the portfolio. */
export const projectServices = Array.from(new Set(projects.map((p) => p.service)))

export function projectsForCity(citySlug: string): Project[] {
  return projects.filter((p) => p.citySlug === citySlug)
}

export function projectsForService(service: string): Project[] {
  return projects.filter((p) => p.service === service)
}

/** The props BeforeAfterSlider takes. The older CDN pairs on the service pages use it too. */
export interface SliderPair {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: 'Before' | 'Prep'
  /** Set for real pairs: where the job was, so the caption can say so and link the town page. */
  city?: string
  citySlug?: string
  caption?: string
}

/**
 * Real pairs from this file, picked by [project slug, pair index], in the shape
 * BeforeAfterSlider takes. Unknown picks are dropped rather than rendered empty.
 */
export function sliderPairs(picks: [string, number][]): SliderPair[] {
  return picks.flatMap(([slug, i]) => {
    const p = projects.find((x) => x.slug === slug)
    const pair = p?.pairs?.[i]
    if (!p || !pair) return []
    const where = p.city ? `${p.city}, ${p.state}` : 'Massachusetts'
    const label = pair.beforeLabel ?? 'Before'
    return [{
      before: pair.before.src,
      after: pair.after.src,
      beforeLabel: label,
      city: p.city ?? undefined,
      citySlug: p.citySlug ?? undefined,
      caption: pair.caption,
      beforeAlt: `${p.serviceLabel} in ${where}, ${label.toLowerCase()}: ${pair.caption}`,
      afterAlt: `${p.serviceLabel} in ${where} by JH Painting Services, after: ${pair.caption}`,
    }]
  })
}

/** One gallery tile. `category` is the town the photo was taken in, never the page's town. */
export interface GalleryShot {
  src: string
  alt: string
  category: string
}

/**
 * Real job photos for a page gallery, each labelled with the town it was taken in.
 *
 * Projects in `preferCity` come first, then the rest, newest first. Photos are
 * taken round-robin (each job's cover, then its next frame...) so one big job
 * does not fill the whole grid. Returns fewer than `count` when the portfolio
 * does not hold that many - callers decide whether that is enough to show.
 *
 * WHY THE TOWN IS ALWAYS THE PHOTO'S OWN: the old galleries appended the
 * visited page's town to every alt text, so the Hudson page described the
 * Waltham church as being in Hudson. A photo from Douglas shown on the Hudson
 * page says Douglas.
 */
export function galleryFor({
  services,
  preferCity,
  count = 6,
}: {
  services?: string[]
  preferCity?: string
  count?: number
}): GalleryShot[] {
  const pool = projects
    .filter((p) => !services || services.includes(p.service))
    .map((p, i) => ({ p, i }))
    .sort((a, b) => {
      const ca = a.p.citySlug === preferCity ? 0 : 1
      const cb = b.p.citySlug === preferCity ? 0 : 1
      if (ca !== cb) return ca - cb
      return (b.p.completed ?? '').localeCompare(a.p.completed ?? '') || a.i - b.i
    })
    .map(({ p }) => p)
  const frames = pool.map((p) => {
    const cover = coverOf(p)
    return [cover, ...p.photos.filter((ph) => ph.src !== cover.src)]
  })
  const out: GalleryShot[] = []
  for (let round = 0; out.length < count && frames.some((f) => f.length > round); round++) {
    pool.forEach((p, k) => {
      const ph = frames[k][round]
      if (!ph || out.length >= count) return
      const where = p.city ? `${p.city}, ${p.state}` : 'Massachusetts'
      out.push({
        src: ph.src,
        alt: `${p.serviceLabel} by JH Painting Services in ${where}${p.space ? ` - ${p.space.toLowerCase()}` : ''}`,
        category: where,
      })
    })
  }
  return out
}

/** The frame that represents a job on cards and in the home gallery. */
export function coverOf(p: Project): ProjectPhoto {
  return p.cover ?? p.photos[0]
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/** "2025-10" -> "October 2025". Kept pure so it renders identically on server and client. */
export function formatCompleted(ym?: string): string | null {
  if (!ym) return null
  const [y, m] = ym.split('-').map(Number)
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  return `${months[(m || 1) - 1]} ${y}`
}

export const totalProjectPhotos = projects.reduce((s, p) => s + p.photos.length, 0)

export const totalBeforeAfterPairs = projects.reduce((s, p) => s + (p.pairs?.length ?? 0), 0)
