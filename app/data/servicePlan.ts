/**
 * servicePlan.ts - "Planning {service} in {city}": the block that makes each of
 * the 819 city x service pages say something no other URL on the site says.
 *
 * WHY (2026-11-24)
 * Search Console: 476 "Crawled - currently not indexed" + 536 "Discovered -
 * currently not indexed". A live audit showed every URL 200 / index / self
 * canonical, so the cause is content: after masking the town name and numbers,
 * the city x service pages were near-identical (scripts/medir-conteudo-proprio.py).
 *
 * HOW
 * Every sentence below is chosen by a REAL categorical fact about the town,
 * so two towns get different sentences because their housing and weather are
 * different, not because a hash picked a different synonym:
 *
 *   era      the post-1940 decade that added the most homes (ACS B25034)
 *   stock    detached / attached / 2-4 unit / 5+ unit mix (ACS B25024)
 *   size     median rooms per home (ACS B25018)
 *   value    median owner-occupied home value (ACS B25077)
 *   weather  10-year frost dates, coating days, freeze-thaw, snow (ERA5 via Open-Meteo)
 *   jobs     the three nearest jobs we actually documented (projects.ts)
 *
 * THE HONESTY RULE (same as housing.ts / cityFacts.ts)
 * Numbers come from the two cited datasets or from projects.ts. The era and
 * trade notes describe what homes of that era TYPICALLY have in New England and
 * are worded that way; nothing claims to describe a specific house, and there
 * are no prices, no invented reviews and no invented jobs.
 */

import raw from './censusHousing.json'
import climateRaw from './climateFacts.json'
import { projects, formatCompleted, type Project } from './projects'

interface Housing {
  housingUnits: number
  pctBuiltBefore1980: number
  pctBuiltBefore1940: number
  medianYearBuilt: number | null
  pctOwnerOccupied: number | null
  pctSingleFamilyDetached: number | null
  medianHomeValue: number | null
  lat: number
  lon: number
  dataFor: string | null
  pctAttached?: number | null
  pctTwoToFourUnits?: number | null
  pctFivePlusUnits?: number | null
  peakDecade?: string
  pctPeakDecade?: number
  pctBuiltSince2000?: number
  medianRooms?: number | null
}

interface Climate {
  freezeThawDays: number
  exteriorPaintDays: number
  wetDays: number
  precipInches: number
  snowInches: number
  daysOver90F: number
  lastSpringFrost: string
  firstFallFrost: string
  frostFreeDays: number
}

const H = (raw as unknown as { cities: Record<string, Housing> }).cities
const C = (climateRaw as unknown as { source: string; cities: Record<string, Climate> }).cities
export const CLIMATE_SOURCE = (climateRaw as unknown as { source: string }).source

const fmt = (n: number) => n.toLocaleString('en-US')

// ─────────────────────────────────────────────────────────────────────────────
// Categorical facts
// ─────────────────────────────────────────────────────────────────────────────

type Era = 'prewar' | '1940s' | '1950s' | '1960s' | '1970s' | '1980s' | '1990s' | 'modern'
type Stock = 'detached' | 'two-to-four' | 'large-multi' | 'mixed'

function eraOf(h: Housing): Era {
  // A town where more than a third of homes predate 1940 reads as a pre-war town,
  // whatever its busiest post-war decade was.
  if (h.pctBuiltBefore1940 >= 35) return 'prewar'
  switch (h.peakDecade) {
    case '1940s': return '1940s'
    case '1950s': return '1950s'
    case '1960s': return '1960s'
    case '1970s': return '1970s'
    case '1980s': return '1980s'
    case '1990s': return '1990s'
    default: return 'modern'
  }
}

function stockOf(h: Housing): Stock {
  const det = h.pctSingleFamilyDetached ?? 0
  const two = h.pctTwoToFourUnits ?? 0
  const big = h.pctFivePlusUnits ?? 0
  if (det >= 65) return 'detached'
  if (two >= 25 && two >= big) return 'two-to-four'
  if (big >= 30) return 'large-multi'
  return 'mixed'
}

