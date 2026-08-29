import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'About JH Painting Services | Marlborough, MA',
  description:
    'Who runs JH Painting Services, what we are licensed to do in Massachusetts, and the jobs we can show you. Based in Marlborough since 2018. Call (508) 690-8886.',
  path: '/about',
  ogImageAlt: 'Jafet Henrique, owner of JH Painting Services in Marlborough, Massachusetts',
  keywords: [
    'JH Painting Services owner',
    'painting contractor Marlborough MA',
    'licensed painter Massachusetts',
    'lead-safe renovation contractor Massachusetts',
    'home improvement contractor registration MA',
  ],
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
