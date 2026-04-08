'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  Variants,
  useReducedMotion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// ─── Motion Variants ─────────────────────────────────────────────────────────

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
  },
};

const makeHeadlineVariants = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1], delay },
  },
});

const headlineLine1Variants = makeHeadlineVariants(0.9);
const headlineLine2Variants = makeHeadlineVariants(1.12);
const headlineLine3Variants = makeHeadlineVariants(1.34);

const subtextVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 1.65 },
  },
};

const ctaContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 1.95 },
  },
};

const ctaItemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Floating Gold Particles ──────────────────────────────────────────────────

const PARTICLES = [
  { size: 2,   x: '12%',  y: '70%', dur: '7.2s', delay: '0s'   },
  { size: 1.5, x: '28%',  y: '55%', dur: '9.8s', delay: '1.4s' },
  { size: 3,   x: '18%',  y: '40%', dur: '6.5s', delay: '2.1s' },
  { size: 1.5, x: '8%',   y: '82%', dur: '8.4s', delay: '0.7s' },
  { size: 2.5, x: '35%',  y: '75%', dur: '7.9s', delay: '3.2s' },
  { size: 1,   x: '22%',  y: '62%', dur: '11s',  delay: '0.3s' },
  { size: 2,   x: '5%',   y: '50%', dur: '8.8s', delay: '4.1s' },
  { size: 1.5, x: '42%',  y: '85%', dur: '6.9s', delay: '1.8s' },
  { size: 3,   x: '15%',  y: '90%', dur: '9.2s', delay: '2.9s' },
  { size: 1,   x: '32%',  y: '48%', dur: '10.5s', delay: '0.9s' },
] as const;

