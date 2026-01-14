// Script to check ALL URLs for 404 errors - using REAL city data
const https = require('https');
const fs = require('fs');
const path = require('path');

// Read cities from actual data file
const citiesFile = fs.readFileSync(path.join(__dirname, '../app/data/cities.ts'), 'utf-8');
const cityMatches = citiesFile.match(/slug: '([^']+)'/g);
const citySlugs = cityMatches
  .map(m => m.replace("slug: '", "").replace("'", ""))
  .filter(slug => !['all', 'painting-tips', 'color-guide', 'home-improvement', 'industry-news', 'project-showcase'].includes(slug));

console.log(`Found ${citySlugs.length} cities in cities.ts`);

// All service slugs
const serviceSlugs = [
  'interior-painting',
  'exterior-painting',
  'commercial-painting',
  'residential-painting',
  'cabinet-painting'
];

// Service URL mappings
const serviceUrlMap = {
  'interior-painting': 'interior-house-painters',
  'exterior-painting': 'exterior-house-painters',
  'commercial-painting': 'commercial-painters',
  'residential-painting': 'residential-painters',
  'cabinet-painting': 'cabinet-painters',
};

// Read blog posts
const blogFile = fs.readFileSync(path.join(__dirname, '../app/data/blogPosts.ts'), 'utf-8');
const blogMatches = blogFile.match(/slug: '([^']+)'/g);
const blogSlugs = blogMatches
  .map(m => m.replace("slug: '", "").replace("'", ""))
  .filter(slug => !['all', 'painting-tips', 'color-guide', 'home-improvement', 'industry-news', 'project-showcase'].includes(slug));

console.log(`Found ${blogSlugs.length} blog posts`);

// Generate all URLs
function generateAllUrls() {
  const urls = [];

  // Static pages
  urls.push({ url: '/', type: 'static' });
  urls.push({ url: '/contact', type: 'static' });
  urls.push({ url: '/blog', type: 'static' });
  urls.push({ url: '/services', type: 'static' });
  urls.push({ url: '/thank-you', type: 'static' });
  urls.push({ url: '/services/interior-painting', type: 'static' });
  urls.push({ url: '/services/exterior-painting', type: 'static' });
  urls.push({ url: '/services/commercial-painting', type: 'static' });
  urls.push({ url: '/services/residential-painting', type: 'static' });
  urls.push({ url: '/services/cabinet-painting', type: 'static' });

  // Blog posts
  blogSlugs.forEach(slug => {
    urls.push({ url: `/blog/${slug}`, type: 'blog' });
  });

  // SEO city pages: /marlborough-ma-painters
  citySlugs.forEach(city => {
    urls.push({ url: `/${city}-ma-painters`, type: 'seo-city' });
  });

  // SEO city+service pages: /marlborough-ma-interior-house-painters
  citySlugs.forEach(city => {
    serviceSlugs.forEach(service => {
      const serviceUrl = serviceUrlMap[service];
      urls.push({ url: `/${city}-ma-${serviceUrl}`, type: 'seo-city-service' });
    });
  });

  // Legacy city pages: /cities/marlborough
  citySlugs.forEach(city => {
    urls.push({ url: `/cities/${city}`, type: 'legacy-city' });
  });

  // Legacy city+service pages: /cities/marlborough/interior-painting
  citySlugs.forEach(city => {
    serviceSlugs.forEach(service => {
      urls.push({ url: `/cities/${city}/${service}`, type: 'legacy-city-service' });
    });
  });

  return urls;
}

// Check single URL
function checkUrl(urlPath) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'jhpaintingservices.com',
      port: 443,
      path: urlPath,
      method: 'HEAD',
      timeout: 15000
    };

    const req = https.request(options, (res) => {
      resolve({
        url: urlPath,
        status: res.statusCode,
        ok: res.statusCode >= 200 && res.statusCode < 400
      });
    });

    req.on('error', (e) => {
      resolve({
        url: urlPath,
        status: 'ERROR',
        ok: false,
        error: e.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url: urlPath,
        status: 'TIMEOUT',
        ok: false
      });
    });

    req.end();
  });
}

// Check URLs in batches
async function checkUrlsBatch(urls, batchSize = 15) {
  const results = [];
  const errors = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(u => checkUrl(u.url)));

    batchResults.forEach((result, idx) => {
      const urlInfo = batch[idx];
      if (!result.ok) {
        errors.push({ ...result, type: urlInfo.type });
      }
      results.push({ ...result, type: urlInfo.type });
    });

    // Progress
    const progress = Math.min(i + batchSize, urls.length);
    process.stdout.write(`\rChecked ${progress}/${urls.length} URLs... (${errors.length} errors found)`);
  }

  return { results, errors };
}

// Main
async function main() {
  console.log('\nGenerating all URLs...');
  const urls = generateAllUrls();
  console.log(`Total URLs to check: ${urls.length}`);

  console.log('\nBreakdown:');
  const types = {};
  urls.forEach(u => {
    types[u.type] = (types[u.type] || 0) + 1;
  });
  Object.entries(types).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });

  console.log('\nStarting URL checks (this may take a few minutes)...');
  const { results, errors } = await checkUrlsBatch(urls, 15);

  console.log('\n\n========================================');
  console.log('            RESULTS SUMMARY');
  console.log('========================================');
  console.log(`Total URLs checked: ${results.length}`);
  console.log(`✅ Successful (2xx/3xx): ${results.filter(r => r.ok).length}`);
  console.log(`❌ Errors (4xx/5xx/timeout): ${errors.length}`);

  if (errors.length > 0) {
    console.log('\n========================================');
    console.log('            ERROR DETAILS');
    console.log('========================================');

    // Group by type
    const errorsByType = {};
    errors.forEach(e => {
      errorsByType[e.type] = errorsByType[e.type] || [];
      errorsByType[e.type].push(e);
    });

    Object.entries(errorsByType).forEach(([type, errs]) => {
      console.log(`\n📁 ${type} (${errs.length} errors):`);
      errs.forEach(e => {
        console.log(`   ${e.status}: https://jhpaintingservices.com${e.url}`);
      });
    });

    // Save to file
    const errorFile = path.join(__dirname, 'url-errors.json');
    fs.writeFileSync(errorFile, JSON.stringify(errors, null, 2));
    console.log(`\n📄 Full error list saved to: ${errorFile}`);
  } else {
    console.log('\n🎉 ALL PAGES WORKING! No 404 errors found.');
  }
}

main().catch(console.error);
