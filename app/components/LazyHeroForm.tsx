'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The LeadConnector estimate form.
 *
 * TWO MODES, ON PURPOSE
 *
 * `priority` (home, /contact): the iframe renders with its src on the server
 * and loads eagerly. Those pages exist to capture the estimate, and commit
 * 3487079 established the rule after real leads were lost to a spinner. Do not
 * make them lazy.
 *
 * default (the ~1,000 city, city+service, region and service pages): the
 * iframe mounts only when the user scrolls near it. Measured on production,
 * the eager iframe pulls 1,691 KB from stcdn.leadconnectorhq.com plus 1,168 KB
 * of Cloudflare Turnstile that the GHL form loads on its own, which was 69% of
 * the bytes on a city page. On those pages the visitor reads first and
 * converts second, so paying that cost before they have scrolled buys nothing.
 *
 * The observer fires 600px early, so on a normal scroll the form is already
 * there when it comes into view. Anyone who never scrolls that far was never
 * going to fill it in.
 *
 * The GHL widget renders its own loading state, which is left to show through
 * honestly rather than covered by a fake skeleton.
 */

interface LazyHeroFormProps {
  src: string
  title: string
  className?: string
  /** True only on pages whose single job is capturing the lead. */
  priority?: boolean
}

export default function LazyHeroForm({ src, title, className, priority = false }: LazyHeroFormProps) {
  const holder = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(priority)

  useEffect(() => {
    if (priority || show) return
    const el = holder.current
    if (!el) return

    // No IntersectionObserver (very old browser): render immediately rather
    // than hiding the form from someone who can still use it.
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [priority, show])

  if (priority) {
    return (
      <iframe
        src={src}
        title={title}
        className={className}
        loading="eager"
        // @ts-expect-error - fetchpriority is valid HTML, TS lib not yet updated
        fetchpriority="high"
      />
    )
  }

  return (
    <div ref={holder} className={className} style={{ minHeight: 520 }}>
      {show ? (
        <iframe src={src} title={title} className={className} loading="lazy" />
      ) : null}
    </div>
  )
}
