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

import dynamic from 'next/dynamic'
import { CITY_COUNT, getCityBySlug, cities, normalizeCitySlug } from '@/app/data/cities'
import { getCityContent, generateUniqueCityContent } from '@/app/data/cityContent'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import ReviewsSection from '@/app/components/ReviewsSection'
import CityProof from '@/app/components/CityProof'
import CityVideo from '@/app/components/CityVideo'
import CityLocalBrief from '@/app/components/CityLocalBrief'
import LazyHeroForm from '@/app/components/LazyHeroForm'
import RelatedCities from '@/app/components/RelatedCities'
import { BUSINESS, FORM_IDS, STATS } from '@/lib/constants'
import CapacityNotice from '@/app/components/CapacityNotice'

// Dynamic imports for below-fold heavy client components (code splitting)
const BeforeAfterGrid = dynamic(() => import('@/app/components/BeforeAfterGrid'))
const FAQAccordion = dynamic(() => import('@/app/components/FAQAccordion'))

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
        "@id": `https://jhpaintingservices.com/massachusetts/${citySlug}#service`,
        "name": `Painting Services in ${cityName}, MA`,
        "description": `Professional painting services in ${cityName}, Massachusetts. Expert interior & exterior painting, cabinet refinishing. Licensed & insured painters serving ${cityName} and ${countyName}.`,
        "url": `https://jhpaintingservices.com/massachusetts/${citySlug}`,
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
            "name": "Massachusetts",
            "item": "https://jhpaintingservices.com/massachusetts"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${cityName} Painters`,
            "item": `https://jhpaintingservices.com/massachusetts/${citySlug}`
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
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg', alt: 'Historic Renewal: Waltham Church interior transformation by JH Painting', category: 'Waltham Church' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Historic Renewal: Waltham Church exterior transformation by JH Painting', category: 'Waltham Church' },
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
    beforeAlt: 'Waltham Church interior before historic renewal by JH Painting',
    afterAlt: 'Waltham Church interior after incredible transformation by JH Painting'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23bb3443ab4.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg',
    beforeAlt: 'Waltham Church exterior before historic renewal painting',
    afterAlt: 'Waltham Church exterior after incredible transformation by JH Painting'
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
  { slug: 'cabinet-painting', name: 'Cabinet Painting', icon: PaintBucketIcon, desc: 'Transform dated cabinets without the replacement hassle. Factory-smooth spray finish on kitchen & bathroom cabinets. Done in 5-7 days.' },
  { slug: 'commercial-painting', name: 'Commercial Painting', icon: Building2Icon, desc: 'Offices, retail, restaurants & medical facilities. After-hours & weekend scheduling available to minimize business disruption.' },
  { slug: 'residential-painting', name: 'Residential Painting', icon: HomeIcon, desc: 'Complete home painting solutions - interior & exterior. Single rooms to whole-house transformations with expert color consultation included.' },
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
            quality={60}
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
                  background: '#CC0000',
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

              {/*
                H1 de-superlative-ized (Task 6). Was "#1 Painter Contractor in
                {city}, MA" - Google penalises unverifiable rank claims, and
                we'd lose the rich-snippet rating eligibility if the H1
                contradicts the AggregateRating ("we say #1 but rating is 5.0
                with 40 reviews - by whose ranking?").
              */}
              <h1 className="hero-title" style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: '800',
                color: '#fff',
                lineHeight: '1.05',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}>
                <span className="hero-title-highlight">Exterior &amp; Interior</span><br />
                <span className="hero-title-highlight">Painters</span> <span className="hero-title-in">in</span><br />
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
                  background: '#CC0000',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 10px 40px rgba(204, 0, 0, 0.4)',
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
                  Get Your Free Estimate
                  <ChevronRightIcon size={20} />
                </a>
              </div>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { icon: ShieldIcon, text: 'Licensed & Insured' },
                  { icon: ClockIcon, text: '24-48 Hour Response' },
                  { icon: AwardIcon, text: '40+ 5-Star Google Reviews' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                    <span style={{ color: '#CC0000' }}><item.icon size={18} /></span>
                    <span style={{ fontSize: '0.9375rem', fontWeight: '500' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form Card - Same as homepage */}
            <div id="quote-form" className="hero-form-card">
              <CapacityNotice />
              <LazyHeroForm
                className="hero-form-iframe"
                src="https://api.leadconnectorhq.com/widget/form/gmVSZsO5e3S0pbXmmnPn"
                title={`Get Your Free Painting Estimate in ${city.name}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Bar */}
      <div className="google-reviews-bar">
        <div className="container">
          <div className="google-reviews-bar-content">
            <svg className="google-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Google Reviews</span>
            <div className="stars" aria-hidden="true">
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
              <StarIcon size={16} fill="currentColor" />
            </div>
            <span className="rating">5</span>
            {/* aria-label removed: it did not contain the visible words "See
                Our Reviews", so voice control could not activate the link
                (WCAG 2.5.3 Label in Name). The extra context is appended as
                screen-reader-only text instead. */}
            <a href="https://g.page/r/Cb984Z3qm9PsEAE/review" target="_blank" rel="noopener noreferrer">
              See Our Reviews<span className="sr-only"> on Google, rated 5 out of 5 stars</span>
              <ChevronRightIcon size={14} />
            </a>
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
              { value: STATS.projectsLabel, label: 'Projects Completed' },
              { value: '5.0', label: 'Google Rating' },
              { value: `${CITY_COUNT}+`, label: 'Cities Served' },
              { value: '100%', label: 'Satisfaction' }
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#CC0000' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
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
              return (
              <Link
                key={idx}
                href={`/massachusetts/${citySlug}/${service.slug}`}
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
                  quality={75}
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
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem' }}>Like what you see? Let&apos;s do the same for your home.</p>
            <a href="tel:+15086908886" className="city-cta-btn">
              <PhoneIcon size={20} />
              Get Your Free Estimate
            </a>
          </div>
        </div>
      </section>

      {/* O que esta pagina sabe sobre ESTA cidade - bairros, pontos de
          referencia, CEPs, distancia e vizinhas reais, todos vindos de
          cities.ts. Ver o cabecalho de CityLocalBrief.tsx para a medicao que
          motivou isto. */}
      <CityLocalBrief city={city} />

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
              Talk to a Painting Expert
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="city-cta-section">
        <div className="city-cta-pattern" />
        <div className="container">
          <div className="city-cta-content">
            <h2 className="city-cta-title">
              Your {city.name} Home Deserves the Best - Let&apos;s Talk
            </h2>
            <p className="city-cta-subtitle">
              Licensed, $2M insured & 5-star rated. Estimates scheduled within 24-48 hours. No obligation.
            </p>
            <div className="city-cta-buttons">
              <a href="tel:+15086908886" className="city-cta-btn-white">
                <PhoneIcon size={24} />
                (508) 690-8886
              </a>
              <a href="#quote-form" className="city-cta-btn-glass">
                <MailIcon size={24} />
                Get Your Free Estimate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Aqui existia uma grade que linkava as 117 cidades a partir de TODA
          pagina de cidade: 117 x 117, quase 14 mil links identicos. Isso
          repartia o peso interno igualmente entre todas e nao dizia nada ao
          Google sobre quais paginas importam, alem de deixar o grafo de links
          de cada cidade indistinguivel do das outras 116.

          O RelatedCities logo abaixo ja faz o trabalho certo: as cidades da
          mesma regiao, que sao as que um morador de fato consideraria, mais o
          hub da regiao. E /massachusetts continua listando as 117, entao
          nenhuma cidade fica orfa. */}

      <RelatedCities citySlug={citySlug} cityName={city.name} />
      </main>

      {/* First-hand proof: renders only when we hold real photographs from
          this town. See app/data/projects.ts. */}
      <CityProof citySlug={city.slug} cityName={city.name} state={city.state ?? 'MA'} />
      <CityVideo citySlug={city.slug} cityName={city.name} state={city.state ?? 'MA'} />

      <ReviewsSection />
      <Footer />
    </>
  )
}
