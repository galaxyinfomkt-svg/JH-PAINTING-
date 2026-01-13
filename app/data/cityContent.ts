// Unique SEO content for each city - Customer pain points, solutions, local context
// This creates truly unique pages that Google will love

export interface CityContent {
  slug: string
  heroHeadline: string
  heroSubheadline: string
  painPoints: string[]
  solutions: string[]
  localContext: string
  whyChooseUs: string[]
  testimonialContext: string
  faq: { question: string; answer: string }[]
  nearbyAreas: string[]
  localTip: string
}

// Weather and climate challenges specific to Massachusetts regions
const maWeatherChallenges = {
  coastal: 'salt air corrosion, high humidity, and intense coastal storms',
  inland: 'extreme temperature swings from -10°F winters to 90°F+ summers',
  urban: 'pollution, traffic vibration, and aging building stock',
  suburban: 'mature tree coverage causing moisture and shade damage',
  rural: 'wildlife damage, extended sun exposure, and rural road dust'
}

// Housing stock by era
const housingEras = {
  colonial: 'historic Colonial-era homes with original woodwork requiring specialized restoration',
  victorian: 'Victorian-era properties with ornate trim and detailed millwork',
  midCentury: 'mid-century homes with unique architectural features',
  modern: 'contemporary construction with modern materials',
  mixed: 'diverse housing stock spanning multiple architectural eras'
}

