/**
 * JH Painting Services - Centralized Constants
 * All business data and configuration in one place
 */

// Business Contact Information
export const BUSINESS = {
  name: 'JH Painting Services',
  phone: '(508) 690-8886',
  phoneRaw: '+15086908886',
  email: 'contact@jhpaintingservices.com',
  address: 'Serving All Massachusetts',
  website: 'https://jhpaintingservices.com',
  logo: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png',
} as const

// LeadConnector Form IDs
export const FORM_IDS = {
  contact: 'gmVSZsO5e3S0pbXmmnPn',
  quote: 'gmVSZsO5e3S0pbXmmnPn',
  servicePages: 'https://api.leadconnectorhq.com/widget/form/gmVSZsO5e3S0pbXmmnPn',
} as const

// (SOCIAL_LINKS - defined below - is the authoritative social-profile list.)

// Service Areas - Massachusetts Cities
export const SERVICE_AREAS = [
  'Worcester',
  'Springfield',
  'Boston',
  'Cambridge',
  'Framingham',
  'Marlborough',
  'Shrewsbury',
  'Westborough',
  'Natick',
  'Wellesley',
  'Newton',
  'Brookline',
] as const

// Services Data
export const SERVICES = [
  {
    id: 'exterior-painting',
    title: 'Exterior Painting',
    shortDescription: 'Professional exterior house painting with complete prep work and two coats of premium paint.',
    description: 'Protect and beautify your home\'s exterior with our professional painting services. We use premium, weather-resistant paints that stand up to New England\'s harsh weather conditions.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
    href: '/services/exterior-painting',
    featured: true,
  },
  {
    id: 'interior-painting',
    title: 'Interior Painting',
    shortDescription: 'Transform your home\'s interior with premium low-VOC paints and meticulous attention to detail.',
    description: 'Transform any room with our expert interior painting services. We use low-VOC paints that are safe for your family and pets while delivering stunning, long-lasting results.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
    href: '/services/interior-painting',
    featured: false,
  },
  {
    id: 'cabinet-painting',
    title: 'Cabinet Refinishing',
    shortDescription: 'Upgrade your kitchen with professional cabinet refinishing for a brand-new look.',
    description: 'Give your kitchen a fresh new look without a full teardown. Our cabinet refinishing services can transform outdated cabinets into beautiful, modern focal points.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png',
    href: '/services/cabinet-painting',
    featured: false,
  },
  {
    id: 'residential-painting',
    title: 'Residential Painting',
    shortDescription: 'Complete home painting solutions including floors, trim, and specialty finishes.',
    description: 'Comprehensive residential painting services for every part of your home. From walls and ceilings to trim and doors, we handle it all with precision.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg',
    href: '/services/residential-painting',
    featured: false,
  },
  {
    id: 'commercial-painting',
    title: 'Commercial Painting',
    shortDescription: 'Professional painting services for businesses, offices, and commercial properties.',
    description: 'Keep your business looking professional with our commercial painting services. We work around your schedule to minimize disruption to your operations.',
    image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg',
    href: '/services/commercial-painting',
    featured: false,
  },
] as const

// Navigation Menu Services (for header dropdown)
export const MENU_SERVICES = [
  {
    name: 'Interior Painting',
    href: '/services/interior-painting',
    icon: 'Paintbrush',
    description: 'Transform your interior spaces',
  },
  {
    name: 'Exterior Painting',
    href: '/services/exterior-painting',
    icon: 'HomeIcon',
    description: 'Protect and beautify your exterior',
  },
  {
    name: 'Commercial Painting',
    href: '/services/commercial-painting',
    icon: 'Building2',
    description: 'Professional business painting',
  },
  {
    name: 'Residential Painting',
    href: '/services/residential-painting',
    icon: 'PaintBucket',
    description: 'Complete home painting solutions',
  },
  {
    name: 'Cabinet Painting',
    href: '/services/cabinet-painting',
    icon: 'Palette',
    description: 'Upgrade your kitchen cabinets',
  },
] as const

// Gallery Images
export const GALLERY_IMAGES = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Exterior painting project', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'House painters Massachusetts', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Interior painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Interior painting bedroom', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Cabinet refinishing', category: 'Cabinets' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Floor refinishing', category: 'Floors' },
] as const

// YouTube Videos (unique IDs only - no duplicates)
export const VIDEOS = [
  { id: 'F_lreXzNlUI', title: 'Exterior Painting', type: 'YouTube Short' },
  { id: 'LkT_HLyKibY', title: 'Interior Painting', type: 'YouTube Short' },
] as const

// Stats/Trust Indicators - SINGLE SOURCE OF TRUTH for all pages.
//
// Numbers that can be DERIVED are derived, never typed twice. The site used to
// publish four different ages for the company (7+, 10+, 15+, 18+ years) against
// a 2018 founding date, two project counts (200 and 500+), and three city
// counts (116 real, 117 claimed, 118 in a stale list). Contradictory
// self-description is one of the cheapest low-trust signals for a quality
// rater to spot, so the literals are gone.
//
// reviewCount is the one value that MUST be updated by hand - it has to match
// the Google Business Profile exactly, and no code can verify that.
export const FOUNDING_YEAR = 2018

/** Full years in business, computed at render time. Never hardcode this. */
export function yearsInBusiness(now: Date = new Date()): number {
  return now.getFullYear() - FOUNDING_YEAR
}

export const STATS = {
  foundingYear: FOUNDING_YEAR,
  get yearsExperience() { return yearsInBusiness() },
  get yearsLabel() { return `${yearsInBusiness()}+` },
  satisfaction: '100%',
  rating: 5.0,
  reviewCount: 40,
  reviewLabel: '40+',
  insuranceCoverage: '$2M',
} as const

// Business Hours
export const HOURS = {
  weekdays: '7:00 AM - 6:00 PM',
  saturday: '8:00 AM - 4:00 PM',
  sunday: 'Closed',
} as const

// SEO Defaults
export const SEO = {
  title: 'JH Painting Services | Professional Painters in Massachusetts',
  description: 'Professional painting services in Massachusetts. Interior, exterior, cabinet painting & more. Licensed, insured, EPA Lead-Safe certified. Free estimates!',
  keywords: 'painting services massachusetts, house painters, interior painting, exterior painting, cabinet painting, commercial painting',
} as const

// Color Theme (MassHVAC style - Dark Navy + Red)
export const COLORS = {
  navy: '#0a0e27',
  navyLight: '#111827',
  navyDark: '#060a1e',
  red: '#CC0000',
  redLight: '#EE0000',
  redDark: '#990000',
  accent: '#CC0000',
  accentDark: '#990000',
  white: '#FFFFFF',
  offWhite: '#F8FAFC',
  ink: '#0F172A',
  line: '#E5E7EB',
} as const

// NOTE: the old hand-maintained ALL_CITY_NAMES list lived here. It held 118
// names while app/data/cities.ts held 116, and 21 of its entries had no page
// at all - it was one of the three conflicting city counts the site published.
// It was imported by nothing, so it was deleted. Read `cities` / `CITY_COUNT`
// from app/data/cities.ts: that array generates the routes, so it cannot drift.

// Social Media Links (corrected)
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61564489391475',
  instagram: 'https://www.instagram.com/jhpaintingservices_/',
  youtube: 'https://www.youtube.com/@JHPaintingServices-br9wh',
  google: 'https://g.page/r/Cb984Z3qm9PsEAE/review',
} as const
