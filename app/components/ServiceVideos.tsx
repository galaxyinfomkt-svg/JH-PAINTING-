import Image from 'next/image'
import { Play } from '@/app/components/Icons'
import { videos, isSelfHosted, videoSchema, type SiteVideo } from '@/app/data/videos'

/**
 * Video grid for a /services/* page.
 *
 * WHY: the service pages used to map every entry in videos.ts as a YouTube link
 * with a YouTube thumbnail. Once self-hosted job footage was added, those cards
 * pointed at youtube.com/watch?v=douglas-living-room-before-after - a grey
 * thumbnail and a dead link. This plays self-hosted files in place and keeps
 * YouTube ones as links, and it picks the page's own trade first.
 *
 * Order: this trade's before/after footage, then its other self-hosted footage,
 * then YouTube, then other trades only if the grid would otherwise be short.
 */
export default function ServiceVideos({ service, limit = 4 }: { service: string; limit?: number }) {
  const rank = (v: SiteVideo) =>
    (v.service === service ? 0 : 10) + (isSelfHosted(v) ? (v.id.includes('before-after') ? 0 : 1) : 2)
  const list = [...videos].sort((a, b) => rank(a) - rank(b)).slice(0, limit)
  const schema = videoSchema(list)

  return (
    <>
      {schema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ) : null}
      {list.map((v) =>
        isSelfHosted(v) ? (
          <figure key={v.id} className="service-video-card service-video-card-file">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video src={v.src} poster={v.poster} preload="none" controls playsInline aria-label={v.title} />
            <figcaption className="service-video-title">{v.title}</figcaption>
          </figure>
        ) : (
          <a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="service-video-card"
          >
            <Image
              src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
              alt=""
              aria-hidden="true"
              fill
              loading="lazy"
              className="object-cover"
              quality={75}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="service-video-overlay">
              <div className="service-video-play">
                <Play size={32} fill="#fff" color="#fff" />
              </div>
            </div>
            <p className="service-video-title">{v.title}</p>
          </a>
        )
      )}
    </>
  )
}
