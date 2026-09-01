/**
 * videos.ts - the single source of truth for every video published on the site.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Two things were wrong before it:
 *
 * 1. THE LIST WAS DUPLICATED. The same two YouTube IDs were typed out in
 *    lib/constants.ts (VIDEOS), app/components/HomeVideoSection.tsx and
 *    app/vsl/page.tsx, and the city pages held a fourth copy inline. Adding a
 *    video therefore meant editing four files and any one of them could drift.
 *    Now every surface reads this array, so a new video is ONE entry here and
 *    it appears everywhere at once.
 *
 * 2. THERE WAS NO VideoObject SCHEMA ANYWHERE ON THE DOMAIN. The videos were
 *    embedded as bare <iframe>s. Google cannot index a video it has no markup
 *    for: no video rich result, no thumbnail beside the blue link, and no
 *    entry in the Videos tab. For a trade where the work is visual, that is a
 *    whole surface the site was not competing on. videoSchema() below emits
 *    the markup, and it emits it ONLY for entries that carry the real
 *    publication data (see the honesty rule).
 *
 * HONESTY RULE - the same one that governs projects.ts and cityFacts.ts
 * --------------------------------------------------------------------
 * `uploadDate` and `duration` must be the values YouTube actually reports for
 * that video. Google treats a wrong uploadDate as a structured-data violation,
 * and a guessed one is exactly the kind of fabricated detail the rest of this
 * codebase refuses to publish. So the type makes them REQUIRED, and
 * videoSchema() skips any entry missing them rather than inventing a date.
 *
 * ── HOW TO ADD THE REST OF THE VIDEOS ────────────────────────────────────────
 * For each video, open it on YouTube and copy four things:
 *
 *   id          the 11 characters after `watch?v=` or `/shorts/`
 *   title       the video title (this is what a searcher sees)
 *   description one or two sentences - what is actually shown
 *   uploadDate  the publish date, YYYY-MM-DD, from the video's own page
 *   duration    ISO-8601: 45 seconds is 'PT45S', 3m20s is 'PT3M20S'
 *
 * Then add an entry below and set `service` so the video shows up on the
 * matching /services/* page, and `isShort: true` for a Short (9:16). Nothing
 * else needs to change anywhere in the app.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Um video do site pode vir de duas fontes:
 *
 *   'youtube'     - publicado no canal da JH. Bom para descoberta no YouTube,
 *                   mas o embed custa ~1 MB de JS de terceiro e so entra na
 *                   pagina depois do clique.
 *   'self-hosted' - arquivo MP4 em /public/videos. Muito mais rapido, sem
 *                   terceiro nenhum, e o `duration` do schema sai do proprio
 *                   arquivo em vez de ser digitado a mao.
 *
 * As obras filmadas pela equipe estao no Drive como .MOV de iPhone (4-86 MB
 * cada). Passe-as por scripts/prepare-videos.sh antes de commitar: ele gera o
 * MP4 web, o poster e imprime a linha pronta para colar aqui.
 */
export type VideoSource = 'youtube' | 'self-hosted'

export interface SiteVideo {
  /** YouTube video ID (11 chars) para source 'youtube'; um slug para 'self-hosted'. */
  id: string
  /** Default 'youtube', para os dois videos que ja existiam. */
  source?: VideoSource
  /** self-hosted: caminho do MP4 em /public. Ex: '/videos/hopkinton-interior.mp4' */
  src?: string
  /** self-hosted: caminho do frame de capa. Ex: '/videos/hopkinton-interior.jpg' */
  poster?: string
  /** Cidade filmada, casando com o slug em app/data/cities.ts. */
  citySlug?: string
  /** Title as published on YouTube. Used as the accessible name and schema name. */
  title: string
  /** What the video actually shows. Required by VideoObject; keep it factual. */
  description: string
  /** Real YouTube publish date, YYYY-MM-DD. Never guess - see the honesty rule. */
  uploadDate?: string
  /** Real runtime, ISO-8601 (e.g. 'PT45S'). Never guess. */
  duration?: string
  /** Matches a /services/<slug> route, so the video can be shown in context. */
  service?: string
  /** True for a 9:16 Short. Only affects the label shown on the card. */
  isShort?: boolean
  /**
   * Which YouTube thumbnail to request. `maxresdefault` is 1280x720 but does
   * not exist for every upload; `hqdefault` always does. If a card renders a
   * grey box, this is the field to change.
   */
  thumbnail?: 'maxresdefault' | 'hqdefault'
}

