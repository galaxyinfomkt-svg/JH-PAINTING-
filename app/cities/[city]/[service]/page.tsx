'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, Mail, MapPin, CheckCircle2, Star, Clock, Shield, Award, Play, ChevronRight, Users, Heart, Sparkles } from 'lucide-react'
import { cities, getCityBySlug } from '@/app/data/cities'

interface Props {
  params: {
    city: string
    service: string
  }
}

const services = {
  'interior-painting': {
    name: 'Interior Painting',
    title: 'Professional Interior Painting',
    description: 'Transform your interior spaces with expert painting services',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png',
  },
  'exterior-painting': {
    name: 'Exterior Painting',
    title: 'Expert Exterior Painting',
    description: 'Protect and beautify your property exterior',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
  },
  'commercial-painting': {
    name: 'Commercial Painting',
    title: 'Commercial Painting Services',
    description: 'Professional painting for businesses',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg',
  },
  'residential-painting': {
    name: 'Residential Painting',
    title: 'Residential Painting Services',
    description: 'Complete home painting solutions',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg',
  },
  'cabinet-painting': {
    name: 'Cabinet Painting',
    title: 'Cabinet Painting & Refinishing',
    description: 'Transform your cabinets for a fraction of replacement cost',
    heroImage: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png',
  },
}

const galleryImages = [
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b9fd1a287291990c89.jpeg', alt: 'Exterior painting project', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68d2b4b8037a134d179ae6bc.jpeg', alt: 'House painters Massachusetts', category: 'Exterior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68064ed8773e16490df7d065.png', alt: 'Interior painting', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c45112fded710fe1706ba0.jpeg', alt: 'Interior painting bedroom', category: 'Interior' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67d854f91b97ac367f033dc3.png', alt: 'Cabinet refinishing', category: 'Cabinets' },
  { src: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/68c451129bf2893e381f0b2f.jpeg', alt: 'Floor refinishing', category: 'Floors' },
]

const videos = [
  { id: 'F_lreXzNlUI', title: 'Historic Church Transformation' },
  { id: 'LkT_HLyKibY', title: 'Interior Painting Process' },
]

const footerCities = [
  'Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Brockton',
  'New Bedford', 'Quincy', 'Lynn', 'Fall River', 'Newton', 'Somerville',
  'Framingham', 'Waltham', 'Brookline', 'Medford', 'Malden', 'Revere'
]

