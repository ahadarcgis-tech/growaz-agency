import React, { useEffect, useRef } from 'react';

export function SpotlightDotBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    // We use requestAnimationFrame for smooth performance
    let animationFrameId;
    
    const handleMouseMove = (e) => {
      if (bgRef.current) {
        // Cancel any pending frame to avoid overlapping updates
        cancelAnimationFrame(animationFrameId);
        
        animationFrameId = requestAnimationFrame(() => {
          if (bgRef.current) {
            bgRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
            bgRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
          }
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={bgRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        // Intense, vivid dots with full opacity and larger size
        backgroundImage: 'radial-gradient(circle, rgba(232, 56, 13, 1) 2.5px, transparent 2.5px)',
        backgroundSize: '20px 20px',
        // Larger spotlight radius with sharper falloff for more intensity
        WebkitMaskImage: 'radial-gradient(circle 400px at var(--mouse-x, -100%) var(--mouse-y, -100%), black 0%, black 30%, transparent 100%)',
        maskImage: 'radial-gradient(circle 400px at var(--mouse-x, -100%) var(--mouse-y, -100%), black 0%, black 30%, transparent 100%)',
      }}
    />
  );
}
