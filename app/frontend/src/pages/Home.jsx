import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

/* ── SVG icon components ─────────────────────────────────── */
const IconBrain = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44l-1.92-11.43A2.5 2.5 0 0 1 7.5 5H9.5z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44l1.92-11.43A2.5 2.5 0 0 0 16.5 5H14.5z"/>
    <path d="M12 4.5C12 3 13 2 14.5 2"/>
    <path d="M12 4.5C12 3 11 2 9.5 2"/>
  </svg>
);
const IconLayers = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconSparkle = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v1M12 20v1M3 12h1M20 12h1M5.64 5.64l.71.71M17.66 17.66l.71.71M5.64 18.36l.71-.71M17.66 6.34l.71-.71"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>
);
const IconCpu = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="8" y="8" width="8" height="8"/>
    <line x1="4" y1="9" x2="2" y2="9"/><line x1="4" y1="15" x2="2" y2="15"/>
    <line x1="22" y1="9" x2="20" y2="9"/><line x1="22" y1="15" x2="20" y2="15"/>
    <line x1="9" y1="4" x2="9" y2="2"/><line x1="15" y1="4" x2="15" y2="2"/>
    <line x1="9" y1="22" x2="9" y2="20"/><line x1="15" y1="22" x2="15" y2="20"/>
  </svg>
);

const features = [
  { Icon: IconBrain,   title: 'Understands Intent',    desc: 'Natural language in. Workflows out.' },
  { Icon: IconLayers,  title: 'Generates Interfaces',  desc: 'Minimal, task-specific, disposable.' },
  { Icon: IconSparkle, title: 'Learns You',             desc: 'Adapts to your patterns over time.' },
  { Icon: IconCpu,     title: 'Hybrid Compute',        desc: 'Local speed. Cloud reasoning.' },
];

/* ── Marquee ─────────────────────────────────────────────── */
const MARQUEE_ITEMS = ['No menus', 'No tutorials', 'No app installs', 'Just goals', 'Just results'];

function Marquee() {
  const content = MARQUEE_ITEMS.map((item, i) => (
    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem' }}>
      <span style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1rem', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#71717a' }}>
        {item}
      </span>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb', flexShrink: 0, display: 'inline-block', boxShadow: '0 0 8px rgba(37,99,235,0.6)' }} />
    </span>
  ));

  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '2rem 0', margin: '4rem 0 0' }}>
      <div style={{ display: 'inline-flex', gap: '2rem', animation: 'marquee 28s linear infinite', whiteSpace: 'nowrap' }}>
        {content}{content}{content}
      </div>
    </div>
  );
}

