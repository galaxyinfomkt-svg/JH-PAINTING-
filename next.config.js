/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirect old URLs to new SEO-friendly URLs - OPTIMIZED TO BEAT COMPETITORS
  async redirects() {
    return [
      // ============================================
      // LEGACY: /cities/[city] -> NEW SEO URLs
      // ============================================
      {
        source: '/cities/:city',
        destination: '/:city-ma-painting-contractors',
        permanent: true,
      },
      {
        source: '/cities/:city/interior-painting',
        destination: '/:city-ma-interior-house-painting',
        permanent: true,
      },
      {
        source: '/cities/:city/exterior-painting',
        destination: '/:city-ma-exterior-house-painting',
        permanent: true,
      },
      {
        source: '/cities/:city/commercial-painting',
        destination: '/:city-ma-commercial-painting-contractors',
        permanent: true,
      },
      {
        source: '/cities/:city/residential-painting',
        destination: '/:city-ma-residential-painting-services',
        permanent: true,
      },
      {
        source: '/cities/:city/cabinet-painting',
        destination: '/:city-ma-cabinet-refinishing-painters',
        permanent: true,
      },
      // ============================================
      // FIRST ITERATION URLs -> NEW OPTIMIZED URLs
      // ============================================
      {
        source: '/:city-ma-painters',
        destination: '/:city-ma-painting-contractors',
        permanent: true,
      },
      {
        source: '/:city-ma-interior-painting-services',
        destination: '/:city-ma-interior-house-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-exterior-painting-services',
        destination: '/:city-ma-exterior-house-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-commercial-painting-services',
        destination: '/:city-ma-commercial-painting-contractors',
        permanent: true,
      },
      {
        source: '/:city-ma-cabinet-painting-refinishing',
        destination: '/:city-ma-cabinet-refinishing-painters',
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
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
    ]
  },
}

module.exports = nextConfig
