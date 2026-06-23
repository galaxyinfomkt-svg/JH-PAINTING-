/**
 * LazyHeroForm — the GHL form iframe, rendered raw.
 *
 * User explicitly requested: NO overlay, NO skeleton, NO "Call" CTA on top.
 * Just the iframe, server-rendered, eager-loaded, visible from first paint.
 *
 * The GHL widget itself shows its own loading state (a spinner) while its
 * content streams in. Letting it show through honestly is what the user
 * wants — no Next.js-side fake-skeleton lying about being a form.
 */

'use client'

interface LazyHeroFormProps {
  src: string
  title: string
  className?: string
}

export default function LazyHeroForm({ src, title, className }: LazyHeroFormProps) {
  return (
    <iframe
      src={src}
      title={title}
      className={className}
      loading="eager"
      // @ts-expect-error — fetchpriority is valid HTML, TS lib not yet updated
      fetchpriority="high"
    />
  )
}
