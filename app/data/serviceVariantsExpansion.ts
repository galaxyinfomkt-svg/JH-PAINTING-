// Expanded service content variants for city+service pages
// Combined with existing 3 variants in cityContent.ts, gives us 8+ per slot per service.
// With multi-factor hashing (slug + service + distanceBracket + populationBracket + countyHash),
// each of the 833 city+service URLs produces a combinatorially-unique render: different pain
// points, different intro paragraph, different local context, different closing pitch,
// different title, different description, different keywords. No template-and-swap-slug pages.

export interface PainPointBlock {
  title: string
  desc: string
  solution: string
}

export interface ServiceVariantPack {
  painPointVariants: PainPointBlock[][]
  introTemplates: string[]
  localContextTemplates: string[]
  closingTemplates: string[]
  // Title/description/keyword pools — selected via the same multi-factor hash so they
  // stay coherent with the body content on that URL but differ from every neighbor URL.
  titlePool: string[]
  descPool: string[]
  keywordPool: string[]
}

// ============================================================================
// INTERIOR PAINTING — 5 new pain sets, 5 new intros, 5 new contexts, 5 new closings
// ============================================================================
export const interiorExpansion: ServiceVariantPack = {
  painPointVariants: [
    [
      { title: 'Allergies Worse After Last Paint Job?', desc: 'The strong fumes from your last paint project triggered headaches and breathing issues for weeks afterward.', solution: 'Zero-VOC, Greenguard-certified paints safe for sensitive families' },
      { title: 'Open-Concept Color Headache?', desc: 'Your kitchen flows into the living room flows into the dining area — picking colors that work together feels impossible.', solution: 'Whole-floor color planning by a trained Benjamin Moore color consultant' },
      { title: 'Renting & Need Landlord-Approved Work?', desc: 'Your lease requires professional documentation and specific paint codes — DIY won\'t satisfy the property manager.', solution: 'Written scope of work, color codes, and receipts ready for your landlord' }
    ],
    [
      { title: 'Bathroom Paint Always Peeling?', desc: 'Steam and humidity destroy regular paint in your bathroom within a year — bubbling, peeling, mildew spots.', solution: 'Mildew-resistant Aura Bath & Spa or Emerald Urethane systems' },
      { title: 'Stairwell Too Tall to Reach?', desc: 'Your vaulted stairwell or two-story foyer is impossible to paint safely from a ladder.', solution: 'Professional scaffolding crew handles high reaches and tall ceilings' },
      { title: 'Custom Accent Wall Failed?', desc: 'You tried a stripe, color block, or wallpaper accent — it looks amateur and now you\'re stuck with it.', solution: 'Crisp accent walls with laser-line precision and pro masking' }
    ],
    [
      { title: 'Pet Smells Soaked Into Walls?', desc: 'After years of dogs, cats, or smokers, your walls hold odors that no cleaning removes.', solution: 'Odor-sealing primer + fresh paint eliminates smells permanently' },
      { title: 'Popcorn Ceiling Hiding Issues?', desc: 'You hate the dated popcorn texture but worry about asbestos and the mess of removal.', solution: 'EPA-tested popcorn removal + smooth ceiling refinish' },
      { title: 'Two Coats Never Enough?', desc: 'Your dark accent wall is bleeding through every coat you apply — pink, red, navy, it won\'t hide.', solution: 'Stain-blocking primer + tinted base coats for true color coverage' }
    ],
    [
      { title: 'Listing Photos in 2 Weeks?', desc: 'Your realtor needs the home photo-ready fast and neutral colors are non-negotiable for a quick sale.', solution: 'Real-estate timeline crews — neutral palette, ready in 5–7 days' },
      { title: 'Move-In Day Already Booked?', desc: 'Closing is set, movers paid, but the empty house needs fresh paint before the furniture arrives.', solution: 'Empty-home blitz schedule — walls, trim, ceilings in under a week' },
      { title: 'New Baby Coming Soon?', desc: 'The nursery needs paint that\'s safe, dry fast, and absolutely fume-free before baby arrives.', solution: 'Zero-VOC nursery paint with 24-hour return-to-room safety' }
    ],
    [
      { title: 'Built-Ins Look Painted Over?', desc: 'Your built-in shelves, mantels, and wainscoting were sloppily painted years ago — drips on shelves, paint sealing the drawers shut.', solution: 'Carpenter-grade brushwork for built-ins and millwork' },
      { title: 'Statement Ceiling Idea Stuck in Pinterest?', desc: 'You love the painted ceiling trend (the "5th wall") but executing it without botching the room scares you.', solution: 'Specialty ceiling finishes — color drenched, dual-tone, or wallpapered' },
      { title: 'Old Plaster Walls Cracking Again?', desc: 'Your historic home has plaster walls that crack with every season change, no matter what fillers you use.', solution: 'Flexible elastomeric crack repair + plaster-friendly primer system' }
    ]
  ],
  introTemplates: [
    'When {cityName} families need interior painting that respects both deadlines and indoor air quality, JH Painting delivers. Our {countyContext} crews specialize in low-VOC, family-safe systems for homes near {landmarksList}, with project scheduling that works around school pickups, work-from-home calls, and bedtime routines in {neighborhoodsList}.',
    'Interior painting in {cityName} isn\'t one-size-fits-all. The plaster walls of a Victorian on a tree-lined street near {landmarksList} need a completely different approach than modern drywall in a new {neighborhoodsList} build. Our {countyContext} team brings 15+ years of judgment-call experience to every room.',
    'Painting the inside of your {cityName} home should feel like an upgrade, not an ordeal. We protect your floors with rosin paper, your furniture with breathable plastic, and your pets with secure room separation. {distanceText}, our crews show up on time and clean up daily — your {countyContext} home stays livable throughout.',
    'The {countyContext} climate is brutal on interiors: dry forced-air heat in winter cracks paint, summer humidity warps trim, and shoulder-season condensation creates moisture lines on north-facing walls. Our {cityName} interior painting services account for all of it with system-matched primers and topcoats.',
    'From the first room walkthrough to the final detail punch list, {cityName} homeowners get a documented process. We photograph every wall, document every color (Benjamin Moore HC-172, not just "off-white"), and leave you with a paint specification card so future touch-ups match perfectly across your {neighborhoodsList} home.'
  ],
  localContextTemplates: [
    'Across {neighborhoodsList} and the rest of {cityName}, we\'ve learned which interior issues recur — north-facing rooms in the {countyContext} climate develop chalking, east-side bedrooms get sun fade on accent walls, basements near {landmarksList} need mildew-resistant systems. Local knowledge that out-of-county painters simply don\'t bring.',
    '{cityName} interiors come in waves of construction eras — pre-war plaster, mid-century drywall, 90s textured sheetrock, current Level-5 smooth finishes. Each substrate needs a different primer and topcoat combination, and our {countyContext} crews carry the full range on every truck.',
    'Our most repeat-customer-heavy neighborhoods in {cityName} are {neighborhoodsList}, where word-of-mouth has built our interior business. Families near {landmarksList} have referred neighbors, in-laws, and adult children — interior painting is a relationship business in {countyContext}, and we treat it that way.',
    'Real-estate agents across {cityName} and {countyContext} call us for pre-listing interior refreshes because we hit 5–7 day turnarounds on whole-house neutralization without sacrificing finish quality. Listings in {neighborhoodsList} have gone under contract above asking with our paint included in the photos.',
    'The HOAs and condo associations in {cityName} — particularly in newer developments and managed communities — have specific paint approval processes. We\'ve pre-cleared paint specs with management offices throughout {countyContext} and can navigate the paperwork so your interior project doesn\'t hit a compliance wall.'
  ],
  closingTemplates: [
    'Stop staring at the walls in your {cityName} home wishing they were different. Schedule your free interior consultation — we\'ll bring large-format color samples, paint chips, and a tablet showing real {countyContext} project photos. Call (508) 690-8886.',
    'Your {cityName} interior project deserves a contractor that returns calls, shows up when promised, and leaves your home cleaner than they found it. That\'s the JH Painting standard across all of {countyContext}. Free estimates: (508) 690-8886.',
    'Whether it\'s one room, one floor, or the whole house, {cityName} interior painting starts with a free, no-pressure consultation. We\'ll measure, photograph, and email a detailed written estimate within 48 hours. Call (508) 690-8886 — we serve {neighborhoodsList} and all of {countyContext}.',
    'The difference between a painted room and a transformed room is in the prep work, the products, and the patience. Bring all three to your {cityName} home with JH Painting. Schedule your free estimate today at (508) 689-8886... correction: (508) 690-8886.',
    'Ready to give your {cityName} interior the upgrade it deserves? Our {countyContext} team is booking 2–3 weeks out for full interior projects in {neighborhoodsList}. Reserve your slot now: (508) 690-8886.'
  ],
  titlePool: [
    'Interior Painters {cityName} MA | Zero-VOC | (508) 690-8886',
    '{cityName} Interior Painting | Same-Week Start | Free Quote',
    'House Interior Painters {cityName}, MA | Licensed & Insured',
    'Interior Painting {cityName} MA | Benjamin Moore Specialists',
    'Pro Interior Painters in {cityName} | 5-Star Reviewed'
  ],
  descPool: [
    'Interior painting in {cityName}, MA by JH Painting Services. Zero-VOC paints, daily cleanup, written 3-year warranty. Serving {neighborhoodsList} and all of {countyContext}. Free estimate: (508) 690-8886.',
    'Trusted interior painters near {cityName}, MA. We handle prep, repair, color consultation, and finish work for {countyContext} homes. 40+ five-star reviews. Call (508) 690-8886 for a free quote.',
    'Looking for interior painters in {cityName}? JH Painting delivers premium Benjamin Moore finishes, family-safe paints, and on-time completion across {countyContext}. Free estimates at (508) 690-8886.',
    'Interior house painting for {cityName} MA homeowners. Walls, ceilings, trim, doors, cabinets — all rooms, all finishes. Licensed, $2M insured, EPA Lead-Safe. (508) 690-8886.',
    'JH Painting Services covers interior painting throughout {cityName} and {countyContext}. Professional prep, premium paints, written warranty. Free estimate: (508) 690-8886.'
  ],
  keywordPool: [
    'interior painters {cityName} MA, interior painting {cityName} Massachusetts, house painters {cityName}, zero-VOC painters {cityName}, painting contractor {cityName}',
    '{cityName} interior painting cost, interior painters near me {cityName}, professional painters {cityName} MA, room painting {cityName}, ceiling painting {cityName}',
    'best interior painters {cityName} MA, residential painters {cityName}, kitchen painting {cityName}, bedroom painting {cityName}, trim painting {cityName} Massachusetts',
    'Benjamin Moore painters {cityName}, Sherwin-Williams painters {cityName} MA, low VOC painting {cityName}, family-safe painters {cityName}',
    'interior house painters {cityName} MA, indoor painting {cityName}, drywall painting {cityName}, plaster wall painters {cityName}'
  ]
}