export const cityContentMap: Record<string, CityContent> = {
  // MARLBOROUGH - HQ CITY - MOST IMPORTANT
  'marlborough': {
    slug: 'marlborough',
    heroHeadline: 'Marlborough\'s Most Trusted Painters Since Day One',
    heroSubheadline: 'Your neighbors in Marlborough trust us with their homes. Based right here in your community.',
    painPoints: [
      'Your Victorian home on Main Street is showing its age with peeling paint and faded colors',
      'The harsh Massachusetts winters have left your exterior looking weathered and worn',
      'You\'ve had bad experiences with out-of-town contractors who don\'t understand Marlborough homes',
      'Your kitchen cabinets from the 90s are dated but replacement costs are astronomical',
      'Previous painters left drips, uneven coverage, and didn\'t properly prep surfaces'
    ],
    solutions: [
      'We live and work in Marlborough - we\'re your neighbors, not strangers passing through',
      'Our crews know the unique challenges of Marlborough\'s historic downtown buildings',
      'We use premium Benjamin Moore and Sherwin-Williams paints rated for New England weather',
      'Cabinet refinishing saves you 70% vs replacement with a showroom-quality spray finish',
      'Meticulous prep work including power washing, scraping, sanding, and priming before any paint'
    ],
    localContext: 'As Marlborough\'s hometown painters, we understand the unique character of our city - from the historic buildings along Main Street to the newer developments near Solomon Pond Mall. We\'ve painted homes in Downtown Marlborough, East Marlborough, and West Marlborough, and we take pride in maintaining the beauty of our community.',
    whyChooseUs: [
      'Marlborough-based company - we\'re your neighbors',
      'Deep knowledge of local architecture from 1800s Colonials to modern builds',
      'Trusted by Marlborough families for over a decade',
      'Same-day response for Marlborough residents',
      'We support local Marlborough businesses and community events'
    ],
    testimonialContext: 'Marlborough homeowners consistently praise our attention to detail and respect for their properties.',
    faq: [
      {
        question: 'Are you actually located in Marlborough?',
        answer: 'Yes! JH Painting Services is headquartered right here in Marlborough, MA. We\'re not a franchise or out-of-town company - we\'re your neighbors who take pride in our community.'
      },
      {
        question: 'Do you work on the historic homes in downtown Marlborough?',
        answer: 'Absolutely. We have extensive experience with Marlborough\'s historic properties, understanding the special techniques needed for older woodwork, lead paint considerations, and period-appropriate color selections.'
      },
      {
        question: 'How quickly can you start a project in Marlborough?',
        answer: 'Being based in Marlborough means we can often start within days, not weeks. For Marlborough residents, we prioritize scheduling and offer same-day estimates.'
      }
    ],
    nearbyAreas: ['Hudson', 'Southborough', 'Northborough', 'Westborough', 'Berlin', 'Framingham'],
    localTip: 'Pro tip for Marlborough homeowners: The best time to paint exterior surfaces is late spring through early fall when temperatures are consistently above 50°F. We recommend scheduling your exterior project early to secure the best dates.'
  },

  // HUDSON - Very close, historic mill town
  'hudson': {
    slug: 'hudson',
    heroHeadline: 'Hudson\'s Premier House Painters',
    heroSubheadline: 'Expert painting services for Hudson\'s historic mill town character and modern homes alike.',
    painPoints: [
      'Your historic Hudson home needs painters who understand pre-1900s construction',
      'The Assabet River humidity is causing paint to peel faster than expected',
      'Finding reliable painters who will actually show up has been frustrating',
      'Your wood siding is showing signs of rot and needs proper assessment before painting',
      'You want to update your home\'s look while respecting Hudson\'s historic character'
    ],
    solutions: [
      'We specialize in Hudson\'s unique mix of historic mills-turned-residences and classic New England homes',
      'Our moisture-blocking primers and premium paints are specifically chosen for riverside communities',
      'As your neighbors from nearby Marlborough, we\'re always close by and accountable',
      'We identify and address wood rot before painting, ensuring long-lasting results',
      'Expert color consultation to complement Hudson\'s charming downtown aesthetic'
    ],
    localContext: 'Hudson\'s transformation from a thriving shoe manufacturing town to a vibrant community with a beloved downtown makes it special. From the historic buildings along Main Street to the beautiful homes near Lake Boon, we understand what makes Hudson unique. We frequently work in Downtown Hudson, Hudson Center, and the areas along the Assabet River Rail Trail.',
    whyChooseUs: [
      'Just 3 miles from our Marlborough headquarters - fast response times',
      'Experience with Hudson\'s historic mill buildings and converted lofts',
      'Familiar with local HOA requirements and historic district guidelines',
      'Trusted by Hudson families throughout the community',
      'We love grabbing coffee at Rail Trail after completing projects!'
    ],
    testimonialContext: 'Hudson homeowners appreciate our understanding of their town\'s unique architectural heritage.',
    faq: [
      {
        question: 'Do you have experience with Hudson\'s older homes?',
        answer: 'Yes! Many Hudson homes date back to the town\'s industrial heyday. We\'re experienced with the challenges of older construction including proper lead paint protocols, working with historic trim details, and matching period-appropriate colors.'
      },
      {
        question: 'Can you paint the exterior of mill-converted condos?',
        answer: 'We work on all types of Hudson properties including converted mill buildings. We coordinate with HOAs and property managers to ensure smooth project execution while respecting shared spaces.'
      }
    ],
    nearbyAreas: ['Marlborough', 'Stow', 'Bolton', 'Berlin', 'Maynard', 'Sudbury'],
    localTip: 'Hudson homeowners: The humid climate near the Assabet River means exterior paint selection is crucial. We recommend paints with superior moisture resistance and always apply a quality primer to prevent peeling.'
  },

  // SOUTHBOROUGH - Affluent, historic
  'southborough': {
    slug: 'southborough',
    heroHeadline: 'Southborough\'s Trusted Painting Professionals',
    heroSubheadline: 'Premium painting services matching the quality Southborough homeowners expect.',
    painPoints: [
      'Your executive home deserves painters who match your high standards',
      'Previous contractors left your property messy and didn\'t protect your landscaping',
      'The large windows and high ceilings in your home require experienced painters',
      'You need painters who can work around your busy family schedule',
      'Your home near St. Mark\'s needs painting that maintains property values'
    ],
    solutions: [
      'White-glove service with meticulous attention to detail and premium finishes',
      'We protect your property like it\'s our own - careful masking, drop cloths, and daily cleanup',
      'Experienced with large, high-end homes including vaulted ceilings and specialty finishes',
      'Flexible scheduling with minimal disruption to your household',
      'Color consultation services to enhance curb appeal and property value'
    ],
    localContext: 'Southborough\'s beautiful estates, excellent schools, and proximity to Boston make it one of Massachusetts\' most desirable communities. From the grand homes near St. Mark\'s School to the family neighborhoods of Southborough Center and Cordaville, we bring the quality craftsmanship that discerning Southborough homeowners expect.',
    whyChooseUs: [
      'Experience with Southborough\'s luxury homes and demanding clientele',
      'Premium paints and finishes appropriate for high-end properties',
      'Fully insured with coverage appropriate for valuable homes',
      'References from satisfied Southborough homeowners available',
      'Understanding of Southborough\'s architectural guidelines'
    ],
    testimonialContext: 'Southborough\'s discerning homeowners trust us for flawless results.',
    faq: [
      {
        question: 'Do you have experience with large Southborough homes?',
        answer: 'Absolutely. We regularly work on Southborough\'s larger properties, including multi-story homes with complex architectural details. Our crews are equipped and experienced for projects of any scale.'
      },
      {
        question: 'Can you match the quality expected in Southborough?',
        answer: 'Our premium services are designed for homeowners who won\'t settle for average. We use top-tier paints, proper preparation, and skilled craftsmen to deliver results that meet Southborough\'s high standards.'
      }
    ],
    nearbyAreas: ['Marlborough', 'Framingham', 'Westborough', 'Hopkinton', 'Ashland', 'Sudbury'],
    localTip: 'Southborough homeowners often choose timeless color palettes that complement the town\'s traditional New England character. Our color consultants can help you select colors that enhance your home\'s architecture while fitting the neighborhood aesthetic.'
  },

  // FRAMINGHAM - Large city, diverse housing
  'framingham': {
    slug: 'framingham',
    heroHeadline: 'Framingham\'s Go-To Painting Contractors',
    heroSubheadline: 'From Downtown to Saxonville, we\'ve painted homes across every Framingham neighborhood.',
    painPoints: [
      'Your older Framingham home has multiple layers of old paint that need proper removal',
      'The diversity of housing styles in Framingham requires adaptable painting expertise',
      'You\'ve struggled to find painters available during convenient hours',
      'Your multi-family property needs painters who understand the unique requirements',
      'Budget constraints make it hard to find quality painting at fair prices'
    ],
    solutions: [
      'Expert paint removal and surface preparation for Framingham\'s many older homes',
      'Experience with every style - from Saxonville\'s historic homes to South Framingham\'s Victorians',
      'Flexible scheduling including weekends to accommodate working families',
      'Multi-unit expertise with minimal disruption to tenants and efficient project management',
      'Competitive pricing without sacrificing quality - we pass savings from efficiency to you'
    ],
    localContext: 'As MetroWest\'s largest city, Framingham offers incredible diversity - from the historic charm of Saxonville and Nobscot to the bustling energy of Downtown and South Framingham. We\'ve painted everything from century-old Victorians to modern condos near Shoppers World, understanding each neighborhood\'s unique character.',
    whyChooseUs: [
      'Extensive experience across all Framingham neighborhoods',
      'Competitive rates appropriate for Framingham\'s diverse market',
      'Large enough team to handle any size Framingham project',
      'Quick response times - just minutes from our Marlborough base',
      'Multi-language crews for Framingham\'s diverse community'
    ],
    testimonialContext: 'Framingham residents value our combination of quality and value.',
    faq: [
      {
        question: 'Do you serve all areas of Framingham?',
        answer: 'Yes! We work throughout Framingham including Downtown, South Framingham, Saxonville, Nobscot, Framingham Centre, and all surrounding neighborhoods. No area of Framingham is too far.'
      },
      {
        question: 'Can you paint my multi-family property in Framingham?',
        answer: 'Absolutely. We have extensive experience with multi-family properties and understand how to coordinate work efficiently while minimizing disruption to tenants.'
      }
    ],
    nearbyAreas: ['Marlborough', 'Natick', 'Ashland', 'Sudbury', 'Wayland', 'Sherborn'],
    localTip: 'Framingham\'s varied housing stock means different homes need different approaches. Colonial-era homes in Saxonville require different prep than 1950s ranches. We assess each property individually to determine the best approach.'
  },

  // NATICK - Affluent, family-oriented
  'natick': {
    slug: 'natick',
    heroHeadline: 'Natick\'s Choice for Professional Painting',
    heroSubheadline: 'Premium painting services for Natick\'s beautiful homes and growing families.',
    painPoints: [
      'Your Natick home\'s exterior hasn\'t been painted since you moved in years ago',
      'Balancing home projects with kids\' activities at Natick schools is challenging',
      'You want a fresh interior look but worry about fumes with young children at home',
      'Your South Natick historic home needs painters who respect its character',
      'Finding painters you can trust in your home while you\'re at work is difficult'
    ],
    solutions: [
      'Comprehensive exterior painting that protects and beautifies for years to come',
      'Family-friendly scheduling that works around school calendars and activities',
      'Low-VOC and zero-VOC paint options safe for families with children and pets',
      'Historic home expertise for South Natick\'s treasured older properties',
      'Background-checked crews you can trust in your home unsupervised'
    ],
    localContext: 'Natick combines excellent schools, beautiful neighborhoods, and convenient access to Boston - making it perfect for families. From the historic charm of South Natick and the Natick Common area to the family neighborhoods near Natick High School, we understand what Natick homeowners value most.',
    whyChooseUs: [
      'Family-owned company serving family-focused Natick',
      'Convenient scheduling around school and activity calendars',
      'Low-VOC options for homes with children and pets',
      'Experience with Natick\'s mix of historic and modern homes',
      'Trusted by numerous Natick families'
    ],
    testimonialContext: 'Natick families appreciate our flexible scheduling and family-safe paint options.',
    faq: [
      {
        question: 'Do you offer low-VOC paints for homes with children?',
        answer: 'Yes! We offer a full range of low-VOC and zero-VOC paints that are safe for families with children and pets. These premium paints provide excellent coverage and durability without the harsh chemical odors.'
      },
      {
        question: 'Can you work around our family\'s busy schedule?',
        answer: 'Absolutely. We understand Natick families are busy with schools, sports, and activities. We offer flexible scheduling and can work while you\'re away to minimize disruption.'
      }
    ],
    nearbyAreas: ['Framingham', 'Wellesley', 'Sherborn', 'Wayland', 'Dover', 'Needham'],
    localTip: 'Natick\'s family-oriented neighborhoods often have HOA color guidelines. We can help navigate these requirements and suggest colors that comply while still expressing your personal style.'
  },

  // WORCESTER - Large city, urban challenges
  'worcester': {
    slug: 'worcester',
    heroHeadline: 'Worcester\'s Professional Painting Experts',
    heroSubheadline: 'Serving Worcester\'s diverse neighborhoods from Downtown to the West Side.',
    painPoints: [
      'Your Worcester triple-decker needs painters who understand multi-family challenges',
      'Urban pollution and traffic have left your home\'s exterior grimy and faded',
      'You\'ve had unreliable contractors who started work but never finished',
      'The lead paint in your older Worcester home is a concern during renovations',
      'Finding affordable quality painting in Worcester seems impossible'
    ],
    solutions: [
      'Extensive multi-family experience - triple-deckers, duplexes, and apartment buildings',
      'Thorough power washing and prep to remove years of urban grime before painting',
      'Reliable crews who complete projects on schedule - our reputation depends on it',
      'EPA-certified lead-safe work practices for Worcester\'s many pre-1978 homes',
      'Competitive pricing structured for Worcester\'s market without compromising quality'
    ],
    localContext: 'As New England\'s second-largest city, Worcester offers incredible diversity - from the historic architecture of Main South and the East Side to the thriving neighborhoods of the West Side and Tatnuck. We\'ve painted everything from iconic triple-deckers to modern condos near Union Station.',
    whyChooseUs: [
      'Experience with Worcester\'s unique multi-family housing stock',
      'EPA lead-safe certified for older Worcester homes',
      'Competitive rates structured for Worcester\'s market',
      'Large crew capacity for Worcester\'s bigger projects',
      'Understanding of Worcester\'s diverse neighborhoods and their needs'
    ],
    testimonialContext: 'Worcester property owners trust us for reliable, quality work at fair prices.',
    faq: [
      {
        question: 'Do you paint Worcester\'s triple-decker homes?',
        answer: 'Yes! Triple-deckers are a Worcester specialty of ours. We understand the logistics of multi-family painting including tenant coordination, working on multiple floors, and efficient project management.'
      },
      {
        question: 'Are you certified for lead paint work in older Worcester homes?',
        answer: 'Absolutely. Our crews are EPA Lead-Safe certified, which is required for work on pre-1978 homes. We follow all proper protocols to protect your family and our workers.'
      }
    ],
    nearbyAreas: ['Shrewsbury', 'Auburn', 'Holden', 'West Boylston', 'Grafton', 'Millbury'],
    localTip: 'Worcester\'s diverse neighborhoods have different painting needs. Historic areas like Crown Hill benefit from period-appropriate colors, while newer developments have more flexibility. We help you choose colors that fit your neighborhood.'
  },

  // BOSTON - Major market, premium services
  'boston': {
    slug: 'boston',
    heroHeadline: 'Boston\'s Trusted Painting Professionals',
    heroSubheadline: 'From Beacon Hill brownstones to South Boston condos, we bring suburban quality to the city.',
    painPoints: [
      'Finding reliable painters willing to work in Boston\'s challenging urban environment',
      'Your brownstone or historic building has strict architectural guidelines',
      'Coordinating painting in your condo requires building management approval',
      'Limited parking and access makes Boston painting projects complicated',
      'Previous city painters charged premium prices but delivered average work'
    ],
    solutions: [
      'Experienced with Boston\'s unique urban painting challenges and logistics',
      'Historic building expertise including Beacon Hill and Back Bay guidelines',
      'Condo and HOA experience - we handle coordination with building management',
      'Efficient crews skilled at working in limited-access urban environments',
      'Premium results at competitive rates - quality doesn\'t require city pricing markups'
    ],
    localContext: 'Boston\'s incredible neighborhoods each have unique character - from the Federal-style brownstones of Beacon Hill to the Victorian row houses of the South End, the waterfront condos of the Seaport to the family homes of West Roxbury. We bring our suburban attention to detail to every Boston project.',
    whyChooseUs: [
      'Experience across Boston\'s diverse neighborhoods and building types',
      'Historic district expertise for Beacon Hill, Back Bay, and South End',
      'Condo and co-op experience with building management coordination',
      'Efficient crews skilled in urban painting logistics',
      'Competitive rates without the "city premium"'
    ],
    testimonialContext: 'Boston homeowners appreciate our suburban quality at competitive prices.',
    faq: [
      {
        question: 'Do you work in historic districts like Beacon Hill?',
        answer: 'Yes! We understand the strict guidelines for Boston\'s historic districts and work within required color palettes and preservation standards. We can help navigate the approval process for exterior painting in regulated areas.'
      },
      {
        question: 'Can you paint my Boston condo?',
        answer: 'Absolutely. We regularly work in Boston condominiums and handle all coordination with building management, including elevator reservations, approved work hours, and insurance requirements.'
      }
    ],
    nearbyAreas: ['Cambridge', 'Somerville', 'Brookline', 'Newton', 'Watertown', 'Jamaica Plain'],
    localTip: 'Boston\'s historic neighborhoods often have specific approved color palettes. Before selecting exterior colors, check with the Landmarks Commission or your building\'s HOA. We can help guide you through this process.'
  },

  // CAMBRIDGE - Academic, historic, diverse
  'cambridge': {
    slug: 'cambridge',
    heroHeadline: 'Cambridge\'s Professional Painting Services',
    heroSubheadline: 'From Harvard Square Victorians to Kendall Square condos, quality painting for Cambridge.',
    painPoints: [
      'Your Cambridge Victorian has intricate trim that previous painters botched',
      'Living near Harvard or MIT means high expectations for quality work',
      'Your rental property needs painting that satisfies discerning tenants',
      'Environmental concerns make you want eco-friendly paint options',
      'Coordinating painting work around your demanding schedule is difficult'
    ],
    solutions: [
      'Expert detail work for Cambridge\'s beautiful Victorian and Colonial homes',
      'Quality craftsmanship that meets the expectations of an academic community',
      'Investment property painting that helps attract and retain quality tenants',
      'Full range of eco-friendly, low-VOC, and zero-VOC paint options',
      'Flexible scheduling for busy professionals and academics'
    ],
    localContext: 'Cambridge\'s unique blend of world-class academics, historic architecture, and progressive values shapes every neighborhood. From the tree-lined streets of Harvard Square to the innovation hub of Kendall Square, from family-friendly Porter Square to the vibrant diversity of Central Square, we bring quality painting to all of Cambridge.',
    whyChooseUs: [
      'Detail-oriented work for Cambridge\'s historic homes',
      'Eco-friendly options for environmentally conscious residents',
      'Experience with rental properties and investment real estate',
      'Flexible scheduling for busy professionals',
      'Understanding of Cambridge\'s diverse neighborhoods'
    ],
    testimonialContext: 'Cambridge residents value our attention to detail and eco-conscious options.',
    faq: [
      {
        question: 'Do you offer eco-friendly paint options?',
        answer: 'Yes! We offer a complete range of environmentally friendly paints including low-VOC, zero-VOC, and natural paint options. These provide excellent quality while aligning with Cambridge\'s environmental values.'
      },
      {
        question: 'Can you handle the detailed trim on Cambridge Victorians?',
        answer: 'Absolutely. Cambridge\'s Victorian homes are some of our favorite projects. We have the skills and patience for intricate gingerbread trim, detailed cornices, and multi-color schemes that highlight architectural features.'
      }
    ],
    nearbyAreas: ['Boston', 'Somerville', 'Arlington', 'Belmont', 'Watertown', 'Brookline'],
    localTip: 'Cambridge\'s historic homes deserve historically appropriate colors. We can help you research period-accurate palettes that honor your home\'s architectural heritage while expressing your personal style.'
  },

  // NEWTON - Affluent suburb
  'newton': {
    slug: 'newton',
    heroHeadline: 'Newton\'s Premier Painting Professionals',
    heroSubheadline: 'Exceptional painting services for Newton\'s exceptional homes.',
    painPoints: [
      'Your Newton home deserves painters who deliver perfection, not excuses',
      'High ceilings and large rooms require expertise most painters lack',
      'You need painters who respect your time and complete work as scheduled',
      'Your home\'s value demands premium finishes and attention to detail',
      'Finding painters who won\'t damage your hardwood floors and fine furnishings'
    ],
    solutions: [
      'Perfectionist approach - we\'re not done until every detail is flawless',
      'Experienced with large Newton homes including cathedral ceilings and grand rooms',
      'Professional project management with clear timelines and reliable completion',
      'Premium paints and expert application that protect and enhance your investment',
      'Meticulous protection of floors, furnishings, and fixtures throughout the project'
    ],
    localContext: 'Newton\'s 13 villages each have their own character - from the bustling shops of Newton Centre and Newtonville to the elegant homes of Chestnut Hill and Waban. We understand that Newton homeowners expect excellence, and we deliver the premium quality this prestigious community deserves.',
    whyChooseUs: [
      'Premium services designed for Newton\'s high-end market',
      'Experience with Newton\'s large homes and demanding clientele',
      'Meticulous protection of your property and possessions',
      'Professional project management with reliable timelines',
      'References from satisfied Newton homeowners'
    ],
    testimonialContext: 'Newton\'s most discerning homeowners trust us for flawless results.',
    faq: [
      {
        question: 'Do you have experience with large Newton homes?',
        answer: 'Yes! We regularly work on Newton\'s larger properties, handling everything from grand foyers with cathedral ceilings to expansive multi-room projects. Our crews are equipped and experienced for any scale.'
      },
      {
        question: 'How do you protect fine hardwood floors and furnishings?',
        answer: 'We use premium drop cloths, careful masking, and furniture protection throughout every project. Our crews are trained to treat your home with the utmost care and respect.'
      }
    ],
    nearbyAreas: ['Brookline', 'Wellesley', 'Needham', 'Waltham', 'Watertown', 'Boston'],
    localTip: 'Newton\'s diverse architecture - from historic Colonials to mid-century moderns - benefits from color choices that complement each style. Our color consultation helps ensure your paint choices enhance your home\'s specific architectural character.'
  },

  // WELLESLEY - Very affluent
  'wellesley': {
    slug: 'wellesley',
    heroHeadline: 'Wellesley\'s Painting Craftsmen',
    heroSubheadline: 'Refined painting services for Wellesley\'s refined homes.',
    painPoints: [
      'Wellesley homes require painters who understand luxury standards',
      'You\'ve been disappointed by painters who promise quality but deliver mediocrity',
      'Your home near Wellesley College needs exterior painting that impresses',
      'Interior painting projects need to work around your family and entertaining schedule',
      'You want painters who communicate professionally and respect your property'
    ],
    solutions: [
      'Luxury-level service tailored to Wellesley\'s expectations',
      'Proven track record of premium results - ask for our Wellesley references',
      'Exceptional exterior work that enhances curb appeal and impresses neighbors',
      'Flexible scheduling that accommodates entertaining and family needs',
      'Professional communication from estimate through completion'
    ],
    localContext: 'Wellesley represents the finest in suburban living - excellent schools, beautiful architecture, and a community that values quality. From the stately homes near Wellesley College to the family neighborhoods of Wellesley Hills and Wellesley Farms, we deliver the exceptional painting that Wellesley homeowners expect and deserve.',
    whyChooseUs: [
      'Luxury-level service and finishes',
      'Experience with Wellesley\'s finest homes',
      'Professional communication throughout the project',
      'Flexible scheduling for busy families',
      'Wellesley references available upon request'
    ],
    testimonialContext: 'Wellesley\'s most distinguished homeowners choose us for uncompromising quality.',
    faq: [
      {
        question: 'What makes your service appropriate for Wellesley homes?',
        answer: 'We\'ve developed our premium service specifically for discerning homeowners. From our initial consultation through final walkthrough, we deliver the attention to detail and quality finishes that Wellesley homes deserve.'
      },
      {
        question: 'Do you offer color consultation for Wellesley\'s traditional homes?',
        answer: 'Yes! Our color consultation helps Wellesley homeowners select sophisticated palettes that complement their home\'s architecture and the neighborhood aesthetic. We consider everything from historical appropriateness to current design trends.'
      }
    ],
    nearbyAreas: ['Newton', 'Natick', 'Needham', 'Weston', 'Dover', 'Brookline'],
    localTip: 'Wellesley\'s traditional architecture often benefits from classic color schemes - think navy shutters, cream trim, and muted body colors. We help you select colors that honor tradition while expressing your personal style.'
  },

  // CONCORD - Historic, affluent, literary heritage
  'concord': {
    slug: 'concord',
    heroHeadline: 'Concord\'s Historic Home Painting Specialists',
    heroSubheadline: 'Preserving Concord\'s heritage one brushstroke at a time.',
    painPoints: [
      'Your historic Concord home needs painters who respect its significance',
      'Previous painters didn\'t understand proper techniques for historic properties',
      'You want to update colors while remaining appropriate for Concord\'s character',
      'The strict historic district guidelines make exterior painting complicated',
      'Your home near Walden Pond deserves painters who appreciate its setting'
    ],
    solutions: [
      'Historic preservation expertise - proper techniques for period properties',
      'Understanding of traditional materials, preparation, and application methods',
      'Historic color research to select period-appropriate palettes',
      'Experience navigating Concord\'s historic district approval process',
      'Environmental sensitivity appropriate for Concord\'s treasured landscapes'
    ],
    localContext: 'Concord\'s rich history - from the Revolutionary War to Thoreau and the Transcendentalists - lives in its architecture. From the Colonial homes near the Old North Bridge to the Victorian residences of Concord Center, from the wooded properties near Walden Pond to the family neighborhoods of West Concord, we honor Concord\'s heritage through expert craftsmanship.',
    whyChooseUs: [
      'Historic home expertise and preservation techniques',
      'Experience with Concord\'s historic district requirements',
      'Period-appropriate color consultation',
      'Environmental responsibility for this treasured community',
      'Respect for Concord\'s unique heritage'
    ],
    testimonialContext: 'Concord homeowners trust us with their piece of American history.',
    faq: [
      {
        question: 'Do you understand Concord\'s historic district requirements?',
        answer: 'Yes! We have extensive experience with Concord\'s historic guidelines and the Historic Districts Commission process. We can help you select appropriate colors and navigate the approval process for exterior changes.'
      },
      {
        question: 'What techniques do you use for historic homes?',
        answer: 'Historic homes require specific approaches - proper surface preparation, compatible primers, and application techniques that protect original materials. We understand the difference between painting modern construction and preserving historic structures.'
      }
    ],
    nearbyAreas: ['Lincoln', 'Bedford', 'Acton', 'Carlisle', 'Sudbury', 'Lexington'],
    localTip: 'Concord\'s historic homes benefit from color research. We can help you discover your home\'s original colors or select historically appropriate alternatives that honor its period while meeting your aesthetic preferences.'
  },

  // LEXINGTON - Revolutionary history, affluent
  'lexington': {
    slug: 'lexington',
    heroHeadline: 'Lexington\'s Trusted Painting Contractors',
    heroSubheadline: 'Professional painting for Lexington\'s historic and modern homes.',
    painPoints: [
      'Your Lexington home near the Battle Green has historic significance worth preserving',
      'Finding painters who understand colonial architecture is challenging',
      'Your growing family needs a home refresh but disruption is a concern',
      'High-quality expectations mean previous painters have disappointed',
      'Coordinating exterior painting in Lexington\'s variable weather is tricky'
    ],
    solutions: [
      'Historic home expertise respecting Lexington\'s Revolutionary heritage',
      'Deep knowledge of Colonial and Federal architecture painting techniques',
      'Family-friendly process with minimal disruption and safe paint options',
      'Quality-first approach that exceeds Lexington\'s high expectations',
      'Weather-smart scheduling to ensure optimal painting conditions'
    ],
    localContext: 'Where the "shot heard round the world" began, Lexington proudly preserves its Revolutionary heritage while thriving as a modern community. From historic homes near the Battle Green to the family neighborhoods of East Lexington, we bring craftsmanship worthy of Lexington\'s distinguished history.',
    whyChooseUs: [
      'Understanding of Lexington\'s historic significance',
      'Colonial and Federal architecture expertise',
      'Family-focused service with safe paint options',
      'Weather-smart scheduling for optimal results',
      'Quality that meets Lexington\'s high standards'
    ],
    testimonialContext: 'Lexington homeowners appreciate our blend of historic sensitivity and modern excellence.',
    faq: [
      {
        question: 'Can you work on homes in Lexington\'s historic districts?',
        answer: 'Yes! We understand the historic district requirements and can help with color selection and approval processes. Our experience with Colonial and Federal architecture ensures appropriate techniques for your historic property.'
      },
      {
        question: 'How do you handle Lexington\'s changeable weather?',
        answer: 'We carefully monitor weather conditions and schedule exterior work during optimal periods. If weather threatens mid-project, we have contingency plans to protect your property and complete work when conditions improve.'
      }
    ],
    nearbyAreas: ['Arlington', 'Bedford', 'Burlington', 'Concord', 'Lincoln', 'Waltham'],
    localTip: 'Lexington\'s colonial homes often feature historically significant colors. Research suggests many 18th-century homes used earth tones and natural pigments. We can help you select authentic colors or modern equivalents.'
  },

  // BROOKLINE - Urban/suburban, diverse, historic
  'brookline': {
    slug: 'brookline',
    heroHeadline: 'Brookline\'s Preferred Painting Professionals',
    heroSubheadline: 'Expert painting for Brookline\'s brownstones, Victorians, and modern homes.',
    painPoints: [
      'Your Coolidge Corner condo building needs painting that coordinates with management',
      'The ornate details on your Victorian require skilled painters who won\'t cut corners',
      'Street parking and urban challenges complicate painting projects',
      'You need painters who communicate well and respect noise ordinances',
      'High standards in Brookline mean average quality won\'t cut it'
    ],
    solutions: [
      'Condo and building experience with smooth management coordination',
      'Expert Victorian detail work including gingerbread trim and decorative elements',
      'Urban project expertise - efficient crews skilled in city logistics',
      'Professional communication and respect for neighbors and regulations',
      'Premium quality that meets Brookline\'s discriminating standards'
    ],
    localContext: 'Brookline offers Boston\'s convenience with a distinct identity and character. From the Victorian masterpieces near Coolidge Corner to the elegant homes of Fisher Hill, from the diverse neighborhoods of Washington Square to the family-friendly streets of Brookline Village, we deliver expert painting that Brookline\'s sophisticated residents expect.',
    whyChooseUs: [
      'Victorian and historic home expertise',
      'Urban painting logistics experience',
      'Condo and HOA coordination skills',
      'Professional communication and courtesy',
      'Quality meeting Brookline\'s high standards'
    ],
    testimonialContext: 'Brookline residents appreciate our urban expertise and quality results.',
    faq: [
      {
        question: 'Do you have experience with Brookline condos and co-ops?',
        answer: 'Yes! We work regularly with Brookline condo associations and co-ops, handling insurance requirements, building access coordination, and neighbor communication. We make the process smooth for all parties.'
      },
      {
        question: 'Can you handle Victorian trim and details?',
        answer: 'Victorian detail work is a specialty. We have the skills and patience for intricate brackets, spindles, and decorative trim. Multi-color Victorian paint schemes that highlight architectural features are something we particularly enjoy.'
      }
    ],
    nearbyAreas: ['Boston', 'Newton', 'Cambridge', 'Jamaica Plain', 'Needham', 'Chestnut Hill'],
    localTip: 'Brookline\'s Victorians often feature three or more exterior colors highlighting different architectural elements. This approach takes more time but dramatically enhances curb appeal. Ask us about multi-color options for your Victorian home.'
  },

  // SHREWSBURY - Large Worcester County suburb
  'shrewsbury': {
    slug: 'shrewsbury',
    heroHeadline: 'Shrewsbury\'s Dependable House Painters',
    heroSubheadline: 'Quality painting services trusted by Shrewsbury families for years.',
    painPoints: [
      'Your Shrewsbury colonial home needs painting that respects its character',
      'Finding painters who understand Worcester County homes has been frustrating',
      'The lake effect from Lake Quinsigamond causes extra moisture challenges',
      'Your busy schedule makes coordinating home projects difficult',
      'Previous painters didn\'t properly prep your wood siding before painting'
    ],
    solutions: [
      'Colonial and Cape Cod style expertise for Shrewsbury\'s classic homes',
      'Local knowledge of Worcester County construction and materials',
      'Moisture-resistant primers and paints for homes near the lake',
      'Flexible scheduling that works around your family\'s activities',
      'Comprehensive prep including pressure washing, scraping, and proper priming'
    ],
    localContext: 'Shrewsbury combines small-town charm with convenient access to Worcester and Boston. From the family neighborhoods near White City to the beautiful homes along Lake Quinsigamond, we bring professional painting services to every corner of this thriving community.',
    whyChooseUs: [
      'Experience with Shrewsbury\'s classic New England homes',
      'Understanding of lake-area moisture challenges',
      'Convenient scheduling for busy families',
      'Local references from Shrewsbury residents',
      'Quick response times to Shrewsbury'
    ],
    testimonialContext: 'Shrewsbury homeowners appreciate our reliability and quality craftsmanship.',
    faq: [
      {
        question: 'Do you work on homes near Lake Quinsigamond?',
        answer: 'Yes! We understand the unique challenges of lakeside properties including increased humidity and moisture exposure. We use appropriate primers and paints designed for these conditions.'
      },
      {
        question: 'How long does exterior painting typically take in Shrewsbury?',
        answer: 'Most Shrewsbury homes take 3-5 days for exterior painting, depending on size and condition. We provide accurate timelines during our free estimate.'
      }
    ],
    nearbyAreas: ['Worcester', 'Westborough', 'Northborough', 'Grafton', 'Boylston', 'Millbury'],
    localTip: 'Shrewsbury homes near Lake Quinsigamond benefit from paints with superior moisture resistance. We recommend premium exterior paints with mildew-resistant properties for these properties.'
  },

  // WALTHAM - Urban, diverse, historic
  'waltham': {
    slug: 'waltham',
    heroHeadline: 'Waltham\'s Trusted Painting Professionals',
    heroSubheadline: 'From Moody Street to the suburbs, quality painting for all of Waltham.',
    painPoints: [
      'Your Waltham Victorian needs painters who can handle ornate details',
      'Urban grime and pollution have taken a toll on your home\'s exterior',
      'Finding parking and access for painting projects is a challenge',
      'Your multi-family property needs painters who work efficiently',
      'You want quality work but need it done around your work schedule'
    ],
    solutions: [
      'Expert detail work for Waltham\'s beautiful Victorian homes',
      'Thorough cleaning and prep to remove urban grime before painting',
      'Efficient crews experienced with urban project logistics',
      'Multi-family expertise with minimal disruption to tenants',
      'Flexible scheduling including evenings and weekends when needed'
    ],
    localContext: 'Waltham\'s rich industrial history is reflected in its diverse architecture - from Victorian mansions to converted factory lofts. We serve all of Waltham, from the restaurants and shops of Moody Street to the family neighborhoods near Brandeis, delivering quality painting that enhances every property.',
    whyChooseUs: [
      'Victorian and historic home expertise',
      'Urban project logistics experience',
      'Multi-family property specialists',
      'Flexible scheduling options',
      'Quick response times from our Marlborough base'
    ],
    testimonialContext: 'Waltham residents trust us for quality work that fits their busy urban lives.',
    faq: [
      {
        question: 'Can you handle the detailed trim on Victorian homes?',
        answer: 'Absolutely! Waltham\'s Victorian homes are some of our favorite projects. We take the time to properly prep and paint intricate trim details, creating beautiful results that highlight your home\'s character.'
      },
      {
        question: 'Do you work on rental properties in Waltham?',
        answer: 'Yes! We have extensive experience with rental and multi-family properties. We work efficiently to minimize vacancy time and coordinate with tenants professionally.'
      }
    ],
    nearbyAreas: ['Newton', 'Watertown', 'Lexington', 'Belmont', 'Lincoln', 'Weston'],
    localTip: 'Waltham\'s older homes often have lead paint. We\'re EPA Lead-Safe certified and follow all proper protocols when working on pre-1978 homes to protect your family and our workers.'
  },

  // ASHLAND - Family community, Boston Marathon connection
  'ashland': {
    slug: 'ashland',
    heroHeadline: 'Ashland\'s Family-Friendly Painters',
    heroSubheadline: 'Trusted painting services for Ashland\'s wonderful family community.',
    painPoints: [
      'Your family needs painters who are safe to have around children and pets',
      'Finding time for home projects between kids\' activities is challenging',
      'Your home near the state park needs weather-resistant painting',
      'Previous painters left a mess that took days to clean up',
      'You want to refresh your home\'s look before hosting family gatherings'
    ],
    solutions: [
      'Family-safe low-VOC and zero-VOC paint options',
      'Flexible scheduling around school, sports, and family activities',
      'Premium exterior paints rated for New England\'s variable weather',
      'Meticulous cleanup - we leave your home cleaner than we found it',
      'Efficient project completion so you can enjoy your beautiful home'
    ],
    localContext: 'Ashland offers the best of suburban living - great schools, beautiful parks, and a strong community spirit. From the homes near Ashland State Park to Downtown Ashland\'s charming streets, we provide the quality painting services that Ashland families deserve.',
    whyChooseUs: [
      'Family-safe paint options and practices',
      'Background-checked, trustworthy crews',
      'Flexible scheduling for busy families',
      'Meticulous job site cleanup',
      'Local knowledge of Ashland neighborhoods'
    ],
    testimonialContext: 'Ashland families trust us to treat their homes with care and respect.',
    faq: [
      {
        question: 'Are your paints safe for homes with children and pets?',
        answer: 'Yes! We offer a full range of low-VOC and zero-VOC paints that are safe for families. These premium paints provide excellent coverage and durability without harmful fumes.'
      },
      {
        question: 'Can you work while we\'re away during the day?',
        answer: 'Absolutely. Many Ashland families prefer we work while they\'re at school and work. We\'re trustworthy, efficient, and always secure your home when we leave.'
      }
    ],
    nearbyAreas: ['Framingham', 'Hopkinton', 'Holliston', 'Southborough', 'Sudbury', 'Natick'],
    localTip: 'Ashland\'s location means variable weather conditions. We recommend scheduling exterior painting for late spring through early fall when temperatures are ideal for proper paint adhesion and curing.'
  },

  // WESTBOROUGH - Tech hub, growing community
  'westborough': {
    slug: 'westborough',
    heroHeadline: 'Westborough\'s Premier Painting Service',
    heroSubheadline: 'Professional painting for Westborough\'s modern and traditional homes alike.',
    painPoints: [
      'Your new construction home needs painters who understand modern materials',
      'Coordinating painting with your demanding work schedule is difficult',
      'Your home\'s HOA has specific color requirements to navigate',
      'You want a professional finish that matches Westborough\'s standards',
      'Previous painters rushed the job and cut corners on prep work'
    ],
    solutions: [
      'Experience with both new construction and traditional Westborough homes',
      'Professional scheduling that respects your busy professional life',
      'HOA experience - we help navigate color approval processes',
      'Premium finishes meeting the expectations of discerning homeowners',
      'Comprehensive prep work - no shortcuts, just quality results'
    ],
    localContext: 'Westborough has transformed into a thriving tech hub while maintaining its New England charm. From the newer developments near Route 9 to the established neighborhoods near Westborough Center, we deliver professional painting services that meet this community\'s high standards.',
    whyChooseUs: [
      'New construction and traditional home expertise',
      'HOA color approval experience',
      'Professional scheduling flexibility',
      'Premium finishes for discerning homeowners',
      'Just minutes from our Marlborough headquarters'
    ],
    testimonialContext: 'Westborough professionals appreciate our efficiency and quality.',
    faq: [
      {
        question: 'Do you help with HOA color approvals?',
        answer: 'Yes! Many Westborough communities have HOA guidelines. We can help you select colors that meet requirements and look great. We provide color samples and documentation for approval processes.'
      },
      {
        question: 'Do you paint new construction homes?',
        answer: 'Absolutely. We work with many new construction homes in Westborough, understanding the specific requirements of modern materials and builder warranties.'
      }
    ],
    nearbyAreas: ['Northborough', 'Southborough', 'Hopkinton', 'Grafton', 'Shrewsbury', 'Marlborough'],
    localTip: 'Westborough\'s newer developments often have specific HOA-approved color palettes. We recommend getting approval before purchasing paint to avoid costly mistakes.'
  },

  // HOPKINTON - Marathon starting point, affluent
  'hopkinton': {
    slug: 'hopkinton',
    heroHeadline: 'Hopkinton\'s Quality House Painters',
    heroSubheadline: 'Where the Marathon begins, and quality painting starts with us.',
    painPoints: [
      'Your Hopkinton estate needs painters who deliver excellence',
      'The wooded setting of your property creates unique painting challenges',
      'Marathon Day festivities require your home to look its best',
      'Finding painters who match Hopkinton\'s quality standards is difficult',
      'Your home near the state park is exposed to increased weather wear'
    ],
    solutions: [
      'Premium painting services for Hopkinton\'s distinguished homes',
      'Experience with wooded properties - proper prep for shade and moisture',
      'Pre-Marathon painting services to ensure your home shines for the big day',
      'Quality craftsmanship that meets Hopkinton\'s high expectations',
      'Weather-resistant paints for homes in natural settings'
    ],
    localContext: 'Hopkinton is world-famous as the Boston Marathon starting line, but locals know it as a wonderful community with excellent schools and beautiful homes. From the historic properties near Hopkinton Center to the estates near Hopkinton State Park, we bring quality painting that this special town deserves.',
    whyChooseUs: [
      'Premium services for distinguished homes',
      'Wooded property expertise',
      'Pre-Marathon curb appeal services',
      'Hopkinton references available',
      'Understanding of the community\'s standards'
    ],
    testimonialContext: 'Hopkinton homeowners trust us for quality that matches their community.',
    faq: [
      {
        question: 'Can you paint my home before Marathon Day?',
        answer: 'Yes! Many Hopkinton residents want their homes looking perfect for Marathon weekend. We recommend booking early as spring is our busiest season.'
      },
      {
        question: 'My property is heavily wooded. Does that affect painting?',
        answer: 'Wooded properties require special attention due to shade, moisture, and debris. We account for these factors in our prep work and paint selection to ensure lasting results.'
      }
    ],
    nearbyAreas: ['Westborough', 'Ashland', 'Holliston', 'Southborough', 'Milford', 'Upton'],
    localTip: 'Hopkinton\'s wooded properties can hold moisture longer. We recommend mildew-resistant paints and thorough surface prep for homes surrounded by trees.'
  },

  // SUDBURY - Historic, affluent, rural character
  'sudbury': {
    slug: 'sudbury',
    heroHeadline: 'Sudbury\'s Historic Home Painting Experts',
    heroSubheadline: 'Preserving Sudbury\'s charm with expert craftsmanship.',
    painPoints: [
      'Your historic Sudbury home deserves painters who understand its value',
      'The Wayside Inn area homes have specific character requirements',
      'Your antique home has original features that need careful protection',
      'Finding painters experienced with 18th and 19th century homes is challenging',
      'You want modern protection while maintaining historic authenticity'
    ],
    solutions: [
      'Historic home expertise for Sudbury\'s treasured properties',
      'Understanding of colonial and federal architecture requirements',
      'Careful protection of original features during painting',
      'Experience with period-appropriate colors and techniques',
      'Modern paints that protect while respecting historic character'
    ],
    localContext: 'Sudbury\'s connection to American history - including the Wayside Inn and Revolutionary War heritage - is reflected in its beautiful homes. From North Sudbury to Sudbury Center, we bring expert painting services that honor this community\'s remarkable character.',
    whyChooseUs: [
      'Historic home painting expertise',
      'Period-appropriate color knowledge',
      'Careful treatment of original features',
      'Understanding of Sudbury\'s historic character',
      'Experience with historic district guidelines'
    ],
    testimonialContext: 'Sudbury homeowners appreciate our respect for history and attention to detail.',
    faq: [
      {
        question: 'Do you have experience with Sudbury\'s historic homes?',
        answer: 'Yes! We\'ve worked on many historic Sudbury properties. We understand the special requirements including proper prep techniques, compatible materials, and historically appropriate colors.'
      },
      {
        question: 'Can you match historic paint colors?',
        answer: 'Absolutely. We can research period-appropriate colors for your home\'s era and help you select shades that honor history while meeting your preferences.'
      }
    ],
    nearbyAreas: ['Wayland', 'Concord', 'Maynard', 'Framingham', 'Lincoln', 'Acton'],
    localTip: 'Sudbury\'s historic homes often benefit from earth-tone color palettes common in the colonial era. We can help you research what colors may have originally adorned your home.'
  },

  // ACTON - Family town, excellent schools
  'acton': {
    slug: 'acton',
    heroHeadline: 'Acton\'s Reliable House Painters',
    heroSubheadline: 'Quality painting services for Acton\'s wonderful family community.',
    painPoints: [
      'Your Acton home needs painters you can trust around your family',
      'Busy school schedules make planning home projects complicated',
      'Your colonial needs painting that respects its traditional style',
      'Previous painters didn\'t communicate well about timing and progress',
      'You need quality results without your home being a construction zone for weeks'
    ],
    solutions: [
      'Trustworthy, background-checked crews safe for families',
      'Flexible scheduling around school and family activities',
      'Expert colonial and Cape Cod style painting',
      'Clear communication with daily updates and accurate timelines',
      'Efficient project management for minimal family disruption'
    ],
    localContext: 'Acton\'s top-rated schools attract families who care about quality - in education and in their homes. From West Acton to South Acton, from homes near NARA Park to the historic center, we deliver the reliable, quality painting that Acton families expect.',
    whyChooseUs: [
      'Family-friendly service and paint options',
      'Excellent communication throughout projects',
      'Efficient timelines with minimal disruption',
      'Experience with Acton\'s home styles',
      'Local references from Acton families'
    ],
    testimonialContext: 'Acton families appreciate our reliability, communication, and quality.',
    faq: [
      {
        question: 'How do you keep us informed during the project?',
        answer: 'We believe in clear communication. You\'ll receive daily updates on progress, and we\'re always available to answer questions. No surprises - just professional service.'
      },
      {
        question: 'Can you work around our family\'s busy schedule?',
        answer: 'Absolutely! We understand Acton families are busy with school and activities. We offer flexible scheduling and can work while you\'re away during the day.'
      }
    ],
    nearbyAreas: ['Concord', 'Maynard', 'Boxborough', 'Littleton', 'Westford', 'Carlisle'],
    localTip: 'Acton\'s variety of home ages - from antique to modern - means each property needs individual assessment. We tailor our approach to your home\'s specific needs and materials.'
  },

  // Default content for cities without specific entries
  'default': {
    slug: 'default',
    heroHeadline: 'Professional Painters Serving Your Community',
    heroSubheadline: 'Quality painting services from your trusted local professionals.',
    painPoints: [
      'Your home needs painting but you can\'t find reliable contractors',
      'Previous painters left your property a mess and didn\'t finish on time',
      'Massachusetts weather has taken a toll on your exterior paint',
      'You want quality work but aren\'t sure which painter to trust',
      'Coordinating a painting project around your busy life seems overwhelming'
    ],
    solutions: [
      'Reliable, professional service from a trusted Massachusetts painter',
      'Meticulous workmanship with careful protection of your property',
      'Premium paints specifically selected for New England conditions',
      'Transparent communication and honest, upfront pricing',
      'Flexible scheduling designed to minimize disruption to your life'
    ],
    localContext: 'We\'re proud to serve homeowners across Massachusetts with the same quality and care we bring to every community. Our local expertise means we understand your area\'s unique needs.',
    whyChooseUs: [
      'Licensed and insured Massachusetts painting contractor',
      'Premium Benjamin Moore and Sherwin-Williams paints',
      '40+ five-star Google reviews from happy customers',
      'Free, no-obligation estimates',
      'Satisfaction guaranteed on every project'
    ],
    testimonialContext: 'Homeowners across Massachusetts trust our quality and professionalism.',
    faq: [
      {
        question: 'Do you serve my area?',
        answer: 'Yes! We serve communities throughout Massachusetts. Our central location allows us to efficiently serve a wide area while maintaining our commitment to quality and service.'
      },
      {
        question: 'What\'s included in a free estimate?',
        answer: 'Our free estimates include a thorough assessment of your project, detailed scope of work, material recommendations, and transparent pricing. There\'s no obligation and no pressure.'
      }
    ],
    nearbyAreas: ['Marlborough', 'Framingham', 'Worcester', 'Boston'],
    localTip: 'Massachusetts homes face unique challenges from our harsh winters and humid summers. Proper paint selection and surface preparation are essential for long-lasting results.'
  }
}

// Get content for a city, falling back to default if not found
export function getCityContent(slug: string): CityContent {
  return cityContentMap[slug] || { ...cityContentMap['default'], slug }
}

// Generate unique meta description for a city
export function getCityMetaDescription(cityName: string, slug: string): string {
  const content = getCityContent(slug)
  if (slug !== 'default' && cityContentMap[slug]) {
    return `${content.heroHeadline}. ${content.painPoints[0].replace('Your', `Your ${cityName}`)} ${content.solutions[0]} Call (508) 690-8886 for a FREE estimate!`
  }
  return `Best painters in ${cityName}, MA. Professional interior & exterior house painters. Premium Benjamin Moore & Sherwin-Williams paints. Licensed & insured. 40+ 5-star reviews. FREE estimates - Call (508) 690-8886!`
}
