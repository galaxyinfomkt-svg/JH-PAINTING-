'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { regions, getRegionBySlug } from '@/app/data/regions'
import { getCityBySlug, getCitySlugWithState } from '@/app/data/cities'
import Footer from '@/app/components/Footer'

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
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Professional exterior house painting in Massachusetts' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Interior painting project by JH Painting' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Bedroom interior painting services' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Kitchen cabinet refinishing and painting' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2e93b34b6403a606b8fc.jpg', alt: 'Historic church exterior restoration' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696a2ac77b4d1e274d3ac051.webp', alt: 'Deck staining and restoration' },
]

export default function RegionPage() {
  const params = useParams()
  const regionSlug = params.region as string
  const region = getRegionBySlug(regionSlug)

  if (!region) {
    return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}><h1>Region Not Found</h1></div>
  }

  const regionCities = region.citySlugs
    .map(slug => getCityBySlug(slug))
    .filter(Boolean)

  return (
    <>
      <main>
        {/* Hero with Background Image */}
        <section style={{ position: 'relative', color: '#fff', padding: '6rem 0 4rem', textAlign: 'center', overflow: 'hidden', minHeight: '420px' }}>
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg"
            alt={`Professional painting services in ${region.name}`}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            quality={75}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,26,46,0.92) 0%, rgba(22,33,62,0.88) 50%, rgba(15,52,96,0.85) 100%)' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ color: '#c9a84c', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              Serving {regionCities.length}+ Communities
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>
              {region.heroHeadline}
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.85)', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              {region.heroSubtext}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+15086908886" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#c9a84c', color: '#1a1a2e', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.125rem' }}>
                (508) 690-8886
              </a>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '2px solid #c9a84c', color: '#c9a84c', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: 600 }}>
                Get FREE Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Region-Specific Pain Points & Solutions */}
        <section style={{ padding: '4rem 0', background: '#fff' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a2e' }}>
              Common Painting Problems in {region.name}
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem', maxWidth: '650px', margin: '0 auto 3rem' }}>
              Every region has unique challenges. Here&apos;s what {region.name} homeowners face — and how we solve it.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {region.painPoints.map((point, idx) => (
                <div key={idx} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '2rem', border: '1px solid #eee' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#c9a84c', color: '#1a1a2e', borderRadius: '50%', fontSize: '0.875rem', fontWeight: 800, flexShrink: 0 }}>
                      {idx + 1}
                    </span>
                    {point.title}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#c0392b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                        The Problem
                      </p>
                      <p style={{ color: '#444', fontSize: '0.9375rem', lineHeight: 1.7 }}>
                        {point.problem}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#27ae60', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                        Our Solution
                      </p>
                      <p style={{ color: '#444', fontSize: '0.9375rem', lineHeight: 1.7 }}>
                        {point.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section style={{ padding: '4rem 0', background: '#f8f9fa' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a2e' }}>
              Our Work Across {region.name}
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2.5rem' }}>
              Real projects completed by our team in Massachusetts
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {portfolioPhotos.map((photo, idx) => (
                <div key={idx} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#c9a84c', fontWeight: 600, fontSize: '1rem' }}>
                View All Projects &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us for This Region */}
        <section style={{ position: 'relative', padding: '4rem 0', color: '#fff', overflow: 'hidden' }}>
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg"
            alt={`Painting professionals serving ${region.name}`}
            fill
            style={{ objectFit: 'cover' }}
            loading="lazy"
            quality={60}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,46,0.92)' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>
              Why {region.name} Homeowners Choose JH Painting
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto' }}>
              {region.whyUs.map((reason, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.08)', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.2)', backdropFilter: 'blur(4px)' }}>
                  <span style={{ color: '#c9a84c', fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }}>&#10003;</span>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Expertise with Owner Photo */}
        <section style={{ padding: '4rem 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 700, marginBottom: '2.5rem', color: '#1a1a2e' }}>
              Our Local Expertise in {region.name}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ position: 'relative', width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '4px solid #c9a84c', boxShadow: '0 4px 20px rgba(201,168,76,0.3)' }}>
                  <Image
                    src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                    alt="Jafet Hernandez - Owner of JH Painting Services"
                    fill
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: '#444', textAlign: 'center' }}>
                    {region.localExpertise}
                  </p>
                  <p style={{ textAlign: 'center', marginTop: '1.25rem', fontWeight: 700, color: '#1a1a2e', fontSize: '1rem' }}>
                    — Jafet Hernandez, Owner
                  </p>
                  <p style={{ textAlign: 'center', color: '#c9a84c', fontSize: '0.875rem', fontWeight: 600 }}>
                    Licensed &amp; $2M Insured | 40+ Five-Star Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid with Images */}
        <section style={{ padding: '4rem 0', background: '#f8f9fa' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Our Services in {region.name}
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2.5rem' }}>
              7 professional services available across all {region.name} communities
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {services.map((svc) => (
                <Link key={svc.slug} href={`/regions/${region.slug}/${svc.slug}`} style={{ display: 'block', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s, transform 0.2s' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                    <Image
                      src={svc.image}
                      alt={`${svc.name} services in ${region.name}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a2e' }}>
                      {svc.name} in {region.name}
                    </h3>
                    <p style={{ color: '#555', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{svc.desc}</p>
                    <span style={{ color: '#c9a84c', fontWeight: 600, fontSize: '0.875rem' }}>
                      View {region.name} cities &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cities in this Region */}
        <section style={{ padding: '4rem 0', background: '#fff' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Cities We Serve in {region.name}
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2.5rem' }}>
              Click any city to see available painting services
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {regionCities.map((city) => {
                if (!city) return null
                return (
                  <Link
                    key={city.slug}
                    href={`/cities/${getCitySlugWithState(city.slug)}`}
                    style={{ display: 'block', background: '#f8f9fa', borderRadius: '10px', padding: '1.25rem', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', border: '1px solid #eee', transition: 'box-shadow 0.2s' }}
                  >
                    <span style={{ fontWeight: 600, color: '#1a1a2e', fontSize: '1rem' }}>{city.name}</span>
                    {city.population && (
                      <span style={{ display: 'block', fontSize: '0.8125rem', color: '#888', marginTop: '0.25rem' }}>Pop. {city.population}</span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Other Regions */}
        <section style={{ padding: '3rem 0', background: '#f8f9fa' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Other Service Regions
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
              {regions.filter(r => r.slug !== region.slug).map((r) => (
                <Link
                  key={r.slug}
                  href={`/regions/${r.slug}`}
                  style={{ background: '#1a1a2e', color: '#fff', padding: '0.625rem 1.25rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 500 }}
                >
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA with Background Image */}
        <section style={{ position: 'relative', padding: '4rem 0', textAlign: 'center', overflow: 'hidden' }}>
          <Image
            src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg"
            alt="Professional painting results"
            fill
            style={{ objectFit: 'cover' }}
            loading="lazy"
            quality={60}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(201,168,76,0.95) 0%, rgba(184,148,63,0.92) 100%)' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ color: '#1a1a2e', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Ready for a FREE Quote in {region.name}?
            </h2>
            <p style={{ color: 'rgba(26,26,46,0.8)', marginBottom: '1.5rem' }}>
              Licensed & $2M insured. 40+ five-star reviews. No obligation.
            </p>
            <a href="tel:+15086908886" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1a1a2e', color: '#c9a84c', padding: '1rem 2.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1.25rem' }}>
              (508) 690-8886
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