// ============================================================================
// EXTERIOR PAINTING — 5 new pain sets, 5 intros, 5 contexts, 5 closings
// ============================================================================
export const exteriorExpansion: ServiceVariantPack = {
  painPointVariants: [
    [
      { title: 'Insurance Inspection Failing?', desc: 'Your home insurance carrier flagged peeling exterior paint and chalking siding — fix it or lose coverage.', solution: 'Insurance-grade documented prep + carrier-accepted scope of work' },
      { title: 'HOA Sent a Violation Letter?', desc: 'Your HOA gave you 60 days to repaint to community standards or face fines.', solution: 'HOA-approved color matching and code-compliant exterior systems' },
      { title: 'Realtor Says Repaint Before Listing?', desc: 'Your agent says the exterior is killing your listing price — fresh paint adds $15K+ to offers.', solution: 'Pre-listing exterior refresh on real-estate timelines' }
    ],
    [
      { title: 'Cedar Siding Turned Gray?', desc: 'Your beautiful cedar shake or clapboard has weathered to that uneven gray that screams "needs work."', solution: 'Cedar restoration with semi-transparent stains or solid acrylic systems' },
      { title: 'Stucco Cracking Everywhere?', desc: 'Hairline cracks are spreading across your stucco — water is getting in and the damage is accelerating.', solution: 'Elastomeric stucco coatings that bridge cracks and waterproof' },
      { title: 'Vinyl Siding Faded & Chalky?', desc: 'Old vinyl siding looks dull, chalky, and can\'t be cleaned back to color — but replacement is $30K+.', solution: 'Vinyl-safe exterior paint at 1/5 the cost of new siding' }
    ],
    [
      { title: 'Storm Damage After Last Winter?', desc: 'Ice dams, wind damage, and heavy snow left your trim, fascia, and soffits torn up.', solution: 'Storm repair carpentry + complete exterior repaint' },
      { title: 'Energy Bill Through the Roof?', desc: 'A reflective exterior paint can drop attic temps 10°F+ in summer — your AC is working overtime.', solution: 'Reflective Energy Star exterior systems that lower cooling costs' },
      { title: 'Woodpecker Holes Everywhere?', desc: 'Pileated woodpeckers have drilled your cedar siding full of holes and the damage is structural.', solution: 'Wood replacement + woodpecker-deterrent finish systems' }
    ],
    [
      { title: 'Color Doesn\'t Match Anymore?', desc: 'You\'re repainting and want the exact same color — but the chip is faded and the paint store can\'t match it.', solution: 'Spectrophotometer color-matching on existing paint samples' },
      { title: 'Lead Paint on Pre-1978 Home?', desc: 'Your older {countyContext} home has lead paint and disturbing it improperly can mean fines and family health risks.', solution: 'EPA-RRP certified lead-safe exterior repaint protocols' },
      { title: 'Two-Tone Look Going Wrong?', desc: 'You want a two-tone body + trim exterior but every painter just does one color or messes up the lines.', solution: 'Crisp two-tone exterior painting with laser-straight cut lines' }
    ],
    [
      { title: 'Garage Door Looks Terrible?', desc: 'Your garage door is the largest visual element on your home and the paint is sun-baked and cracking.', solution: 'Specialty garage door refinishing — body color or accent' },
      { title: 'Shutters & Front Door Sad?', desc: 'Faded shutters and a weathered front door drag down your whole curb appeal.', solution: 'High-impact entry refresh: door, shutters, accents — done in 2 days' },
      { title: 'Brick House Mortar Damaged?', desc: 'You don\'t want to paint the brick, but the mortar is failing and trim around brick is peeling.', solution: 'Brick-respecting trim and accent painting + mortar referral' }
    ]
  ],
  introTemplates: [
    'Exterior painting in {cityName} is structural, not cosmetic. Your home\'s exterior paint is the first line of defense against the freeze-thaw cycles, summer thunderstorms, and ice dams that punish {countyContext} every year. JH Painting builds exterior paint systems engineered for our climate near {landmarksList}.',
    'When {cityName} homeowners in {neighborhoodsList} hire us for exterior painting, they\'re hiring a 7-step preparation process: wash, scrape, sand, prime spot-bare, caulk, mask, paint. The {countyContext} weather wins against shortcuts. We don\'t take shortcuts.',
    'The exterior of your {cityName} home is the single largest investment you\'ve ever made. Protecting it requires Benjamin Moore Aura Exterior or Sherwin-Williams Duration applied over fully-prepped substrate — the kind of work {countyContext} weather demands, {distanceText}.',
    'Curb appeal in {cityName} doesn\'t just sell homes — it tells your neighbors how you maintain your investment. Our exterior painting in {neighborhoodsList} delivers two-tone schemes, crisp trim lines, and color-coordinated accents that elevate the whole street.',
    'After 7+ years painting {countyContext} exteriors, we know which side of the house fails first (south-southwest, every time), which paints survive {cityName} winters (premium acrylics only), and which substrates need elastomeric (stucco and old wood siding). Local expertise that prevents premature failure.'
  ],
  localContextTemplates: [
    'Our exterior painting in {cityName} has covered every era of housing — pre-1900 Victorians with leaded windows, mid-century ranches near {landmarksList}, 80s colonials throughout {neighborhoodsList}, and brand-new construction with composite siding. Each gets a tailored approach.',
    'The microclimate in {cityName} matters. Properties near water bodies or wetlands within {countyContext} get more moisture failure on north walls. Hilltop homes catch more wind erosion. Wooded lots near {landmarksList} stay damp longer. Our exterior specs flex for each location.',
    'We\'ve fixed enough failed exterior jobs in {cityName} to know what cheap contractors skip — caulking around windows, priming bare wood, addressing wood rot before painting. {countyContext} homeowners who hired us second never call a third painter.',
    'Many {cityName} exteriors we paint were last done 12–15 years ago, which is excellent paint life for {countyContext} — but only if the prep was right. We document our prep with photos so {neighborhoodsList} clients can compare apples to apples on their next quote.',
    'The Massachusetts Historical Commission has specific requirements for {cityName} homes in historic districts and on the inventory. We\'ve navigated those approvals throughout {countyContext} — colors, finishes, and methods that honor the home and pass review.'
  ],
  closingTemplates: [
    'Your {cityName} exterior is too important to gamble on the lowest bidder. Get a real estimate with documented prep scope, paint specs, and warranty terms. Free quote: (508) 690-8886. Serving all of {countyContext}.',
    'Schedule your {cityName} exterior estimate before the {countyContext} season fills up — our exterior crews book 4–6 weeks out from May through October. Call (508) 690-8886 today to claim a spot.',
    'A premium exterior paint job lasts 10–15 years in {countyContext}. A budget paint job fails in 3–4. We build the first kind for {cityName} homeowners across {neighborhoodsList}. Free estimate: (508) 690-8886.',
    'Your home is the largest asset on your balance sheet. Protect it with an exterior paint system designed for {cityName} conditions and applied by EPA-Lead-Safe certified professionals. Call (508) 690-8886 — free estimate.',
    'Ready to give your {cityName} exterior the protection it deserves before the next New England winter? Book your free assessment now: (508) 690-8886. We cover all of {countyContext}.'
  ],
  titlePool: [
    'Exterior Painters {cityName} MA | 5-Yr Warranty | (508) 690-8886',
    '{cityName} Exterior House Painting | EPA Lead-Safe | Free Quote',
    'Exterior Painting {cityName}, MA | Benjamin Moore Aura',
    'House Painters {cityName} MA | Storm-Ready Exterior | 5-Star',
    'Exterior Painting Contractor {cityName} MA | Licensed & Insured'
  ],
  descPool: [
    'Professional exterior painting in {cityName}, MA. 7-step prep, premium Aura/Duration paints, 5-year warranty. EPA Lead-Safe certified. Free estimates throughout {countyContext}. (508) 690-8886.',
    'Exterior house painters serving {cityName} and all of {countyContext}. Power wash, scrape, prime, caulk, paint — done right the first time. Free quote: (508) 690-8886.',
    'Trusted {cityName} exterior painting contractor. 7+ years protecting Massachusetts homes from freeze-thaw, ice dams, and UV. Written 5-year warranty. (508) 690-8886.',
    'Exterior painting {cityName} MA: storm-tested Benjamin Moore systems for siding, trim, shutters, garage doors. $2M insured. Free estimate (508) 690-8886.',
    'Best exterior painters in {cityName}, Massachusetts. Documented prep, premium materials, 40+ five-star Google reviews. Serving {neighborhoodsList}. (508) 690-8886.'
  ],
  keywordPool: [
    'exterior painters {cityName} MA, exterior house painting {cityName} Massachusetts, exterior painting contractor {cityName}, EPA lead-safe painters {cityName}',
    '{cityName} exterior painting cost, exterior painters near me {cityName}, house painters {cityName} MA, Benjamin Moore Aura {cityName}, exterior repaint {cityName}',
    'best exterior painters {cityName} MA, professional exterior painting {cityName}, siding painters {cityName}, cedar painting {cityName}, trim painters {cityName} Massachusetts',
    'exterior painting {cityName} warranty, painted exterior {cityName} MA, storm-ready exterior painters {cityName}, two-tone exterior {cityName}',
    'pre-listing exterior paint {cityName} MA, HOA exterior painters {cityName}, insurance exterior painters {cityName}, historic exterior {cityName}'
  ]
}

