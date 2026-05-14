import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'FREE Painting Quote MA | Same Day Response | (508) 690-8886',
  description:
    'Get your FREE painting estimate in 24 hours. Call (508) 690-8886 or fill out our quick form. We respond SAME DAY. Interior, exterior, cabinets. 40+ 5-star reviews. Licensed & $2M insured.',
  path: '/contact',
  ogImageAlt: 'Get FREE Painting Quote — JH Painting Services Massachusetts',
  keywords: [
    'free painting quote Massachusetts',
    'painting estimate MA',
    'painters near me free estimate',
    'painting quote same day',
    'contact painters MA',
    'painting contractors phone number',
    'free painting consultation',
    'get painting quote online',
    'painters Marlborough MA',
    'painting company contact Massachusetts',
  ],
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
