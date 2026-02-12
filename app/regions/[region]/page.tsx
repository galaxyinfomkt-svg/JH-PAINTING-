import Image from 'next/image'
import Link from 'next/link'
import { regions, getRegionBySlug } from '@/app/data/regions'
import { getCityBySlug, getCitySlugWithState } from '@/app/data/cities'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import LazyHeroForm from '@/app/components/LazyHeroForm'

const services = [
  { name: 'Interior Painting', slug: 'interior-painting', desc: 'Walls, ceilings, trim, doors & accent walls with premium Benjamin Moore & Sherwin-Williams paints.', image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png' },
  { name: 'Exterior Painting', slug: 'exterior-painting', desc: 'Complete exterior protection — siding, trim, shutters, doors & decks with weather-resistant paints.', image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg' },
  { name: 'Cabinet Painting', slug: 'cabinet-painting', desc: 'Transform dated cabinets for 70% less than replacement. Factory-smooth spray finish in 5-7 days.', image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png' },
  { name: 'Commercial Painting', slug: 'commercial-painting', desc: 'Offices, retail, restaurants & medical facilities. After-hours & weekend scheduling available.', image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2baaeee4bdc42aec7ca80.jpeg' },
  { name: 'Residential Painting', slug: 'residential-painting', desc: 'Complete home painting — single rooms to whole-house transformations with expert color consultation.', image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg' },
  { name: 'Carpentry', slug: 'carpentry', desc: 'Wood rot repair, window & door frames, trim, siding & deck restoration by licensed pros.', image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac78441b12824edadfa.webp' },
  { name: 'Power Washing', slug: 'power-washing', desc: 'Driveways, siding, decks, patios & fences sparkling clean in one day.', image: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp' },
]

const portfolioPhotos = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Professional exterior house painting', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Interior painting project', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Bedroom interior painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Kitchen cabinet refinishing', category: 'Cabinets' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Historic Renewal: Waltham Church exterior transformation by JH Painting', category: 'Waltham Church' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp', alt: 'Deck staining and restoration', category: 'Deck' },
]

// Inline SVG icons
const PhoneIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)
const MapPinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)
const StarIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
)
const ShieldIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
)
const CheckIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
)
const ChevronRightIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
)
const MailIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)

interface Props {
  params: Promise<{ region: string }>
}

