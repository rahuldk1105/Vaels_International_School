'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  Variants,
} from 'framer-motion';
import Image from 'next/image';

// ─── Count-up Hook ────────────────────────────────────────────────────────────

function useCountUp(
  target: number,
  duration: number,
  triggered: boolean
): { value: number; done: boolean } {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
        setDone(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [triggered, target, duration]);

  return { value, done };
}

// ─── Stat Item ────────────────────────────────────────────────────────────────

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  triggered: boolean;
  duration?: number;
}

function StatItem({ value, suffix, label, triggered, duration = 1.8 }: StatProps) {
  const { value: count, done } = useCountUp(value, duration, triggered);

  return (
    <div className="flex flex-col gap-1">
      <div
        style={{
          fontFamily: "'DM Mono', 'Courier New', monospace",
          fontSize: 'clamp(28px, 3vw, 42px)',
          fontWeight: 700,
          color: '#1A3C6E',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {count.toLocaleString()}
        <span style={{ color: '#D4AF37', fontSize: '0.7em', marginLeft: '2px' }}>{suffix}</span>
      </div>
      {/* Label fades in after counter finishes */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.18em',
          color: 'rgba(26, 60, 110, 0.5)',
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </motion.div>
    </div>
  );
}

// ─── Motion Variants ─────────────────────────────────────────────────────────

const imageStackVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const imageItemVariants: Variants = {
  hidden: { opacity: 0, x: -48, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const textContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const statsRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const statItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Variants for split headline (applied locally, not inside stagger chain)
const headlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
};

const headlineContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-5% 0px' });

  // ── Scroll-based parallax for image layers ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const springConfig = { stiffness: 60, damping: 24, mass: 0.6 };

  const accentCardY = useSpring(
    useTransform(scrollYProgress, [0, 1], [18, -18]),
    springConfig
  );
  const primaryImageY = useSpring(
    useTransform(scrollYProgress, [0, 1], [10, -24]),
    springConfig
  );
  const secondaryImageY = useSpring(
    useTransform(scrollYProgress, [0, 1], [-6, 28]),
    springConfig
  );
  const badgeY = useSpring(
    useTransform(scrollYProgress, [0, 1], [8, -14]),
    springConfig
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: '#F8F6F2',
        padding: 'clamp(80px, 10vw, 140px) 0',
        overflow: 'hidden',
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          padding: '0 clamp(24px, 5vw, 80px)',
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
            gap: 'clamp(48px, 7vw, 96px)',
            alignItems: 'center',
          }}
        >
          {/* ── Left: Layered Image Stack ── */}
          <motion.div
            variants={imageStackVariants}
            initial="hidden"
            animate={sectionInView ? 'visible' : 'hidden'}
            style={{ position: 'relative', minHeight: '520px' }}
          >
            {/* Royal Blue accent card (background layer) */}
            <motion.div
              variants={imageItemVariants}
              style={{
                position: 'absolute',
                top: '32px',
                left: '-24px',
                width: '68%',
                height: '75%',
                background: 'linear-gradient(145deg, #1A3C6E 0%, #0F2548 100%)',
                borderRadius: '20px',
                zIndex: 1,
                boxShadow: '0 20px 60px rgba(26, 60, 110, 0.22)',
                y: accentCardY,
              }}
              aria-hidden="true"
            />

            {/* Gold corner accent on the blue card */}
            <motion.div
              variants={imageItemVariants}
              style={{
                position: 'absolute',
                top: '20px',
                left: '-36px',
                width: '64px',
                height: '64px',
                zIndex: 2,
              }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <path d="M0 0 L64 0 L0 64 Z" fill="rgba(212, 175, 55, 0.15)" />
                <path d="M0 0 L32 0 L0 32 Z" fill="rgba(212, 175, 55, 0.25)" />
              </svg>
            </motion.div>

            {/* Primary image */}
            <motion.div
              variants={imageItemVariants}
              style={{
                position: 'absolute',
                top: '0',
                left: '12%',
                width: '76%',
                height: '72%',
                borderRadius: '18px',
                overflow: 'hidden',
                zIndex: 3,
                boxShadow: '0 24px 64px rgba(15, 37, 72, 0.28)',
                transform: 'rotate(-1.2deg)',
                y: primaryImageY,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=88&auto=format&fit=crop"
                alt="Vaels campus building"
                fill
                quality={90}
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
              {/* Subtle warm tint */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(212, 175, 55, 0.04)',
                  mixBlendMode: 'soft-light',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>

            {/* Secondary overlapping image */}
            <motion.div
              variants={imageItemVariants}
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '54%',
                height: '52%',
                borderRadius: '16px',
                overflow: 'hidden',
                zIndex: 4,
                boxShadow: '0 16px 48px rgba(15, 37, 72, 0.24)',
                transform: 'rotate(1.6deg)',
                border: '3px solid #F8F6F2',
                y: secondaryImageY,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&q=85&auto=format&fit=crop"
                alt="Vaels students learning"
                fill
                quality={85}
                className="object-cover"
                sizes="(max-width: 768px) 55vw, 22vw"
              />
            </motion.div>

            {/* Est. 1992 floating badge */}
            <motion.div
              variants={imageItemVariants}
              style={{
                position: 'absolute',
                bottom: '18%',
                left: '-12px',
                zIndex: 5,
                y: badgeY,
                background: '#F8F6F2',
                borderRadius: '100px',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 32px rgba(26, 60, 110, 0.14)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#D4AF37',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  fontWeight: 600,
                  color: '#1A3C6E',
                  whiteSpace: 'nowrap',
                }}
              >
                EST. 1992
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Text Content ── */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            animate={sectionInView ? 'visible' : 'hidden'}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          >
            {/* Eyebrow */}
            <motion.div variants={textItemVariants} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '1px',
                    background: '#D4AF37',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '10.5px',
                    letterSpacing: '0.26em',
                    fontWeight: 500,
                    color: '#D4AF37',
                    textTransform: 'uppercase',
                  }}
                >
                  Thirty Years of Intention
                </span>
              </div>
            </motion.div>

            {/* Headline — two lines, staggered 100ms apart */}
            <motion.div variants={textItemVariants} style={{ margin: '0 0 24px 0' }}>
              <motion.h2
                variants={headlineContainerVariants}
                initial="hidden"
                animate={sectionInView ? 'visible' : 'hidden'}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(36px, 4vw, 58px)',
                  fontWeight: 600,
                  lineHeight: 1.06,
                  letterSpacing: '-0.01em',
                  margin: 0,
                  padding: 0,
                }}
              >
                <motion.span
                  variants={headlineLineVariants}
                  style={{ display: 'block', color: '#1A3C6E' }}
                >
                  We did not build a school.
                </motion.span>
                <motion.span
                  variants={headlineLineVariants}
                  style={{ display: 'block', fontStyle: 'italic', color: '#0F2548' }}
                >
                  We built a standard.
                </motion.span>
              </motion.h2>
            </motion.div>

            {/* Body */}
            <motion.p
              variants={textItemVariants}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(15px, 1.2vw, 17px)',
                fontWeight: 300,
                color: 'rgba(26, 60, 110, 0.65)',
                lineHeight: 1.72,
                margin: '0 0 40px 0',
                maxWidth: '440px',
              }}
            >
              Since 1992, Vaels has operated on one belief — exceptional environments produce
              exceptional people. Not by accident. By design.
            </motion.p>

            {/* Gold divider */}
            <motion.div
              variants={textItemVariants}
              style={{
                width: '48px',
                height: '1px',
                background: 'linear-gradient(90deg, #D4AF37, rgba(212, 175, 55, 0.2))',
                marginBottom: '40px',
              }}
            />

            {/* Stats Row */}
            <motion.div
              ref={statsRef}
              variants={statsRowVariants}
              initial="hidden"
              animate={statsInView ? 'visible' : 'hidden'}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
              }}
            >
              {[
                { value: 32, suffix: '+', label: 'Years', duration: 1.4 },
                { value: 14000, suffix: '+', label: 'Alumni', duration: 2.0 },
                { value: 98, suffix: '%', label: 'Placement', duration: 1.6 },
              ].map((stat) => (
                <motion.div key={stat.label} variants={statItemVariants}>
                  <StatItem
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    triggered={statsInView}
                    duration={stat.duration}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
