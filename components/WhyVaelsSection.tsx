'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';

// ─── Pillar Icons (thin-line SVG paths) ───────────────────────────────────────

function IconGlobe({ animate }: { animate: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Outer circle */}
      <motion.circle
        cx="16" cy="16" r="13"
        stroke="#D4AF37" strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
      {/* Vertical ellipse (longitude) */}
      <motion.ellipse
        cx="16" cy="16" rx="6" ry="13"
        stroke="#D4AF37" strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      />
      {/* Horizontal latitude lines */}
      <motion.path
        d="M3.5 10 Q16 13 28.5 10"
        stroke="#D4AF37" strokeWidth="1.5"
        fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      />
      <motion.path
        d="M3.5 22 Q16 19 28.5 22"
        stroke="#D4AF37" strokeWidth="1.5"
        fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
      />
    </svg>
  );
}

function IconLeadership({ animate }: { animate: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Rising arrow */}
      <motion.path
        d="M6 24 L13 14 L19 18 L26 8"
        stroke="#D4AF37" strokeWidth="1.5"
        fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
      {/* Arrow head */}
      <motion.path
        d="M20 8 L26 8 L26 14"
        stroke="#D4AF37" strokeWidth="1.5"
        fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      />
      {/* Base line */}
      <motion.line
        x1="4" y1="28" x2="28" y2="28"
        stroke="#D4AF37" strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </svg>
  );
}

function IconAcademic({ animate }: { animate: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Open book left page */}
      <motion.path
        d="M16 8 C16 8 10 9 5 12 L5 26 C10 23 16 24 16 24"
        stroke="#D4AF37" strokeWidth="1.5"
        fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
      {/* Open book right page */}
      <motion.path
        d="M16 8 C16 8 22 9 27 12 L27 26 C22 23 16 24 16 24"
        stroke="#D4AF37" strokeWidth="1.5"
        fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      />
      {/* Spine */}
      <motion.line
        x1="16" y1="8" x2="16" y2="24"
        stroke="#D4AF37" strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      />
    </svg>
  );
}

function IconHolistic({ animate }: { animate: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Person figure */}
      <motion.circle
        cx="16" cy="8" r="3.5"
        stroke="#D4AF37" strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      />
      {/* Body */}
      <motion.path
        d="M16 12 L16 21"
        stroke="#D4AF37" strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
      {/* Arms spread wide */}
      <motion.path
        d="M8 16 L16 14 L24 16"
        stroke="#D4AF37" strokeWidth="1.5"
        fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      />
      {/* Legs */}
      <motion.path
        d="M16 21 L12 28 M16 21 L20 28"
        stroke="#D4AF37" strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      />
    </svg>
  );
}

// ─── Pillar Data ──────────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: 'global',
    title: 'A Passport for the Mind',
    eyebrow: 'Global Exposure',
    description:
      'Exchange programmes, international accreditations, and a campus culture where the world is the default reference point — not the exception.',
    Icon: IconGlobe,
  },
  {
    id: 'leadership',
    title: 'Leaders, Not Just Toppers',
    eyebrow: 'Leadership Development',
    description:
      'Our students run councils, launch ventures, represent nations. We build the instinct to lead before the title arrives.',
    Icon: IconLeadership,
  },
  {
    id: 'academic',
    title: 'Rigour Without Rigidity',
    eyebrow: 'Academic Excellence',
    description:
      'Three globally recognised curricula. Each demanding. Each deliberate. Each preparing a different kind of mind for a different kind of stage.',
    Icon: IconAcademic,
  },
  {
    id: 'holistic',
    title: 'The Whole Person',
    eyebrow: 'Holistic Growth',
    description:
      'Sport. Art. Music. Service. Because the universities — and the world — are done being impressed by just grades.',
    Icon: IconHolistic,
  },
] as const;

// ─── Pillar Card ──────────────────────────────────────────────────────────────

interface PillarCardProps {
  pillar: (typeof PILLARS)[number];
  index: number;
  sectionInView: boolean;
}

