// Script to apply generated FAQs to cityContent.ts
const fs = require('fs');
const path = require('path');

// Read generated FAQs
const faqsPath = path.join(__dirname, 'city-faqs-generated.json');
const cityFaqs = JSON.parse(fs.readFileSync(faqsPath, 'utf-8'));

// Read cityContent.ts
const cityContentPath = path.join(__dirname, '../app/data/cityContent.ts');
let content = fs.readFileSync(cityContentPath, 'utf-8');

// Cities that already have comprehensive FAQs (8 FAQs) - don't overwrite these
const citiesWithCompleteFaqs = [
  'marlborough', 'hudson', 'southborough', 'berlin', 'northborough',
  'westborough', 'stow', 'framingham', 'sudbury', 'natick', 'newton', 'boston'
];

// Function to format FAQ array as TypeScript
function formatFaqs(faqs) {
  const lines = faqs.map(faq => {
    const question = faq.question.replace(/'/g, "\\'");
    const answer = faq.answer.replace(/'/g, "\\'");
    return `      {
        question: '${question}',
        answer: '${answer}'
      }`;
  });
  return `[\n${lines.join(',\n')}\n    ]`;
}

// Track updates
let updated = 0;
let skipped = 0;

// For each city, find and replace its FAQ section
Object.keys(cityFaqs).forEach(slug => {
  // Skip cities that already have complete FAQs
  if (citiesWithCompleteFaqs.includes(slug)) {
    skipped++;
    return;
  }

  const faqs = cityFaqs[slug];
  const faqFormatted = formatFaqs(faqs);

  // Find the faq section for this city using a regex
  // Pattern: 'slug': { ... faq: [ ... ], ... }
  const pattern = new RegExp(
    `('${slug}':\\s*\\{[^}]*?faq:\\s*)(\\[[^\\]]*?\\])`,
    's'
  );

  if (pattern.test(content)) {
    content = content.replace(pattern, `$1${faqFormatted}`);
    updated++;
    console.log(`Updated FAQs for: ${slug}`);
  } else {
    console.log(`Could not find FAQ section for: ${slug}`);
  }
});

// Save updated file
fs.writeFileSync(cityContentPath, content);
console.log(`\n=== Summary ===`);
console.log(`Updated: ${updated} cities`);
console.log(`Skipped (already complete): ${skipped} cities`);
console.log(`Saved to: ${cityContentPath}`);
