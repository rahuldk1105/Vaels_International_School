'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ─── Testimonial Data ─────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    id: 'parent-1',
    name: 'Priya Ramachandran',
    role: 'Parent of Class X Student',
    quote:
      'Vaels has transformed my daughter into a confident, curious learner. The teachers genuinely care about each child\'s progress, and the school\'s blend of academics and activities is exactly what we were looking for.',
  },
  {
    id: 'parent-2',
    name: 'Aravind Menon',
    role: 'Parent of Class VII Student',
    quote:
      'The Cambridge curriculum at Vaels has opened doors we never imagined. My son now thinks globally and communicates with a confidence far beyond his years. Best decision we ever made.',
  },
  {
    id: 'parent-3',
    name: 'Deepa Krishnaswamy',
    role: 'Parent of Class IX Student',
    quote:
      'What sets Vaels apart is the community. Parents, teachers, and students all feel like one family. The school nurtures values alongside academics — something rare today.',
  },
  {
    id: 'parent-4',
    name: 'Suresh Babu',
    role: 'Parent of Class XI Student',
    quote:
      'My son\'s CISCE results exceeded all expectations. The faculty here pushes students to think deeper, not just memorise. I\'ve watched him grow into a young man ready for the world.',
  },
  {
    id: 'parent-5',
    name: 'Lakshmi Narayanan',
    role: 'Parent of Pre-School Student',
    quote:
      'The KKIC programme gave my daughter the most joyful start to learning. She comes home every day excited to share what she discovered. That enthusiasm is priceless.',
  },
  {
    id: 'parent-6',
    name: 'Rajesh Venkatesan',
    role: 'Parent of Class XII Student',
    quote:
      'Vaels prepared my son not just for university admissions but for life. The extracurricular programme, the sports facilities, the mentoring — everything is world-class.',
  },
] as const;

// ─── Avatar Placeholder ───────────────────────────────────────────────────────

function AvatarPlaceholder({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('');

  // Subtle variation in the placeholder tint per card
  const tints = [
    'rgba(26,60,110,0.10)',
    'rgba(212,175,55,0.12)',
    'rgba(26,60,110,0.08)',
    'rgba(212,175,55,0.10)',
    'rgba(26,60,110,0.12)',
    'rgba(212,175,55,0.08)',
  ];

  return (
    <div style={{
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      border: '1.5px solid rgba(212, 175, 55, 0.4)',
      background: `linear-gradient(135deg, ${tints[index % tints.length]}, rgba(26,60,110,0.06))`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '14px',
        fontWeight: 600,
        color: '#D4AF37',
        letterSpacing: '0.04em',
        lineHeight: 1,
      }}>
        {initials}
      </span>
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────

interface TestimonialCardProps {
  testimonial: (typeof TESTIMONIALS)[number];
  index: number;
  inView: boolean;
}

function TestimonialCard({ testimonial, index, inView }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.24 + index * 0.12 }}
      style={{
        background: '#ffffff',
        border: '1px solid rgba(26, 60, 110, 0.07)',
        borderTop: '2px solid rgba(212, 175, 55, 0.45)',
        borderRadius: '20px',
        padding: 'clamp(24px, 2.5vw, 36px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        boxShadow: '0 4px 28px rgba(26, 60, 110, 0.07)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle corner glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle at top right, rgba(212,175,55,0.07), transparent)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Stars */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.38 + index * 0.12 + i * 0.06 }}
            style={{ color: '#D4AF37', fontSize: '13px', lineHeight: 1 }}
            aria-hidden="true"
          >
            ★
          </motion.span>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(15px, 1.35vw, 19px)',
        fontStyle: 'italic',
        fontWeight: 400,
        color: 'rgba(26, 60, 110, 0.78)',
        lineHeight: 1.65,
        margin: 0,
        flex: 1,
      }}>
        "{testimonial.quote}"
      </p>

      {/* Attribution */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderTop: '1px solid rgba(26, 60, 110, 0.07)',
        paddingTop: '18px',
      }}>
        <AvatarPlaceholder name={testimonial.name} index={index} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            color: '#1A3C6E',
            letterSpacing: '0.03em',
          }}>
            {testimonial.name}
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 300,
            color: 'rgba(26, 60, 110, 0.45)',
            letterSpacing: '0.05em',
          }}>
            {testimonial.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section Variants ─────────────────────────────────────────────────────────

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WhatParentsAreSayingSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-5% 0px' });

  return (
    <section
      id="parent-testimonials"
      className="section-ambient"
      style={{
        background: 'linear-gradient(175deg, #F8F6F2 0%, #F2F4F8 30%, #EEF2FA 80%, #F2F4F8 100%)',
        padding: 'clamp(80px, 10vw, 140px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 clamp(24px, 5vw, 80px)' }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          {/* Eyebrow */}
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
              Parent Voices
            </span>
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
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
              margin: '0 auto 16px',
              maxWidth: '620px',
            }}
          >
            What Parents{' '}
            <span style={{ fontStyle: 'italic', color: '#0F2548' }}>Are Saying</span>
          </motion.h2>

          {/* Sub-tagline */}
          <motion.p
            variants={headerItemVariants}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              fontWeight: 300,
              color: 'rgba(26, 60, 110, 0.55)',
              lineHeight: 1.7,
              margin: '0 auto',
              maxWidth: '480px',
            }}
          >
            Thousands of families trust Vaels with their most important decision.
            Here is what they have to say.
          </motion.p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
            marginBottom: 'clamp(40px, 5vw, 64px)',
            transformOrigin: 'center',
          }}
          aria-hidden="true"
        />

        {/* Testimonial Cards Grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(14px, 2vw, 22px)',
            alignItems: 'start',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              index={i}
              inView={cardsInView}
            />
          ))}
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={cardsInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
          style={{
            marginTop: 'clamp(48px, 6vw, 72px)',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.35), transparent)',
            transformOrigin: 'center',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
