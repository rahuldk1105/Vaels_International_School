'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function LuxuryCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [onDark, setOnDark] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Outer ring — floaty lag
  const ringX = useSpring(mouseX, { stiffness: 88, damping: 22, mass: 0.55 });
  const ringY = useSpring(mouseY, { stiffness: 88, damping: 22, mass: 0.55 });

  // Inner dot — tight follow
  const dotX = useSpring(mouseX, { stiffness: 360, damping: 30, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 360, damping: 30, mass: 0.2 });

  useEffect(() => {
    setMounted(true);
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      // Detect dark backgrounds
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (el) {
        const bg = window.getComputedStyle(el).backgroundColor;
        const isDark =
          el.closest('[data-dark-section]') !== null ||
          bg.includes('15, 37, 72') || // #0F2548
          bg.includes('26, 60, 110');  // #1A3C6E
        setOnDark(isDark);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, [role="button"], .perspective-card, [data-cursor-hover]'
      );
      setHovering(!!target);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isTouch) return null;

  const goldColor = onDark
    ? 'rgba(212, 175, 55, 0.85)'
    : 'rgba(212, 175, 55, 0.65)';
  const ringSize = hovering ? 52 : 36;
  const ringBg = hovering
    ? onDark
      ? 'rgba(212, 175, 55, 0.1)'
      : 'rgba(212, 175, 55, 0.07)'
    : 'transparent';

  return (
    <>
      {/* Inject cursor:none globally while mounted */}
      <style>{`
        body, body * { cursor: none !important; }
      `}</style>

      {/* ── Outer ring ─────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 99998,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.72 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { type: 'spring', stiffness: 340, damping: 22 },
        }}
      >
        <motion.div
          animate={{ width: ringSize, height: ringSize }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          style={{
            borderRadius: '50%',
            border: `1px solid ${goldColor}`,
            background: ringBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: hovering ? 'blur(1px)' : 'none',
          }}
        >
          {/* Subtle inner glow ring */}
          <motion.div
            animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.5 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '50%',
              border: '1px solid rgba(212, 175, 55, 0.22)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Inner dot ──────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 99999,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
        animate={{
          opacity: visible && !hovering ? 1 : 0,
          scale: clicking ? 0.5 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { type: 'spring', stiffness: 400, damping: 26 },
        }}
      >
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#D4AF37',
            boxShadow: '0 0 6px rgba(212,175,55,0.6)',
          }}
        />
      </motion.div>

      {/* ── Click ripple ───────────────────────────────────────────────── */}
      {clicking && (
        <motion.div
          aria-hidden="true"
          initial={{ scale: 0.6, opacity: 0.45 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
            zIndex: 99997,
            pointerEvents: 'none',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid rgba(212,175,55,0.5)',
          }}
        />
      )}
    </>
  );
}