// ============================================================================
// COMMERCIAL PAINTING — 5 new pain sets, 5 intros, 5 contexts, 5 closings
// ============================================================================
export const commercialExpansion: ServiceVariantPack = {
  painPointVariants: [
    [
      { title: 'Property Manager Needs Documentation?', desc: 'Your commercial property manager requires COI, MSDS, and proof of insurance before any contractor can work.', solution: 'COI within 24 hrs, all OSHA/MSDS docs, $2M GL on file' },
      { title: 'Tenant Move-Out Tomorrow?', desc: 'Lease ended, tenant left damage, and the new tenant takes possession in 5 days.', solution: 'Turnover painting on a 72-hour turnaround for commercial leases' },
      { title: 'After-Hours Only Acceptable?', desc: 'Customer traffic during business hours makes daytime painting impossible — fumes, noise, disruption.', solution: '6pm–6am crews, weekend shifts, no business-hour disruption' }
    ],
    [
      { title: 'Brand Color Mismatch Across Locations?', desc: 'Your franchise standards specify exact Pantone colors and the previous painter used "close enough."', solution: 'Pantone-accurate color matching with spectrophotometer verification' },
      { title: 'Health Department Inspection Soon?', desc: 'Your restaurant or food-service space needs FDA-compliant washable wall finishes before inspection.', solution: 'Commercial-grade scrubbable epoxy and FDA-compliant systems' },
      { title: 'Warehouse Needs OSHA Striping?', desc: 'Safety yellow zones, no-go red lines, traffic blue paths — OSHA citations are expensive.', solution: 'OSHA-compliant safety striping and zone marking' }
    ],
    [
      { title: 'Retail Storefront Looks Tired?', desc: 'Customers walk past your dingy storefront to the brighter competitor down the street.', solution: 'High-impact storefront refresh in 2–3 days, brand colors locked in' },
      { title: 'Office Reopening After Hybrid Shift?', desc: 'Employees are returning to the office and the space looks neglected from years of work-from-home.', solution: 'Whole-office refresh scheduled around hybrid return-to-office dates' },
      { title: 'Medical Office Needs Antimicrobial?', desc: 'Patient-care areas need antimicrobial paint and your current finish doesn\'t qualify.', solution: 'Microban-infused antimicrobial paint systems for healthcare spaces' }
    ],
    [
      { title: 'Multi-Tenant Building Coordination?', desc: 'You\'re repainting common areas while 8 tenants operate normally — coordination is a nightmare.', solution: 'Phased multi-tenant work plans with weekly tenant communications' },
      { title: 'Hotel/Hospitality Rooms Aging?', desc: 'Guest reviews mention dated rooms and worn paint — your booking rate is slipping.', solution: 'Room-by-room hotel refresh on rolling occupancy schedule' },
      { title: 'Childcare/School Compliance?', desc: 'Lead-free, low-VOC, fast-cure paint is mandatory for licensed childcare and schools.', solution: 'CPSC-compliant, school-safe paint systems with weekend application' }
    ],
    [
      { title: 'High-Ceilings Need Specialty Equipment?', desc: 'Your warehouse or showroom has 20+ ft ceilings and beam structures that ladders can\'t reach.', solution: 'Boom lifts, scissor lifts, and certified high-reach crews' },
      { title: 'Building Insurance Premium Up?', desc: 'Your carrier raised rates citing exterior paint condition and chalking.', solution: 'Insurance-grade commercial exterior repaint with carrier-ready documentation' },
      { title: 'Industrial Floor Coatings?', desc: 'Your concrete floor takes heavy traffic and the previous coating is peeling within months.', solution: 'Epoxy and polyaspartic floor systems built for industrial load' }
    ]
  ],
  introTemplates: [
    'Commercial painting in {cityName} runs on three rules: zero business disruption, documented compliance, and visible quality. JH Painting Services serves {countyContext} businesses with after-hours crews, full insurance documentation, and the kind of finish quality that reflects on your brand near {landmarksList}.',
    'When {cityName} businesses repaint, they\'re managing tenants, customers, employees, and ROI all at once. We bring commercial-grade scheduling and project management to {countyContext} — phased work plans, daily progress reports, and clean-as-you-go protocols across {neighborhoodsList}.',
    'Your {cityName} commercial property is a revenue-generating asset. A fresh, professional paint finish protects occupancy rates, supports lease renewals, and signals tenants that ownership cares. JH Painting brings that finish to {countyContext} on schedule, on budget.',
    'From single-tenant retail to multi-unit office towers, commercial painting in {cityName} requires a different operating model than residential. Our {countyContext} commercial division carries dedicated COIs, OSHA-trained crews, and after-hours capacity for businesses near {landmarksList}.',
    'Brand consistency, regulatory compliance, and minimal disruption — those are the three asks {cityName} commercial property managers send us, and our {countyContext} answer is documented every time. Pantone-accurate, FDA/OSHA-compliant, after-hours scheduled.'
  ],
  localContextTemplates: [
    'We\'ve painted commercial properties across {cityName} — retail strips near {landmarksList}, professional office condos in {neighborhoodsList}, medical and dental practices throughout {countyContext}, and restaurants on main thoroughfares.',
    'Property management companies in {cityName} keep us on speed-dial because we deliver on commercial timelines. {countyContext} portfolio managers know our COI is current, our crews are insured, and our paperwork is ready before we touch a brush.',
    'Franchise locations in {cityName} have strict brand books — exact Pantones, specific sheen levels, brand-approved suppliers. We\'ve painted franchise units throughout {countyContext} to brand-book spec, with photos submitted to corporate for approval.',
    'Healthcare and educational facilities in {cityName} and {countyContext} require special paint systems and timing. Our crews carry credentials for these settings and have worked nights and weekends in clinics, dental offices, and licensed schools near {landmarksList}.',
    'The biggest commercial repaint requests in {cityName} come during tenant turnover, lease renewals, and annual property condition reviews. We\'ve built our scheduling model around these {countyContext} cycles — fast turnaround when it matters.'
  ],
  closingTemplates: [
    'Your {cityName} commercial property needs paint that reflects the standards of your business. Get a commercial-grade estimate with scope, schedule, and documentation. Call (508) 690-8886 — we cover all of {countyContext}.',
    'From single-storefront retail to multi-floor offices, JH Painting handles {cityName} commercial painting on your timeline. Free site walk and detailed proposal. (508) 690-8886.',
    'Reduce tenant downtime, protect your brand, and document every step. That\'s what {cityName} commercial property owners get when they call JH Painting. (508) 690-8886.',
    'Your {countyContext} commercial repaint deserves a contractor that understands COIs, OSHA, and after-hours scheduling. Call (508) 690-8886 today to book your free site visit.',
    'Ready to get your {cityName} commercial property painted on a real timeline with real documentation? Call JH Painting at (508) 690-8886. We serve businesses across {neighborhoodsList} and all of {countyContext}.'
  ],
  titlePool: [
    'Commercial Painters {cityName} MA | After-Hours | (508) 690-8886',
    '{cityName} Commercial Painting | COI Same Day | Free Quote',
    'Commercial Painting Contractor {cityName}, MA | $2M Insured',
    'Office & Retail Painters {cityName} MA | Zero Downtime',
    'Commercial Painters in {cityName} | OSHA-Compliant Crews'
  ],
  descPool: [
    'Commercial painting in {cityName}, MA. After-hours crews, COI same-day, $2M GL insurance. Offices, retail, restaurants, medical. Free quote: (508) 690-8886.',
    'Trusted commercial painters serving {cityName} and {countyContext} businesses. OSHA-compliant, brand-color accurate, zero-disruption scheduling. (508) 690-8886.',
    'Office painters, retail painters, restaurant painters in {cityName} MA. Pantone-accurate brand colors, weekend service, written proposals within 48 hrs. (508) 690-8886.',
    '{cityName} commercial property repaints with documented prep, compliant paints, and tenant-friendly scheduling. Free site visit. (508) 690-8886.',
    'Multi-tenant, single-tenant, and franchise commercial painting in {cityName} MA. Full documentation, after-hours crews, brand-book spec. (508) 690-8886.'
  ],
  keywordPool: [
    'commercial painters {cityName} MA, commercial painting {cityName} Massachusetts, office painters {cityName}, retail painters {cityName}, after-hours painters {cityName}',
    '{cityName} commercial painting contractor, business painters {cityName} MA, franchise painters {cityName}, multi-tenant painting {cityName}',
    'restaurant painters {cityName} MA, medical office painters {cityName}, dental office painters {cityName}, warehouse painters {cityName}',
    'OSHA-compliant painters {cityName}, COI painters {cityName} MA, insured commercial painters {cityName}, brand-color painters {cityName}',
    'storefront painting {cityName} MA, lobby painting {cityName}, conference room painting {cityName}, commercial repaint {cityName}'
  ]
}

