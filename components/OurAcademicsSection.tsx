'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ─── Campus Data ──────────────────────────────────────────────────────────────

const CAMPUSES = [
  {
    id: 'pre-school',
    label: 'Pre School',
    location: 'Neelankarai',
    title: 'Pre School\n— Neelankarai',
    bg: '#1A3C6E',
    textOnBg: '#F8F6F2',
    imageRight: true,
  },
  {
    id: 'high-school',
    label: 'High School',
    location: 'Injambakkam',
    title: 'High School\n— Injambakkam',
    bg: '#F8F6F2',
    textOnBg: '#1A3C6E',
    imageRight: false,
  },
] as const;

// ─── Campus Card ──────────────────────────────────────────────────────────────

interface CampusCardProps {
  campus: (typeof CAMPUSES)[number];
  index: number;
}

function CampusCard({ campus, index }: CampusCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-7% 0px' });
  const fromLeft = !campus.imageRight;

  const dur = [0.88, 0.92][index] ?? 0.9;

  const textVariants: Variants = {
    hidden: { opacity: 0, x: fromLeft ? 44 : -44, filter: 'blur(8px)' },
    visible: {
      opacity: 1, x: 0, filter: 'blur(0px)',
      transition: { duration: dur, ease: [0.22, 1, 0.36, 1], delay: 0.12 },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: fromLeft ? -44 : 44, filter: 'blur(8px)' },
    visible: {
      opacity: 1, x: 0, filter: 'blur(0px)',
      transition: { duration: dur, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const textColOrder = campus.imageRight ? 0 : 1;
  const imageColOrder = campus.imageRight ? 1 : 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 8px 48px rgba(26, 60, 110, 0.1)',
        minHeight: 'clamp(320px, 38vw, 440px)',
      }}
    >
      {/* Text Panel */}
      <motion.div
        variants={textVariants}
        style={{
          background: campus.bg,
          padding: 'clamp(40px, 5vw, 72px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
          order: textColOrder,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative corner accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '80px',
            height: '80px',
            opacity: 0.06,
            background: 'radial-gradient(circle at top right, #D4AF37, transparent)',
          }}
          aria-hidden="true"
        />

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '24px', height: '1px', background: '#D4AF37', flexShrink: 0 }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.24em',
            fontWeight: 500,
            color: '#D4AF37',
            textTransform: 'uppercase',
          }}>
            {campus.label}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(28px, 3.2vw, 46px)',
          fontWeight: 600,
          color: campus.textOnBg,
          lineHeight: 1.08,
          letterSpacing: '-0.01em',
          margin: 0,
          whiteSpace: 'pre-line',
        }}>
          {campus.title.split('\n').map((line, i) => (
            <span key={i} style={i === 1 ? { fontStyle: 'italic', display: 'block' } : { display: 'block' }}>
              {line}
            </span>
          ))}
        </h3>

        {/* Location badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: campus.bg === '#1A3C6E'
            ? 'rgba(248, 246, 242, 0.06)'
            : 'rgba(26, 60, 110, 0.05)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '100px',
          padding: '8px 16px',
          alignSelf: 'flex-start',
          marginTop: '4px',
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#D4AF37',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.12em',
            fontWeight: 500,
            color: '#D4AF37',
          }}>
            {campus.location}
          </span>
        </div>
      </motion.div>

      {/* Image Placeholder Panel */}
      <motion.div
        variants={imageVariants}
        style={{
          position: 'relative',
          order: imageColOrder,
          minHeight: '300px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #DDE8F8 0%, #C8D8F0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Placeholder pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(26,60,110,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,60,110,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }} aria-hidden="true" />
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          opacity: 0.4,
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            border: '2px solid #1A3C6E',
          }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.16em',
            color: '#1A3C6E',
            textTransform: 'uppercase',
          }}>
            Image
          </span>
        </div>
        {/* Colour grade overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(26,60,110,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      </motion.div>
    </motion.div>
  );
}

// ─── Header Variants ──────────────────────────────────────────────────────────

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OurAcademicsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-5% 0px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-5% 0px' });

  return (
    <section
      id="academics"
      style={{
        background: 'linear-gradient(to bottom, #F2F4F8 0%, #F8F6F2 clamp(48px,6vw,80px), #F8F6F2 100%)',
        padding: 'clamp(32px, 4vw, 48px) 0',
        overflow: 'hidden',
      }}
    >
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
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10.5px',
              letterSpacing: '0.28em',
              fontWeight: 500,
              color: '#D4AF37',
              textTransform: 'uppercase',
            }}>
              Campus Locations
            </span>
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </motion.div>

          <motion.h2
            variants={headerItemVariants}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(38px, 4.5vw, 62px)',
              fontWeight: 600,
              color: '#1A3C6E',
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              margin: '0 auto',
              maxWidth: '520px',
            }}
          >
            Our{' '}
            <span style={{ fontStyle: 'italic', color: '#0F2548' }}>Academics</span>
          </motion.h2>
        </motion.div>

        {/* Campus Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 2.5vw, 32px)' }}>
          {CAMPUSES.map((campus, index) => (
            <CampusCard key={campus.id} campus={campus} index={index} />
          ))}
        </div>

        {/* Explore More CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 16 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: 'clamp(48px, 5vw, 64px)' }}
        >
          <button
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.22em',
              fontWeight: 500,
              color: '#F8F6F2',
              textTransform: 'uppercase',
              background: '#1A3C6E',
              border: '1px solid #1A3C6E',
              borderRadius: '100px',
              padding: '14px 40px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#0F2548';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#0F2548';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#1A3C6E';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#1A3C6E';
            }}
          >
            Explore More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
