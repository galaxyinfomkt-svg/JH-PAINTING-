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
      // AI Search & Training Crawlers
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
      {
        userAgent: 'meta-externalagent',
        allow: '/',
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      {
        userAgent: 'YouBot',
        allow: '/',
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      // Gemini / Google AI
      {
        userAgent: 'Google-InspectionTool',
        allow: '/',
      },
      {
        userAgent: 'GoogleOther',
        allow: '/',
      },
      // Microsoft / Copilot
      {
        userAgent: 'bingbot',
        allow: '/',
      },
      {
        userAgent: 'MicrosoftPreview',
        allow: '/',
      },
      // Apple Intelligence
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      // Brave Search
      {
        userAgent: 'Brave',
        allow: '/',
      },
      // DuckDuckGo
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
      },
      // Yandex AI
      {
        userAgent: 'YandexBot',
        allow: '/',
      },
      // Meta AI
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      // Mistral AI
      {
        userAgent: 'MistralBot',
        allow: '/',
      },
      // DeepSeek
      {
        userAgent: 'DeepSeekBot',
        allow: '/',
      },
    ],
    sitemap: 'https://jhpaintingservices.com/sitemap.xml',
    host: 'https://jhpaintingservices.com',
  }
}