const ERA_HOMES: Record<Era, string> = {
  prewar: 'balloon-framed colonials, Victorians and two-families with plaster walls, wood clapboard and original trim',
  '1940s': 'small wartime and post-war capes with wood shingle or clapboard, many later covered in aluminum or vinyl',
  '1950s': 'post-war capes and ranches, often with the original wood siding still under a later layer of aluminum or vinyl',
  '1960s': 'ranches, split-levels and garrison colonials, with plaster-on-gypsum-lath walls giving way to early drywall',
  '1970s': 'raised ranches and colonials, with a lot of T1-11 plywood, cedar shingle and stained trim',
  '1980s': 'colonials and townhouse condos, with cedar or early vinyl siding and finger-jointed pine trim',
  '1990s': 'larger colonials with vinyl siding, painted pine trim, two-story foyers and builder-grade oak kitchens',
  modern: 'newer colonials and townhouses with fiber-cement or vinyl siding, PVC trim and open floor plans',
}

const ERA_LABEL: Record<Era, string> = {
  prewar: 'before 1940',
  '1940s': 'in the 1940s',
  '1950s': 'in the 1950s',
  '1960s': 'in the 1960s',
  '1970s': 'in the 1970s',
  '1980s': 'in the 1980s',
  '1990s': 'in the 1990s',
  modern: 'since 2000',
}

