import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const onMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const loop = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = dotX + 'px';
        dotRef.current.style.top = dotY + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top = ringY + 'px';
      }
      raf = requestAnimationFrame(loop);
    };

    const onEnter = (e) => {
      const el = e.target;
      if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.classList.contains('cursor-hover') ||
        el.closest('a') ||
        el.closest('button')
      ) {
        setHovered(true);
      }
    };

    const onLeave = () => setHovered(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onEnter, { passive: true });
    document.addEventListener('mouseout', onLeave, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovered ? 'hovered' : ''}`} />
    </>
  );
}
