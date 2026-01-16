'use client'

import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import {
  Phone, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play,
  ChevronRight, Users, Heart, Sparkles
} from 'lucide-react'
import { getCityBySlug, cities } from '@/app/data/cities'
import { cityContentMap } from '@/app/data/cityContent'
import BeforeAfterSlider from '@/app/components/BeforeAfterSlider'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { BUSINESS, VIDEOS, FORM_IDS } from '@/lib/constants'
import LazyIframe from '@/app/components/LazyIframe'

interface Props {
  params: {
    city: string
    service: string
  }
}

// Generate Schema JSON-LD for city+service pages
function generateCityServiceSchema(cityName: string, serviceName: string, serviceSlug: string, citySlug: string, countyName: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://jhpaintingservices.com/cities/${citySlug}/${serviceSlug}#service`,
        "name": `${serviceName} in ${cityName}, MA`,
        "serviceType": serviceName,
        "description": `Professional ${serviceName.toLowerCase()} services in ${cityName}, ${countyName}, Massachusetts. Expert painters, premium materials, licensed & insured. Free estimates available.`,
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://jhpaintingservices.com/#localbusiness",
          "name": "JH Painting Services",
          "telephone": "+1-508-690-8886",
          "email": "contact@jhpaintingservices.com",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": cityName,
            "addressRegion": "MA",
            "addressCountry": "US"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "47",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        "areaServed": {
          "@type": "City",
          "name": cityName,
          "containedInPlace": {
            "@type": "State",
            "name": "Massachusetts"
          }
        },
        "url": `https://jhpaintingservices.com/cities/${citySlug}/${serviceSlug}`,
        "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jhpaintingservices.com" },
          { "@type": "ListItem", "position": 2, "name": serviceName, "item": `https://jhpaintingservices.com/services/${serviceSlug}` },
          { "@type": "ListItem", "position": 3, "name": `${cityName}, MA`, "item": `https://jhpaintingservices.com/cities/${citySlug}/${serviceSlug}` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How much does ${serviceName.toLowerCase()} cost in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${serviceName} costs in ${cityName}, MA vary based on project size, preparation needed, and paint quality. Interior painting typically ranges from $2-$6 per sq ft, exterior from $3-$7 per sq ft. Contact JH Painting at (508) 690-8886 for a free, accurate quote for your ${cityName} project.`
            }
          },
          {
            "@type": "Question",
            "name": `Are you licensed for ${serviceName.toLowerCase()} in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes! JH Painting Services is fully licensed and insured to provide ${serviceName.toLowerCase()} in ${cityName} and throughout Massachusetts. We carry $1 million in liability coverage and workers' compensation insurance for all employees.`
            }
          },
          {
            "@type": "Question",
            "name": `Do you offer free estimates for ${serviceName.toLowerCase()} in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Absolutely! We provide free, no-obligation estimates for all ${serviceName.toLowerCase()} projects in ${cityName}. Call (508) 690-8886 or fill out our online form to schedule your free consultation. We typically respond within 24 hours.`
            }
          },
          {
            "@type": "Question",
            "name": `How long does ${serviceName.toLowerCase()} take in ${cityName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Project timelines vary based on scope. A single room typically takes 1-2 days. A full interior takes 4-7 days. Exterior painting for an average ${cityName} home takes 5-10 days depending on weather and prep work. We provide accurate timelines in our estimates.`
            }
          },
          {
            "@type": "Question",
            "name": "What paint brands do you use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We exclusively use premium paints from Sherwin-Williams and Benjamin Moore. These industry-leading brands offer superior coverage, durability, and color retention. For exteriors, we use paints specifically formulated to withstand Massachusetts' harsh winters and humid summers."
            }
          }
        ]
      }
    ]
  }
}

