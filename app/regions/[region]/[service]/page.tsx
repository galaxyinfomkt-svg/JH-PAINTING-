'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { regions, getRegionBySlug } from '@/app/data/regions'
import { getCityBySlug, getCitySlugWithState } from '@/app/data/cities'
import Footer from '@/app/components/Footer'

interface ServiceInfo {
  name: string
  slug: string
  shortDesc: string
  getRegionContent: (regionName: string, regionSlug: string) => {
    headline: string
    intro: string
    features: string[]
    process: { step: string; detail: string }[]
  }
}

const servicesData: ServiceInfo[] = [
  {
    name: 'Interior Painting',
    slug: 'interior-painting',
    shortDesc: 'Premium interior painting with Benjamin Moore & Sherwin-Williams paints.',
    getRegionContent: (regionName, regionSlug) => {
      const content: Record<string, { headline: string; intro: string; features: string[]; process: { step: string; detail: string }[] }> = {
        'greater-boston': {
          headline: `Interior Painting for Greater Boston's Historic & Modern Homes`,
          intro: `Greater Boston interiors range from century-old plaster walls in Back Bay brownstones to modern drywall in Cambridge condos. Each surface demands different prep and technique. Our crews handle horsehair plaster skim-coating, crown molding restoration, and high-ceiling work in Boston's tallest row houses — alongside clean-line modern finishes in newer construction.`,
          features: [
            'Plaster wall repair and skim-coating for pre-war homes in Boston, Brookline, Newton',
            'Low-VOC paints for occupied Boston condos and apartments — no displacement needed',
            'High-ceiling and stairwell work in multi-story Somerville and Cambridge homes',
            'Condo association coordination — we handle board approvals and building access schedules',
          ],
          process: [
            { step: 'Historic Surface Assessment', detail: 'We test for lead paint, evaluate plaster condition, and identify moisture issues before any paint is applied.' },
            { step: 'Repair & Prep', detail: 'Skim-coat damaged plaster, fill cracks, sand trim, and prime all surfaces with the right primer for the substrate.' },
            { step: 'Premium Application', detail: 'Benjamin Moore Regal Select or Aura applied with precision — brush-cut edges, back-rolled walls, sprayed trim.' },
            { step: 'Final Walkthrough', detail: 'Room-by-room inspection with the homeowner. We touch up every detail before removing our protection.' },
          ],
        },
        'metrowest': {
          headline: `Interior Painting That Transforms MetroWest Homes`,
          intro: `MetroWest homes built in the 1980s-2000s often have builder-grade flat paint that shows every scuff mark, fingerprint, and furniture scratch. Families in Framingham, Natick, and Sudbury want fresh, modern interiors without the chaos of a full renovation. We deliver clean, durable interior finishes that update your home's entire feel — usually in 3-5 days.`,
          features: [
            'Builder-grade paint upgrades to premium washable eggshell and satin finishes',
            'Open floor plan expertise — seamless color transitions across large MetroWest living spaces',
            'Accent walls, board-and-batten, wainscoting painting for modern farmhouse style',
            'Furniture-friendly scheduling — we work room-by-room so you stay in your home',
          ],
          process: [
            { step: 'Color Consultation', detail: 'On-site color review with large swatches. We help you choose colors that work with your flooring, cabinets, and natural light.' },
            { step: 'Full Protection', detail: 'Floors, furniture, and fixtures fully covered. We protect your home as if it were our own.' },
            { step: 'Precise Application', detail: 'Two coats of Sherwin-Williams Cashmere or Benjamin Moore Regal — washable, durable, and beautiful.' },
            { step: 'Clean Completion', detail: 'We clean up completely, rehang fixtures, and do a detailed walkthrough before we leave.' },
          ],
        },
        'worcester-area': {
          headline: `Interior Painting for Worcester & Central MA Homes`,
          intro: `Worcester's housing ranges from grand Victorians in the Elm Park district to practical triple-decker apartments throughout the city. Interior painting here means working with old plaster, navigating tight stairways, and delivering results that withstand heavy use. Whether you're a homeowner in Shrewsbury refreshing a colonial or a Worcester landlord turning over a rental unit, we deliver quality at a fair price.`,
          features: [
            'Triple-decker apartment turnarounds — walls, ceilings, trim in 1-2 days per unit',
            'Old plaster stabilization and repair for Worcester\'s pre-war housing stock',
            'Durable, washable finishes for high-traffic rental properties',
            'Victorian-era detail work: crown molding, chair rails, wainscoting, built-in cabinetry',
          ],
          process: [
            { step: 'Surface Evaluation', detail: 'We assess plaster condition, check for lead paint in pre-1978 homes, and plan repairs before painting.' },
            { step: 'Prep & Repair', detail: 'Patch holes, skim-coat rough areas, sand woodwork, and caulk gaps. The prep makes the finish.' },
            { step: 'Efficient Painting', detail: 'Professional-grade brushes and rollers for clean cuts and even coverage. Spray finish on trim for a factory-smooth look.' },
            { step: 'Fast Turnaround', detail: 'For landlords: fast-dry formulas and efficient crews mean units are rent-ready in 24-48 hours.' },
          ],
        },
        'north-middlesex': {
          headline: `Interior Painting for North Middlesex & Merrimack Valley Homes`,
          intro: `From Lowell's historic row houses to Westford's modern colonials, North Middlesex interiors need painters who can shift between very different challenges. A 130-year-old plaster wall in Lowell's Acre neighborhood demands completely different prep than a 2010 drywall finish in a Chelmsford subdivision. Our crews handle both with equal skill.`,
          features: [
            'Historic interior restoration for Lowell\'s mill-era housing',
            'Modern color updates for 2000s-era subdivisions in Chelmsford, Westford, Billerica',
            'Wallpaper removal and wall restoration — common in older Carlisle and Groton homes',
            'Multi-family interior packages for Lowell and Tyngsboro landlords',
          ],
          process: [
            { step: 'Home Assessment', detail: 'We evaluate every room — surface condition, lighting, existing colors — to recommend the right approach and products.' },
            { step: 'Thorough Prep', detail: 'Fill nail pops, repair drywall damage, sand rough patches, and prime stains. Old wallpaper removed cleanly.' },
            { step: 'Quality Application', detail: 'Premium paint applied with clean edges, consistent coverage, and no lap marks. We take our time to get it right.' },
            { step: 'Protection & Cleanup', detail: 'All furniture, floors, and fixtures protected. We leave your home cleaner than we found it.' },
          ],
        },
        'norfolk-south': {
          headline: `Interior Painting That Matches Norfolk County's High Standards`,
          intro: `Norfolk County homeowners in Wellesley, Dover, and Needham expect museum-quality interior finishes — and they should. These are premium properties where every detail matters. We spray-finish all trim and doors for a flawless factory look, use only Benjamin Moore Aura and Advance (the absolute top tier), and perform meticulous edge work that stands up to scrutiny.`,
          features: [
            'Spray-applied trim, doors, and cabinets for factory-smooth results',
            'Benjamin Moore Aura walls and Advance trim — the premium standard for premium homes',
            'Estate-scale interiors: great rooms, two-story foyers, cathedral ceilings',
            'Staging-ready painting packages for real estate listings in Norfolk County\'s competitive market',
          ],
          process: [
            { step: 'Premium Consultation', detail: 'In-home color consultation with large-format test patches. We consider natural light, furnishings, and architectural style.' },
            { step: 'Meticulous Prep', detail: 'Every surface sanded, primed, and perfected. We caulk every seam, fill every nail hole, and ensure flawless substrate.' },
            { step: 'Expert Application', detail: 'Sprayed trim and doors, back-rolled walls, precision-cut edges. Multiple coats for deep, even coverage.' },
            { step: 'Detail-Level Walkthrough', detail: 'We inspect every room under natural and artificial light. Touch-ups completed before we call it done.' },
          ],
        },
        'north-central': {
          headline: `Affordable Interior Painting for North Central MA Families`,
          intro: `Fitchburg and Leominster families want quality interior painting that doesn't break the budget. Builder-grade paint from the 1990s-2000s is fading and scuffing, kids' rooms need freshening up, and older homes need plaster repair before new paint. We offer quality work at fair prices — premium results without the premium Boston-area markup.`,
          features: [
            'Budget-friendly room-by-room scheduling — paint now, pay as you go',
            'Durable, scrubbable finishes for active families with kids and pets',
            'Old plaster repair for Fitchburg and Leominster\'s industrial-era homes',
            'Antique home interior restoration in Harvard, Lancaster, and Berlin',
          ],
          process: [
            { step: 'Fair Estimate', detail: 'Transparent pricing with no hidden fees. We itemize every room so you know exactly what you\'re paying for.' },
            { step: 'Careful Prep', detail: 'We repair what needs fixing — cracks, nail pops, water stains — and prime properly so the paint lasts.' },
            { step: 'Quality Paint', detail: 'Sherwin-Williams ProMar 200 or Duration — professional-grade paint that\'s durable and washable. No cheap contractor paint.' },
            { step: 'Respectful Service', detail: 'We protect your home, keep the workspace clean, and finish on schedule. Honest work for honest families.' },
          ],
        },
        'blackstone-valley': {
          headline: `Interior Painting for Blackstone Valley Homes & Historic Villages`,
          intro: `Blackstone Valley's mill village homes in Whitinsville, Hopedale, and Uxbridge have interiors with real character — horsehair plaster, hand-carved trim, built-in china cabinets. But they also have moisture issues from the Valley's humid climate. We paint these interiors with respect for their history and materials that fight the Valley's moisture.`,
          features: [
            'Moisture-resistant interior primers and paints for Valley\'s high-humidity homes',
            'Historic mill village interior preservation — original trim, plaster, built-ins',
            'Mold and mildew treatment before interior painting in damp basements and bathrooms',
            'Modern updates for suburban homes in Milford, Sutton, and Upton',
          ],
          process: [
            { step: 'Moisture Assessment', detail: 'We check humidity levels, identify moisture sources, and treat any mold or mildew before painting begins.' },
            { step: 'Surface Prep', detail: 'Plaster repair, mildew treatment, priming with moisture-barrier primer. We solve the problem, then paint.' },
            { step: 'Anti-Moisture Application', detail: 'Interior paints with mildew-resistant additives. Bathroom and kitchen finishes rated for high-humidity environments.' },
            { step: 'Lasting Results', detail: 'Our interior paint jobs in the Valley last because we address the climate, not just the cosmetics.' },
          ],
        },
      }
      return content[regionSlug] || content['metrowest']
    },
  },
  {
    name: 'Exterior Painting',
    slug: 'exterior-painting',
    shortDesc: 'Weather-resistant exterior painting built for New England.',
    getRegionContent: (regionName, regionSlug) => {
      const content: Record<string, { headline: string; intro: string; features: string[]; process: { step: string; detail: string }[] }> = {
        'greater-boston': {
          headline: `Exterior Painting Built for Boston's Coastal Climate`,
          intro: `Greater Boston exteriors battle salt air from the harbor, freeze-thaw cycles, intense summer sun, and urban pollution. A paint job that lasts here needs to be engineered for this specific climate — not just slapped on with whatever's on sale. From Beacon Hill townhouses to Newton colonials, we apply exterior systems designed for Boston's toughest conditions.`,
          features: [
            'Salt-air resistant exterior coatings for coastal Boston neighborhoods',
            'Brownstone and masonry painting with breathable elastomeric coatings',
            'Scaffolding and staging for multi-story row houses in Somerville, Cambridge, Brookline',
            'Lead-safe exterior prep for pre-1978 homes — EPA RRP certified',
          ],
          process: [
            { step: 'Exterior Inspection', detail: 'Full assessment of siding, trim, windows, and substrate condition. We identify wood rot, failed caulking, and moisture entry points.' },
            { step: 'Power Wash & Prep', detail: 'Professional pressure washing to remove dirt, mildew, and loose paint. Scraping, sanding, and carpentry repairs as needed.' },
            { step: 'Prime & Paint', detail: 'Oil-based primer on bare wood, followed by two coats of Sherwin-Williams Duration or Benjamin Moore Aura Exterior.' },
            { step: 'Quality Check', detail: 'Full perimeter walkthrough. We check coverage, adhesion, and finish quality on every surface before cleanup.' },
          ],
        },
        'metrowest': {
          headline: `Exterior Painting That Protects MetroWest's Suburban Homes`,
          intro: `MetroWest's tree-lined neighborhoods mean homes contend with shade, moisture, leaf debris, and algae growth. Cedar siding in Sudbury fades and splits. Vinyl trim in Framingham chalks and yellows. New construction in Hopkinton shows builder shortcuts within 3 years. We restore and protect MetroWest exteriors with prep and materials designed for these specific conditions.`,
          features: [
            'Cedar shingle and clapboard restoration for Sudbury, Wayland, Weston, Sherborn',
            'Builder-grade exterior upgrades for 2000s homes in Hopkinton, Southborough, Westborough',
            'Deck and fence staining for shaded, wooded MetroWest properties',
            'Wood rot repair with PVC and Boral trim that never rots again',
          ],
          process: [
            { step: 'Property Assessment', detail: 'We walk the entire exterior, noting wood rot, paint failure, caulking gaps, and areas that need carpentry before painting.' },
            { step: 'Repair & Prep', detail: 'Replace rotted wood, re-caulk windows and trim, power wash, scrape, and sand. The prep determines the lifespan.' },
            { step: 'Weather-Rated Application', detail: 'Two coats of premium acrylic exterior rated for 15+ years. Colors chosen with UV-fade resistance in mind.' },
            { step: 'Detail Finish', detail: 'Windows, shutters, doors, and trim receive dedicated attention. Final walkthrough with the homeowner.' },
          ],
        },
        'worcester-area': {
          headline: `Exterior Painting That Survives Central MA's Brutal Winters`,
          intro: `Central Massachusetts exteriors endure some of the harshest conditions in the state — colder temperatures, heavier snow, longer freeze-thaw cycles than the coast. Worcester's triple-deckers need exterior paint that can flex with massive temperature swings. Rural homes in Princeton and Westminster face wind-driven rain at elevation. We build exterior paint systems that actually survive here.`,
          features: [
            'Triple-decker 3-coat exterior systems with 15+ year rated paints',
            'High-elevation weather protection for Princeton, Westminster, Rutland, Sterling',
            'Ice dam damage repair and prevention before exterior painting',
            'Multi-family volume pricing for Worcester landlords and property managers',
          ],
          process: [
            { step: 'Climate Assessment', detail: 'We evaluate exposure direction, elevation, and weather patterns specific to your property\'s location in Central MA.' },
            { step: 'Full Scrape & Repair', detail: 'Every surface scraped to sound substrate, rotted wood replaced, caulking renewed. No shortcuts on triple-deckers.' },
            { step: '3-Coat System', detail: 'Oil-based penetrating primer, then two coats of 100% acrylic with high flexibility for Central MA temperature swings.' },
            { step: 'Winter-Ready Finish', detail: 'Applied at proper temperatures with adequate cure time. We schedule exterior work for optimal weather windows.' },
          ],
        },
        'north-middlesex': {
          headline: `Exterior Painting for Every Property Type in North Middlesex`,
          intro: `North Middlesex ranges from dense urban neighborhoods in Lowell to rural farmsteads in Groton and Townsend. Our exterior painting teams handle Victorian restorations in downtown Lowell, vinyl-sided colonials in Chelmsford, cedar-shingled antiques in Carlisle, and barn-red outbuildings in Dunstable — each with the right prep and products for the surface.`,
          features: [
            'Victorian and mill-era exterior restoration for Lowell\'s historic neighborhoods',
            'Suburban home exterior updates in Chelmsford, Westford, Tewksbury, Billerica',
            'Rural property painting: homes, barns, garages, sheds — one mobilization',
            'Lead paint safe removal for pre-1940s homes across North Middlesex',
          ],
          process: [
            { step: 'Property Survey', detail: 'We assess every exterior surface, identify lead paint risk, measure square footage, and plan the approach.' },
            { step: 'Comprehensive Prep', detail: 'Power wash, scrape, sand, repair wood, re-caulk. For rural properties, we include outbuildings in the prep phase.' },
            { step: 'Quality Application', detail: 'Premium exterior paint matched to each surface type. Multiple coats on all exposed surfaces.' },
            { step: 'Complete Coverage', detail: 'Homes, trim, shutters, doors, and any outbuildings receive the same quality of finish.' },
          ],
        },
        'norfolk-south': {
          headline: `Premium Exterior Painting for Norfolk County's Finest Properties`,
          intro: `Norfolk County estates in Dover, Wellesley, and Needham have complex exterior architectures — cedar shingles, multi-level rooflines, dormers, cupolas, and hand-milled trim. These aren't cookie-cutter paint jobs. We deploy experienced crews with proper staging equipment, use only the highest-rated exterior coatings, and apply each product to its optimal surface.`,
          features: [
            'Estate-scale exterior painting for 4,000-8,000+ sq ft properties',
            'Cedar shingle restoration with oil and acrylic stain systems',
            'HOA and historic district color compliance in Wellesley, Walpole, Westwood',
            'Staging and scaffolding for complex multi-level rooflines and dormers',
          ],
          process: [
            { step: 'Detailed Exterior Survey', detail: 'We document every surface, note condition ratings, identify repairs, and create a comprehensive scope of work.' },
            { step: 'Expert Prep', detail: 'Staging for safe height access. Wood rot repair, caulking, power wash, and hand-scraping on delicate trim.' },
            { step: 'Surface-Matched Coatings', detail: 'Oil primer on bare cedar, elastomeric on stucco, acrylic on trim. Every product matched to the surface.' },
            { step: 'Estate-Quality Inspection', detail: 'Project lead reviews every surface at completion. The standard is perfection — nothing less.' },
          ],
        },
        'north-central': {
          headline: `Exterior Painting Built to Endure North Central MA Winters`,
          intro: `North Central MA gets hammered by weather — heavy snow, ice storms, and freeze-thaw cycles that destroy paint faster than anywhere else in the state. Fitchburg and Leominster's industrial-era homes have wood siding with a century of paint buildup that fails every few years. We strip these surfaces properly and apply modern paint systems that actually last through North Central MA winters.`,
          features: [
            'Full paint stripping for multi-layer industrial-era homes in Fitchburg and Leominster',
            'Cold-climate rated exterior coatings with maximum flexibility',
            'Ice dam damage repair and moisture barrier installation',
            'Farmhouse and outbuilding painting in Harvard, Lancaster, Berlin',
          ],
          process: [
            { step: 'Historic Assessment', detail: 'We evaluate paint layers, wood condition, moisture damage, and determine the right removal method.' },
            { step: 'Deep Prep', detail: 'Infrared stripping or chemical removal of failed layers. Wood repair, flashing install, and proper drainage.' },
            { step: 'Climate-Rated System', detail: 'Penetrating primer followed by high-flexibility exterior acrylic rated for extreme temperature swings.' },
            { step: 'Winter-Proofed Finish', detail: 'Extra attention to ice dam zones, water tables, and south-facing walls that take the most abuse.' },
          ],
        },
        'blackstone-valley': {
          headline: `Exterior Painting for Blackstone Valley's Humid Climate`,
          intro: `The Blackstone River corridor creates unique exterior painting challenges — higher humidity, morning fog, and damp conditions that accelerate paint failure and mold growth. Homes in Northbridge, Uxbridge, and Blackstone need exterior coatings specifically designed for moisture resistance. We also preserve the historic character of the Valley's mill village architecture.`,
          features: [
            'Anti-moisture exterior systems for Blackstone River corridor homes',
            'Mill village exterior preservation in Whitinsville, Hopedale, Uxbridge',
            'Mold and mildew preventive coatings for north-facing and shaded walls',
            'MA/RI border service — fully licensed for both sides of the Valley',
          ],
          process: [
            { step: 'Moisture Assessment', detail: 'We identify moisture sources, check for mold, evaluate drainage, and plan moisture mitigation before painting.' },
            { step: 'Anti-Mold Prep', detail: 'Professional mold treatment, power wash with mildewcide, and application of moisture-barrier primer.' },
            { step: 'Humidity-Resistant Paint', detail: 'Exterior coatings with anti-microbial additives. Breathable formulas that let moisture escape without trapping it.' },
            { step: 'Valley-Tested Results', detail: 'Our exterior systems are proven in the Blackstone Valley\'s damp conditions — they last because they\'re designed for them.' },
          ],
        },
      }
      return content[regionSlug] || content['metrowest']
    },
  },
  {
    name: 'Cabinet Painting',
    slug: 'cabinet-painting',
    shortDesc: 'Transform kitchen cabinets for 70% less than replacement.',
    getRegionContent: (regionName, regionSlug) => {
      const content: Record<string, { headline: string; intro: string; features: string[]; process: { step: string; detail: string }[] }> = {
        'greater-boston': {
          headline: `Cabinet Painting for Greater Boston Kitchens`,
          intro: `Boston-area kitchens vary wildly — from tiny galley kitchens in Somerville walk-ups to grand chef's kitchens in Newton estates. Regardless of size, dated cabinets drag down your entire kitchen's look. We transform honey oak, cherry, and maple cabinets into modern, fresh showpieces with our spray-applied lacquer finish — no need for $30K-$50K cabinet replacement.`,
          features: [
            'Small kitchen specialists — we work efficiently in tight Boston and Cambridge galley kitchens',
            'Condo-friendly process with low-odor, fast-cure cabinet finishes',
            'Premium conversion from dark wood to light modern colors (white, gray, sage, navy)',
            'Hardware upgrade coordination — we can install new pulls and handles during the project',
          ],
          process: [
            { step: 'Kitchen Assessment', detail: 'We evaluate cabinet condition, door style, and layout to ensure cabinet painting is the right solution for your kitchen.' },
            { step: 'Door Removal', detail: 'All doors and drawers removed, labeled, and transported to our spray facility for controlled application.' },
            { step: 'Spray Application', detail: 'Cabinet-grade lacquer sprayed in dust-free conditions. Multiple coats for a smooth, durable factory finish.' },
            { step: 'Reinstallation', detail: 'Doors rehung with new hardware. Boxes touched up on-site. Your kitchen is back in service in 5-7 days.' },
          ],
        },
        'metrowest': {
          headline: `Cabinet Painting for MetroWest's 1990s-2000s Kitchens`,
          intro: `MetroWest is packed with homes built during the suburban boom — and those honey-oak and golden-cherry cabinets from 1995-2010 are now the #1 thing homeowners want to change. A full cabinet replacement costs $25,000-$50,000. Our cabinet painting transforms them for 70% less with a factory-smooth spray finish. Framingham, Natick, Sudbury, and Hopkinton homeowners love the results.`,
          features: [
            'Honey oak to white, gray, or navy — the most requested MetroWest kitchen transformation',
            'Island accent colors — two-tone kitchens are MetroWest\'s most popular trend',
            'Bathroom vanity painting included — match your kitchen\'s new look throughout the home',
            'Builder-grade cabinet upgrade with high-end lacquer finish',
          ],
          process: [
            { step: 'Free Kitchen Consultation', detail: 'We bring large color samples to your kitchen. See how colors look against your countertop, backsplash, and flooring.' },
            { step: 'Professional Removal', detail: 'Doors and drawers labeled, removed, and prepped. Boxes cleaned, degreased, scuff-sanded, and primed on-site.' },
            { step: 'Controlled Spray Finish', detail: 'Multiple coats of cabinet-grade lacquer applied in our spray facility. Smooth, even, and durable.' },
            { step: 'Kitchen Reveal', detail: 'Doors reinstalled, hardware mounted, final touch-ups. Your 1990s kitchen now looks like 2025.' },
          ],
        },
        'worcester-area': {
          headline: `Affordable Cabinet Painting in Worcester & Central MA`,
          intro: `Worcester-area homeowners want updated kitchens without the premium prices charged by Boston-area refinishers. Our cabinet painting service delivers the same factory-quality spray finish at Central MA prices. Whether you have builder-grade oak in a Shrewsbury colonial or painted cabinets peeling in a Worcester triple-decker, we make them look brand new.`,
          features: [
            'Budget-friendly cabinet transformation — 70% less than replacement',
            'Rental property cabinet refresh for Worcester landlords',
            'Durable finishes that withstand heavy kitchen use in family homes',
            'Quick turnaround — most kitchens completed in 5-7 days',
          ],
          process: [
            { step: 'Fair Quote', detail: 'Transparent pricing based on door count and kitchen size. No hidden fees or surprise charges.' },
            { step: 'Efficient Removal', detail: 'Doors removed, labeled, and prepped. We work quickly to minimize kitchen downtime.' },
            { step: 'Quality Spray Finish', detail: 'Professional lacquer sprayed to a smooth, even finish. Durable enough for the busiest family kitchens.' },
            { step: 'Fast Return', detail: 'Reinstalled and ready to use. Most Central MA kitchens done in under a week.' },
          ],
        },
        'north-middlesex': {
          headline: `Cabinet Painting for North Middlesex & Merrimack Valley Kitchens`,
          intro: `Subdivision homes across Chelmsford, Westford, Billerica, and Tewksbury share the same problem: dated builder-grade cabinets. The medium-oak finish that was standard in the 1990s-2000s now looks tired. Our cabinet painting converts those dated kitchens into modern, clean spaces with a professional spray finish — no demolition, no mess, no $30K price tag.`,
          features: [
            'Builder-grade oak to modern white, gray, or two-tone in 5-7 days',
            'Suburban kitchen sizes — from compact ranch kitchens to large colonial layouts',
            'Bathroom vanity refinishing available as an add-on',
            'Weekend scheduling available to minimize disruption to family routines',
          ],
          process: [
            { step: 'In-Home Consultation', detail: 'We visit your kitchen, assess cabinet condition, and show you color options that work with your existing counters and flooring.' },
            { step: 'Careful Removal', detail: 'Every door and drawer labeled and removed. Cabinet boxes cleaned and prepped on-site.' },
            { step: 'Spray Finish', detail: 'Professional-grade lacquer applied in controlled conditions for a flawless, factory-smooth result.' },
            { step: 'Beautiful Result', detail: 'Doors reinstalled, hardware upgraded if desired. Your kitchen feels brand new.' },
          ],
        },
        'norfolk-south': {
          headline: `Premium Cabinet Refinishing for Norfolk County Kitchens`,
          intro: `Norfolk County kitchens in Wellesley, Dover, and Needham demand flawless finishes. These aren't average cabinets — many are custom maple, cherry, or inset-door designs that need spray-applied lacquer, not brush-and-roller work. We deliver the kind of cabinet finish that looks like it came from a custom millwork shop — because our spray process matches that quality.`,
          features: [
            'Custom cabinet refinishing for high-end kitchens in Dover, Wellesley, Needham',
            'Inset door and beaded-frame expertise — these details require precision spraying',
            'Benjamin Moore Advance and professional lacquer options for the smoothest possible finish',
            'Staging-ready kitchen refresh for real estate listings in Norfolk County',
          ],
          process: [
            { step: 'Premium Consultation', detail: 'We evaluate cabinet construction, door style, and discuss finish options. Color consultation included.' },
            { step: 'Expert Removal', detail: 'Doors carefully removed and documented. Custom doors and specialty hardware handled with extra care.' },
            { step: 'Artisan Spray Finish', detail: 'Multiple coats of catalyzed lacquer for maximum durability and smoothness. The best finish available.' },
            { step: 'Precision Reinstall', detail: 'Doors aligned perfectly, hardware reinstalled or upgraded. We ensure every door closes flush and smooth.' },
          ],
        },
        'north-central': {
          headline: `Cabinet Painting at Honest Prices in North Central MA`,
          intro: `Fitchburg and Leominster homeowners want modern kitchens but don't want to pay Boston prices for cabinet replacement. Our cabinet painting service gives you a brand-new kitchen look at a fraction of the cost. We spray-apply durable lacquer finish that transforms dated cabinets — oak, maple, or cherry — into fresh, modern showpieces.`,
          features: [
            'Affordable cabinet transformation — quality results at North Central MA prices',
            'Room-by-room payment options available for families on a budget',
            'Durable finishes built for busy family kitchens',
            'Antique kitchen cabinet restoration for Harvard and Lancaster period homes',
          ],
          process: [
            { step: 'Honest Quote', detail: 'We price based on door count and complexity — transparent and fair. No inflated Boston pricing.' },
            { step: 'Professional Removal', detail: 'Doors removed, labeled, and taken for spray finishing. Cabinet boxes prepped on-site.' },
            { step: 'Spray Finish', detail: 'Even, smooth lacquer finish — the same quality as shops charging twice our price.' },
            { step: 'Quick Install', detail: 'Doors back on, hardware updated, kitchen ready to use. Most jobs done in 5-7 days.' },
          ],
        },
        'blackstone-valley': {
          headline: `Cabinet Painting for Blackstone Valley Homes`,
          intro: `Blackstone Valley kitchens — from Milford's center to Douglas's wooded neighborhoods — deserve an update without the renovation hassle. Our spray-applied cabinet finish converts dated wood cabinets into modern, moisture-resistant surfaces. In the Valley's humid climate, we use mildew-resistant finishes that hold up in kitchens where moisture is a constant concern.`,
          features: [
            'Moisture-resistant cabinet finishes designed for the Valley\'s humid climate',
            'Mill village kitchen updates that respect historic home character',
            'Modern color options for suburban homes in Milford, Sutton, Upton',
            'Budget-friendly alternative to full cabinet replacement',
          ],
          process: [
            { step: 'Valley-Specific Assessment', detail: 'We check for moisture issues and recommend finishes rated for the Blackstone Valley\'s humidity.' },
            { step: 'Thorough Prep', detail: 'Doors removed, degreased, scuff-sanded, and primed with moisture-blocking primer.' },
            { step: 'Humidity-Resistant Finish', detail: 'Spray-applied lacquer with anti-moisture properties. Built to last in Valley kitchens.' },
            { step: 'Complete Installation', detail: 'Doors reinstalled, hardware upgraded. Your kitchen refreshed and protected.' },
          ],
        },
      }
      return content[regionSlug] || content['metrowest']
    },
  },
  {
    name: 'Commercial Painting',
    slug: 'commercial-painting',
    shortDesc: 'Offices, retail, restaurants & medical facilities.',
    getRegionContent: (regionName, regionSlug) => ({
      headline: `Commercial Painting Services Across ${regionName}`,
      intro: `Businesses across ${regionName} trust JH Painting for commercial painting that's done right — on schedule, within budget, and with minimal disruption to your operations. We paint offices, retail spaces, restaurants, medical facilities, and multi-unit commercial buildings with the same quality and professionalism that's earned us 40+ five-star reviews.`,
      features: [
        `After-hours and weekend scheduling for ${regionName} businesses — zero disruption to your operations`,
        'Low-VOC, quick-dry commercial paints that allow next-day business operations',
        'Retail, restaurant, medical, and office painting — each with appropriate finishes and compliance',
        `Multi-location commercial painting programs across ${regionName} with volume pricing`,
      ],
      process: [
        { step: 'Site Assessment', detail: 'We evaluate your space, discuss brand colors, identify special requirements, and create a detailed scope and timeline.' },
        { step: 'Scheduling', detail: 'Work scheduled for evenings, weekends, or off-peak hours. Your business stays open and productive.' },
        { step: 'Professional Execution', detail: 'Commercial-grade paints applied efficiently. Clean edges, consistent finish, and proper ventilation throughout.' },
        { step: 'Final Walkthrough', detail: 'Property manager walkthrough before handoff. We ensure every surface meets commercial standards.' },
      ],
    }),
  },
  {
    name: 'Residential Painting',
    slug: 'residential-painting',
    shortDesc: 'Complete home painting with expert color consultation.',
    getRegionContent: (regionName, regionSlug) => ({
      headline: `Complete Residential Painting in ${regionName}`,
      intro: `Whether you're refreshing a single room or transforming your entire home, ${regionName} homeowners choose JH Painting for our attention to detail, premium materials, and local reputation. We understand the housing styles in this region — from historic homes to new construction — and we tailor our approach to each property's specific needs.`,
      features: [
        `Whole-home interior and exterior painting packages for ${regionName} homeowners`,
        'Room-by-room scheduling so you can stay in your home during the project',
        'Expert color consultation — we help you choose colors that work with your home\'s architecture',
        'Premium Benjamin Moore and Sherwin-Williams paints — the best products on every project',
      ],
      process: [
        { step: 'Home Consultation', detail: 'We walk through your home, discuss your vision, and recommend colors and finishes for every space.' },
        { step: 'Detailed Proposal', detail: 'Room-by-room quote with product specifications. You know exactly what you\'re getting and what it costs.' },
        { step: 'Expert Application', detail: 'Professional prep, premium paint, and careful technique. Every room finished to the same high standard.' },
        { step: 'Satisfaction Guarantee', detail: 'Final walkthrough with the homeowner. Any touch-ups completed before we consider the job done.' },
      ],
    }),
  },
  {
    name: 'Carpentry',
    slug: 'carpentry',
    shortDesc: 'Wood rot repair, trim, siding & deck restoration.',
    getRegionContent: (regionName, regionSlug) => ({
      headline: `Carpentry & Wood Repair in ${regionName}`,
      intro: `New England weather is tough on wood — and ${regionName} homes feel it. Rotted window frames, damaged trim, deteriorated siding, and weathered decks are common across the region. Our carpentry crews repair and replace damaged wood before painting, ensuring the new paint has a solid foundation that will last for years.`,
      features: [
        `Window and door frame repair and replacement for ${regionName}'s weather-damaged homes`,
        'PVC and composite trim installation — never rot, never paint again',
        'Deck board replacement and restoration before staining',
        'Siding repair: clapboard, cedar shingle, and panel replacement',
      ],
      process: [
        { step: 'Damage Assessment', detail: 'We probe and inspect all wood surfaces to identify rot, insect damage, and structural concerns.' },
        { step: 'Repair Plan', detail: 'We recommend repair vs. replacement for each damaged area, using rot-proof materials where appropriate.' },
        { step: 'Expert Carpentry', detail: 'Licensed carpenters replace damaged wood, install new trim, and ensure everything is flush and sealed.' },
        { step: 'Paint-Ready Finish', detail: 'All carpentry work primed and ready for the painting crew. Seamless integration with the existing structure.' },
      ],
    }),
  },
  {
    name: 'Power Washing',
    slug: 'power-washing',
    shortDesc: 'Professional cleaning for driveways, siding, decks & patios.',
    getRegionContent: (regionName, regionSlug) => ({
      headline: `Professional Power Washing in ${regionName}`,
      intro: `${regionName} properties accumulate dirt, algae, mold, mildew, and moss — especially after New England's wet winters and humid summers. Our professional power washing uses calibrated pressure and biodegradable detergents to clean every surface safely and thoroughly. Driveways, siding, decks, patios, and fences sparkling clean in one day.`,
      features: [
        `Soft-wash technique for delicate surfaces — cedar siding, painted trim, windows`,
        'High-pressure cleaning for concrete driveways, walkways, and patios',
        'Deck cleaning and brightening before staining or sealing',
        `Mildewcide treatment that prevents regrowth for months — not just cosmetic cleaning`,
      ],
      process: [
        { step: 'Surface Assessment', detail: 'We evaluate each surface and select the appropriate pressure, nozzle, and cleaning solution.' },
        { step: 'Pre-Treatment', detail: 'Biodegradable detergent and mildewcide applied to kill organic growth at the root.' },
        { step: 'Professional Wash', detail: 'Calibrated pressure for each surface. We never damage wood, paint, or delicate materials.' },
        { step: 'Rinse & Inspect', detail: 'Complete rinse and visual inspection. Your property looks brand new — and stays clean longer.' },
      ],
    }),
  },
]

