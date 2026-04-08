'use client';

import { useRef, useState } from 'react';
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
    images: [
      '/images/neelankarai-1.webp',
      '/images/neelankarai-2.webp',
      '/images/neelankarai-3.webp',
      '/images/neelankarai-4.webp',
      '/images/neelankarai-5.webp',
    ],
  },
  {
    id: 'high-school',
    label: 'High School',
    location: 'Injambakkam',
    title: 'High School\n— Injambakkam',
    bg: '#F8F6F2',
    textOnBg: '#1A3C6E',
    imageRight: false,
    images: [
      '/images/inajambakam - 1.webp',
      '/images/inajambakam-2.webp',
      '/images/inajambakam-3.webp',
      '/images/inajambakam-4.webp',
      '/images/inajambakam-5.webp',
      '/images/inajambakam-6.webp',
    ],
  },
] as const;

// ─── Image Carousel ───────────────────────────────────────────────────────────

interface ImageCarouselProps {
  images: readonly string[];
  alt: string;
}

function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ 
      position: 'relative', 
      overflow: 'hidden', 
      width: '100%', 
      height: '100%',
      background: '#f0f0f0' 
    }}>
      {/* Image Track */}
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        transform: `translateX(-${currentIndex * 100}%)`,
        transition: 'transform 300ms ease-out',
      }}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${alt} - Image ${i + 1}`}
            style={{
              width: '100%',
              height: '100%',
              flexShrink: 0,
              objectFit: 'cover',
            }}
            onError={(e) => {
              console.error(`Failed to load image: ${img}`);
            }}
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrev}
        style={{
          position: 'absolute',
          top: '50%',
          left: '12px',
          transform: 'translateY(-50%)',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
          fontSize: '16px',
          color: '#1A3C6E',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }}
        aria-label="Previous image"
      >
        ←
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        style={{
          position: 'absolute',
          top: '50%',
          right: '12px',
          transform: 'translateY(-50%)',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
          fontSize: '16px',
          color: '#1A3C6E',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }}
        aria-label="Next image"
      >
        →
      </button>

      {/* Image Counter */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '12px',
        padding: '4px 10px',
        borderRadius: '12px',
        background: 'rgba(26, 60, 110, 0.85)',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        fontWeight: 600,
        color: '#F8F6F2',
        zIndex: 2,
      }}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

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
        alignItems: 'stretch',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 8px 48px rgba(26, 60, 110, 0.1)',
      }}
    >
      {/* Text Panel */}
      <motion.div
        variants={textVariants}
        style={{
          background: campus.bg,
          padding: 'clamp(24px, 4vw, 32px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '16px',
          order: textColOrder,
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
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
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          padding: '6px 14px',
          borderRadius: '20px',
          border: `1px solid ${campus.bg === '#1A3C6E' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(26, 60, 110, 0.15)'}`,
          background: campus.bg === '#1A3C6E' ? 'rgba(212, 175, 55, 0.12)' : 'rgba(26, 60, 110, 0.05)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: campus.bg === '#1A3C6E' ? '#D4AF37' : '#1A3C6E',
          textTransform: 'uppercase',
        }}>
          {campus.label}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 600,
          color: campus.textOnBg,
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          margin: 0,
          whiteSpace: 'pre-line',
        }}>
          {campus.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(13px, 1.1vw, 15px)',
          fontWeight: 300,
          color: campus.bg === '#1A3C6E' ? 'rgba(248, 246, 242, 0.7)' : 'rgba(26, 60, 110, 0.65)',
          lineHeight: 1.6,
          margin: 0,
        }}>
          {campus.bg === '#1A3C6E'
            ? 'A nurturing environment where young learners discover their potential through play, exploration, and the KKIC curriculum.'
            : 'Comprehensive education for grades 1-12 with Cambridge and CISCE pathways, preparing students for global success.'}
        </p>

        {/* CTA */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04, x: 4 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            alignSelf: 'flex-start',
            marginTop: '12px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: campus.bg === '#1A3C6E' ? '#D4AF37' : '#1A3C6E',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          Explore More
          <span style={{ fontSize: '16px' }}>→</span>
        </motion.a>
      </motion.div>

      {/* Image Panel with Carousel */}
      <motion.div
        variants={imageVariants}
        style={{
          order: imageColOrder,
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <ImageCarousel images={campus.images} alt={campus.location} />
      </motion.div>
    </motion.div>
  );
}

// ─── Section Variants ─────────────────────────────────────────────────────────

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OurAcademicsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });

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
              Our Academics
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
              margin: '0 auto 16px',
              maxWidth: '620px',
            }}
          >
            Two Campuses,{' '}
            <span style={{ fontStyle: 'italic', color: '#0F2548' }}>One Vision</span>
          </motion.h2>

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
            From early years to university prep, we provide world-class education at every stage.
          </motion.p>
        </motion.div>

        {/* Campus Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 2.5vw, 32px)' }}>
          {CAMPUSES.map((campus, i) => (
            <CampusCard key={campus.id} campus={campus} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(48px, 5vw, 64px)' }}>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              borderRadius: '28px',
              border: '1.5px solid rgba(26, 60, 110, 0.2)',
              background: 'linear-gradient(135deg, #1A3C6E 0%, #0F2548 100%)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: '#F8F6F2',
              textDecoration: 'none',
              textTransform: 'uppercase',
              boxShadow: '0 4px 16px rgba(26, 60, 110, 0.2)',
              cursor: 'pointer',
            }}
          >
            Schedule a Campus Visit
            <span style={{ fontSize: '16px' }}>→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
