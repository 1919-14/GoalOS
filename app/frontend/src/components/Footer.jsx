import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-xl">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '3rem',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
              {/* Logo mark — box + orbit + diamond */}
              <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
                <div style={{ position: 'absolute', inset: 0, border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '5px' }} />
                <div style={{ position: 'absolute', inset: '4px', border: '1px solid rgba(37,99,235,0.4)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: 8, height: 8, background: '#2563eb', borderRadius: '1.5px', transform: 'translate(-50%,-50%) rotate(45deg)' }} />
              </div>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#fff' }}>
                Goal Computing Labs
              </span>
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.65rem', letterSpacing: '0.12em', color: '#52525b', marginBottom: '1rem', textTransform: 'uppercase' }}>
              EST. 2026
            </div>
            <p style={{ fontSize: '0.8rem', color: '#71717a', lineHeight: 1.7, maxWidth: '220px', fontFamily: 'Manrope, sans-serif' }}>
              Building the first goal-driven computing platform. Software that adapts to humans — not the other way around.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div className="label-tag" style={{ marginBottom: '1.25rem' }}>Explore</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'Lab', path: '/' },
                { label: 'GoalOS', path: '/goalos' },
                { label: 'Founder', path: '/about' },
                { label: 'Waitlist', path: '/waitlist' },
              ].map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  style={{ fontSize: '0.825rem', color: '#71717a', textDecoration: 'none', fontFamily: 'Outfit, sans-serif', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = '#fff'}
                  onMouseLeave={(e) => e.target.style.color = '#71717a'}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <div className="label-tag" style={{ marginBottom: '1.25rem' }}>Stack</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['GBC Engine', 'Hybrid Compute', 'Adaptive UI', 'Memory Layer'].map((item) => (
                <span key={item} style={{ fontSize: '0.825rem', color: '#52525b', fontFamily: 'Outfit, sans-serif' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <div className="label-tag" style={{ marginBottom: '1.25rem' }}>Connect</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a
                href="mailto:info@goalcomputinglabs.page?subject=Hello%20Goal%20Computing%20Labs"
                style={{ fontSize: '0.78rem', color: '#71717a', textDecoration: 'none', fontFamily: 'Outfit, sans-serif', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#71717a'}
              >
                info@goalcomputinglabs.page
              </a>
              <a
                href="mailto:labs@goalcomputinglabs.page?subject=Partnership%20Inquiry"
                style={{ fontSize: '0.78rem', color: '#71717a', textDecoration: 'none', fontFamily: 'Outfit, sans-serif', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#71717a'}
              >
                labs@goalcomputinglabs.page
              </a>
              <a
                href="https://www.linkedin.com/in/vssk-sai-narayana/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.825rem', color: '#71717a', textDecoration: 'none', fontFamily: 'Outfit, sans-serif', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#71717a'}
              >
                Founder · LinkedIn ↗
              </a>
              <a
                href="https://github.com/1919-14"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.825rem', color: '#71717a', textDecoration: 'none', fontFamily: 'Outfit, sans-serif', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#71717a'}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#3f3f46', fontFamily: 'Outfit, sans-serif' }}>
            © 2026 Goal Computing Labs. All rights reserved.
          </span>
          <span style={{ fontSize: '0.75rem', color: '#3f3f46', fontFamily: 'Outfit, sans-serif' }}>
            GoalOS · v0.1 (preview)
          </span>
        </div>
      </div>

      {/* Responsive footer styles */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
