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
      {/* Outer rotating box */}
      <div style={{
        position: 'absolute', inset: 0,
        border: '1.5px solid rgba(255,255,255,0.25)',
        borderRadius: '6px',
        transform: hovered ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }} />
      {/* Orbit ring (does NOT rotate) */}
      <div style={{
        position: 'absolute', inset: '4px',
        border: '1px solid rgba(37,99,235,0.45)',
        borderRadius: '50%',
        transition: 'border-color 0.3s',
        borderColor: hovered ? 'rgba(37,99,235,0.8)' : 'rgba(37,99,235,0.45)',
      }} />
      {/* Inner diamond — stays fixed */}
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
      {/* Glow on hover */}
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

  return (
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

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
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
    </header>
  );
}
