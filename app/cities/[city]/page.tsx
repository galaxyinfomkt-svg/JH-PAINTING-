import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'

// Inline SVG icons - eliminates lucide-react bundle (saves ~50KB)
const PhoneIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)
PhoneIcon.displayName = 'PhoneIcon'

const MailIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)
MailIcon.displayName = 'MailIcon'

const MapPinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)
MapPinIcon.displayName = 'MapPinIcon'

const CheckIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
)
CheckIcon.displayName = 'CheckIcon'

const StarIcon = ({ size = 20, fill }: { size?: number; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
)
StarIcon.displayName = 'StarIcon'

const ClockIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
)
ClockIcon.displayName = 'ClockIcon'

const ShieldIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
)
ShieldIcon.displayName = 'ShieldIcon'

const AwardIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
)
AwardIcon.displayName = 'AwardIcon'

const PlayIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
)
PlayIcon.displayName = 'PlayIcon'

const ChevronRightIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
)
ChevronRightIcon.displayName = 'ChevronRightIcon'

const ChevronDownIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
)
ChevronDownIcon.displayName = 'ChevronDownIcon'

const UsersIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
)
UsersIcon.displayName = 'UsersIcon'

const HeartIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
)
HeartIcon.displayName = 'HeartIcon'

const SparklesIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
)
SparklesIcon.displayName = 'SparklesIcon'

const HomeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
)
HomeIcon.displayName = 'HomeIcon'

const Building2Icon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
)
Building2Icon.displayName = 'Building2Icon'

const PaintBucketIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></svg>
)
PaintBucketIcon.displayName = 'PaintBucketIcon'

const BrushIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>
)
BrushIcon.displayName = 'BrushIcon'

const DollarIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
)
DollarIcon.displayName = 'DollarIcon'

const HammerIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/><path d="m18.7 5.3-7.3 7.3a1 1 0 0 0 0 1.4l.3.3a1 1 0 0 0 1.4 0l7.3-7.3a1 1 0 0 0 0-1.4l-.3-.3a1 1 0 0 0-1.4 0z"/><path d="m9.8 4.2 5.4 5.4"/><path d="M10.3 2.5c.7-.7 1.9-.7 2.6 0l.8.8c.7.7.7 1.9 0 2.6l-2.6-2.6a1.8 1.8 0 0 1 0-2.6"/></svg>
)
HammerIcon.displayName = 'HammerIcon'

const DropletsIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 14.94c1.32 0 2.4-1.1 2.4-2.43 0-.7-.34-1.36-1.03-1.92s-1.23-1.15-1.37-1.89c-.17.87-.69 1.7-1.37 2.26s-1.03 1.24-1.03 1.55c0 1.34 1.08 2.43 2.4 2.43z"/><path d="M17 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S17.29 6.75 17 5.3c-.29 1.45-1.14 2.84-2.29 3.76S13 11.1 13 12.25c0 2.22 1.8 4.05 4 4.05z"/></svg>
)
DropletsIcon.displayName = 'DropletsIcon'

import { getCityBySlug, cities, getCitySlugWithState } from '@/app/data/cities'
import { getCityContent, generateUniqueCityContent } from '@/app/data/cityContent'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import LazyIframe from '@/app/components/LazyIframe'
import LazyHeroForm from '@/app/components/LazyHeroForm'
import BeforeAfterGrid from '@/app/components/BeforeAfterGrid'
import FAQAccordion from '@/app/components/FAQAccordion'
import { BUSINESS, FORM_IDS } from '@/lib/constants'

interface Props {
  params: Promise<{ city: string }>
}