/** What that era means for each trade. Typical, not specific: worded that way. */
const ERA_BY_SERVICE: Record<string, Record<Era, string>> = {
  'exterior-painting': {
    prewar: 'Clapboard that old usually carries many layers of oil paint, some of it lead. The work is mostly scraping to a sound edge and spot-priming bare wood; the topcoat is the short part of the job.',
    '1940s': 'Where the original shingle or clapboard is still exposed it is often dry and cupped, so it takes an oil-based or bonding primer before any latex goes on.',
    '1950s': 'Aluminum siding from that era chalks: rub it and your hand comes away white. It has to be washed and primed with a bonding primer or the new coat lets go in sheets.',
    '1960s': 'Split-level and garrison exteriors have a lot of overhang and trim relative to wall area, so fascia, soffit and the garage-side trim take most of the prep time.',
    '1970s': 'T1-11 plywood fails at the bottom edge where the grooves hold water. That edge gets sealed and primed before colour, and delaminated panels are replaced rather than painted.',
    '1980s': 'Finger-jointed pine trim from that decade opens at the joints and rots at the miters. Those joints get cut back, filled or replaced and caulked before the trim coat.',
    '1990s': 'Vinyl does not need paint unless you are changing colour, and then it needs a vinyl-safe colour no darker than the original so it does not warp. The painted pine trim is usually where the real work is.',
    modern: 'Fiber cement and PVC trim hold paint well. On homes this new the job is usually a colour change or the first repaint, so the prep is cleaning and caulking rather than scraping.',
  },
  'interior-painting': {
    prewar: 'Walls are almost always plaster on wood lath. Hairline cracks get stabilised and skim-coated before paint, or they reprint within a season. Original trim often has lead paint underneath, so it is tested before sanding.',
    '1940s': 'Interiors are usually plaster, often over rock lath, with small rooms and painted wood trim. Expect crack repair and a lot of cutting-in rather than big open walls.',
    '1950s': 'Rooms are compact and ceilings around eight feet. Plaster or early drywall is common, and decades of paint on the trim tend to need sanding back so new coats stick.',
    '1960s': 'Plaster over gypsum lath is typical: hard, flat walls that hold paint well but crack at door corners. Stained mahogany or birch trim is often being painted for the first time, which takes a stain-blocking primer.',
    '1970s': 'Drywall with textured or popcorn ceilings is common. Popcorn ceilings from that era are tested for asbestos before anyone scrapes them; painting over them is the low-risk option.',
    '1980s': 'Drywall throughout, often with stained oak trim. Painting oak trim white means a bonding, stain-blocking primer or the grain and tannins show through.',
    '1990s': 'Two-story foyers and cathedral ceilings are the reason a 1990s interior takes longer than its room count suggests: those walls need planks or scaffold, not a ladder.',
    modern: 'Open plans mean long walls with no natural break, so each wall is rolled in one continuous pass to avoid lap marks. Builder flat paint is usually upgraded to a washable finish.',
  },
  'cabinet-painting': {
    prewar: 'Kitchens this old have usually been redone at least once, but original built-ins and pantry cabinets often survive, with layers of old paint that get tested and stripped back before refinishing.',
    '1940s': 'Original kitchens are often site-built painted wood cabinets with inset doors. They refinish very well once the old paint is sanded back and tested.',
    '1950s': 'Site-built painted wood cabinets are common, often with metal or inset doors. Solid wood boxes refinish well; it is the hinges and hardware that need updating.',
    '1960s': 'Birch or mahogany slab doors with stained finishes are typical. Slab doors take a sprayed finish beautifully because there are no panel corners to collect paint.',
    '1970s': 'Dark stained oak or veneer plywood cabinets are typical. The boxes are usually sound, which is why refinishing them is worth it.',
    '1980s': 'Oak raised-panel doors are the classic of this decade. Oak grain telegraphs through paint, so it is grain-filled first if you want a smooth, modern look.',
    '1990s': 'Builder-grade oak or maple kitchens are typical. Many have thermofoil or laminate doors mixed in, which do not hold paint and are usually replaced while the wood boxes are refinished.',
    modern: 'Maple, cherry and painted MDF are common. Factory finishes are hard, so they are scuffed and primed with a bonding primer before the sprayed topcoat.',
  },
  carpentry: {
    prewar: 'Rot on homes this old shows up at window sills, sash bottoms, porch columns and the bottom course of clapboard. We splice in matching profiles rather than replacing whole runs of original trim.',
    '1940s': 'Window sills, door thresholds and the bottom of corner boards are the usual rot spots, especially where later siding trapped water against original wood.',
    '1950s': 'Rot concentrates at window sills, fascia boards and the base of door casings. On homes with later aluminum siding it often hides behind the cladding until the trim gives way.',
    '1960s': 'Garage-door jambs, fascia and the trim around split-level entries take the most water. Those get cut back and replaced before paint.',
    '1970s': 'The bottom edge of T1-11 plywood and stained cedar trim are the usual failures. Delaminated panels get replaced, not filled.',
    '1980s': 'Finger-jointed pine trim and brickmold rot at the miters and joints. Replacing them with PVC or primed solid stock is usually cheaper over time than repeated patching.',
    '1990s': 'Rot is less common on homes this age, but it shows up at painted pine door casings, deck ledgers and the trim below gutters.',
    modern: 'Little structural rot on homes this new. Carpentry is mostly deck boards, railings, PVC trim repairs and adding or replacing interior trim.',
  },
  'power-washing': {
    prewar: 'Old painted clapboard is soft-washed only; pressure would strip loose paint, and older layers can contain lead. The goal is clean, not bare.',
    '1940s': 'Older shingle and clapboard are soft-washed at low pressure. Where aluminum or vinyl covers the original wood, the wash also clears the mildew that builds up on the shaded sides.',
    '1950s': 'Aluminum siding from that era chalks and oxidises. A gentle wash with the right detergent brings back the colour; a pressure washer leaves streaks and dents.',
    '1960s': 'Brick-and-siding fronts and long garage walls collect mildew on the north side. Brick is washed at low pressure so the mortar is not cut back.',
    '1970s': 'Cedar and T1-11 turn grey; they get a wood cleaner and brightener rather than high pressure, which raises the grain and furs the wood.',
    '1980s': 'Cedar decks and early vinyl siding are the usual jobs. Decks are washed and brightened so stain can soak in; vinyl gets a soft wash for green mildew.',
    '1990s': 'Vinyl siding with green mildew on the shaded sides and pressure-treated decks are typical. Soft wash for the siding, a deck cleaner for the boards.',
    modern: 'Fiber cement, vinyl and composite decks are washed by the manufacturer\'s rules; high pressure voids some warranties, so we stay within them.',
  },
  'commercial-painting': {
    prewar: 'Older mill, church and mixed-use buildings here have plaster, high ceilings and original trim. Lead-safe practices apply to most of them.',
    '1940s': 'Older commercial and multi-family buildings carry plaster and layered paint, so lead-safe practices and crack repair are part of the scope.',
    '1950s': 'Post-war storefronts and office buildings often have block walls and steel door frames that need a rust-inhibiting primer, plus layered paint to test before sanding.',
    '1960s': 'Block walls, steel frames and drop ceilings are typical in buildings from this decade, so the right primer for masonry and metal matters more than the topcoat.',
    '1970s': 'Office and retail space from this decade often has painted block, vinyl wall covering and stained wood trim that need different primers in the same room.',
    '1980s': 'Office parks and condo associations from the 1980s mean common hallways, stairwells and units turned over between tenants, often on a tight timeline.',
    '1990s': 'Office parks and condo associations from the 1990s are now on their second or third repaint: common areas, stairwells and exterior trim on a set schedule.',
    modern: 'Newer buildings usually need a scheduled repaint of high-traffic areas and touch-ups to match the original colour schedule rather than heavy prep.',
  },
  'residential-painting': {
    prewar: 'A whole-house job here usually means plaster repair inside and scraping old layers outside, both under lead-safe practices.',
    '1940s': 'Small rooms inside, original wood or later cladding outside: inside is mostly cutting-in and trim, outside depends on what covers the original siding.',
    '1950s': 'Compact rooms inside and often aluminum siding outside: inside is mostly trim and walls, outside is cleaning and bonding primer.',
    '1960s': 'Inside, stained trim being painted for the first time; outside, lots of fascia and soffit. Both shape the prep more than the square footage does.',
    '1970s': 'Popcorn ceilings and stained trim inside, T1-11 and cedar outside: each takes its own primer and its own tests before work starts.',
    '1980s': 'Oak trim and kitchens inside, finger-jointed pine trim outside: both need a stain-blocking or bonding primer to last.',
    '1990s': 'Two-story foyers inside and painted pine trim outside are where most of the hours go on a whole-house job.',
    modern: 'Open plans inside and fiber cement outside: the prep is light, so most of the work is clean cut lines and the right sheen.',
  },
}

