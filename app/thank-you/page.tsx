'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Phone, Mail, Clock, ArrowRight, Star, Shield, Home, Calendar } from '@/app/components/icons'

export default function ThankYouPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Track conversion in GTM dataLayer
    if (typeof window !== 'undefined' && (window as typeof window & { dataLayer: Record<string, unknown>[] }).dataLayer) {
      (window as typeof window & { dataLayer: Record<string, unknown>[] }).dataLayer.push({
        event: 'form_submission',
        form_name: 'contact_form',
        conversion: true
      })
    }
  }, [])

  return (
    <>
      {/* Header */}
      <header className="header header-scrolled" style={{ position: 'relative' }}>
        <div className="container">
          <div className="header-main">
            <Link href="/" className="logo">
              <Image
                src="https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png"
                alt="JH Painting Services Logo"
                width={160}
                height={64}
                priority
              />
            </Link>

            <a href="tel:+15086908886" className="header-cta">
              <Phone size={18} />
              (508) 690-8886
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}>
        {/* Hero Section */}
        <section style={{
          paddingTop: '120px',
          paddingBottom: '80px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(210, 4, 4, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(210, 4, 4, 0.05) 0%, transparent 50%)',
            pointerEvents: 'none'
          }} />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              textAlign: 'center'
            }}>
              {/* Success Icon */}
              <div style={{
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                boxShadow: '0 20px 60px rgba(34, 197, 94, 0.3)',
                animation: mounted ? 'scaleIn 0.5s ease-out' : 'none'
              }}>
                <CheckCircle2 size={60} color="#fff" strokeWidth={2.5} />
              </div>

              {/* Main Message */}
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: '800',
                color: '#fff',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                Thank You for Contacting Us!
              </h1>

              <p style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                We've received your request and our team will get back to you within <strong style={{ color: '#22C55E' }}>24 hours</strong>.
              </p>

              {/* What Happens Next */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2rem',
                marginBottom: '3rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#fff',
                  marginBottom: '1.5rem'
                }}>
                  What Happens Next?
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {[
                    { icon: Mail, title: 'Confirmation Email', desc: 'Check your inbox for our confirmation' },
                    { icon: Phone, title: 'Personal Call', desc: "We'll call to discuss your project" },
                    { icon: Calendar, title: 'Free Estimate', desc: "Schedule your on-site consultation" },
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        background: 'linear-gradient(135deg, #D20404 0%, #A80303 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <item.icon size={24} color="#fff" />
                      </div>
                      <h3 style={{ color: '#fff', fontWeight: '600', fontSize: '1rem' }}>{item.title}</h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '3rem'
              }}>
                <a href="tel:+15086908886" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #D20404 0%, #A80303 100%)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 10px 40px rgba(220, 38, 38, 0.4)',
                  transition: 'all 0.3s ease'
                }}>
                  <Phone size={20} />
                  Call Us Now
                </a>
                <Link href="/" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  <Home size={20} />
                  Back to Homepage
                </Link>
              </div>

              {/* Trust Indicators */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {[
                  { icon: Star, text: '5.0 Google Rating' },
                  { icon: Shield, text: 'Licensed & Insured' },
                  { icon: Clock, text: '24hr Response Time' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    <item.icon size={18} color="#D20404" />
                    <span style={{ fontSize: '0.9375rem', fontWeight: '500' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section style={{
          padding: '60px 0',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div className="container">
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#fff',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              While You Wait, Explore Our Services
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { title: 'Interior Painting', href: '/services/interior-painting', desc: 'Transform your living spaces with premium paints' },
                { title: 'Exterior Painting', href: '/services/exterior-painting', desc: 'Protect and beautify your home exterior' },
                { title: 'Cabinet Painting', href: '/services/cabinet-painting', desc: 'Refresh your kitchen for a fraction of the cost' },
                { title: 'Commercial Painting', href: '/services/commercial-painting', desc: 'Professional painting for your business' },
              ].map((service, idx) => (
                <Link key={idx} href={service.href} style={{
                  display: 'block',
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    {service.title}
                    <ArrowRight size={18} color="#D20404" />
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.875rem',
                    margin: 0
                  }}>
                    {service.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#0F172A',
        padding: '2rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.875rem',
              margin: 0
            }}>
              © {new Date().getFullYear()} JH Painting Services. All Rights Reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="tel:+15086908886" style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', textDecoration: 'none' }}>
                (508) 690-8886
              </a>
              <a href="mailto:contact@jhpaintingservices.com" style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', textDecoration: 'none' }}>
                contact@jhpaintingservices.com
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