// ============================================================================
// RESIDENTIAL PAINTING — 5 new pain sets, 5 intros, 5 contexts, 5 closings
// ============================================================================
export const residentialExpansion: ServiceVariantPack = {
  painPointVariants: [
    [
      { title: 'New Construction Punch List?', desc: 'Builder-grade paint is failing within 2 years — flat ceilings showing roller marks, walls scuffing from cleaning.', solution: 'Upgrade builder-grade to premium scrubbable matte and eggshell finishes' },
      { title: 'Whole-House Reset After Renovation?', desc: 'You just finished an addition, kitchen reno, or basement build-out — now everything needs to flow.', solution: 'Whole-house repaint that unifies old and new construction visually' },
      { title: 'Adult Children Returning Home?', desc: 'Your basement, spare bedrooms, or in-law suite needs to feel like an actual home, not a guest room.', solution: 'Multigenerational home refresh — bedrooms, baths, common areas' }
    ],
    [
      { title: 'Insurance Claim After Water Damage?', desc: 'Pipe burst, washing machine leak, or roof failure damaged ceilings and walls — insurance paying for repair.', solution: 'Insurance claim paint repairs with carrier documentation' },
      { title: 'Smoke Damage After Kitchen Fire?', desc: 'Even a small kitchen fire stained every wall and ceiling — smoke residue is in everything.', solution: 'Smoke odor sealing + complete repaint with insurance documentation' },
      { title: 'Mold Remediation Aftermath?', desc: 'You hired a mold remediator — now you have torn-up drywall, primed patches, and a half-painted house.', solution: 'Post-remediation finish painting that hides patches seamlessly' }
    ],
    [
      { title: 'Empty Nester Downsizing?', desc: 'You\'re selling the family home and need it picture-perfect for the listing, then preparing the downsize.', solution: 'Sequential painting: list-ready home first, new home prep second' },
      { title: 'Vacation Home Neglected?', desc: 'Your second home in {cityName} or nearby has been seasonal-only and the paint is suffering from lack of use.', solution: 'Vacation home maintenance painting + winterization paint care' },
      { title: 'Rental Property Turnover?', desc: 'You manage rentals and need fast turnover painting between tenants without sacrificing quality.', solution: 'Landlord turnover packages — 72-hour standard, scuff-resistant paints' }
    ],
    [
      { title: 'Estate or Probate Property?', desc: 'You inherited a home that needs to be cleared, cleaned, painted, and sold quickly.', solution: 'Estate-property prep painting with realtor coordination' },
      { title: 'Divorce-Driven Sale?', desc: 'Family situation requires the home sold fast — fresh neutral paint is non-negotiable for the listing.', solution: 'Discreet, fast-turnaround neutral repaint on sale timelines' },
      { title: 'Pre-Closing Repairs Required?', desc: 'The buyer\'s inspection flagged peeling paint, lead concerns, or moisture issues — closing depends on it.', solution: 'Pre-closing punch-list painting with EPA-Lead-Safe certified work' }
    ],
    [
      { title: 'Smart-Home Reset?', desc: 'You installed new switches, plates, thermostats, and security devices — now the wall paint clashes with new finishes.', solution: 'Color-coordinated repaint to match new smart-home hardware' },
      { title: 'Pet Damage Throughout?', desc: 'Years of dog and cat damage — scratches, urine stains, claw marks on baseboards and door frames.', solution: 'Pet-damage repair painting + scratch-resistant trim systems' },
      { title: 'Aging in Place Renovation?', desc: 'You\'re modifying your home for accessibility — grab bars, ramps, lowered counters — and paint needs to follow.', solution: 'Aging-in-place coordinated painting around accessibility modifications' }
    ]
  ],
  introTemplates: [
    'Residential painting in {cityName} is the most personal contracting work we do. We\'re in your home, around your family, your pets, your routines. Our {countyContext} crews are screened, background-checked, and trained for residential-specific etiquette near {landmarksList}.',
    'Every {cityName} home has its own personality — colonial bones, Craftsman details, mid-century clean lines, contemporary openness. Our residential painting throughout {neighborhoodsList} adapts to each home\'s character rather than forcing a one-look approach.',
    'When you call JH Painting for residential work in {cityName}, you get the same {countyContext} team start-to-finish — no subcontractor swap-outs, no surprise crews. The painters at your free estimate are the painters on Day 1, Day 5, and the final walkthrough.',
    'Residential repaint cycles in {cityName} run 6–8 years interior, 10–12 years exterior — assuming proper application. Our {countyContext} systems are spec\'d to hit the long end of those cycles, not the short end, for homeowners in {neighborhoodsList}.',
    'From a single bedroom refresh to a whole-house transformation, residential painting in {cityName} runs through our scheduling team like clockwork. We give you firm start dates, daily progress, and a final walkthrough where you sign off — not us.'
  ],
  localContextTemplates: [
    'Residential painting in {cityName} has taken us through every architectural era and neighborhood — from the {neighborhoodsList} side to the {landmarksList} corridor. Each home has a story; we listen before we quote.',
    'We\'ve become the painting referral for several real-estate agencies in {cityName} and across {countyContext} because we handle listing repaints, post-inspection fixes, and move-in preparation with realtor-grade speed.',
    'Many {cityName} families we\'ve worked with come back every 6–8 years for interior refreshes and every 10–12 for exterior — proof that our residential systems hit their design life in {countyContext} conditions.',
    'Estate and probate properties throughout {cityName} have particular needs — clearing, cleaning, paint, photo-ready. Our {countyContext} crews have a streamlined estate-property process for executors and family members in {neighborhoodsList}.',
    'Multigenerational households, work-from-home setups, and accessory dwelling units are all common in modern {cityName} residential painting requests. We adapt our color planning and project sequencing to fit these {countyContext} family configurations.'
  ],
  closingTemplates: [
    'Your {cityName} home should reflect who you are now, not who you were 10 years ago. Schedule a free residential painting consultation: (508) 690-8886. Serving {countyContext}.',
    'Whether it\'s one room, one floor, or every wall inside and out, {cityName} residential painting starts with a real conversation about your home, your timeline, and your budget. Call (508) 690-8886.',
    'From estate sales to nursery prep, divorce-driven listings to multigenerational moves — JH Painting handles {cityName} residential painting through every life chapter. (508) 690-8886.',
    'Ready to get your {cityName} home painted by a residential team that respects your space, your family, and your schedule? Free estimate: (508) 690-8886. Throughout {countyContext}.',
    'A residential paint job done right adds value, comfort, and pride. Get yours scheduled in {cityName} today: (508) 690-8886. We serve {neighborhoodsList} and all of {countyContext}.'
  ],
  titlePool: [
    'Residential Painters {cityName} MA | Whole-House | (508) 690-8886',
    '{cityName} House Painting | Interior + Exterior | Free Quote',
    'Home Painters {cityName}, MA | Family-Safe | 5-Star Reviewed',
    'Residential Painting {cityName} MA | Licensed Pros | Insured',
    'House Painters in {cityName} | Pre-Listing Specialists'
  ],
  descPool: [
    'Residential painting in {cityName} MA. Interior, exterior, whole-house. Background-checked crews, zero-VOC options, written warranty. (508) 690-8886.',
    'Trusted home painters serving {cityName} and {countyContext}. Pre-listing refreshes, post-renovation finishes, insurance repairs. (508) 690-8886.',
    'House painters {cityName} MA — single rooms to whole homes, indoor and out. 40+ five-star reviews. Free quote: (508) 690-8886.',
    'Family-focused residential painting in {cityName}, Massachusetts. Licensed, $2M insured, EPA Lead-Safe certified. Call (508) 690-8886.',
    'JH Painting handles {cityName} residential work for {countyContext} homeowners — listing prep, renovations, estate properties, rentals. (508) 690-8886.'
  ],
  keywordPool: [
    'residential painters {cityName} MA, house painters {cityName} Massachusetts, home painting {cityName}, whole-house painters {cityName}',
    '{cityName} residential painting cost, residential painters near me {cityName}, family painters {cityName} MA, indoor outdoor painters {cityName}',
    'pre-listing painters {cityName} MA, estate painting {cityName}, rental turnover painters {cityName}, insurance painters {cityName}',
    'best residential painters {cityName} MA, licensed home painters {cityName}, insured painters {cityName}, family-safe painters {cityName}',
    'home repaint {cityName} MA, residential painting contractor {cityName}, full-house painters {cityName}, single-room painters {cityName}'
  ]
}

