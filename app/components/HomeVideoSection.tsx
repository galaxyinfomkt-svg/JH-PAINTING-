'use client'

import { useState } from 'react'
import Image from 'next/image'

const PlayIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
)

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
)

const videos = [
  { id: 'F_lreXzNlUI', title: 'Exterior Painting in Massachusetts', type: 'YouTube Short', thumbnail: 'maxresdefault' },
  { id: 'LkT_HLyKibY', title: 'Interior Painting in Massachusetts', type: 'YouTube Short', thumbnail: 'hqdefault' },
]

export default function HomeVideoSection() {
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; videoId: string; title: string }>({ isOpen: false, videoId: '', title: '' })

  const openVideoModal = (videoId: string, title: string) => {
    setVideoModal({ isOpen: true, videoId, title })
  }

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, videoId: '', title: '' })
  }

  return (
    <>
      {/* Video Section - RS Style Dark */}
      <section className="section video-section-rs">
        <div className="container">
          <div className="section-header">
            <h2>See Our Work in Action</h2>
            <p>Watch our expert team tackle painting projects across Massachusetts.</p>
          </div>

          <div className="video-grid-rs">
            {videos.map((video, index) => (
              <button
                key={index}
                onClick={() => openVideoModal(video.id, video.title)}
                className="video-card-rs"
                type="button"
                aria-label={`Play video: ${video.title}`}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/${video.thumbnail}.jpg`}
                  alt={video.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className="video-card-rs-overlay">
                  <div className="video-card-rs-play">
                    <PlayIcon size={20} />
                  </div>
                  <h3>{video.title}</h3>
                  <span>
                    <PlayIcon size={12} />
                    {video.type}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="video-section-cta">
            <a
              href="https://www.youtube.com/@JHPaintingServices-br9wh"
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
                src={`https://www.youtube.com/embed/${videoModal.videoId}?autoplay=1&rel=0`}
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
