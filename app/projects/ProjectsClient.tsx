'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { projects, projectCities, formatCompleted, type Project } from '@/app/data/projects'
import { SERVICE_LABELS } from '@/app/data/cityServiceComposer'

/* ────────────────────────────────────────────────────────────────────────────
   Job archive.

   Design read: redesign-preserve of a contractor portfolio. Audience is
   homeowners and facility managers deciding whether this crew is real.
   Language: documentary archive. Dials: VARIANCE 6 / MOTION 4 / DENSITY 3.
   A credibility page, so restraint beats spectacle.

   Interaction: each job is a folder. The cover photo rests on a visible stack
   of the rest; opening it fills the screen with that job's photographs.
   Two levels only, folder then photograph. Nothing is overlaid on an image.

   Checked against design-taste-frontend section 9: no em-dash, no section
   numbering, no labels on photos, no italic-split headline, no scroll cue,
   no decorative dots, middle-dot not used as a separator.
   ──────────────────────────────────────────────────────────────────────────── */

type Filter = { kind: 'all' } | { kind: 'service'; value: string } | { kind: 'city'; value: string }

export default function ProjectsClient() {
  const [filter, setFilter] = useState<Filter>({ kind: 'all' })
  const [open, setOpen] = useState<Project | null>(null)
  const [zoom, setZoom] = useState<number | null>(null)

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

  const step = useCallback(
    (d: number) => {
      setZoom((z) => {
        if (z === null || !open) return z
        const n = open.photos.length
        return (z + d + n) % n
      })
    },
    [open]
  )

  /* Esc closes the top layer first, then the folder. Arrows page the photograph. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoom !== null) setZoom(null)
        else setOpen(null)
      } else if (zoom !== null && e.key === 'ArrowRight') step(1)
      else if (zoom !== null && e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, zoom, step])

  /* The overlays must escape this subtree's stacking context: the site header
     and the mobile sticky bar are fixed with their own z-index, and an
     ancestor here would otherwise trap the folder view underneath them.
     Portal to <body> and mount only after hydration. */
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const active = (f: Filter) =>
    f.kind === filter.kind &&
    (f.kind === 'all' || (filter.kind !== 'all' && f.value === filter.value))

  const totalPhotos = projects.reduce((s, p) => s + p.photos.length, 0)

  return (
    <div className="jb">
      <header className="jb-top">
        <p className="jb-brow">Our work</p>
        <h1 className="jb-h1">Jobs we can point to</h1>
        <p className="jb-lede">
          Every photograph here was taken on one of our own job sites in Massachusetts. No stock
          imagery.
        </p>
        <dl className="jb-stats">
          <div>
            <dt>Jobs</dt>
            <dd>{projects.length}</dd>
          </div>
          <div>
            <dt>Photographs</dt>
            <dd>{totalPhotos}</dd>
          </div>
          <div>
            <dt>Towns</dt>
            <dd>{projectCities.length}</dd>
          </div>
        </dl>
      </header>

      <nav className="jb-filters" aria-label="Filter jobs">
        <div className="jb-row">
          <button
            className={`jb-chip${active({ kind: 'all' }) ? ' on' : ''}`}
            onClick={() => setFilter({ kind: 'all' })}
          >
            Everything
          </button>
          {services.map(([svc, n]) => (
            <button
              key={svc}
              className={`jb-chip${active({ kind: 'service', value: svc }) ? ' on' : ''}`}
              onClick={() => setFilter({ kind: 'service', value: svc })}
            >
              {SERVICE_LABELS[svc] ?? svc}
              <i>{n}</i>
            </button>
          ))}
        </div>
        <div className="jb-row jb-row-town">
          {projectCities.map((c) => (
            <button
              key={c}
              className={`jb-chip jb-chip-town${active({ kind: 'city', value: c }) ? ' on' : ''}`}
              onClick={() => setFilter({ kind: 'city', value: c })}
            >
              {c}
            </button>
          ))}
        </div>
      </nav>

      <ul className="jb-grid">
        {shown.map((p, i) => (
          <li key={p.slug} className="jb-folder">
            <button className="jb-open" onClick={() => setOpen(p)}>
              <span className="jb-stack">
                <span className="jb-sheet jb-sheet-c" aria-hidden="true" />
                <span className="jb-sheet jb-sheet-b" aria-hidden="true" />
                <span className="jb-cover">
                  <Image
                    src={p.photos[0].thumb}
                    alt={`${p.serviceLabel}${p.space ? `, ${p.space}` : ''} by JH Painting Services${
                      p.city ? ` in ${p.city}, ${p.state}` : ' in Massachusetts'
                    }`}
                    width={p.photos[0].w}
                    height={p.photos[0].h}
                    sizes="(max-width: 640px) 92vw, (max-width: 1100px) 45vw, 30vw"
                    /* The first cover is the LCP element on this page. Without
                       priority it inherits next/image's lazy default and the
                       browser discovers it late, which measured as the worst
                       LCP on the site. The rest stay lazy. */
                    priority={i === 0}
                    loading={i === 0 ? undefined : 'lazy'}
                  />
                </span>
              </span>
              <span className="jb-cap">
                <span className="jb-name">
                  {p.client ? <b>{p.client}</b> : null}
                  {p.title}
                </span>
                <span className="jb-meta">
                  <span>{p.city ? `${p.city}, ${p.state}` : 'Massachusetts'}</span>
                  <i>{p.photos.length} photos</i>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {shown.length === 0 && <p className="jb-empty">Nothing documented under that filter yet.</p>}

      <section className="jb-cta">
        <h2>Want your job in here?</h2>
        <p>
          We photograph every project we finish. Book a walk-through and we will show you what needs
          repair before any coating goes on.
        </p>
        <div className="jb-btns">
          <a href="tel:+15086908886" className="jb-btn jb-btn-solid">
            Call (508) 690-8886
          </a>
          <Link href="/contact" className="jb-btn jb-btn-line">
            Request an estimate
          </Link>
        </div>
      </section>

      {mounted && open && createPortal(
        <div
          className="jb-sheetview"
          role="dialog"
          aria-modal="true"
          aria-label={`${open.title} photographs`}
        >
          <div className="jb-sv-bar">
            <div className="jb-sv-id">
              <h2>
                {open.client ? <b>{open.client}</b> : null}
                {open.title}
              </h2>
              <p>
                {open.city ? (
                  <Link href={`/massachusetts/${open.citySlug}`}>
                    {open.city}, {open.state}
                  </Link>
                ) : (
                  <span>Massachusetts</span>
                )}
                <Link href={`/services/${open.service}`}>{open.serviceLabel}</Link>
                <span>{formatCompleted(open.completed)}</span>
                {open.space ? <span>{open.space}</span> : null}
              </p>
            </div>
            <button className="jb-close" onClick={() => setOpen(null)} aria-label="Close folder">
              Close
            </button>
          </div>

          <div className="jb-sv-grid">
            {open.photos.map((ph, i) => (
              <button
                key={ph.src}
                className="jb-shot"
                onClick={() => setZoom(i)}
                aria-label={`Enlarge photograph ${i + 1} of ${open.photos.length}`}
              >
                <Image
                  src={ph.thumb}
                  alt={`${open.serviceLabel}${open.space ? `, ${open.space}` : ''} by JH Painting Services${
                    open.city ? ` in ${open.city}, ${open.state}` : ''
                  }`}
                  width={ph.w}
                  height={ph.h}
                  sizes="(max-width: 640px) 46vw, 30vw"
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}

      {mounted && open && zoom !== null && createPortal(
        <div
          className="jb-zoom"
          role="dialog"
          aria-modal="true"
          aria-label="Photograph"
          onClick={() => setZoom(null)}
        >
          <button
            className="jb-znav jb-zprev"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            aria-label="Previous photograph"
          >
            &#8249;
          </button>
          <Image
            src={open.photos[zoom].src}
            alt={`${open.serviceLabel} by JH Painting Services${
              open.city ? ` in ${open.city}, ${open.state}` : ''
            }`}
            width={open.photos[zoom].w}
            height={open.photos[zoom].h}
            sizes="90vw"
            className="jb-zimg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="jb-znav jb-znext"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            aria-label="Next photograph"
          >
            &#8250;
          </button>
          <button className="jb-zclose" onClick={() => setZoom(null)} aria-label="Close photograph">
            Close
          </button>
        </div>,
        document.body
      )}
    </div>
  )
}
