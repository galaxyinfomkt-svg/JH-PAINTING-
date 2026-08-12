'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { projects, projectCities, formatCompleted, type Project } from '@/app/data/projects'
import { SERVICE_LABELS } from '@/app/data/cityServiceComposer'

/* ────────────────────────────────────────────────────────────────────────────
   Portfolio, grouped by job.
   Every photo here is an original site photograph. Nothing is stock, so the
   copy stays with what the photos prove: city, trade, space, month.
   ──────────────────────────────────────────────────────────────────────────── */

type Filter = { kind: 'all' } | { kind: 'service'; value: string } | { kind: 'city'; value: string }

export default function ProjectsClient() {
  const [filter, setFilter] = useState<Filter>({ kind: 'all' })
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null)

  const services = useMemo(() => {
    const counts = new Map<string, number>()
    projects.forEach((p) => counts.set(p.service, (counts.get(p.service) ?? 0) + 1))
    return [...counts.entries()].sort((a, b) => b[1] - a[1])
  }, [])

  const shown = useMemo(() => {
    if (filter.kind === 'all') return projects
    if (filter.kind === 'service') return projects.filter((p) => p.service === filter.value)
    return projects.filter((p) => p.city === filter.value)
  }, [filter])

  const photoCount = shown.reduce((s, p) => s + p.photos.length, 0)

  /* keyboard nav for the lightbox */
  const move = useCallback((step: number) => {
    setLightbox((lb) => {
      if (!lb) return lb
      const n = lb.project.photos.length
      return { ...lb, index: (lb.index + step + n) % n }
    })
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      else if (e.key === 'ArrowRight') move(1)
      else if (e.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [lightbox, move])

  const isActive = (f: Filter) =>
    f.kind === filter.kind &&
    (f.kind === 'all' || (filter.kind !== 'all' && f.value === filter.value))

  return (
    <div className="pf">
      {/* ── masthead ─────────────────────────────────────────────────────── */}
      <header className="pf-mast">
        <p className="pf-eyebrow">Completed work</p>
        <h1 className="pf-h1">
          Jobs we can <em>point to</em>
        </h1>
        <p className="pf-lede">
          Every photograph below was taken on one of our own job sites in Massachusetts —
          no stock imagery, no renderings. Filter by trade or by town.
        </p>
        <dl className="pf-stats">
          <div>
            <dt>Projects</dt>
            <dd>{projects.length}</dd>
          </div>
          <div>
            <dt>Site photographs</dt>
            <dd>{projects.reduce((s, p) => s + p.photos.length, 0)}</dd>
          </div>
          <div>
            <dt>Towns documented</dt>
            <dd>{projectCities.length}</dd>
          </div>
        </dl>
      </header>

      {/* ── filters ──────────────────────────────────────────────────────── */}
      <nav className="pf-filters" aria-label="Filter projects">
        <div className="pf-frow">
          <span className="pf-flabel">Trade</span>
          <button
            className={`pf-chip${isActive({ kind: 'all' }) ? ' is-on' : ''}`}
            onClick={() => setFilter({ kind: 'all' })}
          >
            All <span className="pf-n">{projects.length}</span>
          </button>
          {services.map(([svc, n]) => (
            <button
              key={svc}
              className={`pf-chip${isActive({ kind: 'service', value: svc }) ? ' is-on' : ''}`}
              onClick={() => setFilter({ kind: 'service', value: svc })}
            >
              {SERVICE_LABELS[svc] ?? svc} <span className="pf-n">{n}</span>
            </button>
          ))}
        </div>
        <div className="pf-frow">
          <span className="pf-flabel">Town</span>
          {projectCities.map((c) => (
            <button
              key={c}
              className={`pf-chip${isActive({ kind: 'city', value: c }) ? ' is-on' : ''}`}
              onClick={() => setFilter({ kind: 'city', value: c })}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="pf-count" role="status">
          {shown.length} project{shown.length === 1 ? '' : 's'} · {photoCount} photograph
          {photoCount === 1 ? '' : 's'}
        </p>
      </nav>

      {/* ── projects ─────────────────────────────────────────────────────── */}
      <div className="pf-list">
        {shown.map((p, pi) => (
          <article key={p.slug} className="pf-project" id={p.slug}>
            <div className="pf-phead">
              <div className="pf-pnum" aria-hidden="true">
                {String(pi + 1).padStart(2, '0')}
              </div>
              <div className="pf-pmeta">
                <h2>
                  {p.client ? <span className="pf-client">{p.client} — </span> : null}
                  {p.title}
                </h2>
                <p className="pf-tags">
                  {p.city ? (
                    <Link href={`/massachusetts/${p.citySlug}`} className="pf-tag pf-tag-city">
                      {p.city}, {p.state}
                    </Link>
                  ) : (
                    <span className="pf-tag">Massachusetts</span>
                  )}
                  <Link href={`/services/${p.service}`} className="pf-tag">
                    {p.serviceLabel}
                  </Link>
                  {p.space ? <span className="pf-tag pf-tag-mute">{p.space}</span> : null}
                  <span className="pf-tag pf-tag-mute">{formatCompleted(p.completed)}</span>
                </p>
              </div>
            </div>

            <div className="pf-grid">
              {p.photos.map((ph, i) => (
                <button
                  key={ph.src}
                  className={`pf-cell${i === 0 ? ' pf-cell-lead' : ''}`}
                  onClick={() => setLightbox({ project: p, index: i })}
                  aria-label={`Open photograph ${i + 1} of ${p.photos.length} — ${p.title}${
                    p.city ? ` in ${p.city}` : ''
                  }`}
                >
                  <Image
                    src={ph.thumb}
                    alt={`${p.serviceLabel}${p.space ? ` — ${p.space}` : ''} by JH Painting Services${
                      p.city ? ` in ${p.city}, ${p.state}` : ' in Massachusetts'
                    } (${i + 1} of ${p.photos.length})`}
                    width={ph.w}
                    height={ph.h}
                    sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw"
                    className="pf-img"
                    priority={pi === 0 && i === 0}
                  />
                  <span className="pf-zoom" aria-hidden="true">
                    View
                  </span>
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="pf-empty">No documented projects match that filter yet.</p>
      )}

      {/* ── closing CTA ──────────────────────────────────────────────────── */}
      <section className="pf-cta">
        <h2>Want your job on this page?</h2>
        <p>
          We photograph every project we finish. Book a walk-through and we&apos;ll show you the
          surfaces that need repair before coating — and put the scope in writing before anything
          starts.
        </p>
        <div className="pf-ctabtns">
          <a href="tel:+15086908886" className="pf-btn pf-btn-primary">
            Call (508) 690-8886
          </a>
          <Link href="/contact" className="pf-btn pf-btn-ghost">
            Request an estimate
          </Link>
        </div>
      </section>

      {/* ── lightbox ─────────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="pf-lb"
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.project.title} photographs`}
          onClick={() => setLightbox(null)}
        >
          <button className="pf-lb-x" onClick={() => setLightbox(null)} aria-label="Close">
            ✕
          </button>
          <button
            className="pf-lb-nav pf-lb-prev"
            onClick={(e) => {
              e.stopPropagation()
              move(-1)
            }}
            aria-label="Previous photograph"
          >
            ‹
          </button>
          <figure className="pf-lb-fig" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.project.photos[lightbox.index].src}
              alt={`${lightbox.project.serviceLabel} by JH Painting Services${
                lightbox.project.city ? ` in ${lightbox.project.city}, ${lightbox.project.state}` : ''
              }`}
              width={lightbox.project.photos[lightbox.index].w}
              height={lightbox.project.photos[lightbox.index].h}
              sizes="(max-width: 900px) 96vw, 80vw"
              className="pf-lb-img"
            />
            <figcaption>
              <strong>
                {lightbox.project.client ? `${lightbox.project.client} — ` : ''}
                {lightbox.project.title}
              </strong>
              <span>
                {lightbox.project.city ? `${lightbox.project.city}, ${lightbox.project.state} · ` : ''}
                {lightbox.project.serviceLabel} · {formatCompleted(lightbox.project.completed)}
              </span>
              <span className="pf-lb-idx">
                {lightbox.index + 1} / {lightbox.project.photos.length}
              </span>
            </figcaption>
          </figure>
          <button
            className="pf-lb-nav pf-lb-next"
            onClick={(e) => {
              e.stopPropagation()
              move(1)
            }}
            aria-label="Next photograph"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
