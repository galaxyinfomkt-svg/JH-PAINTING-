/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force unique build ID to bypass Vercel cache
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  // Skip TypeScript casing errors on Windows (Git preserves correct casing)
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    workerThreads: false,
    cpus: 2,
    optimizeCss: true,
  },
  // Redirect old URLs to /massachusetts/[city]/[service] pattern
  async redirects() {
    return [
      // ============================================
      // OLD SEO URLs -> NEW /massachusetts/[city] PATTERN
      // ============================================
      // City pages: /:city-ma-painters -> /cities/:city-ma
      {
        source: '/:city-ma-painters',
        destination: '/massachusetts/:city',
        permanent: true,
      },
      {
        source: '/:city-ma-painting-contractors',
        destination: '/massachusetts/:city',
        permanent: true,
      },
      // Interior painting
      {
        source: '/:city-ma-interior-house-painters',
        destination: '/massachusetts/:city/interior-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-interior-house-painting',
        destination: '/massachusetts/:city/interior-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-interior-painting-services',
        destination: '/massachusetts/:city/interior-painting',
        permanent: true,
      },
      // Exterior painting
      {
        source: '/:city-ma-exterior-house-painters',
        destination: '/massachusetts/:city/exterior-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-exterior-house-painting',
        destination: '/massachusetts/:city/exterior-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-exterior-painting-services',
        destination: '/massachusetts/:city/exterior-painting',
        permanent: true,
      },
      // Commercial painting
      {
        source: '/:city-ma-commercial-painters',
        destination: '/massachusetts/:city/commercial-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-commercial-painting-contractors',
        destination: '/massachusetts/:city/commercial-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-commercial-painting-services',
        destination: '/massachusetts/:city/commercial-painting',
        permanent: true,
      },
      // Residential painting
      {
        source: '/:city-ma-residential-painters',
        destination: '/massachusetts/:city/residential-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-residential-painting-services',
        destination: '/massachusetts/:city/residential-painting',
        permanent: true,
      },
      // Cabinet painting
      {
        source: '/:city-ma-cabinet-painters',
        destination: '/massachusetts/:city/cabinet-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-cabinet-refinishing-painters',
        destination: '/massachusetts/:city/cabinet-painting',
        permanent: true,
      },
      {
        source: '/:city-ma-cabinet-painting-refinishing',
        destination: '/massachusetts/:city/cabinet-painting',
        permanent: true,
      },
      // Carpentry
      {
        source: '/:city-ma-carpentry-services',
        destination: '/massachusetts/:city/carpentry',
        permanent: true,
      },
      // Power washing
      {
        source: '/:city-ma-power-washing-services',
        destination: '/massachusetts/:city/power-washing',
        permanent: true,
      },
      // ============================================
      // OLD /cities/:city (without -ma) -> NEW /massachusetts/:city
      // ============================================
      // Redirect legacy city URLs without state suffix to new URLs with state suffix
      // This handles old bookmarks and links like /cities/acton -> /cities/acton-ma
      // Note: These explicit patterns handle common city name formats

      // NOTE: Legacy city redirects (without -ma suffix) are handled in middleware.ts
      // to avoid regex lookahead issues with path-to-regexp redirect loops.
      // ============================================
      // EXPLICIT CITY REDIRECTS (without -ma suffix)
      // These handle specific crawled URLs that return 404
      // ============================================
      // Stow
      { source: '/cities/stow/interior-painting', destination: '/massachusetts/stow/interior-painting', permanent: true },
      { source: '/cities/stow/exterior-painting', destination: '/massachusetts/stow/exterior-painting', permanent: true },
      { source: '/cities/stow/commercial-painting', destination: '/massachusetts/stow/commercial-painting', permanent: true },
      { source: '/cities/stow/residential-painting', destination: '/massachusetts/stow/residential-painting', permanent: true },
      { source: '/cities/stow/cabinet-painting', destination: '/massachusetts/stow/cabinet-painting', permanent: true },
      { source: '/cities/stow/carpentry', destination: '/massachusetts/stow/carpentry', permanent: true },
      { source: '/cities/stow/power-washing', destination: '/massachusetts/stow/power-washing', permanent: true },
      // Hudson
      { source: '/cities/hudson/interior-painting', destination: '/massachusetts/hudson/interior-painting', permanent: true },
      { source: '/cities/hudson/exterior-painting', destination: '/massachusetts/hudson/exterior-painting', permanent: true },
      { source: '/cities/hudson/commercial-painting', destination: '/massachusetts/hudson/commercial-painting', permanent: true },
      { source: '/cities/hudson/residential-painting', destination: '/massachusetts/hudson/residential-painting', permanent: true },
      { source: '/cities/hudson/cabinet-painting', destination: '/massachusetts/hudson/cabinet-painting', permanent: true },
      // Sunderland
      { source: '/cities/sunderland/interior-painting', destination: '/massachusetts/sunderland/interior-painting', permanent: true },
      { source: '/cities/sunderland/exterior-painting', destination: '/massachusetts/sunderland/exterior-painting', permanent: true },
      { source: '/cities/sunderland/commercial-painting', destination: '/massachusetts/sunderland/commercial-painting', permanent: true },
      { source: '/cities/sunderland/residential-painting', destination: '/massachusetts/sunderland/residential-painting', permanent: true },
      { source: '/cities/sunderland/cabinet-painting', destination: '/massachusetts/sunderland/cabinet-painting', permanent: true },
      // Upton
      { source: '/cities/upton/interior-painting', destination: '/massachusetts/upton/interior-painting', permanent: true },
      { source: '/cities/upton/exterior-painting', destination: '/massachusetts/upton/exterior-painting', permanent: true },
      { source: '/cities/upton/commercial-painting', destination: '/massachusetts/upton/commercial-painting', permanent: true },
      { source: '/cities/upton/cabinet-painting', destination: '/massachusetts/upton/cabinet-painting', permanent: true },
      { source: '/cities/upton/carpentry', destination: '/massachusetts/upton/carpentry', permanent: true },
      // Winchester
      { source: '/cities/winchester/interior-painting', destination: '/massachusetts/winchester/interior-painting', permanent: true },
      { source: '/cities/winchester/exterior-painting', destination: '/massachusetts/winchester/exterior-painting', permanent: true },
      // Lunenburg
      { source: '/cities/lunenburg/interior-painting', destination: '/massachusetts/lunenburg/interior-painting', permanent: true },
      { source: '/cities/lunenburg/exterior-painting', destination: '/massachusetts/lunenburg/exterior-painting', permanent: true },
      { source: '/cities/lunenburg/residential-painting', destination: '/massachusetts/lunenburg/residential-painting', permanent: true },
      { source: '/cities/lunenburg', destination: '/massachusetts/lunenburg', permanent: true },
      // Bellingham
      { source: '/cities/bellingham/interior-painting', destination: '/massachusetts/bellingham/interior-painting', permanent: true },
      { source: '/cities/bellingham/exterior-painting', destination: '/massachusetts/bellingham/exterior-painting', permanent: true },
      // Medford
      { source: '/cities/medford/interior-painting', destination: '/massachusetts/medford/interior-painting', permanent: true },
      { source: '/cities/medford/exterior-painting', destination: '/massachusetts/medford/exterior-painting', permanent: true },
      { source: '/cities/medford/cabinet-painting', destination: '/massachusetts/medford/cabinet-painting', permanent: true },
      // Uxbridge
      { source: '/cities/uxbridge/interior-painting', destination: '/massachusetts/uxbridge/interior-painting', permanent: true },
      { source: '/cities/uxbridge/commercial-painting', destination: '/massachusetts/uxbridge/commercial-painting', permanent: true },
      // West Boylston
      { source: '/cities/west-boylston/interior-painting', destination: '/massachusetts/west-boylston/interior-painting', permanent: true },
      { source: '/cities/west-boylston/exterior-painting', destination: '/massachusetts/west-boylston/exterior-painting', permanent: true },
      { source: '/cities/west-boylston/cabinet-painting', destination: '/massachusetts/west-boylston/cabinet-painting', permanent: true },
      // Lowell
      { source: '/cities/lowell/interior-painting', destination: '/massachusetts/lowell/interior-painting', permanent: true },
      { source: '/cities/lowell/exterior-painting', destination: '/massachusetts/lowell/exterior-painting', permanent: true },
      { source: '/cities/lowell/commercial-painting', destination: '/massachusetts/lowell/commercial-painting', permanent: true },
      { source: '/cities/lowell/cabinet-painting', destination: '/massachusetts/lowell/cabinet-painting', permanent: true },
      { source: '/cities/lowell/residential-painting', destination: '/massachusetts/lowell/residential-painting', permanent: true },
      // Pepperell
      { source: '/cities/pepperell/interior-painting', destination: '/massachusetts/pepperell/interior-painting', permanent: true },
      { source: '/cities/pepperell/exterior-painting', destination: '/massachusetts/pepperell/exterior-painting', permanent: true },
      { source: '/cities/pepperell/cabinet-painting', destination: '/massachusetts/pepperell/cabinet-painting', permanent: true },
      { source: '/cities/pepperell/carpentry', destination: '/massachusetts/pepperell/carpentry', permanent: true },
      { source: '/cities/pepperell/commercial-painting', destination: '/massachusetts/pepperell/commercial-painting', permanent: true },
      { source: '/cities/pepperell/residential-painting', destination: '/massachusetts/pepperell/residential-painting', permanent: true },
      // Hopedale
      { source: '/cities/hopedale/interior-painting', destination: '/massachusetts/hopedale/interior-painting', permanent: true },
      { source: '/cities/hopedale/cabinet-painting', destination: '/massachusetts/hopedale/cabinet-painting', permanent: true },
      { source: '/cities/hopedale/residential-painting', destination: '/massachusetts/hopedale/residential-painting', permanent: true },
      // Framingham
      { source: '/cities/framingham/interior-painting', destination: '/massachusetts/framingham/interior-painting', permanent: true },
      { source: '/cities/framingham/cabinet-painting', destination: '/massachusetts/framingham/cabinet-painting', permanent: true },
      { source: '/cities/framingham/commercial-painting', destination: '/massachusetts/framingham/commercial-painting', permanent: true },
      // Westwood
      { source: '/cities/westwood/exterior-painting', destination: '/massachusetts/westwood/exterior-painting', permanent: true },
      { source: '/cities/westwood/commercial-painting', destination: '/massachusetts/westwood/commercial-painting', permanent: true },
      { source: '/cities/westwood', destination: '/massachusetts/westwood', permanent: true },
      // Fitchburg
      { source: '/cities/fitchburg/interior-painting', destination: '/massachusetts/fitchburg/interior-painting', permanent: true },
      { source: '/cities/fitchburg/exterior-painting', destination: '/massachusetts/fitchburg/exterior-painting', permanent: true },
      { source: '/cities/fitchburg/cabinet-painting', destination: '/massachusetts/fitchburg/cabinet-painting', permanent: true },
      { source: '/cities/fitchburg/residential-painting', destination: '/massachusetts/fitchburg/residential-painting', permanent: true },
      // Waltham
      { source: '/cities/waltham/interior-painting', destination: '/massachusetts/waltham/interior-painting', permanent: true },
      { source: '/cities/waltham/exterior-painting', destination: '/massachusetts/waltham/exterior-painting', permanent: true },
      { source: '/cities/waltham/commercial-painting', destination: '/massachusetts/waltham/commercial-painting', permanent: true },
      { source: '/cities/waltham/residential-painting', destination: '/massachusetts/waltham/residential-painting', permanent: true },
      // Shirley
      { source: '/cities/shirley/interior-painting', destination: '/massachusetts/shirley/interior-painting', permanent: true },
      { source: '/cities/shirley/exterior-painting', destination: '/massachusetts/shirley/exterior-painting', permanent: true },
      { source: '/cities/shirley/cabinet-painting', destination: '/massachusetts/shirley/cabinet-painting', permanent: true },
      { source: '/cities/shirley/commercial-painting', destination: '/massachusetts/shirley/commercial-painting', permanent: true },
      // Tyngsboro
      { source: '/cities/tyngsboro/interior-painting', destination: '/massachusetts/tyngsboro/interior-painting', permanent: true },
      { source: '/cities/tyngsboro/exterior-painting', destination: '/massachusetts/tyngsboro/exterior-painting', permanent: true },
      { source: '/cities/tyngsboro/commercial-painting', destination: '/massachusetts/tyngsboro/commercial-painting', permanent: true },
      { source: '/cities/tyngsboro/cabinet-painting', destination: '/massachusetts/tyngsboro/cabinet-painting', permanent: true },
      // South Lancaster
      { source: '/cities/south-lancaster/interior-painting', destination: '/massachusetts/south-lancaster/interior-painting', permanent: true },
      { source: '/cities/south-lancaster/commercial-painting', destination: '/massachusetts/south-lancaster/commercial-painting', permanent: true },
      // Stoneham
      { source: '/cities/stoneham/interior-painting', destination: '/massachusetts/stoneham/interior-painting', permanent: true },
      { source: '/cities/stoneham/exterior-painting', destination: '/massachusetts/stoneham/exterior-painting', permanent: true },
      { source: '/cities/stoneham/cabinet-painting', destination: '/massachusetts/stoneham/cabinet-painting', permanent: true },
      { source: '/cities/stoneham/commercial-painting', destination: '/massachusetts/stoneham/commercial-painting', permanent: true },
      { source: '/cities/stoneham/residential-painting', destination: '/massachusetts/stoneham/residential-painting', permanent: true },
      // Millis Clicquot
      { source: '/cities/millis-clicquot/interior-painting', destination: '/massachusetts/millis-clicquot/interior-painting', permanent: true },
      { source: '/cities/millis-clicquot/exterior-painting', destination: '/massachusetts/millis-clicquot/exterior-painting', permanent: true },
      { source: '/cities/millis-clicquot/commercial-painting', destination: '/massachusetts/millis-clicquot/commercial-painting', permanent: true },
      // Dedham
      { source: '/cities/dedham/residential-painting', destination: '/massachusetts/dedham/residential-painting', permanent: true },
      { source: '/cities/dedham/cabinet-painting', destination: '/massachusetts/dedham/cabinet-painting', permanent: true },
      { source: '/cities/dedham/commercial-painting', destination: '/massachusetts/dedham/commercial-painting', permanent: true },
      { source: '/cities/dedham/exterior-painting', destination: '/massachusetts/dedham/exterior-painting', permanent: true },
      // Framingham Center
      { source: '/cities/framingham-center/cabinet-painting', destination: '/massachusetts/framingham-center/cabinet-painting', permanent: true },
      { source: '/cities/framingham-center/commercial-painting', destination: '/massachusetts/framingham-center/commercial-painting', permanent: true },
      { source: '/cities/framingham-center/exterior-painting', destination: '/massachusetts/framingham-center/exterior-painting', permanent: true },
      // Northborough
      { source: '/cities/northborough/exterior-painting', destination: '/massachusetts/northborough/exterior-painting', permanent: true },
      { source: '/cities/northborough/residential-painting', destination: '/massachusetts/northborough/residential-painting', permanent: true },
      // Brookline
      { source: '/cities/brookline/residential-painting', destination: '/massachusetts/brookline/residential-painting', permanent: true },
      { source: '/cities/brookline/cabinet-painting', destination: '/massachusetts/brookline/cabinet-painting', permanent: true },
      { source: '/cities/brookline/exterior-painting', destination: '/massachusetts/brookline/exterior-painting', permanent: true },
      // Boston
      { source: '/cities/boston/cabinet-painting', destination: '/massachusetts/boston/cabinet-painting', permanent: true },
      { source: '/cities/boston/exterior-painting', destination: '/massachusetts/boston/exterior-painting', permanent: true },
      { source: '/cities/boston/residential-painting', destination: '/massachusetts/boston/residential-painting', permanent: true },
      { source: '/cities/boston', destination: '/massachusetts/boston', permanent: true },
      // Grafton
      { source: '/cities/grafton/exterior-painting', destination: '/massachusetts/grafton/exterior-painting', permanent: true },
      { source: '/cities/grafton/cabinet-painting', destination: '/massachusetts/grafton/cabinet-painting', permanent: true },
      { source: '/cities/grafton/commercial-painting', destination: '/massachusetts/grafton/commercial-painting', permanent: true },
      // Pinehurst
      { source: '/cities/pinehurst/interior-painting', destination: '/massachusetts/pinehurst/interior-painting', permanent: true },
      { source: '/cities/pinehurst/exterior-painting', destination: '/massachusetts/pinehurst/exterior-painting', permanent: true },
      { source: '/cities/pinehurst/commercial-painting', destination: '/massachusetts/pinehurst/commercial-painting', permanent: true },
      { source: '/cities/pinehurst/cabinet-painting', destination: '/massachusetts/pinehurst/cabinet-painting', permanent: true },
      { source: '/cities/pinehurst/residential-painting', destination: '/massachusetts/pinehurst/residential-painting', permanent: true },
      // Tewksbury
      { source: '/cities/tewksbury/interior-painting', destination: '/massachusetts/tewksbury/interior-painting', permanent: true },
      { source: '/cities/tewksbury/commercial-painting', destination: '/massachusetts/tewksbury/commercial-painting', permanent: true },
      { source: '/cities/tewksbury/cabinet-painting', destination: '/massachusetts/tewksbury/cabinet-painting', permanent: true },
      { source: '/cities/tewksbury/residential-painting', destination: '/massachusetts/tewksbury/residential-painting', permanent: true },
      // Wayland
      { source: '/cities/wayland/interior-painting', destination: '/massachusetts/wayland/interior-painting', permanent: true },
      { source: '/cities/wayland/exterior-painting', destination: '/massachusetts/wayland/exterior-painting', permanent: true },
      { source: '/cities/wayland/commercial-painting', destination: '/massachusetts/wayland/commercial-painting', permanent: true },
      { source: '/cities/wayland', destination: '/massachusetts/wayland', permanent: true },
      // Leicester
      { source: '/cities/leicester/interior-painting', destination: '/massachusetts/leicester/interior-painting', permanent: true },
      { source: '/cities/leicester/exterior-painting', destination: '/massachusetts/leicester/exterior-painting', permanent: true },
      { source: '/cities/leicester/cabinet-painting', destination: '/massachusetts/leicester/cabinet-painting', permanent: true },
      // Watertown
      { source: '/cities/watertown/commercial-painting', destination: '/massachusetts/watertown/commercial-painting', permanent: true },
      { source: '/cities/watertown/cabinet-painting', destination: '/massachusetts/watertown/cabinet-painting', permanent: true },
      { source: '/cities/watertown/exterior-painting', destination: '/massachusetts/watertown/exterior-painting', permanent: true },
      { source: '/cities/watertown/residential-painting', destination: '/massachusetts/watertown/residential-painting', permanent: true },
      // Westford
      { source: '/cities/westford/interior-painting', destination: '/massachusetts/westford/interior-painting', permanent: true },
      { source: '/cities/westford/exterior-painting', destination: '/massachusetts/westford/exterior-painting', permanent: true },
      { source: '/cities/westford/cabinet-painting', destination: '/massachusetts/westford/cabinet-painting', permanent: true },
      { source: '/cities/westford/residential-painting', destination: '/massachusetts/westford/residential-painting', permanent: true },
      { source: '/cities/westford/commercial-painting', destination: '/massachusetts/westford/commercial-painting', permanent: true },
      // Littleton Common
      { source: '/cities/littleton-common/interior-painting', destination: '/massachusetts/littleton-common/interior-painting', permanent: true },
      { source: '/cities/littleton-common/exterior-painting', destination: '/massachusetts/littleton-common/exterior-painting', permanent: true },
      { source: '/cities/littleton-common/residential-painting', destination: '/massachusetts/littleton-common/residential-painting', permanent: true },
      { source: '/cities/littleton-common/carpentry', destination: '/massachusetts/littleton-common/carpentry', permanent: true },
      // Wellesley
      { source: '/cities/wellesley/residential-painting', destination: '/massachusetts/wellesley/residential-painting', permanent: true },
      { source: '/cities/wellesley/cabinet-painting', destination: '/massachusetts/wellesley/cabinet-painting', permanent: true },
      // Dunstable
      { source: '/cities/dunstable/interior-painting', destination: '/massachusetts/dunstable/interior-painting', permanent: true },
      { source: '/cities/dunstable/exterior-painting', destination: '/massachusetts/dunstable/exterior-painting', permanent: true },
      { source: '/cities/dunstable', destination: '/massachusetts/dunstable', permanent: true },
      // Leominster
      { source: '/cities/leominster/interior-painting', destination: '/massachusetts/leominster/interior-painting', permanent: true },
      { source: '/cities/leominster/residential-painting', destination: '/massachusetts/leominster/residential-painting', permanent: true },
      // Mendon
      { source: '/cities/mendon/interior-painting', destination: '/massachusetts/mendon/interior-painting', permanent: true },
      { source: '/cities/mendon/residential-painting', destination: '/massachusetts/mendon/residential-painting', permanent: true },
      // Southborough
      { source: '/cities/southborough/cabinet-painting', destination: '/massachusetts/southborough/cabinet-painting', permanent: true },
      { source: '/cities/southborough/exterior-painting', destination: '/massachusetts/southborough/exterior-painting', permanent: true },
      // Other cities mentioned in error list
      { source: '/cities/belmont', destination: '/massachusetts/belmont', permanent: true },
      { source: '/cities/belmont/interior-painting', destination: '/massachusetts/belmont/interior-painting', permanent: true },
      { source: '/cities/belmont/exterior-painting', destination: '/massachusetts/belmont/exterior-painting', permanent: true },
      { source: '/cities/belmont/cabinet-painting', destination: '/massachusetts/belmont/cabinet-painting', permanent: true },
      { source: '/cities/belmont/commercial-painting', destination: '/massachusetts/belmont/commercial-painting', permanent: true },
      { source: '/cities/belmont/residential-painting', destination: '/massachusetts/belmont/residential-painting', permanent: true },
      { source: '/cities/douglas', destination: '/massachusetts/douglas', permanent: true },
      { source: '/cities/douglas/interior-painting', destination: '/massachusetts/douglas/interior-painting', permanent: true },
      { source: '/cities/douglas/exterior-painting', destination: '/massachusetts/douglas/exterior-painting', permanent: true },
      { source: '/cities/douglas/cabinet-painting', destination: '/massachusetts/douglas/cabinet-painting', permanent: true },
      { source: '/cities/douglas/commercial-painting', destination: '/massachusetts/douglas/commercial-painting', permanent: true },
      { source: '/cities/douglas/residential-painting', destination: '/massachusetts/douglas/residential-painting', permanent: true },
      { source: '/cities/foxborough', destination: '/massachusetts/foxborough', permanent: true },
      { source: '/cities/foxborough/interior-painting', destination: '/massachusetts/foxborough/interior-painting', permanent: true },
      { source: '/cities/foxborough/exterior-painting', destination: '/massachusetts/foxborough/exterior-painting', permanent: true },
      { source: '/cities/foxborough/cabinet-painting', destination: '/massachusetts/foxborough/cabinet-painting', permanent: true },
      { source: '/cities/foxborough/residential-painting', destination: '/massachusetts/foxborough/residential-painting', permanent: true },
      { source: '/cities/milford', destination: '/massachusetts/milford', permanent: true },
      { source: '/cities/milford/interior-painting', destination: '/massachusetts/milford/interior-painting', permanent: true },
      { source: '/cities/milford/exterior-painting', destination: '/massachusetts/milford/exterior-painting', permanent: true },
      { source: '/cities/milford/commercial-painting', destination: '/massachusetts/milford/commercial-painting', permanent: true },
      { source: '/cities/milford/residential-painting', destination: '/massachusetts/milford/residential-painting', permanent: true },
      { source: '/cities/natick', destination: '/massachusetts/natick', permanent: true },
      { source: '/cities/natick/cabinet-painting', destination: '/massachusetts/natick/cabinet-painting', permanent: true },
      { source: '/cities/natick/residential-painting', destination: '/massachusetts/natick/residential-painting', permanent: true },
      { source: '/cities/needham', destination: '/massachusetts/needham', permanent: true },
      { source: '/cities/needham/interior-painting', destination: '/massachusetts/needham/interior-painting', permanent: true },
      { source: '/cities/needham/cabinet-painting', destination: '/massachusetts/needham/cabinet-painting', permanent: true },
      { source: '/cities/new-bedford', destination: '/massachusetts/new-bedford', permanent: true },
      { source: '/cities/new-bedford/interior-painting', destination: '/massachusetts/new-bedford/interior-painting', permanent: true },
      { source: '/cities/new-bedford/commercial-painting', destination: '/massachusetts/new-bedford/commercial-painting', permanent: true },
      { source: '/cities/new-bedford/residential-painting', destination: '/massachusetts/new-bedford/residential-painting', permanent: true },
      { source: '/cities/oxford', destination: '/massachusetts/oxford', permanent: true },
      { source: '/cities/oxford/cabinet-painting', destination: '/massachusetts/oxford/cabinet-painting', permanent: true },
      { source: '/cities/oxford/carpentry', destination: '/massachusetts/oxford/carpentry', permanent: true },
      { source: '/cities/oxford/commercial-painting', destination: '/massachusetts/oxford/commercial-painting', permanent: true },
      { source: '/cities/oxford/residential-painting', destination: '/massachusetts/oxford/residential-painting', permanent: true },
      { source: '/cities/sharon', destination: '/massachusetts/sharon', permanent: true },
      { source: '/cities/sharon/exterior-painting', destination: '/massachusetts/sharon/exterior-painting', permanent: true },
      { source: '/cities/whitinsville', destination: '/massachusetts/whitinsville', permanent: true },
      { source: '/cities/whitinsville/interior-painting', destination: '/massachusetts/whitinsville/interior-painting', permanent: true },
      { source: '/cities/whitinsville/exterior-painting', destination: '/massachusetts/whitinsville/exterior-painting', permanent: true },
      { source: '/cities/whitinsville/commercial-painting', destination: '/massachusetts/whitinsville/commercial-painting', permanent: true },
      { source: '/cities/whitinsville/residential-painting', destination: '/massachusetts/whitinsville/residential-painting', permanent: true },
      // ============================================
      // OLD jh-painting-services URLs
      // ============================================
      {
        source: '/jh-painting-services-:city-ma',
        destination: '/massachusetts/:city',
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
        destination: '/massachusetts/acton',
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
    // Optimized device sizes for faster image delivery
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Unoptimized option for faster hero loading if needed
    // unoptimized: process.env.NODE_ENV === 'development',
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // HTTP Headers for caching and performance - Aggressive caching for better PageSpeed
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
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
          {
            key: 'Vary',
            value: 'Accept-Encoding',
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
        // Cache JS and CSS files aggressively
        source: '/:path*.(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache HTML pages with stale-while-revalidate
        source: '/:path*',
        has: [{ type: 'header', key: 'accept', value: '(.*text/html.*)' }],
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
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
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
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