function FloatingParticles({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  if (prefersReducedMotion) return null;
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.x,
            bottom: p.y,
            '--dur': p.dur,
            '--delay': p.delay,
            opacity: 0,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ─── Scroll Indicator — Line + Travelling Dot ─────────────────────────────────

function ScrollIndicator() {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolledPast(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: scrolledPast ? 0 : 1 }}
      transition={
        scrolledPast
          ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          : { delay: 2.6, duration: 0.9, ease: 'easeOut' }
      }
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      style={{ pointerEvents: scrolledPast ? 'none' : 'auto' }}
      aria-hidden="true"
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '9px',
          letterSpacing: '0.26em',
          color: 'rgba(212, 175, 55, 0.5)',
          fontWeight: 500,
        }}
      >
        SCROLL
      </span>

      {/* Vertical track + travelling dot */}
      <div
        style={{
          position: 'relative',
          width: '1px',
          height: '48px',
          background: 'rgba(212, 175, 55, 0.18)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(212, 175, 55, 0.18)',
            borderRadius: '1px',
          }}
        />
        <motion.div
          animate={{ y: [0, 36, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
            repeatDelay: 0.4,
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '3px',
            height: '12px',
            background: 'linear-gradient(180deg, #D4AF37 0%, rgba(212, 175, 55, 0) 100%)',
            borderRadius: '2px',
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Primary CTA Button ───────────────────────────────────────────────────────

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic pull
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 26, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 280, damping: 26, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left - r.width  / 2) * 0.22);
    my.set((e.clientY - r.top  - r.height / 2) * 0.22);
  };

  const handleMouseLeave = () => { mx.set(0); my.set(0); setHovered(false); };

  return (
    <motion.div variants={ctaItemVariants} ref={ref}>
      <motion.div
        style={{ x: sx, y: sy, display: 'inline-block' }}
        whileHover={{ scale: 1.045 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 360, damping: 22 }}
      >
        <Link
          href={href}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.1em',
            fontWeight: 500,
            color: '#F8F6F2',
            background: hovered
              ? 'linear-gradient(135deg, #C9A227 0%, #E8CC6A 45%, #D4AF37 100%)'
              : 'linear-gradient(135deg, #1A3C6E 0%, #1e4880 100%)',
            border: `1.5px solid ${hovered ? 'rgba(212, 175, 55, 0.6)' : 'rgba(212, 175, 55, 0.35)'}`,
            borderRadius: '100px',
            padding: '15px 32px',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.38s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, color 0.3s ease',
            boxShadow: hovered
              ? '0 0 32px rgba(212, 175, 55, 0.42), 0 8px 28px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255,255,255,0.15)'
              : '0 4px 24px rgba(26, 60, 110, 0.32), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Shine sweep overlay */}
          <motion.span
            animate={{ x: hovered ? 250 : -100 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '60px', height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transform: 'skewX(-15deg)',
              pointerEvents: 'none',
            }}
          />
          <span style={{ position: 'relative', zIndex: 1, color: hovered ? '#0F2548' : '#F8F6F2' }}>
            {children}
          </span>
          <motion.span
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            style={{ display: 'inline-block', fontSize: '15px', position: 'relative', zIndex: 1, color: hovered ? '#0F2548' : '#D4AF37' }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Secondary CTA Button ─────────────────────────────────────────────────────

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic pull
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 26, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 280, damping: 26, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left - r.width  / 2) * 0.18);
    my.set((e.clientY - r.top  - r.height / 2) * 0.18);
  };

  const handleMouseLeave = () => { mx.set(0); my.set(0); setHovered(false); };

  return (
    <motion.div variants={ctaItemVariants} ref={ref}>
      <motion.div
        style={{ x: sx, y: sy, display: 'inline-block' }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      >
        <Link
          href={href}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.1em',
            fontWeight: 400,
            color: hovered ? '#D4AF37' : 'rgba(248, 246, 242, 0.85)',
            background: 'transparent',
            border: `1.5px solid ${hovered ? 'rgba(212, 175, 55, 0.65)' : 'rgba(248, 246, 242, 0.28)'}`,
            borderRadius: '100px',
            padding: '15px 32px',
            textDecoration: 'none',
            backdropFilter: 'blur(6px)',
            boxShadow: hovered ? '0 0 18px rgba(212, 175, 55, 0.15)' : 'none',
            transition: 'color 0.32s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.32s ease, box-shadow 0.32s ease',
          }}
        >
          {children}
          <motion.span
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.7 }}
            transition={{ type: 'spring', stiffness: 430, damping: 22 }}
            style={{ display: 'inline-block', fontSize: '14px' }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Hero Images ─────────────────────────────────────────────────────────────

const heroImages = [
  '/images/hero-section/h1.png',
  '/images/hero-section/h2.png',
  '/images/hero-section/h3.png',
  '/images/hero-section/h4.png',
  '/images/hero-section/h5.png',
];

// ─── Main Hero Section ────────────────────────────────────────────────────────

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // ── Scroll-aware hero fade ─────────────────────────────────────────────
  // As user scrolls 0→140px, hero text gently fades to 0.78 opacity
  const { scrollY } = useScroll();
  const heroTextOpacity = useTransform(
    scrollY,
    [0, 40, 140],
    [1, 0.97, 0.78]
  );
  // Overlay intensifies very slightly (adds 0→0.12 extra darkness)
  const overlayBoost = useTransform(scrollY, [0, 140], [0, 0.12]);

  // Cursor parallax — motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 55, damping: 28, mass: 0.8 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  // Map cursor to subtle content offset (±8px max)
  const contentX = useTransform(springX, [-1, 1], [-8, 8]);
  const contentY = useTransform(springY, [-1, 1], [-5, 5]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rawX.set(nx * 2);   // normalise to -1 to 1
      rawY.set(ny * 2);
    },
    [prefersReducedMotion, rawX, rawY]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener('mousemove', handleMouseMove as EventListener);
    return () => section.removeEventListener('mousemove', handleMouseMove as EventListener);
  }, [handleMouseMove]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '640px', background: '#0F2548' }}
      aria-label="Hero — Vaels International School"
    >
      {/* ── Background Images (Ken Burns wrapper) ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          animation: prefersReducedMotion
            ? 'none'
            : 'kenBurns 16s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate',
          willChange: 'transform',
        }}
      >
        {heroImages.map((src, i) => (
          <div
            key={src}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === heroIndex ? 1 : 0,
              transition: 'opacity 1200ms ease',
            }}
            aria-hidden="true"
          >
            <Image
              src={src}
              alt="Vaels International School campus"
              fill
              priority={i === 0}
              quality={90}
              className="object-cover brightness-[0.45]"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* ── Layer 1: Strong top-left Royal Blue directional gradient (readability) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            158deg,
            rgba(15, 37, 72, 0.88) 0%,
            rgba(26, 60, 110, 0.55) 30%,
            rgba(15, 37, 72, 0.14) 54%,
            transparent 72%
          )`,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2: Bottom deep navy vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            rgba(15, 37, 72, 0.82) 0%,
            rgba(15, 37, 72, 0.45) 28%,
            transparent 58%
          )`,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Left-side content atmosphere ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 65% 75% at 0% 90%,
            rgba(15, 37, 72, 0.52) 0%,
            transparent 65%
          )`,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 4: Warm gold tone overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'rgba(212, 175, 55, 0.055)',
          mixBlendMode: 'soft-light',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 5: Radial vignette corners ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 100% 100% at 50% 50%,
            transparent 45%,
            rgba(15, 37, 72, 0.38) 100%
          )`,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 6.5: Scroll-boosted overlay (deepens as user scrolls) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(15,37,72,1)', opacity: overlayBoost }}
        aria-hidden="true"
      />

      {/* ── Layer 6: CSS Noise texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.028,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />

      {/* ── Floating gold particles ── */}
      <FloatingParticles prefersReducedMotion={prefersReducedMotion} />

      {/* ── Gold bottom rule ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, rgba(212, 175, 55, 0.55) 0%, rgba(212, 175, 55, 0.12) 50%, transparent 100%)',
          transformOrigin: 'left',
        }}
        aria-hidden="true"
      />

      {/* ── Content (cursor-parallax + scroll-fade wrapper) ── */}
      <motion.div
        style={{ x: contentX, y: contentY, opacity: heroTextOpacity }}
        className="absolute inset-0 flex flex-col pointer-events-none"
        aria-hidden="false"
      >
        {/* Centered container with top padding for vertical balance */}
        <div
          className="pointer-events-auto w-full flex flex-col justify-end flex-1"
          style={{
            paddingTop: 'clamp(80px, 12vh, 140px)',
            paddingBottom: 'clamp(72px, 11vh, 130px)',
          }}
        >
          <div
            className="mx-auto w-full px-6 lg:px-12 flex justify-center"
            style={{ maxWidth: '1440px' }}
          >
            <div style={{ maxWidth: '760px', textAlign: 'center' }}>

              {/* Eyebrow */}
              <motion.p
                variants={eyebrowVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10.5px',
                  letterSpacing: '0.28em',
                  fontWeight: 500,
                  color: '#D4AF37',
                  marginBottom: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.72, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: 'inline-block',
                    width: '32px',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, #D4AF37)',
                    flexShrink: 0,
                    transformOrigin: 'left',
                  }}
                />
                CAMBRIDGE · CISCE · KKIC · CHENNAI
              </motion.p>

              {/* Headline */}
              <h1
                style={{ margin: 0, padding: 0 }}
                aria-label="Some schools teach children. We shape the people they become."
              >
                <motion.span
                  variants={headlineLine1Variants}
                  initial="hidden"
                  animate="visible"
                  className="hero-headline"
                  style={{
                    display: 'block',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(38px, 5.4vw, 80px)',
                    fontWeight: 600,
                    color: '#F8F6F2',
                    lineHeight: 1.05,
                    letterSpacing: '-0.012em',
                    textShadow:
                      '0 2px 24px rgba(15, 37, 72, 0.65), 0 1px 4px rgba(15, 37, 72, 0.45)',
                  }}
                >
                  Some schools teach children.
                </motion.span>

                <motion.span
                  variants={headlineLine2Variants}
                  initial="hidden"
                  animate="visible"
                  className="hero-headline"
                  style={{
                    display: 'block',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(38px, 5.4vw, 80px)',
                    fontWeight: 600,
                    color: '#F8F6F2',
                    lineHeight: 1.05,
                    letterSpacing: '-0.012em',
                    textShadow:
                      '0 2px 24px rgba(15, 37, 72, 0.65), 0 1px 4px rgba(15, 37, 72, 0.45)',
                  }}
                >
                  We shape the people
                </motion.span>

                <motion.span
                  variants={headlineLine3Variants}
                  initial="hidden"
                  animate="visible"
                  className="hero-headline"
                  style={{
                    display: 'block',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(38px, 5.4vw, 80px)',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    color: '#D4AF37',
                    lineHeight: 1.08,
                    letterSpacing: '-0.005em',
                    textShadow:
                      '0 2px 32px rgba(212, 175, 55, 0.3), 0 1px 8px rgba(15, 37, 72, 0.5)',
                  }}
                >
                  they become.
                </motion.span>
              </h1>

              {/* Subtext */}
              <motion.p
                variants={subtextVariants}
                initial="hidden"
                animate="visible"
                className="hero-subtext"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(14px, 1.25vw, 18px)',
                  fontWeight: 300,
                  color: 'rgba(248, 246, 242, 0.8)',
                  marginTop: '22px',
                  marginBottom: 0,
                  letterSpacing: '0.025em',
                  lineHeight: 1.6,
                  textShadow: '0 1px 8px rgba(15, 37, 72, 0.5)',
                  maxWidth: '420px',
                  textAlign: 'center',
                }}
              >
                Three curricula. One purpose. Yours.
              </motion.p>

              {/* CTA Row — inline with text block */}
              <motion.div
                variants={ctaContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center justify-center hero-cta-row"
                style={{ gap: '14px', marginTop: '32px' }}
              >
                <PrimaryButton href="#admissions">Enquire for Admission</PrimaryButton>
                <SecondaryButton href="#admissions">Book a Campus Visit</SecondaryButton>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <ScrollIndicator />

      {/* ── Keyframes ── */}
      <style jsx global>{`
        @keyframes kenBurns {
          0%   { transform: scale(1)    translate(0%,    0%   ); }
          100% { transform: scale(1.08) translate(-1.8%, -1.2%); }
        }
      `}</style>
    </section>
  );
}