const STOCK_BY_SERVICE: Record<string, Record<Stock, string>> = {
  'exterior-painting': {
    detached: 'Most homes here are detached, so an exterior job is four full elevations, trim and doors, and access is usually from your own yard.',
    'two-to-four': 'A large share of homes here are two- to four-family buildings, so exterior work often means tall porch stacks and a schedule coordinated with every unit.',
    'large-multi': 'Many homes here are in buildings of five or more units, so exterior work is usually for a condo association or owner, by building or by elevation.',
    mixed: 'Housing here is a mix of detached homes and multi-unit buildings, so an exterior can be four elevations or one shared facade.',
  },
  'interior-painting': {
    detached: 'With most homes detached, interior jobs are usually whole floors or whole houses, and we can stage furniture in the garage or a spare room.',
    'two-to-four': 'Two- and three-family homes are common here, so a lot of interior work is unit by unit, often between tenants.',
    'large-multi': 'Many homes here are apartments and condos, so interior work is often a unit at a time, with elevator or stair access and building rules to follow.',
    mixed: 'Interior jobs here range from single condo units to whole houses, so the scope is set room by room.',
  },
  'cabinet-painting': {
    detached: 'In detached homes the doors come to our shop for spraying while the boxes are done on site, so the kitchen is usable most evenings.',
    'two-to-four': 'In two- and three-family homes, cabinet work is often done for an owner updating a rental unit between tenants.',
    'large-multi': 'In condos, doors go to our shop for spraying and boxes are done on site within building hours, so the kitchen is out of use for as little time as possible.',
    mixed: 'Doors go to our shop for spraying and boxes are finished on site, whether it is a house or a condo kitchen.',
  },
  carpentry: {
    detached: 'On detached homes the repairs are usually sills, trim, decks and porch parts we can reach from the yard.',
    'two-to-four': 'On two- and three-family homes the usual repairs are porch decking, railings and stair stringers, which also have to pass safety inspection.',
    'large-multi': 'On larger buildings carpentry is usually trim, railings and common-area repairs scheduled with the owner or association.',
    mixed: 'Repairs here range from a single sill to porch and railing work on multi-family buildings.',
  },
  'power-washing': {
    detached: 'Detached homes here usually mean whole-house siding plus a deck, patio or walkway in the same visit.',
    'two-to-four': 'Multi-family homes here often need the porches, stairs and siding washed together, building by building.',
    'large-multi': 'Larger buildings are washed by elevation, with sidewalks and entries scheduled around residents.',
    mixed: 'Washing here ranges from one house and a deck to a whole building.',
  },
  'commercial-painting': {
    detached: 'With most housing detached, commercial work here is mainly offices, shops, churches and schools rather than large residential buildings.',
    'two-to-four': 'Many local properties are two- to four-unit rentals, so landlord work (turnovers, hallways, porches) is a big part of commercial painting here.',
    'large-multi': 'With many homes in larger buildings, condo associations and property managers are a large part of commercial work here: hallways, stairwells and unit turnovers.',
    mixed: 'Commercial work here is a mix of businesses, landlords and condo associations.',
  },
  'residential-painting': {
    detached: 'Most homes here are detached, so whole-house projects (inside and out) are common and can be scheduled as one job.',
    'two-to-four': 'Two- and three-family homes are common, so residential projects are often planned unit by unit with tenants in place.',
    'large-multi': 'Many homes here are condos, where the inside is yours and the outside belongs to the association, so the scope is usually interior only.',
    mixed: 'Homes here range from condos to detached houses, so the scope is set by what you own.',
  },
}

