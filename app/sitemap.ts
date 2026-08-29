import { MetadataRoute } from 'next'
import { cities, normalizeCitySlug } from './data/cities'
import { blogPosts } from './data/blogPosts'
import { regions } from './data/regions'
import { shouldIndexCityService } from './data/indexing'

/**
 * lastmod, per section rather than one frozen date for the whole site.
 *
 * WHY THIS CHANGED
 * A single BUILD_DATE was pinned at 2026-05-22 while the content underneath it
 * was replaced repeatedly through August: the city copy engine on the 11th, the
 * projects gallery on the 12th, the capacity notice on the 19th, /about on the
 * 29th. So 1,001 URLs were telling Google "nothing here has changed since
 * May" while the pages were in fact rewritten. Google uses lastmod to decide
 * what deserves a recrawl, and a stale date is an instruction not to come back.
 * /massachusetts/waltham was last crawled on 2026-05-28, six days after that
 * frozen date, and never since.
 *
 * The original comment was right that `new Date()` on every deploy is an
 * anti-pattern: Google discounts a sitemap that claims daily change with no
 * change behind it. The fix is not a live date, it is an HONEST date per
 * section.
 *
 * HOW TO MAINTAIN
 * When you change the content that feeds a section, bump that section's date
 * and leave the others alone. Do not bump everything on every deploy, and do
 * not wire this to the build clock. A date that is wrong in the other
 * direction is just as damaging.
 */
const MODIFIED = {
  /** Home, /about, /contact, /projects, /massachusetts hub. */
  core: '2026-08-29T00:00:00.000Z',
  /** The seven /services/* pages. Last touched by the capacity notice. */
  services: '2026-08-19T00:00:00.000Z',
  /** /projects and the photographs behind it. */
  projects: '2026-08-29T00:00:00.000Z',
  /** City and city+service pages. Southbridge added with its job photos on the 29th. */
  cities: '2026-08-29T00:00:00.000Z',
  /** Region hubs and region+service pages, same engine swap. */
  regions: '2026-08-11T00:00:00.000Z',
} as const

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jhpaintingservices.com'
  const currentDate = MODIFIED.core

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: MODIFIED.projects,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/interior-painting`,
      lastModified: MODIFIED.services,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/exterior-painting`,
      lastModified: MODIFIED.services,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/commercial-painting`,
      lastModified: MODIFIED.services,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/residential-painting`,
      lastModified: MODIFIED.services,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/cabinet-painting`,
      lastModified: MODIFIED.services,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/carpentry`,
      lastModified: MODIFIED.services,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/power-washing`,
      lastModified: MODIFIED.services,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vsl`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/massachusetts`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Services list for city+service pages
  const servicesSlugs = [
    'interior-painting',
    'exterior-painting',
    'commercial-painting',
    'residential-painting',
    'cabinet-painting',
    'carpentry',
    'power-washing',
  ]

  // City pages: /massachusetts/marlborough
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/massachusetts/${normalizeCitySlug(city.slug)}`,
    lastModified: MODIFIED.cities,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // City + service pages: /massachusetts/marlborough/interior-painting
  // Only the indexable (high-demand) combos go in the sitemap - the long-tail
  // combos are noindex,follow (see app/data/indexing.ts) and must NOT be listed
  // here (a sitemap should only contain indexable URLs).
  // Exterior painting pages get higher priority (better leads).
  const cityServicePages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    servicesSlugs
      .filter((service) => shouldIndexCityService(city, service))
      .map((service) => ({
        url: `${baseUrl}/massachusetts/${normalizeCitySlug(city.slug)}/${service}`,
        lastModified: MODIFIED.cities,
        changeFrequency: service === 'exterior-painting' ? 'weekly' as const : 'monthly' as const,
        priority: service === 'exterior-painting' ? 0.85 : 0.7,
      }))
  )

  // Region hub pages: /regions/greater-boston, /regions/metrowest, etc.
  const regionPages: MetadataRoute.Sitemap = regions.map((region) => ({
    url: `${baseUrl}/regions/${region.slug}`,
    lastModified: MODIFIED.regions,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Region + service pages: /regions/greater-boston/interior-painting, etc.
  const regionServicePages: MetadataRoute.Sitemap = regions.flatMap((region) =>
    servicesSlugs.map((service) => ({
      url: `${baseUrl}/regions/${region.slug}/${service}`,
      lastModified: MODIFIED.regions,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  )

  return [
    ...staticPages,
    ...blogPages,
    ...regionPages,
    ...regionServicePages,
    ...cityPages,
    ...cityServicePages,
  ]
}
