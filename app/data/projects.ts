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
  photos: ProjectPhoto[]
}

export const projects: Project[] = [
  {
    slug: 'interior-repaint-groton',
    title: 'Whole-Home Interior Repaint',
    city: 'Groton',
    citySlug: 'groton',
    state: 'MA',
    service: 'interior-painting',
    serviceLabel: 'Interior Painting',
    space: 'Hallway, landing and bedrooms',
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
