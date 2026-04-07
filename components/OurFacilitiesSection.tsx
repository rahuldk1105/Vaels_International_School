'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ─── Facility Data ────────────────────────────────────────────────────────────

const FACILITIES = [
  { id: 'ac-classrooms',     label: 'AC Classrooms' },
  { id: 'laboratories',      label: 'Laboratories' },
  { id: 'interactive-boards',label: 'Interactive Boards' },
  { id: 'ac-auditorium',     label: 'AC Auditorium' },
  { id: 'library',           label: 'Library' },
  { id: 'swimming-pool',     label: 'Swimming Pool' },
  { id: 'pride-cinema',      label: 'Pride Cinema' },
] as const;

// ─── Facility Tile ────────────────────────────────────────────────────────────

interface FacilityTileProps {
  label: string;
  index: number;
  inView: boolean;
}

function FacilityTile({ label, index, inView }: FacilityTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: 28, filter: 'blur(6px)' }
      }
      transition={{
        duration: 0.72,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.18 + index * 0.08,
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: 'clamp(22px, 2.5vw, 32px) clamp(20px, 2vw, 28px)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(26, 60, 110, 0.07)',
        cursor: 'default',
        transition: 'box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Gold top border accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #D4AF37, rgba(212, 175, 55, 0.2))',
        }}
        aria-hidden="true"
      />

      {/* Number badge */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04))',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '13px',
            fontWeight: 600,
            color: '#D4AF37',
            lineHeight: 1,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(13px, 1.1vw, 15px)',
          fontWeight: 500,
          color: '#1A3C6E',
          letterSpacing: '0.02em',
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ─── Header Variants ──────────────────────────────────────────────────────────

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OurFacilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-6% 0px' });
  const headerInView = useInView(headerRef, { once: true, margin: '-5% 0px' });

  return (
    <section
      id="facilities"
      style={{
        background: 'linear-gradient(to bottom, #F8F6F2 0%, #F2F4F8 clamp(48px,6vw,80px), #F2F4F8 100%)',
        padding: 'clamp(80px, 10vw, 140px) 0',
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
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}
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
              Campus Infrastructure
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
              maxWidth: '540px',
            }}
          >
            Our{' '}
            <span style={{ fontStyle: 'italic', color: '#0F2548' }}>Facilities</span>
          </motion.h2>
        </motion.div>

        {/* Facility Tiles Grid */}
        <div
          ref={sectionRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(12px, 1.5vw, 18px)',
          }}
        >
          {FACILITIES.map((facility, index) => (
            <FacilityTile
              key={facility.id}
              label={facility.label}
              index={index}
              inView={sectionInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
