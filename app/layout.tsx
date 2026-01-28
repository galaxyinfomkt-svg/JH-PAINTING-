import type { Metadata } from 'next'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import './globals.css'

// Dynamic imports for non-critical floating components - reduces initial JS bundle
const FloatingPhoneButton = dynamic(() => import('./components/FloatingPhoneButton'), {
  ssr: false, // Client-side only - not needed for SEO
})
const FloatingSocial = dynamic(() => import('./components/FloatingSocial'), {
  ssr: false, // Client-side only - not needed for SEO
})

// Optimize font loading - only load essential weights for better FCP
// Using 'swap' ensures text is visible immediately with fallback font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Critical for font display optimization - prevents FOIT
  variable: '--font-inter',
  weight: ['400', '600', '700'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true, // Reduces CLS by matching fallback font metrics
  preload: true,
})

export const metadata: Metadata = {
  title: '#1 Painter Contractor Massachusetts | JH Painting',
  description: 'Award-winning painting contractor serving Massachusetts since 2018. Expert interior & exterior painting, cabinet refinishing, deck staining. Licensed, $2M insured, EPA Lead-Safe certified. 40+ 5-star reviews. FREE estimates: (508) 690-8886 | contact@jhpaintingservices.com',
  keywords: 'painting contractor Massachusetts, house painters Massachusetts, painters near me Massachusetts, professional painters Massachusetts, interior painters MA, exterior painters MA, cabinet refinishing Massachusetts, deck staining Massachusetts, JH Painting Services, painters Marlborough MA, painters Worcester MA, painters Boston MA, painters Framingham MA, painters Natick MA, licensed painters Massachusetts',
  authors: [{ name: 'JH Painting Services' }],
  creator: 'JH Painting Services',
  publisher: 'JH Painting Services',
  category: 'Home Improvement',
  openGraph: {
    title: '#1 Painter Contractor MA | JH Painting Services',
    description: 'Transform your home with Massachusetts\' trusted painting contractor. Interior & exterior painting, cabinet refinishing, deck staining. 40+ 5-star reviews. Licensed & $2M insured. FREE estimates: (508) 690-8886',
    url: 'https://jhpaintingservices.com',
    siteName: 'JH Painting Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
        width: 1200,
        height: 630,
        alt: 'JH Painting Services - Professional Painting Contractor Massachusetts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '#1 Painter Contractor MA | (508) 690-8886',
    description: '7+ years serving Massachusetts. Interior & exterior painting, cabinet refinishing. 40+ 5-star reviews. Licensed & insured. FREE estimates!',
    images: ['https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg'],
    creator: '@jhpaintingma',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/6913817e042d1336f8bbb7a6.png',
    apple: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/6913817e042d1336f8bbb7a6.png',
  },
  alternates: {
    canonical: 'https://jhpaintingservices.com',
  },
  other: {
    'geo.region': 'US-MA',
    'geo.placename': 'Marlborough, Massachusetts',
    'geo.position': '42.3459;-71.5526',
    'ICBM': '42.3459, -71.5526',
    'rating': 'General',
    'revisit-after': '7 days',
    'author': 'JH Painting Services',
    'contact': 'contact@jhpaintingservices.com',
    'telephone': '(508) 690-8886',
  },
}

// All 116 cities served - for Schema markup
const citiesServed = [
  'Marlborough', 'Hudson', 'Southborough', 'Berlin', 'Northborough', 'Cordaville', 'Stow',
  'Westborough', 'Framingham', 'Bolton', 'Sudbury', 'Ashland', 'Maynard', 'Hopkinton',
  'Clinton', 'Boylston', 'Shrewsbury', 'Wayland', 'Cochituate', 'Lancaster', 'Harvard',
  'Concord', 'Natick', 'Acton', 'Sherborn', 'Holliston', 'Grafton', 'West Boylston',
  'Upton', 'Weston', 'Sterling', 'Millbury', 'Wellesley', 'Dover', 'Milford', 'Carlisle',
  'Holden', 'Lincoln', 'Paxton', 'Auburn', 'Medway', 'Needham', 'Rutland', 'Leicester',
  'Mendon', 'Hopedale', 'Medfield', 'Bellingham', 'Bedford', 'Princeton', 'Oxford',
  'Lexington', 'Norwood', 'Newton', 'Westwood', 'Burlington', 'Dedham', 'Brookline',
  'Ayer', 'Canton', 'Waltham', 'Watertown', 'Belmont', 'Arlington', 'Groton', 'Pepperell',
  'Shirley', 'Townsend', 'Lunenburg', 'Fitchburg', 'Leominster', 'Westminster', 'Spencer',
  'Douglas', 'Uxbridge', 'Northbridge', 'Sutton', 'Millville', 'Blackstone', 'Worcester',
  'Boston', 'Cambridge', 'Somerville', 'Franklin', 'Foxborough', 'Wrentham', 'Norfolk',
  'Sharon', 'Walpole', 'Medford', 'Billerica', 'Chelmsford', 'Lowell', 'Tewksbury',
  'Wilmington', 'Winchester', 'Woburn', 'Stoneham', 'Tyngsboro', 'Dunstable', 'Westford',
  'Littleton', 'Millis', 'Hamilton', 'Pinehurst', 'Whitinsville', 'East Douglas',
  'East Pepperell', 'Jamaica Plain', 'New Bedford', 'Sunderland'
]