// Generate Schema JSON-LD for the city page
// Uses Service type referencing main organization - NOT a false LocalBusiness per city
function generateCitySchema(
  cityName: string,
  countyName: string,
  citySlug: string,
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // Reference the main organization from root layout
      {
        "@type": "Service",
        "@id": `https://jhpaintingservices.com/cities/${citySlug}#service`,
        "name": `Painting Services in ${cityName}, MA`,
        "description": `Professional painting services in ${cityName}, Massachusetts. Expert interior & exterior painting, cabinet refinishing. Licensed & insured painters serving ${cityName} and ${countyName}.`,
        "url": `https://jhpaintingservices.com/cities/${citySlug}`,
        "provider": {
          "@id": "https://jhpaintingservices.com/#organization"
        },
        "areaServed": {
          "@type": "City",
          "name": cityName,
          "containedInPlace": {
            "@type": "State",
            "name": "Massachusetts"
          }
        },
        "serviceType": "House Painting",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `Painting Services in ${cityName}`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Interior Painting in ${cityName}`,
                "description": `Professional interior painting services in ${cityName}, MA`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Exterior Painting in ${cityName}`,
                "description": `Professional exterior house painting in ${cityName}, MA`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Cabinet Painting in ${cityName}`,
                "description": `Kitchen cabinet refinishing in ${cityName}, MA`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Commercial Painting in ${cityName}`,
                "description": `Commercial painting services in ${cityName}, MA`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Carpentry Services in ${cityName}`,
                "description": `Professional carpentry and wood repairs in ${cityName}, MA`
              }
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://jhpaintingservices.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Service Areas",
            "item": "https://jhpaintingservices.com/cities"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${cityName} Painters`,
            "item": `https://jhpaintingservices.com/cities/${citySlug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  }
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg', alt: 'Historic church restoration interior painting in Waltham MA', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Historic church exterior painting in Waltham MA', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp', alt: 'Professional exterior house painting services in Massachusetts', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp', alt: 'Deck staining and power washing services in Massachusetts', category: 'Deck' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Bedroom interior painting services in MA by JH Painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Professional interior painting contractors serving Massachusetts', category: 'Interior' },
]

// Before/After transformation pairs
const beforeAfterPairs = [
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23ad3443ab5.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg',
    beforeAlt: 'Historic church interior before restoration in Waltham MA',
    afterAlt: 'Historic church interior after professional restoration in Waltham MA'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23bb3443ab4.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg',
    beforeAlt: 'Historic church exterior before painting in Waltham MA',
    afterAlt: 'Historic church exterior after professional painting in Waltham MA'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac7eb2da7db4eacd6a2.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp',
    beforeAlt: 'Residential exterior before painting',
    afterAlt: 'Residential exterior after professional painting'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a30277f301b94ac7227dc.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp',
    beforeAlt: 'Deck before power washing and staining',
    afterAlt: 'Deck after professional power washing and staining'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a30274e42b930842eea35.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a3027a03db26c93445285.webp',
    beforeAlt: 'Staircase before refinishing',
    afterAlt: 'Staircase after professional refinishing'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a39f37b4d1e5cbf3c1272.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a39f38441b1a824eef7d0.webp',
    beforeAlt: 'House exterior before painting',
    afterAlt: 'House exterior after professional painting'
  }
]

const videos = [
  { id: 'F_lreXzNlUI', title: 'Exterior Painting in Massachusetts', type: 'YouTube Short' },
  { id: 'LkT_HLyKibY', title: 'Interior Painting in Massachusetts', type: 'YouTube Short' },
]

// Use all cities from the actual cities list
const footerCities = cities.map(c => c.name)

const servicesList = [
  { slug: 'interior-painting', name: 'Interior Painting', icon: BrushIcon, desc: 'Walls, ceilings, trim, doors & accent walls. Premium Benjamin Moore & Sherwin-Williams paints with meticulous prep for flawless results that last 10+ years.' },
  { slug: 'exterior-painting', name: 'Exterior Painting', icon: HomeIcon, desc: 'Complete exterior protection against New England weather. Siding, trim, shutters, doors & decks with weather-resistant paints that withstand harsh winters.' },
  { slug: 'cabinet-painting', name: 'Cabinet Painting', icon: PaintBucketIcon, desc: 'Transform dated cabinets for 70% less than replacement. Factory-smooth spray finish on kitchen & bathroom cabinets. Done in 5-7 days.' },
  { slug: 'commercial-painting', name: 'Commercial Painting', icon: Building2Icon, desc: 'Offices, retail, restaurants & medical facilities. After-hours & weekend scheduling available to minimize business disruption.' },
  { slug: 'residential-painting', name: 'Residential Painting', icon: HomeIcon, desc: 'Complete home painting solutions — interior & exterior. Single rooms to whole-house transformations with expert color consultation included.' },
  { slug: 'carpentry', name: 'Carpentry', icon: HammerIcon, desc: 'Wood rot repair, window & door frames, trim, siding & deck restoration. Expert carpentry before painting ensures lasting results.' },
  { slug: 'power-washing', name: 'Power Washing', icon: DropletsIcon, desc: 'Driveways, siding, decks, patios & fences. Remove years of dirt, mold & grime. Essential prep before any exterior painting project.' },
]

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  // Generate unique content using city data (not just slug)
  // This creates truly unique content for each city based on its specific data
  const cityContent = city
    ? generateUniqueCityContent(
        city.name,
        city.slug,
        city.county,
        city.population,
        city.landmarks,
        city.neighborhoods,
        city.distance
      )
    : getCityContent(citySlug)

  if (!city) {
    notFound()
  }

  const citySchema = generateCitySchema(
    city.name,
    city.county || 'Massachusetts',
    citySlug,
    cityContent.faq
  )

  return (
    <>
      {/* Schema JSON-LD for SEO */}
      <Script
        id={`city-schema-${citySlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(citySchema)
        }}
      />

      {/* Header with City Name */}
      <Header cityName={city.name} />

      {/* Main Content */}
      <main id="main-content">

      {/* Luxury Hero Section */}
      <section className="city-page-hero">
        <div className="city-page-hero-bg">
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
            alt={`Professional Painting Services in ${city.name}, Massachusetts`}
            fill
            priority
            sizes="100vw"
            quality={75}
            style={{ objectFit: 'cover' }}
          />
          <div className="city-page-hero-overlay" />
        </div>

        <div className="container city-page-hero-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Hero Text */}
            <div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <MapPinIcon size={16} />
                  {city.name}, Massachusetts
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #D20404 0%, #A80303 100%)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  <StarIcon size={14} fill="currentColor" />
                  <StarIcon size={14} fill="currentColor" />
                  <StarIcon size={14} fill="currentColor" />
                  <StarIcon size={14} fill="currentColor" />
                  <StarIcon size={14} fill="currentColor" />
                  5.0
                </span>
              </div>

              <h1 className="hero-title" style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '800',
                color: '#fff',
                lineHeight: '1.05',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}>
                <span className="hero-title-number">#1</span> <span className="hero-title-highlight">Painter</span><br />
                <span className="hero-title-highlight">Contractor</span> <span className="hero-title-in">in</span><br />
                <span className="hero-title-city">{city.name}, MA</span>
              </h1>

              <p className="hero-cities" style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                lineHeight: '1.5',
                marginBottom: '1rem',
                fontWeight: '500'
              }}>
                Interior & Exterior Painting<br />
                Cabinet Refinishing & More
              </p>
              <p className="hero-description" style={{
                fontSize: '1.0625rem',
                color: '#fff',
                lineHeight: '1.7',
                marginBottom: '2rem',
                maxWidth: '600px'
              }}>
                {`Professional painters in ${city.name}, MA. Premium Benjamin Moore & Sherwin-Williams paints. Licensed, $2M insured, 40+ 5-star reviews. FREE estimates!`}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <a href="tel:+15086908886" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #D20404 0%, #A80303 100%)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 10px 40px rgba(220, 38, 38, 0.4)',
                  transition: 'all 0.3s ease'
                }}>
                  <PhoneIcon size={20} />
                  (508) 690-8886
                </a>
                <a href="#quote-form" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}>
                  Get Free Estimate
                  <ChevronRightIcon size={20} />
                </a>
              </div>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { icon: ShieldIcon, text: 'Licensed & Insured' },
                  { icon: ClockIcon, text: 'Same Day Response' },
                  { icon: AwardIcon, text: '40+ 5-Star Google Reviews' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                    <span style={{ color: '#D20404' }}><item.icon size={18} /></span>
                    <span style={{ fontSize: '0.9375rem', fontWeight: '500' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form Card - Same as homepage */}
            <div id="quote-form" className="hero-form-card">
              <LazyHeroForm
                className="hero-form-iframe"
                src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                title="Contact Form"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Bar */}
      <div className="google-reviews-bar">
        <div className="container">
          <div className="google-reviews-bar-content">
            <svg className="google-icon" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Google Reviews</span>
            <div className="stars">
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
            </div>
            <span className="rating">5</span>
            <Link href="/#reviews">
              See Our Reviews
              <ChevronRightIcon size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Indicators Bar */}
      <section style={{ background: '#0F172A', padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { value: '200+', label: 'Projects Completed' },
              { value: '5.0', label: 'Google Rating' },
              { value: '114+', label: 'Cities Served' },
              { value: '100%', label: 'Satisfaction' }
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#D20404' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VSL Style Story Section */}
      <section className="vsl-intro-section">
        <div className="container">
          {/* Opening Hook */}
          <div className="vsl-hook">
            <div className="vsl-hook-badge">
              <MapPinIcon size={16} />
              <span>Local {city.name} Story</span>
            </div>
            <h2 className="vsl-hook-title">
              Why We <span className="vsl-highlight">Love</span> Painting Homes in {city.name}
            </h2>
            <p className="vsl-hook-subtitle">
              (And Why {city.name} Homeowners Keep Coming Back to Us)
            </p>
          </div>

          {/* Story Content with Visual Elements */}
          <div className="vsl-story-grid">
            {/* Left: Video */}
            <div className="vsl-media-wrapper">
              <div className="vsl-video-card">
                <a
                  href="https://www.youtube.com/watch?v=F_lreXzNlUI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vsl-video-link"
                >
                  <Image
                    src="https://img.youtube.com/vi/F_lreXzNlUI/maxresdefault.jpg"
                    alt={`JH Painting Services working in ${city.name}, MA`}
                    fill
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="vsl-video-overlay">
                    <div className="vsl-play-button">
                      <PlayIcon size={32} />
                    </div>
                    <span className="vsl-watch-text">Watch Our Work</span>
                  </div>
                </a>
              </div>
              <div className="vsl-video-caption">
                <StarIcon size={14} fill="#D20404" />
                <span>See why {city.name} homeowners trust us</span>
              </div>
            </div>

            {/* Right: Story Text */}
            <div className="vsl-story-content">
              <div className="vsl-story-text">
                <p className="vsl-lead-paragraph">
                  <span className="vsl-dropcap">W</span>hen you hire a painting contractor, you&apos;re not just getting paint on walls &mdash; you&apos;re trusting someone with your home, your biggest investment.
                </p>

                <p>
                  At JH Painting Services, we understand that {city.name} homeowners have high standards. Your home isn&apos;t just a building &mdash; it&apos;s where memories are made, families grow, and life happens. That&apos;s why we approach every project with the care and attention it deserves.
                </p>

                <div className="vsl-highlight-box">
                  <div className="vsl-highlight-icon">
                    <HeartIcon size={24} />
                  </div>
                  <p className="vsl-highlight-text">
                    <strong>Here&apos;s the thing:</strong> We don&apos;t just paint houses &mdash; we transform homes. And we take that responsibility seriously.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="vsl-quick-stats">
                <div className="vsl-stat">
                  <span className="vsl-stat-number">200+</span>
                  <span className="vsl-stat-label">Homes Painted</span>
                </div>
                <div className="vsl-stat">
                  <span className="vsl-stat-number">5.0</span>
                  <span className="vsl-stat-label">Google Rating</span>
                </div>
                <div className="vsl-stat">
                  <span className="vsl-stat-number">100%</span>
                  <span className="vsl-stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Curiosity Builder */}
          <div className="vsl-curiosity-section">
            <h3 className="vsl-curiosity-title">
              <SparklesIcon size={20} />
              What Makes Us Different?
            </h3>
            <div className="vsl-curiosity-grid">
              <div className="vsl-curiosity-card">
                <div className="vsl-curiosity-number">01</div>
                <h4>We&apos;re Your Neighbors</h4>
                <p>Based in Marlborough, we&apos;re not a faceless corporation &mdash; we&apos;re local contractors who live and work in your community.</p>
              </div>
              <div className="vsl-curiosity-card">
                <div className="vsl-curiosity-number">02</div>
                <h4>Premium Materials Only</h4>
                <p>We use only Sherwin-Williams and Benjamin Moore paints. Why? Because cheap paint means repainting in 3 years. Ours lasts 7-10+.</p>
              </div>
              <div className="vsl-curiosity-card">
                <div className="vsl-curiosity-number">03</div>
                <h4>No Surprises, Ever</h4>
                <p>The price we quote is the price you pay. No hidden fees, no &quot;we found more work&quot; excuses. Just honest, transparent pricing.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="vsl-cta-wrapper">
            <p className="vsl-cta-text">Ready to see what we can do for your {city.name} home?</p>
            <div className="vsl-cta-buttons">
              <a href="tel:+15086908886" className="vsl-cta-primary">
                <PhoneIcon size={20} />
                Call (508) 690-8886
              </a>
              <a href="#quote-form" className="vsl-cta-secondary">
                Get Free Estimate
                <ChevronRightIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services in City Section */}
      <section className="city-section city-section-white">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-red">
              Our Services in {city.name}
            </span>
            <h2 className="city-section-title">
              Professional Painting Services
            </h2>
            <p className="city-section-subtitle">
              Expert painting solutions tailored for {city.name} homes and businesses
            </p>
          </div>

          <div className="city-services-grid">
            {servicesList.map((service, idx) => {
              // Get proper city slug with state suffix for URL
              const citySlugForUrl = citySlug.endsWith('-ma') || citySlug.endsWith('-ri')
                ? citySlug
                : getCitySlugWithState(citySlug.replace(/-ma$/, '').replace(/-ri$/, ''))
              return (
              <Link
                key={idx}
                href={`/cities/${citySlugForUrl}/${service.slug}`}
                className="city-service-card"
              >
                <div className="city-service-icon" style={{ color: '#fff' }}>
                  <service.icon size={32} />
                </div>
                <h3 className="city-service-title">
                  {service.name} in {city.name}
                </h3>
                <p className="city-service-desc">
                  {service.desc}
                </p>
                <span className="city-service-link">
                  {service.name} in {city.name} <ChevronRightIcon size={18} />
                </span>
              </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="city-section city-section-dark">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-dark">
              Our Portfolio
            </span>
            <h2 className="city-section-title">
              {city.name} Project Gallery
            </h2>
            <p className="city-section-subtitle">
              See the quality transformations we've delivered throughout {city.name} and Massachusetts
            </p>
          </div>

          <div className="city-gallery-grid">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="city-gallery-item">
                <Image
                  src={img.src}
                  alt={`${img.alt} - ${city.name}, MA`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className="city-gallery-overlay">
                  <div>
                    <span className="city-gallery-category">
                      {img.category}
                    </span>
                    <p className="city-gallery-text">{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after Gallery */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem' }}>Like what you see?</p>
            <a href="tel:+15086908886" className="city-cta-btn">
              <PhoneIcon size={20} />
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="before-after-section">
        <div className="container">
          <div className="section-header section-header-enhanced">
            <span className="section-eyebrow">See The Difference</span>
            <h2>Before & After Transformations</h2>
            <p>Drag the slider to see the amazing results we deliver for our Massachusetts clients.</p>
          </div>

          <BeforeAfterGrid pairs={beforeAfterPairs.map(pair => ({
            before: pair.before,
            after: pair.after,
            beforeAlt: `${pair.beforeAlt} - ${city.name}, MA`,
            afterAlt: `${pair.afterAlt} - ${city.name}, MA`,
          }))} />
        </div>
      </section>

      {/* Video Section - Modern RS Style */}
      <section className="section video-section-rs">
        <div className="container">
          <div className="section-header">
            <h2>See Our Work in Action</h2>
            <p>Watch our expert team tackle painting projects across Massachusetts.</p>
          </div>

          <div className="video-grid-rs">
            {videos.map((video, idx) => (
              <a
                key={idx}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card-rs"
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={`${video.title} - ${city.name}, MA`}
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
              </a>
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

      {/* About Us Section */}
      <section className="city-section city-section-white">
        <div className="container">
          <div className="city-about-grid">
            {/* About Image */}
            <div className="city-about-image-wrapper">
              <div className="city-about-image">
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                  alt={`Jafet Henrique - Owner of JH Painting Services in ${city.name}, MA`}
                  width={600}
                  height={500}
                  loading="lazy"
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              </div>
              <div className="city-about-badge">
                <div className="city-about-badge-number">40+</div>
                <div className="city-about-badge-label">5-Star Google Reviews</div>
              </div>
            </div>

            {/* About Content */}
            <div className="city-about-content">
              <span className="city-badge city-badge-red">
                About JH Painting Services
              </span>
              <h2>
                Your Trusted {city.name} Painting Contractor
              </h2>
              <p>
                Founded by <strong>Jafet</strong>, JH Painting Services is a premier painting contractor based in Marlborough, Massachusetts.
                With years of hands-on experience, we've built our reputation on delivering exceptional craftsmanship,
                honest pricing, and reliable service to homeowners across {city.name} and all of {city.county}.
              </p>
              <p>
                We specialize in interior and exterior painting, using only premium materials designed to withstand
                Massachusetts weather. Our meticulous attention to detail ensures results that exceed expectations.
              </p>

              <div className="city-about-features">
                {[
                  { icon: ShieldIcon, title: 'Licensed & Insured' },
                  { icon: AwardIcon, title: 'Expert Craftsmen' },
                  { icon: UsersIcon, title: `Local ${city.name} Team` },
                  { icon: HeartIcon, title: '100% Satisfaction' }
                ].map((item, idx) => (
                  <div key={idx} className="city-about-feature">
                    <div className="city-about-feature-icon" style={{ color: '#D20404' }}>
                      <item.icon size={24} />
                    </div>
                    <span className="city-about-feature-text">{item.title}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+15086908886" className="city-cta-btn">
                <PhoneIcon size={20} />
                Call (508) 690-8886
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section - Expanded */}
      <section className="city-section city-section-gray">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-red">
              We Understand Your Frustrations
            </span>
            <h2 className="city-section-title">
              Tired of Painters Who Disappoint?
            </h2>
            <p className="city-section-subtitle">
              If you've hired painters before in {city.name}, you've probably experienced the frustration:
              contractors who show up late (or not at all), sloppy work that starts peeling within months,
              or that dreaded phone call about "unexpected costs." It's exhausting, and you deserve better.
            </p>
          </div>

          <div className="city-pain-grid" style={{ marginBottom: '4rem' }}>
            {[
              {
                problem: "Contractors who ghost you or show up whenever they feel like it",
                solution: "We confirm every appointment 24 hours in advance and arrive within a 30-minute window. Our crew shows up in uniform, ready to work. If we're ever running late (rare!), you'll get a call immediately.",
                icon: ClockIcon
              },
              {
                problem: "Cheap paint that peels, cracks, or fades within months",
                solution: "We use only premium Sherwin-Williams and Benjamin Moore paints rated to withstand Massachusetts winters and humid summers. Combined with our meticulous 5-step prep process, your paint job will look stunning for 7-10+ years.",
                icon: ShieldIcon
              },
              {
                problem: "Hidden fees, surprise costs, and bait-and-switch pricing",
                solution: "Our detailed written estimates itemize every cost upfront—labor, materials, prep work, everything. The price we quote is the price you pay. No surprises, no 'additional charges discovered during the project.'",
                icon: DollarIcon
              },
              {
                problem: "Messy crews who damage your furniture and leave chaos behind",
                solution: "We treat your home with respect. All furniture is carefully covered with drop cloths, floors are protected, and we clean up completely every day. You won't find paint splatter on your floors or handprints on your walls.",
                icon: HomeIcon
              },
              {
                problem: "Painters who cut corners when you're not watching",
                solution: "Our crews are trained craftsmen, not day laborers. We properly prep every surface (sanding, patching, priming), apply the right number of coats, and our crew lead inspects every job before we consider it complete.",
                icon: CheckIcon
              },
              {
                problem: "Companies that disappear after the check clears",
                solution: `We're a locally-owned ${city.name} area business with a reputation to protect. We stand behind every job with our satisfaction guarantee. If something isn't right, we'll fix it—no arguments, no excuses.`,
                icon: AwardIcon
              }
            ].map((item, idx) => (
              <div key={idx} className="city-pain-card">
                <div className="city-pain-icon" style={{ color: '#fff' }}>
                  <item.icon size={28} />
                </div>
                <h3 className="city-pain-problem">
                  "{item.problem}"
                </h3>
                <p className="city-pain-solution">
                  <strong>Our Promise:</strong> {item.solution}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial in Pain Points */}
          <div className="city-testimonial">
            <div className="city-testimonial-stars">
              {[1,2,3,4,5].map(i => <StarIcon key={i} size={24} fill="#D20404" />)}
            </div>
            <blockquote className="city-testimonial-quote">
              "After two bad experiences with other painters in {city.name}, I was skeptical. But JH Painting
              completely changed my mind. They showed up on time, kept my house spotless, and the quality
              is incredible. Three years later, it still looks brand new. I recommend them to everyone!"
            </blockquote>
            <div className="city-testimonial-author">
              — Sarah M., {city.name} Homeowner
            </div>
            <a href="tel:+15086908886" className="city-cta-btn" style={{ marginTop: '1.5rem' }}>
              <PhoneIcon size={18} />
              Get Your Free Estimate Today
            </a>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="city-section city-section-white">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-blue">
              Our Proven Process
            </span>
            <h2 className="city-section-title">
              How We Transform Your {city.name} Property
            </h2>
            <p className="city-section-subtitle">
              Every successful painting project follows a proven process. Here's exactly what happens when you choose JH Painting Services—no surprises, no guesswork, just professional results.
            </p>
          </div>

          <div className="city-process-grid">
            {[
              {
                step: '1',
                title: 'Free Consultation & Detailed Estimate',
                description: `We visit your ${city.name} property, discuss your vision, assess the scope of work, and provide a comprehensive written estimate. We'll explain every line item, answer your questions, and never pressure you to sign on the spot. Take your time—we're confident you'll choose us.`,
                duration: 'Same-day or next-day appointments available'
              },
              {
                step: '2',
                title: 'Color Consultation & Material Selection',
                description: "Not sure what color to choose? Our color consultants help you select the perfect palette for your space. We'll show you large samples on your actual walls so you can see how colors look in your lighting. We use only premium paints from Sherwin-Williams and Benjamin Moore.",
                duration: 'Included free with your project'
              },
              {
                step: '3',
                title: 'Professional Surface Preparation',
                description: "This is where cheap painters cut corners—and where we shine. We thoroughly clean all surfaces, fill cracks and holes, sand rough areas, caulk gaps, apply primer where needed, and mask off trim, floors, and fixtures. Proper prep is 70% of a great paint job.",
                duration: '1-2 days depending on project size'
              },
              {
                step: '4',
                title: 'Expert Paint Application',
                description: "Our skilled painters apply your chosen paint with precision, using the right techniques for each surface. We apply multiple coats as needed, maintain wet edges to prevent lap marks, and ensure consistent coverage. No drips, no missed spots, no brush marks.",
                duration: 'Varies by project scope'
              },
              {
                step: '5',
                title: 'Quality Inspection & Touch-Ups',
                description: "Before we consider any job complete, our crew lead performs a detailed inspection under multiple lighting conditions. We touch up any imperfections, ensure clean lines, and make sure every detail meets our high standards—and yours.",
                duration: 'Final walkthrough with you'
              },
              {
                step: '6',
                title: 'Complete Cleanup & Final Walkthrough',
                description: "We remove all protective coverings, clean up completely, and dispose of all materials properly. Then we walk through the finished project with you, ensuring your complete satisfaction. You won't pay until you're 100% happy.",
                duration: 'Same day as project completion'
              }
            ].map((process, idx) => (
              <div key={idx} className="city-process-card">
                <div className="city-process-number">
                  {process.step}
                </div>
                <div className="city-process-content">
                  <h3>{process.title}</h3>
                  <p>{process.description}</p>
                  <span className="city-process-duration">{process.duration}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after Process */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p className="city-section-subtitle" style={{ marginBottom: '1.5rem' }}>
              Ready to start your {city.name} painting project?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+15086908886" className="city-cta-btn">
                <PhoneIcon size={20} />
                Call (508) 690-8886
              </a>
              <a href="#quote-form" className="city-cta-btn-outline city-cta-btn-dark">
                Request Free Estimate
                <ChevronRightIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded FAQ Section */}
      <section className="city-section city-section-dark">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-dark">
              Frequently Asked Questions
            </span>
            <h2 className="city-section-title">
              Your {city.name} Painting Questions Answered
            </h2>
            <p className="city-section-subtitle">
              We believe in transparency. Here are answers to the questions {city.name} homeowners ask most often.
            </p>
          </div>

          <FAQAccordion faqs={cityContent.faq} className="city-faq-grid" />

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p className="city-section-subtitle" style={{ marginBottom: '1.5rem' }}>
              Have a question we didn't answer? We're here to help!
            </p>
            <a href="tel:+15086908886" className="city-cta-btn">
              <PhoneIcon size={20} />
              Call (508) 690-8886
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="city-section city-section-gray">
        <div className="container">
          <div className="city-section-header">
            <span className="city-badge city-badge-green">
              The JH Painting Difference
            </span>
            <h2 className="city-section-title">
              Why {city.name} Homeowners Choose JH Painting
            </h2>
            <p className="city-section-subtitle">
              With dozens of painting contractors in the {city.name} area, why do homeowners consistently choose us? Here's what sets JH Painting Services apart.
            </p>
          </div>

          <div className="city-why-grid">
            {[
              {
                title: 'Owner-Operated Quality',
                description: `Unlike large franchises where you never see the owner, Jafet personally oversees every ${city.name} project. You're not just another number—you're a neighbor. This hands-on approach ensures consistent quality and accountability that big companies simply can't match.`,
                icon: UsersIcon
              },
              {
                title: 'Trained Professional Crews',
                description: "Our painters aren't day laborers picked up from a parking lot. They're skilled craftsmen with years of experience, trained in our specific methods and quality standards. Every crew member is background-checked, drug-tested, and committed to excellence.",
                icon: AwardIcon
              },
              {
                title: 'Premium Materials Only',
                description: "We never cut costs on materials. We use top-tier Sherwin-Williams and Benjamin Moore paints, professional-grade primers, and quality tools. Better materials mean better coverage, richer colors, and a finish that lasts years longer than budget alternatives.",
                icon: ShieldIcon
              },
              {
                title: 'Meticulous Preparation',
                description: "Many painters rush through prep work—the part you don't see. We spend the necessary time properly preparing every surface because we know this invisible work determines how long your paint job lasts. Cutting corners here means peeling paint in months, not years.",
                icon: CheckIcon
              },
              {
                title: 'Clear Communication',
                description: `We keep you informed at every stage. You'll know exactly when we're arriving, what we're doing each day, and when we'll be finished. Questions? Concerns? Jafet is always available by phone. No wondering what's happening with your ${city.name} home.`,
                icon: PhoneIcon
              },
              {
                title: 'Respect for Your Home',
                description: "We treat every home like our own. Shoes come off or get covered, furniture is carefully protected, and we clean up completely every day. You shouldn't have to live in chaos while we work. When we leave, the only trace of our visit is your beautiful new paint.",
                icon: HeartIcon
              }
            ].map((item, idx) => (
              <div key={idx} className="city-why-card">
                <div className="city-why-icon" style={{ color: '#fff' }}>
                  <item.icon size={28} />
                </div>
                <h3 className="city-why-title">{item.title}</h3>
                <p className="city-why-desc">{item.description}</p>
              </div>
            ))}
          </div>

          {/* CTA after Why Choose Us */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="tel:+15086908886" className="city-cta-btn">
              <PhoneIcon size={20} />
              Call for Your Free Estimate
            </a>
          </div>
        </div>
      </section>

      {/* Local SEO Content Section */}
      <section className="city-seo-section">
        <div className="container">
          <div className="city-seo-content">
            <h2 className="city-seo-title">
              Professional Painting Services for {city.name}, Massachusetts Homes
            </h2>

            <div className="city-seo-text">
              <p>
                As a trusted painting contractor serving {city.name} and the greater {city.county} area, JH Painting Services understands the unique needs of Massachusetts homeowners. Our New England climate—with its harsh winters, humid summers, and dramatic temperature swings—demands painting solutions that go beyond what works in milder regions.
              </p>

              <p>
                {city.name} homes, whether historic properties or modern constructions, each present their own painting challenges. Older homes often have lead paint concerns, multiple layers of previous paint, and architectural details requiring careful attention. Newer homes may have different substrate materials and finishes. Our experienced crews have worked on all types of {city.name} properties and know exactly how to approach each situation.
              </p>

              <h3 className="city-seo-subtitle">
                Interior Painting in {city.name}
              </h3>
              <p>
                Transform your {city.name} home's interior with professional painting that enhances your living space. We paint living rooms, bedrooms, kitchens, bathrooms, hallways, ceilings, trim, and doors. Our interior services include complete color consultation, furniture protection, thorough surface preparation, premium paint application, and meticulous cleanup. Whether you're refreshing a single room or repainting your entire home, we deliver stunning results that last.
              </p>

              <h3 className="city-seo-subtitle">
                Exterior Painting in {city.name}
              </h3>
              <p>
                Protect your {city.name} home from the elements while boosting curb appeal with professional exterior painting. Massachusetts weather is tough on exterior surfaces—freeze-thaw cycles, snow, ice, rain, and intense summer sun all take their toll. We use premium exterior paints specifically formulated to withstand these conditions, properly prepare all surfaces, and apply the right products for each material type (wood siding, vinyl, stucco, brick, trim).
              </p>

              <h3 className="city-seo-subtitle">
                Cabinet Painting & Refinishing in {city.name}
              </h3>
              <p>
                Want to transform your {city.name} kitchen without the cost of new cabinets? Our cabinet painting service delivers a factory-finish look at a fraction of replacement cost. We properly prepare cabinet surfaces, apply primer and multiple coats of durable cabinet-specific paint, and reinstall hardware for a complete transformation. Most kitchen cabinet projects are completed in 5-7 days.
              </p>

              <h3 className="city-seo-subtitle">
                Commercial Painting Services in {city.name}
              </h3>
              <p>
                {city.name} businesses trust JH Painting for professional commercial painting that minimizes disruption to operations. We work around your schedule—evenings, weekends, or overnight—to complete projects without affecting your business. From offices and retail spaces to restaurants and medical facilities, we deliver commercial-quality results that enhance your professional image.
              </p>

              <h3 className="city-seo-subtitle">
                Carpentry Services in {city.name}
              </h3>
              <p>
                Before any paint touches your {city.name} home, underlying wood damage must be addressed. Our expert carpenters repair rotted window frames, damaged door frames, deteriorating trim, siding, and deck boards throughout {city.county || 'Massachusetts'}. Painting over rot is wasted money — we fix the foundation first so your paint job lasts for years. Licensed and insured for all carpentry work in {city.name}.
              </p>

              <h3 className="city-seo-subtitle">
                Power Washing Services in {city.name}
              </h3>
              <p>
                Restore your {city.name} property's curb appeal with professional power washing. We safely clean driveways, siding, decks, patios, fences, and walkways — removing years of dirt, mold, mildew, and algae. Power washing is essential preparation before any exterior painting project. Our team uses the right pressure and cleaning solutions for each surface to deliver dramatic results without damage.
              </p>

              <div className="city-seo-cta-box">
                <h3 className="city-seo-cta-title">
                  Ready to Get Started?
                </h3>
                <p className="city-seo-cta-text">
                  Join the hundreds of {city.name} homeowners who have trusted JH Painting Services to transform their properties. Call today for your free, no-obligation estimate.
                </p>
                <div className="city-seo-cta-buttons">
                  <a href="tel:+15086908886" className="city-cta-btn">
                    <PhoneIcon size={18} />
                    (508) 690-8886
                  </a>
                  <a href="#quote-form" className="city-cta-btn-outline">
                    Get Free Estimate
                    <ChevronRightIcon size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="city-cta-section">
        <div className="city-cta-pattern" />
        <div className="container">
          <div className="city-cta-content">
            <h2 className="city-cta-title">
              Ready to Transform Your {city.name} Property?
            </h2>
            <p className="city-cta-subtitle">
              Get a free, detailed estimate for your painting project today.
              No obligation, no pressure—just honest advice and transparent pricing.
            </p>
            <div className="city-cta-buttons">
              <a href="tel:+15086908886" className="city-cta-btn-white">
                <PhoneIcon size={24} />
                (508) 690-8886
              </a>
              <a href="#quote-form" className="city-cta-btn-glass">
                <MailIcon size={24} />
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="city-areas-section">
        <div className="container">
          <div className="city-areas-content">
            <div className="city-areas-header">
              <h2 className="city-areas-title">
                Serving 114+ Cities Across Massachusetts
              </h2>
              <p className="city-areas-subtitle">
                Professional painting services throughout the state
              </p>
            </div>

            <div className="city-areas-grid">
              {cities.map((cityItem, idx) => (
                <Link
                  key={idx}
                  href={`/cities/${getCitySlugWithState(cityItem.slug)}`}
                  className={`city-areas-link ${cityItem.name === city.name ? 'city-areas-link-active' : ''}`}
                >
                  {cityItem.name}
                </Link>
              ))}
              <Link href="/cities" className="city-areas-link-all">
                View All Cities <ChevronRightIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  )
}
