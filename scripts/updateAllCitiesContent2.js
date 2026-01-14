// Script to add expanded SEO content to all cities in cityContent.ts
// Run with: node scripts/updateAllCitiesContent2.js

const fs = require('fs');
const path = require('path');

const cityContentPath = path.join(__dirname, '../app/data/cityContent.ts');
let content = fs.readFileSync(cityContentPath, 'utf-8');

// Read cities data to get county info
const citiesPath = path.join(__dirname, '../app/data/cities.ts');
const citiesContent = fs.readFileSync(citiesPath, 'utf-8');

// Parse cities to get name, slug, county mapping
const cityInfo = {};
const cityRegex = /\{\s*name:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*distance:\s*([\d.]+),\s*county:\s*'([^']+)'/g;
let match;
while ((match = cityRegex.exec(citiesContent)) !== null) {
  cityInfo[match[2]] = {
    name: match[1],
    slug: match[2],
    distance: parseFloat(match[3]),
    county: match[4]
  };
}

console.log(`Found ${Object.keys(cityInfo).length} cities in cities.ts`);

// Generate content functions
function generateIntroText(name, county, distance) {
  const distanceDesc = distance < 10 ? 'just minutes from our Marlborough headquarters' :
                       distance < 20 ? 'conveniently located within our primary service area' :
                       'within our extended service area throughout Massachusetts';

  return `When ${name} homeowners need professional painting services they can trust, JH Painting Services delivers exceptional results with the quality and reliability that local families deserve. Based in nearby Marlborough, we've built our reputation throughout ${county} by providing meticulous craftsmanship, transparent pricing, and personalized service that larger companies simply can't match. ${name} is ${distanceDesc}, and we've spent years painting homes throughout this wonderful community. Whether you're updating your interior with fresh, modern colors, protecting your exterior from New England's harsh weather, or transforming your kitchen with cabinet refinishing, our experienced team brings the expertise and attention to detail that ${name} homes deserve.`;
}

function generateServiceDescription(name) {
  return `JH Painting Services offers comprehensive painting and finishing solutions for ${name} homes and businesses. Our interior painting services include walls, ceilings, trim, doors, and specialty finishes – transforming every room with premium low-VOC paints safe for your family. For exteriors, we provide complete house painting with proper surface preparation, premium weather-resistant paints, and attention to detail that protects your investment against Massachusetts' challenging climate. Our cabinet refinishing service saves ${name} homeowners 60-70% compared to full replacement while delivering a factory-smooth, spray-applied finish.`;
}

function generateClosingPitch(name) {
  return `Ready to transform your ${name} home with professional painting that exceeds expectations? JH Painting Services combines premium materials, expert craftsmanship, and genuine care for every project we undertake. Our ${name} neighbors trust us because we deliver on our promises – showing up on time, communicating clearly, protecting your property, and achieving beautiful, lasting results. Contact us today at (508) 690-8886 for your free estimate.`;
}

// Find all localTip lines that are NOT followed by introText
// Pattern: localTip: '...'  }  (end of city block without introText)
let updatedCount = 0;

// Process each city from cityInfo
Object.keys(cityInfo).forEach(slug => {
  const info = cityInfo[slug];

  // Check if this city already has introText
  const hasIntroText = content.includes(`'${slug}':`) &&
                       content.substring(content.indexOf(`'${slug}':`)).split(/'\w+':/)[0]?.includes('introText');

  // Find the pattern: localTip: '...'  } (for this city, not followed by introText)
  // We need to find localTip for this specific city

  // Find city block start
  const cityStartMatch = content.match(new RegExp(`'${slug}':\\s*\\{`));
  if (!cityStartMatch) {
    return;
  }

  const cityStartIndex = content.indexOf(cityStartMatch[0]);

  // Find the localTip line for this city (searching from city start)
  const afterCityStart = content.substring(cityStartIndex);

  // Check if introText already exists for this city
  const nextCityMatch = afterCityStart.match(/\n\s*'[a-z-]+':\s*\{/);
  const cityBlockEnd = nextCityMatch ? afterCityStart.indexOf(nextCityMatch[0]) : afterCityStart.length;
  const cityBlock = afterCityStart.substring(0, cityBlockEnd);

  if (cityBlock.includes('introText:')) {
    return; // Already has introText
  }

  // Find localTip in this city block
  const localTipMatch = cityBlock.match(/localTip:\s*'([^'\\]|\\.)*'/);
  if (!localTipMatch) {
    console.log(`No localTip found for: ${slug}`);
    return;
  }

  const localTipEnd = cityBlock.indexOf(localTipMatch[0]) + localTipMatch[0].length;

  // Generate new content
  const introText = generateIntroText(info.name, info.county, info.distance).replace(/'/g, "\\'");
  const serviceDesc = generateServiceDescription(info.name).replace(/'/g, "\\'");
  const closingPitch = generateClosingPitch(info.name).replace(/'/g, "\\'");

  const newFields = `,
    introText: '${introText}',
    serviceDescription: '${serviceDesc}',
    closingPitch: '${closingPitch}'`;

  // Insert after localTip
  const beforeLocalTip = cityBlock.substring(0, localTipEnd);
  const afterLocalTip = cityBlock.substring(localTipEnd);
  const updatedCityBlock = beforeLocalTip + newFields + afterLocalTip;

  // Replace in content
  const fullCityBlock = afterCityStart.substring(0, cityBlockEnd);
  content = content.replace(fullCityBlock, updatedCityBlock);

  updatedCount++;
  console.log(`Updated: ${info.name}`);
});

console.log(`\nTotal updated: ${updatedCount} cities`);

// Write updated content
fs.writeFileSync(cityContentPath, content, 'utf-8');
console.log(`File saved!`);
