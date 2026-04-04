'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoadOverlay() {
  const [loading, setLoading] = useState(true);
  const [lineComplete, setLineComplete] = useState(false);

  useEffect(() => {
    // Mark line complete slightly before dismissal so it fully fills
    const lineTimer = setTimeout(() => setLineComplete(true), 1400);
    const exitTimer = setTimeout(() => setLoading(false), 1900);
    return () => {
      clearTimeout(lineTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            background: '#0F2548',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
            overflow: 'hidden',
          }}
        >
          {/* ── Ambient radial glow ──────────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60vw',
              height: '60vh',
              background:
                'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 68%)',
              pointerEvents: 'none',
            }}
          />

          {/* ── VAELS Wordmark ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 22, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
          >
            {/* Logo star */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M18 2L21.5 9.5L30 10.5L24 16.5L25.5 25L18 21L10.5 25L12 16.5L6 10.5L14.5 9.5L18 2Z"
                  fill="#D4AF37"
                  fillOpacity="0.92"
                />
                <path
                  d="M18 6.5L20.8 12L27 12.7L22.5 17L23.7 23.2L18 20.2L12.3 23.2L13.5 17L9 12.7L15.2 12L18 6.5Z"
                  fill="#F5E9B8"
                  fillOpacity="0.55"
                />
              </svg>
            </motion.div>

            {/* VAELS */}
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(44px, 8vw, 64px)',
                fontWeight: 700,
                letterSpacing: '0.38em',
                color: '#D4AF37',
                lineHeight: 1,
                marginBottom: '10px',
              }}
            >
              VAELS
            </div>

            {/* Tagline */}
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '9px',
                letterSpacing: '0.32em',
                color: 'rgba(248, 246, 242, 0.38)',
                fontWeight: 400,
                textTransform: 'uppercase',
              }}
            >
              International School
            </div>
          </motion.div>

          {/* ── Gold progress line ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.4 }}
            style={{
              width: '140px',
              height: '1px',
              background: 'rgba(212, 175, 55, 0.12)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '1px',
            }}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: lineComplete ? '0%' : '-4%' }}
              transition={{
                duration: lineComplete ? 0.18 : 1.1,
                ease: lineComplete ? 'easeOut' : [0.22, 1, 0.36, 1],
                delay: lineComplete ? 0 : 0.68,
              }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, #C9A227 0%, #F5E9B8 50%, #D4AF37 100%)',
                boxShadow: '0 0 10px rgba(212,175,55,0.55)',
              }}
            />
          </motion.div>

          {/* ── Est. tagline ─────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.55 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '13px',
              fontStyle: 'italic',
              color: 'rgba(248, 246, 242, 0.22)',
              letterSpacing: '0.08em',
              margin: 0,
            }}
          >
            Est. 1992 · Chennai, India
          </motion.p>

          {/* ── Decorative arcs ──────────────────────────────────────── */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '380px',
              height: '380px',
              pointerEvents: 'none',
            }}
          >
            <svg viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <motion.circle
                cx="190" cy="190" r="170"
                stroke="rgba(212,175,55,0.07)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              />
              <motion.circle
                cx="190" cy="190" r="140"
                stroke="rgba(212,175,55,0.05)"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              />
              <motion.circle
                cx="190" cy="190" r="105"
                stroke="rgba(212,175,55,0.04)"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.68 }}
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
