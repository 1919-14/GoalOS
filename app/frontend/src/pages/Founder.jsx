import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const PHOTO = 'https://media.licdn.com/dms/image/v2/D4D03AQHZKu_JQV2J6A/profile-displayphoto-scale_400_400/B4DZshe7AYH0Ag-/0/1765793315718?e=1783555200&v=beta&t=r3xvlfJQN9VleACxJD-n1GX8ttps6pLrLYYOkkdi6Bs';

const values = [
  { n:'01', title:'Human-first', desc:"Every product decision starts from the question: does this respect the user's time, attention, and intent?" },
  { n:'02', title:'Invisible technology', desc:'If you notice the machine, the design has failed. The best interface is the one that disappears.' },
  { n:'03', title:'Long-arc thinking', desc:"We're not building another app. We're laying the groundwork for a new category of computing." },
];

export default function Founder() {
  const [vis, setVis] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);

  const fade = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
  });

  return (
    <div className="page-content">
      <Navigation />

      {/* ── Hero ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '7rem', paddingBottom: '5rem' }}>
        <div className="founder-pad">
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '6rem', alignItems: 'center' }} className="founder-hero-grid">

            {/* ── Image block ── */}
            <div style={{ ...fade(0), position: 'relative' }}>
              {/* Main photo card */}
              <div style={{
                width: '100%',
                maxWidth: '420px',
                aspectRatio: '3/4',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
              }}>
                <img
                  src={PHOTO}
                  alt="V S S K Sai Narayana — Founder & CEO of Goal Computing Labs"
                  onLoad={() => setImgLoaded(true)}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'top center',
                    filter: imgLoaded ? 'blur(0px) grayscale(8%) contrast(1.06)' : 'blur(12px) grayscale(20%)',
                    transform: imgLoaded ? 'scale(1)' : 'scale(1.04)',
                    transition: 'filter 1.2s ease, transform 1.2s ease',
                  }}
                />

                {/* Bottom gradient */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '55%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Founder · CEO badge — bottom left */}
                <div style={{
                  position: 'absolute', bottom: '1.5rem', left: '1.5rem',
                }}>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#71717a', fontFamily: 'Outfit,sans-serif', marginBottom: '0.3rem' }}>
                    Founder · CEO
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 500, color: '#fff', fontFamily: 'Outfit,sans-serif', letterSpacing: '-0.01em' }}>
                    V S S K Sai Narayana
                  </div>
                </div>

                {/* EST. 2026 badge — bottom right */}
                <div style={{
                  position: 'absolute', bottom: '1.5rem', right: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '0.5rem',
                  padding: '0.4rem 0.75rem',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(0,0,0,0.4)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: '#52525b', fontFamily: 'Outfit,sans-serif', fontWeight: 700, textTransform: 'uppercase' }}>EST.</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', fontFamily: 'Outfit,sans-serif', lineHeight: 1.1 }}>2026</div>
                </div>
              </div>

              {/* Subtle blue glow behind photo */}
              <div style={{
                position: 'absolute', top: '30%', left: '-10%',
                width: '60%', height: '40%',
                background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: -1,
              }} />
            </div>

            {/* ── Bio block ── */}
            <div>
              {/* Label */}
              <div style={{ ...fade(0.15), display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ width: '2rem', height: '2px', background: '#2563eb', borderRadius: '2px' }} />
                <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#52525b' }}>
                  The Founder
                </span>
              </div>

              {/* Name */}
              <h1 style={{
                ...fade(0.25),
                fontSize: 'clamp(3rem,7vw,6rem)',
                fontWeight: 300, lineHeight: 1.0,
                letterSpacing: '-0.05em',
                marginBottom: '1.25rem',
              }}>
                V S S K Sai<br />
                <span style={{ fontFamily: 'Playfair Display,Georgia,serif', fontStyle: 'italic', fontWeight: 400 }}>
                  Narayana<span style={{ color: '#2563eb', fontStyle: 'normal' }}>.</span>
                </span>
              </h1>

              {/* Role */}
              <p style={{ ...fade(0.32), fontSize: '1rem', color: '#71717a', marginBottom: '2rem', fontFamily: 'Outfit,sans-serif', letterSpacing: '0.01em' }}>
                Founder · CEO · Architect of Goal-Based Computing.
              </p>

              {/* Bio */}
              <p style={{ ...fade(0.38), fontSize: '1.05rem', color: '#a1a1aa', lineHeight: 1.85, maxWidth: '480px', marginBottom: '2.5rem' }}>
                On a mission to dissolve the friction between human intent and digital execution. Building Goal Computing Labs from first principles — re-imagining how everyday people interact with machines.
              </p>

              {/* Quote box */}
              <div style={{
                ...fade(0.45),
                border: '1px solid rgba(255,255,255,0.1)',
                borderLeft: '3px solid #2563eb',
                borderRadius: '0.75rem',
                padding: '2rem 2rem 2rem 2.25rem',
                background: 'rgba(37,99,235,0.04)',
                marginBottom: '2.5rem',
                maxWidth: '520px',
              }}>
                <p style={{
                  fontSize: '1.15rem',
                  fontFamily: 'Playfair Display,Georgia,serif',
                  fontStyle: 'italic',
                  color: '#e4e4e7',
                  lineHeight: 1.7,
                  marginBottom: '1rem',
                }}>
                  "The system should learn the user. The user should never have to learn the system."
                </p>
                <cite style={{ fontSize: '0.65rem', color: '#52525b', fontFamily: 'Outfit,sans-serif', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', fontStyle: 'normal' }}>
                  — V S S K Sai Narayana
                </cite>
              </div>

              {/* Social + Contact buttons */}
              <div style={{ ...fade(0.52), display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="https://www.linkedin.com/in/vssk-sai-narayana/" target="_blank" rel="noopener noreferrer"
                  className="btn-secondary" data-testid="founder-linkedin" style={{ fontSize: '0.875rem', padding: '0.7rem 1.4rem', gap: '0.6rem', display: 'inline-flex', alignItems: 'center' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
                <a href="https://github.com/1919-14" target="_blank" rel="noopener noreferrer"
                  className="btn-secondary" data-testid="founder-github" style={{ fontSize: '0.875rem', padding: '0.7rem 1.4rem', gap: '0.6rem', display: 'inline-flex', alignItems: 'center' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  GitHub
                </a>
                <a href="mailto:sai@goalcomputinglabs.page?subject=Hello%20Sai"
                  className="btn-primary" data-testid="founder-email-sai" style={{ fontSize: '0.875rem', padding: '0.7rem 1.4rem', gap: '0.6rem', display: 'inline-flex', alignItems: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Write directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="section">
        <div className="founder-pad">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="founder-values-grid">
            {values.map((v, i) => (
              <div key={v.n} className="dark-card" style={{ padding: '2.5rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 200, color: 'rgba(37,99,235,0.4)', fontFamily: 'Outfit,sans-serif', letterSpacing: '-0.05em', marginBottom: '1.25rem', lineHeight: 1 }}>{v.n}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '0.85rem', fontFamily: 'Outfit,sans-serif' }}>{v.title}</div>
                <p style={{ fontSize: '0.9rem', color: '#71717a', lineHeight: 1.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Founder ── */}
      <section className="section">
        <div className="founder-pad">
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem',
          }} className="contact-grid">

            {/* sai@ */}
            <a
              href="mailto:sai@goalcomputinglabs.page?subject=Hello%20Sai"
              data-testid="founder-contact-sai"
              style={{ textDecoration: 'none' }}
            >
              <div className="dark-card" style={{
                padding: '2.25rem 2.5rem',
                display: 'flex', alignItems: 'center', gap: '1.5rem',
                transition: 'border-color 0.3s, background 0.3s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'; e.currentTarget.style.background = 'rgba(37,99,235,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.background = ''; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: '0.6rem', background: 'rgba(37,99,235,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3f3f46', fontFamily: 'Outfit,sans-serif', marginBottom: '0.3rem' }}>Contact Founder</div>
                  <div style={{ fontSize: '1rem', color: '#fff', fontFamily: 'Outfit,sans-serif', fontWeight: 500 }}>sai@goalcomputinglabs.page</div>
                  <div style={{ fontSize: '0.78rem', color: '#52525b', fontFamily: 'Manrope,sans-serif', marginTop: '0.2rem' }}>Primary — fastest response</div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#3f3f46', fontSize: '1.2rem' }}>→</div>
              </div>
            </a>

            {/* vssk@ */}
            <a
              href="mailto:vssk@goalcomputinglabs.page?subject=Hello%20Sai"
              data-testid="founder-contact-vssk"
              style={{ textDecoration: 'none' }}
            >
              <div className="dark-card" style={{
                padding: '2.25rem 2.5rem',
                display: 'flex', alignItems: 'center', gap: '1.5rem',
                transition: 'border-color 0.3s, background 0.3s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)'; e.currentTarget.style.background = 'rgba(37,99,235,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.background = ''; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: '0.6rem', background: 'rgba(37,99,235,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3f3f46', fontFamily: 'Outfit,sans-serif', marginBottom: '0.3rem' }}>Contact Founder</div>
                  <div style={{ fontSize: '1rem', color: '#fff', fontFamily: 'Outfit,sans-serif', fontWeight: 500 }}>vssk@goalcomputinglabs.page</div>
                  <div style={{ fontSize: '0.78rem', color: '#52525b', fontFamily: 'Manrope,sans-serif', marginTop: '0.2rem' }}>Alternative — always monitored</div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#3f3f46', fontSize: '1.2rem' }}>→</div>
              </div>
            </a>

          </div>
        </div>
      </section>
      <section className="section">
        <div className="founder-pad">
          <div className="dark-card" style={{ padding: '3rem 3.5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }} className="founder-cta-grid">
            <div>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#52525b', fontFamily: 'Outfit,sans-serif', marginBottom: '0.75rem' }}>Next</div>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.4rem)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                Want to build the future of computing together?
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/waitlist" className="btn-primary" data-testid="founder-cta-waitlist" style={{ whiteSpace: 'nowrap', fontSize: '0.875rem', padding: '0.7rem 1.4rem' }}>
                Join the waitlist →
              </Link>
              <Link to="/goalos" className="btn-secondary" data-testid="founder-cta-goalos" style={{ whiteSpace: 'nowrap', textAlign: 'center', fontSize: '0.875rem', padding: '0.7rem 1.4rem' }}>
                Read about GoalOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        /* ── Founder: section padding ── */
        .founder-pad { padding: 0 4rem; max-width: 100%; }

        /* Tablet */
        @media (max-width: 1024px) {
          .founder-pad { padding: 0 2rem; }
          .founder-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .founder-hero-grid > div:first-child { max-width: 380px; margin: 0 auto; }
          .founder-values-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .founder-pad { padding: 0 1.25rem; }
          .founder-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .founder-hero-grid > div:first-child { max-width: 320px; }
          .founder-cta-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .contact-grid { grid-template-columns: 1fr !important; }
          .founder-values-grid { grid-template-columns: 1fr !important; }
          .founder-cta-grid .dark-card { padding: 2rem 1.5rem !important; }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .founder-pad { padding: 0 1rem; }
          .founder-hero-grid > div:first-child { max-width: 100%; }
        }
      `}</style>
    </div>
  );
}
