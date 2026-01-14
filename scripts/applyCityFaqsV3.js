// Script to apply V2 FAQs to cityContent.ts - V3 more robust
const fs = require('fs');
const path = require('path');

// Read generated FAQs
const faqsPath = path.join(__dirname, 'city-faqs-v2.json');
const cityFaqs = JSON.parse(fs.readFileSync(faqsPath, 'utf-8'));

// Read cityContent.ts
const cityContentPath = path.join(__dirname, '../app/data/cityContent.ts');
let content = fs.readFileSync(cityContentPath, 'utf-8');

// Cities that already have very comprehensive custom FAQs - don't overwrite
const citiesWithCompleteFaqs = [
  'marlborough', 'boston', 'worcester' // Only the most important with hand-crafted FAQs
];

// Function to escape string for TypeScript
function escapeString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');
}

// Function to format FAQ array as TypeScript
function formatFaqs(faqs) {
  const lines = faqs.map(faq => {
    const question = escapeString(faq.question);
    const answer = escapeString(faq.answer);
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

// Split the file by city entries
const lines = content.split('\n');
let result = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];

  // Check if this line starts a new city entry
  const cityMatch = line.match(/^\s*'([^']+)':\s*\{/);

  if (cityMatch) {
    const slug = cityMatch[1];

    // Check if we should skip this city
    if (citiesWithCompleteFaqs.includes(slug)) {
      // Just copy lines until we find the next city entry or end
      result.push(line);
      i++;
      let braceCount = 1;
      while (i < lines.length && braceCount > 0) {
        if (lines[i].includes('{')) braceCount += (lines[i].match(/\{/g) || []).length;
        if (lines[i].includes('}')) braceCount -= (lines[i].match(/\}/g) || []).length;
        result.push(lines[i]);
        i++;
      }
      skipped++;
      continue;
    }

    // Check if we have FAQs for this city
    if (cityFaqs[slug]) {
      // Find the faq section and replace it
      result.push(line);
      i++;

      let inFaq = false;
      let bracketCount = 0;

      while (i < lines.length) {
        const currentLine = lines[i];

        // Check if we've reached the end of this city entry
        if (currentLine.match(/^\s*'\w+(-\w+)*':\s*\{/) || currentLine.match(/^\s*\};\s*$/)) {
          break;
        }

        // Check for start of faq section
        if (currentLine.match(/^\s*faq:\s*\[/)) {
          // Found faq start, insert our new FAQs
          result.push(`    faq: ${formatFaqs(cityFaqs[slug])},`);
          inFaq = true;
          bracketCount = 1;
          i++;

          // Skip over the existing faq content
          while (i < lines.length && bracketCount > 0) {
            if (lines[i].includes('[')) bracketCount += (lines[i].match(/\[/g) || []).length;
            if (lines[i].includes(']')) bracketCount -= (lines[i].match(/\]/g) || []).length;
            i++;
          }
          updated++;
          console.log(`Updated FAQs for: ${slug}`);
          continue;
        }

        result.push(currentLine);
        i++;
      }
    } else {
      // No FAQs for this city, just copy
      result.push(line);
      i++;
    }
  } else {
    result.push(line);
    i++;
  }
}

// Save updated file
const newContent = result.join('\n');
fs.writeFileSync(cityContentPath, newContent);

console.log(`\n=== Summary ===`);
console.log(`Updated: ${updated} cities`);
console.log(`Skipped (already complete): ${skipped} cities`);
console.log(`Saved to: ${cityContentPath}`);
