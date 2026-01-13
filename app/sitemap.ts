import { MetadataRoute } from 'next'
import { cities } from './data/cities'
import { blogPosts } from './data/blogPosts'
import { getCityPageSlug, getCityServicePageSlug, servicesSlugs } from '@/lib/seo-urls'

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
  ]

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // SEO-optimized city pages: /marlborough-ma-painting-contractors
  const seoFriendlyCityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/${getCityPageSlug(city.slug)}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // SEO-optimized city + service pages: /marlborough-ma-interior-house-painting
  const seoFriendlyCityServicePages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    servicesSlugs.map((service) => ({
      url: `${baseUrl}/${getCityServicePageSlug(city.slug, service)}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  // Legacy city pages: /cities/marlborough (for backwards compatibility and internal linking)
  const legacyCityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/cities/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  // Legacy city + service pages: /cities/marlborough/interior-painting
  const legacyCityServicePages: MetadataRoute.Sitemap = cities.flatMap((city) =>
    servicesSlugs.map((service) => ({
      url: `${baseUrl}/cities/${city.slug}/${service}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  )

  return [
    ...staticPages,
    ...blogPages,
    ...seoFriendlyCityPages,
    ...seoFriendlyCityServicePages,
    ...legacyCityPages,
    ...legacyCityServicePages,
  ]
}
