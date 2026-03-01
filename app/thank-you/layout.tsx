import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | JH Painting Services',
  description: 'Thank you for contacting JH Painting Services. We will respond within 24 hours. Call (508) 690-8886 for immediate assistance.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
