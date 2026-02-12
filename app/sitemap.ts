import { MetadataRoute } from 'next'
import { cities, getCitySlugWithState } from './data/cities'
import { blogPosts } from './data/blogPosts'
import { regions } from './data/regions'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jhpaintingservices.com'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
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
      lastModified: currentDate,
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
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/exterior-painting`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/commercial-painting`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/residential-painting`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/cabinet-painting`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/carpentry`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/power-washing`,
      lastModified: currentDate,
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
      url: `${baseUrl}/cities`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
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

  // City pages with state suffix: /cities/marlborough-ma
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/cities/${getCitySlugWithState(city.slug)}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // City + service pages with state suffix: /cities/marlborough-ma/interior-painting
  const cityServicePages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    servicesSlugs.map((service) => ({
      url: `${baseUrl}/cities/${getCitySlugWithState(city.slug)}/${service}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  // Region hub pages: /regions/greater-boston, /regions/metrowest, etc.
  const regionPages: MetadataRoute.Sitemap = regions.map((region) => ({
    url: `${baseUrl}/regions/${region.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Region + service pages: /regions/greater-boston/interior-painting, etc.
  const regionServicePages: MetadataRoute.Sitemap = regions.flatMap((region) =>
    servicesSlugs.map((service) => ({
      url: `${baseUrl}/regions/${region.slug}/${service}`,
      lastModified: currentDate,
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
