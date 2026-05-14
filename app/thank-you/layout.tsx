import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Thank You | JH Painting Services',
  description:
    'Thank you for contacting JH Painting Services. We will respond within 24 hours. Call (508) 690-8886 for immediate assistance.',
  path: '/thank-you',
  noIndex: true, // Confirmation page must stay out of the search index
})

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
