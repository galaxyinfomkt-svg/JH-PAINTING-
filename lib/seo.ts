/**
 * Page-level SEO helper for Next.js 15 App Router.
 *
 * Every route should call generatePageMetadata() from its page.tsx OR its
 * route-segment layout.tsx - never use next/head, never use react-helmet-async,
 * never put page-specific tags in the ROOT layout.
 *
 * The helper takes the page's h1 (title), first paragraph (description), a
 * canonical path (which becomes both <link rel="canonical"> and og:url), and
 * an optional first-image override for og:image. It produces a complete
 * Metadata object covering title, description, keywords, canonical, OG, Twitter,
 * and robots - so a single call replaces 60+ lines of repeated meta config.
 *
 * For JSON-LD structured data, render <script type="application/ld+json"> inside
 * the page body - App Router Metadata cannot carry <script> tags. See SCHEMA_NOTE
 * at the bottom.
 */

import type { Metadata } from 'next'
import { BUSINESS } from './constants'

// Site-wide defaults - only used when a page omits an override.
// metadataBase lives in the root layout so canonical URLs resolve correctly.
const SITE = {
  name: BUSINESS.name,
  url: BUSINESS.website,
  // twitterHandle: set when the handle is confirmed registered. Until then,
  // omit `creator` from twitter cards - sending an unverified handle can
  // surface a broken card preview in X/LinkedIn.
  twitterHandle: undefined as string | undefined,
  locale: 'en_US',
  defaultOgImage:
    'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
} as const

export interface PageMetadataInput {
  /** Page h1 / canonical title. Becomes <title>, og:title, twitter:title. Keep ≤ 60 chars to avoid SERP truncation. */
  title: string
  /** First-paragraph summary. Becomes <meta description>, og:description, twitter:description. 140-160 chars ideal. */
  description: string
  /**
   * Path segment after the origin: "/contact", "/services/exterior-painting".
   * Use "/" for the home page. The helper concatenates with the site origin to
   * build both the canonical link and og:url, so each page produces one
   * uniquely-canonical URL.
   */
  path: string
  /** First image on the page, or a service-specific OG image. Falls back to SITE.defaultOgImage. */
  ogImage?: string
  /** Alt text for the OG image. Defaults to the page title. */
  ogImageAlt?: string
  /** Set true for thank-you, internal, or beta pages that must stay out of the index. */
  noIndex?: boolean
  /** Page-specific long-tail keywords. Accepts string or array. */
  keywords?: string | string[]
  /** Optional override for the OpenGraph type (default "website"; use "article" on blog posts). */
  ogType?: 'website' | 'article'
  /** Optional Twitter card type - "summary_large_image" by default. */
  twitterCard?: 'summary_large_image' | 'summary'
}

export function generatePageMetadata(input: PageMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    ogImage = SITE.defaultOgImage,
    ogImageAlt,
    noIndex = false,
    keywords,
    ogType = 'website',
    twitterCard = 'summary_large_image',
  } = input

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const canonical = `${SITE.url}${normalizedPath === '/' ? '' : normalizedPath}`

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: SITE.locale,
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt || title,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [ogImage],
      ...(SITE.twitterHandle ? { creator: SITE.twitterHandle } : {}),
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}

/**
 * SCHEMA_NOTE
 * -----------
 * For structured data (JSON-LD), App Router metadata exports cannot include
 * <script> tags. Render it inside the page body instead:
 *
 *   export default function Page() {
 *     const schema = { "@context": "https://schema.org", "@type": "Service", ... }
 *     return (
 *       <>
 *         <script type="application/ld+json"
 *           dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 *         <main>...</main>
 *       </>
 *     )
 *   }
 *
 * Keep ORG-level / WebSite / SiteNavigation schema in root layout.tsx
 * (site-wide) and PAGE-level Service / FAQPage / BreadcrumbList schema in the
 * individual page.tsx files.
 */

/* ───────────────────────────────────────────────────────────────────────────
   SERP LENGTH BUDGETING
   ───────────────────────────────────────────────────────────────────────────
   The city and city+service routes already compose their meta inside a length
   budget (app/data/cityServiceComposer.ts -> composeMeta), which is why 0 of
   those 936 URLs overflow. The blog route did not: it built its tags by
   concatenation -

       title:       `${post.title} | Expert Tips from MA Painters`
       description: `${post.excerpt} Get FREE painting quotes: (508) 690-8886`

   - and post titles are already 40-79 characters before the 31-character
   suffix. Measured across the 33 published posts that produced titles up to
   110 characters and descriptions up to 210. Google renders roughly 60 and
   160, so on every blog URL the brand was cut off and, worse, the phone number
   at the end of the description never reached the search result. Blog posts
   hold the site's strongest organic positions, so this was the most expensive
   truncation on the domain.

   These two helpers apply the same budget-as-you-assemble rule as composeMeta:
   the CTA is reserved first and the editorial text is fitted around it, so
   overflow is structurally impossible rather than merely unlikely.
   ─────────────────────────────────────────────────────────────────────────── */

