'use client';

import { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

// ─── Facility Data ────────────────────────────────────────────────────────────

const FACILITIES = [
  {
    id: 'classrooms',
    label: 'AC Classrooms',
    image: 'https://images.pexels.com/photos/8423433/pexels-photo-8423433.jpeg?auto=compress&cs=tinysrgb&w=1200&q=85',
    alt: 'AC Classrooms — Vaels International School',
    gridArea: 'classrooms',
    focalPos: 'center 30%',
  },
  {
    id: 'labs',
    label: 'Laboratories',
    image: 'https://images.pexels.com/photos/6129872/pexels-photo-6129872.jpeg?auto=compress&cs=tinysrgb&w=1200&q=85',
    alt: 'Laboratories — Vaels International School',
    gridArea: 'labs',
    focalPos: 'center 40%',
  },
  {
    id: 'boards',
    label: 'Interactive Boards',
    image: 'https://images.unsplash.com/photo-1681949098572-0004d05d6363?w=1200&q=85&auto=format&fit=crop',
    alt: 'Interactive Boards — Vaels International School',
    gridArea: 'boards',
    focalPos: 'center 35%',
  },
  {
    id: 'auditorium',
    label: 'AC Auditorium',
    image: 'https://images.unsplash.com/photo-1643199032520-99230e970fb9?w=1200&q=85&auto=format&fit=crop',
    alt: 'AC Auditorium — Vaels International School',
    gridArea: 'auditorium',
    focalPos: 'center 25%',
  },
  {
    id: 'library',
    label: 'Library',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=85&auto=format&fit=crop',
    alt: 'Library — Vaels International School',
    gridArea: 'library',
    focalPos: 'center 30%',
  },
  {
    id: 'pool',
    label: 'Swimming Pool',
    image: 'https://images.unsplash.com/photo-1558617320-e695f0d420de?w=1200&q=85&auto=format&fit=crop',
    alt: 'Swimming Pool — Vaels International School',
    gridArea: 'pool',
    focalPos: 'center 40%',
  },
  {
    id: 'cinema',
    label: 'Pride Cinema',
    image: 'https://images.unsplash.com/photo-1583343674297-d1bad99b5b47?w=1200&q=85&auto=format&fit=crop',
    alt: 'Pride Cinema — Vaels International School',
    gridArea: 'cinema',
    focalPos: 'center 35%',
  },
] as const;

// ─── Facility Tile ─────────────────────────────────────────────────────────────

interface FacilityTileProps {
  facility: (typeof FACILITIES)[number];
  inView: boolean;
  index: number;
}

const DELAYS = [0.08, 0.17, 0.13, 0.20, 0.11, 0.24, 0.16];

function FacilityTile({ facility, inView, index }: FacilityTileProps) {
  const [hovered, setHovered] = useState(false);
  const delay = DELAYS[index] ?? 0.1 + index * 0.08;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'default',
        gridArea: facility.gridArea,
      }}
    >
      {/* Image with subtle zoom on hover */}
      <motion.div
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Image
          src={facility.image}
          alt={facility.alt}
          fill
          quality={85}
          className="object-cover"
          style={{ objectPosition: facility.focalPos }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Base gradient always present for legibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 37, 72, 0.72) 0%, rgba(15, 37, 72, 0.18) 55%, transparent 100%)',
        }} />
      </motion.div>

      {/* Hover overlay intensification */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(26, 60, 110, 0.82) 0%, rgba(26, 60, 110, 0.3) 100%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Label + hover arrow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 'clamp(16px, 2vw, 24px) clamp(18px, 2.2vw, 26px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(11px, 1vw, 13px)',
          letterSpacing: '0.14em',
          fontWeight: 500,
          color: '#F8F6F2',
          textTransform: 'uppercase',
        }}>
          {facility.label}
        </span>
        <motion.span
          animate={{ x: hovered ? 0 : 6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: '#D4AF37', fontSize: '16px', lineHeight: 1 }}
          aria-hidden="true"
        >
          →
        </motion.span>
      </div>

      {/* Gold top accent (visible on hover) */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.4, scaleX: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #D4AF37, rgba(212, 175, 55, 0.2))',
          transformOrigin: 'left',
        }}
        aria-hidden="true"
      />
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

  const gridInView = useInView(sectionRef, { once: true, margin: '-6% 0px' });
  const headerInView = useInView(headerRef, { once: true, margin: '-5% 0px' });

  return (
    <section
      id="facilities"
      style={{
        background: 'linear-gradient(to bottom, #F8F6F2 0%, #F2F4F8 clamp(48px,6vw,80px), #F2F4F8 100%)',
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

        {/* Bento Grid */}
        <div
          ref={sectionRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'clamp(220px, 28vw, 340px) clamp(180px, 22vw, 270px)',
            gridTemplateAreas: `
              "classrooms classrooms labs    boards  "
              "auditorium library    pool    cinema  "
            `,
            gap: 'clamp(24px, 2vw, 32px)',
          }}
          className="facilities-bento"
        >
          {FACILITIES.map((facility, index) => (
            <FacilityTile
              key={facility.id}
              facility={facility}
              inView={gridInView}
              index={index}
            />
          ))}
        </div>

        {/* Responsive overrides */}
        <style jsx global>{`
          @media (max-width: 1024px) {
            .facilities-bento {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-template-rows: auto !important;
              grid-template-areas:
                "classrooms classrooms"
                "labs        boards    "
                "auditorium  library   "
                "pool        cinema    " !important;
            }
          }
          @media (max-width: 600px) {
            .facilities-bento {
              grid-template-columns: 1fr !important;
              grid-template-areas:
                "classrooms"
                "labs"
                "boards"
                "auditorium"
                "library"
                "pool"
                "cinema" !important;
            }
          }
          .facilities-bento > * {
            min-height: 200px;
          }
        `}</style>
      </div>
    </section>
  );
}
