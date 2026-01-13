// Script to generate expanded SEO content for all cities
// This creates professional, unique content for each city page

interface CityData {
  name: string;
  slug: string;
  region: 'metrowest' | 'boston' | 'worcester' | 'coastal' | 'suburban' | 'rural';
  characteristics: string[];
  landmarks?: string[];
  neighborhoods?: string[];
}

// Generate 8 unique FAQs for any city
export function generateExpandedFAQs(cityName: string, slug: string): { question: string; answer: string }[] {
  return [
    {
      question: `How much does house painting cost in ${cityName}?`,
      answer: `House painting costs in ${cityName} vary based on project scope, home size, and condition. For interior painting, expect $2-4 per square foot. Exterior painting typically ranges from $3,000-$8,000 for average homes. We provide free, detailed estimates for all ${cityName} properties – contact us for an accurate quote tailored to your specific project. Our transparent pricing includes all materials, labor, and preparation work with no hidden fees.`
    },
    {
      question: `Are you licensed and insured to paint in ${cityName}?`,
      answer: `Yes, JH Painting Services is fully licensed and insured to work throughout Massachusetts, including ${cityName}. We carry $2 million in general liability insurance and full workers' compensation coverage. We're also EPA Lead-Safe Certified, which is essential for older ${cityName} homes built before 1978. We're happy to provide certificates of insurance upon request.`
    },
    {
      question: `How long does a typical painting project take in ${cityName}?`,
      answer: `Project timelines in ${cityName} depend on scope and complexity. A single room interior typically takes 1-2 days. Full interior painting for an average home takes 3-5 days. Exterior painting usually requires 4-7 days depending on home size and weather conditions. We provide detailed timelines during our estimate process and keep you informed throughout your project.`
    },
    {
      question: `What paint brands do you use for ${cityName} homes?`,
      answer: `We exclusively use premium paints from Benjamin Moore and Sherwin-Williams – brands proven to withstand Massachusetts' challenging climate. For ${cityName} exteriors, we typically recommend Benjamin Moore Aura or Sherwin-Williams Duration for superior durability. For interiors, we offer low-VOC and zero-VOC options safe for families. All our paints are specifically chosen to perform well in New England weather conditions.`
    },
    {
      question: `Do you offer free estimates in ${cityName}?`,
      answer: `Absolutely! We provide free, no-obligation estimates for all ${cityName} projects. Our estimator will visit your property, assess the scope of work, discuss your goals and preferences, and provide a comprehensive written proposal. Our estimates include detailed specifications, timeline, and transparent pricing. Being based in nearby Marlborough, we can typically schedule your estimate within 24-48 hours.`
    },
    {
      question: `What preparation work do you do before painting in ${cityName}?`,
      answer: `Proper preparation is 80% of a quality paint job. For ${cityName} homes, our prep process includes power washing (exteriors), scraping loose paint, sanding surfaces smooth, filling cracks and holes, caulking gaps and seams, priming bare wood and problem areas, and protecting surrounding surfaces. This thorough preparation ensures your paint job looks beautiful and lasts for years.`
    },
    {
      question: `Can you paint in cold weather or during ${cityName}'s winter months?`,
      answer: `Exterior painting requires temperatures above 50°F, which limits our exterior season in ${cityName} to roughly April through November. However, interior painting can be done year-round! Winter is actually ideal for interior projects – we have more scheduling flexibility and lower humidity means faster drying times. Contact us to discuss the best timing for your specific project.`
    },
    {
      question: `What is your warranty on painting work in ${cityName}?`,
      answer: `We stand behind all our work with comprehensive warranties. For ${cityName} projects, we offer a 5-year warranty on exterior painting and a 3-year warranty on interior painting. Our warranty covers peeling, blistering, flaking, and fading under normal conditions. Because we're locally based, warranty service is convenient – just call and we'll promptly address any concerns.`
    }
  ];
}

// Generate intro text for a city
export function generateIntroText(cityName: string, characteristics: string): string {
  return `When ${cityName} homeowners need professional painting services they can trust, JH Painting Services delivers exceptional results with the quality and reliability that local families deserve. Based in nearby Marlborough, we've built our reputation throughout the MetroWest region by providing meticulous craftsmanship, transparent pricing, and personalized service that larger companies simply can't match. ${characteristics} Whether you're updating your interior with fresh, modern colors, protecting your exterior from New England's harsh weather, or transforming your kitchen with cabinet refinishing, our experienced team brings the expertise and attention to detail that ${cityName} homes deserve. We're not just painters – we're your neighbors, committed to maintaining the beauty and value of properties throughout our community.`;
}

// Generate service description for a city
export function generateServiceDescription(cityName: string): string {
  return `JH Painting Services offers comprehensive painting and finishing solutions for ${cityName} homes and businesses. Our interior painting services include walls, ceilings, trim, doors, and specialty finishes – transforming every room with premium low-VOC paints safe for your family. For exteriors, we provide complete house painting with proper surface preparation, premium weather-resistant paints, and attention to detail that protects your investment against Massachusetts' challenging climate. Our cabinet refinishing service saves ${cityName} homeowners 60-70% compared to full replacement while delivering a factory-smooth, spray-applied finish. We also offer deck staining, commercial painting, and specialty services including wallpaper removal and drywall repair. Every project includes a detailed written estimate, clear timeline, and our commitment to your complete satisfaction.`;
}

// Generate closing pitch for a city
export function generateClosingPitch(cityName: string): string {
  return `Ready to transform your ${cityName} home with professional painting that exceeds expectations? JH Painting Services combines premium materials, expert craftsmanship, and genuine care for every project we undertake. Our ${cityName} neighbors trust us because we deliver on our promises – showing up on time, communicating clearly, protecting your property, and achieving beautiful, lasting results. Whether you need a single room refreshed or your entire home transformed, we'd be honored to earn your trust. Contact us today at (508) 690-8886 for your free estimate, or fill out our online form. As your local painting professionals, we'll respond quickly and treat your home like it's our own.`;
}

console.log('Content generation functions ready for use');
