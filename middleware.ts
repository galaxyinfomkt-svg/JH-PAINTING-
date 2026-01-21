import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const pathname = url.pathname
  const searchParams = url.searchParams.toString()

  // Block spam URLs with suspicious query strings
  // These are typically from bots/attackers probing the site
  const spamPatterns = [
    /^\?[0-9]+\/[0-9]+\.html$/,           // ?40001/27139590.html
    /^\?[0-9]+xmcn[0-9]+nco[0-9]+\.html$/, // ?2817xmcn10071nco37982.html
    /^\?chiba/,                            // ?chiba/
    /^\?s=\{search_term_string\}/,         // ?s={search_term_string}
    /^\?[0-9]+$/,                          // ?339
  ]

  // Check if the URL has suspicious query strings
  if (searchParams) {
    const fullQuery = `?${searchParams}`
    for (const pattern of spamPatterns) {
      if (pattern.test(fullQuery)) {
        // Return 410 Gone for spam URLs - tells search engines to remove from index
        return new NextResponse(null, { status: 410 })
      }
    }
  }

  // Redirect blog tag URLs to main blog page
  // /blog?tag=cabinet%20painting -> /blog
  if (pathname === '/blog' && searchParams.includes('tag=')) {
    return NextResponse.redirect(new URL('/blog', request.url), 301)
  }

  // Redirect old city+service painter URLs to new structure
  // /wellesley-ma-interior-house-painting -> /cities/wellesley-ma/interior-painting
  const oldPaintingPatterns = [
    { pattern: /^\/([a-z-]+)-ma-interior-house-painting$/, redirect: '/cities/$1-ma/interior-painting' },
    { pattern: /^\/([a-z-]+)-ma-exterior-house-painting$/, redirect: '/cities/$1-ma/exterior-painting' },
  ]

  for (const { pattern, redirect } of oldPaintingPatterns) {
    const match = pathname.match(pattern)
    if (match) {
      const newPath = redirect.replace('$1', match[1])
      return NextResponse.redirect(new URL(newPath, request.url), 301)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt
     * - sitemap.xml
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