/** Google truncates the SERP title near here. */
export const TITLE_MAX = 60
/** Google truncates the SERP description near here. */
export const DESCRIPTION_MAX = 160

const BRAND_SUFFIX = ' | JH Painting'

/** Words that must never be the last word of a title - they read as truncation. */
const DANGLING =
  /\s+(?:in|for|and|to|the|of|a|an|on|at|with|your|our|from|by|that|is|are|vs|or|but|as|into|about|when|which|why|how|complete|before)$/i

function trimDangling(s: string): string {
  let out = s.replace(/[\s,;:.\-–—]+$/, '')
  // A single pass is not enough for "... available in the" etc.
  for (let i = 0; i < 4; i++) {
    const next = out.replace(DANGLING, '')
    if (next === out) break
    out = next
  }
  return out.replace(/[\s,;:.\-–—]+$/, '')
}

/**
 * Fit an editorial title into the SERP budget, appending the brand only when
 * it genuinely fits.
 *
 * Order of preference, best result first:
 *   1. the title as written, plus the brand
 *   2. the title as written
 *   3. the head clause before the first ":" or "?" (this keeps the primary
 *      keyword and drops the sub-heading, which is what a human editor does)
 *   4. a word-boundary trim with trailing prepositions removed
 *
 * No ellipsis is added: Google adds its own when it truncates, and a title
 * that ends in "..." in the source looks unfinished when it is NOT truncated.
 */
export function fitTitle(title: string, max: number = TITLE_MAX): string {
  const t = title.trim()
  if (t.length + BRAND_SUFFIX.length <= max) return t + BRAND_SUFFIX
  if (t.length <= max) return t

  const cut = t.search(/[:?]/)
  if (cut > 0) {
    const head = trimDangling(t.slice(0, cut))
    // Guard against a head so short it loses the topic ("DIY vs Professional").
    if (head.length >= 25 && head.length <= max) {
      return head.length + BRAND_SUFFIX.length <= max ? head + BRAND_SUFFIX : head
    }
  }

  const sliced = t.slice(0, max)
  return trimDangling(sliced.slice(0, sliced.lastIndexOf(' ')))
}

/**
 * Fit a summary plus a trailing call to action into the description budget.
 *
 * The CTA is reserved FIRST and the summary is fitted around it, so the phone
 * number is always the last thing in the snippet - the same reason the home
 * page description ends on the number. Whole sentences are preferred; a
 * word-boundary trim is the fallback.
 */
export function fitDescription(
  summary: string,
  cta: string = 'Free estimate: (508) 690-8886',
  max: number = DESCRIPTION_MAX
): string {
  const s = summary.trim().replace(/\s+/g, ' ')
  const room = max - cta.length - 1
  if (s.length <= room) return `${s} ${cta}`

  // Prefer dropping whole sentences.
  const sentences = s.match(/[^.!?]+[.!?]+/g) || []
  let kept = ''
  for (const sentence of sentences) {
    if ((kept + sentence).trim().length <= room) kept += sentence
    else break
  }
  kept = kept.trim()

  // If sentence-dropping left too little to be a useful snippet, fall back to a
  // word-boundary trim of the original.
  if (kept.length < 70) {
    const sliced = s.slice(0, room)
    kept = `${trimDangling(sliced.slice(0, sliced.lastIndexOf(' ')))}.`
  }

  return `${kept} ${cta}`
}

/**
 * Assemble a title from a required head plus optional suffixes, keeping as many
 * suffixes as the budget allows.
 *
 * Some titles cannot be templated at a fixed length. The region routes are the
 * clearest case: "Residential Painting" is 20 characters and "North Middlesex &
 * Merrimack Valley" is 34, so the old fixed template
 *
 *     `${service} ${region} MA | Licensed Painters | FREE Quote`
 *
 * produced 91 characters at its worst and overflowed on 52 of the 56 region
 * URLs - the brand, the qualifier and the call to action were all cut off, and
 * a searcher saw a truncated fragment.
 *
 * Passing the head plus the parts in order of importance lets the same template
 * render "Interior Painting in MetroWest, MA | JH Painting" for a short region
 * and "Residential Painting in North Middlesex & Merrimack Valley" for the long
 * one, without a second template and without ever overflowing.
 */
export function composeTitle(head: string, suffixes: string[] = [], max: number = TITLE_MAX): string {
  let out = head.trim()
  for (const suffix of suffixes) {
    const next = out + suffix
    if (next.length <= max) out = next
    else break // keep suffixes in priority order; stop at the first that won't fit
  }
  return out.length <= max ? out : fitTitle(out, max)
}