// Schema JSON-LD - Comprehensive like A&M Painter
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HousePainter", "HomeAndConstructionBusiness", "ProfessionalService", "GeneralContractor"],
      "@id": "https://jhpaintingservices.com/#organization",
      "name": "JH Painting Services",
      "legalName": "JH Painting Services LLC",
      "alternateName": ["JH Painting", "JH Painting Services Massachusetts", "JH Painting MA", "JH Painters"],
      "description": "Award-winning painting contractor serving Massachusetts since 2018. Expert interior & exterior painting, cabinet refinishing, deck staining, and home improvement services. Licensed, $2M insured, EPA Lead-Safe certified. Serving 116+ cities across Massachusetts.",
      "slogan": "Transforming Massachusetts Homes Since 2018",
      "url": "https://jhpaintingservices.com",
      "telephone": "+1-508-690-8886",
      "email": "contact@jhpaintingservices.com",
      "foundingDate": "2018-07",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 5,
        "maxValue": 15
      },
      "founder": {
        "@type": "Person",
        "name": "Jafet Henrique",
        "jobTitle": "Owner & Master Painter",
        "image": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
      },
      "logo": {
        "@type": "ImageObject",
        "url": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png",
        "width": 400,
        "height": 160
      },
      "image": [
        {
          "@type": "ImageObject",
          "url": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg",
          "width": 1200,
          "height": 630,
          "caption": "Professional house painting by JH Painting Services"
        },
        {
          "@type": "ImageObject",
          "url": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/6913825a96d06ab2e07a6439.png",
          "width": 1200,
          "height": 630,
          "caption": "Interior painting services Massachusetts"
        },
        {
          "@type": "ImageObject",
          "url": "https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png",
          "width": 1200,
          "height": 630,
          "caption": "Cabinet refinishing by JH Painting"
        }
      ],
      "priceRange": "$$",
      "currenciesAccepted": "USD",
      "paymentAccepted": ["Cash", "Check", "Credit Card", "Debit Card", "Zelle", "Venmo"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Marlborough",
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
      "hasMap": "https://maps.google.com/?cid=17086082612398292159",
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
        "https://maps.google.com/?cid=17086082612398292159",
        "https://www.yelp.com/biz/jh-painting-services-marlborough",
        "https://www.thumbtack.com/ma/marlborough/painters/jh-painting-services"
      ],
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 42.3459,
          "longitude": -71.5526
        },
        "geoRadius": "50 mi",
        "description": `Serving 116+ cities across Massachusetts including: ${citiesServed.join(', ')}`
      },
      "serviceArea": citiesServed.map(city => ({
        "@type": "City",
        "name": city,
        "containedInPlace": {
          "@type": "State",
          "name": "Massachusetts"
        }
      })),
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
          {
            "@type": "OfferCatalog",
            "name": "Interior Painting",
            "description": "MOST POPULAR - Professional interior painting for walls, ceilings, trim, doors",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wall Painting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceiling Painting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Trim & Baseboard Painting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Door Painting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Color Consultation" } }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Exterior Painting",
            "description": "Complete exterior house painting with prep work and premium paints",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "House Siding Painting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Trim & Fascia Painting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Deck Staining & Sealing" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fence Painting & Staining" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Power Washing" } }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Cabinet Refinishing",
            "description": "Kitchen cabinet painting - Save 60-70% vs replacement",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kitchen Cabinet Painting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bathroom Vanity Painting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spray Finish Application" } }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Commercial Painting",
            "description": "Professional painting for offices, retail, restaurants",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Office Painting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Retail Store Painting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Restaurant Painting" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Warehouse Painting" } }
            ]
          }
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
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Sarah M."
          },
          "datePublished": "2024-11-15",
          "reviewBody": "JH Painting did an amazing job on our entire home interior. Jafet and his team were professional, punctual, and incredibly detailed. The walls look flawless! Highly recommend for anyone in Marlborough or the MetroWest area."
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "John D."
          },
          "datePublished": "2024-10-22",
          "reviewBody": "We hired JH Painting for our exterior and couldn't be happier. They power washed, prepped everything perfectly, and the paint job is beautiful. Great communication throughout the project. Fair pricing too!"
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Maria L."
          },
          "datePublished": "2024-09-30",
          "reviewBody": "Had our kitchen cabinets refinished by JH Painting and they look brand new! Saved us thousands compared to replacing them. The spray finish is smooth and professional. Jafet was great to work with."
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Robert K."
          },
          "datePublished": "2024-08-18",
          "reviewBody": "Best painters in Massachusetts! They painted our office building in Worcester and finished on time and under budget. Very professional crew, clean work area every day. Will use again for sure."
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Jennifer T."
          },
          "datePublished": "2024-07-25",
          "reviewBody": "JH Painting transformed our 1920s colonial in Concord. They were so careful with the historic details and the exterior looks stunning. Neighbors have been asking for their number! Excellent work."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does house painting cost in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "House painting costs in Massachusetts vary based on size and scope. Interior painting typically costs $2-$5 per square foot, while exterior painting ranges from $3,000-$10,000 for most homes. Cabinet refinishing costs $3,000-$7,000 depending on kitchen size. Contact JH Painting at (508) 690-8886 for a free, detailed estimate."
          }
        },
        {
          "@type": "Question",
          "name": "Are you licensed and insured?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! JH Painting Services is fully licensed in Massachusetts and carries $2,000,000 in general liability insurance plus workers' compensation coverage. We're also EPA Lead-Safe certified, which is essential for homes built before 1978. We're happy to provide proof of insurance upon request."
          }
        },
        {
          "@type": "Question",
          "name": "What areas do you serve in Massachusetts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JH Painting Services is based in Marlborough and serves 116+ cities across Massachusetts including Boston, Worcester, Cambridge, Newton, Framingham, Natick, Wellesley, Lexington, Concord, and all MetroWest communities. We travel up to 50 miles from Marlborough."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly can I get an estimate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We typically schedule estimates within 24-48 hours. Call us at (508) 690-8886 or fill out our online form for a free, no-obligation quote. We respond to all inquiries within 24 hours and provide detailed written estimates."
          }
        },
        {
          "@type": "Question",
          "name": "What paint brands do you use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We exclusively use premium paints from Benjamin Moore and Sherwin-Williams. These brands offer superior durability, coverage, and color retention. For exteriors, we recommend paints specifically formulated for New England's harsh weather conditions."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer a warranty on your painting work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We stand behind our work with a 5-year warranty on exterior painting and a 3-year warranty on interior painting. Our warranty covers peeling, blistering, and flaking under normal conditions. Your satisfaction is guaranteed."
          }
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://jhpaintingservices.com/#website",
      "url": "https://jhpaintingservices.com",
      "name": "JH Painting Services",
      "description": "Professional painting contractor serving Massachusetts",
      "publisher": {
        "@id": "https://jhpaintingservices.com/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "HowTo",
      "name": "How to Get Your Home Painted by JH Painting Services",
      "description": "Step-by-step process for hiring JH Painting Services for your Massachusetts home painting project",
      "totalTime": "PT7D",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "4000-10000"
      },
      "supply": [
        { "@type": "HowToSupply", "name": "Premium paint (Sherwin-Williams or Benjamin Moore)" },
        { "@type": "HowToSupply", "name": "Primer" },
        { "@type": "HowToSupply", "name": "Professional painting equipment" }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Request Free Estimate",
          "text": "Call JH Painting at (508) 690-8886 or fill out the online form at jhpaintingservices.com. We offer same-day or next-day estimate appointments.",
          "url": "https://jhpaintingservices.com/#contact"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "On-Site Consultation",
          "text": "Our team visits your home to assess the project, discuss your vision, and provide color consultation advice.",
          "url": "https://jhpaintingservices.com"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Receive Detailed Written Estimate",
          "text": "Get a comprehensive itemized estimate with transparent pricing - no hidden fees or surprise charges.",
          "url": "https://jhpaintingservices.com"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Professional Preparation",
          "text": "Our crew protects your furniture, fills holes, sands surfaces, applies primer, and carefully masks all areas.",
          "url": "https://jhpaintingservices.com/services/interior-painting"
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Expert Paint Application",
          "text": "Professional painters apply 2-3 coats using brush, roll, and spray techniques for perfect coverage and clean lines.",
          "url": "https://jhpaintingservices.com/services"
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": "Quality Inspection & Walkthrough",
          "text": "Crew leader inspects all work, performs touch-ups, and conducts final walkthrough with you to ensure satisfaction.",
          "url": "https://jhpaintingservices.com"
        }
      ]
    },
    {
      "@type": "Service",
      "serviceType": "House Painting",
      "provider": {
        "@id": "https://jhpaintingservices.com/#organization"
      },
      "areaServed": {
        "@type": "State",
        "name": "Massachusetts"
      },
      "description": "Professional house painting services in Massachusetts including interior painting, exterior painting, cabinet refinishing, and commercial painting. Licensed, $2M insured, EPA Lead-Safe certified.",
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "2-6",
          "priceCurrency": "USD",
          "unitText": "per square foot"
        },
        "availability": "https://schema.org/InStock",
        "validFrom": "2025-01-01"
      }
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://jhpaintingservices.com/#navigation",
      "name": "Main Navigation",
      "hasPart": [
        { "@type": "SiteNavigationElement", "name": "Home", "url": "https://jhpaintingservices.com/" },
        { "@type": "SiteNavigationElement", "name": "About", "url": "https://jhpaintingservices.com/#about" },
        { "@type": "SiteNavigationElement", "name": "Interior Painting", "url": "https://jhpaintingservices.com/services/interior-painting" },
        { "@type": "SiteNavigationElement", "name": "Exterior Painting", "url": "https://jhpaintingservices.com/services/exterior-painting" },
        { "@type": "SiteNavigationElement", "name": "Cabinet Painting", "url": "https://jhpaintingservices.com/services/cabinet-painting" },
        { "@type": "SiteNavigationElement", "name": "Commercial Painting", "url": "https://jhpaintingservices.com/services/commercial-painting" },
        { "@type": "SiteNavigationElement", "name": "Residential Painting", "url": "https://jhpaintingservices.com/services/residential-painting" },
        { "@type": "SiteNavigationElement", "name": "Carpentry", "url": "https://jhpaintingservices.com/services/carpentry" },
        { "@type": "SiteNavigationElement", "name": "Power Washing", "url": "https://jhpaintingservices.com/services/power-washing" },
        { "@type": "SiteNavigationElement", "name": "Projects", "url": "https://jhpaintingservices.com/projects" },
        { "@type": "SiteNavigationElement", "name": "Blog", "url": "https://jhpaintingservices.com/blog" },
        { "@type": "SiteNavigationElement", "name": "Contact", "url": "https://jhpaintingservices.com/contact" }
      ]
    },
    {
      "@type": "SpeakableSpecification",
      "@id": "https://jhpaintingservices.com/#speakable",
      "cssSelector": [".hero-title", ".hero-description", ".section-header h2", ".faq-question-home h3", ".faq-answer-home p"]
    },
    {
      "@type": "SearchAction",
      "@id": "https://jhpaintingservices.com/#search",
      "target": "https://jhpaintingservices.com/?s={search_term_string}",
      "query-input": "required name=search_term_string"
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
        {/* Google Tag Manager - Load after page is interactive to improve TBT */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KB89D6QQ');`,
          }}
        />
        {/* Preconnect to critical external resources - improves LCP */}
        <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect to form domain - critical for hero form loading */}
        <link rel="preconnect" href="https://api.leadconnectorhq.com" crossOrigin="anonymous" />
        {/* DNS prefetch for non-critical resources - reduces connection time */}
        <link rel="dns-prefetch" href="https://beta.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://reputationhub.site" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://link.msgsndr.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        {/* Preload critical LCP image for faster loading */}
        <link
          rel="preload"
          as="image"
          href="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
          type="image/jpeg"
          fetchPriority="high"
        />
        {/* Critical CSS inline for faster FCP - reduces render blocking */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root{--jh-navy:#0A1F44;--jh-red:#D20404}
          html{background:#0A1F44}
          body{margin:0;font-family:var(--font-inter),system-ui,sans-serif}
          .hero{min-height:100vh;position:relative;display:flex;align-items:center}
          .hero-bg{position:absolute;inset:0;z-index:0}
          .hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,31,68,.92),rgba(10,31,68,.75));z-index:1}
          .container{width:100%;max-width:1280px;margin:0 auto;padding:0 1rem}
          @keyframes spin{to{transform:rotate(360deg)}}
        `}} />
        {/* Mobile optimization */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="theme-color" content="#DC2626" />
        {/* Schema JSON-LD - Comprehensive SEO markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData)
          }}
        />
        {/* GHL External Tracking Script */}
        <Script
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_17bc6e6f297d4ffc8b66e30609380978"
          strategy="lazyOnload"
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KB89D6QQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <FloatingPhoneButton />
        <FloatingSocial />
        {/* LeadConnector Chat Widget - Load after page is idle */}
        <Script
          src="https://beta.leadconnectorhq.com/loader.js"
          data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69626d9e5c8c5ba64720801a"
          strategy="lazyOnload"
        />
        {/* Reviews Widget Script - Load after page is idle */}
        <Script
          src="https://reputationhub.site/reputation/assets/review-widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
