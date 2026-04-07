'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

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
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      border: '2px solid rgba(212, 175, 55, 0.5)',
      background: `linear-gradient(135deg, ${tints[index % tints.length]}, rgba(26,60,110,0.06))`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '18px',
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

// ─── Navigation Arrow ─────────────────────────────────────────────────────────

function NavArrow({ direction, onClick }: { direction: 'prev' | 'next'; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [direction === 'prev' ? 'left' : 'right']: 'clamp(8px, 2vw, 24px)',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: `1.5px solid ${hovered ? 'rgba(212, 175, 55, 0.6)' : 'rgba(26, 60, 110, 0.2)'}`,
        background: hovered ? 'rgba(212, 175, 55, 0.1)' : 'rgba(248, 246, 242, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: hovered 
          ? '0 4px 16px rgba(212, 175, 55, 0.2)' 
          : '0 2px 12px rgba(26, 60, 110, 0.08)',
      }}
      aria-label={direction === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
    >
      <span style={{
        fontSize: '20px',
        color: hovered ? '#D4AF37' : '#1A3C6E',
        lineHeight: 1,
        transition: 'color 0.3s ease',
      }}>
        {direction === 'prev' ? '←' : '→'}
      </span>
    </motion.button>
  );
}

// ─── Carousel Dots ────────────────────────────────────────────────────────────

function CarouselDots({ total, current, onDotClick }: { 
  total: number; 
  current: number; 
  onDotClick: (index: number) => void;
}) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: 'clamp(32px, 4vw, 48px)',
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onDotClick(i)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: current === i ? '24px' : '8px',
            height: '8px',
            borderRadius: '4px',
            background: current === i 
              ? 'linear-gradient(90deg, #C9A227, #D4AF37)' 
              : 'rgba(26, 60, 110, 0.2)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            boxShadow: current === i ? '0 2px 8px rgba(212, 175, 55, 0.3)' : 'none',
          }}
          aria-label={`Go to testimonial ${i + 1}`}
          aria-current={current === i}
        />
      ))}
    </div>
  );
}

// ─── Testimonial Slide ────────────────────────────────────────────────────────

interface TestimonialSlideProps {
  testimonial: (typeof TESTIMONIALS)[number];
  index: number;
}

function TestimonialSlide({ testimonial, index }: TestimonialSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '840px',
        margin: '0 auto',
        padding: '0 clamp(24px, 4vw, 48px)',
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
            style={{ color: '#D4AF37', fontSize: '18px', lineHeight: 1 }}
            aria-hidden="true"
          >
            ★
          </motion.span>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(20px, 3vw, 36px)',
        fontStyle: 'italic',
        fontWeight: 400,
        color: 'rgba(26, 60, 110, 0.85)',
        lineHeight: 1.5,
        margin: '0 0 32px 0',
      }}>
        "{testimonial.quote}"
      </p>

      {/* Attribution */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        marginTop: '24px',
      }}>
        <AvatarPlaceholder name={testimonial.name} index={index} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '16px',
            fontWeight: 600,
            color: '#1A3C6E',
            letterSpacing: '0.03em',
          }}>
            {testimonial.name}
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 300,
            color: 'rgba(26, 60, 110, 0.55)',
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

const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WhatParentsAreSayingSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });
  const carouselInView = useInView(carouselRef, { once: true, margin: '-5% 0px' });

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="parent-testimonials"
      className="section-ambient"
      style={{
        background: 'linear-gradient(175deg, #F8F6F2 0%, #F2F4F8 30%, #EEF2FA 80%, #F2F4F8 100%)',
        padding: 'clamp(32px, 4vw, 48px) 0',
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
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 5vw, 64px)' }}
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
            marginBottom: 'clamp(48px, 5vw, 64px)',
            transformOrigin: 'center',
          }}
          aria-hidden="true"
        />

        {/* Carousel Container */}
        <motion.div
          ref={carouselRef}
          initial={{ opacity: 0 }}
          animate={carouselInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: 'clamp(400px, 50vw, 500px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Navigation Arrows */}
          <NavArrow direction="prev" onClick={goToPrev} />
          <NavArrow direction="next" onClick={goToNext} />

          {/* Testimonial Slides */}
          <AnimatePresence mode="wait">
            <TestimonialSlide
              key={TESTIMONIALS[currentIndex].id}
              testimonial={TESTIMONIALS[currentIndex]}
              index={currentIndex}
            />
          </AnimatePresence>
        </motion.div>

        {/* Carousel Dots */}
        <CarouselDots
          total={TESTIMONIALS.length}
          current={currentIndex}
          onDotClick={goToSlide}
        />

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={carouselInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
          style={{
            marginTop: 'clamp(48px, 5vw, 64px)',
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
