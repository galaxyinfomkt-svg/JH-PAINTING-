// Script to check ALL URLs for 404 errors
const https = require('https');
const http = require('http');

// All city slugs from cities.ts
const citySlugs = [
  'hudson', 'southborough', 'berlin', 'northborough', 'cordaville', 'stow',
  'westborough', 'framingham-center', 'bolton', 'sudbury', 'ashland', 'maynard',
  'framingham', 'hopkinton', 'clinton', 'boylston', 'shrewsbury', 'wayland',
  'cochituate', 'south-lancaster', 'lancaster', 'harvard', 'west-concord',
  'natick', 'acton', 'sherborn', 'holliston', 'grafton', 'west-boylston',
  'upton', 'weston', 'sterling', 'concord', 'millbury', 'littleton', 'wellesley',
  'dover', 'milford', 'carlisle', 'holden', 'lincoln', 'paxton', 'auburn',
  'medway', 'needham', 'rutland', 'boxborough', 'oakdale', 'leicester',
  'mendon', 'hopedale', 'medfield', 'bellingham', 'bedford', 'princeton',
  'oxford', 'lexington', 'norwood', 'newton', 'westwood', 'burlington',
  'dedham', 'brookline', 'ayer', 'canton', 'waltham', 'watertown', 'belmont',
  'arlington', 'groton', 'pepperell', 'shirley', 'townsend', 'lunenburg',
  'fitchburg', 'leominster', 'westminster', 'gardner', 'ashburnham', 'winchendon',
  'templeton', 'phillipston', 'petersham', 'athol', 'orange', 'warwick',
  'royalston', 'hubbardston', 'barre', 'hardwick', 'new-braintree', 'oakham',
  'spencer', 'east-brookfield', 'north-brookfield', 'west-brookfield', 'brookfield',
  'warren', 'sturbridge', 'southbridge', 'charlton', 'dudley', 'webster',
  'douglas', 'uxbridge', 'northbridge', 'sutton', 'millville', 'blackstone',
  'worcester', 'boston', 'cambridge', 'somerville', 'quincy', 'braintree', 'marlborough'
];

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

// Blog post slugs
const blogSlugs = [
  'best-exterior-paint-colors-massachusetts-homes-2025',
  'how-much-does-interior-painting-cost-massachusetts',
  'cabinet-painting-vs-replacement-which-is-better',
  'preparing-your-home-for-exterior-painting',
  'best-paint-brands-sherwin-williams-vs-benjamin-moore',
  'how-long-does-exterior-paint-last-massachusetts',
  'choosing-interior-paint-colors-that-sell-homes',
  'commercial-painting-tips-massachusetts-businesses',
  'diy-vs-professional-painting-when-to-hire-pro',
  'hardwood-floor-refinishing-guide-massachusetts',
  'best-time-of-year-to-paint-house-exterior-massachusetts',
  'deck-staining-sealing-services-massachusetts-guide',
  'historic-home-painting-massachusetts-new-england-architecture',
  'bathroom-paint-ideas-humidity-mold-resistant-massachusetts',
  'how-to-choose-painting-contractor-massachusetts-red-flags',
  'painting-brick-houses-massachusetts-pros-cons-costs',
  'nursery-kids-room-paint-colors-safe-massachusetts-families',
  'pressure-washing-before-painting-why-it-matters-massachusetts',
  'fence-staining-services-massachusetts-cedar-pine-composite',
  'office-painting-boosts-productivity-commercial-tips-massachusetts',
  'popcorn-ceiling-removal-painting-massachusetts-homes',
  'garage-floor-epoxy-coating-massachusetts-benefits-costs',
  'trim-baseboard-painting-tips-massachusetts-colonial-homes',
  'best-low-voc-eco-friendly-paints-massachusetts',
  'preparing-massachusetts-home-winter-fall-painting-tips',
  'wallpaper-removal-painting-services-massachusetts',
  'apartment-condo-painting-boston-greater-massachusetts',
  'aluminum-siding-painting-massachusetts-restore-vs-replace',
  'color-psychology-home-design-paint-affects-mood',
  'kitchen-painting-trends-massachusetts-2025-color-forecast'
];

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
      timeout: 10000
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
async function checkUrlsBatch(urls, batchSize = 10) {
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
  console.log('Generating all URLs...');
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

  console.log('\nStarting URL checks...');
  const { results, errors } = await checkUrlsBatch(urls, 20);

  console.log('\n\n========== RESULTS ==========');
  console.log(`Total checked: ${results.length}`);
  console.log(`Successful (2xx/3xx): ${results.filter(r => r.ok).length}`);
  console.log(`Errors (4xx/5xx/timeout): ${errors.length}`);

  if (errors.length > 0) {
    console.log('\n========== ERRORS ==========');

    // Group by type
    const errorsByType = {};
    errors.forEach(e => {
      errorsByType[e.type] = errorsByType[e.type] || [];
      errorsByType[e.type].push(e);
    });

    Object.entries(errorsByType).forEach(([type, errs]) => {
      console.log(`\n${type} (${errs.length} errors):`);
      errs.slice(0, 20).forEach(e => {
        console.log(`  ${e.status}: ${e.url}`);
      });
      if (errs.length > 20) {
        console.log(`  ... and ${errs.length - 20} more`);
      }
    });
  } else {
    console.log('\n✅ ALL PAGES WORKING! No 404 errors found.');
  }
}

main().catch(console.error);
