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
