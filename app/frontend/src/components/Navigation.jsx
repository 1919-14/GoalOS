import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navLinks = [
  { label: 'Lab', path: '/' },
  { label: 'GoalOS', path: '/goalos' },
  { label: 'Founder', path: '/about' },
  { label: 'Waitlist', path: '/waitlist' },
];

function LogoMark() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ position: 'relative', width: 38, height: 38, cursor: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: 'absolute', inset: 0,
        border: '1.5px solid rgba(255,255,255,0.25)',
        borderRadius: '6px',
        transform: hovered ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }} />
      <div style={{
        position: 'absolute', inset: '4px',
        border: '1px solid rgba(37,99,235,0.45)',
        borderRadius: '50%',
        transition: 'border-color 0.3s',
        borderColor: hovered ? 'rgba(37,99,235,0.8)' : 'rgba(37,99,235,0.45)',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 10, height: 10,
        background: '#2563eb',
        borderRadius: '2px',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        transition: 'background 0.3s',
        ...(hovered ? { background: '#3b82f6' } : {}),
      }} />
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '6px',
          boxShadow: '0 0 18px rgba(37,99,235,0.3)',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
}

export default function Navigation() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header
        className="glass-nav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
          padding: '0.65rem 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}
          data-testid="nav-logo"
        >
          <LogoMark />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 600, fontSize: '0.82rem', color: '#fff', letterSpacing: '-0.01em' }}>
              Goal Computing
            </div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 300, fontSize: '0.58rem', color: '#52525b', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Labs
            </div>
          </div>
        </Link>

        {/* Desktop Nav links */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-pill ${isActive ? 'active' : ''}`}
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          data-testid="nav-hamburger"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            flexDirection: 'column',
            gap: '5px',
            zIndex: 600,
            position: 'relative',
          }}
        >
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: '#fff', borderRadius: 2,
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            transition: 'transform 0.3s ease',
          }} />
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: '#fff', borderRadius: 2,
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }} />
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: '#fff', borderRadius: 2,
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            transition: 'transform 0.3s ease',
          }} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 490,
          background: 'rgba(3,3,3,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          gap: '2rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        {navLinks.map((link, i) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              style={{
                fontFamily: 'Outfit,sans-serif',
                fontSize: 'clamp(2rem,10vw,3.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                color: isActive ? '#fff' : '#52525b',
                textDecoration: 'none',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms, color 0.2s ease`,
              }}
              data-testid={`mobile-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          );
        })}
        <a
          href="mailto:info@goalcomputinglabs.page"
          onClick={closeMenu}
          style={{
            marginTop: '1rem',
            fontFamily: 'Outfit,sans-serif',
            fontSize: '0.75rem',
            color: '#3f3f46',
            textDecoration: 'none',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: menuOpen ? 1 : 0,
            transition: `opacity 0.4s ease 240ms`,
          }}
        >
          info@goalcomputinglabs.page
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
