'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  Variants,
  useReducedMotion,
  useMotionValue,
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
  const [shinePos, setShinePos] = useState(-100);

  // Trigger shine sweep on hover entry
  useEffect(() => {
    if (hovered) {
      setShinePos(-100);
      const id = requestAnimationFrame(() => setShinePos(200));
      return () => cancelAnimationFrame(id);
    }
  }, [hovered]);

  return (
    <motion.div variants={ctaItemVariants}>
      <motion.div
        whileHover={{ scale: 1.045 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 360, damping: 22 }}
        style={{ display: 'inline-block' }}
      >
        <Link
          href={href}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
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
              ? '0 0 32px rgba(212, 175, 55, 0.38), 0 8px 24px rgba(212, 175, 55, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
              : '0 4px 24px rgba(26, 60, 110, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
          }}
        >
          {/* Shine sweep overlay */}
          <motion.span
            animate={{ x: hovered ? 250 : -100 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '60px',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent)',
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
            style={{
              display: 'inline-block',
              fontSize: '15px',
              position: 'relative',
              zIndex: 1,
              color: hovered ? '#0F2548' : '#D4AF37',
            }}
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

  return (
    <motion.div variants={ctaItemVariants}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
        style={{ display: 'inline-block' }}
      >
        <Link
          href={href}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.1em',
            fontWeight: 400,
            color: hovered ? '#D4AF37' : 'rgba(248, 246, 242, 0.82)',
            background: 'transparent',
            border: `1.5px solid ${hovered ? 'rgba(212, 175, 55, 0.65)' : 'rgba(248, 246, 242, 0.25)'}`,
            borderRadius: '100px',
            padding: '15px 32px',
            textDecoration: 'none',
            backdropFilter: 'blur(6px)',
            transition:
              'color 0.32s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.32s ease',
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

// ─── Main Hero Section ────────────────────────────────────────────────────────

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
    const video = videoRef.current;
    if (!video) return;
    const handleLoaded = () => setVideoLoaded(true);
    video.addEventListener('loadeddata', handleLoaded);
    video.play().catch(() => {});
    return () => video.removeEventListener('loadeddata', handleLoaded);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '640px', background: '#0F2548' }}
      aria-label="Hero — Vaels International School"
    >
      {/* ── Background Media (Ken Burns wrapper) ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          animation: prefersReducedMotion
            ? 'none'
            : 'kenBurns 16s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate',
          willChange: 'transform',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 1.2s ease' }}
          aria-hidden="true"
        >
          <source src="/videos/campus.mp4" type="video/mp4" />
        </video>

        <Image
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=90&auto=format&fit=crop"
          alt="Vaels International School campus"
          fill
          priority
          quality={92}
          className="object-cover"
          style={{
            opacity: videoLoaded ? 0 : 1,
            transition: 'opacity 1.2s ease',
          }}
        />
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

      {/* ── Layer 5: CSS Noise texture overlay ── */}
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

      {/* ── Content (cursor-parallax wrapper) ── */}
      <motion.div
        style={{ x: contentX, y: contentY }}
        className="absolute inset-0 flex flex-col pointer-events-none"
        aria-hidden="false"
      >
        {/* Centered container with top padding for vertical balance */}
        <div
          className="pointer-events-auto w-full flex flex-col justify-end flex-1"
          style={{
            paddingTop: 'clamp(96px, 12vh, 140px)',
            paddingBottom: 'clamp(80px, 11vh, 130px)',
          }}
        >
          <div
            className="mx-auto w-full px-6 lg:px-12"
            style={{ maxWidth: '1440px' }}
          >
            <div style={{ maxWidth: '760px' }}>

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
                  style={{
                    display: 'block',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(38px, 5.4vw, 80px)',
                    fontWeight: 600,
                    color: '#F8F6F2',
                    lineHeight: 1.05,
                    letterSpacing: '-0.01em',
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
                  style={{
                    display: 'block',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(38px, 5.4vw, 80px)',
                    fontWeight: 600,
                    color: '#F8F6F2',
                    lineHeight: 1.05,
                    letterSpacing: '-0.01em',
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
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(14px, 1.25vw, 18px)',
                  fontWeight: 300,
                  color: 'rgba(248, 246, 242, 0.78)',
                  marginTop: '24px',
                  marginBottom: 0,
                  letterSpacing: '0.03em',
                  lineHeight: 1.55,
                  textShadow: '0 1px 8px rgba(15, 37, 72, 0.5)',
                }}
              >
                Three curricula. One purpose. Yours.
              </motion.p>

              {/* CTA Row — inline with text block */}
              <motion.div
                variants={ctaContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center"
                style={{ gap: '14px', marginTop: '36px' }}
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
