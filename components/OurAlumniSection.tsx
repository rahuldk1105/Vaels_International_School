'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ─── Alumni Data ──────────────────────────────────────────────────────────────

const ALUMNI = [
  {
    id: 'shahana',
    name: 'Shahana Yusuf',
    university: 'UCL',
    country: 'UK',
    image: '/images/sahana yusuf.webp',
  },
  {
    id: 'nikhil',
    name: 'Nikhil',
    university: 'University of Real Madrid',
    country: 'Spain',
    image: '/images/nikil.webp',
  },
  {
    id: 'sakthi',
    name: 'Sakthi Suresh Kumar',
    university: 'Medical College',
    country: 'Chengalpattu',
    image: '/images/sakthi suresh kumar.webp',
  },
  {
    id: 'vamsidhar',
    name: 'Vamsidhar Krishnan',
    university: 'University of Leed',
    country: 'United Kingdom',
    image: '/images/vamsidhar krishnan.webp',
  },
] as const;

// ─── Alumni Card ──────────────────────────────────────────────────────────────

interface AlumniCardProps {
  alumnus: (typeof ALUMNI)[number];
  index: number;
  inView: boolean;
}

function AlumniCard({ alumnus, index, inView }: AlumniCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.28 + index * 0.13 }}
      style={{
        background: 'rgba(248, 246, 242, 0.055)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(212, 175, 55, 0.15)',
        borderTop: '2px solid rgba(212, 175, 55, 0.45)',
        borderRadius: '20px',
        padding: 'clamp(24px, 2.5vw, 36px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        textAlign: 'center',
      }}
    >
      {/* Alumni avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 + index * 0.13 }}
        style={{
          width: 'clamp(72px, 8vw, 96px)',
          height: 'clamp(72px, 8vw, 96px)',
          borderRadius: '50%',
          border: '2px solid rgba(212, 175, 55, 0.45)',
          overflow: 'hidden',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <img
          src={alumnus.image}
          alt={alumnus.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </motion.div>

      {/* Name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(18px, 1.8vw, 22px)',
          fontWeight: 600,
          color: '#F8F6F2',
          letterSpacing: '0.01em',
          lineHeight: 1.15,
        }}>
          {alumnus.name}
        </span>

        {/* University */}
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(12px, 1vw, 14px)',
          fontWeight: 400,
          color: '#D4AF37',
          letterSpacing: '0.04em',
        }}>
          {alumnus.university}
        </span>

        {/* Country/Location */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '2px' }}>
          <div style={{ width: '16px', height: '1px', background: 'rgba(212, 175, 55, 0.4)' }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 300,
            color: 'rgba(248, 246, 242, 0.45)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {alumnus.country}
          </span>
          <div style={{ width: '16px', height: '1px', background: 'rgba(212, 175, 55, 0.4)' }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section Variants ─────────────────────────────────────────────────────────

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OurAlumniSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-5% 0px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-5% 0px' });

  return (
    <section
      id="our-alumni"
      data-dark-section="true"
      style={{
        background: 'linear-gradient(160deg, #1A3C6E 0%, #0F2548 100%)',
        padding: 'clamp(48px, 6vw, 64px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw',
        height: '60%',
        background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Background noise */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px',
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 clamp(24px, 5vw, 80px)' }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 5vw, 64px)' }}
        >
          <motion.div
            variants={headerItemVariants}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}
          >
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6))' }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10.5px',
              letterSpacing: '0.28em',
              fontWeight: 500,
              color: 'rgba(212, 175, 55, 0.7)',
              textTransform: 'uppercase',
            }}>
              Alumni Stories
            </span>
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.6), transparent)' }} />
          </motion.div>

          <motion.h2
            variants={headerItemVariants}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(38px, 4.5vw, 62px)',
              fontWeight: 600,
              color: '#F8F6F2',
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              margin: '0 auto',
              maxWidth: '560px',
              textTransform: 'uppercase',
            }}
          >
            Our{' '}
            <span style={{ fontStyle: 'italic', color: '#D4AF37' }}>Alumni</span>
          </motion.h2>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)',
            marginBottom: 'clamp(48px, 5vw, 64px)',
            transformOrigin: 'center',
          }}
          aria-hidden="true"
        />

        {/* Alumni Cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(24px, 2vw, 32px)',
          }}
        >
          {ALUMNI.map((alumnus, i) => (
            <AlumniCard
              key={alumnus.id}
              alumnus={alumnus}
              index={i}
              inView={cardsInView}
            />
          ))}
        </div>

        {/* Know More CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 16 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 'clamp(48px, 5vw, 64px)' }}
        >
          <button
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.26em',
              fontWeight: 500,
              color: '#D4AF37',
              textTransform: 'uppercase',
              background: 'transparent',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '100px',
              padding: '14px 40px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212, 175, 55, 0.12)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212, 175, 55, 0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212, 175, 55, 0.4)';
            }}
          >
            Know More...
          </button>
        </motion.div>
      </div>
    </section>
  );
}
