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
      // EXPLICIT CITY REDIRECTS (without -ma suffix)
      // These handle specific crawled URLs that return 404
      // ============================================
      // Stow
      { source: '/cities/stow/interior-painting', destination: '/cities/stow-ma/interior-painting', permanent: true },
      { source: '/cities/stow/exterior-painting', destination: '/cities/stow-ma/exterior-painting', permanent: true },
      { source: '/cities/stow/commercial-painting', destination: '/cities/stow-ma/commercial-painting', permanent: true },
      { source: '/cities/stow/residential-painting', destination: '/cities/stow-ma/residential-painting', permanent: true },
      { source: '/cities/stow/cabinet-painting', destination: '/cities/stow-ma/cabinet-painting', permanent: true },
      { source: '/cities/stow/carpentry', destination: '/cities/stow-ma/carpentry', permanent: true },
      { source: '/cities/stow/power-washing', destination: '/cities/stow-ma/power-washing', permanent: true },
      // Hudson
      { source: '/cities/hudson/interior-painting', destination: '/cities/hudson-ma/interior-painting', permanent: true },
      { source: '/cities/hudson/exterior-painting', destination: '/cities/hudson-ma/exterior-painting', permanent: true },
      { source: '/cities/hudson/commercial-painting', destination: '/cities/hudson-ma/commercial-painting', permanent: true },
      { source: '/cities/hudson/residential-painting', destination: '/cities/hudson-ma/residential-painting', permanent: true },
      { source: '/cities/hudson/cabinet-painting', destination: '/cities/hudson-ma/cabinet-painting', permanent: true },
      // Sunderland
      { source: '/cities/sunderland/interior-painting', destination: '/cities/sunderland-ma/interior-painting', permanent: true },
      { source: '/cities/sunderland/exterior-painting', destination: '/cities/sunderland-ma/exterior-painting', permanent: true },
      { source: '/cities/sunderland/commercial-painting', destination: '/cities/sunderland-ma/commercial-painting', permanent: true },
      { source: '/cities/sunderland/residential-painting', destination: '/cities/sunderland-ma/residential-painting', permanent: true },
      { source: '/cities/sunderland/cabinet-painting', destination: '/cities/sunderland-ma/cabinet-painting', permanent: true },
      // Upton
      { source: '/cities/upton/interior-painting', destination: '/cities/upton-ma/interior-painting', permanent: true },
      { source: '/cities/upton/exterior-painting', destination: '/cities/upton-ma/exterior-painting', permanent: true },
      { source: '/cities/upton/commercial-painting', destination: '/cities/upton-ma/commercial-painting', permanent: true },
      { source: '/cities/upton/cabinet-painting', destination: '/cities/upton-ma/cabinet-painting', permanent: true },
      { source: '/cities/upton/carpentry', destination: '/cities/upton-ma/carpentry', permanent: true },
      // Winchester
      { source: '/cities/winchester/interior-painting', destination: '/cities/winchester-ma/interior-painting', permanent: true },
      { source: '/cities/winchester/exterior-painting', destination: '/cities/winchester-ma/exterior-painting', permanent: true },
      // Lunenburg
      { source: '/cities/lunenburg/interior-painting', destination: '/cities/lunenburg-ma/interior-painting', permanent: true },
      { source: '/cities/lunenburg/exterior-painting', destination: '/cities/lunenburg-ma/exterior-painting', permanent: true },
      { source: '/cities/lunenburg/residential-painting', destination: '/cities/lunenburg-ma/residential-painting', permanent: true },
      { source: '/cities/lunenburg', destination: '/cities/lunenburg-ma', permanent: true },
      // Bellingham
      { source: '/cities/bellingham/interior-painting', destination: '/cities/bellingham-ma/interior-painting', permanent: true },
      { source: '/cities/bellingham/exterior-painting', destination: '/cities/bellingham-ma/exterior-painting', permanent: true },
      // Medford
      { source: '/cities/medford/interior-painting', destination: '/cities/medford-ma/interior-painting', permanent: true },
      { source: '/cities/medford/exterior-painting', destination: '/cities/medford-ma/exterior-painting', permanent: true },
      { source: '/cities/medford/cabinet-painting', destination: '/cities/medford-ma/cabinet-painting', permanent: true },
      // Uxbridge
      { source: '/cities/uxbridge/interior-painting', destination: '/cities/uxbridge-ma/interior-painting', permanent: true },
      { source: '/cities/uxbridge/commercial-painting', destination: '/cities/uxbridge-ma/commercial-painting', permanent: true },
      // West Boylston
      { source: '/cities/west-boylston/interior-painting', destination: '/cities/west-boylston-ma/interior-painting', permanent: true },
      { source: '/cities/west-boylston/exterior-painting', destination: '/cities/west-boylston-ma/exterior-painting', permanent: true },
      { source: '/cities/west-boylston/cabinet-painting', destination: '/cities/west-boylston-ma/cabinet-painting', permanent: true },
      // Lowell
      { source: '/cities/lowell/interior-painting', destination: '/cities/lowell-ma/interior-painting', permanent: true },
      { source: '/cities/lowell/exterior-painting', destination: '/cities/lowell-ma/exterior-painting', permanent: true },
      { source: '/cities/lowell/commercial-painting', destination: '/cities/lowell-ma/commercial-painting', permanent: true },
      { source: '/cities/lowell/cabinet-painting', destination: '/cities/lowell-ma/cabinet-painting', permanent: true },
      { source: '/cities/lowell/residential-painting', destination: '/cities/lowell-ma/residential-painting', permanent: true },
      // Pepperell
      { source: '/cities/pepperell/interior-painting', destination: '/cities/pepperell-ma/interior-painting', permanent: true },
      { source: '/cities/pepperell/exterior-painting', destination: '/cities/pepperell-ma/exterior-painting', permanent: true },
      { source: '/cities/pepperell/cabinet-painting', destination: '/cities/pepperell-ma/cabinet-painting', permanent: true },
      { source: '/cities/pepperell/carpentry', destination: '/cities/pepperell-ma/carpentry', permanent: true },
      { source: '/cities/pepperell/commercial-painting', destination: '/cities/pepperell-ma/commercial-painting', permanent: true },
      { source: '/cities/pepperell/residential-painting', destination: '/cities/pepperell-ma/residential-painting', permanent: true },
      // Hopedale
      { source: '/cities/hopedale/interior-painting', destination: '/cities/hopedale-ma/interior-painting', permanent: true },
      { source: '/cities/hopedale/cabinet-painting', destination: '/cities/hopedale-ma/cabinet-painting', permanent: true },
      { source: '/cities/hopedale/residential-painting', destination: '/cities/hopedale-ma/residential-painting', permanent: true },
      // Framingham
      { source: '/cities/framingham/interior-painting', destination: '/cities/framingham-ma/interior-painting', permanent: true },
      { source: '/cities/framingham/cabinet-painting', destination: '/cities/framingham-ma/cabinet-painting', permanent: true },
      { source: '/cities/framingham/commercial-painting', destination: '/cities/framingham-ma/commercial-painting', permanent: true },
      // Westwood
      { source: '/cities/westwood/exterior-painting', destination: '/cities/westwood-ma/exterior-painting', permanent: true },
      { source: '/cities/westwood/commercial-painting', destination: '/cities/westwood-ma/commercial-painting', permanent: true },
      { source: '/cities/westwood', destination: '/cities/westwood-ma', permanent: true },
      // Fitchburg
      { source: '/cities/fitchburg/interior-painting', destination: '/cities/fitchburg-ma/interior-painting', permanent: true },
      { source: '/cities/fitchburg/exterior-painting', destination: '/cities/fitchburg-ma/exterior-painting', permanent: true },
      { source: '/cities/fitchburg/cabinet-painting', destination: '/cities/fitchburg-ma/cabinet-painting', permanent: true },
      { source: '/cities/fitchburg/residential-painting', destination: '/cities/fitchburg-ma/residential-painting', permanent: true },
      // Waltham
      { source: '/cities/waltham/interior-painting', destination: '/cities/waltham-ma/interior-painting', permanent: true },
      { source: '/cities/waltham/exterior-painting', destination: '/cities/waltham-ma/exterior-painting', permanent: true },
      { source: '/cities/waltham/commercial-painting', destination: '/cities/waltham-ma/commercial-painting', permanent: true },
      { source: '/cities/waltham/residential-painting', destination: '/cities/waltham-ma/residential-painting', permanent: true },
      // Shirley
      { source: '/cities/shirley/interior-painting', destination: '/cities/shirley-ma/interior-painting', permanent: true },
      { source: '/cities/shirley/exterior-painting', destination: '/cities/shirley-ma/exterior-painting', permanent: true },
      { source: '/cities/shirley/cabinet-painting', destination: '/cities/shirley-ma/cabinet-painting', permanent: true },
      { source: '/cities/shirley/commercial-painting', destination: '/cities/shirley-ma/commercial-painting', permanent: true },
      // Tyngsboro
      { source: '/cities/tyngsboro/interior-painting', destination: '/cities/tyngsboro-ma/interior-painting', permanent: true },
      { source: '/cities/tyngsboro/exterior-painting', destination: '/cities/tyngsboro-ma/exterior-painting', permanent: true },
      { source: '/cities/tyngsboro/commercial-painting', destination: '/cities/tyngsboro-ma/commercial-painting', permanent: true },
      { source: '/cities/tyngsboro/cabinet-painting', destination: '/cities/tyngsboro-ma/cabinet-painting', permanent: true },
      // South Lancaster
      { source: '/cities/south-lancaster/interior-painting', destination: '/cities/south-lancaster-ma/interior-painting', permanent: true },
      { source: '/cities/south-lancaster/commercial-painting', destination: '/cities/south-lancaster-ma/commercial-painting', permanent: true },
      // Stoneham
      { source: '/cities/stoneham/interior-painting', destination: '/cities/stoneham-ma/interior-painting', permanent: true },
      { source: '/cities/stoneham/exterior-painting', destination: '/cities/stoneham-ma/exterior-painting', permanent: true },
      { source: '/cities/stoneham/cabinet-painting', destination: '/cities/stoneham-ma/cabinet-painting', permanent: true },
      { source: '/cities/stoneham/commercial-painting', destination: '/cities/stoneham-ma/commercial-painting', permanent: true },
      { source: '/cities/stoneham/residential-painting', destination: '/cities/stoneham-ma/residential-painting', permanent: true },
      // Millis Clicquot
      { source: '/cities/millis-clicquot/interior-painting', destination: '/cities/millis-clicquot-ma/interior-painting', permanent: true },
      { source: '/cities/millis-clicquot/exterior-painting', destination: '/cities/millis-clicquot-ma/exterior-painting', permanent: true },
      { source: '/cities/millis-clicquot/commercial-painting', destination: '/cities/millis-clicquot-ma/commercial-painting', permanent: true },
      // Dedham
      { source: '/cities/dedham/residential-painting', destination: '/cities/dedham-ma/residential-painting', permanent: true },
      { source: '/cities/dedham/cabinet-painting', destination: '/cities/dedham-ma/cabinet-painting', permanent: true },
      { source: '/cities/dedham/commercial-painting', destination: '/cities/dedham-ma/commercial-painting', permanent: true },
      { source: '/cities/dedham/exterior-painting', destination: '/cities/dedham-ma/exterior-painting', permanent: true },
      // Framingham Center
      { source: '/cities/framingham-center/cabinet-painting', destination: '/cities/framingham-center-ma/cabinet-painting', permanent: true },
      { source: '/cities/framingham-center/commercial-painting', destination: '/cities/framingham-center-ma/commercial-painting', permanent: true },
      { source: '/cities/framingham-center/exterior-painting', destination: '/cities/framingham-center-ma/exterior-painting', permanent: true },
      // Northborough
      { source: '/cities/northborough/exterior-painting', destination: '/cities/northborough-ma/exterior-painting', permanent: true },
      { source: '/cities/northborough/residential-painting', destination: '/cities/northborough-ma/residential-painting', permanent: true },
      // Brookline
      { source: '/cities/brookline/residential-painting', destination: '/cities/brookline-ma/residential-painting', permanent: true },
      { source: '/cities/brookline/cabinet-painting', destination: '/cities/brookline-ma/cabinet-painting', permanent: true },
      { source: '/cities/brookline/exterior-painting', destination: '/cities/brookline-ma/exterior-painting', permanent: true },
      // Boston
      { source: '/cities/boston/cabinet-painting', destination: '/cities/boston-ma/cabinet-painting', permanent: true },
      { source: '/cities/boston/exterior-painting', destination: '/cities/boston-ma/exterior-painting', permanent: true },
      { source: '/cities/boston/residential-painting', destination: '/cities/boston-ma/residential-painting', permanent: true },
      { source: '/cities/boston', destination: '/cities/boston-ma', permanent: true },
      // Grafton
      { source: '/cities/grafton/exterior-painting', destination: '/cities/grafton-ma/exterior-painting', permanent: true },
      { source: '/cities/grafton/cabinet-painting', destination: '/cities/grafton-ma/cabinet-painting', permanent: true },
      { source: '/cities/grafton/commercial-painting', destination: '/cities/grafton-ma/commercial-painting', permanent: true },
      // Pinehurst
      { source: '/cities/pinehurst/interior-painting', destination: '/cities/pinehurst-ma/interior-painting', permanent: true },
      { source: '/cities/pinehurst/exterior-painting', destination: '/cities/pinehurst-ma/exterior-painting', permanent: true },
      { source: '/cities/pinehurst/commercial-painting', destination: '/cities/pinehurst-ma/commercial-painting', permanent: true },
      { source: '/cities/pinehurst/cabinet-painting', destination: '/cities/pinehurst-ma/cabinet-painting', permanent: true },
      { source: '/cities/pinehurst/residential-painting', destination: '/cities/pinehurst-ma/residential-painting', permanent: true },
      // Tewksbury
      { source: '/cities/tewksbury/interior-painting', destination: '/cities/tewksbury-ma/interior-painting', permanent: true },
      { source: '/cities/tewksbury/commercial-painting', destination: '/cities/tewksbury-ma/commercial-painting', permanent: true },
      { source: '/cities/tewksbury/cabinet-painting', destination: '/cities/tewksbury-ma/cabinet-painting', permanent: true },
      { source: '/cities/tewksbury/residential-painting', destination: '/cities/tewksbury-ma/residential-painting', permanent: true },
      // Wayland
      { source: '/cities/wayland/interior-painting', destination: '/cities/wayland-ma/interior-painting', permanent: true },
      { source: '/cities/wayland/exterior-painting', destination: '/cities/wayland-ma/exterior-painting', permanent: true },
      { source: '/cities/wayland/commercial-painting', destination: '/cities/wayland-ma/commercial-painting', permanent: true },
      { source: '/cities/wayland', destination: '/cities/wayland-ma', permanent: true },
      // Leicester
      { source: '/cities/leicester/interior-painting', destination: '/cities/leicester-ma/interior-painting', permanent: true },
      { source: '/cities/leicester/exterior-painting', destination: '/cities/leicester-ma/exterior-painting', permanent: true },
      { source: '/cities/leicester/cabinet-painting', destination: '/cities/leicester-ma/cabinet-painting', permanent: true },
      // Watertown
      { source: '/cities/watertown/commercial-painting', destination: '/cities/watertown-ma/commercial-painting', permanent: true },
      { source: '/cities/watertown/cabinet-painting', destination: '/cities/watertown-ma/cabinet-painting', permanent: true },
      { source: '/cities/watertown/exterior-painting', destination: '/cities/watertown-ma/exterior-painting', permanent: true },
      { source: '/cities/watertown/residential-painting', destination: '/cities/watertown-ma/residential-painting', permanent: true },
      // Westford
      { source: '/cities/westford/interior-painting', destination: '/cities/westford-ma/interior-painting', permanent: true },
      { source: '/cities/westford/exterior-painting', destination: '/cities/westford-ma/exterior-painting', permanent: true },
      { source: '/cities/westford/cabinet-painting', destination: '/cities/westford-ma/cabinet-painting', permanent: true },
      { source: '/cities/westford/residential-painting', destination: '/cities/westford-ma/residential-painting', permanent: true },
      { source: '/cities/westford/commercial-painting', destination: '/cities/westford-ma/commercial-painting', permanent: true },
      // Littleton Common
      { source: '/cities/littleton-common/interior-painting', destination: '/cities/littleton-common-ma/interior-painting', permanent: true },
      { source: '/cities/littleton-common/exterior-painting', destination: '/cities/littleton-common-ma/exterior-painting', permanent: true },
      { source: '/cities/littleton-common/residential-painting', destination: '/cities/littleton-common-ma/residential-painting', permanent: true },
      { source: '/cities/littleton-common/carpentry', destination: '/cities/littleton-common-ma/carpentry', permanent: true },
      // Wellesley
      { source: '/cities/wellesley/residential-painting', destination: '/cities/wellesley-ma/residential-painting', permanent: true },
      { source: '/cities/wellesley/cabinet-painting', destination: '/cities/wellesley-ma/cabinet-painting', permanent: true },
      // Dunstable
      { source: '/cities/dunstable/interior-painting', destination: '/cities/dunstable-ma/interior-painting', permanent: true },
      { source: '/cities/dunstable/exterior-painting', destination: '/cities/dunstable-ma/exterior-painting', permanent: true },
      { source: '/cities/dunstable', destination: '/cities/dunstable-ma', permanent: true },
      // Leominster
      { source: '/cities/leominster/interior-painting', destination: '/cities/leominster-ma/interior-painting', permanent: true },
      { source: '/cities/leominster/residential-painting', destination: '/cities/leominster-ma/residential-painting', permanent: true },
      // Mendon
      { source: '/cities/mendon/interior-painting', destination: '/cities/mendon-ma/interior-painting', permanent: true },
      { source: '/cities/mendon/residential-painting', destination: '/cities/mendon-ma/residential-painting', permanent: true },
      // Southborough
      { source: '/cities/southborough/cabinet-painting', destination: '/cities/southborough-ma/cabinet-painting', permanent: true },
      { source: '/cities/southborough/exterior-painting', destination: '/cities/southborough-ma/exterior-painting', permanent: true },
      // Other cities mentioned in error list
      { source: '/cities/belmont', destination: '/cities/belmont-ma', permanent: true },
      { source: '/cities/belmont/interior-painting', destination: '/cities/belmont-ma/interior-painting', permanent: true },
      { source: '/cities/belmont/exterior-painting', destination: '/cities/belmont-ma/exterior-painting', permanent: true },
      { source: '/cities/belmont/cabinet-painting', destination: '/cities/belmont-ma/cabinet-painting', permanent: true },
      { source: '/cities/belmont/commercial-painting', destination: '/cities/belmont-ma/commercial-painting', permanent: true },
      { source: '/cities/belmont/residential-painting', destination: '/cities/belmont-ma/residential-painting', permanent: true },
      { source: '/cities/douglas', destination: '/cities/douglas-ma', permanent: true },
      { source: '/cities/douglas/interior-painting', destination: '/cities/douglas-ma/interior-painting', permanent: true },
      { source: '/cities/douglas/exterior-painting', destination: '/cities/douglas-ma/exterior-painting', permanent: true },
      { source: '/cities/douglas/cabinet-painting', destination: '/cities/douglas-ma/cabinet-painting', permanent: true },
      { source: '/cities/douglas/commercial-painting', destination: '/cities/douglas-ma/commercial-painting', permanent: true },
      { source: '/cities/douglas/residential-painting', destination: '/cities/douglas-ma/residential-painting', permanent: true },
      { source: '/cities/foxborough', destination: '/cities/foxborough-ma', permanent: true },
      { source: '/cities/foxborough/interior-painting', destination: '/cities/foxborough-ma/interior-painting', permanent: true },
      { source: '/cities/foxborough/exterior-painting', destination: '/cities/foxborough-ma/exterior-painting', permanent: true },
      { source: '/cities/foxborough/cabinet-painting', destination: '/cities/foxborough-ma/cabinet-painting', permanent: true },
      { source: '/cities/foxborough/residential-painting', destination: '/cities/foxborough-ma/residential-painting', permanent: true },
      { source: '/cities/milford', destination: '/cities/milford-ma', permanent: true },
      { source: '/cities/milford/interior-painting', destination: '/cities/milford-ma/interior-painting', permanent: true },
      { source: '/cities/milford/exterior-painting', destination: '/cities/milford-ma/exterior-painting', permanent: true },
      { source: '/cities/milford/commercial-painting', destination: '/cities/milford-ma/commercial-painting', permanent: true },
      { source: '/cities/milford/residential-painting', destination: '/cities/milford-ma/residential-painting', permanent: true },
      { source: '/cities/natick', destination: '/cities/natick-ma', permanent: true },
      { source: '/cities/natick/cabinet-painting', destination: '/cities/natick-ma/cabinet-painting', permanent: true },
      { source: '/cities/natick/residential-painting', destination: '/cities/natick-ma/residential-painting', permanent: true },
      { source: '/cities/needham', destination: '/cities/needham-ma', permanent: true },
      { source: '/cities/needham/interior-painting', destination: '/cities/needham-ma/interior-painting', permanent: true },
      { source: '/cities/needham/cabinet-painting', destination: '/cities/needham-ma/cabinet-painting', permanent: true },
      { source: '/cities/new-bedford', destination: '/cities/new-bedford-ma', permanent: true },
      { source: '/cities/new-bedford/interior-painting', destination: '/cities/new-bedford-ma/interior-painting', permanent: true },
      { source: '/cities/new-bedford/commercial-painting', destination: '/cities/new-bedford-ma/commercial-painting', permanent: true },
      { source: '/cities/new-bedford/residential-painting', destination: '/cities/new-bedford-ma/residential-painting', permanent: true },
      { source: '/cities/oxford', destination: '/cities/oxford-ma', permanent: true },
      { source: '/cities/oxford/cabinet-painting', destination: '/cities/oxford-ma/cabinet-painting', permanent: true },
      { source: '/cities/oxford/carpentry', destination: '/cities/oxford-ma/carpentry', permanent: true },
      { source: '/cities/oxford/commercial-painting', destination: '/cities/oxford-ma/commercial-painting', permanent: true },
      { source: '/cities/oxford/residential-painting', destination: '/cities/oxford-ma/residential-painting', permanent: true },
      { source: '/cities/sharon', destination: '/cities/sharon-ma', permanent: true },
      { source: '/cities/sharon/exterior-painting', destination: '/cities/sharon-ma/exterior-painting', permanent: true },
      { source: '/cities/whitinsville', destination: '/cities/whitinsville-ma', permanent: true },
      { source: '/cities/whitinsville/interior-painting', destination: '/cities/whitinsville-ma/interior-painting', permanent: true },
      { source: '/cities/whitinsville/exterior-painting', destination: '/cities/whitinsville-ma/exterior-painting', permanent: true },
      { source: '/cities/whitinsville/commercial-painting', destination: '/cities/whitinsville-ma/commercial-painting', permanent: true },
      { source: '/cities/whitinsville/residential-painting', destination: '/cities/whitinsville-ma/residential-painting', permanent: true },
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
