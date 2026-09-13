import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const pathname = url.pathname
  const searchParams = url.searchParams.toString()

  /*
   * URLs terminadas em /null -> 410 Gone.
   *
   * Os logs da Vercel mostram ~970 destas POR DIA, 131 caminhos distintos:
   *
   *   /massachusetts/null                 76
   *   /massachusetts/whitinsville/null    17
   *   /massachusetts/sterling/null        14
   *   ...
   *
   * Elas nao existem no HTML servido hoje nem no build de 01/09 - conferi as
   * 1.042 paginas renderizadas dos dois. Sao URLs que algum deploy de agosto
   * emitiu, que os rastreadores enfileiraram e continuam visitando.
   *
   * 410 e nao 404 de proposito, e e a mesma escolha ja feita logo abaixo para
   * as URLs de spam: 404 significa "nao achei agora", e o Google volta para
   * conferir por semanas; 410 significa "nao existe e nao vai voltar", e ele
   * tira da fila muito mais rapido. Num site cujo problema atual e indexacao,
   * orcamento de rastreamento gasto em 970 URLs mortas por dia e orcamento que
   * nao esta sendo gasto nas paginas de cidade que a gente quer indexada.
   *
   * Nenhuma cidade nem servico tem slug "null", entao isto nao pode pegar uma
   * pagina real.
   */
  if (pathname === '/massachusetts/null' || pathname.endsWith('/null')) {
    return new NextResponse(null, { status: 410 })
  }

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

  // Redirect old city+service painter URLs to new /massachusetts/ structure
  // /wellesley-ma-interior-house-painting -> /massachusetts/wellesley/interior-painting
  const oldPaintingPatterns = [
    { pattern: /^\/([a-z-]+)-ma-interior-house-painting$/, redirect: '/massachusetts/$1/interior-painting' },
    { pattern: /^\/([a-z-]+)-ma-exterior-house-painting$/, redirect: '/massachusetts/$1/exterior-painting' },
  ]

  for (const { pattern, redirect } of oldPaintingPatterns) {
    const match = pathname.match(pattern)
    if (match) {
      const newPath = redirect.replace('$1', match[1])
      return NextResponse.redirect(new URL(newPath, request.url), 301)
    }
  }

  // 301 Redirect: /massachusetts/X-ma[/service] → /massachusetts/X[/service]
  // getCityBySlug() strips a trailing "-ma", so these malformed slugs render a
  // 200 DUPLICATE of the canonical clean URL (wasting crawl budget and
  // splitting signals). Redirect them to the one canonical URL. RI slugs
  // (e.g. woonsocket-ri) are intentionally left untouched.
  const maDupMatch = pathname.match(/^\/massachusetts\/([a-z][a-z0-9-]*)-ma(\/(?:interior-painting|exterior-painting|commercial-painting|residential-painting|cabinet-painting|carpentry|power-washing))?$/)
  if (maDupMatch) {
    const clean = `/massachusetts/${maDupMatch[1]}${maDupMatch[2] || ''}`
    return NextResponse.redirect(new URL(clean, request.url), 301)
  }

  // 301 Redirect: /cities/X-ma/service → /massachusetts/X/service
  const cityServiceMatch = pathname.match(/^\/cities\/([a-z][a-z0-9-]+)\/(interior-painting|exterior-painting|commercial-painting|residential-painting|cabinet-painting|carpentry|power-washing)$/)
  if (cityServiceMatch) {
    const citySlug = cityServiceMatch[1]
    const service = cityServiceMatch[2]
    // Strip -ma suffix for the new URL
    const cleanSlug = citySlug.endsWith('-ma') ? citySlug.slice(0, -3) : citySlug
    return NextResponse.redirect(new URL(`/massachusetts/${cleanSlug}/${service}`, request.url), 301)
  }

  // 301 Redirect: /cities/X-ma → /massachusetts/X  (also handles /cities/X without -ma)
  const cityOnlyMatch = pathname.match(/^\/cities\/([a-z][a-z0-9-]+)$/)
  if (cityOnlyMatch) {
    const citySlug = cityOnlyMatch[1]
    // Skip RI cities - they stay under /cities/ for now
    if (citySlug.endsWith('-ri')) {
      return NextResponse.next()
    }
    // Strip -ma suffix for the new URL
    const cleanSlug = citySlug.endsWith('-ma') ? citySlug.slice(0, -3) : citySlug
    return NextResponse.redirect(new URL(`/massachusetts/${cleanSlug}`, request.url), 301)
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
     * - _vercel (Web Analytics: /_vercel/insights/script.js e /event)
     *
     * _vercel entrou junto com o <Analytics /> do layout. Sem ele, CADA
     * carregamento do script e CADA evento de pageview invocaria este
     * middleware sem ter nada para fazer - e middleware na Vercel e cobrado
     * por invocacao. O projeto ja faz 32.425 invocacoes por dia; nao ha
     * motivo para a propria medicao aumentar essa conta.
     */
    '/((?!api|_next/static|_next/image|_vercel|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
