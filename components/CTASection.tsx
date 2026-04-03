'use client';

import { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Link from 'next/link';

// ─── Animated Geometric Background ───────────────────────────────────────────

function GeometricBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
      {/* Slow-rotating diagonal lines */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '140%',
          height: '140%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.035,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #1A3C6E, transparent)',
              transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* Pulsing concentric rings */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.06, 0.02, 0.06],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.6,
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${60 + i * 20}%`,
            height: `${60 + i * 20}%`,
            borderRadius: '50%',
            border: '1px solid rgba(26, 60, 110, 0.4)',
          }}
        />
      ))}

      {/* Gold accent arc — top right */}
      <svg
        style={{ position: 'absolute', top: '-10%', right: '-5%', width: '40%', opacity: 0.08 }}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="300" cy="0" r="200" stroke="#D4AF37" strokeWidth="1" fill="none" />
        <circle cx="300" cy="0" r="150" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
        <circle cx="300" cy="0" r="100" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
      </svg>

      {/* Bottom-left subtle fill */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '35%',
        height: '50%',
        background: 'radial-gradient(ellipse at bottom left, rgba(26, 60, 110, 0.07) 0%, transparent 65%)',
      }} />
    </div>
  );
}

// ─── CTA Buttons ──────────────────────────────────────────────────────────────

function PrimaryCtaButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 360, damping: 22 }}
      style={{ display: 'inline-block' }}
    >
      <Link
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          letterSpacing: '0.1em',
          fontWeight: 500,
          color: hovered ? '#0F2548' : '#F8F6F2',
          background: hovered
            ? 'linear-gradient(135deg, #C9A227 0%, #E8CC6A 50%, #D4AF37 100%)'
            : '#1A3C6E',
          border: `1.5px solid ${hovered ? '#D4AF37' : 'rgba(212, 175, 55, 0.35)'}`,
          borderRadius: '100px',
          padding: '16px 36px',
          textDecoration: 'none',
          position: 'relative',
          overflow: 'hidden',
          transition: 'color 0.35s ease, background 0.35s ease, border-color 0.3s ease',
          boxShadow: hovered
            ? '0 0 36px rgba(212, 175, 55, 0.32), 0 8px 24px rgba(212, 175, 55, 0.16)'
            : '0 4px 28px rgba(26, 60, 110, 0.18)',
        }}
      >
        {/* Shine sweep */}
        <motion.span
          animate={{ x: hovered ? 260 : -80 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '60px', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)',
            transform: 'skewX(-15deg)',
            pointerEvents: 'none',
          }}
        />
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
        <motion.span
          animate={{ x: hovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 450, damping: 22 }}
          style={{ zIndex: 1, fontSize: '15px', display: 'inline-block' }}
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  );
}

function SecondaryCtaButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      style={{ display: 'inline-block' }}
    >
      <Link
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          letterSpacing: '0.1em',
          fontWeight: 400,
          color: hovered ? '#1A3C6E' : 'rgba(26, 60, 110, 0.72)',
          background: 'transparent',
          border: `1.5px solid ${hovered ? 'rgba(26, 60, 110, 0.5)' : 'rgba(26, 60, 110, 0.2)'}`,
          borderRadius: '100px',
          padding: '16px 36px',
          textDecoration: 'none',
          transition: 'color 0.3s ease, border-color 0.3s ease',
        }}
      >
        {children}
        <motion.span
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 430, damping: 22 }}
          style={{ fontSize: '14px', display: 'inline-block' }}
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  );
}

// ─── Motion Variants ─────────────────────────────────────────────────────────

const contentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const contentItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-8% 0px' });

  return (
    <section
      id="admissions"
      style={{
        background: '#E6F0FF',
        padding: 'clamp(96px, 12vw, 168px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <GeometricBackground />

      <div
        ref={sectionRef}
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          padding: '0 clamp(24px, 5vw, 80px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}
        >
          {/* Gold rule */}
          <motion.div
            variants={contentItemVariants}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              style={{
                width: '56px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                transformOrigin: 'center',
              }}
            />
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            variants={contentItemVariants}
            style={{ marginBottom: '20px' }}
          >
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10.5px',
              letterSpacing: '0.28em',
              fontWeight: 500,
              color: '#D4AF37',
              textTransform: 'uppercase',
            }}>
              Admissions Open · 2025–26
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2 variants={contentItemVariants} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 5vw, 70px)',
            fontWeight: 600,
            color: '#1A3C6E',
            lineHeight: 1.04,
            letterSpacing: '-0.015em',
            margin: '0 0 20px 0',
          }}>
            Admissions Open
            <br />
            <span style={{ fontStyle: 'italic', color: '#0F2548' }}>for 2025–26.</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p variants={contentItemVariants} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(14px, 1.2vw, 17px)',
            fontWeight: 300,
            color: 'rgba(26, 60, 110, 0.6)',
            lineHeight: 1.7,
            margin: '0 0 44px 0',
          }}>
            Connect with us to begin your child's journey at Vaels.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={contentItemVariants}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}
          >
            <PrimaryCtaButton href="#admissions">Enquire Now</PrimaryCtaButton>
            <SecondaryCtaButton href="#campus">Book a Visit</SecondaryCtaButton>
          </motion.div>

          {/* Fine print */}
          <motion.p
            variants={contentItemVariants}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'rgba(26, 60, 110, 0.35)',
              margin: '28px 0 0 0',
              lineHeight: 1.6,
            }}
          >
            Cambridge · CISCE · KKIC · Chennai, India
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