export default async function RegionPage({ params }: Props) {
  const { region: regionSlug } = await params
  const region = getRegionBySlug(regionSlug)

  if (!region) {
    return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}><h1>Region Not Found</h1></div>
  }

  const regionCities = region.citySlugs
    .map(slug => getCityBySlug(slug))
    .filter(Boolean)

  return (
    <>
      <Header cityName={region.name} />

      <main>
        {/* Hero */}
        <section className="city-page-hero">
          <div className="city-page-hero-bg">
            <Image
              src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
              alt={`Professional painting services in ${region.name}`}
              fill
              priority
              sizes="100vw"
              quality={75}
              style={{ objectFit: 'cover' }}
            />
            <div className="city-page-hero-overlay" />
          </div>

          <div className="container city-page-hero-content">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', borderRadius: '100px', color: '#fff', fontSize: '0.875rem', fontWeight: 500, border: '1px solid rgba(255,255,255,0.2)' }}>
                    <MapPinIcon size={14} />
                    {regionCities.length}+ Communities
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #DC2626 0%, #A80303 100%)', borderRadius: '100px', color: '#fff', fontSize: '0.875rem', fontWeight: 600 }}>
                    <StarIcon size={12} /><StarIcon size={12} /><StarIcon size={12} /><StarIcon size={12} /><StarIcon size={12} />
                    5.0
                  </span>
                </div>

                <h1 style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)', fontWeight: 800, color: '#fff', lineHeight: 1.08, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                  {region.heroHeadline}
                </h1>

                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '640px' }}>
                  {region.heroSubtext}
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                  <a href="tel:+15086908886" className="city-cta-btn">
                    <PhoneIcon size={20} />
                    (508) 690-8886
                  </a>
                  <a href="#quote-form" className="city-cta-btn-outline">
                    Get FREE Quote
                    <ChevronRightIcon size={18} />
                  </a>
                </div>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  {[
                    { icon: ShieldIcon, text: 'Licensed & $2M Insured' },
                    { icon: CheckIcon, text: '40+ 5-Star Reviews' },
                    { icon: MapPinIcon, text: `Serving All ${region.name}` },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.9)' }}>
                      <span style={{ color: '#DC2626' }}><item.icon size={16} /></span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Form */}
              <div id="quote-form" className="hero-form-card">
                <LazyHeroForm
                  className="hero-form-iframe"
                  src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                  title="Contact Form"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{ background: '#0F172A', padding: '1.5rem 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
              {[
                { value: `${regionCities.length}+`, label: 'Cities Served' },
                { value: '200+', label: 'Projects Completed' },
                { value: '5.0', label: 'Google Rating' },
                { value: '7', label: 'Services Available' },
              ].map((stat, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#DC2626' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="city-section city-section-white">
          <div className="container">
            <div className="city-section-header">
              <span className="city-badge city-badge-red">{region.name} Challenges</span>
              <h2 className="city-section-title">Common Painting Problems in {region.name}</h2>
              <p className="city-section-subtitle">Every region has unique challenges. Here&apos;s what {region.name} homeowners face — and how we solve it.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
              {region.painPoints.map((point, idx) => (
                <div key={idx} style={{ background: '#fff', borderRadius: '20px', padding: '2rem 2.5rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', background: 'linear-gradient(135deg, #DC2626, #B91C1C)', color: '#fff', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 800, flexShrink: 0 }}>{idx + 1}</span>
                    {point.title}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>The Problem</p>
                      <p style={{ color: '#64748B', fontSize: '0.9375rem', lineHeight: 1.75 }}>{point.problem}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Our Solution</p>
                      <p style={{ color: '#64748B', fontSize: '0.9375rem', lineHeight: 1.75 }}>{point.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section className="city-section city-section-dark">
          <div className="container">
            <div className="city-section-header">
              <span className="city-badge city-badge-dark">Our Portfolio</span>
              <h2 className="city-section-title">Our Work Across {region.name}</h2>
              <p className="city-section-subtitle">Real projects completed by our team in Massachusetts</p>
            </div>

            <div className="city-gallery-grid">
              {portfolioPhotos.map((photo, idx) => (
                <div key={idx} className="city-gallery-item">
                  <Image src={photo.src} alt={`${photo.alt} - ${region.name}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 50vw, 33vw" loading="lazy" />
                  <div className="city-gallery-overlay">
                    <div>
                      <span className="city-gallery-category">{photo.category}</span>
                      <p className="city-gallery-text">{photo.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/projects" className="city-cta-btn">View All Projects <ChevronRightIcon size={18} /></Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="city-section city-section-gray">
          <div className="container">
            <div className="city-section-header">
              <span className="city-badge city-badge-green">The JH Painting Difference</span>
              <h2 className="city-section-title">Why {region.name} Homeowners Choose Us</h2>
            </div>

            <div className="city-why-grid">
              {region.whyUs.map((reason, idx) => (
                <div key={idx} className="city-why-card">
                  <div className="city-why-icon" style={{ color: '#fff' }}><CheckIcon size={28} /></div>
                  <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.75 }}>{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Expertise + Owner */}
        <section className="city-section city-section-white">
          <div className="container">
            <div className="city-about-grid">
              <div className="city-about-image-wrapper">
                <div className="city-about-image">
                  <Image
                    src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                    alt={`Jafet Hernandez - Owner of JH Painting Services serving ${region.name}`}
                    width={600} height={500} loading="lazy"
                    style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                  />
                </div>
                <div className="city-about-badge">
                  <div className="city-about-badge-number">40+</div>
                  <div className="city-about-badge-label">5-Star Google Reviews</div>
                </div>
              </div>
              <div className="city-about-content">
                <span className="city-badge city-badge-red">Local Expertise</span>
                <h2>Your Trusted {region.name} Painting Contractor</h2>
                <p>{region.localExpertise}</p>
                <div className="city-about-features">
                  {[
                    { icon: ShieldIcon, title: 'Licensed & $2M Insured' },
                    { icon: StarIcon, title: '40+ 5-Star Reviews' },
                    { icon: MapPinIcon, title: `Local ${region.name} Team` },
                    { icon: CheckIcon, title: '100% Satisfaction' },
                  ].map((item, idx) => (
                    <div key={idx} className="city-about-feature">
                      <div className="city-about-feature-icon" style={{ color: '#DC2626' }}><item.icon size={24} /></div>
                      <span className="city-about-feature-text">{item.title}</span>
                    </div>
                  ))}
                </div>
                <a href="tel:+15086908886" className="city-cta-btn"><PhoneIcon size={20} /> Call (508) 690-8886</a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="city-section city-section-gray">
          <div className="container">
            <div className="city-section-header">
              <span className="city-badge city-badge-blue">Our Services</span>
              <h2 className="city-section-title">Professional Services in {region.name}</h2>
              <p className="city-section-subtitle">7 professional services available across all {region.name} communities</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: '1.5rem', maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
              {services.map((svc) => (
                <Link key={svc.slug} href={`/regions/${region.slug}/${svc.slug}`} style={{ display: 'block', background: '#fff', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', transition: 'all 0.4s ease', textDecoration: 'none' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                    <Image src={svc.image} alt={`${svc.name} services in ${region.name}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0F172A' }}>{svc.name} in {region.name}</h3>
                    <p style={{ color: '#64748B', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '1rem' }}>{svc.desc}</p>
                    <span style={{ color: '#DC2626', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>Learn More <ChevronRightIcon size={16} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="city-section city-section-white">
          <div className="container">
            <div className="city-section-header">
              <span className="city-badge city-badge-red">Service Areas</span>
              <h2 className="city-section-title">Cities We Serve in {region.name}</h2>
              <p className="city-section-subtitle">Click any city to see available painting services and get a free estimate</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
              {regionCities.map((city) => {
                if (!city) return null
                return (
                  <Link key={city.slug} href={`/cities/${getCitySlugWithState(city.slug)}`} style={{ display: 'block', background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.04)', textDecoration: 'none' }}>
                    <span style={{ fontWeight: 600, color: '#0F172A', fontSize: '1rem' }}>{city.name}</span>
                    {city.population && <span style={{ display: 'block', fontSize: '0.8125rem', color: '#94A3B8', marginTop: '0.25rem' }}>Pop. {city.population}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Other Regions */}
        <section className="city-section city-section-gray" style={{ padding: '4rem 0' }}>
          <div className="container">
            <div className="city-section-header" style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A' }}>Other Service Regions</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', padding: '0 1.5rem' }}>
              {regions.filter(r => r.slug !== region.slug).map((r) => (
                <Link key={r.slug} href={`/regions/${r.slug}`} style={{ background: '#0F172A', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none' }}>{r.name}</Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="city-cta-section">
          <div className="city-cta-pattern" />
          <div className="container">
            <div className="city-cta-content">
              <h2 className="city-cta-title">Ready for a FREE Quote in {region.name}?</h2>
              <p className="city-cta-subtitle">Licensed & $2M insured. 40+ five-star reviews. No obligation.</p>
              <div className="city-cta-buttons">
                <a href="tel:+15086908886" className="city-cta-btn-white"><PhoneIcon size={24} /> (508) 690-8886</a>
                <Link href="/contact" className="city-cta-btn-glass"><MailIcon size={24} /> Get Free Estimate</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
