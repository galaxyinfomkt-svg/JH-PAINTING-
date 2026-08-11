import { MetadataRoute } from 'next'

/**
 * robots.txt
 *
 * ONE group only, on purpose.
 *
 * The previous version declared `User-agent: *` with a Disallow list and then
 * 26 named groups (Googlebot, bingbot, GPTBot, PerplexityBot, ClaudeBot, ...)
 * each carrying only `Allow: /`. Per the robots.txt spec a crawler obeys the
 * single most-specific group matching its token and IGNORES every other group
 * - including `*`. So Googlebot read `User-agent: Googlebot / Allow: /` and no
 * Disallow applied to it at all: the entire list was dead for every crawler
 * that actually matters, and only anonymous bots were restricted.
 *
 * A bare `*: Allow: /` already permits every crawler, AI crawlers included.
 * Named allow-groups add nothing and silently disable the real rules.
 *
 * /cities/ is deliberately NOT disallowed: those URLs 301-redirect to
 * /massachusetts/* in middleware.ts, and a blocked URL is never fetched, so the
 * redirect is never seen and the link equity never consolidates. Blocking a
 * redirect always defeats its purpose.
 *
 * /_next/ is also NOT disallowed: Google needs those assets to render pages.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // API routes return JSON and have no business in the index.
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://jhpaintingservices.com/sitemap.xml',
    host: 'https://jhpaintingservices.com',
  }
}
