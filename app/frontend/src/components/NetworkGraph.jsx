import { useEffect, useState } from 'react';

const OUTER = [
  { angle: 0,   label: 'Apps' },
  { angle: 60,  label: 'Memory' },
  { angle: 120, label: 'Tasks' },
  { angle: 180, label: 'Process' },
  { angle: 240, label: 'Network' },
  { angle: 300, label: 'Storage' },
];

const INNER = [
  { angle: 30,  label: 'AI' },
  { angle: 150, label: 'Goal' },
  { angle: 270, label: 'Kernel' },
];

function polar(cx, cy, r, angle) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const nodeStyle = (i) => ({
  animation: `nodeFadeIn 0.6s ease ${0.1 + i * 0.08}s both`,
});

const lineStyle = (i) => ({
  animation: `lineGrow 0.8s ease ${0.2 + i * 0.06}s both`,
});

export default function NetworkGraph() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const cx = 300, cy = 300;
  const outerR = 170;
  const innerR = 85;

  if (!mounted) {
    return (
      <svg viewBox="0 0 600 600" style={{ width: '100%', height: '100%', display: 'block' }}>
        <circle cx={cx} cy={cy} r={120} fill="rgba(37,99,235,0.04)" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 600 600"
      style={{ width: '100%', height: '100%', display: 'block' }}
      className="network-graph"
    >
      <defs>
        <radialGradient id="cg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ng" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Center ambient glow */}
      <circle cx={cx} cy={cy} r={160} fill="url(#cg)">
        <animate attributeName="r" values="160;180;160" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.6;1" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Connection lines: center to outer */}
      {OUTER.map((n, i) => {
        const p = polar(cx, cy, outerR, n.angle);
        return (
          <g key={`c-${n.label}`} style={lineStyle(i)}>
            <line
              x1={cx} y1={cy} x2={p.x} y2={p.y}
              stroke="#2563eb"
              strokeOpacity={0.15}
              strokeWidth={1}
            />
            <line
              x1={cx} y1={cy} x2={p.x} y2={p.y}
              stroke="#2563eb"
              strokeOpacity={0.4}
              strokeWidth={1}
              strokeDasharray="4 8"
              className="data-flow"
            />
          </g>
        );
      })}

      {/* Connection lines: outer to outer (ring) */}
      {OUTER.map((n, i) => {
        const a = polar(cx, cy, outerR, n.angle);
        const b = polar(cx, cy, outerR, OUTER[(i + 1) % OUTER.length].angle);
        return (
          <line
            key={`ring-${i}`}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="#2563eb"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        );
      })}

      {/* Cross-ring connections */}
      {[0, 2, 4].map((i) => {
        const a = polar(cx, cy, outerR, OUTER[i].angle);
        const b = polar(cx, cy, outerR, OUTER[(i + 3) % OUTER.length].angle);
        return (
          <line
            key={`cross-${i}`}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="#2563eb"
            strokeOpacity={0.05}
            strokeWidth={1}
          />
        );
      })}

      {/* Inner connections */}
      {INNER.map((n, i) => {
        const p = polar(cx, cy, innerR, n.angle);
        return (
          <line
            key={`inner-c-${n.label}`}
            x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke="#2563eb"
            strokeOpacity={0.2}
            strokeWidth={1}
          />
        );
      })}

      {/* Outer nodes */}
      <g className="outer-ring">
        {OUTER.map((n, i) => {
          const p = polar(cx, cy, outerR, n.angle);
          return (
            <g key={n.label} style={nodeStyle(i)}>
              <circle cx={p.x} cy={p.y} r={18} fill="url(#ng)" />
              <circle
                cx={p.x} cy={p.y} r={7}
                fill="none"
                stroke="#2563eb"
                strokeWidth={1.5}
                strokeOpacity={0.5}
                filter="url(#glow)"
              >
                <animate attributeName="strokeOpacity" values="0.5;0.8;0.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={p.x} cy={p.y} r={3} fill="#2563eb" opacity={0.8} />
              <text x={p.x} y={p.y + 26} textAnchor="middle" fill="#71717a" fontSize={9} fontFamily="Outfit, sans-serif" letterSpacing="0.1em">
                {n.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* Inner nodes */}
      {INNER.map((n, i) => {
        const p = polar(cx, cy, innerR, n.angle);
        return (
          <g key={n.label} style={nodeStyle(i + 6)}>
            <circle cx={p.x} cy={p.y} r={14} fill="url(#ng)" />
            <circle
              cx={p.x} cy={p.y} r={5}
              fill="none"
              stroke="#2563eb"
              strokeWidth={1.5}
              strokeOpacity={0.6}
              filter="url(#glow)"
            >
              <animate attributeName="strokeOpacity" values="0.6;1;0.6" dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={p.x} cy={p.y} r={2.5} fill="#2563eb" opacity={0.9} />
            <text x={p.x} y={p.y + 18} textAnchor="middle" fill="#52525b" fontSize={8} fontFamily="Outfit, sans-serif" letterSpacing="0.1em">
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Center core */}
      <g>
        <circle cx={cx} cy={cy} r={60} fill="url(#ng)" />
        <circle
          cx={cx} cy={cy} r={28}
          fill="none"
          stroke="#2563eb"
          strokeWidth={2.5}
          strokeOpacity={0.8}
          filter="url(#softGlow)"
        >
          <animate attributeName="r" values="28;32;28" dur="3s" repeatCount="indefinite" />
          <animate attributeName="strokeOpacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle
          cx={cx} cy={cy} r={12}
          fill="#2563eb"
          opacity={1}
          filter="url(#glow)"
        >
          <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r={4} fill="#fff" opacity={0.9} />
        <text x={cx} y={cy + 38} textAnchor="middle" fill="#2563eb" fontSize={10} fontFamily="Outfit, sans-serif" fontWeight={700} letterSpacing="0.15em">
          CORE
        </text>
      </g>

      {/* Animated pulse rings */}
      <circle cx={cx} cy={cy} r={34} fill="none" stroke="#2563eb" strokeWidth={1} opacity={0.3}>
        <animate attributeName="r" values="34;55;34" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={38} fill="none" stroke="#2563eb" strokeWidth={0.5} opacity={0.2}>
        <animate attributeName="r" values="38;65;38" dur="3s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx={cx} cy={cy} r={42} fill="none" stroke="#2563eb" strokeWidth={0.3} opacity={0.15}>
        <animate attributeName="r" values="42;80;42" dur="3.5s" repeatCount="indefinite" begin="1s" />
        <animate attributeName="opacity" values="0.15;0;0.15" dur="3.5s" repeatCount="indefinite" begin="1s" />
      </circle>

      {/* Orbiting satellite node */}
      <g className="orbit-group">
        <circle cx={cx + outerR + 35} cy={cy} r={4} fill="#2563eb" opacity={0.6} filter="url(#glow)" />
      </g>
    </svg>
  );
}
