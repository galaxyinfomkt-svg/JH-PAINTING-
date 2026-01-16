'use client'

// Inline SVG icons to avoid loading entire lucide-react bundle
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
)

const YelpIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 0 1 1.596-.206 9.194 9.194 0 0 1 1.576 3.55 1.073 1.073 0 0 1-.906 1.161zm-1.67 5.89a9.134 9.134 0 0 1-2.618 2.612 1.073 1.073 0 0 1-1.413-.24l-2.905-4.31c-.564-.83.216-1.905 1.176-1.63l4.995 1.433a1.073 1.073 0 0 1 .765 2.135zm-8.698 1.273c-.528.8-1.707.424-1.728-.552l-.11-5.233a1.073 1.073 0 0 1 .647-1.024 9.134 9.134 0 0 1 3.612-.706 1.073 1.073 0 0 1 .485 1.413l-2.906 6.102zM6.4 9.89c-.832.566-1.908-.214-1.63-1.175l1.433-4.994A1.073 1.073 0 0 1 7.37 2.815a9.194 9.194 0 0 1 3.55 1.576 1.072 1.072 0 0 1-.206 1.596l-4.314 3.905zm.012 3.322l-.11 5.233c-.02.976-1.2 1.352-1.727.552L2.17 14.69a1.073 1.073 0 0 1 .485-1.413 9.134 9.134 0 0 1 3.612-.706 1.073 1.073 0 0 1 .647 1.024l-.502-.383z"/>
  </svg>
)

export default function FloatingSocial() {
  return (
    <div className="floating-social">
      <a
        href="https://www.facebook.com/profile.php?id=61564489391475"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-link facebook"
        aria-label="Follow us on Facebook"
      >
        <FacebookIcon />
      </a>
      <a
        href="https://www.instagram.com/jhpaintingservices_/"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-link instagram"
        aria-label="Follow us on Instagram"
      >
        <InstagramIcon />
      </a>
      <a
        href="https://www.yelp.com/biz/jh-painting-services-marlborough"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-link yelp"
        aria-label="See our Yelp reviews"
      >
        <YelpIcon />
      </a>
      <a
        href="https://www.youtube.com/@JHPaintingServices-br9wh"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-social-link youtube"
        aria-label="Watch us on YouTube"
      >
        <YoutubeIcon />
      </a>
    </div>
  )
}