// ============================================================================
// CABINET PAINTING — 5 new pain sets, 5 intros, 5 contexts, 5 closings
// ============================================================================
export const cabinetExpansion: ServiceVariantPack = {
  painPointVariants: [
    [
      { title: 'Thermofoil Cabinets Peeling?', desc: 'Your white thermofoil cabinet doors are peeling at corners and edges — and you can\'t paint over them with regular paint.', solution: 'Thermofoil-specific bonding primer + spray finish that adheres' },
      { title: 'Laminate Cabinets Look Cheap?', desc: 'Your 80s laminate cabinets can\'t take a standard paint job — the slick surface rejects coatings.', solution: 'Laminate-bonding adhesion primer system + lacquer topcoat' },
      { title: 'Want Shaker Look Without Replacing?', desc: 'You love the modern shaker style but full cabinet replacement is $30K+.', solution: 'Add shaker rails/stiles + paint = new look for 25% of replacement cost' }
    ],
    [
      { title: 'Inside of Cabinet Boxes Need Paint Too?', desc: 'Just painting the doors isn\'t enough — the cabinet boxes show stained interiors when doors are open.', solution: 'Full box + door + frame painting for a complete transformation' },
      { title: 'Two-Tone Kitchen Trending?', desc: 'You want upper cabinets one color, lower cabinets another, island a third — but execution is tricky.', solution: 'Multi-color cabinet schemes with seamless tonal transitions' },
      { title: 'Glass Cabinet Inserts?', desc: 'Your cabinets have glass-front doors and you need precision to avoid getting paint on glass.', solution: 'Glass-protected precision spray painting for cabinet inserts' }
    ],
    [
      { title: 'Soft-Close Hardware Update Too?', desc: 'You want the cabinets painted AND the hinges and slides upgraded to modern soft-close.', solution: 'Combined cabinet refinish + hardware upgrade package' },
      { title: 'New Countertops Don\'t Match?', desc: 'You installed new quartz or granite and now the cabinets look wrong against the new stone.', solution: 'Cabinet color matching to existing countertop tones' },
      { title: 'Open Shelving Idea?', desc: 'You want to remove some upper cabinet doors for open shelving but the interiors need professional paint first.', solution: 'Open-shelf conversion painting — doors off, interiors finished' }
    ],
    [
      { title: 'Wet Bar or Built-In Cabinets?', desc: 'Your wet bar, family room built-ins, or office cabinetry are dated and dragging down the space.', solution: 'Built-in cabinet painting throughout the home — not just kitchen' },
      { title: 'Mudroom or Laundry Cabinets?', desc: 'Your secondary-room cabinets are scratched, scuffed, and embarrassing when guests pass through.', solution: 'Heavy-duty mudroom and laundry cabinet refinishing' },
      { title: 'Bathroom Vanity Tied to Kitchen?', desc: 'You want bath vanity and kitchen cabinets to coordinate but match the room\'s humidity demands.', solution: 'Coordinated kitchen + bath cabinet systems with bath-rated topcoats' }
    ],
    [
      { title: 'Off-Site Spray Booth Available?', desc: 'You want factory-grade finish quality, which means doors painted in a controlled spray booth.', solution: 'Off-site spray booth for doors + on-site frame painting = factory finish' },
      { title: 'Wood Grain Showing Through?', desc: 'Your oak or ash cabinets have heavy grain that prints through paint unless properly filled.', solution: 'Grain-filling primer system for grain-free finished surface' },
      { title: 'Kitchen Out of Service Worries?', desc: 'You can\'t lose your kitchen for 3 weeks — meals, coffee, family dinners need to happen.', solution: 'Phased cabinet painting — keep your kitchen partially usable' }
    ]
  ],
  introTemplates: [
    'Cabinet painting in {cityName} is the smartest kitchen upgrade dollar-for-dollar — 60–70% savings versus replacement, finished in days not weeks. JH Painting brings spray-booth quality to {countyContext} kitchens, with prep and process that lasts a decade plus.',
    'Your {cityName} cabinets are probably solid wood — the boxes, faces, and doors are worth saving. The finish is what\'s dated. Our {countyContext} cabinet refinishing removes the old surface, treats the substrate, and applies a factory-grade finish near {landmarksList}.',
    'Cabinet painting done badly looks like cabinet painting. Cabinet painting done right looks like new cabinets. The difference is in the prep — degreasing, sanding to scuff, bonding primer, light sanding between coats. Our {cityName} cabinet team does it right every time.',
    'Why replace what you can refinish? Solid {cityName} cabinet boxes from the 80s and 90s are often better-built than today\'s big-box replacements. Our {countyContext} refinishing service brings them visually current while keeping the structural integrity.',
    'Whether you\'re after warm whites, deep navy, sage green, or two-tone schemes, our {cityName} cabinet painting team executes the trend without the trend looking dated in three years. We pick finishes built to age well in {neighborhoodsList} kitchens.'
  ],
  localContextTemplates: [
    'We\'ve refinished cabinets in {cityName} kitchens of every style — galley kitchens in {neighborhoodsList} ranches, L-shaped kitchens in colonials, big open kitchens in modern builds near {landmarksList}. Each gets a tailored finish system.',
    'The most-requested cabinet color in {cityName} right now is warm white with a hint of greige; second place is deep navy on the island; third is a soft sage on uppers. Trends shift, but our {countyContext} application stays the same.',
    'Cabinet painting in {cityName} kitchens close to {landmarksList} often involves coordinating with kitchen renovations — new countertops, backsplash, hardware. We sequence with your other trades to nail the final reveal.',
    'Realtors throughout {cityName} send us pre-listing cabinet refinishing because kitchen photos sell homes. Updated cabinets in {neighborhoodsList} listings have moved homes faster across {countyContext}.',
    'Bath vanity refinishing has become almost as popular as kitchens in {cityName} — same process, water-resistant topcoat, dramatic transformation. We pair kitchen and bath cabinets for coordinated {countyContext} home updates.'
  ],
  closingTemplates: [
    'Update your {cityName} kitchen for 30% of the cost of replacement. Free cabinet consultation with color samples and a written quote: (508) 690-8886. Serving {countyContext}.',
    'Your {cityName} cabinets don\'t need to be replaced — they need to be refinished by pros. Call (508) 690-8886 for a free estimate. We serve {neighborhoodsList} and all of {countyContext}.',
    'Cabinet painting in {cityName}, done in 4–6 days, with a factory-quality finish that lasts a decade. Free consultation: (508) 690-8886.',
    'Stop staring at dated {cityName} cabinets every morning. Get a free cabinet refinishing estimate today: (508) 690-8886. Throughout {countyContext}.',
    'Ready to transform your {cityName} kitchen without ripping it apart? Book your free cabinet painting consultation: (508) 690-8886.'
  ],
  titlePool: [
    'Cabinet Painters {cityName} MA | Save 70% | (508) 690-8886',
    '{cityName} Cabinet Refinishing | Spray Booth Finish | Free Quote',
    'Kitchen Cabinet Painting {cityName}, MA | 4-Day Turnaround',
    'Cabinet Refinishers {cityName} MA | Factory-Quality Finish',
    'Cabinet Painting in {cityName} | Two-Tone Specialists'
  ],
  descPool: [
    'Cabinet painting in {cityName}, MA. Save 60–70% vs replacement. Spray-booth quality, 4–6 day turnaround. Free estimate: (508) 690-8886.',
    'Kitchen cabinet refinishing in {cityName} and {countyContext}. Premium prep, factory-grade finish, written warranty. (508) 690-8886.',
    'Trusted {cityName} cabinet painters. Two-tone kitchens, bath vanities, built-ins. 40+ five-star Google reviews. (508) 690-8886.',
    'Update your {cityName} kitchen cabinets for a fraction of replacement cost. Spray-booth finish, all colors, all styles. (508) 690-8886.',
    'Cabinet painting and refinishing throughout {cityName} MA. Kitchens, baths, built-ins, mudrooms. Free quote: (508) 690-8886.'
  ],
  keywordPool: [
    'cabinet painters {cityName} MA, cabinet refinishing {cityName} Massachusetts, kitchen cabinet painting {cityName}, cabinet refinishers {cityName}',
    '{cityName} cabinet painting cost, cabinet painters near me {cityName}, kitchen refinish {cityName} MA, two-tone cabinets {cityName}',
    'spray finish cabinets {cityName} MA, factory finish cabinets {cityName}, white cabinets {cityName}, navy cabinets {cityName}',
    'bathroom vanity painters {cityName} MA, built-in cabinet painters {cityName}, mudroom cabinet painters {cityName}',
    'cabinet repaint {cityName} MA, oak cabinet refinishing {cityName}, maple cabinet painting {cityName}, cherry cabinet repaint {cityName}'
  ]
}

