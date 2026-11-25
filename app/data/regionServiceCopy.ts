/**
 * regionServiceCopy.ts - region-specific copy for the four services whose
 * region pages were one template with the region name swapped in
 * (commercial, residential, carpentry, power washing: 28 of the 49
 * /regions/<region>/<service> pages). Interior, exterior and cabinet already
 * had hand-written copy per region in app/regions/[region]/[service]/page.tsx.
 *
 * Written 2026-11-25 from the region's own numbers: housing-unit-weighted
 * aggregates of the ACS 2019-2023 figures in censusHousing.json for the towns
 * in each region, 10-year weather ranges from climateFacts.json, and only the
 * jobs that exist in projects.ts. No invented jobs, prices or reviews.
 */

export interface RegionServiceCopy {
  headline: string
  intro: string
  features: string[]
}

type Copy = Record<string, Record<string, RegionServiceCopy>>

export const REGION_SERVICE_COPY: Copy = {
  'commercial-painting': {
    'greater-boston': {
      headline: 'Commercial Painting for Greater Boston Landlords, Associations and Businesses',
      intro: `Two thirds of the housing in our Greater Boston towns is in multi-unit buildings: about a third in two- to four-family houses and four in ten in buildings of five units or more, and only about four in ten homes are owner-occupied. That makes a large share of commercial work here landlord and association work: unit turnovers, hallways and stairwells, porch stacks on triple-deckers. Next to it sit offices and storefronts in Waltham, Woburn, Burlington and Cambridge, where the job is done after hours so the business keeps trading. Our Waltham church exterior is documented on our projects page.`,
      features: [
        'Unit turnovers between tenants in Somerville, Medford, Watertown and Boston two- and three-families',
        'Condo association common areas: hallways, stairwells, entry doors and railings on a set schedule',
        'After-hours and weekend work for offices and retail along Route 128 in Waltham, Woburn and Burlington',
        'Lead-safe practices as standard: about 45% of homes in these towns were built before 1940',
      ],
    },
    metrowest: {
      headline: 'Commercial Painting for MetroWest Offices, Facilities and Rentals',
      intro: `Housing in MetroWest is mostly detached and about 70% owner-occupied, so commercial work here leans toward businesses rather than landlords: offices, training rooms, cafeterias and facilities along Route 9 and Route 20 in Framingham, Natick, Marlborough and Westborough. We are based in Marlborough, and our documented commercial jobs there (an employee cafeteria, a training room and offices) are on our projects page. Rental and condo work is concentrated in Framingham, Marlborough and Hudson, where multi-unit buildings make up a bigger share of the housing.`,
      features: [
        'Office, training-room and cafeteria repaints scheduled around shifts, as on our Marlborough jobs',
        'Night and weekend crews for retail and medical space along Route 9 and Route 20',
        'Apartment and condo common areas in Framingham, Marlborough and Hudson',
        'Short travel from our Marlborough shop, so touch-ups and punch lists do not wait a week',
      ],
    },
    'worcester-area': {
      headline: 'Commercial Painting for Worcester-Area Landlords and Businesses',
      intro: `About one in five homes across the Worcester area is in a two- to four-family building, mostly in Worcester itself, where triple-deckers are the classic rental. Commercial work here splits between rental owners turning units over and businesses in Worcester, Shrewsbury and Auburn that need space painted without closing. About 69% of the region's homes were built before 1980, so lead-safe setup is part of most rental work.`,
      features: [
        'Triple-decker unit turnovers and common stairwells in Worcester',
        'Porch and stair repaints on multi-family buildings, coordinated with every tenant',
        'Office and retail repaints in Worcester, Shrewsbury and Auburn, after hours when needed',
        'Lead-safe work on pre-1978 rental units, which most of the stock here is',
      ],
    },
    'north-middlesex': {
      headline: 'Commercial Painting for Lowell, Chelmsford and North Middlesex',
      intro: `North Middlesex is mostly detached housing outside Lowell, about 70% owner-occupied, so commercial work clusters in two places: Lowell's mill-era and multi-family buildings, and the office and light-industrial parks in Billerica, Chelmsford, Tewksbury and Westford. Older Lowell buildings bring plaster, high ceilings and layered paint; the office parks bring block walls, steel door frames and tight tenant timelines.`,
      features: [
        'Multi-family and mixed-use repaints in Lowell, including common areas and stairwells',
        'Office-park and light-industrial repaints in Billerica, Chelmsford and Westford',
        'Rust-inhibiting primers on steel frames and block walls in older commercial space',
        'Evening and weekend scheduling so tenants keep working',
      ],
    },
    'norfolk-south': {
      headline: 'Commercial Painting Across Norfolk County and the I-95 Corridor',
      intro: `Norfolk-south housing is mostly detached and about 69% owner-occupied, with home values ranging from the low $300,000s to well over $1.5 million depending on the town. Commercial work follows the business centres: Norwood, Dedham and Canton along Route 1 and I-95, Franklin and Foxborough further south, and the town centres of Needham and Wellesley, where storefronts and offices expect work done outside opening hours.`,
      features: [
        'Retail and office repaints along Route 1 in Norwood and Dedham, outside opening hours',
        'Medical and professional offices in Needham, Wellesley and Westwood with low-odour products',
        'Condo association exteriors and common areas in Franklin, Walpole and Norwood',
        'Written colour schedules so multi-site businesses match from location to location',
      ],
    },
    'north-central': {
      headline: 'Commercial Painting for Leominster, Fitchburg and North Central MA',
      intro: `Leominster and Fitchburg carry most of the commercial and multi-family building stock in this region; about one in five homes here is in a two- to four-family building and about 31% predate 1940. Commercial work is mill-era buildings, downtown storefronts and rental turnovers in the cities, and smaller offices and town buildings in Lancaster, Harvard and Berlin.`,
      features: [
        'Downtown storefront and office repaints in Leominster and Fitchburg',
        'Rental turnovers in two- and three-family buildings, with lead-safe setup',
        'Mill-era interiors with plaster, high ceilings and layered paint',
        'Town and church buildings in Lancaster, Harvard and Berlin',
      ],
    },
    'blackstone-valley': {
      headline: 'Commercial Painting for Milford and the Blackstone Valley',
      intro: `A quarter of the homes in the Blackstone Valley are in two- to four-family buildings, one of the highest shares in our area, and about 30% were built before 1940. So commercial work here is often rental property: mill-village houses in Whitinsville, Uxbridge and Blackstone, and multi-family buildings in Milford and Woonsocket. Businesses in Milford's Route 16 and Route 140 corridors round out the work.`,
      features: [
        'Multi-family and mill-village rental repaints in Whitinsville, Uxbridge and Blackstone',
        'Unit turnovers in Milford and Woonsocket, with lead-safe setup on older buildings',
        'Retail and office repaints along Route 16 and Route 140 in Milford',
        'Exterior work booked from mid April to early November, the region\'s frost-free window',
      ],
    },
  },
  'residential-painting': {
    'greater-boston': {
      headline: 'Residential Painting for Greater Boston Houses, Two-Families and Condos',
      intro: `Only about one home in five across our Greater Boston towns is a detached house. Most people live in two- and three-families, row houses or condos, and about 45% of the housing predates 1940. So a residential job here is often one unit, or one owner's floor plus the shared porch and stairs, inside plaster walls with original trim. Our Newton residential job and Boston interior job are documented on our projects page.`,
      features: [
        'Unit-by-unit work in two- and three-families, with tenants or family living upstairs',
        'Plaster repair and skim coat before paint in pre-war Somerville, Cambridge and Brookline homes',
        'Condo interiors with building rules, elevator bookings and association approvals handled',
        'Detached colonials and capes in Lexington, Winchester and Newton, inside and out',
      ],
    },
    metrowest: {
      headline: 'Whole-House Painting for MetroWest Homes',
      intro: `About 61% of MetroWest homes are detached and roughly 70% are owner-occupied, so whole-house jobs, inside and out, are the norm here. Most of the housing went up between the 1950s and 1990s: post-war capes and ranches in Framingham, split-levels and garrisons through the 1960s, and large colonials in Hopkinton, Sudbury and Southborough. Our documented jobs in Hopkinton, Hudson and Concord are on our projects page.`,
      features: [
        'Whole-house interior and exterior projects scheduled as one job',
        'Stained oak trim and kitchens from the 1980s and 1990s painted with bonding, stain-blocking primer',
        'Two-story foyers and cathedral ceilings in newer colonials, done from planks or scaffold',
        'Based in Marlborough, so most MetroWest towns are inside our daily service loop',
      ],
    },
    'worcester-area': {
      headline: 'Residential Painting for Worcester and Surrounding Towns',
      intro: `The Worcester area mixes Worcester's triple-deckers and Victorians with the raised ranches and colonials of the surrounding towns: the 1970s were the busiest building decade in seven of the region's towns, the 1950s in five. Home values here are lower than in MetroWest (a median around $415,000 across the towns), which is why many owners repaint rather than renovate. Our Shrewsbury and West Boylston interior jobs are documented on our projects page.`,
      features: [
        'Triple-decker owners: one unit, the porches or the whole building',
        'Raised ranches and 1970s colonials with T1-11 siding and stained trim',
        'Plaster repair in Worcester\'s older neighbourhoods before any paint goes on',
        'Exterior work booked inside the region\'s shorter season, about 106 to 113 good coating days a year',
      ],
    },
    'north-middlesex': {
      headline: 'Residential Painting for Chelmsford, Westford, Lowell and North Middlesex',
      intro: `The 1980s were the busiest building decade in six North Middlesex towns, so a lot of homes here are colonials and townhouse condos with cedar or early vinyl siding and finger-jointed pine trim. Lowell is the exception: older two- and three-families and mill-era housing. About 59% of homes across the region are detached and 70% owner-occupied. Our Groton interior job and Chelmsford job are documented on our projects page.`,
      features: [
        '1980s colonials: finger-jointed trim cut back and replaced at the miters before paint',
        'Townhouse condos with interior-only scopes and association rules for the exterior',
        'Older Lowell multi-families done unit by unit',
        'Snow runs about 41 to 50 inches a year here, so exterior trim and sills get extra prep',
      ],
    },
    'norfolk-south': {
      headline: 'Residential Painting for Wellesley, Needham, Franklin and Norfolk County',
      intro: `Norfolk-south covers a wide range: median home values run from the low $300,000s to over $1.5 million across its towns. Post-war capes and ranches are the most common (the 1950s were the busiest decade in eight towns), alongside large newer colonials in Franklin and Medway and high-end homes in Wellesley, Dover and Needham where the finish has to match the house. Our Wrentham built-in library shelving job is documented on our projects page.`,
      features: [
        'Sprayed trim and doors for a factory-level finish in Wellesley, Dover and Needham homes',
        'Post-war capes and ranches in Norwood, Dedham and Needham, inside and out',
        'Newer colonials in Franklin, Medway and Bellingham: open plans and two-story foyers',
        'Lighter snow than the rest of our area (about 30 to 40 inches a year), so exterior prep focuses on sun and moisture',
      ],
    },
    'north-central': {
      headline: 'Residential Painting for Leominster, Fitchburg and North Central MA',
      intro: `North Central has the heaviest snow in our service area, up to about 55 inches a year, and some of the oldest housing: about 31% of homes predate 1940. Leominster and Fitchburg have many older two- and three-families, while Harvard, Lancaster and Berlin are mostly detached homes on open lots. Values are lower than further east (a median around $467,000 across the towns), so most owners repaint and repair rather than replace.`,
      features: [
        'Older two- and three-families in Leominster and Fitchburg, unit by unit',
        'Open-lot colonials and farmhouses in Harvard, Lancaster and Berlin, full exteriors in one sequence',
        'Snow-season damage at sills, trim and porch floors repaired before paint',
        'Lead-safe setup on pre-1978 homes, which most of the stock here is',
      ],
    },
    'blackstone-valley': {
      headline: 'Residential Painting for Milford, Whitinsville and the Blackstone Valley',
      intro: `The Blackstone Valley has two kinds of housing: mill-village homes and two- to four-families (a quarter of all homes) in Whitinsville, Uxbridge, Blackstone and Milford, and 1980s and 1990s colonials in Upton, Sutton, Mendon and Douglas, where those decades added the most homes. Median values across the towns sit around $440,000. Our Douglas, Northbridge and Southbridge interior jobs are documented on our projects page.`,
      features: [
        'Mill-village houses and multi-families in Whitinsville, Uxbridge and Blackstone',
        '1980s and 1990s colonials in Upton, Sutton and Douglas, often a first full repaint',
        'Whole-home interiors like our Douglas, Northbridge and Southbridge jobs',
        'Exterior work booked from mid April to early November',
      ],
    },
  },
  carpentry: {
    'greater-boston': {
      headline: 'Carpentry and Rot Repair for Greater Boston Porches, Trim and Windows',
      intro: `With about 45% of homes in our Greater Boston towns built before 1940 and a third in two- to four-family buildings, the carpentry we see most is porch work: decking, railings, stair treads and columns on triple-decker porch stacks, plus original window sills and sash on older houses. We splice in matching profiles rather than tearing out whole runs of original trim.`,
      features: [
        'Porch decking, railings, treads and columns on two- and three-family porch stacks',
        'Original window sills and sash bottoms repaired with matching profiles',
        'Clapboard and corner-board repair on pre-war houses before repainting',
        'Freeze-thaw here is about 77 to 92 days a year, so new wood is primed on all six faces',
      ],
    },
    metrowest: {
      headline: 'Carpentry and Trim Repair for MetroWest Homes',
      intro: `MetroWest homes were mostly built between the 1950s and 1990s, and each era rots in its own places: sills and fascia on post-war capes and ranches, garage jambs and fascia on 1960s split-levels, finger-jointed pine trim at the miters on 1980s and 1990s colonials. About 61% of homes are detached, so most repairs are trim, decks and porches reached from the yard.`,
      features: [
        'Finger-jointed pine trim and brickmold replaced with PVC or primed solid stock',
        'Fascia, soffit and garage-door jambs on split-levels and ranches',
        'Deck boards, railings and stairs repaired before staining',
        'Repairs done by the same crew that paints, so nothing waits between trades',
      ],
    },
    'worcester-area': {
      headline: 'Carpentry and Rot Repair for Worcester-Area Homes',
      intro: `The Worcester area gets more weather than the towns east of it: about 42 to 54 inches of snow and up to about 103 freeze-thaw days a year. That cycle opens joints and drives water into end grain, so rot shows up at sills, porch floors and the bottom of T1-11 siding on the many 1970s raised ranches here. Worcester's triple-deckers add porch stacks that also have to pass inspection.`,
      features: [
        'Triple-decker porch decking, railings and stairs repaired to pass inspection',
        'T1-11 plywood replaced where the bottom edge has delaminated',
        'Window sills, door casings and corner boards cut back to sound wood and spliced',
        'All replacement wood primed on six faces before it goes up',
      ],
    },
    'north-middlesex': {
      headline: 'Carpentry and Trim Repair for North Middlesex Homes',
      intro: `The 1980s were the busiest building decade in six North Middlesex towns, and the signature failure of that era is finger-jointed pine trim and brickmold rotting at the joints. Add about 41 to 50 inches of snow a year and sills, door casings and the trim under gutters take most of the damage. Lowell's older multi-families add porch and stair work.`,
      features: [
        'Finger-jointed trim and brickmold on 1980s colonials, replaced with PVC where it makes sense',
        'Sills, door casings and trim below gutters cut back and spliced',
        'Porch and stair repairs on Lowell multi-families',
        'Deck repairs in Chelmsford, Westford and Billerica before staining',
      ],
    },
    'norfolk-south': {
      headline: 'Carpentry and Trim Repair Across Norfolk County',
      intro: `Norfolk-south has the mildest weather in our area: about 30 to 40 inches of snow a year, and as few as 65 freeze-thaw days in some towns. Rot here is driven more by trapped moisture than by frost, so it shows up behind gutters, at window sills and on shaded decks. The post-war capes and ranches that dominate eight of its towns need sill and fascia work; newer colonials need trim and deck repairs.`,
      features: [
        'Window sills, fascia and soffit on post-war capes and ranches',
        'Exterior trim and doors on high-end homes matched to the original profiles',
        'Shaded decks and railings repaired before staining',
        'Built-ins and shelving like our documented Wrentham library job',
      ],
    },
    'north-central': {
      headline: 'Carpentry and Rot Repair for North Central MA',
      intro: `North Central gets the most snow in our service area, up to about 55 inches a year, and about 91 to 95 freeze-thaw days. About 31% of homes predate 1940. Together that means sills, porch floors, stair treads and the bottom courses of clapboard take real damage here, and they get cut back and replaced before any paint goes on.`,
      features: [
        'Porch floors, stair treads and railings on older Leominster and Fitchburg homes',
        'Sills, sash bottoms and lower clapboard courses spliced with matching stock',
        'Open-lot farmhouses and colonials in Harvard, Lancaster and Berlin',
        'Six-face priming on every replacement board',
      ],
    },
    'blackstone-valley': {
      headline: 'Carpentry and Trim Repair for the Blackstone Valley',
      intro: `A quarter of Blackstone Valley homes are in two- to four-family buildings and about 30% predate 1940, so porches, stairs and original trim on mill-village houses are the usual carpentry here. In the newer 1980s and 1990s colonials of Upton, Sutton and Mendon, it is finger-jointed trim and deck repairs instead.`,
      features: [
        'Porch and stair repairs on mill-village and multi-family homes in Whitinsville, Uxbridge and Blackstone',
        'Finger-jointed trim and brickmold on 1980s and 1990s colonials',
        'Deck boards and railings repaired before staining',
        'Freeze-thaw runs about 89 to 96 days a year here, so replacement wood is primed on all six faces',
      ],
    },
  },
  'power-washing': {
    'greater-boston': {
      headline: 'Power Washing and Soft Washing in Greater Boston',
      intro: `In our Greater Boston towns, washing is often by building rather than by house: two-thirds of homes are in multi-unit buildings, and about 45% predate 1940. Old painted clapboard gets a soft wash only, because pressure strips loose paint and older layers can contain lead. Brick and stone are washed at low pressure so mortar is not cut back.`,
      features: [
        'Soft wash for painted clapboard and shingle on pre-war houses',
        'Whole-building washes for two- and three-families and condo associations',
        'Brick and stone fronts washed at low pressure to protect mortar',
        'Porches, stairs and walkways cleaned in the same visit',
      ],
    },
    metrowest: {
      headline: 'Power Washing for MetroWest Homes and Decks',
      intro: `About 61% of MetroWest homes are detached, so a typical washing job here is the whole house plus a deck, patio or walkway. Vinyl siding on the 1990s and newer colonials grows green mildew on the shaded sides, cedar on older homes turns grey, and aluminum siding on post-war capes chalks. Each gets a different detergent and pressure.`,
      features: [
        'Soft wash for vinyl siding with green mildew on the north and shaded sides',
        'Cedar shingle and trim cleaned and brightened rather than blasted',
        'Chalking aluminum siding washed gently to bring back the colour',
        'Decks washed and brightened before staining',
      ],
    },
    'worcester-area': {
      headline: 'Power Washing for Worcester-Area Homes and Decks',
      intro: `The Worcester area is the wettest part of our service area, with about 128 to 134 days of measurable rain or snow a year, which is why mildew and algae build up fast on siding and decks here. Our Worcester deck staining job, washed before stain, is documented on our projects page. Triple-decker porches and stairs are often washed together with the siding.`,
      features: [
        'Mildew and algae removal on siding in the region\'s wetter climate',
        'Decks washed and brightened before staining, as on our Worcester job',
        'Triple-decker porches, stairs and siding washed building by building',
        'T1-11 and cedar on 1970s homes cleaned without raising the grain',
      ],
    },
    'north-middlesex': {
      headline: 'Power Washing for Chelmsford, Westford and North Middlesex',
      intro: `North Middlesex homes are mostly detached, many of them 1980s colonials with cedar or early vinyl siding and cedar or pressure-treated decks. Those are the usual jobs here: a soft wash for the siding and a cleaner and brightener for the deck so stain can soak in. Our Chelmsford deck job is documented on our projects page.`,
      features: [
        'Cedar and early vinyl siding on 1980s colonials, soft-washed',
        'Cedar and pressure-treated decks cleaned and brightened before stain',
        'Townhouse condo buildings washed by elevation for associations',
        'Walkways and patios washed in the same visit',
      ],
    },
    'norfolk-south': {
      headline: 'Power Washing Across Norfolk County',
      intro: `Norfolk-south is wet (about 128 to 133 rain or snow days a year) but mild, with the least snow in our area. That favours mildew over frost damage, especially on shaded siding and decks under trees. High-end homes here often have cedar, fiber cement or composite decking, which is washed within the manufacturer's rules so warranties stay valid.`,
      features: [
        'Shaded siding and decks cleared of mildew and algae',
        'Fiber cement and composite decking washed within manufacturer limits',
        'Cedar shingle on older and high-end homes cleaned without stripping',
        'Patios, walkways and pool surrounds in the same visit',
      ],
    },
    'north-central': {
      headline: 'Power Washing for Leominster, Fitchburg and North Central MA',
      intro: `North Central's long winters, with up to about 55 inches of snow, leave road grime, salt splash and mildew on siding and porches by spring. Washing here starts once overnight lows stay above freezing, around mid April. Older homes (about 31% predate 1940) get a soft wash; vinyl and newer siding take a standard wash.`,
      features: [
        'Spring washes for winter grime and salt splash on siding and porches',
        'Soft wash on older painted clapboard',
        'Multi-family porches and stairs in Leominster and Fitchburg',
        'Decks and patios prepped for stain or sealer',
      ],
    },
    'blackstone-valley': {
      headline: 'Power Washing for Milford and the Blackstone Valley',
      intro: `The Blackstone Valley sees about 129 to 132 days of rain or snow a year, and a quarter of its homes are in two- to four-family buildings. Washing jobs here range from a single 1990s colonial with vinyl siding and a deck in Upton or Sutton to whole multi-family buildings and their porches in Milford, Whitinsville and Blackstone.`,
      features: [
        'Whole multi-family buildings, porches and stairs washed together',
        'Vinyl siding on 1980s and 1990s colonials cleared of mildew',
        'Decks cleaned and brightened before staining',
        'Washing season from mid April to early November',
      ],
    },
  },
}
