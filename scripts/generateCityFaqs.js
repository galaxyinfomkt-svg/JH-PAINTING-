// Script to generate city-specific FAQs based on city data
const fs = require('fs');
const path = require('path');

// Read cities data
const citiesFile = fs.readFileSync(path.join(__dirname, '../app/data/cities.ts'), 'utf-8');

// Parse cities
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

// Generate FAQs for each city based on its characteristics
function generateCityFaqs(city) {
  const { name, slug, distance, county, population, zipCodes, landmarks, neighborhoods } = city;
  const zipCode = zipCodes[0] || '';
  const primaryLandmark = landmarks[0] || '';
  const primaryNeighborhood = neighborhoods[0] || '';
  const isHistoric = landmarks.some(l => l.toLowerCase().includes('historic') || l.toLowerCase().includes('common') || l.toLowerCase().includes('museum'));
  const hasLake = landmarks.some(l => l.toLowerCase().includes('lake') || l.toLowerCase().includes('pond'));
  const hasRiver = landmarks.some(l => l.toLowerCase().includes('river'));
  const isUrban = parseInt(population.replace(/[^0-9]/g, '')) > 50000;
  const isRural = parseInt(population.replace(/[^0-9]/g, '')) < 8000;
  const distanceDesc = distance < 10 ? 'very close to our Marlborough headquarters' :
                       distance < 20 ? 'within our primary service area' :
                       'within our extended service area';

  const faqs = [];

  // FAQ 1: Location/Service Area
  faqs.push({
    question: `Do you provide painting services in ${name}, MA ${zipCode}?`,
    answer: `Yes! ${name} is ${distanceDesc}. We regularly paint homes throughout ${name}, ${county}${primaryNeighborhood ? `, including the ${primaryNeighborhood} area` : ''}. Being based in Marlborough means we can provide fast response times and competitive pricing for ${name} residents. Call (508) 690-8886 for a free estimate!`
  });

  // FAQ 2: Local Experience
  if (landmarks.length > 0) {
    faqs.push({
      question: `What experience do you have painting homes near ${primaryLandmark}?`,
      answer: `We've painted numerous homes in the ${primaryLandmark} area of ${name}. Our familiarity with ${name}'s neighborhoods means we understand the local architectural styles, from classic New England colonials to modern constructions. We know which paint products work best for homes in this area.`
    });
  } else {
    faqs.push({
      question: `What experience do you have with ${name} homes?`,
      answer: `We've been painting homes in ${name} and surrounding ${county} communities for years. Our crews are familiar with the typical housing styles in ${name}, from classic colonials to contemporary homes. We understand the specific challenges of painting in this area.`
    });
  }

  // FAQ 3: Weather/Climate specific
  if (hasLake || hasRiver) {
    const waterFeature = hasLake ? 'lake' : 'river';
    faqs.push({
      question: `How do you handle the moisture challenges near ${name}'s ${waterFeature} areas?`,
      answer: `Properties near water in ${name} face increased humidity and moisture exposure. We use specialized moisture-resistant primers, mold and mildew-resistant paints, and proper surface preparation to ensure lasting results. Our paint choices are specifically selected to withstand the ${waterFeature}side conditions common in ${name}.`
    });
  } else {
    faqs.push({
      question: `How do you protect ${name} homes from Massachusetts weather?`,
      answer: `${name} homes face challenging Massachusetts weather - freezing winters, humid summers, and everything in between. We use premium exterior paints from Benjamin Moore and Sherwin-Williams that are specifically formulated for New England conditions. Our thorough preparation includes addressing any moisture damage before painting.`
    });
  }

  // FAQ 4: Pricing/Estimates
  faqs.push({
    question: `How much does house painting cost in ${name}, MA?`,
    answer: `Interior painting in ${name} typically ranges from $2-$4 per square foot, while exterior painting runs $3-$5 per square foot, depending on the home's size, condition, and paint quality selected. We provide free, detailed written estimates for ${name} homeowners with no hidden fees. Call (508) 690-8886 for your personalized quote.`
  });

  // FAQ 5: Timeline
  faqs.push({
    question: `How quickly can you start a painting project in ${name}?`,
    answer: `For ${name} residents, we can typically schedule an estimate within 24-48 hours. Project start times depend on our current schedule, but we often begin work within 1-2 weeks of approval. During peak season (April-October), we recommend booking 2-3 weeks ahead. We offer priority scheduling for ${name} homeowners.`
  });

  // FAQ 6: Historic/Architecture specific
  if (isHistoric) {
    faqs.push({
      question: `Do you have experience with ${name}'s historic properties?`,
      answer: `Absolutely! We specialize in historic home painting and are EPA Lead-Safe Certified for homes built before 1978. We understand the unique requirements of ${name}'s historic properties, including period-appropriate color selection, proper lead paint handling, and preserving architectural details. We treat these homes with the care they deserve.`
    });
  } else if (isUrban) {
    faqs.push({
      question: `Do you paint condos and multi-family homes in ${name}?`,
      answer: `Yes! We have extensive experience with ${name}'s condos, townhouses, and multi-family properties. We coordinate with HOAs and property managers, handle insurance requirements, and can work around tenants' schedules. We're familiar with the specific requirements for urban properties in ${name}.`
    });
  } else {
    faqs.push({
      question: `What types of homes do you paint in ${name}?`,
      answer: `We paint all types of homes in ${name} - colonials, capes, ranches, split-levels, and contemporary styles. Whether your home is a classic New England design or modern construction, we have the expertise to deliver beautiful, lasting results. We also offer cabinet refinishing and deck staining.`
    });
  }

  // FAQ 7: Paint Brands
  faqs.push({
    question: `What paint brands do you recommend for ${name} homes?`,
    answer: `For ${name} homes, we exclusively use premium paints from Benjamin Moore and Sherwin-Williams. These professional-grade products are specifically formulated for New England's climate. For exteriors, we recommend Benjamin Moore Aura or Sherwin-Williams Duration for maximum durability. For interiors, we use low-VOC options that are safe for your family.`
  });

  // FAQ 8: Warranty
  faqs.push({
    question: `What warranty do you offer on painting work in ${name}?`,
    answer: `We stand behind our work in ${name} with comprehensive warranties: 5 years on exterior painting and 3 years on interior painting. Our warranty covers peeling, blistering, flaking, and fading under normal conditions. Being local means warranty service is easy - just call us and we'll promptly address any concerns.`
  });

  return faqs;
}

// Generate all city FAQs
const cityFaqs = {};
cities.forEach(city => {
  cityFaqs[city.slug] = generateCityFaqs(city);
});

// Output as JSON for review
const outputPath = path.join(__dirname, 'city-faqs-generated.json');
fs.writeFileSync(outputPath, JSON.stringify(cityFaqs, null, 2));
console.log(`Generated FAQs for ${Object.keys(cityFaqs).length} cities`);
console.log(`Output saved to: ${outputPath}`);

// Show sample
console.log('\nSample FAQs for Hudson:');
console.log(JSON.stringify(cityFaqs['hudson'], null, 2));