// ============================================================================
// CARPENTRY — 5 new pain sets, 5 intros, 5 contexts, 5 closings
// ============================================================================
export const carpentryExpansion: ServiceVariantPack = {
  painPointVariants: [
    [
      { title: 'Insurance Adjuster Found Rot?', desc: 'Storm damage claim flagged wood rot in soffits, fascia, or trim — your repair needs documentation.', solution: 'Insurance-grade rot repair with photo documentation' },
      { title: 'Carpenter Bees Drilling Holes?', desc: 'Carpenter bees have drilled perfect quarter-inch holes throughout your soffit, deck, or trim.', solution: 'Hole repair + bee-deterrent finish treatment' },
      { title: 'Squirrel/Pest Entry Points?', desc: 'Wildlife chewed through your soffit, fascia, or attic vents — repair needs to seal them out for good.', solution: 'Pest-proof carpentry repairs with hardware cloth backing' }
    ],
    [
      { title: 'Composite Deck Boards Failing?', desc: 'Your supposedly low-maintenance composite deck is splitting, warping, or fading badly.', solution: 'Composite deck board replacement and frame inspection' },
      { title: 'Stair Treads Soft & Sagging?', desc: 'Your interior or exterior stair treads are flexing underfoot — a safety hazard waiting to happen.', solution: 'Structural stair tread replacement and reinforcement' },
      { title: 'Window Sash Stuck Forever?', desc: 'Your double-hung windows are painted shut, weights are broken, or sashes are rotting.', solution: 'Window sash repair and operational restoration' }
    ],
    [
      { title: 'Front Porch Floorboards Rotting?', desc: 'Your wooden front porch is the first thing guests see — and the boards are soft, gray, and unsafe.', solution: 'Porch board replacement matched to existing material' },
      { title: 'Exterior Door Frame Failed?', desc: 'Years of weather, sun, and movement have destroyed your exterior door frame.', solution: 'Full exterior door frame replacement with weather-tight reinstall' },
      { title: 'Garage Door Trim Falling Off?', desc: 'The trim around your garage door is rotted, separating, and water is getting behind.', solution: 'Garage door surround replacement with PVC trim option' }
    ],
    [
      { title: 'Shingles Need Wood Backing?', desc: 'Your roofer found rotted sheathing beneath the shingles and needs a carpenter to replace it.', solution: 'Roof sheathing replacement coordination with roofer' },
      { title: 'Soffit Vents Damaged?', desc: 'Your soffit ventilation is critical for attic airflow and the panels are damaged or detached.', solution: 'Soffit panel repair maintaining proper ventilation' },
      { title: 'Chimney Surround Rotting?', desc: 'The wood frame and trim around your chimney chase is failing and water is getting in.', solution: 'Chimney chase carpentry repair with flashing coordination' }
    ],
    [
      { title: 'Deck Railing Code Violation?', desc: 'Your old deck railing doesn\'t meet current code — height, baluster spacing, or attachment all flagged.', solution: 'Code-compliant deck railing replacement' },
      { title: 'Interior Trim Damaged by Movers?', desc: 'Recent move scuffed, chipped, and dented baseboards, casing, and crown molding throughout the house.', solution: 'Interior trim repair and refinish package' },
      { title: 'Crown Molding Pulling Away?', desc: 'Your crown molding is separating from the wall as the house settles, leaving visible gaps.', solution: 'Crown molding re-secure + caulk + paint touch-up' }
    ]
  ],
  introTemplates: [
    'Carpentry repair is the unsexy work that makes painting last. In {cityName}, our carpenters fix the rotted, racked, and damaged wood before any paint touches the surface. {countyContext} weather destroys exterior wood; we replace it properly, period.',
    'A great paint job over rotten wood is just a more expensive failure. JH Painting\'s {cityName} carpentry crew operates on a simple rule: if the substrate isn\'t sound, we fix it before we paint it. {neighborhoodsList} homes get full repair scope visibility.',
    'Carpentry services in {cityName} aren\'t a separate trade for us — they\'re the foundation of every exterior repaint near {landmarksList}. Wood replacement, rot repair, trim install, deck board swaps — all part of the work, all documented.',
    'Pre-painting carpentry in {cityName} catches the issues other contractors leave for the homeowner. Soft sills, rotted soffits, separated trim, failed caulk joints — we identify, photograph, and repair before paint hits the wall in {countyContext}.',
    'Whether it\'s a deck rebuild, fascia replacement, window sill repair, or interior crown molding, our {cityName} carpentry team brings precision and matched materials. {countyContext} homes deserve carpentry that ages with the original work.'
  ],
  localContextTemplates: [
    'Carpentry needs in {cityName} run the spectrum — Victorian gingerbread restoration in historic districts, mid-century beam repair in {neighborhoodsList}, modern composite deck replacement near {landmarksList}. We carry the tools and materials for all of it.',
    'The freeze-thaw cycle in {countyContext} is brutal on wood — water gets into cracks, freezes, expands, splits the grain. Our {cityName} carpentry repairs address the root cause: water management, not just patching the symptom.',
    'Insurance claim carpentry in {cityName} requires photo documentation, scope justification, and proper sequencing. We\'ve worked with most major carriers and adjusters serving {countyContext} — paperwork ready every time.',
    'Real-estate transactions often hinge on carpentry repairs flagged by buyer inspections in {cityName}. Soft window sills, deck issues, and trim rot can sink deals — our {countyContext} crew handles pre-closing repairs on tight timelines.',
    'Many {cityName} homes have specific carpentry needs that out-of-area contractors don\'t recognize — historic district details, period-correct profiles, mortise-and-tenon repairs. Our {countyContext} carpenters have the lineage to handle it.'
  ],
  closingTemplates: [
    'Don\'t paint over rot — fix it first. JH Painting\'s {cityName} carpentry crew preps your home for paint that actually lasts. Free assessment: (508) 690-8886. Throughout {countyContext}.',
    'Your {cityName} home\'s wood needs the same care as its paint. Schedule a free carpentry inspection today: (508) 690-8886.',
    'From storm damage to insurance claims to pre-listing fixes, {cityName} carpentry is what we do before we paint. Free estimate: (508) 690-8886.',
    'Window sills, fascia, soffits, decks, trim — all the wood that protects your {cityName} home. Get a free carpentry assessment: (508) 690-8886. Serving {neighborhoodsList} and all of {countyContext}.',
    'Ready to handle the carpentry your {cityName} home actually needs? Call JH Painting at (508) 690-8886 — free, no-obligation assessment.'
  ],
  titlePool: [
    'Carpenters {cityName} MA | Rot Repair + Paint | (508) 690-8886',
    '{cityName} Wood Rot Repair | Insurance Claim Specialists',
    'Carpentry Services {cityName}, MA | Trim, Deck, Siding',
    'Wood Repair Contractor {cityName} MA | Pre-Paint Prep',
    'Carpenters in {cityName} | Soffit, Fascia, Window Frames'
  ],
  descPool: [
    'Carpentry repair and pre-paint wood prep in {cityName}, MA. Rot replacement, trim install, deck repair. Free assessment: (508) 690-8886.',
    'Trusted carpenters in {cityName} and {countyContext}. Soffit, fascia, window sills, door frames, decks. Insurance claims welcome. (508) 690-8886.',
    'Wood rot repair, trim work, and exterior carpentry in {cityName} MA. Pre-paint substrate prep. 40+ five-star reviews. (508) 690-8886.',
    'Carpenter services for {cityName} homeowners — exterior and interior repairs, code-compliant decks, historic restoration. (508) 690-8886.',
    'Full-service carpentry in {cityName}, MA: rot replacement, deck repair, trim install, soffit/fascia. Free quote: (508) 690-8886.'
  ],
  keywordPool: [
    'carpenters {cityName} MA, wood rot repair {cityName}, carpentry services {cityName} Massachusetts, soffit repair {cityName}',
    '{cityName} fascia repair, window sill repair {cityName}, deck repair {cityName} MA, trim carpenters {cityName}',
    'door frame repair {cityName} MA, exterior carpentry {cityName}, pre-paint carpentry {cityName}, rot specialists {cityName}',
    'insurance carpentry {cityName} MA, storm damage repair {cityName}, pest damage carpentry {cityName}, code-compliant decks {cityName}',
    'historic carpentry {cityName} MA, crown molding {cityName}, baseboard repair {cityName}, casing repair {cityName} Massachusetts'
  ]
}

