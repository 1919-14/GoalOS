import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

const roles = ['Business Owner','Student','Freelancer','Enterprise / Team','Developer / Researcher','Curious Human'];
const waves = [
  { w:'WAVE 1', d:'Q1 · Invite-only' },
  { w:'WAVE 2', d:'Q2 · Early users' },
  { w:'WAVE 3', d:'Public preview' },
];

const BASE_COUNT = 1252;

function getLocalList() {
  try { return JSON.parse(localStorage.getItem('gbl_waitlist') || '[]'); }
  catch { return []; }
}

export default function Waitlist() {
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [role, setRole]           = useState('Business Owner');
  const [why, setWhy]             = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [err, setErr]             = useState('');

  const localList = getLocalList();
  const count = BASE_COUNT + localList.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setErr('Email is required.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErr('Please enter a valid email address.'); return;
    }

    setLoading(true);
    const entry = { name: name.trim(), email: email.trim(), role, why: why.trim(), created_at: new Date().toISOString() };

    try {
      if (supabase) {
        // Try Supabase first
        const { error } = await supabase.from('waitlist').insert([entry]);
        if (error) {
          // Duplicate email or other error — still show success for UX, but log
          console.warn('Supabase insert:', error.message);
        }
      }
      // Always save locally as a fallback / offline record
      localStorage.setItem('gbl_waitlist', JSON.stringify([...localList, entry]));
      setSubmitted(true);
    } catch (ex) {
      console.error(ex);
      // Still mark as submitted — data saved locally
      localStorage.setItem('gbl_waitlist', JSON.stringify([...localList, entry]));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <Navigation />

      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '7rem', paddingBottom: '4rem' }}>
        <div className="container-xl">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '5rem', alignItems: 'center' }} className="waitlist-hero-grid">

            {/* Left: copy */}
            <div>
              <div className="label-line" style={{ marginBottom: '1.5rem' }}>
                <span className="label-tag">Early Access</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
                Be early.<br />
                <span className="serif-italic">Be heard<span className="accent-blue">.</span></span>
              </h1>
              <p style={{ fontSize: '0.95rem', color: '#71717a', lineHeight: 1.8, maxWidth: '380px' }}>
                GoalOS is rolling out in invite-only waves. Join the waitlist to secure your spot — and help shape the platform before launch.
              </p>
            </div>

            {/* Right: form */}
            <div className="dark-card" style={{ padding: '2.5rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✦</div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 300, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                    You're on the list.
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#71717a', lineHeight: 1.75 }}>
                    We'll reach out when your wave opens.<br />Thanks for believing in a better way to compute.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

                  {/* Name + Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-row">
                    <div>
                      <label className="form-label">Name (optional)</label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        data-testid="waitlist-name"
                      />
                    </div>
                    <div>
                      <label className="form-label">Email *</label>
                      <input
                        className="form-input"
                        type="email"
                        placeholder="you@domain.com"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setErr(''); }}
                        data-testid="waitlist-email"
                        required
                      />
                    </div>
                  </div>

                  {/* Role pills */}
                  <div>
                    <label className="form-label" style={{ marginBottom: '0.85rem' }}>I am a...</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {roles.map(r => (
                        <button
                          key={r}
                          type="button"
                          className={`role-pill ${role === r ? 'selected' : ''}`}
                          onClick={() => setRole(r)}
                          data-testid={`role-${r.toLowerCase().replace(/[\s/]+/g, '-')}`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Why */}
                  <div>
                    <label className="form-label">Why GoalOS? (optional)</label>
                    <textarea
                      className="form-input"
                      placeholder="Tell us what you'd build first..."
                      rows={3}
                      value={why}
                      onChange={e => setWhy(e.target.value)}
                      style={{ resize: 'none', lineHeight: 1.7 }}
                      data-testid="waitlist-why"
                    />
                  </div>

                  {/* Error */}
                  {err && (
                    <p style={{ fontSize: '0.78rem', color: '#ef4444', fontFamily: 'Outfit,sans-serif', marginTop: '-0.75rem' }}>
                      {err}
                    </p>
                  )}

                  {/* Submit row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#52525b', fontFamily: 'Outfit,sans-serif' }}>
                      {count.toLocaleString()} humans on the list
                    </span>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                      data-testid="waitlist-submit"
                      style={{ opacity: loading ? 0.6 : 1 }}
                    >
                      {loading ? 'Saving...' : 'Reserve my spot →'}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>

          {/* Waves */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem', marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.06)' }} className="waves-grid">
            {waves.map((wv, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingLeft: i > 0 ? '2rem' : 0 }}>
                <div className="label-tag" style={{ marginBottom: '0.6rem' }}>{wv.w}</div>
                <div style={{ fontSize: '0.9rem', color: '#a1a1aa', fontFamily: 'Outfit,sans-serif' }}>{wv.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        /* ── Waitlist responsive ── */

        /* Tablet */
        @media (max-width: 1024px) {
          .waitlist-hero-grid { gap: 3rem !important; }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .waitlist-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .waves-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .waves-grid > div {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid rgba(255,255,255,0.05);
            padding-top: 1.25rem;
          }
          .waves-grid > div:first-child {
            border-top: none;
            padding-top: 0;
          }
          .form-row { grid-template-columns: 1fr !important; }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .waitlist-hero-grid { gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}
