'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  videos,
  videoThumbnail,
  videoEmbedUrl,
  videoSchema,
  YOUTUBE_CHANNEL,
} from '@/app/data/videos'

const PlayIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><polygon points="6 3 20 12 6 21 6 3"/></svg>
)

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
)

// Emitted once, at module scope: null until the videos carry their real
// uploadDate + duration (see app/data/videos.ts).
const schema = videoSchema(videos)

export default function HomeVideoSection() {
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; embed: string; title: string }>({ isOpen: false, embed: '', title: '' })

  const closeVideoModal = () => setVideoModal({ isOpen: false, embed: '', title: '' })

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {/* Video Section - RS Style Dark */}
      <section className="section video-section-rs">
        <div className="container">
          <div className="section-header">
            <h2>See Our Work in Action</h2>
            <p>Watch our expert team tackle painting projects across Massachusetts.</p>
          </div>

          <div className="video-grid-rs">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setVideoModal({ isOpen: true, embed: videoEmbedUrl(video), title: video.title })}
                className="video-card-rs"
                type="button"
              >
                <Image
                  src={videoThumbnail(video)}
                  alt=""
                  aria-hidden="true"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
                {/*
                  No aria-label on the button. It used to carry
                  aria-label="Play video: {title}", which overrode the visible
                  text below and tripped WCAG 2.5.3 "Label in Name": a
                  voice-control user saying the words they can see on the card
                  could not activate it. The visible <h3> is now the accessible
                  name, and the decorative thumbnail and icons are hidden from
                  the tree so they cannot dilute it.
                */}
                <div className="video-card-rs-overlay">
                  <div className="video-card-rs-play">
                    <PlayIcon size={20} />
                  </div>
                  <h3>{video.title}</h3>
                  <span>
                    <PlayIcon size={12} />
                    {video.isShort ? 'YouTube Short' : 'Video'}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="video-section-cta">
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg"
            >
              <PlayIcon size={18} />
              Watch More on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModal.isOpen && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="video-modal-close" onClick={closeVideoModal} aria-label="Close video">
              <XIcon />
            </button>
            <div className="video-modal-content">
              <iframe
                src={`${videoModal.embed}&autoplay=1`}
                title={videoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
