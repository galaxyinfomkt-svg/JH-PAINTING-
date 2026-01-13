import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You | JH Painting Services',
  description: 'Thank you for contacting JH Painting Services. We will get back to you within 24 hours with your free estimate.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
