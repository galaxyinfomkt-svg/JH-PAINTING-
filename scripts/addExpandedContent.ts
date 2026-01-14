// Script to add expanded SEO content (introText, serviceDescription, closingPitch) to all cities
// Run with: npx ts-node scripts/addExpandedContent.ts

import * as fs from 'fs';
import * as path from 'path';

// Read cities data
const citiesPath = path.join(__dirname, '../app/data/cities.ts');
const citiesContent = fs.readFileSync(citiesPath, 'utf-8');

// Extract city data using regex
const cityRegex = /\{\s*name:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*distance:\s*([\d.]+),\s*county:\s*'([^']+)'/g;
const cities: Array<{name: string; slug: string; distance: number; county: string}> = [];
let match;
while ((match = cityRegex.exec(citiesContent)) !== null) {
  cities.push({
    name: match[1],
    slug: match[2],
    distance: parseFloat(match[3]),
    county: match[4]
  });
}

// Cities that already have expanded content
const citiesWithContent = [
  'marlborough', 'hudson', 'southborough', 'framingham', 'natick', 'worcester',
  'boston', 'cambridge', 'newton', 'wellesley', 'concord', 'lexington'
];

// Generate introText for a city
function generateIntroText(name: string, county: string, distance: number): string {
  const distanceDesc = distance < 10 ? 'just minutes from our Marlborough headquarters' :
                       distance < 20 ? 'conveniently located within our primary service area' :
                       'within our extended service area throughout Massachusetts';

  return `When ${name} homeowners need professional painting services they can trust, JH Painting Services delivers exceptional results with the quality and reliability that local families deserve. Based in nearby Marlborough, we've built our reputation throughout ${county} by providing meticulous craftsmanship, transparent pricing, and personalized service that larger companies simply can't match. ${name} is ${distanceDesc}, and we've spent years painting homes throughout this wonderful community. Whether you're updating your interior with fresh, modern colors, protecting your exterior from New England's harsh weather, or transforming your kitchen with cabinet refinishing, our experienced team brings the expertise and attention to detail that ${name} homes deserve. We're not just painters – we're your neighbors, committed to maintaining the beauty and value of properties throughout our community.`;
}

// Generate serviceDescription for a city
function generateServiceDescription(name: string): string {
  return `JH Painting Services offers comprehensive painting and finishing solutions for ${name} homes and businesses. Our interior painting services include walls, ceilings, trim, doors, and specialty finishes – transforming every room with premium low-VOC paints safe for your family. For exteriors, we provide complete house painting with proper surface preparation, premium weather-resistant paints, and attention to detail that protects your investment against Massachusetts' challenging climate. Our cabinet refinishing service saves ${name} homeowners 60-70% compared to full replacement while delivering a factory-smooth, spray-applied finish. We also offer deck staining, commercial painting, and specialty services including wallpaper removal and drywall repair. Every project includes a detailed written estimate, clear timeline, and our commitment to your complete satisfaction.`;
}

// Generate closingPitch for a city
function generateClosingPitch(name: string): string {
  return `Ready to transform your ${name} home with professional painting that exceeds expectations? JH Painting Services combines premium materials, expert craftsmanship, and genuine care for every project we undertake. Our ${name} neighbors trust us because we deliver on our promises – showing up on time, communicating clearly, protecting your property, and achieving beautiful, lasting results. Whether you need a single room refreshed or your entire home transformed, we'd be honored to earn your trust. Contact us today at (508) 690-8886 for your free estimate, or fill out our online form. As your local painting professionals, we'll respond quickly and treat your home like it's our own.`;
}

// Generate the additions for cityContent.ts
const additions: string[] = [];

cities.forEach(city => {
  if (!citiesWithContent.includes(city.slug)) {
    additions.push(`
// Add to '${city.slug}' entry after localTip:
    introText: '${generateIntroText(city.name, city.county, city.distance).replace(/'/g, "\\'")}',
    serviceDescription: '${generateServiceDescription(city.name).replace(/'/g, "\\'")}',
    closingPitch: '${generateClosingPitch(city.name).replace(/'/g, "\\'")}'`);
  }
});

console.log(`Found ${cities.length} total cities`);
console.log(`Cities with existing expanded content: ${citiesWithContent.length}`);
console.log(`Cities needing expanded content: ${cities.length - citiesWithContent.length}`);
console.log('\n=== Content to add ===\n');
additions.slice(0, 5).forEach(a => console.log(a));
console.log(`\n... and ${additions.length - 5} more cities`);
