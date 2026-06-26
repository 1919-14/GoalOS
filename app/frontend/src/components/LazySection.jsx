import { useEffect, useRef, useState } from 'react';

export default function LazySection({ children, className, style, rootMargin = '200px', minHeight = '300px' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={{ minHeight, ...style }}>
      {visible ? (
        children
      ) : (
        <div style={{ padding: '2rem 4rem' }}>
          <div className="skeleton-shimmer" style={{ width: '120px', height: '20px', marginBottom: '1rem' }} />
          <div className="skeleton-shimmer" style={{ width: '70%', height: '40px', marginBottom: '1.5rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="skeleton-shimmer" style={{ height: '200px' }} />
            <div className="skeleton-shimmer" style={{ height: '200px' }} />
          </div>
        </div>
      )}
    </div>
  );
}