export default function RegionServicePage() {
  const params = useParams()
  const regionSlug = params.region as string
  const serviceSlug = params.service as string
  const region = getRegionBySlug(regionSlug)
  const service = servicesData.find(s => s.slug === serviceSlug)

  if (!region || !service) {
    return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}><h1>Page Not Found</h1></div>
  }

  const regionCities = region.citySlugs
    .map(slug => getCityBySlug(slug))
    .filter(Boolean)

  const content = service.getRegionContent(region.name, region.slug)
  const otherServices = servicesData.filter(s => s.slug !== serviceSlug)

  return (
    <>
      <main>
        {/* Hero */}
        <section style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', color: '#fff', padding: '5rem 0 3rem', textAlign: 'center' }}>
          <div className="container">
            <p style={{ color: '#c9a84c', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              {service.name} &bull; {region.name}
            </p>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)', fontWeight: 800, marginBottom: '1rem' }}>
              {content.headline}
            </h1>
            <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.85)', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              {content.intro}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+15086908886" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#c9a84c', color: '#1a1a2e', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.125rem' }}>
                (508) 690-8886
              </a>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '2px solid #c9a84c', color: '#c9a84c', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: 600 }}>
                Get FREE Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '4rem 0', background: '#fff' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 700, marginBottom: '2.5rem', color: '#1a1a2e' }}>
              What Sets Our {service.name} Apart in {region.name}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto' }}>
              {content.features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#f8f9fa', padding: '1.25rem', borderRadius: '10px', border: '1px solid #eee' }}>
                  <span style={{ color: '#c9a84c', fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }}>&#10003;</span>
                  <p style={{ color: '#333', fontSize: '0.9375rem', lineHeight: 1.6 }}>{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section style={{ padding: '4rem 0', background: '#f8f9fa' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 700, marginBottom: '2.5rem', color: '#1a1a2e' }}>
              Our {service.name} Process
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {content.process.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: '#c9a84c', color: '#1a1a2e', borderRadius: '50%', fontSize: '1rem', fontWeight: 800, flexShrink: 0 }}>
                    {idx + 1}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.375rem' }}>{step.step}</h3>
                    <p style={{ color: '#555', fontSize: '0.9375rem', lineHeight: 1.6 }}>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cities for this service */}
        <section style={{ padding: '4rem 0', background: '#fff' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {service.name} in {region.name} Cities
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2.5rem' }}>
              Click any city for local {service.name.toLowerCase()} details and pricing
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {regionCities.map((city) => {
                if (!city) return null
                return (
                  <Link
                    key={city.slug}
                    href={`/cities/${getCitySlugWithState(city.slug)}/${serviceSlug}`}
                    style={{ display: 'block', background: '#f8f9fa', borderRadius: '8px', padding: '1rem', border: '1px solid #eee', fontWeight: 600, color: '#1a1a2e', fontSize: '0.9375rem' }}
                  >
                    {city.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section style={{ padding: '3rem 0', background: '#f8f9fa' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Other Services in {region.name}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
              {otherServices.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/regions/${region.slug}/${svc.slug}`}
                  style={{ background: '#1a1a2e', color: '#fff', padding: '0.625rem 1.25rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 500 }}
                >
                  {svc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #b8943f 100%)', padding: '3rem 0', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ color: '#1a1a2e', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Get a FREE {service.name} Quote in {region.name}
            </h2>
            <p style={{ color: 'rgba(26,26,46,0.8)', marginBottom: '1.5rem' }}>
              Licensed & $2M insured. 40+ five-star reviews. No obligation.
            </p>
            <a href="tel:+15086908886" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1a1a2e', color: '#c9a84c', padding: '1rem 2.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.25rem' }}>
              (508) 690-8886
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