// ============================================================================
// POWER WASHING — 5 new pain sets, 5 intros, 5 contexts, 5 closings
// ============================================================================
export const powerWashingExpansion: ServiceVariantPack = {
  painPointVariants: [
    [
      { title: 'Black Streaks on Roof Shingles?', desc: 'Those black streaks running down your shingles are Gloeocapsa magma algae — and they\'re eating your roof.', solution: 'Soft-wash roof cleaning that kills algae without damaging shingles' },
      { title: 'Concrete Walkway Black?', desc: 'Years of organic buildup made your concrete walkway nearly black — slip hazard and ugly.', solution: 'High-pressure concrete cleaning to restore original color and slip resistance' },
      { title: 'Patio Furniture Permanently Stained?', desc: 'Your outdoor furniture is fused into the patio with mildew, leaving rust rings and stains.', solution: 'Patio + furniture deep cleaning before placement back' }
    ],
    [
      { title: 'HOA Notice for Dirty Siding?', desc: 'Your HOA flagged your dirty siding and gave you 30 days to clean it or face fines.', solution: 'HOA-compliant exterior soft washing within deadline' },
      { title: 'Listing Photos Next Week?', desc: 'Your realtor needs the home looking pristine for listing photos — driveway, siding, deck all need cleaning.', solution: 'Pre-listing full-exterior wash on a 48-hour turnaround' },
      { title: 'Allergies Triggered by Mold?', desc: 'Mold and mildew on your exterior is contributing to family allergies and respiratory issues.', solution: 'Allergen-removing exterior wash with EPA-registered solutions' }
    ],
    [
      { title: 'Painters Won\'t Start Without Wash?', desc: 'Your painter requires a professional power wash before they\'ll quote or start exterior work.', solution: 'Pre-paint exterior wash certified for paint adhesion' },
      { title: 'Pool Deck Slippery & Dangerous?', desc: 'Algae on the pool deck is a slip hazard — especially with kids running around the pool.', solution: 'Safe-pressure pool deck cleaning to restore slip resistance' },
      { title: 'Garage Floor Concrete Stained?', desc: 'Oil drips, rust stains, and salt residue have made your garage concrete unsightly.', solution: 'Industrial garage floor cleaning + optional sealer' }
    ],
    [
      { title: 'Stone Patio Mortar Black?', desc: 'Your beautiful natural stone patio has black mildew growing in the mortar joints.', solution: 'Stone-safe joint cleaning that preserves mortar integrity' },
      { title: 'Brick Walkway Discolored?', desc: 'Your brick walkway has white efflorescence, green algae, and dirt buildup.', solution: 'Brick-specific cleaning solutions for color restoration' },
      { title: 'Wooden Fence Black & Green?', desc: 'Your wooden privacy fence has turned mostly black with mildew and green with moss.', solution: 'Soft-wash fence cleaning that preserves wood + preps for stain' }
    ],
    [
      { title: 'Mailbox & Light Posts?', desc: 'Small exterior items — mailbox, light posts, address signs — are filthy and dragging down curb appeal.', solution: 'Small-item exterior detailing added to any wash package' },
      { title: 'Awnings Black & Sagging?', desc: 'Your fabric or metal awnings are stained, discolored, and look ready to fail.', solution: 'Awning-specific cleaning methods + sealant where appropriate' },
      { title: 'Outdoor Kitchen Disgusting?', desc: 'Your outdoor kitchen surfaces, grills, and surrounding area need a serious deep clean.', solution: 'Outdoor kitchen and surface deep cleaning service' }
    ]
  ],
  introTemplates: [
    'Power washing in {cityName} is more than spray-and-pray. It\'s pressure-rated soft washing for siding, high-pressure for concrete, and specialty methods for stone, brick, and wood. Our {countyContext} crews calibrate every surface near {landmarksList}.',
    'Your {cityName} property collects organic growth fast in our {countyContext} climate — high humidity, mature trees, leaf litter, and freeze-thaw all create conditions where algae, mildew, and dirt thrive. Our power washing fights back with EPA-registered cleaning agents.',
    'Power washing isn\'t one tool — it\'s six. Hot water, cold water, soft-wash chemicals, downstream injectors, surface cleaners, and detail wands. Our {cityName} team brings all six to every job throughout {neighborhoodsList}.',
    'When {cityName} homeowners call us for power washing, they\'re usually fixing one of three things: cleaning before a paint job, prepping for a listing, or just restoring curb appeal that\'s gotten away from them. We handle all three in {countyContext}.',
    'Soft washing has replaced high-pressure for most {cityName} exterior cleaning — particularly on siding, roof, and delicate surfaces. Our {countyContext} crews use chemistry, not pressure, to lift organic growth and restore surfaces near {landmarksList}.'
  ],
  localContextTemplates: [
    'We\'ve power washed {cityName} properties throughout {neighborhoodsList} — driveways, walkways, decks, patios, fences, siding, roofs, pool decks. Each surface gets the right pressure and the right chemistry.',
    'The {countyContext} climate creates particular power washing demand cycles — early spring for winter buildup, late spring before painting season, summer for entertaining prep, fall before winter. {cityName} crews work them all.',
    '{cityName} HOAs have started enforcing exterior cleanliness more aggressively, especially in newer {neighborhoodsList} developments. Our power washing meets those compliance standards across {countyContext}.',
    'Real-estate-driven power washing in {cityName} has become a category of its own — pre-listing washes that move listings faster. Our {countyContext} crew runs realtor packages with photo-ready turnaround.',
    'Painters across {cityName} send us as their pre-paint wash subcontractor because we deliver the substrate condition they need for paint adhesion. Properly prepared exteriors throughout {countyContext} hold paint years longer.'
  ],
  closingTemplates: [
    'Get your {cityName} property looking dramatically better in a single day. Free power washing quote: (508) 690-8886. Throughout {countyContext}.',
    'Your {cityName} home is hiding under years of dirt, mildew, and algae. Let us reveal what\'s underneath: (508) 690-8886.',
    'From driveways to roofs and everything in between, {cityName} power washing makes your property look 10 years newer in 4 hours. Call (508) 690-8886.',
    'Pre-paint, pre-listing, or pre-pride-of-ownership, {cityName} power washing delivers fast results that last. Free estimate: (508) 690-8886.',
    'Ready to see your {cityName} property the way you remember it? Schedule a free power washing assessment today: (508) 690-8886.'
  ],
  titlePool: [
    'Power Washing {cityName} MA | Soft Wash Specialists | (508) 690-8886',
    '{cityName} Pressure Washing | Roof, Siding, Concrete',
    'Power Washing Services {cityName}, MA | Pre-Paint + Pre-Listing',
    'House Washing {cityName} MA | Algae & Mildew Removal',
    'Power Washing in {cityName} | Driveway, Deck, Siding'
  ],
  descPool: [
    'Power washing in {cityName}, MA. Soft-wash siding, high-pressure concrete, roof algae removal. Free quote: (508) 690-8886.',
    'Pressure washing and house washing in {cityName} and {countyContext}. EPA-registered solutions, professional crews. (508) 690-8886.',
    '{cityName} power washing services — driveways, walkways, siding, roofs, decks, fences. Pre-paint and pre-listing specialists. (508) 690-8886.',
    'Professional power washing throughout {cityName} MA. Soft-wash methods, calibrated pressure, dramatic results. (508) 690-8886.',
    'JH Painting power washing in {cityName}: licensed, insured, and 40+ five-star reviews. Free estimate: (508) 690-8886.'
  ],
  keywordPool: [
    'power washing {cityName} MA, pressure washing {cityName} Massachusetts, soft wash {cityName}, house washing {cityName}',
    '{cityName} driveway cleaning, deck washing {cityName} MA, roof cleaning {cityName}, siding cleaning {cityName}',
    'pre-paint washing {cityName} MA, pre-listing power wash {cityName}, exterior cleaning {cityName}, mildew removal {cityName}',
    'concrete cleaning {cityName} MA, brick cleaning {cityName}, stone patio cleaning {cityName}, fence washing {cityName}',
    'algae removal {cityName} MA, mold cleaning {cityName}, exterior wash {cityName} Massachusetts, pool deck cleaning {cityName}'
  ]
}

