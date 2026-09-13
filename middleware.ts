import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Passa a pagina adiante, marcando-a como nao-indexavel quando ela esta sendo
 * servida por um endereco *.vercel.app em vez do dominio de verdade.
 *
 * O PROBLEMA
 * O deploy de producao responde por QUATRO enderecos ao mesmo tempo:
 *
 *   jhpaintingservices.com                            <- o nosso
 *   www.jhpaintingservices.com                        <- o nosso
 *   jh-painting-galaxy-mkts-projects.vercel.app       <- gerado pela Vercel
 *   jh-painting-git-main-...vercel.app                <- gerado pela Vercel
 *
 * O projeto nao tem protecao de deploy (conferido: password, SSO e trusted IPs
 * todos desligados), e next.config.js manda `X-Robots-Tag: index, follow` em
 * `/(.*)`, ou seja, nos quatro. Resultado: as 1.042 paginas existem, abertas e
 * mandando indexar, em tres dominios alem do nosso.
 *
 * O <link rel="canonical"> de cada pagina aponta para jhpaintingservices.com,
 * e isso costuma resolver - mas canonical e sugestao, nao ordem, e num site que
 * hoje esta brigando para ser indexado nao ha por que deixar copia aberta.
 *
 * POR QUE A REGRA E `endsWith('.vercel.app')` E NAO UMA LISTA DE PERMITIDOS
 * De proposito, e a diferenca importa. Uma lista de permitidos ("marque tudo
 * que nao for jhpaintingservices.com") poe o site inteiro a um Host inesperado
 * de distancia de um noindex em producao. Esta regra so pode alcancar host
 * terminado em .vercel.app, entao nao existe entrada possivel que faca ela
 * atingir o dominio de verdade. Ela tambem cobre sozinha todo preview futuro.
 *
 * NAO redireciona, so acrescenta cabecalho: redirecionar exigiria saber em que
 * direcao a Vercel ja redireciona www <-> apex, e um loop no dominio de
 * producao derruba o site. Isso fica para o painel.
 */
function pass(request: NextRequest): NextResponse {
  const response = NextResponse.next()
  const host = (request.headers.get('host') ?? '').toLowerCase().split(':')[0]
  if (host.endsWith('.vercel.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  return response
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const pathname = url.pathname
  const searchParams = url.searchParams.toString()

  /*
   * URLs terminadas em /null -> 301 para a pagina pai.
   *
   *   /massachusetts/sterling/null  ->  /massachusetts/sterling
   *   /massachusetts/null           ->  /massachusetts
   *   /null                         ->  /
   *
   * Os logs da Vercel mostram ~970 destas por dia, 131 caminhos distintos.
   * Elas nao existem no HTML servido hoje nem no build de 01/09 - conferi as
   * 1.042 paginas renderizadas dos dois. Sao URLs que algum deploy de agosto
   * emitiu, que os rastreadores enfileiraram e continuam visitando.
   *
   * POR QUE NAO E MAIS 410, QUE FOI O QUE EU FIZ PRIMEIRO
   * 410 devolve corpo VAZIO. Quem chegasse aqui - e pode ser gente, porque
   * essas URLs sairam do proprio site e podem estar no historico de alguem ou
   * num resultado de busca - via uma pagina em branco. Pior que o 404 de
   * antes, que pelo menos renderiza app/not-found.tsx com cabecalho, telefone
   * e caminho de volta. Eu tinha otimizado para o rastreador e esquecido do
   * visitante.
   *
   * O redirecionamento resolve os dois lados de uma vez, e resolve melhor:
   *
   *   para a pessoa  ela cai exatamente onde queria chegar. Quem pediu
   *                  /massachusetts/sterling/null queria Sterling, e agora
   *                  aterrissa na pagina de Sterling, nao numa tela de erro.
   *                  Numa URL que veio de busca, isso e a diferenca entre um
   *                  orcamento e uma aba fechada.
   *   para o Google  301 para uma pagina real consolida o sinal, em vez de so
   *                  apagar a URL. A regra do Google e essa mesma: redirecione
   *                  quando existe pagina equivalente, use 404/410 so quando
   *                  nao existe. Aqui existe.
   *
   * O 410 continua logo abaixo para as URLs de spam, e ali ele esta certo:
   * aquilo e sonda de robo e nao tem destino equivalente nenhum.
   *
   * Se a cidade do caminho nao existir, o destino responde o 404 da marca -
   * que e o mesmo lugar onde a pessoa cairia de qualquer jeito, so que agora
   * com a pagina inteira em vez de tela branca.
   */
  if (pathname === '/null' || pathname.endsWith('/null')) {
    const parent = pathname.slice(0, -'/null'.length) || '/'
    return NextResponse.redirect(new URL(parent, request.url), 301)
  }

  /*
   * URLs de spam -> 410 Gone. Aqui o 410 esta certo: e sonda de robo, nao ha
   * pagina equivalente para onde mandar ninguem, e corpo vazio e o que se quer.
   *
   * QUATRO DOS CINCO PADROES NUNCA DISPARARAM. Medido, um a um:
   *
   *   ?40001/27139590.html          200   <- devia ser 410
   *   ?2817xmcn10071nco37982.html   200   <- devia ser 410
   *   ?s={search_term_string}       200   <- devia ser 410
   *   ?339                          200   <- devia ser 410
   *   ?chiba/                       410   <- unico que funcionava
   *
   * A CAUSA, medida com um cabecalho de depuracao no proprio middleware: o
   * Next NORMALIZA a query antes do middleware receber a requisicao. Nao ha
   * como ver a query crua aqui - nem `url.search` nem `request.url` trazem ela:
   *
   *   entra                         chega no middleware
   *   ?40001/27139590.html          ?40001%2F27139590.html=
   *   ?2817xmcn10071nco37982.html   ?2817xmcn10071nco37982.html=
   *   ?s={search_term_string}       ?s=%7Bsearch_term_string%7D
   *   ?339                          ?339=
   *   ?chiba/                       ?chiba%2F=
   *
   * Ou seja: os caracteres viram percent-encode e uma chave sem valor ganha um
   * "=" grudado no fim. Os padroes foram escritos contra a forma que a pessoa
   * ve na barra do navegador, e nenhum sobrevive a isso. O ?chiba/ escapava so
   * porque `/^\?chiba/` nao tem ancora no fim - funcionava por acidente.
   *
   * A CORRECAO: desfazer a normalizacao ANTES de comparar, em vez de reescrever
   * os cinco padroes em percent-encode. Assim eles continuam legiveis como a
   * URL que aparece no log, e um padrao novo pode ser copiado dali direto sem
   * ninguem precisar lembrar desta pegadinha.
   *
   * decodeURIComponent lanca excecao em sequencia percent malformada (?%ZZ), e
   * excecao aqui vira 500 na requisicao - por isso o try/catch. Se nao der para
   * decodificar, compara com a forma normalizada mesmo e segue.
   */
  let rawQuery = ''
  try {
    rawQuery = searchParams ? `?${decodeURIComponent(searchParams).replace(/=$/, '')}` : ''
  } catch {
    rawQuery = searchParams ? `?${searchParams}` : ''
  }
  const spamPatterns = [
    /^\?[0-9]+\/[0-9]+\.html$/,           // ?40001/27139590.html
    /^\?[0-9]+xmcn[0-9]+nco[0-9]+\.html$/, // ?2817xmcn10071nco37982.html
    /^\?chiba/,                            // ?chiba/
    /^\?s=\{search_term_string\}/,         // ?s={search_term_string}
    /^\?[0-9]+$/,                          // ?339
  ]

  if (rawQuery) {
    for (const pattern of spamPatterns) {
      if (pattern.test(rawQuery)) {
        /*
         * 301 para o MESMO caminho sem a query suja - nao 410.
         *
         * Era 410, e 410 devolve corpo vazio. Foi o mesmo erro que eu tinha
         * cometido nas URLs /null: otimizar para o rastreador e deixar quem e
         * gente numa tela branca. /?339 nao e uma pagina que sumiu - e a HOME
         * com lixo pendurado na query. Quem abrir aquilo tem que ver a home.
         *
         * E para o Google isto tambem e melhor que o 410: a URL suja passa a
         * apontar para a URL limpa, que ja e a canonica da pagina, entao o
         * sinal consolida em vez de simplesmente sumir.
         *
         * Nao ha risco de loop: o destino e montado so com o pathname, sem
         * query nenhuma, entao a requisicao seguinte nao casa com padrao
         * nenhum daqui.
         */
        return NextResponse.redirect(new URL(pathname, request.url), 301)
      }
    }
  }

  /*
   * O redirect de /blog?tag=* para /blog saiu daqui.
   *
   * Ele existia para nao deixar ~104 variantes de query virarem URL rastreavel.
   * O preco era alto demais: os 33 posts mostram as tags do artigo como link -
   * 155 links no site - e todos caiam no blog SEM filtro. A pessoa clicava em
   * "exterior painting" e recebia o blog inteiro, como se o clique nao tivesse
   * feito nada.
   *
   * Agora /blog le o ?tag= e filtra de verdade (app/blog/page.tsx). E o medo
   * de conteudo duplicado ja estava resolvido sem o redirect: /blog declara
   * <link rel="canonical" href="https://jhpaintingservices.com/blog">, entao o
   * Google consolida toda variante de query na URL limpa. Conferido no HTML
   * servido, com e sem o parametro.
   */

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

  /*
   * 301: /cities/X[-ma|-ri] -> /massachusetts/X[-ri]
   *
   * O ramo especial de Rhode Island saiu daqui, porque ele mandava para lugar
   * nenhum. O codigo dizia:
   *
   *     // Skip RI cities - they stay under /cities/ for now
   *     if (citySlug.endsWith('-ri')) return NextResponse.next()
   *
   * So que /cities/ NAO existe mais - nao ha app/cities no projeto. Entao
   * /cities/woonsocket-ri respondia 404, enquanto a pagina real estava viva em
   * /massachusetts/woonsocket-ri (200, e no sitemap, junto com as outras sete
   * URLs de Woonsocket). O comentario descrevia um mundo que deixou de existir
   * quando as rotas mudaram para /massachusetts/.
   *
   * Detalhe que faz a correcao ser segura: a linha abaixo tira SO o "-ma".
   * `woonsocket-ri` passa inteiro e vira /massachusetts/woonsocket-ri, que e
   * exatamente a URL canonica da cidade. Nao ha caso de RI que precise de
   * tratamento proprio.
   *
   * A versao com servico (/cities/woonsocket-ri/interior-painting) ja estava
   * certa: cai na regra de cima, que tambem so tira "-ma", e ja redirecionava
   * para /massachusetts/woonsocket-ri/interior-painting.
   */
  const cityOnlyMatch = pathname.match(/^\/cities\/([a-z][a-z0-9-]+)$/)
  if (cityOnlyMatch) {
    const citySlug = cityOnlyMatch[1]
    const cleanSlug = citySlug.endsWith('-ma') ? citySlug.slice(0, -3) : citySlug
    return NextResponse.redirect(new URL(`/massachusetts/${cleanSlug}`, request.url), 301)
  }

  return pass(request)
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