const servicesData: Record<string, {
  name: string
  title: string
  description: string
  heroImage: string
  painPoints: { title: string; desc: string; solution: string }[]
  offerings: string[]
}> = {
  'interior-painting': {
    name: 'Interior Painting',
    title: 'Professional Interior Painting',
    description: 'Transform your interior spaces with expert wall painting, ceiling painting, trim work, and color consultation.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    painPoints: [
      { title: 'Scuff Marks & Stains Everywhere?', desc: "Kids, pets, daily life—your walls show it all. Those marks and stains don't go away with cleaning.", solution: 'We prep, prime, and paint for a flawless finish' },
      { title: "Can't Pick the Right Color?", desc: "Thousands of paint colors, endless opinions—it's overwhelming. What if you choose wrong?", solution: 'Free expert color consultation included' },
      { title: 'Worried About the Mess?', desc: "Paint drips on floors, furniture covered in plastic for weeks—painting sounds like a nightmare.", solution: 'Meticulous prep and daily cleanup guaranteed' },
    ],
    offerings: ['Wall painting', 'Ceiling painting', 'Trim & baseboard painting', 'Door & frame painting', 'Accent walls', 'Drywall repair', 'Color consultation', 'Wallpaper removal'],
  },
  'exterior-painting': {
    name: 'Exterior Painting',
    title: 'Expert Exterior Painting',
    description: 'Protect and beautify your property exterior with premium weather-resistant paints and professional preparation.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    painPoints: [
      { title: 'Paint Peeling & Chipping?', desc: "New England weather is brutal on exteriors. Your home is exposed to harsh sun, rain, snow, and ice.", solution: 'Weather-resistant premium paints that last' },
      { title: 'Fading Colors Making Your Home Look Old?', desc: "UV rays fade paint faster than you think. Your once-vibrant home now looks tired and dated.", solution: 'UV-resistant paints that maintain color' },
      { title: 'Worried About Wood Rot?', desc: "Water damage leads to rot, which leads to expensive repairs. Proper prep is essential.", solution: 'Complete wood repair before painting' },
    ],
    offerings: ['Full exterior painting', 'Siding painting', 'Trim & fascia', 'Shutters & doors', 'Deck staining', 'Power washing', 'Wood repair', 'Caulking & sealing'],
  },
  'commercial-painting': {
    name: 'Commercial Painting',
    title: 'Commercial Painting Services',
    description: 'Professional painting services for businesses with minimal disruption and maximum results.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg',
    painPoints: [
      { title: 'Worried About Business Disruption?', desc: "Closing your business for painting means lost revenue and frustrated customers.", solution: 'Flexible scheduling, nights & weekends available' },
      { title: 'Need to Meet Tight Deadlines?', desc: "New tenant moving in? Grand opening coming up? Time is money in business.", solution: 'On-time completion guaranteed' },
      { title: 'Brand Consistency Important?', desc: "Your business colors need to be exact to maintain brand identity across locations.", solution: 'Precise color matching guaranteed' },
    ],
    offerings: ['Office painting', 'Retail stores', 'Restaurants', 'Warehouses', 'Medical facilities', 'Educational facilities', 'Multi-tenant buildings', 'Industrial spaces'],
  },
  'residential-painting': {
    name: 'Residential Painting',
    title: 'Residential Painting Services',
    description: 'Complete home painting solutions for interior and exterior projects of any size.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    painPoints: [
      { title: 'House Looking Tired & Dated?', desc: "Your home deserves to look its best. Faded, chipped, or outdated paint drags down your curb appeal.", solution: 'Complete transformation inside and out' },
      { title: 'Too Busy to Deal With Painting?', desc: "Between work, family, and life, who has time to coordinate a painting project?", solution: 'We handle everything from start to finish' },
      { title: 'Not Sure Where to Start?', desc: "Full house painting is overwhelming. What rooms first? What colors? What order?", solution: 'Expert project planning included' },
    ],
    offerings: ['Interior painting', 'Exterior painting', 'Whole house painting', 'Single room refresh', 'Accent walls', 'Trim work', 'Cabinet painting', 'Deck staining'],
  },
  'cabinet-painting': {
    name: 'Cabinet Painting',
    title: 'Cabinet Painting & Refinishing',
    description: 'Transform your kitchen cabinets for a fraction of replacement cost with our expert refinishing services.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg',
    painPoints: [
      { title: 'Kitchen Cabinets Looking Dated?', desc: "Those 90s oak cabinets are dragging your whole kitchen down. New cabinets cost $15,000+.", solution: 'Save 70% vs replacement with refinishing' },
      { title: 'Worn & Grimy Cabinet Finish?', desc: "Years of cooking grease, fingerprints, and wear make cabinets look terrible.", solution: 'Complete prep removes all buildup' },
      { title: 'Want White Cabinets But Worried About Durability?', desc: "White shows everything. Will the paint chip, peel, or yellow over time?", solution: 'Professional-grade finishes that last' },
    ],
    offerings: ['Cabinet painting', 'Cabinet refinishing', 'Door replacement', 'Hardware updates', 'Kitchen cabinets', 'Bathroom vanities', 'Built-in cabinets', 'Garage cabinets'],
  },
  'carpentry': {
    name: 'Carpentry',
    title: 'Professional Carpentry Services',
    description: 'Expert carpentry repairs for window frames, door frames, siding, decks, and trim work. Quality wood repairs before painting ensure lasting results.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    painPoints: [
      { title: 'Rotted Window Frames?', desc: "Water damage has turned your window frames soft and spongy. Painting over rot is just wasted money.", solution: 'Complete wood replacement before painting' },
      { title: 'Damaged Door Frames?', desc: "Kicked-in doors, water damage, or just age—damaged frames look terrible and compromise security.", solution: 'Expert frame repair and replacement' },
      { title: 'Deck Falling Apart?', desc: "Splintered boards, wobbly railings, and soft spots make your deck dangerous and ugly.", solution: 'Complete deck repair and restoration' },
    ],
    offerings: ['Window frame repair', 'Door frame repair', 'Siding repair', 'Deck repair', 'Railing repair', 'Trim & molding', 'Rotted wood replacement', 'Fascia & soffit repair'],
  },
  'power-washing': {
    name: 'Power Washing',
    title: 'Professional Power Washing Services',
    description: 'Restore your property\'s appearance with our professional power washing and pressure cleaning services for decks, driveways, siding, and more.',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp',
    painPoints: [
      { title: 'Driveway Covered in Stains?', desc: "Oil, rust, mold, and years of grime make your driveway an eyesore.", solution: 'Deep cleaning restores like-new appearance' },
      { title: 'Green Mold on Your Siding?', desc: "That green and black growth isn\'t just ugly—it\'s damaging your home.", solution: 'Safe soft washing removes mold completely' },
      { title: 'Deck Looking Gray & Weathered?', desc: "Your deck has lost its color and looks rough and uninviting.", solution: 'Power washing preps for staining/sealing' },
    ],
    offerings: ['Driveway cleaning', 'Sidewalk cleaning', 'Deck power washing', 'Siding cleaning', 'Fence cleaning', 'Patio cleaning', 'Pool deck cleaning', 'Concrete restoration'],
  },
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg', alt: 'Historic church restoration interior painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Historic church exterior painting', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Professional interior painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp', alt: 'Professional exterior painting', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp', alt: 'Deck staining and restoration', category: 'Deck' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Bedroom painting project', category: 'Interior' },
]

