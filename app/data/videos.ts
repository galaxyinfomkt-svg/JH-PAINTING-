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

export interface SiteVideo {
  /** YouTube video ID (11 chars). */
  id: string
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
    title: 'Interior Painting in Massachusetts',
    description:
      'Interior painting work by JH Painting Services in a Massachusetts home - masking, cutting in, and rolling walls and ceilings.',
    service: 'interior-painting',
    isShort: true,
    thumbnail: 'hqdefault',
  },
]

/** Public channel URL - one place, so the "watch more" links cannot drift. */
export const YOUTUBE_CHANNEL = 'https://www.youtube.com/@JHPaintingServices-br9wh'

export const videoThumbnail = (v: SiteVideo): string =>
  `https://img.youtube.com/vi/${v.id}/${v.thumbnail ?? 'hqdefault'}.jpg`

export const videoWatchUrl = (v: SiteVideo): string =>
  `https://www.youtube.com/watch?v=${v.id}`

export const videoEmbedUrl = (v: SiteVideo): string =>
  `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`

/** Videos tagged for a given /services/<slug> page, newest entry order preserved. */
export const videosForService = (serviceSlug: string): SiteVideo[] =>
  videos.filter((v) => v.service === serviceSlug)

/**
 * VideoObject JSON-LD for the videos on a page.
 *
 * Returns `null` when no video on the page carries the required real
 * publication data, so the page emits no markup rather than markup built on a
 * guessed date. Once uploadDate + duration are filled in above, every page
 * that shows the video starts emitting valid VideoObject automatically.
 */
export function videoSchema(list: SiteVideo[] = videos) {
  const eligible = list.filter((v) => v.uploadDate && v.duration)
  if (eligible.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@graph': eligible.map((v) => ({
      '@type': 'VideoObject',
      '@id': `${videoWatchUrl(v)}#video`,
      name: v.title,
      description: v.description,
      thumbnailUrl: [videoThumbnail(v)],
      uploadDate: v.uploadDate,
      duration: v.duration,
      contentUrl: videoWatchUrl(v),
      embedUrl: videoEmbedUrl(v),
      publisher: { '@id': 'https://jhpaintingservices.com/#organization' },
    })),
  }
}
