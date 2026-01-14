// Script to generate UNIQUE city-specific FAQs based on city data - V2
const fs = require('fs');
const path = require('path');

// Read cities data
const citiesFile = fs.readFileSync(path.join(__dirname, '../app/data/cities.ts'), 'utf-8');

// Parse cities with all their attributes
const cityMatches = citiesFile.match(/\{[^}]+slug: '[^']+',?[^}]*\}/g);
const cities = cityMatches.map(match => {
  const name = match.match(/name: '([^']+)'/)?.[1] || '';
  const slug = match.match(/slug: '([^']+)'/)?.[1] || '';
  const distance = parseFloat(match.match(/distance: ([\d.]+)/)?.[1] || '0');
  const county = match.match(/county: '([^']+)'/)?.[1] || 'Massachusetts';
  const population = match.match(/population: '([^']+)'/)?.[1] || '';
  const zipCodes = match.match(/zipCodes: \[([^\]]+)\]/)?.[1]?.split(',').map(z => z.trim().replace(/'/g, '')) || [];
  const landmarks = match.match(/landmarks: \[([^\]]+)\]/)?.[1]?.split(',').map(l => l.trim().replace(/'/g, '')) || [];
  const neighborhoods = match.match(/neighborhoods: \[([^\]]+)\]/)?.[1]?.split(',').map(n => n.trim().replace(/'/g, '')) || [];

  return { name, slug, distance, county, population, zipCodes, landmarks, neighborhoods };
}).filter(c => c.slug && c.name);

console.log(`Found ${cities.length} cities`);

// City characteristics based on data
function getCityCharacteristics(city) {
  const { name, landmarks, neighborhoods, county, population, distance } = city;

  const hasLake = landmarks.some(l => l.toLowerCase().includes('lake') || l.toLowerCase().includes('pond'));
  const hasRiver = landmarks.some(l => l.toLowerCase().includes('river'));
  const hasHistoric = landmarks.some(l => l.toLowerCase().includes('historic') || l.toLowerCase().includes('common') || l.toLowerCase().includes('museum'));
  const hasTrail = landmarks.some(l => l.toLowerCase().includes('trail') || l.toLowerCase().includes('bike'));
  const hasUniversity = landmarks.some(l => l.toLowerCase().includes('university') || l.toLowerCase().includes('college') || l.toLowerCase().includes('school'));
  const hasMall = landmarks.some(l => l.toLowerCase().includes('mall') || l.toLowerCase().includes('shopping'));
  const hasReservoir = landmarks.some(l => l.toLowerCase().includes('reservoir'));
  const hasPark = landmarks.some(l => l.toLowerCase().includes('park') || l.toLowerCase().includes('forest'));

  const pop = parseInt(population.replace(/[^0-9]/g, '')) || 0;
  const isLargeCity = pop > 50000;
  const isMediumCity = pop >= 15000 && pop <= 50000;
  const isSmallTown = pop < 15000;
  const isRural = pop < 8000;

  const isVeryClose = distance < 10;
  const isClose = distance >= 10 && distance < 20;
  const isFar = distance >= 20;

  return {
    hasLake, hasRiver, hasHistoric, hasTrail, hasUniversity, hasMall, hasReservoir, hasPark,
    isLargeCity, isMediumCity, isSmallTown, isRural,
    isVeryClose, isClose, isFar,
    primaryLandmark: landmarks[0] || '',
    primaryNeighborhood: neighborhoods[0] || ''
  };
}

// Generate truly unique FAQs based on city characteristics
function generateCityFaqs(city) {
  const { name, slug, distance, county, population, zipCodes, landmarks, neighborhoods } = city;
  const chars = getCityCharacteristics(city);
  const zipCode = zipCodes[0] || '';

  const faqs = [];

  // FAQ 1: Service Area - Always included but personalized
  let serviceAnswer = `Absolutely! ${name} is `;
  if (chars.isVeryClose) {
    serviceAnswer += `one of our closest service areas, just ${distance.toFixed(1)} miles from our Marlborough headquarters. `;
    serviceAnswer += `We have many loyal customers in ${name} and can often provide same-day estimates. `;
  } else if (chars.isClose) {
    serviceAnswer += `well within our primary service area in ${county}. `;
    serviceAnswer += `We've painted dozens of homes throughout ${name}'s neighborhoods`;
    serviceAnswer += chars.primaryNeighborhood ? `, including ${chars.primaryNeighborhood}. ` : '. ';
  } else {
    serviceAnswer += `part of our extended service area in ${county}. `;
    serviceAnswer += `We regularly take projects in ${name} and the surrounding communities. `;
  }
  serviceAnswer += `Call (508) 690-8886 for a free estimate!`;

  faqs.push({
    question: `Do you serve ${name}, MA ${zipCode}?`,
    answer: serviceAnswer
  });

  // FAQ 2: Local Experience - Based on landmarks
  if (chars.hasLake) {
    const lakeName = landmarks.find(l => l.toLowerCase().includes('lake') || l.toLowerCase().includes('pond')) || 'the lake';
    faqs.push({
      question: `Do you paint homes near ${lakeName} in ${name}?`,
      answer: `Yes, we have extensive experience with lakeside properties near ${lakeName}. These homes face unique challenges: increased humidity, morning fog, and intense sun reflection off the water. We use moisture-resistant primers, mold-inhibiting paints, and UV-protective topcoats specifically for waterfront homes. We've painted many properties in this beautiful area of ${name}.`
    });
  } else if (chars.hasRiver) {
    const riverName = landmarks.find(l => l.toLowerCase().includes('river')) || 'the river';
    faqs.push({
      question: `How do you handle riverside properties near ${riverName}?`,
      answer: `Riverside homes near ${riverName} in ${name} require special attention due to elevated moisture levels. We use breathable, moisture-resistant paints that allow water vapor to escape while preventing outside moisture from penetrating. Our prep work includes thorough mold and mildew treatment. We've successfully painted numerous homes along ${riverName}.`
    });
  } else if (chars.hasHistoric) {
    const historicSite = landmarks.find(l => l.toLowerCase().includes('historic') || l.toLowerCase().includes('common') || l.toLowerCase().includes('museum')) || 'historic district';
    faqs.push({
      question: `Do you work on historic homes near ${historicSite}?`,
      answer: `Absolutely! We specialize in painting historic properties in ${name}, particularly near ${historicSite}. We're EPA Lead-Safe Certified (required for pre-1978 homes), understand period-appropriate color palettes, and take extra care with original architectural details. Many ${name} homes have beautiful woodwork that deserves expert attention.`
    });
  } else if (chars.primaryLandmark) {
    faqs.push({
      question: `What areas of ${name} do you service most?`,
      answer: `We paint homes throughout all of ${name}, from ${chars.primaryNeighborhood || 'the center'} to the surrounding neighborhoods. We're familiar with the different housing styles across ${name} - whether you're near ${chars.primaryLandmark} or in the newer developments. Our crews know ${name} well and can navigate efficiently to keep your project on schedule.`
    });
  } else {
    faqs.push({
      question: `How familiar are you with ${name}?`,
      answer: `Very familiar! We've been painting homes in ${name} and ${county} for years. We understand the local housing styles, from classic New England colonials to modern constructions. Our familiarity with ${name}'s neighborhoods helps us efficiently schedule and complete projects.`
    });
  }

  // FAQ 3: City-specific housing/climate challenge
  if (chars.isLargeCity) {
    faqs.push({
      question: `Do you paint condos and apartments in ${name}?`,
      answer: `Yes! We have extensive experience with ${name}'s multi-family properties, condos, and apartment buildings. We coordinate with building management, handle all insurance and access requirements, and work around tenant schedules. We understand the unique logistics of urban painting projects and maintain professional, quiet work environments.`
    });
  } else if (chars.hasUniversity) {
    const school = landmarks.find(l => l.toLowerCase().includes('university') || l.toLowerCase().includes('college') || l.toLowerCase().includes('school')) || 'local schools';
    faqs.push({
      question: `Do you work with rental properties near ${school}?`,
      answer: `Absolutely! We paint many rental properties in ${name}, including those near ${school}. We understand landlords need quick turnovers between tenants. We can work efficiently during vacancy periods and offer priority scheduling for rental properties. Our durable paint choices withstand the wear of rental environments.`
    });
  } else if (chars.isSmallTown || chars.isRural) {
    faqs.push({
      question: `Do you charge extra to come to ${name}?`,
      answer: `No, we never charge travel fees for ${name} projects. ${name} is within our standard service area, and we price projects based on the work required, not distance. Many of our crew members are familiar with ${name} and enjoy working in smaller communities where we often build lasting relationships with homeowners.`
    });
  } else {
    faqs.push({
      question: `What types of homes do you paint most in ${name}?`,
      answer: `In ${name}, we paint a diverse mix of homes - single-family colonials, capes, ranches, and newer construction. ${county} has wonderful architectural variety, and we adapt our techniques to each home's specific needs. Whether your ${name} home is 20 or 200 years old, we have the experience to paint it beautifully.`
    });
  }

  // FAQ 4: Pricing - Always relevant but customized
  let priceIntro = '';
  if (chars.isLargeCity) {
    priceIntro = `${name} painting costs are competitive with the greater Boston area. `;
  } else if (chars.isVeryClose) {
    priceIntro = `Being close to our Marlborough base, ${name} residents benefit from efficient scheduling and competitive pricing. `;
  } else {
    priceIntro = `Painting costs in ${name} are in line with ${county} averages. `;
  }

  faqs.push({
    question: `What's the average cost to paint a house in ${name}?`,
    answer: `${priceIntro}For interior painting, expect $3-$5 per square foot depending on the number of rooms, ceiling height, and prep work needed. Exterior painting typically runs $4-$7 per square foot based on your home's size, siding type, and condition. A typical ${name} home interior costs $4,000-$8,000; exteriors run $5,000-$12,000. We provide detailed, no-obligation estimates.`
  });

  // FAQ 5: Timeline
  faqs.push({
    question: `How soon can you start a project in ${name}?`,
    answer: `For ${name} residents, we typically schedule estimates within 2-3 days and can often start work within 1-2 weeks. During our busy season (May-September), we recommend booking 2-3 weeks ahead to secure your preferred dates. Emergency or time-sensitive projects may be accommodated with advance notice. Call us to discuss your ${name} project timeline.`
  });

  // FAQ 6: Weather/Season specific
  if (chars.hasLake || chars.hasRiver || chars.hasReservoir) {
    faqs.push({
      question: `When is the best time to paint near ${name}'s waterfront areas?`,
      answer: `For waterfront properties in ${name}, late spring (May-June) and early fall (September-October) are ideal. These periods offer moderate temperatures, lower humidity, and less fog than mid-summer. We carefully monitor weather and moisture levels before painting, ensuring paint adheres properly and dries correctly for a long-lasting finish.`
    });
  } else {
    faqs.push({
      question: `What's the best season for exterior painting in ${name}?`,
      answer: `In ${name}, the optimal exterior painting season runs from late April through October. Temperatures should be between 50-85°F with low humidity. We monitor weather forecasts closely and only paint when conditions are ideal. Interior painting can be done year-round. Spring bookings fill quickly, so we recommend calling early to reserve your spot.`
    });
  }

  // FAQ 7: Paint/Materials
  faqs.push({
    question: `What paint brands work best for ${name} homes?`,
    answer: `For ${name}'s New England climate, we exclusively use Benjamin Moore and Sherwin-Williams premium paints. Specifically, Benjamin Moore Aura and Sherwin-Williams Duration are excellent for ${name} exteriors - they withstand our freeze-thaw cycles, resist fading, and last 10+ years. For interiors, we use their low-VOC lines for family-safe application.`
  });

  // FAQ 8: Warranty/Guarantee
  faqs.push({
    question: `What guarantee do you offer ${name} homeowners?`,
    answer: `Every ${name} project comes with our comprehensive guarantee: 5-year warranty on exterior work, 3-year warranty on interiors, covering peeling, cracking, and blistering under normal conditions. More importantly, we guarantee your satisfaction - if something isn't right, we fix it. As a local company serving ${county}, our reputation depends on happy customers like you.`
  });

  return faqs;
}

// Generate all city FAQs
const cityFaqs = {};
cities.forEach(city => {
  cityFaqs[city.slug] = generateCityFaqs(city);
});

// Output as JSON
const outputPath = path.join(__dirname, 'city-faqs-v2.json');
fs.writeFileSync(outputPath, JSON.stringify(cityFaqs, null, 2));
console.log(`Generated FAQs for ${Object.keys(cityFaqs).length} cities`);
console.log(`Output saved to: ${outputPath}`);

// Show samples
console.log('\n=== Sample: Hudson (lake/river area) ===');
cityFaqs['hudson'].forEach((faq, i) => {
  console.log(`${i+1}. Q: ${faq.question}`);
});

console.log('\n=== Sample: Cambridge (large city) ===');
cityFaqs['cambridge'].forEach((faq, i) => {
  console.log(`${i+1}. Q: ${faq.question}`);
});

console.log('\n=== Sample: Concord (historic) ===');
cityFaqs['concord'].forEach((faq, i) => {
  console.log(`${i+1}. Q: ${faq.question}`);
});