export const videos: SiteVideo[] = [
  {
    id: 'F_lreXzNlUI',
    source: 'youtube',
    title: 'Exterior Painting in Massachusetts',
    description:
      'JH Painting Services crew carrying out exterior house painting on a Massachusetts home, from surface preparation through finish coats.',
    service: 'exterior-painting',
    isShort: true,
    thumbnail: 'maxresdefault',
    // uploadDate / duration: not filled in. These two videos predate this file
    // and nobody recorded their publish dates. Read them off the YouTube page
    // and paste them here - VideoObject schema switches on automatically.
  },
  {
    id: 'LkT_HLyKibY',
    source: 'youtube',
    title: 'Interior Painting in Massachusetts',
    description:
      'Interior painting work by JH Painting Services in a Massachusetts home - masking, cutting in, and rolling walls and ceilings.',
    service: 'interior-painting',
    isShort: true,
    thumbnail: 'hqdefault',
  },
  {
    id: 'groton-interior',
    source: 'self-hosted',
    src: '/videos/groton-interior.mp4',
    poster: '/videos/groton-interior.jpg',
    title: 'Interior repaint walkthrough in Groton, MA',
    description:
      'Walkthrough of an interior repaint by JH Painting Services in Groton, Massachusetts: rooms cleared and masked, doors off their hinges, and the finished hallway, landing and bedrooms.',
    uploadDate: '2026-09-01',
    duration: 'PT39S',
    citySlug: 'groton',
    service: 'interior-painting',
  },
  {
    id: 'southbridge-interior',
    source: 'self-hosted',
    src: '/videos/southbridge-interior.mp4',
    poster: '/videos/southbridge-interior.jpg',
    title: 'Interior repaint walkthrough in Southbridge, MA',
    description:
      'Walkthrough of an interior repaint by JH Painting Services in an occupied Southbridge, Massachusetts home, covering the living and dining rooms, bedrooms and bathrooms.',
    uploadDate: '2026-09-01',
    duration: 'PT38S',
    citySlug: 'southbridge',
    service: 'interior-painting',
  },
]

/** Public channel URL - one place, so the "watch more" links cannot drift. */
/** Origem do site. Usada so onde o schema exige URL absoluta. */
export const SITE_ORIGIN = 'https://jhpaintingservices.com'

export const YOUTUBE_CHANNEL = 'https://www.youtube.com/@JHPaintingServices-br9wh'

export const isSelfHosted = (v: SiteVideo): boolean => v.source === 'self-hosted'

/**
 * Miniatura para RENDERIZAR na pagina.
 *
 * Para o arquivo local devolve o caminho relativo de proposito. A versao
 * absoluta quebrava a home: next/image so aceita host que esteja em
 * `images.remotePatterns` (next.config.js), e jhpaintingservices.com nao esta
 * la - nem deveria estar, porque o arquivo e do proprio site. O otimizador
 * respondia 400 e os cards novos apareciam vazios.
 *
 * Quem precisa da URL absoluta e o JSON-LD; use videoThumbnailAbsolute().
 */
export const videoThumbnail = (v: SiteVideo): string =>
  isSelfHosted(v)
    ? v.poster ?? ''
    : `https://img.youtube.com/vi/${v.id}/${v.thumbnail ?? 'hqdefault'}.jpg`

/** Miniatura absoluta, para thumbnailUrl do VideoObject. Schema exige URL completa. */
export const videoThumbnailAbsolute = (v: SiteVideo): string =>
  isSelfHosted(v)
    ? (v.poster ? `${SITE_ORIGIN}${v.poster}` : '')
    : `https://img.youtube.com/vi/${v.id}/${v.thumbnail ?? 'hqdefault'}.jpg`

export const videoWatchUrl = (v: SiteVideo): string =>
  isSelfHosted(v) ? `${SITE_ORIGIN}${v.src ?? ''}` : `https://www.youtube.com/watch?v=${v.id}`

/**
 * URL de embed. SO faz sentido para YouTube.
 *
 * Devolve string vazia para o arquivo local, e quem renderiza deve checar
 * isSelfHosted() e montar um <video> - um MP4 dentro de <iframe> nao e um
 * embed, e concatenar parametros nele produzia
 * ".../groton-interior.mp4&autoplay=1", que e 404 porque nao existe query
 * string onde o "&" se prender.
 */
export const videoEmbedUrl = (v: SiteVideo): string =>
  isSelfHosted(v) ? '' : `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`

/** Videos tagged for a given /services/<slug> page, newest entry order preserved. */
export const videosForService = (serviceSlug: string): SiteVideo[] =>
  videos.filter((v) => v.service === serviceSlug)

/**
 * Videos filmados numa cidade especifica.
 *
 * E aqui que os arquivos do Drive valem mais. app/data/indexing.ts ja registra
 * que as paginas de cidade sem prova de primeira mao tendem a ficar em
 * "Crawled - currently not indexed" por mais variado que seja o texto, e que a
 * correcao e preencher a prova a partir de obras reais. Existe filmagem de
 * obra para West Boylston, Hopkinton, Wrentham, Northbridge, Milford e
 * Sherborn - seis cidades que tem pagina no site e hoje nao tem nenhuma
 * fotografia em /public/projects. Um video por pagina dessas vale mais que
 * qualquer reescrita de texto.
 */
export const videosForCity = (citySlug: string): SiteVideo[] =>
  videos.filter((v) => v.citySlug === citySlug)

/**
 * VideoObject JSON-LD for the videos on a page.
 *
 * Returns `null` when no video on the page carries the required real
 * publication data, so the page emits no markup rather than markup built on a
 * guessed date. Once uploadDate + duration are filled in above, every page
 * that shows the video starts emitting valid VideoObject automatically.
 */
export function videoSchema(list: SiteVideo[] = videos) {
  const eligible = list.filter(
    (v) => v.uploadDate && v.duration && (isSelfHosted(v) ? v.poster && v.src : true)
  )
  if (eligible.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@graph': eligible.map((v) => ({
      '@type': 'VideoObject',
      '@id': `${videoWatchUrl(v)}#video`,
      name: v.title,
      description: v.description,
      thumbnailUrl: [videoThumbnailAbsolute(v)],
      uploadDate: v.uploadDate,
      duration: v.duration,
      contentUrl: videoWatchUrl(v),
      embedUrl: videoEmbedUrl(v),
      publisher: { '@id': 'https://jhpaintingservices.com/#organization' },
    })),
  }
}
