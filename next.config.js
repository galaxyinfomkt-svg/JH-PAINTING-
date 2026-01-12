/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirect old URLs to new SEO-friendly URLs
  async redirects() {
    return [
      // City page redirects: /cities/[city] -> /[city]-ma-painters
      {
        source: '/cities/:city',
        destination: '/:city-ma-painters',
        permanent: true,
      },
      // City+Service page redirects: /cities/[city]/[service] -> /[city]-ma-[service]-services
      {
        source: '/cities/:city/interior-painting',
        destination: '/:city-ma-interior-painting-services',
        permanent: true,
      },
      {
        source: '/cities/:city/exterior-painting',
        destination: '/:city-ma-exterior-painting-services',
        permanent: true,
      },
      {
        source: '/cities/:city/commercial-painting',
        destination: '/:city-ma-commercial-painting-services',
        permanent: true,
      },
      {
        source: '/cities/:city/residential-painting',
        destination: '/:city-ma-residential-painting-services',
        permanent: true,
      },
      {
        source: '/cities/:city/cabinet-painting',
        destination: '/:city-ma-cabinet-painting-refinishing',
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
}

module.exports = nextConfig