export default function CityServicePage({ params }: Props) {
  const city = getCityBySlug(params.city)
  const service = services[params.service as keyof typeof services]

  if (!city || !service) {
    notFound()
  }

  return (
    <>
      {/* Luxury Hero Section */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={service.heroImage}
            alt={`${service.name} in ${city.name}`}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.85) 50%, rgba(15, 23, 42, 0.75) 100%)'
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '120px', paddingBottom: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Hero Text */}
            <div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <MapPin size={16} />
                  {city.name}, Massachusetts
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  5.0
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '800',
                color: '#fff',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}>
                Premium <span style={{ color: '#F59E0B' }}>{service.name}</span> in {city.name}
              </h1>

              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.7',
                marginBottom: '2rem',
                maxWidth: '600px'
              }}>
                Transform your property with Massachusetts' most trusted painting professionals.
                Licensed, insured, and dedicated to delivering flawless results in {city.name}.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <a href="tel:+15086908886" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 10px 40px rgba(220, 38, 38, 0.4)',
                  transition: 'all 0.3s ease'
                }}>
                  <Phone size={20} />
                  (508) 690-8886
                </a>
                <a href="#quote-form" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease'
                }}>
                  Get Free Estimate
                  <ChevronRight size={20} />
                </a>
              </div>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Clock, text: 'Same Day Response' },
                  { icon: Award, text: '200+ 5-Star Reviews' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                    <item.icon size={18} color="#F59E0B" />
                    <span style={{ fontSize: '0.9375rem', fontWeight: '500' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form Card */}
            <div id="quote-form" style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
                  borderRadius: '100px',
                  color: '#166534',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  <Sparkles size={16} />
                  Free Estimate
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem' }}>
                  Get Your Free Quote
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9375rem' }}>
                  We'll respond within 24 hours
                </p>
              </div>

              <iframe
                src="https://api.leadconnectorhq.com/widget/form/JRiO8zZFsJyeWQDs0WtO"
                style={{ width: '100%', height: '450px', border: 'none', borderRadius: '12px' }}
                title="Contact Form"
                loading="lazy"
              />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginTop: '1rem',
                padding: '0.75rem',
                background: '#F8FAFC',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <span style={{ color: '#64748B', fontSize: '0.875rem' }}>5.0 on Google Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Bar */}
      <section style={{ background: '#0F172A', padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { value: '200+', label: 'Projects Completed' },
              { value: '5.0', label: 'Google Rating' },
              { value: '114+', label: 'Cities Served' },
              { value: '100%', label: 'Satisfaction' }
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#F59E0B' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              borderRadius: '100px',
              color: '#92400E',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.25rem'
            }}>
              Why {city.name} Homeowners Choose Us
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '1rem' }}>
              Tired of Unreliable Contractors?
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.7' }}>
              We understand your frustrations. That's why we've built our reputation on delivering exactly what we promise.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', maxWidth: '1200px', margin: '0 auto' }}>
            {[
              {
                problem: 'Contractors who don\'t show up',
                solution: 'We confirm every appointment and arrive on time, every time.',
                icon: Clock
              },
              {
                problem: 'Poor quality that peels and fades',
                solution: 'Premium paints and meticulous prep work that lasts for years.',
                icon: Shield
              },
              {
                problem: 'Hidden fees and surprise costs',
                solution: 'Transparent pricing with detailed written estimates upfront.',
                icon: CheckCircle2
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '2.5rem',
                background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 24px rgba(220, 38, 38, 0.3)'
                }}>
                  <item.icon size={28} color="#fff" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#DC2626', marginBottom: '0.75rem' }}>
                  "{item.problem}"
                </h3>
                <p style={{ fontSize: '1.0625rem', color: '#475569', lineHeight: '1.7' }}>
                  <strong style={{ color: '#0F172A' }}>Our Promise:</strong> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section style={{ padding: '5rem 0', background: '#0F172A' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              background: 'rgba(245, 158, 11, 0.2)',
              borderRadius: '100px',
              color: '#F59E0B',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.25rem',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              Our Portfolio
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#fff', lineHeight: '1.2', marginBottom: '1rem' }}>
              {service.name} Gallery
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.7' }}>
              See the quality transformations we've delivered throughout {city.name} and Massachusetts
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {galleryImages.map((img, idx) => (
              <div key={idx} style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                cursor: 'pointer'
              }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.5rem'
                }}>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      background: '#F59E0B',
                      borderRadius: '100px',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      {img.category}
                    </span>
                    <p style={{ color: '#fff', fontSize: '1rem', fontWeight: '500' }}>{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <span style={{
              display: 'inline-block',
              padding: '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
              borderRadius: '100px',
              color: '#1D4ED8',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.25rem'
            }}>
              Watch Our Work
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '1rem' }}>
              See Our Team in Action
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748B', lineHeight: '1.7' }}>
              Watch how we transform properties with precision and care
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {videos.map((video, idx) => (
              <a
                key={idx}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  aspectRatio: '16/9',
                  display: 'block',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)'
                }}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s ease'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    boxShadow: '0 10px 30px rgba(220, 38, 38, 0.5)'
                  }}>
                    <Play size={32} color="#fff" fill="#fff" />
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: '700' }}>{video.title}</h3>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9375rem', marginTop: '0.25rem' }}>Watch on YouTube</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            gap: '4rem',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* About Image */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)'
              }}>
                <Image
                  src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/67796bfa6419fdb816930bc8.webp"
                  alt="Jafet - Owner of JH Painting Services"
                  width={600}
                  height={500}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                boxShadow: '0 15px 40px rgba(220, 38, 38, 0.4)'
              }}>
                <div style={{ color: '#fff', fontSize: '2rem', fontWeight: '800' }}>200+</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem', fontWeight: '500' }}>5-Star Reviews</div>
              </div>
            </div>

            {/* About Content */}
            <div>
              <span style={{
                display: 'inline-block',
                padding: '0.5rem 1.25rem',
                background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
                borderRadius: '100px',
                color: '#DC2626',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1.25rem'
              }}>
                About JH Painting Services
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '1.5rem' }}>
                Your Trusted {city.name} Painting Contractor
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Founded by <strong>Jafet</strong>, JH Painting Services is a premier painting contractor based in Waltham, Massachusetts.
                With years of hands-on experience, we've built our reputation on delivering exceptional craftsmanship,
                honest pricing, and reliable service to homeowners across {city.name} and all of Massachusetts.
              </p>
              <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: '1.8', marginBottom: '2rem' }}>
                We specialize in {service.name.toLowerCase()}, using only premium materials designed to withstand
                Massachusetts weather. Our meticulous attention to detail ensures results that exceed expectations.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                  { icon: Shield, title: 'Licensed & Insured' },
                  { icon: Award, title: 'Expert Craftsmen' },
                  { icon: Users, title: 'Local {city.name} Team' },
                  { icon: Heart, title: '100% Satisfaction' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #FEF3F2 0%, #FEE2E2 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <item.icon size={24} color="#DC2626" />
                    </div>
                    <span style={{ fontSize: '1rem', fontWeight: '600', color: '#0F172A' }}>{item.title.replace('{city.name}', city.name)}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+15086908886" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '1.125rem',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)'
              }}>
                <Phone size={20} />
                Call (508) 690-8886
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: '#fff', marginBottom: '1.5rem' }}>
              Ready to Transform Your {city.name} Property?
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
              Get a free, detailed estimate for your {service.name.toLowerCase()} project today.
              No obligation, no pressure—just honest advice and transparent pricing.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+15086908886" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem 2.5rem',
                background: '#fff',
                color: '#DC2626',
                borderRadius: '12px',
                fontSize: '1.25rem',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
              }}>
                <Phone size={24} />
                (508) 690-8886
              </a>
              <a href="#quote-form" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem 2.5rem',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '1.25rem',
                fontWeight: '600',
                textDecoration: 'none',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}>
                <Mail size={24} />
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section style={{ padding: '4rem 0', background: '#0F172A' }}>
        <div className="container">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#fff', marginBottom: '0.75rem' }}>
                Serving 114+ Cities Across Massachusetts
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem' }}>
                Professional {service.name.toLowerCase()} throughout the state
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              {footerCities.map((footerCity, idx) => (
                <Link
                  key={idx}
                  href={`/cities/${footerCity.toLowerCase().replace(/ /g, '-')}/${params.service}`}
                  style={{
                    padding: '0.5rem 1rem',
                    background: footerCity === city.name ? 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '100px',
                    color: '#fff',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {footerCity}
                </Link>
              ))}
              <Link
                href="/cities"
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  borderRadius: '100px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                View All Cities <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#030712', padding: '4rem 0 2rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            maxWidth: '1200px',
            margin: '0 auto',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Brand */}
            <div>
              <Image
                src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png"
                alt="JH Painting Services"
                width={160}
                height={64}
                style={{ filter: 'brightness(0) invert(1)', marginBottom: '1.5rem' }}
              />
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Professional painting services for homes and businesses across Massachusetts.
                Licensed, insured, and dedicated to excellence.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { href: 'https://www.facebook.com/profile.php?id=61564489391475', label: 'Facebook' },
                  { href: 'https://www.instagram.com/jhpaintingservices_/', label: 'Instagram' },
                  { href: 'https://www.youtube.com/@JHPaintingServices-br9wh', label: 'YouTube' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={social.label}
                  >
                    {social.label === 'Facebook' && (
                      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    )}
                    {social.label === 'Instagram' && (
                      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
                    )}
                    {social.label === 'YouTube' && (
                      <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About Us', href: '/#about' },
                  { label: 'Services', href: '/services' },
                  { label: 'Gallery', href: '/#gallery' },
                  { label: 'Reviews', href: '/#reviews' },
                  { label: 'Contact', href: '/#contact' }
                ].map((link, idx) => (
                  <li key={idx} style={{ marginBottom: '0.75rem' }}>
                    <Link href={link.href} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.3s ease' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Our Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {Object.entries(services).map(([slug, svc], idx) => (
                  <li key={idx} style={{ marginBottom: '0.75rem' }}>
                    <Link href={`/services/${slug}`} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.3s ease' }}>
                      {svc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: '#fff', fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Contact Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="tel:+15086908886" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  <Phone size={18} color="#F59E0B" />
                  (508) 690-8886
                </a>
                <a href="mailto:contact@jhpaintingservices.com" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  <Mail size={18} color="#F59E0B" />
                  contact@jhpaintingservices.com
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  <MapPin size={18} color="#F59E0B" />
                  Serving All of Massachusetts
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  <Clock size={18} color="#F59E0B" />
                  Mon-Sat: 7AM - 6PM
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
              © 2025 JH Painting Services. All Rights Reserved. Licensed Painting Contractor | Serving Massachusetts
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