/** Size, for interior and residential work. Median rooms counts every room, not bedrooms. */
function sizeNote(h: Housing, city: string, serviceSlug: string): string | null {
  const r = h.medianRooms
  if (!r) return null
  if (!['interior-painting', 'residential-painting'].includes(serviceSlug)) return null
  if (r < 4.5) return `The median home in ${city} has ${r} rooms, counting the kitchen and living areas. A whole-unit repaint at that size is usually a few days, and most jobs here are done with the occupant still living in it.`
  if (r < 6) return `The median home in ${city} has ${r} rooms, counting the kitchen and living areas. Most whole-interior jobs at that size are scheduled a floor at a time so you keep the rest of the house.`
  if (r < 7) return `The median home in ${city} has ${r} rooms, counting the kitchen and living areas. Whole-interior jobs at that size usually run in two phases, bedrooms first and living areas second.`
  return `The median home in ${city} has ${r} rooms, counting the kitchen and living areas, one of the larger figures in our area. Big interiors are scheduled by zone so the crew is never in every room at once.`
}

/** Home value, for cabinet work: refinish-versus-replace is the real decision. */
function valueNote(h: Housing, city: string, serviceSlug: string): string | null {
  const v = h.medianHomeValue
  if (!v || serviceSlug !== 'cabinet-painting') return null
  const val = `$${fmt(Math.round(v / 1000) * 1000)}`
  if (v < 400000) return `The median owner-occupied home in ${city} is valued at about ${val}. Refinishing sound cabinets is usually the update that makes sense at that value, rather than a full kitchen replacement.`
  if (v < 600000) return `The median owner-occupied home in ${city} is valued at about ${val}. Owners here often refinish sound boxes and spend the difference on counters, hardware or lighting.`
  if (v < 900000) return `The median owner-occupied home in ${city} is valued at about ${val}, so the finish has to match the rest of the house: sprayed, level and in a sheen that suits the room.`
  return `The median owner-occupied home in ${city} is valued at about ${val}, where kitchens are often custom. Refinishing keeps the original cabinetry and its proportions instead of replacing it with stock boxes.`
}

