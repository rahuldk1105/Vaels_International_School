'use client';

import { useEffect } from 'react';

/**
 * ScrollProgressBar
 * Injects a thin gold horizontal bar at the very top of the viewport
 * that fills as the user scrolls down the page.
 * Uses a CSS custom-property on <html> so there's zero layout reflow.
 */
export default function ScrollProgressBar() {
  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      root.style.setProperty('--scroll-progress', `${pct.toFixed(2)}%`);
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // initialise
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <div className="scroll-progress-bar" aria-hidden="true" />;
}
