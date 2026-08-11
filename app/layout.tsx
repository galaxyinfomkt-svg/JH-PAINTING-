import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FloatingButtons from './components/FloatingButtons'
import MobileStickyCTA from './components/MobileStickyCTA'
import DeferredScripts from './components/DeferredScripts'

// Optimize font loading - 'optional' prevents font from being render-blocking
// If font loads fast enough it's used, otherwise fallback is kept (no FOIT, no layout shift)
const inter = Inter({
  subsets: ['latin'],
  display: 'optional', // Eliminates ~210ms render-blocking font load
  variable: '--font-inter',
  weight: ['400', '700'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
  preload: true,
})

/**
 * Root layout metadata - STRICT site-wide defaults only.
 *
 * Page-level meta (title, description, robots, canonical, openGraph, twitter,
 * geo-targeting, Dublin Core) lives in each route's page.tsx or layout.tsx via
 * lib/seo.ts → generatePageMetadata(). Putting any of those here would
 * cause duplicate / conflicting tags on every route once Next.js merges
 * inherited metadata.
 *
 * Kept here:
 *   - metadataBase: required so relative og:url and canonical resolve correctly
 *   - title.template: applied when a child page provides just title; lets
 *     pages stay terse and the suffix come from one source of truth
 *   - title.default: the only title used if a route forgets to define its own
 *   - icons: favicon / apple-touch-icon (site-wide static asset)
 *   - authors / publisher / creator / category: site-wide org identity
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://jhpaintingservices.com'),
  title: {
    default: 'JH Painting Services',
    template: '%s',
  },
  applicationName: 'JH Painting Services',
  authors: [{ name: 'JH Painting Services' }],
  creator: 'JH Painting Services',
  publisher: 'JH Painting Services',
  category: 'Home Improvement',
  // icons: omitted on purpose - Next.js 15 detects `app/icon.png` and `app/apple-icon.png`
  // automatically and emits the correct <link rel="icon"> / <link rel="apple-touch-icon">
  // tags from those files. Adding a metadata.icons override would publish a duplicate link.
}

/**
 * Viewport / themeColor - Next.js 15 ships these as a SEPARATE export, no
 * longer nested under metadata. They are genuine site-wide UI defaults.
 */
export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

// Schema JSON-LD - Optimized for performance
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HousePainter", "HomeAndConstructionBusiness", "ProfessionalService", "GeneralContractor"],
      "@id": "https://jhpaintingservices.com/#organization",
      "additionalType": "https://en.wikipedia.org/wiki/House_painter_and_decorator",
      "mainEntityOfPage": { "@id": "https://jhpaintingservices.com/#webpage" },
      "name": "JH Painting Services",
      "legalName": "JH Painting Services LLC",
      "alternateName": ["JH Painting", "JH Painting Services Massachusetts", "JH Painting MA", "JH Painters"],
      "description": "Award-winning exterior and interior painting contractor serving Massachusetts since 2018. Specialist in exterior house painting with premium weather-resistant paints. Expert interior painting, cabinet refinishing, deck staining, and home improvement services. Licensed, $2M insured, EPA Lead-Safe certified. Serving 116 cities across Massachusetts including Boston, Worcester, Cambridge, Framingham, Natick, and all MetroWest communities.",
      "slogan": "Massachusetts' Exterior Painting Specialists Since 2018",
      "url": "https://jhpaintingservices.com",
      "telephone": "+1-508-690-8886",
      "email": "contact@jhpaintingservices.com",
      "foundingDate": "2018-07",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 5,
        "maxValue": 15
      },
      "founder": { "@id": "https://jhpaintingservices.com/#founder" },
      "logo": {
        "@type": "ImageObject",
        "url": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png",
        "width": 400,
        "height": 160
      },
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg",
      "priceRange": "$$",
      "currenciesAccepted": "USD",
      "paymentAccepted": ["Cash", "Check", "Credit Card", "Debit Card", "Zelle", "Venmo"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "346 Plantation St",
        "addressLocality": "Marlborough",
        "addressRegion": "MA",
        "postalCode": "01752",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 42.3459,
        "longitude": -71.5526
      },
      "hasMap": "https://maps.app.goo.gl/xWBv1UJdDezRaBej9",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "07:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "08:00",
          "closes": "16:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61564489391475",
        "https://www.instagram.com/jhpaintingservices_/",
        "https://www.youtube.com/@JHPaintingServices-br9wh",
        "https://maps.app.goo.gl/xWBv1UJdDezRaBej9",
        "https://www.yelp.com/biz/jh-painting-services-marlborough",
        "https://www.thumbtack.com/ma/marlborough/painters/jh-painting-services",
        "https://www.angi.com/companylist/us/ma/marlborough/jh-painting-services",
        "https://www.bbb.org/us/ma/marlborough/profile/painting-contractors/jh-painting-services",
        "https://nextdoor.com/pages/jh-painting-services-marlborough-ma",
        "https://www.houzz.com/professionals/painting/jh-painting-services"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-508-690-8886",
          "contactType": "customer service",
          "availableLanguage": ["English", "Portuguese", "Spanish"],
          "areaServed": "US-MA",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "07:00",
            "closes": "18:00"
          }
        },
        {
          "@type": "ContactPoint",
          "email": "contact@jhpaintingservices.com",
          "contactType": "sales"
        }
      ],
      "potentialAction": [
        {
          "@type": "OrderAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://jhpaintingservices.com/contact",
            "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
          },
          "result": {
            "@type": "Order",
            "name": "Free Painting Estimate"
          }
        },
        {
          "@type": "CommunicateAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "tel:+15086908886",
            "actionPlatform": "http://schema.org/MobileWebPlatform"
          }
        }
      ],
      "areaServed": {
        "@type": "State",
        "name": "Massachusetts",
        "containedInPlace": { "@type": "Country", "name": "United States" }
      },
      "serviceArea": [
        { "@type": "State", "name": "Massachusetts" },
        { "@type": "City", "name": "Boston", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Worcester", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Cambridge", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Marlborough", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Framingham", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Newton", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Natick", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Wellesley", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Lexington", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Concord", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Waltham", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Hudson", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Sudbury", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Shrewsbury", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Brookline", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Somerville", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Needham", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Westborough", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Hopkinton", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Southborough", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Acton", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Wayland", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Dover", "containedInPlace": { "@type": "State", "name": "Massachusetts" } },
        { "@type": "City", "name": "Medfield", "containedInPlace": { "@type": "State", "name": "Massachusetts" } }
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "license",
          "name": "Massachusetts Painting Contractor License",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Commonwealth of Massachusetts"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "certification",
          "name": "EPA Lead-Safe Certification",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Environmental Protection Agency"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "insurance",
          "name": "General Liability Insurance - $2,000,000 Coverage"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "insurance",
          "name": "Workers Compensation Insurance"
        }
      ],
      "knowsAbout": [
        "Interior Painting", "Exterior Painting", "House Painting", "Cabinet Painting",
        "Cabinet Refinishing", "Kitchen Cabinet Painting", "Commercial Painting",
        "Residential Painting", "Deck Staining", "Deck Building", "Fence Staining",
        "Pressure Washing", "Power Washing", "Drywall Repair", "Popcorn Ceiling Removal",
        "Wallpaper Removal", "Color Consultation", "Benjamin Moore Paints",
        "Sherwin-Williams Paints", "Lead Paint Removal", "EPA Lead-Safe Practices"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Painting Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exterior House Painting", "description": "Complete exterior house painting with power washing, surface prep, caulking, priming, and two coats of premium weather-resistant Benjamin Moore or Sherwin-Williams paint. 5-year warranty. Serving 116 Massachusetts cities.", "url": "https://jhpaintingservices.com/services/exterior-painting" }, "warranty": { "@type": "WarrantyPromise", "durationOfWarranty": { "@type": "QuantitativeValue", "value": 5, "unitCode": "ANN" }, "warrantyScope": "Covers peeling, blistering, cracking, and fading under normal weather conditions." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior Painting", "description": "Professional interior painting for walls, ceilings, trim, doors, and baseboards with premium low-VOC paints. 3-year warranty.", "url": "https://jhpaintingservices.com/services/interior-painting" }, "warranty": { "@type": "WarrantyPromise", "durationOfWarranty": { "@type": "QuantitativeValue", "value": 3, "unitCode": "ANN" }, "warrantyScope": "Covers peeling, blistering, and flaking under normal indoor conditions." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cabinet Refinishing", "description": "Kitchen cabinet painting and refinishing with a durable, factory-quality spray finish that revives cabinets without replacement.", "url": "https://jhpaintingservices.com/services/cabinet-painting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Painting", "description": "Professional painting for offices, retail, restaurants. After-hours scheduling available.", "url": "https://jhpaintingservices.com/services/commercial-painting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Deck Staining & Restoration", "description": "Professional deck staining, sealing, and restoration services for wood decks and fences.", "url": "https://jhpaintingservices.com/services/power-washing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Power Washing", "description": "Professional pressure washing for driveways, siding, decks, patios, and walkways.", "url": "https://jhpaintingservices.com/services/power-washing" } }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "ratingCount": "40",
        "reviewCount": "40",
        "bestRating": "5",
        "worstRating": "1"
      },
      // Sample reviews - every entry must be a REAL, attributable customer review.
      // The "Sarah M." entry was removed (was fabricated). Add new entries only
      // from verified Google reviews with full first name + last initial.
      "review": [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "John D." },
          "datePublished": "2024-10-22",
          "reviewBody": "We hired JH Painting for our exterior and couldn't be happier. Great communication and beautiful, lasting results!"
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Maria L." },
          "datePublished": "2025-01-10",
          "reviewBody": "Best painting company in Massachusetts! They refinished our kitchen cabinets and made them look brand new instead of replacing them. The attention to detail was incredible."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Michael R." },
          "datePublished": "2025-03-05",
          "reviewBody": "Hired JH Painting for a commercial office project in Worcester. They finished on time, kept the site clean, and the results exceeded our expectations. Very professional crew."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Emily C." },
          "datePublished": "2025-06-18",
          "reviewBody": "Jafet and his team painted our entire Victorian home exterior in Natick. They handled the lead paint safely and the house looks brand new. Couldn't recommend them more!"
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "David K." },
          "datePublished": "2025-09-12",
          "reviewBody": "Third time using JH Painting - they painted our deck, interior walls, and now our fence. Consistent quality every time. Truly the best painters in the MetroWest area."
        }
      ]
    },
    // FAQPage object moved to app/page.tsx - home-page-specific structured data.
    {
      "@type": "WebSite",
      "@id": "https://jhpaintingservices.com/#website",
      "url": "https://jhpaintingservices.com",
      "name": "JH Painting Services",
      "description": "Professional painting contractor serving 116 cities in Massachusetts. Interior & exterior painting, cabinet refinishing, commercial painting. Licensed, $2M insured, EPA Lead-Safe certified.",
      "publisher": {
        "@id": "https://jhpaintingservices.com/#organization"
      },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://jhpaintingservices.com/massachusetts?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    // WebPage object moved to app/page.tsx - home-page-specific structured data.
    {
      "@type": "Person",
      "@id": "https://jhpaintingservices.com/#founder",
      "name": "Jafet Henrique",
      "jobTitle": "Owner & Master Painter",
      "worksFor": { "@id": "https://jhpaintingservices.com/#organization" },
      "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp",
      "description": "Professional painter and business owner with 7+ years of experience in residential and commercial painting across Massachusetts. EPA Lead-Safe certified specialist.",
      "knowsAbout": [
        "Interior Painting", "Exterior Painting", "Cabinet Refinishing",
        "Commercial Painting", "Lead Paint Safety", "Benjamin Moore Paints",
        "Sherwin-Williams Paints", "Massachusetts Building Codes",
        "EPA Lead-Safe Practices", "Deck Staining", "Power Washing"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "certification",
          "name": "EPA Lead-Safe Certification",
          "recognizedBy": { "@type": "Organization", "name": "Environmental Protection Agency" }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "license",
          "name": "Massachusetts Painting Contractor License",
          "recognizedBy": { "@type": "Organization", "name": "Commonwealth of Massachusetts" }
        }
      ]
    },
    {
      "@type": "Service",
      "serviceType": "Exterior House Painting",
      "provider": { "@id": "https://jhpaintingservices.com/#organization" },
      "areaServed": { "@type": "State", "name": "Massachusetts" },
      "description": "Professional exterior house painting services across Massachusetts. Complete exterior painting with power washing, surface preparation, caulking, priming, and two coats of premium weather-resistant Benjamin Moore Aura or Sherwin-Williams Duration paint. 5-year warranty on all exterior work. Also offering interior painting, cabinet refinishing, and commercial painting. Licensed, $2M insured, EPA Lead-Safe certified. Call (508) 690-8886 for a free estimate.",
      "url": "https://jhpaintingservices.com/services/exterior-painting",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Professional Painting Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exterior House Painting", "url": "https://jhpaintingservices.com/services/exterior-painting" }, "description": "Complete exterior house painting with power washing, scraping, caulking, priming, and two coats of premium weather-resistant paint. 5-year warranty. Serving 116 cities in Massachusetts." },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior Painting", "url": "https://jhpaintingservices.com/services/interior-painting" }, "description": "Professional interior painting for walls, ceilings, trim, doors, baseboards. Premium low-VOC Benjamin Moore and Sherwin-Williams paints. 3-year warranty." },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cabinet Refinishing", "url": "https://jhpaintingservices.com/services/cabinet-painting" }, "description": "Kitchen cabinet painting and refinishing with factory-quality spray finish that revives cabinets without full replacement. Free estimates available." },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Painting", "url": "https://jhpaintingservices.com/services/commercial-painting" }, "description": "Professional painting for offices, retail, restaurants, warehouses. After-hours and weekend scheduling. Free estimates available." },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Carpentry & Trim Work", "url": "https://jhpaintingservices.com/services/carpentry" }, "description": "Expert carpentry, trim replacement, fascia repair, and wood rot repair. Free estimates available." },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Power Washing", "url": "https://jhpaintingservices.com/services/power-washing" }, "description": "Professional pressure washing for driveways, siding, decks, patios, walkways, and fences. Free estimates available." }
        ]
      }
    },
    {
      "@type": "ItemList",
      "@id": "https://jhpaintingservices.com/#sitelinks-services",
      "name": "Painting Services Offered by JH Painting Services",
      "description": "Primary service categories - anchors for Google to surface as sitelinks under the brand search result.",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "numberOfItems": 7,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Exterior Painting", "url": "https://jhpaintingservices.com/services/exterior-painting" },
        { "@type": "ListItem", "position": 2, "name": "Interior Painting", "url": "https://jhpaintingservices.com/services/interior-painting" },
        { "@type": "ListItem", "position": 3, "name": "Cabinet Refinishing", "url": "https://jhpaintingservices.com/services/cabinet-painting" },
        { "@type": "ListItem", "position": 4, "name": "Commercial Painting", "url": "https://jhpaintingservices.com/services/commercial-painting" },
        { "@type": "ListItem", "position": 5, "name": "Residential Painting", "url": "https://jhpaintingservices.com/services/residential-painting" },
        { "@type": "ListItem", "position": 6, "name": "Carpentry & Trim", "url": "https://jhpaintingservices.com/services/carpentry" },
        { "@type": "ListItem", "position": 7, "name": "Power Washing", "url": "https://jhpaintingservices.com/services/power-washing" }
      ]
    },
    {
      "@type": "ItemList",
      "@id": "https://jhpaintingservices.com/#sitelinks-cities",
      "name": "Cities Served by JH Painting Services in Massachusetts",
      "description": "Top service-area cities - secondary signal so Google can group city pages as a related sitelinks pack.",
      "numberOfItems": 12,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Marlborough, MA", "url": "https://jhpaintingservices.com/massachusetts/marlborough" },
        { "@type": "ListItem", "position": 2, "name": "Boston, MA", "url": "https://jhpaintingservices.com/massachusetts/boston" },
        { "@type": "ListItem", "position": 3, "name": "Worcester, MA", "url": "https://jhpaintingservices.com/massachusetts/worcester" },
        { "@type": "ListItem", "position": 4, "name": "Framingham, MA", "url": "https://jhpaintingservices.com/massachusetts/framingham" },
        { "@type": "ListItem", "position": 5, "name": "Natick, MA", "url": "https://jhpaintingservices.com/massachusetts/natick" },
        { "@type": "ListItem", "position": 6, "name": "Newton, MA", "url": "https://jhpaintingservices.com/massachusetts/newton" },
        { "@type": "ListItem", "position": 7, "name": "Wellesley, MA", "url": "https://jhpaintingservices.com/massachusetts/wellesley" },
        { "@type": "ListItem", "position": 8, "name": "Hudson, MA", "url": "https://jhpaintingservices.com/massachusetts/hudson" },
        { "@type": "ListItem", "position": 9, "name": "Southborough, MA", "url": "https://jhpaintingservices.com/massachusetts/southborough" },
        { "@type": "ListItem", "position": 10, "name": "Sudbury, MA", "url": "https://jhpaintingservices.com/massachusetts/sudbury" },
        { "@type": "ListItem", "position": 11, "name": "Westborough, MA", "url": "https://jhpaintingservices.com/massachusetts/westborough" },
        { "@type": "ListItem", "position": 12, "name": "Concord, MA", "url": "https://jhpaintingservices.com/massachusetts/concord" }
      ]
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://jhpaintingservices.com/#nav",
      "name": ["Home", "Services", "Projects", "Service Areas", "Blog", "Contact"],
      "url": [
        "https://jhpaintingservices.com",
        "https://jhpaintingservices.com/services",
        "https://jhpaintingservices.com/projects",
        "https://jhpaintingservices.com/massachusetts",
        "https://jhpaintingservices.com/blog",
        "https://jhpaintingservices.com/contact"
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Get Professional Painting Services from JH Painting",
      "description": "Our 5-step process from free consultation to final walkthrough ensures a perfect paint job every time.",
      "totalTime": "P5D",
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Free Consultation", "text": "Call (508) 690-8886 or fill out our online form. We discuss your project goals, timeline, and provide expert color recommendations." },
        { "@type": "HowToStep", "position": 2, "name": "Detailed Estimate", "text": "We visit your property and provide a clear, written estimate detailing the full scope of work. No surprises - just a straightforward plan." },
        { "@type": "HowToStep", "position": 3, "name": "Surface Preparation", "text": "Our team prepares all surfaces - patching drywall, sanding, priming, and protecting your furniture, floors, and landscaping." },
        { "@type": "HowToStep", "position": 4, "name": "Expert Painting", "text": "We apply two coats of premium Benjamin Moore or Sherwin-Williams paint with precision cutting-in, smooth rolling, and careful detail work." },
        { "@type": "HowToStep", "position": 5, "name": "Final Walkthrough", "text": "We walk through every detail with you. If anything isn't perfect, we make it right. Your satisfaction is 100% guaranteed." }
      ]
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/*
          Preconnect: keep to ≤4 origins (Lighthouse warns above 4) and ONLY
          for resources the page actually requests during initial load.
          - storage.googleapis.com: hero image (LCP element)
          - api.leadconnectorhq.com: deferred form iframe origin
          - stcdn.leadconnectorhq.com: form assets origin
          DNS-prefetch is cheaper than preconnect - use for origins that
          ONLY get hit after user interaction (GTM, msgsndr tracking, etc.).
        */}
        <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.leadconnectorhq.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://stcdn.leadconnectorhq.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://link.msgsndr.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        <link rel="dns-prefetch" href="https://beta.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        {/* Critical CSS inline for faster FCP - reduces render blocking by ~600ms */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root{--jh-navy:#0a0e27;--jh-red:#CC0000;--jh-red-dark:#990000;--font-inter:Inter,system-ui,sans-serif}
          *,*::before,*::after{box-sizing:border-box}
          html{background:#ffffff;scroll-behavior:smooth}
          body{margin:0;font-family:var(--font-inter);line-height:1.6;color:#1a1a1a;-webkit-font-smoothing:antialiased}
          .hero,.hero-simplified{min-height:100vh;position:relative;display:flex;align-items:center;background:#0a0e27}
          .hero-bg{position:absolute;inset:0;z-index:0}
          .hero-bg img{object-fit:cover;width:100%;height:100%}
          .hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.55);z-index:1}
          .hero-content{position:relative;z-index:2;padding:2rem 0}
          .container{width:100%;max-width:1280px;margin:0 auto;padding:0 1rem}
          .header{position:fixed;top:44px;left:0;right:0;z-index:100;background:#ffffff;box-shadow:0 2px 10px rgba(0,0,0,.08)}
          .top-bar{position:fixed;top:0;left:0;right:0;z-index:1000;background:#CC0000;color:#fff;padding:.5rem 0;font-size:.75rem}
          .top-bar.hidden{transform:translateY(-100%)}
          .top-bar-content{display:flex;justify-content:space-between;align-items:center}
          .top-bar-left{display:flex;gap:1.5rem;align-items:center}
          .top-bar-item{display:flex;align-items:center;gap:4px;color:#fff}
          .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.875rem 1.5rem;border-radius:9999px;font-weight:600;text-decoration:none;transition:all .2s}
          .btn-primary{background:#CC0000;color:#fff;box-shadow:0 4px 15px rgba(204,0,0,.3)}
          h1,h2,h3{margin:0 0 1rem;line-height:1.2}
          img{max-width:100%;height:auto}
          .logo img{height:50px;width:auto}
          nav a{color:#1a1a1a;text-decoration:none;font-weight:500}
          .service-hero,.city-page-hero{position:relative;display:flex;align-items:flex-start;overflow:hidden;padding-top:160px;background:#060a1e}
          .service-hero-bg,.city-page-hero-bg{position:absolute;inset:0;z-index:0}
          .service-hero-overlay,.city-page-hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,.55)}
          .service-hero-content,.city-page-hero-content{position:relative;z-index:2;padding-top:40px;padding-bottom:60px}
          .hero-form-card{background:transparent;border-radius:20px;padding:0;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,.3)}
          .hero-text{color:#fff}
          .hero-title-emotional{font-size:clamp(2.5rem,6vw,4.25rem);font-weight:800;color:#fff;line-height:1.1;margin-bottom:1.5rem;letter-spacing:-.02em}
          .hero-title-accent{background:#CC0000;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
          .hero-form-iframe{width:100%;height:620px;border:none;border-radius:12px;background:transparent}
          .header-main{display:flex;align-items:center;justify-content:space-between;padding:.75rem 0}
          .header-scrolled{top:0;background:#ffffff;box-shadow:0 4px 20px rgba(0,0,0,.1)}
          .nav{display:flex;align-items:center;gap:1.5rem}
          .header-cta{display:flex;align-items:center;gap:.5rem;padding:.625rem 1.25rem;background:#CC0000;color:#fff;border-radius:8px;font-weight:600;font-size:.875rem;text-decoration:none}
          .menu-btn,.hamburger-btn{display:none;background:none;border:none;cursor:pointer;padding:.5rem}
          @keyframes spin{to{transform:rotate(360deg)}}
          .section,.detail-section,.before-after-section,.video-section-rs,.reviews-section,.faq-section-home,.cta-section,.gallery-section,.about-section-dark,.trust-badges-section{content-visibility:auto;contain-intrinsic-size:auto 600px}
          .skip-link{position:absolute;top:-100%;left:50%;transform:translateX(-50%);background:#ffffff;color:#CC0000;padding:.75rem 1.5rem;z-index:100000;border-radius:0 0 8px 8px;font-weight:600;font-size:.875rem;text-decoration:none;transition:top .2s ease;box-shadow:0 4px 12px rgba(0,0,0,.1)}.skip-link:focus{top:0}
          .google-reviews-bar{background:#f8f9fa;padding:1rem 0;text-align:center}
          .google-reviews-bar-content{display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap}
          .google-reviews-bar .google-icon{width:24px;height:24px}
          .google-reviews-bar span{color:#1a1a1a;font-size:.9375rem;font-weight:500}
          .google-reviews-bar .stars{display:flex;gap:.125rem;color:#CC0000}
          .google-reviews-bar .rating{color:#1a1a1a;font-weight:700;font-size:1rem}
          .google-reviews-bar a{color:#CC0000;font-weight:600;font-size:.9375rem;text-decoration:none;display:flex;align-items:center;gap:.25rem}
          .trust-badges-section{padding:1.25rem 0}
          .trust-badges-wrapper{display:flex;align-items:center;justify-content:center;gap:1.5rem;flex-wrap:wrap}
          .trust-badges-logos{display:flex;align-items:center;gap:1rem}
          @media(max-width:992px){.nav{display:none}.header-cta{display:none}.menu-btn,.hamburger-btn{display:flex}}
          @media(max-width:768px){.top-bar-email{display:none}.top-bar-item{font-size:.6875rem}.hero,.hero-simplified{min-height:auto}.service-hero,.city-page-hero{padding-top:130px}.service-hero-content,.city-page-hero-content{padding-top:20px;padding-bottom:40px}.hero-form-iframe{height:600px}.google-reviews-bar-content{gap:.5rem}.trust-badges-wrapper{gap:1rem}}
        `}} />
        {/*
          theme-color, viewport, HandheldFriendly, MobileOptimized:
          intentionally NOT rendered here - Next.js emits theme-color and viewport
          from the `viewport` export above, and the legacy mobile meta is no longer
          honored by any modern browser.
        */}
        {/* Schema JSON-LD - Comprehensive SEO markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData)
          }}
        />
        {/*
          GHL External Tracking + Chat Widget - both moved to DeferredScripts
          so they load only on first user interaction. Previously sat in <head>
          with `async`, which still costs main-thread time during initial parse
          and counts against Lighthouse Performance.
        */}
      </head>
      <body>
        {/* Skip to main content - Accessibility */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KB89D6QQ"
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <FloatingButtons />
        <MobileStickyCTA />
        {/*
          All third-party scripts (GTM, GHL external-tracking, Chat Widget,
          Reviews) deferred until first user interaction or 20s fallback.
          The beeprohub /external-tracking.js script was a duplicate of the
          msgsndr one (same payload, same tracking ID) - removed to save
          82 KiB transfer + parse time.
        */}
        <DeferredScripts />
      </body>
    </html>
  )
}