/** Weather, for the trades that live outside. */
function weatherNote(c: Climate | undefined, city: string, serviceSlug: string): string | null {
  if (!c) return null
  switch (serviceSlug) {
    case 'exterior-painting':
    case 'residential-painting':
      return `Over the last ten years ${city} has averaged its last spring frost in ${c.lastSpringFrost} and its first fall frost in ${c.firstFallFrost}, with about ${c.exteriorPaintDays} days a year that are dry, at least 60°F and no colder than 40°F overnight. Those are the days exterior coatings go on, so exterior work here is booked inside that window and interior work fills the rest of the year.`
    case 'power-washing':
      return `${city} averages about ${c.wetDays} days of measurable rain or snow a year and ${c.precipInches} inches of precipitation. Washing is scheduled from ${c.lastSpringFrost} on, once overnight lows stay above freezing, so water does not freeze in joints and cracks.`
    case 'carpentry':
      return `${city} averages about ${c.freezeThawDays} freeze-thaw days a year, days that freeze overnight and thaw by afternoon, and about ${c.snowInches} inches of snow. That cycle is what opens joints and drives water into end grain, so replacement wood is primed on all six faces before it goes up.`
    case 'interior-painting':
    case 'cabinet-painting':
      return c.daysOver90F >= 5
        ? `Interior work runs year-round, but ${city} averages about ${c.daysOver90F} days over 90°F a year; on those days we keep rooms ventilated and cooled so finishes level instead of drying too fast.`
        : `Interior work runs year-round here. In winter we keep rooms above 50°F while finishes cure, which matters most between ${c.firstFallFrost} and ${c.lastSpringFrost}.`
    case 'commercial-painting':
      return `Exterior commercial work in ${city} is booked between ${c.lastSpringFrost} and ${c.firstFallFrost}, the frost-free window of about ${c.frostFreeDays} days; interiors are scheduled year-round around business hours.`
  }
  return null
}

const ERA_SHORT: Record<Era, string> = {
  prewar: 'pre-war colonials, Victorians and two-families',
  '1940s': 'wartime and post-war capes',
  '1950s': 'post-war capes and ranches',
  '1960s': 'ranches, split-levels and garrisons',
  '1970s': 'raised ranches and 1970s colonials',
  '1980s': '1980s colonials and townhouse condos',
  '1990s': '1990s colonials',
  modern: 'post-2000 colonials and townhouses',
}
const STOCK_SHORT: Record<Stock, string> = {
  detached: 'mostly detached',
  'two-to-four': 'heavy on two- and three-families',
  'large-multi': 'heavy on apartment and condo buildings',
  mixed: 'a mix of single houses and multi-unit buildings',
}
const roomsWord = (r?: number | null) => (!r ? 'typical' : r < 4.5 ? 'compact' : r < 6 ? 'mid-size' : r < 7 ? 'roomy' : 'large')
const valueWord = (v: number | null) => (!v ? 'typical' : v < 400000 ? 'value-priced' : v < 600000 ? 'mid-market' : v < 900000 ? 'upper-market' : 'high-end')
const snowWord = (c?: Climate) => (!c ? null : c.snowInches < 40 ? 'lighter snow than most of our area' : c.snowInches < 55 ? 'typical central Massachusetts snow' : 'heavier snow than most of our area')
const tenureWord = (own: number | null) => (own == null ? 'a typical owner/renter mix' : own >= 75 ? 'mostly owner-occupied' : own >= 55 ? 'mostly owner-occupied with a real rental market' : 'a large rental market')

/**
 * One sentence that crosses several of this town's facts at once. Each fact on
 * its own is shared by dozens of towns; the combination usually is not, which is
 * the point: it is the shortest true description of what makes the job here
 * different from the job in the next town.
 */
