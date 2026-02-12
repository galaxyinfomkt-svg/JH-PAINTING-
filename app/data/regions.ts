export interface RegionPainPoint {
  title: string
  problem: string
  solution: string
}

export interface Region {
  name: string
  slug: string
  description: string
  citySlugs: string[]
  heroHeadline: string
  heroSubtext: string
  painPoints: RegionPainPoint[]
  whyUs: string[]
  localExpertise: string
}

export const regions: Region[] = [
  {
    name: 'Greater Boston',
    slug: 'greater-boston',
    description: 'Serving Boston and surrounding communities including Cambridge, Newton, Brookline, and more. Premium painting services for historic homes, modern condos, and commercial properties across the Greater Boston metro area.',
    heroHeadline: 'Boston\'s Historic Homes Deserve Expert Painters',
    heroSubtext: 'From Back Bay brownstones to Cambridge Victorians, Greater Boston homes demand painters who understand century-old plaster, lead paint safety, and the unique challenges of New England\'s oldest neighborhoods.',
    citySlugs: [
      'boston', 'cambridge', 'somerville', 'brookline', 'newton', 'waltham',
      'watertown', 'arlington', 'lexington', 'belmont', 'medford', 'winchester',
      'woburn', 'burlington', 'stoneham', 'wilmington', 'jamaica-plain',
    ],
    painPoints: [
      {
        title: 'Cracking Plaster in Pre-War Homes',
        problem: 'Greater Boston is filled with homes built before 1950 — brownstones in Back Bay, triple-deckers in Somerville, colonials in Newton. Old plaster walls crack, peel, and crumble. Most painters slap on a coat and leave, only for cracks to reappear within months.',
        solution: 'We skim-coat and stabilize damaged plaster before painting. Our crews use flexible, high-adhesion primers specifically designed for old plaster surfaces, then finish with premium Benjamin Moore Regal Select. The result lasts 8-10 years, not 8-10 months.',
      },
      {
        title: 'Lead Paint in Historic Neighborhoods',
        problem: 'Homes built before 1978 in Brookline, Cambridge, Arlington, and Jamaica Plain almost certainly contain lead paint. Disturbing lead paint without proper containment puts your family at serious health risk — and violates Massachusetts law.',
        solution: 'JH Painting is EPA Lead-Safe Certified (RRP). We follow strict containment protocols, HEPA-vacuum all surfaces, and provide clearance documentation. We\'ve safely repainted hundreds of pre-1978 homes across Greater Boston.',
      },
      {
        title: 'Tight Access & Parking Challenges',
        problem: 'Boston\'s narrow streets, permit-only parking, and tight row-house lots make it nearly impossible for many painting companies to even set up. Ladders on Beacon Hill\'s brick sidewalks? Scaffolding in Somerville\'s densest blocks? Most contractors won\'t bother.',
        solution: 'We\'re local — we know the permit process, we have compact equipment rigs, and our crews are experienced working in tight urban spaces. We handle city parking permits, coordinate with neighbors, and get the job done without disrupting your block.',
      },
      {
        title: 'Harsh Coastal & Urban Weather Damage',
        problem: 'Salt air from Boston Harbor, freeze-thaw cycles that crack paint in Lexington and Winchester, and summer humidity that causes bubbling in Belmont and Watertown. Greater Boston exteriors take a beating that paints designed for milder climates can\'t handle.',
        solution: 'We exclusively use weather-engineered exterior paints — Sherwin-Williams Duration and Benjamin Moore Aura Exterior — with proper moisture barriers and breathable primers. Our prep includes full scraping, caulking, and wood repair before any paint touches the surface.',
      },
    ],
    whyUs: [
      'EPA Lead-Safe Certified for pre-1978 homes across Boston, Cambridge, Brookline',
      'Expert plaster repair and skim-coating for Greater Boston\'s historic housing stock',
      'City parking permits and tight-access equipment for urban neighborhoods',
      'Licensed & $2M insured — required by many Boston condo associations',
    ],
    localExpertise: 'Based in Marlborough, our crews are on Greater Boston job sites within 45 minutes. We\'ve painted in virtually every Boston neighborhood — from the brownstones of the South End to the colonials of Newton Centre, the Victorians of Cambridge to the mid-century homes in Burlington. We understand the architectural styles, building regulations, and homeowner expectations unique to this market.',
  },
  {
    name: 'MetroWest',
    slug: 'metrowest',
    description: 'Proudly serving the MetroWest region from our Marlborough headquarters. Interior and exterior painting, cabinet refinishing, and carpentry for homes and businesses across MetroWest Massachusetts.',
    heroHeadline: 'MetroWest\'s Trusted Local Painting Contractor',
    heroSubtext: 'Headquartered right here in Marlborough, we\'re the painting company your MetroWest neighbors already trust. From Framingham colonials to Sudbury estates, Natick condos to Hopkinton new builds — we\'re 15 minutes away.',
    citySlugs: [
      'marlborough', 'hudson', 'framingham', 'framingham-center', 'natick',
      'ashland', 'hopkinton', 'southborough', 'northborough', 'westborough',
      'sudbury', 'concord', 'west-concord', 'acton', 'maynard', 'stow', 'bolton',
      'wayland', 'cochituate', 'sherborn', 'holliston', 'weston', 'lincoln',
    ],
    painPoints: [
      {
        title: 'Sun-Faded Cedar Siding & Wood Rot',
        problem: 'MetroWest\'s suburban homes — especially in Sudbury, Wayland, Weston, and Sherborn — feature natural cedar shingle and clapboard siding. Years of sun exposure and moisture cause fading, splitting, and wood rot around windows and trim. Homeowners watch their $800K+ homes look neglected.',
        solution: 'We replace rotted wood with PVC or Boral trim that never rots, then apply oil-based primer and two coats of premium acrylic exterior paint. For natural cedar, we offer transparent and semi-transparent stains that protect while showcasing the wood grain. Full prep, not just paint.',
      },
      {
        title: 'Dated Kitchen Cabinets in 1980s-2000s Homes',
        problem: 'MetroWest has thousands of homes built during the suburban boom of the 1980s-2000s. The honey-oak and cherry cabinets that were trendy then now look dated. Full cabinet replacement costs $25,000-$50,000 — money most Framingham, Natick, and Ashland homeowners would rather not spend.',
        solution: 'Our cabinet painting service transforms dated cabinets for 70% less than replacement. We spray-apply cabinet-grade lacquer in a controlled environment for a factory-smooth finish. White, gray, navy, sage — your kitchen looks brand new in 5-7 days.',
      },
      {
        title: 'New Construction Touch-Ups Done Wrong',
        problem: 'Hopkinton, Southborough, and Westborough are full of new developments where builder-grade paint starts peeling within 2-3 years. Builders use the cheapest paint and rush the application. By year three, you\'re seeing nail pops, joint cracks, and fading exterior.',
        solution: 'We fix builder shortcuts right. We re-tape and mud visible seams, spot-prime nail pops, and repaint with premium paint that lasts. We also offer new homeowner packages: touch-up all rooms plus upgrade exterior to a 15-year-rated coating system.',
      },
      {
        title: 'Deck & Fence Maintenance in Wooded Lots',
        problem: 'MetroWest\'s tree-lined properties in Concord, Stow, Bolton, and Lincoln mean decks and fences sit in shade and moisture. Mold, mildew, algae, and wood decay attack faster here than in open suburban neighborhoods. Homeowners pressure-wash and restain every year — an exhausting cycle.',
        solution: 'We power wash with mildewcide solution, let wood dry properly (48+ hours), then apply penetrating oil-based stain that resists moisture from within. One proper application lasts 3-4 years, even in shaded MetroWest lots. We also repair soft or damaged deck boards before staining.',
      },
    ],
    whyUs: [
      'Headquartered in Marlborough — we\'re your actual neighbors, not a franchise 40 miles away',
      'Completed 200+ MetroWest projects: Framingham, Natick, Sudbury, Hopkinton, Concord',
      'Specialize in 1980s-2000s suburban home upgrades (cabinet painting, builder paint fixes)',
      'Same-week estimates for MetroWest homeowners — we\'re 15 minutes from your door',
    ],
    localExpertise: 'JH Painting is headquartered in Marlborough — this is our home turf. We paint houses on the same streets where our kids go to school. We know that Sudbury\'s older homes need different prep than Hopkinton\'s new construction. We know that Weston homeowners expect museum-quality finishes. We know that Natick landlords need fast turnarounds between tenants. This isn\'t just where we work — it\'s where we live.',
  },
  {
    name: 'Worcester & Central MA',
    slug: 'worcester-area',
    description: 'Professional painting services throughout Worcester and Central Massachusetts. From historic triple-deckers to modern office buildings, we deliver quality results across the Worcester metro area.',
    heroHeadline: 'Worcester\'s Triple-Deckers & Central MA Homes — Painted Right',
    heroSubtext: 'Central Massachusetts homes face brutal winters, aging housing stock, and unique architectural challenges. From Worcester\'s iconic triple-deckers to Shrewsbury\'s family neighborhoods, we deliver results built for this climate.',
    citySlugs: [
      'worcester', 'shrewsbury', 'clinton', 'grafton', 'west-boylston',
      'millbury', 'auburn', 'sterling', 'boylston', 'holden', 'paxton',
      'leicester', 'spencer', 'oxford', 'rutland', 'westminster', 'princeton',
    ],
    painPoints: [
      {
        title: 'Triple-Decker Exteriors Peeling After 2 Years',
        problem: 'Worcester has more triple-deckers per capita than almost any city in America. These 3-story wood-frame buildings take enormous punishment from wind, rain, and ice. Cheap paint jobs peel within two winters. Landlords waste money repainting constantly, and tenants complain about curb appeal.',
        solution: 'We use a 3-coat system specifically designed for multi-family wood siding: oil-based primer to penetrate old wood, followed by two coats of 100% acrylic exterior paint rated for 15+ years. We fully scrape, sand, and caulk every surface — the prep that most Worcester painters skip.',
      },
      {
        title: 'Severe Winter Damage to Exterior Paint',
        problem: 'Central MA gets hit harder by winter than the coast — colder temps, more ice, longer freeze-thaw cycles. Spencer, Rutland, Princeton, and Westminster sit at higher elevations where paint failure from moisture penetration is the #1 homeowner complaint.',
        solution: 'We apply moisture-barrier primers and use paints with high-flexibility formulas that expand and contract with Central MA\'s temperature swings (often 100°F+ range annually). We also identify and fix moisture sources — ice dam damage, missing flashing, failed caulking — before painting.',
      },
      {
        title: 'Old Mill Town Homes with Lead Paint Layers',
        problem: 'Clinton, Millbury, Leicester, and Oxford have dense neighborhoods of worker housing built in the 1890s-1940s. These homes often have 10-15 layers of old paint, including lead. Scraping without containment is illegal and dangerous. Many painters refuse these jobs.',
        solution: 'We\'re EPA RRP certified for lead paint work. We use infrared paint removers, chemical strippers, and HEPA containment systems to safely remove failed paint layers. Every lead job includes proper cleanup verification and documentation — protecting your family and keeping you legal.',
      },
      {
        title: 'Rental Property Turnarounds on a Budget',
        problem: 'Worcester is a major rental market — landlords in Main South, Grafton Hill, and Green Island need fast apartment turnarounds between tenants. Most painters either charge premium prices or do sloppy work. Landlords need quality at a fair price, done fast.',
        solution: 'We offer landlord packages: walls, ceilings, trim, and doors repainted in 1-2 days per unit. We use durable, washable Sherwin-Williams ProMar 200 that holds up to tenant wear. Volume pricing for multi-unit buildings. We understand the Worcester rental cycle.',
      },
    ],
    whyUs: [
      'EPA Lead-Safe Certified for Worcester\'s pre-1940 housing stock',
      'Triple-decker specialists — 3-coat exterior systems built for Central MA winters',
      'Landlord volume pricing for multi-unit turnarounds in Worcester',
      'Serve all of Central MA: Worcester to Princeton, Clinton to Oxford',
    ],
    localExpertise: 'We\'ve been painting in Worcester and Central MA long enough to know that a triple-decker on Grafton Street needs different prep than a colonial in Holden. We know the neighborhoods, we know the housing stock, and we know the weather patterns. Our crews handle everything from a single apartment repaint in Main South to a full exterior restoration on a Victorian in Shrewsbury.',
  },
  {
    name: 'North Middlesex & Merrimack Valley',
    slug: 'north-middlesex',
    description: 'Expert painting contractors serving Lowell, Billerica, Chelmsford and communities across North Middlesex County and the Merrimack Valley. Licensed, insured, and trusted by homeowners.',
    heroHeadline: 'Trusted Painters for Lowell, Chelmsford & the Merrimack Valley',
    heroSubtext: 'From Lowell\'s historic mill housing to Westford\'s newer subdivisions, North Middlesex homes need painters who understand the range — century-old plaster walls one day, new-construction drywall the next.',
    citySlugs: [
      'lowell', 'billerica', 'pinehurst', 'chelmsford', 'tewksbury',
      'westford', 'groton', 'pepperell', 'east-pepperell', 'ayer', 'shirley',
      'townsend', 'dunstable', 'tyngsboro', 'littleton-common', 'carlisle',
      'lunenburg',
    ],
    painPoints: [
      {
        title: 'Mill-Era Housing with Failing Paint',
        problem: 'Lowell\'s Acre, Centralville, and Pawtucketville neighborhoods are packed with 1890s-1930s worker housing — wood-frame multi-families with dozens of paint layers, sagging clapboards, and moisture problems from outdated drainage. Paint peels in sheets every few years.',
        solution: 'We approach mill-era homes methodically: strip failed paint layers, repair rotted clapboards and trim, install proper drip edges and flashing, prime with penetrating oil primer, and finish with two coats of flexible exterior acrylic. We fix the causes, not just the symptoms.',
      },
      {
        title: 'Cookie-Cutter Subdivision Upgrades',
        problem: 'Westford, Chelmsford, Tewksbury, and Billerica saw massive subdivision growth in the 1990s-2010s. These homes all look the same — beige walls, white trim, builder-grade flat paint that shows every scuff. Homeowners want personality without a full renovation.',
        solution: 'We specialize in affordable upgrades that transform builder-basic homes: accent walls, updated color schemes, cabinet repainting, and exterior color changes that give your home curb appeal. We bring color samples and do on-site consultations so you see the transformation before we start.',
      },
      {
        title: 'Rural Properties with Weather-Beaten Exteriors',
        problem: 'Groton, Pepperell, Townsend, Dunstable, and Shirley have rural properties with long driveways, exposed exteriors, and outbuildings. Wind, sun, and rain batter these homes year-round. Barns, sheds, and detached garages are often neglected until wood rot sets in.',
        solution: 'We service rural properties with the right equipment — our crews bring everything needed, no return trips for forgotten supplies. We paint homes, barns, sheds, and garages in a single mobilization. For outbuildings, we offer cost-effective barn paint and stain options that protect without breaking the budget.',
      },
      {
        title: 'Rental Multi-Families in Lowell & Tyngsboro',
        problem: 'Lowell and Tyngsboro landlords manage multi-family properties that need regular painting between tenants. Fast turnarounds are essential — every empty day costs rent. But rushing leads to sloppy work, and tenants complain to the city about peeling paint and code violations.',
        solution: 'We offer 24-48 hour apartment turnarounds using quick-dry, durable finishes. Our landlord program includes priority scheduling, consistent pricing, and paint colors we keep in stock so there\'s zero delay. Clean, code-compliant results every time.',
      },
    ],
    whyUs: [
      'Experience with Lowell\'s mill-era housing and lead paint remediation',
      'Serve the full range: rural Groton estates to Billerica subdivisions',
      'Landlord turnaround program for Lowell & Tyngsboro multi-families',
      'Rural property specialists — homes, barns, and outbuildings in one trip',
    ],
    localExpertise: 'North Middlesex covers an enormous range of housing types. A Victorian row house in downtown Lowell is nothing like a farmstead in Groton or a 2005 colonial in Westford. We\'ve painted in every community in this region and understand what each one demands — from Carlisle\'s estate properties to Ayer\'s military-adjacent housing. One team, every type of home.',
  },
  {
    name: 'Norfolk County & South',
    slug: 'norfolk-south',
    description: 'Trusted painting services across Norfolk County and south of Boston. Serving affluent communities with premium finishes, expert color consultation, and meticulous attention to detail.',
    heroHeadline: 'Premium Painting for Norfolk County\'s Finest Homes',
    heroSubtext: 'Wellesley, Dover, Needham, and Westwood homeowners expect perfection — and they should. These are some of New England\'s most beautiful homes, and they deserve painters with the skill and materials to match.',
    citySlugs: [
      'wellesley', 'needham', 'dover', 'medfield', 'millis', 'millis-clicquot',
      'medway', 'norfolk', 'franklin', 'bellingham', 'wrentham', 'foxborough',
      'canton', 'sharon', 'walpole', 'westwood', 'norwood', 'dedham',
    ],
    painPoints: [
      {
        title: 'High-End Finishes That Must Be Flawless',
        problem: 'In Wellesley, Dover, and Needham, homeowners invest $1M-$5M+ in their properties. A visible brush stroke, roller mark, or uneven sheen is unacceptable. Many painters claim "premium quality" but deliver results that fall short of what these homes require.',
        solution: 'We spray-apply finishes on trim, doors, and cabinets for a factory-smooth result. Walls get back-rolled with premium microfiber rollers for zero texture variation. We use Benjamin Moore Advance (trim) and Aura (walls) — the absolute top of the line. Final walkthrough with the homeowner before we consider the job complete.',
      },
      {
        title: 'Estate Properties with Complex Exteriors',
        problem: 'Dover and Sherborn estates have 4,000-8,000 sq ft homes with cedar shingle, multi-level rooflines, dormers, cupolas, and detailed millwork. Painting these homes requires expertise with heights, specialty surfaces, and a crew large enough to maintain consistent quality across the entire facade.',
        solution: 'We deploy 4-6 person crews for estate properties with a dedicated project lead on-site daily. We use proper staging — not just ladders — for safe, quality work at height. Each surface gets the right treatment: oil primer on bare cedar, elastomeric coating on stucco, and acrylic on trim.',
      },
      {
        title: 'Color Consultation for Prestigious Neighborhoods',
        problem: 'Norfolk County\'s upscale neighborhoods often have historic district guidelines or HOA color restrictions. Choosing the wrong exterior color in Wellesley Hills or Walpole Center can mean repainting at your own expense — or worse, lowering your home\'s value relative to neighbors.',
        solution: 'We provide complimentary color consultation with large-format test patches applied directly to your home. We\'re familiar with common HOA and historic district guidelines across Norfolk County. Our color recommendations consider your landscaping, roof color, stone work, and neighboring homes.',
      },
      {
        title: 'Interior Painting During Home Sales',
        problem: 'Norfolk County\'s competitive real estate market means homes in Canton, Sharon, Franklin, and Walpole need to show perfectly. Realtors recommend fresh paint before listing, but homeowners need it done fast without disrupting daily life — and it needs to look staging-ready.',
        solution: 'Our "list-ready" interior package covers walls, trim, ceilings, and touch-ups in neutral, buyer-friendly colors. We work room-by-room so you can continue living in the home. Most 3-4 bedroom homes completed in 3-5 days. We coordinate directly with your realtor on timing.',
      },
    ],
    whyUs: [
      'Premium-only finishes: Benjamin Moore Aura, Advance, and Sherwin-Williams Emerald',
      'Estate property experience: Dover, Wellesley, Needham, Westwood',
      'Complimentary color consultation with large-format test patches on your home',
      '$2M liability insurance — required by Norfolk County\'s most demanding homeowners',
    ],
    localExpertise: 'Norfolk County homeowners have high standards, and rightfully so. We\'ve painted in Wellesley\'s historic neighborhoods, Dover\'s private estates, Needham\'s family homes, and Franklin\'s newer developments. We understand that a paint job in this market isn\'t just maintenance — it\'s an investment in your property value. Every detail matters, and we deliver accordingly.',
  },
  {
    name: 'North Central MA',
    slug: 'north-central',
    description: 'Reliable painting and carpentry services in Leominster, Fitchburg, and surrounding North Central Massachusetts towns. Experienced with New England weather-resistant exterior solutions.',
    heroHeadline: 'Dependable Painters for Leominster, Fitchburg & North Central MA',
    heroSubtext: 'North Central Massachusetts homes face the state\'s harshest winters. Fitchburg and Leominster\'s housing stock — much of it built during the industrial boom — needs painters who know how to prep for this climate.',
    citySlugs: [
      'leominster', 'fitchburg', 'lancaster', 'south-lancaster', 'harvard',
      'berlin',
    ],
    painPoints: [
      {
        title: 'Industrial-Era Homes with Severe Paint Failure',
        problem: 'Fitchburg and Leominster boomed during the 19th-century paper and plastics industries. The worker housing from that era — wood-frame multi-families and small colonials — now has 100+ years of paint buildup. Surfaces bubble, crack, and peel to bare wood. Most local painters don\'t have the equipment for proper removal.',
        solution: 'We use infrared paint strippers and chemical removers to safely take these surfaces back to sound substrate. Then we rebuild with modern primers and paint systems designed for old wood. It\'s more work up front, but it means the new paint actually stays on — for a decade, not a season.',
      },
      {
        title: 'Extreme Winter Weather Paint Damage',
        problem: 'North Central MA sits at higher elevation than the coast — colder temps, heavier snow loads, more ice. Princeton, Westminster, and Sterling homes endure relentless freeze-thaw cycles. Ice dams form, moisture gets behind paint, and by spring the south-facing walls are peeling.',
        solution: 'We address the moisture before the paint. That means checking attic ventilation, fixing ice dam damage, replacing failed caulking, and ensuring proper drainage away from siding. Then we apply breathable, high-flexibility paint systems that handle the thermal cycling without cracking.',
      },
      {
        title: 'Affordable Quality for Working Families',
        problem: 'Fitchburg and Leominster families want quality painting but face tighter budgets than homeowners in wealthier suburbs. They\'ve been burned by cheap contractors who do poor work, but premium Boston-area painters charge more than the market can bear.',
        solution: 'We offer competitive pricing without cutting corners on prep or materials. Our proximity (30 minutes from Marlborough) keeps travel costs low. We also offer room-by-room scheduling so you can spread the investment over time. Quality work at fair prices — that\'s our commitment to this community.',
      },
      {
        title: 'Rural Properties in Harvard, Lancaster & Berlin',
        problem: 'The rural towns surrounding Fitchburg-Leominster — Harvard, Lancaster, Berlin — have farmhouses, horse properties, and antique homes on large lots. These properties need painting but are often passed over by contractors who don\'t want to drive out or deal with unpaved access.',
        solution: 'We happily serve rural North Central MA properties. Our crews arrive fully equipped for a full day\'s work — no wasted trips. We handle antique homes with period-appropriate color palettes and materials. Barns, outbuildings, and fencing included.',
      },
    ],
    whyUs: [
      'Experience with Fitchburg & Leominster\'s 19th-century industrial housing stock',
      'Cold-climate exterior systems for North Central MA\'s harsh winters',
      'Fair, competitive pricing for working families — no Boston-area markup',
      'Rural property service: Harvard, Lancaster, Berlin farmhouses and estates',
    ],
    localExpertise: 'North Central MA is a community we care about. We\'ve restored historic facades on Main Street in Fitchburg, painted new builds in Sterling, and refreshed farmhouses in Harvard. We price our work fairly because we want long-term relationships with homeowners here — the kind where you call us back in 10 years because the last job held up perfectly.',
  },
  {
    name: 'Blackstone Valley',
    slug: 'blackstone-valley',
    description: 'Serving the Blackstone Valley region with professional painting, carpentry, and power washing services. Quality workmanship for residential and commercial properties.',
    heroHeadline: 'Blackstone Valley\'s Go-To Painting Professionals',
    heroSubtext: 'From Milford\'s downtown to Douglas\'s wooded neighborhoods, Blackstone Valley homes and businesses deserve painters who understand the Valley\'s mix of historic villages, suburban neighborhoods, and rural properties.',
    citySlugs: [
      'milford', 'upton', 'northbridge', 'whitinsville', 'sutton', 'mendon',
      'hopedale', 'uxbridge', 'blackstone', 'millville', 'douglas',
      'east-douglas', 'woonsocket-ri',
    ],
    painPoints: [
      {
        title: 'Mill Village Homes with Character (and Problems)',
        problem: 'Whitinsville, Hopedale, and Uxbridge were built around textile mills. The company housing — charming but aging — features unique architectural details, old-growth wood, and generations of paint. These homes have character, but they also have moisture issues, lead paint, and wood rot that\'s been patched dozens of times.',
        solution: 'We treat mill village homes with the respect they deserve. We repair rather than replace original trim and details whenever possible. Lead paint is handled safely per EPA standards. We use historically appropriate colors while applying modern paint technology that protects these structures for decades.',
      },
      {
        title: 'Damp River Valley Climate',
        problem: 'The Blackstone River corridor creates a microclimate with higher humidity and morning fog. Homes in Blackstone, Millville, Northbridge, and Uxbridge sit in this valley, and the moisture accelerates paint failure, mold growth, and wood decay — especially on north-facing walls and lower-level siding.',
        solution: 'We use mildew-resistant primers and paints with anti-microbial additives for Valley homes. Proper surface prep includes treating existing mold with professional-grade solutions. We also recommend and install proper ventilation solutions for crawl spaces and attics that reduce moisture from within.',
      },
      {
        title: 'Cross-State Properties (MA/RI Border)',
        problem: 'Blackstone Valley straddles the Massachusetts-Rhode Island border. Homeowners in Blackstone, Millville, and Douglas sometimes work with RI-based painters who aren\'t licensed in Massachusetts — creating liability issues. And MA-licensed painters often won\'t cross into Woonsocket.',
        solution: 'JH Painting is fully licensed and insured in Massachusetts. We serve the entire MA side of the Blackstone Valley and also handle projects in Woonsocket, RI. One contractor for the whole Valley, fully compliant on both sides of the state line.',
      },
      {
        title: 'Power Washing for Valley Properties',
        problem: 'The Valley\'s humidity means driveways, patios, decks, and siding accumulate algae, moss, and mildew faster than surrounding areas. Homeowners in Sutton, Mendon, Douglas, and Upton power wash every spring, but without proper technique and detergent, the growth returns within weeks.',
        solution: 'Our professional power washing uses soft-wash techniques with biodegradable mildewcide that kills growth at the root. We adjust pressure for each surface — gentle on cedar siding, stronger on concrete. The results last all season, and we offer annual maintenance plans for Valley homeowners.',
      },
    ],
    whyUs: [
      'Mill village preservation specialists — Whitinsville, Hopedale, Uxbridge',
      'Anti-moisture paint systems for the damp Blackstone River corridor',
      'Licensed in MA, serving RI border communities including Woonsocket',
      'Professional soft-wash power washing for Valley\'s high-humidity conditions',
    ],
    localExpertise: 'The Blackstone Valley has a special character — historic mill villages, river corridor homes, and tight-knit communities that value honest work. We\'ve painted everything from Hopedale\'s Draper-era company houses to new construction in Sutton. We understand the Valley\'s unique moisture challenges and architectural heritage. When you hire JH Painting, you\'re hiring a team that knows this area inside and out.',
  },
]

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find(r => r.slug === slug)
}

export function getRegionForCity(citySlug: string): Region | undefined {
  return regions.find(r => r.citySlugs.includes(citySlug))
}
