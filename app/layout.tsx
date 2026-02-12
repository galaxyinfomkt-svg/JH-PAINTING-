import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import FloatingButtons from './components/FloatingButtons'

// Optimize font loading - only load essential weights for better FCP
// Using 'swap' ensures text is visible immediately with fallback font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Critical for font display optimization - prevents FOIT
  variable: '--font-inter',
  weight: ['400', '700'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true, // Reduces CLS by matching fallback font metrics
  preload: true,
})

export const metadata: Metadata = {
  title: '#1 Painters Massachusetts | FREE Estimates | 5-Star | (508) 690-8886',
  description: 'Award-winning painting contractor serving Massachusetts since 2018. Expert interior & exterior painting, cabinet refinishing, deck staining. Licensed, $2M insured, EPA Lead-Safe certified. 40+ 5-star reviews. FREE estimates: (508) 690-8886 | contact@jhpaintingservices.com',
  keywords: 'painting contractor Massachusetts, house painters Massachusetts, painters near me Massachusetts, professional painters Massachusetts, interior painters MA, exterior painters MA, cabinet refinishing Massachusetts, deck staining Massachusetts, JH Painting Services, painters Marlborough MA, painters Worcester MA, painters Boston MA, painters Framingham MA, painters Natick MA, licensed painters Massachusetts',
  authors: [{ name: 'JH Painting Services' }],
  creator: 'JH Painting Services',
  publisher: 'JH Painting Services',
  category: 'Home Improvement',
  openGraph: {
    title: '#1 Painters MA | 40+ 5-Star Reviews | FREE Quote',
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
    title: '#1 Painters MA | FREE Quote | (508) 690-8886',
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

// Schema JSON-LD - Optimized for performance
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
            "urlTemplate": "https://jhpaintingservices.com/#contact",
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
        { "@type": "City", "name": "Boston" },
        { "@type": "City", "name": "Worcester" },
        { "@type": "City", "name": "Cambridge" },
        { "@type": "City", "name": "Marlborough" },
        { "@type": "City", "name": "Framingham" },
        { "@type": "City", "name": "Newton" },
        { "@type": "City", "name": "Natick" },
        { "@type": "City", "name": "Wellesley" },
        { "@type": "City", "name": "Lexington" },
        { "@type": "City", "name": "Concord" }
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
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior Painting", "description": "Professional interior painting for walls, ceilings, trim, doors" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exterior Painting", "description": "Complete exterior house painting with prep work and premium paints" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cabinet Refinishing", "description": "Kitchen cabinet painting - Save 60-70% vs replacement" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Painting", "description": "Professional painting for offices, retail, restaurants" } }
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
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Sarah M." },
          "datePublished": "2024-11-15",
          "reviewBody": "JH Painting did an amazing job on our entire home interior. Professional, punctual, and incredibly detailed. Highly recommend!"
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "John D." },
          "datePublished": "2024-10-22",
          "reviewBody": "We hired JH Painting for our exterior and couldn't be happier. Great communication and fair pricing!"
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
      "@type": "Service",
      "serviceType": "House Painting",
      "provider": { "@id": "https://jhpaintingservices.com/#organization" },
      "areaServed": { "@type": "State", "name": "Massachusetts" },
      "description": "Professional house painting services in Massachusetts including interior painting, exterior painting, cabinet refinishing, and commercial painting. Licensed, $2M insured, EPA Lead-Safe certified."
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
        {/* Preconnect to image CDN for fastest image delivery */}
        <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.leadconnectorhq.com" crossOrigin="anonymous" />
        {/* DNS prefetch for non-critical resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Critical CSS inline for faster FCP - reduces render blocking by ~600ms */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root{--jh-navy:#0A1F44;--jh-red:#D20404;--jh-red-dark:#B91C1C;--font-inter:Inter,system-ui,sans-serif}
          *,*::before,*::after{box-sizing:border-box}
          html{background:#0A1F44;scroll-behavior:smooth}
          body{margin:0;font-family:var(--font-inter);line-height:1.6;color:#1a1a1a;-webkit-font-smoothing:antialiased}
          .hero,.hero-simplified{min-height:100vh;position:relative;display:flex;align-items:center;background:#0A1F44}
          .hero-bg{position:absolute;inset:0;z-index:0}
          .hero-bg img{object-fit:cover;width:100%;height:100%}
          .hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,.85),rgba(0,0,0,.75));z-index:1}
          .hero-content{position:relative;z-index:2;padding:2rem 0}
          .container{width:100%;max-width:1280px;margin:0 auto;padding:0 1rem}
          .header{position:fixed;top:44px;left:0;right:0;z-index:100;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.08)}
          .top-bar{position:fixed;top:0;left:0;right:0;z-index:1000;background:var(--jh-red);color:#fff;padding:.5rem 0;font-size:.75rem}
          .top-bar.hidden{transform:translateY(-100%)}
          .top-bar-content{display:flex;justify-content:space-between;align-items:center}
          .top-bar-left{display:flex;gap:1.5rem;align-items:center}
          .top-bar-item{display:flex;align-items:center;gap:4px;color:rgba(255,255,255,.9)}
          .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.875rem 1.5rem;border-radius:9999px;font-weight:600;text-decoration:none;transition:all .2s}
          .btn-primary{background:linear-gradient(135deg,#DC2626,#B91C1C);color:#fff;box-shadow:0 4px 15px rgba(220,38,38,.3)}
          h1,h2,h3{margin:0 0 1rem;line-height:1.2}
          img{max-width:100%;height:auto}
          .logo img{height:50px;width:auto}
          nav a{color:#0A1F44;text-decoration:none;font-weight:500}
          .service-hero,.city-page-hero{position:relative;display:flex;align-items:flex-start;overflow:hidden;padding-top:160px;background:#0F172A}
          .service-hero-bg,.city-page-hero-bg{position:absolute;inset:0;z-index:0}
          .service-hero-overlay,.city-page-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,.85),rgba(0,0,0,.7),rgba(0,0,0,.6))}
          .service-hero-content,.city-page-hero-content{position:relative;z-index:2;padding-top:40px;padding-bottom:60px}
          .hero-form-card{background:transparent;border-radius:20px;padding:0;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,.3)}
          @keyframes spin{to{transform:rotate(360deg)}}
          .section,.detail-section,.before-after-section,.video-section-rs,.reviews-section,.faq-section-home,.cta-section,.gallery-section,.about-section-dark,.trust-badges-section{content-visibility:auto;contain-intrinsic-size:auto 600px}
          @media(max-width:768px){.top-bar-email{display:none}.top-bar-item{font-size:.6875rem}.hero,.hero-simplified{min-height:auto}.service-hero,.city-page-hero{padding-top:130px}.service-hero-content,.city-page-hero-content{padding-top:20px;padding-bottom:40px}}
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
        <FloatingButtons />
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