// Before/After transformation pairs
const beforeAfterPairs = [
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23ad3443ab5.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg',
    beforeAlt: 'Historic church interior before restoration',
    afterAlt: 'Historic church interior after professional restoration'
  },
  {
    before: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2f06a03db23bb3443ab4.webp',
    after: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg',
    beforeAlt: 'Historic church exterior before painting',
    afterAlt: 'Historic church exterior after professional painting'
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

const stats = [
  { number: '500+', label: 'Projects Completed' },
  { number: '15+', label: 'Years Experience' },
  { number: '100%', label: 'Satisfaction Rate' },
  { number: '117', label: 'Cities Served' }
]

const features = [
  { icon: Users, text: 'Family-Owned Business' },
  { icon: Heart, text: 'Customer-First Approach' },
  { icon: Shield, text: 'Fully Licensed & Insured' },
  { icon: Sparkles, text: 'Premium Quality Paints' }
]

export default function CityServicePage({ params }: Props) {
  const city = getCityBySlug(params.city)
  const service = servicesData[params.service as keyof typeof servicesData]
  const cityContent = cityContentMap[params.city]

  if (!city || !service) {
    notFound()
  }

  const cityServiceSchema = generateCityServiceSchema(city.name, service.name, params.service, params.city, city.county || 'Massachusetts')

  // Other services for this city
  const otherServices = Object.entries(servicesData)
    .filter(([slug]) => slug !== params.service)
    .slice(0, 4)

  return (
    <>
      {/* Schema JSON-LD */}
      <Script
        id={`city-service-schema-${params.city}-${params.service}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityServiceSchema) }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content">

        {/* Hero Section - VSL Style */}
        <section className="service-hero">
          <div className="service-hero-bg">
            <Image
              src={service.heroImage}
              alt={`${service.name} in ${city.name}, MA`}
              fill
              className="object-cover"
              priority
            />
            <div className="service-hero-overlay" />
          </div>

          <div className="container service-hero-content">
            <div className="service-hero-grid">
              {/* Hero Text */}
              <div>
                <div className="service-hero-badges">
                  <span className="service-badge-location">
                    <MapPin size={16} />
                    Serving {city.name}, MA
                  </span>
                  <span className="service-badge-rating">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    5.0 Rating
                  </span>
                </div>

                <h1 className="service-hero-title">
                  Professional{' '}
                  <span className="service-hero-title-accent">
                    {service.name}
                  </span>{' '}
                  in {city.name}, MA
                </h1>

                <p className="service-hero-desc">
                  {service.description} Trusted by {city.name} homeowners for quality craftsmanship, premium paints, and meticulous attention to detail.
                </p>

                <div className="service-hero-ctas">
                  <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-primary">
                    <Phone size={20} />
                    {BUSINESS.phone}
                  </a>
                  <a href="#quote-form" className="service-cta-secondary">
                    Get Free Estimate
                    <ChevronRight size={20} />
                  </a>
                </div>

                <div className="service-hero-features">
                  {[
                    { icon: Shield, text: 'Licensed & Insured' },
                    { icon: Award, text: 'Expert Craftsmen' },
                    { icon: Clock, text: 'On-Time Service' }
                  ].map((item, idx) => (
                    <div key={idx} className="service-hero-feature">
                      <item.icon size={18} />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Form Card */}
              <div id="quote-form" className="service-form-card">
                <div className="service-form-header">
                  <h2 className="service-form-title">Get Your Free Quote</h2>
                  <p className="service-form-subtitle">
                    {service.name} in {city.name}, MA • Fast response • No obligation
                  </p>
                </div>
                <LazyIframe
                  src={`https://api.leadconnectorhq.com/widget/form/${FORM_IDS.quote}`}
                  className="service-form-iframe"
                  title="Contact Form"
                  style={{ minHeight: '450px' }}
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
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span className="rating">5</span>
              <Link href="/#reviews">
                See Our Reviews
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <section className="service-stats-bar">
          <div className="container">
            <div className="service-stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="service-stat">
                  <div className="service-stat-number">{stat.number}</div>
                  <div className="service-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="service-section service-section-white">
          <div className="container">
            <div className="service-section-header">
              <h2 className="service-section-title">
                Common {service.name} Problems in {city.name}
              </h2>
              <p className="service-section-subtitle">
                {city.name} homeowners face unique challenges. We have solutions for each one.
              </p>
            </div>

            <div className="service-pain-grid">
              {service.painPoints.map((item, idx) => (
                <div key={idx} className="service-pain-card">
                  <h3 className="service-pain-title">{item.title}</h3>
                  <p className="service-pain-desc">{item.desc}</p>
                  <p className="service-pain-solution">
                    <CheckCircle2 size={18} />
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="service-section service-section-gray">
          <div className="container">
            <div className="service-section-header">
              <span className="service-section-badge">Our Services</span>
              <h2 className="service-section-title">{service.name} Services in {city.name}</h2>
              <p className="service-section-subtitle">
                Complete {service.name.toLowerCase()} solutions for your home or business
              </p>
            </div>

            <div className="service-offerings-grid">
              {service.offerings.map((offering, idx) => (
                <div key={idx} className="service-offering-item">
                  <CheckCircle2 size={20} />
                  <span>{offering}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="service-section service-section-white">
          <div className="container">
            <div className="service-section-header">
              <span className="service-section-badge">Our Work</span>
              <h2 className="service-section-title">Project Gallery</h2>
              <p className="service-section-subtitle">
                Beautiful transformations across Massachusetts
              </p>
            </div>

            <div className="service-gallery-grid">
              {galleryImages.map((image, idx) => (
                <div key={idx} className="service-gallery-item">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="service-gallery-overlay">
                    <div>
                      <span className="service-gallery-badge">{image.category}</span>
                      <p className="service-gallery-label">{image.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="before-after-section">
          <div className="container">
            <div className="section-header section-header-enhanced">
              <span className="section-eyebrow">See The Difference</span>
              <h2>Before & After Transformations</h2>
              <p>Drag the slider to see the amazing results we deliver for our {city.name} clients.</p>
            </div>

            <div className="before-after-grid">
              {beforeAfterPairs.map((pair, idx) => (
                <BeforeAfterSlider
                  key={idx}
                  beforeImage={pair.before}
                  afterImage={pair.after}
                  beforeAlt={pair.beforeAlt}
                  afterAlt={pair.afterAlt}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="service-section service-section-dark">
          <div className="container">
            <div className="service-section-header">
              <h2 className="service-section-title service-section-title-light">
                Watch Our Work in Action
              </h2>
              <p className="service-section-subtitle service-section-subtitle-light">
                See how we transform homes across Massachusetts
              </p>
            </div>

            <div className="service-video-grid">
              {VIDEOS.map((video, idx) => (
                <a
                  key={idx}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-video-card"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="service-video-overlay">
                    <div className="service-video-play">
                      <Play size={32} fill="#fff" color="#fff" />
                    </div>
                  </div>
                  <p className="service-video-title">{video.title}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="service-section service-section-white">
          <div className="container">
            <div className="service-about-grid">
              <div className="service-about-image-wrapper">
                <div className="service-about-image">
                  <Image
                    src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                    alt="Jafet Henrique - Owner of JH Painting Services in Massachusetts"
                    fill
                    loading="lazy"
                    className="object-cover"
                    style={{ objectPosition: 'top center' }}
                  />
                </div>
                <div className="service-about-experience">
                  <div className="service-about-experience-number">15+</div>
                  <div className="service-about-experience-label">Years Experience</div>
                </div>
              </div>

              <div className="service-about-content">
                <span className="service-section-badge">About Us</span>
                <h2>Meet Jafet Henrique, Your {city.name} {service.name} Expert</h2>
                <p>
                  Founded with a passion for perfection, JH Painting Services has been transforming homes across Massachusetts for over 15 years. Owner Jafet Henrique leads every project with dedication to quality and customer satisfaction.
                </p>
                <p>
                  We&apos;re proud to serve {city.name} and the surrounding communities. Our team understands the unique challenges of New England homes and delivers results that stand up to harsh weather conditions. From preparation to final inspection, we ensure every detail is perfect.
                </p>

                <div className="service-about-features">
                  {features.map((item, idx) => (
                    <div key={idx} className="service-about-feature">
                      <item.icon size={24} />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Services in This City */}
        <section className="service-section service-section-gray">
          <div className="container">
            <div className="service-section-header">
              <span className="service-section-badge">More Services</span>
              <h2 className="service-section-title">Other Services in {city.name}</h2>
              <p className="service-section-subtitle">
                Complete painting and home improvement solutions
              </p>
            </div>

            <div className="service-other-grid">
              {otherServices.map(([slug, svc]) => (
                <Link key={slug} href={`/cities/${params.city}/${slug}`} className="service-other-card">
                  <h3>{svc.name}</h3>
                  <p>{svc.description}</p>
                  <span className="service-other-link">
                    Learn More <ChevronRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="service-cta-red">
          <div className="container">
            <div className="service-cta-content">
              <h2 className="service-cta-title">Ready for Professional {service.name} in {city.name}?</h2>
              <p className="service-cta-subtitle">
                Get a free estimate today and see the JH Painting difference. Professional results, on time and on budget.
              </p>
              <div className="service-cta-buttons">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="service-cta-btn-white">
                  <Phone size={20} />
                  Call {BUSINESS.phone}
                </a>
                <a href="#quote-form" className="service-cta-btn-outline">
                  Request Free Quote
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