function glance(h: Housing, c: Climate | undefined, serviceSlug: string): string {
  const era = ERA_SHORT[eraOf(h)]
  const stock = STOCK_SHORT[stockOf(h)]
  const frost = c ? `last spring frost in ${c.lastSpringFrost}, first fall frost in ${c.firstFallFrost}` : null
  switch (serviceSlug) {
    case 'exterior-painting':
      return `At a glance for exterior work: ${stock}, largely ${era}${frost ? `, with the ${frost}` : ''}.`
    case 'interior-painting':
      return `At a glance for interior work: ${roomsWord(h.medianRooms)} homes, largely ${era}, ${stock}, ${tenureWord(h.pctOwnerOccupied)}.`
    case 'cabinet-painting':
      return `At a glance for kitchens: largely ${era} in a ${valueWord(h.medianHomeValue)} market, ${stock}, ${roomsWord(h.medianRooms)} homes.`
    case 'carpentry':
      return `At a glance for repairs: largely ${era}, ${stock}${snowWord(c) ? `, ${snowWord(c)}` : ''}${c ? ` and a last frost in ${c.lastSpringFrost}` : ''}.`
    case 'power-washing':
      return `At a glance for washing: ${stock}, largely ${era}${c ? `, washing season from ${c.lastSpringFrost} to ${c.firstFallFrost}` : ''}.`
    case 'commercial-painting':
      return `At a glance for commercial work: ${tenureWord(h.pctOwnerOccupied)}, housing ${stock}, largely ${era}, in a ${valueWord(h.medianHomeValue)} market.`
    default:
      return `At a glance for a whole-house job: ${roomsWord(h.medianRooms)} ${era}, ${stock}${c ? `, frost-free from ${c.lastSpringFrost} to ${c.firstFallFrost}` : ''}.`
  }
}

function miles(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const R = 3958.8, toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon)
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(x))
}

export interface NearbyJob {
  project: Project
  miles: number
  sameTown: boolean
  sameTrade: boolean
  completed?: string
}

/** The three closest documented jobs, same trade weighted first, one per project. */
export function nearbyJobs(slug: string, serviceSlug?: string, limit = 3): NearbyJob[] {
  const here = H[slug]
  if (!here) return []
  return projects
    .filter((p) => p.citySlug && H[p.citySlug])
    .map((p) => {
      const d = p.citySlug === slug ? 0 : miles(here, H[p.citySlug as string])
      const sameTrade = !!serviceSlug && p.service === serviceSlug
      return { p, d, score: d - (sameTrade ? 10 : 0), sameTrade }
    })
    .sort((a, b) => a.score - b.score)
    // one job per town: three towns say more about our reach than three rooms in one
    .filter((x, i, all) => all.findIndex((y) => y.p.citySlug === x.p.citySlug) === i)
    .slice(0, limit)
    .map(({ p, d, sameTrade }) => ({
      project: p,
      miles: Math.max(1, Math.round(d)),
      sameTown: d === 0,
      sameTrade,
      completed: p.completed ? formatCompleted(p.completed) ?? undefined : undefined,
    }))
}

export interface ServicePlan {
  heading: string
  paragraphs: string[]
  facts: { label: string; value: string }[]
  jobs: NearbyJob[]
  sources: string[]
}