function PillarCard({ pillar, index, sectionInView }: PillarCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { Icon } = pillar;

  // Perspective tilt motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 220, damping: 28, mass: 0.6 };
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]), springCfg);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [4, -4]), springCfg);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  return (
    <div className="perspective-card" style={{ height: '100%' }}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
        animate={
          sectionInView
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: 36, filter: 'blur(8px)' }
        }
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.28 + index * 0.13,
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: '#ffffff',
          borderRadius: '20px',
          padding: 'clamp(28px, 3vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          boxShadow: hovered
            ? '0 28px 72px rgba(26, 60, 110, 0.16), 0 6px 20px rgba(26, 60, 110, 0.08)'
            : '0 4px 28px rgba(26, 60, 110, 0.07)',
          transition: 'box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        whileHover={{ y: -7 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gold top border accent */}
        <motion.div
          animate={{
            opacity: hovered ? 1 : 0.55,
            scaleX: hovered ? 1 : 0.45,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #D4AF37, rgba(212, 175, 55, 0.25))',
            transformOrigin: 'left',
          }}
          aria-hidden="true"
        />

        {/* Cursor-tracked radial spotlight */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '20px',
            background: 'radial-gradient(circle 160px at 50% 40%, rgba(212,175,55,0.065) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          aria-hidden="true"
        />

        {/* Subtle blue wash on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(145deg, rgba(230, 240, 255, 0.45) 0%, transparent 65%)',
            borderRadius: '20px',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        {/* Icon */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Icon animate={sectionInView} />
        </div>

        {/* Text content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', zIndex: 1 }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.22em',
              fontWeight: 600,
              color: '#D4AF37',
              textTransform: 'uppercase',
            }}
          >
            {pillar.eyebrow}
          </span>

          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(20px, 1.8vw, 26px)',
              fontWeight: 600,
              color: '#1A3C6E',
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            {pillar.title}
          </h3>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(13px, 1vw, 15px)',
              fontWeight: 300,
              color: 'rgba(26, 60, 110, 0.62)',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {pillar.description}
          </p>
        </div>

        {/* Hover: bottom gold line */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '28px',
            right: '28px',
            height: '1px',
            background: 'rgba(212, 175, 55, 0.32)',
            transformOrigin: 'left',
          }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
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
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyVaelsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-8% 0px' });
  const headerInView = useInView(headerRef, { once: true, margin: '-5% 0px' });

  return (
    <section
      id="why-vaels"
      ref={sectionRef}
      className="section-ambient"
      style={{
        background: 'linear-gradient(175deg, #F8F6F2 0%, #F2F4F8 30%, #EEF2FA 80%, #F2F4F8 100%)',
        padding: 'clamp(80px, 10vw, 140px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          padding: '0 clamp(24px, 5vw, 80px)',
        }}
      >
        {/* ── Section Header ── */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={headerItemVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #D4AF37)',
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10.5px',
                letterSpacing: '0.28em',
                fontWeight: 500,
                color: '#D4AF37',
                textTransform: 'uppercase',
              }}
            >
              The Vaels Difference
            </span>
            <div
              style={{
                width: '32px',
                height: '1px',
                background: 'linear-gradient(90deg, #D4AF37, transparent)',
              }}
            />
          </motion.div>

          {/* Headline */}
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
              maxWidth: '560px',
            }}
          >
            Not what we teach.
            <br />
            <span style={{ fontStyle: 'italic', color: '#0F2548' }}>
              What they become.
            </span>
          </motion.h2>
        </motion.div>

        {/* ── Pillar Cards Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(16px, 2vw, 24px)',
          }}
        >
          {PILLARS.map((pillar, index) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              index={index}
              sectionInView={sectionInView}
            />
          ))}
        </div>

        {/* ── Bottom accent line ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            sectionInView
              ? { scaleX: 1, opacity: 1 }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          style={{
            marginTop: 'clamp(48px, 6vw, 72px)',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.35), transparent)',
            transformOrigin: 'center',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
