'use client';

import { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

// ─── Bento Tile Data ──────────────────────────────────────────────────────────

const TILES = [
  {
    id: 'library',
    label: 'Library & Grand Hall',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&q=85&auto=format&fit=crop',
    alt: 'Vaels library and grand hall',
    gridArea: 'library',
    isStat: false,
  },
  {
    id: 'sports',
    label: 'Sports Complex',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85&auto=format&fit=crop',
    alt: 'Vaels sports complex',
    gridArea: 'sports',
    isStat: false,
  },
  {
    id: 'labs',
    label: 'Science & Innovation Labs',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=85&auto=format&fit=crop',
    alt: 'Vaels science labs',
    gridArea: 'labs',
    isStat: false,
  },
  {
    id: 'stat',
    label: '',
    image: '',
    alt: '',
    gridArea: 'stat',
    isStat: true,
  },
  {
    id: 'arts',
    label: 'Performing Arts Centre',
    image: 'https://images.unsplash.com/photo-1467703834117-04386e3dadd8?w=900&q=85&auto=format&fit=crop',
    alt: 'Vaels performing arts centre',
    gridArea: 'arts',
    isStat: false,
  },
] as const;

// ─── Image Tile ───────────────────────────────────────────────────────────────

interface ImageTileProps {
  tile: Exclude<(typeof TILES)[number], { isStat: true }>;
  inView: boolean;
  index: number;
}

function ImageTile({ tile, inView, index }: ImageTileProps) {
  const [hovered, setHovered] = useState(false);

  // Non-uniform delays: each tile has a slightly different rhythm
  const DELAYS = [0.08, 0.17, 0.11, 0.22, 0.14];
  const delay = DELAYS[index] ?? 0.1 + index * 0.09;

  // Per-tile object-position for better image focal framing
  const FOCAL_POSITIONS: Record<string, string> = {
    library: 'center 25%',
    sports:  'center 30%',
    labs:    'center 40%',
    arts:    'center 35%',
  };
  const focalPos = FOCAL_POSITIONS[tile.gridArea] ?? 'center';

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
        gridArea: tile.gridArea,
      }}
    >
      {/* Image with subtle zoom */}
      <motion.div
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Image
          src={tile.image}
          alt={tile.alt}
          fill
          quality={85}
          className="object-cover"
          style={{ objectPosition: focalPos }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Base gradient always present for legibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 37, 72, 0.62) 0%, transparent 50%)',
        }} />
      </motion.div>

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(26, 60, 110, 0.75) 0%, rgba(26, 60, 110, 0.25) 100%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Label */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px 22px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          letterSpacing: '0.12em',
          fontWeight: 500,
          color: '#F8F6F2',
          textTransform: 'uppercase',
        }}>
          {tile.label}
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
    </motion.div>
  );
}

// ─── Stat Tile ────────────────────────────────────────────────────────────────

function StatTile({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      style={{
        background: 'linear-gradient(145deg, #1A3C6E 0%, #0F2548 100%)',
        borderRadius: '20px',
        padding: 'clamp(28px, 3vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '12px',
        gridArea: 'stat',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '160px',
        opacity: 0.035,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      <div style={{
        width: '32px',
        height: '1px',
        background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.2))',
        marginBottom: '4px',
      }} />

      <div style={{
        fontFamily: "'DM Mono', 'Courier New', monospace",
        fontSize: 'clamp(36px, 4vw, 52px)',
        fontWeight: 700,
        color: '#F8F6F2',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        28
        <span style={{ color: '#D4AF37', fontSize: '0.55em', marginLeft: '3px' }}>Acres</span>
      </div>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 'clamp(12px, 1vw, 14px)',
        fontWeight: 300,
        color: 'rgba(248, 246, 242, 0.6)',
        lineHeight: 1.6,
        margin: 0,
      }}>
        of purposefully designed<br />learning space.
      </p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

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

export default function CampusExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const gridInView = useInView(sectionRef, { once: true, margin: '-6% 0px' });
  const headerInView = useInView(headerRef, { once: true, margin: '-5% 0px' });

  return (
    <section
      id="campus"
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
              Campus Life
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
            Spaces that inspire
            <br />
            <span style={{ fontStyle: 'italic', color: '#0F2548' }}>before the lesson begins.</span>
          </motion.h2>
        </motion.div>

        {/* Bento Grid */}
        <div
          ref={sectionRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'clamp(220px, 28vw, 340px) clamp(180px, 22vw, 280px)',
            gridTemplateAreas: `
              "library library sports"
              "labs    stat   arts  "
            `,
            gap: 'clamp(24px, 2vw, 32px)',
          }}
          className="campus-bento"
        >
          {TILES.map((tile, index) =>
            tile.isStat ? (
              <StatTile key={tile.id} inView={gridInView} />
            ) : (
              <ImageTile
                key={tile.id}
                tile={tile as Exclude<typeof tile, { isStat: true }>}
                inView={gridInView}
                index={index}
              />
            )
          )}
        </div>

        {/* Responsive override */}
        <style jsx global>{`
          @media (max-width: 768px) {
            .campus-bento {
              grid-template-columns: 1fr 1fr !important;
              grid-template-rows: auto !important;
              grid-template-areas:
                "library library"
                "sports  sports "
                "labs    labs   "
                "stat    arts   " !important;
            }
          }
          @media (max-width: 480px) {
            .campus-bento {
              grid-template-columns: 1fr !important;
              grid-template-areas:
                "library"
                "sports"
                "labs"
                "stat"
                "arts" !important;
            }
          }
          .campus-bento > * {
            min-height: 200px;
          }
        `}</style>
      </div>
    </section>
  );
}