export function composeServicePlan(
  cityName: string,
  slug: string,
  serviceSlug: string,
  serviceName: string
): ServicePlan | null {
  const h = H[slug]
  if (!h) return null
  const c = C[slug]
  const era = eraOf(h)
  const stock = stockOf(h)
  const subj = h.dataFor ? `${h.dataFor} (the town that includes ${cityName})` : cityName

  const eraLine =
    era === 'prewar'
      ? `${h.pctBuiltBefore1940}% of the homes in ${subj} were built before 1940, so the typical house here is one of the ${ERA_HOMES[era]}.`
      : `The decade that added the most homes in ${subj} was the ${h.peakDecade} (${h.pctPeakDecade}% of today's housing), so a lot of the houses here are ${ERA_HOMES[era]}.`

  const paragraphs = [
    glance(h, c, serviceSlug),
    `${eraLine} ${ERA_BY_SERVICE[serviceSlug]?.[era] ?? ''}`.trim(),
    STOCK_BY_SERVICE[serviceSlug]?.[stock],
    sizeNote(h, cityName, serviceSlug),
    valueNote(h, cityName, serviceSlug),
    weatherNote(c, cityName, serviceSlug),
  ].filter(Boolean) as string[]

  const facts: { label: string; value: string }[] = []
  if (era !== 'prewar' && h.peakDecade) facts.push({ label: 'Busiest building decade', value: h.peakDecade })
  else facts.push({ label: 'Homes built before 1940', value: `${h.pctBuiltBefore1940}%` })
  if (stock === 'two-to-four') facts.push({ label: 'Homes in 2-4 unit buildings', value: `${h.pctTwoToFourUnits}%` })
  else if (stock === 'large-multi') facts.push({ label: 'Homes in 5+ unit buildings', value: `${h.pctFivePlusUnits}%` })
  else if (h.pctBuiltSince2000 != null) facts.push({ label: 'Homes built since 2000', value: `${h.pctBuiltSince2000}%` })
  if (h.medianRooms) facts.push({ label: 'Median rooms per home', value: String(h.medianRooms) })
  if (c) {
    if (['exterior-painting', 'residential-painting', 'commercial-painting'].includes(serviceSlug))
      facts.push({ label: 'Exterior coating days / year', value: String(c.exteriorPaintDays) })
    else if (serviceSlug === 'carpentry') facts.push({ label: 'Freeze-thaw days / year', value: String(c.freezeThawDays) })
    else if (serviceSlug === 'power-washing') facts.push({ label: 'Wet days / year', value: String(c.wetDays) })
    else facts.push({ label: 'Last spring frost', value: c.lastSpringFrost })
  }

  return {
    heading: `Planning ${serviceName.toLowerCase()} in ${cityName}`,
    paragraphs,
    facts,
    jobs: nearbyJobs(slug, serviceSlug),
    sources: [
      'U.S. Census Bureau, American Community Survey 2019-2023 5-year estimates (tables B25018, B25024, B25034, B25077)',
      ...(c ? [`${CLIMATE_SOURCE}`] : []),
    ],
  }
}

/** City-page version: no service, so it leads with era and weather for the whole house. */
export function composeCityPlan(cityName: string, slug: string): ServicePlan | null {
  const h = H[slug]
  if (!h) return null
  const c = C[slug]
  const era = eraOf(h)
  const subj = h.dataFor ? `${h.dataFor} (the town that includes ${cityName})` : cityName
  const paragraphs = [
    era === 'prewar'
      ? `${h.pctBuiltBefore1940}% of the homes in ${subj} were built before 1940: mostly ${ERA_HOMES[era]}.`
      : `The decade that added the most homes in ${subj} was the ${h.peakDecade} (${h.pctPeakDecade}% of today's housing): a lot of ${ERA_HOMES[era]}.`,
    `Inside: ${ERA_BY_SERVICE['interior-painting'][era]}`,
    `Outside: ${ERA_BY_SERVICE['exterior-painting'][era]}`,
    c
      ? `Weather: over the last ten years ${cityName} averaged its last spring frost in ${c.lastSpringFrost}, its first fall frost in ${c.firstFallFrost}, about ${c.exteriorPaintDays} good exterior coating days a year and ${c.snowInches} inches of snow.`
      : null,
  ].filter(Boolean) as string[]
  return {
    heading: `What ${cityName} homes usually need`,
    paragraphs,
    facts: [],
    jobs: nearbyJobs(slug, undefined),
    sources: [
      'U.S. Census Bureau, American Community Survey 2019-2023 5-year estimates',
      ...(c ? [CLIMATE_SOURCE] : []),
    ],
  }
}
