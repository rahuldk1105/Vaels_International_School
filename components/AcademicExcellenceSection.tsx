'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

// ─── Programme Data ───────────────────────────────────────────────────────────

const PROGRAMMES = [
  {
    id: 'cambridge',
    eyebrow: 'IGCSE · AS LEVELS · A LEVELS',
    headline: 'The standard the world\nmeasures itself against.',
    body: "Cambridge's internationally benchmarked curriculum challenges students to think critically, write precisely, and reason independently — skills Oxford interviews and boardrooms both demand.",
    badge: 'Cambridge Assessment\nInternational Education',
    badgeInitial: 'C',
    image: '/images/academic-cambridge.jpg',
    imageAlt: 'Cambridge programme — Vaels International School',
    bg: '#1A3C6E',
    textOnBg: '#F8F6F2',
    imageRight: true,
  },
  {
    id: 'cisce',
    eyebrow: 'ICSE · ISC',
    headline: 'Depth over breadth.\nAlways.',
    body: 'The ICSE and ISC programmes are built for students who refuse to be surface-level. Rigorous, language-first, and fiercely respected by India\'s top institutions and global universities alike.',
    badge: 'CISCE',
    badgeInitial: 'CI',
    image: '/images/academic-cisce.jpg',
    imageAlt: 'CISCE programme — Vaels International School',
    bg: '#F8F6F2',
    textOnBg: '#1A3C6E',
    imageRight: false,
  },
  {
    id: 'kkic',
    eyebrow: 'KINDLE KIDS INTERNATIONAL CURRICULUM',
    headline: 'The early years,\ndone with ambition.',
    body: 'KKIC gives young learners a structured, internationally aligned foundation — one that builds curiosity, confidence, and a love for learning before the world asks them to compete.',
    badge: 'KKIC',
    badgeInitial: 'KK',
    image: '/images/academic-kkic.jpg',
    imageAlt: 'KKIC programme — Vaels International School',
    bg: '#E6F0FF',
    textOnBg: '#1A3C6E',
    imageRight: true,
  },
] as const;

// ─── Programme Card ───────────────────────────────────────────────────────────

interface ProgrammeCardProps {
  programme: (typeof PROGRAMMES)[number];
  index: number;
}

function ProgrammeCard({ programme, index }: ProgrammeCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const fromLeft = !programme.imageRight;

  const textVariants: Variants = {
    hidden: { opacity: 0, x: fromLeft ? 48 : -48, filter: 'blur(8px)' },
    visible: {
      opacity: 1, x: 0, filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: fromLeft ? -48 : 48, filter: 'blur(8px)' },
    visible: {
      opacity: 1, x: 0, filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const textColOrder = programme.imageRight ? 0 : 1;
  const imageColOrder = programme.imageRight ? 1 : 0;

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
        minHeight: 'clamp(380px, 45vw, 520px)',
      }}
    >
      {/* Text Panel */}
      <motion.div
        variants={textVariants}
        style={{
          background: programme.bg,
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
            {programme.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(28px, 3.2vw, 46px)',
          fontWeight: 600,
          color: programme.textOnBg,
          lineHeight: 1.08,
          letterSpacing: '-0.01em',
          margin: 0,
          whiteSpace: 'pre-line',
        }}>
          {programme.headline.split('\n').map((line, i) => (
            <span key={i} style={i === 1 ? { fontStyle: 'italic', display: 'block' } : { display: 'block' }}>
              {line}
            </span>
          ))}
        </h3>

        {/* Body */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(13px, 1.1vw, 15px)',
          fontWeight: 300,
          color: programme.bg === '#1A3C6E'
            ? 'rgba(248, 246, 242, 0.68)'
            : 'rgba(26, 60, 110, 0.62)',
          lineHeight: 1.75,
          margin: 0,
          maxWidth: '400px',
        }}>
          {programme.body}
        </p>

        {/* Credential Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          background: programme.bg === '#1A3C6E'
            ? 'rgba(248, 246, 242, 0.06)'
            : 'rgba(26, 60, 110, 0.05)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '100px',
          padding: '10px 18px',
          alignSelf: 'flex-start',
          marginTop: '8px',
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #D4AF37, #F5E9B8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '11px',
              fontWeight: 700,
              color: '#0F2548',
            }}>
              {programme.badgeInitial}
            </span>
          </div>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            letterSpacing: '0.1em',
            fontWeight: 500,
            color: '#D4AF37',
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
          }}>
            {programme.badge}
          </span>
        </div>
      </motion.div>

      {/* Image Panel */}
      <motion.div
        variants={imageVariants}
        style={{
          position: 'relative',
          order: imageColOrder,
          minHeight: '300px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={programme.image}
          alt={programme.imageAlt}
          fill
          quality={88}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Subtle colour grade */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(26,60,110,0.22) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      </motion.div>
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

export default function AcademicExcellenceSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-5% 0px' });

  return (
    <section
      id="programmes"
      style={{
        background: 'linear-gradient(to bottom, #F2F4F8 0%, #F8F6F2 clamp(48px,6vw,80px), #F8F6F2 100%)',
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
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 88px)' }}
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
              Our Programmes
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
            Three paths.
            <br />
            <span style={{ fontStyle: 'italic', color: '#0F2548' }}>Each one, a statement.</span>
          </motion.h2>
        </motion.div>

        {/* Programme Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vw, 40px)' }}>
          {PROGRAMMES.map((programme, index) => (
            <ProgrammeCard key={programme.id} programme={programme} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
