import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          // Block spam URL patterns
          '/*?*xmcn*',
          '/*?*nco*',
          '/*?chiba*',
          '/*?s={search_term_string}',
          '/*?40001*',
          '/*?339*',
          // Block old URL patterns that should use redirects
          '/jh-painting-services-*',
          // Block tag query params (should go to /blog directly)
          '/blog?tag=*',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
    ],
    sitemap: 'https://jhpaintingservices.com/sitemap.xml',
    host: 'https://jhpaintingservices.com',
  }
}
