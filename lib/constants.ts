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
  contact: 'JRiO8zZFsJyeWQDs0WtO',
  quote: 'JRiO8zZFsJyeWQDs0WtO',
  servicePages: 'https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO',
} as const

// Social Media Links
export const SOCIAL = {
  facebook: 'https://facebook.com/jhpaintingservices',
  instagram: 'https://instagram.com/jhpaintingservices',
  google: 'https://g.page/r/Cb984Z3qm9PsEAE/review',
  yelp: 'https://yelp.com/biz/jh-painting-services',
} as const

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
    shortDescription: 'Upgrade your kitchen with professional cabinet refinishing. Save up to 70% vs replacement.',
    description: 'Give your kitchen a fresh new look without the cost of full replacement. Our cabinet refinishing services can transform outdated cabinets into beautiful, modern focal points.',
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

// Stats/Trust Indicators
export const STATS = {
  yearsExperience: 18,
  projectsCompleted: '500+',
  satisfaction: '100%',
  rating: 5.0,
  reviewCount: 50,
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
  description: 'Professional painting services in Massachusetts. Interior, exterior, cabinet painting & more. Licensed, insured, 18+ years experience. Free estimates!',
  keywords: 'painting services massachusetts, house painters, interior painting, exterior painting, cabinet painting, commercial painting',
} as const

// Color Theme (for reference)
export const COLORS = {
  navy: '#0B1F3B',
  navyLight: '#1A365D',
  navyDark: '#071428',
  red: '#E02020',
  redLight: '#EF4444',
  redDark: '#B91C1C',
  gold: '#D20404',
  goldDark: '#A80303',
  white: '#FFFFFF',
  offWhite: '#F8FAFC',
  ink: '#0F172A',
  line: '#E5E7EB',
} as const

// All 117 Massachusetts cities we serve (names only for footer display)
export const ALL_CITY_NAMES = [
  'Hudson', 'Southborough', 'Berlin', 'Northborough', 'Cordaville', 'Stow', 'Westborough',
  'Framingham Center', 'Bolton', 'Sudbury', 'Ashland', 'Maynard', 'Framingham', 'Hopkinton',
  'Clinton', 'Boylston', 'Shrewsbury', 'Wayland', 'Cochituate', 'South Lancaster', 'Lancaster',
  'Harvard', 'West Concord', 'Natick', 'Acton', 'Sherborn', 'Holliston', 'Grafton', 'West Boylston',
  'Upton', 'Weston', 'Sterling', 'Concord', 'Milford', 'Marlborough', 'Medfield', 'Mendon',
  'Littleton', 'Lincoln', 'Holden', 'Leicester', 'Waltham', 'Dover', 'Worcester', 'Spencer',
  'Bedford', 'Hopedale', 'Millbury', 'Rutland', 'Wellesley', 'Newton', 'Paxton', 'Chelmsford',
  'Lexington', 'Needham', 'Watertown', 'Auburn', 'Medway', 'Millis', 'Belmont', 'Franklin',
  'Norwood', 'Brookline', 'Arlington', 'Bellingham', 'Groton', 'Norfolk', 'Townsend', 'Charlton',
  'Lunenburg', 'Westford', 'Pepperell', 'Uxbridge', 'Wrentham', 'Somerville', 'Cambridge',
  'Burlington', 'Woburn', 'Fitchburg', 'Dedham', 'Blackstone', 'Oxford', 'Northbridge', 'Douglas',
  'Billerica', 'Plainville', 'Canton', 'Lowell', 'Tyngsboro', 'North Attleboro', 'Medford',
  'Wilmington', 'Stoneham', 'Sutton', 'Winchester', 'Leominster', 'Reading', 'Wakefield',
  'Malden', 'Melrose', 'Gardner', 'Tewksbury', 'Webster', 'Stoughton', 'Dracut', 'Everett',
  'Dudley', 'Randolph', 'North Reading', 'Sharon', 'Quincy', 'Milton', 'Braintree', 'Weymouth',
  'Westwood', 'Foxborough', 'Mansfield', 'Boston'
] as const

// Social Media Links (corrected)
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61564489391475',
  instagram: 'https://www.instagram.com/jhpaintingservices_/',
  youtube: 'https://www.youtube.com/@JHPaintingServices-br9wh',
  google: 'https://g.page/r/Cb984Z3qm9PsEAE/review',
} as const