// Map service slug → expansion pack
export const serviceExpansions: Record<string, ServiceVariantPack> = {
  'interior-painting': interiorExpansion,
  'exterior-painting': exteriorExpansion,
  'commercial-painting': commercialExpansion,
  'residential-painting': residentialExpansion,
  'cabinet-painting': cabinetExpansion,
  'carpentry': carpentryExpansion,
  'power-washing': powerWashingExpansion,
}

// Multi-factor hash for city+service URLs.
// Uses distance bracket + population bracket + county initial in addition to slug,
// so geographic neighbors get genuinely different content selections instead of
// hashing into the same variant bucket.
export function multiFactorHash(
  citySlug: string,
  service: string,
  distance?: number,
  population?: string,
  county?: string
): number {
  const distBracket = distance == null ? 'x' : distance < 5 ? 'a' : distance < 10 ? 'b' : distance < 15 ? 'c' : distance < 20 ? 'd' : distance < 30 ? 'e' : 'f'
  const popBracket = !population ? 'x' : /^\d+/.test(population) ? (
    parseInt(population) < 5000 ? 'a' :
    parseInt(population) < 15000 ? 'b' :
    parseInt(population) < 30000 ? 'c' :
    parseInt(population) < 75000 ? 'd' : 'e'
  ) : 'x'
  const countyKey = county ? county.charAt(0).toLowerCase() + county.charAt(1).toLowerCase() : 'xx'
  const composite = `${citySlug}::${service}::${distBracket}::${popBracket}::${countyKey}`
  let hash = 0
  for (let i = 0; i < composite.length; i++) {
    hash = ((hash << 5) - hash) + composite.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash)
}

// Pick a variant from a pool using the multi-factor hash. Different "axis" offsets
// (intro, context, closing, painPoints, title, desc, keywords) get different
// modulo slots so the same hash doesn't pick the same index everywhere.
export function pickVariant<T>(pool: T[], hash: number, axisOffset: number): T {
  if (!pool || pool.length === 0) throw new Error('pickVariant: empty pool')
  const idx = (hash + axisOffset * 31) % pool.length
  return pool[idx]
}
