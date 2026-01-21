/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force unique build ID to bypass Vercel cache
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  // Experimental optimizations for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Redirect old URLs to /cities/[city]-ma/[service] pattern
  async redirects() {
    return [
      // ============================================
      // OLD SEO URLs -> NEW /cities/[city]-ma PATTERN
      // ============================================
      // City pages: /:city-ma-painters -> /cities/:city-ma
      {
        source: '/:city-ma-painters',
        destination: '/cities/:city-ma',
        permanent: true,
      },
      {
        source: '/:city-ma-painting-contractors',
        destination: '/cities/:city-ma',
        permanent: true,
      },
      // Interior painting
      {
        source: '/:city-ma-interior-house-painters',
        destination: '/cities/:city-ma/interior-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-interior-house-painting',
        destination: '/cities/:city-ma/interior-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-interior-painting-services',
        destination: '/cities/:city-ma/interior-painting',
        permanent: true,
      },
      // Exterior painting
      {
        source: '/:city-ma-exterior-house-painters',
        destination: '/cities/:city-ma/exterior-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-exterior-house-painting',
        destination: '/cities/:city-ma/exterior-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-exterior-painting-services',
        destination: '/cities/:city-ma/exterior-painting',
        permanent: true,
      },
      // Commercial painting
      {
        source: '/:city-ma-commercial-painters',
        destination: '/cities/:city-ma/commercial-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-commercial-painting-contractors',
        destination: '/cities/:city-ma/commercial-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-commercial-painting-services',
        destination: '/cities/:city-ma/commercial-painting',
        permanent: true,
      },
      // Residential painting
      {
        source: '/:city-ma-residential-painters',
        destination: '/cities/:city-ma/residential-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-residential-painting-services',
        destination: '/cities/:city-ma/residential-painting',
        permanent: true,
      },
      // Cabinet painting
      {
        source: '/:city-ma-cabinet-painters',
        destination: '/cities/:city-ma/cabinet-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-cabinet-refinishing-painters',
        destination: '/cities/:city-ma/cabinet-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-cabinet-painting-refinishing',
        destination: '/cities/:city-ma/cabinet-painting',
        permanent: true,
      },
      // Carpentry
      {
        source: '/:city-ma-carpentry-services',
        destination: '/cities/:city-ma/carpentry',
        permanent: true,
      },
      // Power washing
      {
        source: '/:city-ma-power-washing-services',
        destination: '/cities/:city-ma/power-washing',
        permanent: true,
      },
      // ============================================
      // OLD /cities/:city (without -ma) -> NEW /cities/:city-ma
      // ============================================
      // Redirect legacy city URLs without state suffix to new URLs with state suffix
      // This handles old bookmarks and links like /cities/acton -> /cities/acton-ma
      // Note: This pattern matches city names that don't already end with -ma or -ri
      {
        source: '/cities/:city((?!.*-ma$)(?!.*-ri$)[a-z-]+)',
        has: [
          {
            type: 'header',
            key: 'x-redirect-check',
            value: '(?!skip)',
          },
        ],
        destination: '/cities/:city-ma',
        permanent: true,
      },
      // Legacy city+service URLs: /cities/acton/interior-painting -> /cities/acton-ma/interior-painting
      {
        source: '/cities/:city((?!.*-ma$)(?!.*-ri$)[a-z-]+)/:service',
        has: [
          {
            type: 'header',
            key: 'x-redirect-check',
            value: '(?!skip)',
          },
        ],
        destination: '/cities/:city-ma/:service',
        permanent: true,
      },
      // ============================================
      // OLD jh-painting-services URLs
      // ============================================
      {
        source: '/jh-painting-services-:city-ma',
        destination: '/cities/:city-ma',
        permanent: true,
      },
      // ============================================
      // LEGACY SERVICE PAGE URLs -> SERVICES
      // ============================================
      {
        source: '/service/:path*',
        destination: '/',
        permanent: true,
      },
      // ============================================
      // FREE QUOTE -> CONTACT
      // ============================================
      {
        source: '/free-quote',
        destination: '/contact',
        permanent: true,
      },
      // ============================================
      // LEGACY PAGES THAT NO LONGER EXIST
      // ============================================
      {
        source: '/realizations',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/realizations/',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/interior-painting',
        destination: '/services/interior-painting',
        permanent: true,
      },
      {
        source: '/interior-painting/',
        destination: '/services/interior-painting',
        permanent: true,
      },
      {
        source: '/exterior-painting',
        destination: '/services/exterior-painting',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about-us/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact/',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      // ============================================
      // OLD MARKETING URLs
      // ============================================
      {
        source: '/interior-painting-massachusetts',
        destination: '/services/interior-painting',
        permanent: true,
      },
      {
        source: '/exterior-painting-massachusetts',
        destination: '/services/exterior-painting',
        permanent: true,
      },
      {
        source: '/house-painting-massachusetts',
        destination: '/services/residential-painting',
        permanent: true,
      },
      {
        source: '/massachusetts-painting-services',
        destination: '/',
        permanent: true,
      },
      // ============================================
      // OLD CITY-SPECIFIC LANDING PAGES
      // ============================================
      {
        source: '/acton-ma',
        destination: '/cities/acton-ma',
        permanent: true,
      },
      // ============================================
      // TMP/WORKSPACE PATHS (Invalid crawled URLs)
      // ============================================
      {
        source: '/tmp/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.leadconnectorhq.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.cdn.filesafe.space',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // HTTP Headers for caching and performance
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