/* ── CTA card ── */
function CtaCard({ tag, heading, desc, action, canInvert = false }) {
  const [hov, setHov] = useState(false);
  const flipped = canInvert && hov;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '2.75rem',
        display: 'flex', flexDirection: 'column', minHeight: '280px',
        borderRadius: '1rem',
        border: flipped ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.07)',
        background: flipped ? '#ffffff' : '#09090b',
        transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.4s ease',
        cursor: 'default',
      }}
    >
      <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: flipped ? '#71717a' : '#52525b', marginBottom: '1rem', fontFamily: 'Outfit,sans-serif', transition: 'color 0.4s' }}>
        {tag}
      </div>
      <h3 style={{ fontSize: 'clamp(1.6rem,3vw,2.6rem)', fontWeight: 300, letterSpacing: '-0.04em', marginBottom: '0.85rem', color: flipped ? '#09090b' : '#fff', fontFamily: 'Outfit,sans-serif', lineHeight: 1.05, transition: 'color 0.4s' }}>
        {heading}
      </h3>
      <p style={{ fontSize: '0.87rem', color: flipped ? '#52525b' : '#71717a', lineHeight: 1.8, flexGrow: 1, transition: 'color 0.4s' }}>
        {desc}
      </p>
      <div style={{ marginTop: '2rem' }}>{action(flipped)}</div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function Home() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  const fade = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  });

  return (
    <div className="page-content">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="home-hero-section">
        <div className="home-section-pad">

          <div className="label-line" style={{ ...fade(0), marginBottom: '2rem' }}>
            <span className="label-tag">A New Category of Computing · 2026</span>
          </div>

          {/* Full-width headline */}
          <h1 className="home-hero-headline" style={{ ...fade(0.1) }}>
            Software should adapt
            <br />
            to{' '}
            <span className="serif-italic" style={{ fontWeight: 400 }}>
              humans<span className="accent-blue" style={{ fontStyle: 'normal' }}>.</span>
            </span>
          </h1>

          {/* Sub + CTAs */}
          <div className="home-hero-sub-row" style={fade(0.2)}>
            <p style={{ fontSize: '1.05rem', color: '#a1a1aa', lineHeight: 1.8, maxWidth: '480px' }}>
              Goal Computing Labs is pioneering an entirely new way for people and machines to work together — eliminating the friction, learning curves, and clutter of traditional software.
            </p>
            <div className="home-hero-cta-group">
              <Link to="/goalos" className="btn-primary" data-testid="hero-cta-product" style={{ fontSize: '0.9rem', padding: '0.75rem 1.6rem' }}>
                Discover GoalOS →
              </Link>
              <a href="mailto:info@goalcomputinglabs.page?subject=Partnership%20%2F%20Inquiry" className="btn-secondary" data-testid="hero-cta-contact" style={{ fontSize: '0.9rem', padding: '0.75rem 1.6rem' }}>
                ✉ Connect with us
              </a>
            </div>
          </div>

          {/* Stat row */}
          <div className="home-stat-row" style={fade(0.35)}>
            {[
              ['01', 'MISSION', 'Eliminate complexity from computing.'],
              ['02', 'PRODUCT', 'GoalOS · adaptive task-execution.'],
              ['03', 'ENGINE',  'GBC · Goal-Based Computing.'],
            ].map(([n, l, t], i) => (
              <div key={n} className={`home-stat-item ${i > 0 ? 'home-stat-item--bordered' : ''}`}>
                <div style={{ fontSize: '2.5rem', fontWeight: 200, color: 'rgba(255,255,255,0.12)', fontFamily: 'Outfit,sans-serif', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.5rem' }}>
                  {n}
                </div>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#3f3f46', fontFamily: 'Outfit,sans-serif', marginBottom: '0.4rem' }}>
                  {l}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#71717a', fontFamily: 'Manrope,sans-serif' }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee ─────────────────────────────────────── */}
      <Marquee />

      {/* ── What We Believe ─────────────────────────────── */}
      <section className="section">
        <div className="home-section-pad">
          <div className="home-believe-grid">
            {/* Left */}
            <div>
              <div className="label-line" style={{ marginBottom: '1.5rem' }}>
                <span className="label-tag">What We Believe</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.5rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '1.75rem' }}>
                The user should never
                <br />have to learn the
                <br /><span className="serif-italic">software.</span>
              </h2>
              <p style={{ color: '#71717a', lineHeight: 1.85, fontSize: '0.95rem', maxWidth: '400px' }}>
                Every app today demands time, attention, and adaptation. We're building computing that flips this upside down — interfaces that know what you want, do it, and disappear.
              </p>
            </div>

            {/* Right: 2×2 bento */}
            <div className="home-features-grid">
              {features.map(({ Icon, title, desc }, i) => (
                <div key={i} className="dark-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, left: -20, width: 80, height: 80, background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ marginBottom: '1.25rem', position: 'relative' }}><Icon /></div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem', fontFamily: 'Outfit,sans-serif', letterSpacing: '-0.01em' }}>
                    {title}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#71717a', fontFamily: 'Manrope,sans-serif', lineHeight: 1.7 }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Shift ───────────────────────────────────── */}
      <section className="section">
        <div className="home-section-pad">
          <div className="label-line" style={{ marginBottom: '1rem' }}>
            <span className="label-tag">The Shift</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, letterSpacing: '-0.04em', marginBottom: '3.5rem' }}>
            From apps to outcomes.
          </h2>
          <div className="home-shift-grid">
            {/* Today */}
            <div className="dark-card" style={{ padding: '2.75rem' }}>
              <div className="label-tag" style={{ marginBottom: '1.75rem' }}>Today</div>
              <div style={{ fontSize: '0.9rem', color: '#52525b', marginBottom: '0.75rem', fontFamily: 'Outfit,sans-serif' }}>need</div>
              {['find software', 'install', 'learn UI', 'adapt to its model', 'perform task'].map(s => (
                <div key={s} className="step-item">
                  <span style={{ color: '#27272a', marginRight: '0.5rem' }}>↓</span>
                  <span style={{ color: '#3f3f46' }}>{s}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#71717a', fontFamily: 'Outfit,sans-serif' }}>→ result</div>
            </div>
            {/* GoalOS */}
            <div className="glass-card" style={{ padding: '2.75rem', border: '1px solid rgba(37,99,235,0.18)', background: 'rgba(37,99,235,0.03)' }}>
              <div className="label-tag" style={{ marginBottom: '1.75rem', color: '#2563eb' }}>With GoalOS</div>
              <div style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.75rem', fontFamily: 'Outfit,sans-serif' }}>need</div>
              {['describe goal', "GBC generates exactly what's needed"].map(s => (
                <div key={s} className="step-item">
                  <span style={{ color: '#2563eb', marginRight: '0.5rem' }}>↓</span>
                  <span style={{ color: '#d4d4d8' }}>{s}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#2563eb', fontWeight: 500, fontFamily: 'Outfit,sans-serif' }}>→ result</div>
              <p style={{ marginTop: '1.75rem', fontSize: '0.82rem', color: '#52525b', lineHeight: 1.8 }}>
                No menus. No installs. No clutter. Just the smallest possible interface to complete your goal — then it vanishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Pair ────────────────────────────────────── */}
      <section className="section">
        <div className="home-section-pad">
          <div className="home-cta-grid">
            <CtaCard
              tag="Our Flagship Product"
              heading="Explore GoalOS"
              desc="The world's first adaptive goal-driven computing platform."
              canInvert={false}
              action={(flipped) => (
                <Link to="/goalos" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#fff', textDecoration: 'none', fontFamily: 'Outfit,sans-serif', fontWeight: 500 }} data-testid="cta-see-product">
                  See the product →
                </Link>
              )}
            />
            <CtaCard
              tag="Connect With Us"
              heading="Let's talk."
              desc="Investors, partners, early collaborators, press — write to us directly."
              canInvert={true}
              action={(flipped) => (
                <a
                  href="mailto:info@goalcomputinglabs.page?subject=Partnership%20%2F%20Inquiry"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    fontSize: '0.85rem', textDecoration: 'none',
                    fontFamily: 'Outfit,sans-serif', fontWeight: 500,
                    color: flipped ? '#09090b' : '#fff',
                    border: `1px solid ${flipped ? '#d4d4d8' : 'rgba(255,255,255,0.15)'}`,
                    padding: '0.55rem 1.1rem', borderRadius: '0.5rem',
                    transition: 'all 0.3s ease',
                  }}
                  data-testid="cta-email"
                >
                  info@goalcomputinglabs.page →
                </a>
              )}
            />
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        /* ── Home page layout helpers ── */
        .home-hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 7rem;
          padding-bottom: 4rem;
        }
        .home-section-pad {
          max-width: 100%;
          padding: 0 4rem;
        }
        .home-hero-headline {
          font-size: clamp(3.5rem, 9.5vw, 8.5rem);
          font-weight: 300;
          line-height: 0.95;
          letter-spacing: -0.05em;
          max-width: 100%;
          margin-bottom: 2.5rem;
        }
        .home-hero-sub-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: flex-end;
        }
        .home-hero-cta-group {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: flex-end;
          padding-bottom: 0.25rem;
        }
        .home-stat-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin-top: 6rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 2.5rem;
        }
        .home-stat-item {
          padding: 0 3rem;
        }
        .home-stat-item--bordered {
          border-left: 1px solid rgba(255,255,255,0.05);
        }
        .home-believe-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 6rem;
          align-items: center;
        }
        .home-features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .home-shift-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .home-cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .home-section-pad { padding: 0 2rem; }
          .home-hero-sub-row { gap: 2rem; }
          .home-stat-item { padding: 0 1.5rem; }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .home-section-pad { padding: 0 1.25rem; }
          .home-hero-section { padding-top: 6rem; padding-bottom: 3rem; }
          .home-hero-headline { font-size: clamp(2.8rem, 12vw, 5rem); line-height: 1.0; margin-bottom: 1.75rem; }

          .home-hero-sub-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .home-hero-cta-group {
            justify-content: flex-start;
          }

          .home-stat-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-top: 3rem;
          }
          .home-stat-item { padding: 0; }
          .home-stat-item--bordered {
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.05);
            padding-top: 1.5rem;
          }

          .home-believe-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .home-features-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          .home-shift-grid { grid-template-columns: 1fr; }
          .home-cta-grid { grid-template-columns: 1fr; }
        }

        /* ── Small mobile ── */
        @media (max-width: 480px) {
          .home-section-pad { padding: 0 1rem; }
          .home-features-grid { grid-template-columns: 1fr; }
          .home-hero-headline { font-size: clamp(2.4rem, 11vw, 4rem); }
        }
      `}</style>
    </div>
  );
}
