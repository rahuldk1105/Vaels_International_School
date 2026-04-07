'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ─── Campus Data ──────────────────────────────────────────────────────────────

const CAMPUSES = [
  {
    id: 'kkic',
    title: 'KKIC Pre School',
    subtitle: 'Neelankarai Campus',
    description: 'A joyful, play-based curriculum for ages 2-5 that nurtures curiosity and creativity.',
    image: '/images/academic-kkic.jpg',
    badge: 'Ages 2-5',
  },
  {
    id: 'cambridge',
    title: 'Cambridge Curriculum',
    subtitle: 'International Standards',
    description: 'World-class education preparing students for global universities and careers.',
    image: '/images/academic-cambridge.jpg',
    badge: 'Grades 1-12',
  },
  {
    id: 'cisce',
    title: 'CISCE Board',
    subtitle: 'National Excellence',
    description: 'Comprehensive Indian curriculum with focus on holistic development and academic rigor.',
    image: '/images/academic-cisce.jpg',
    badge: 'Grades 1-12',
  },
] as const;

// ─── Header Variants ──────────────────────────────────────────────────────────

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
  const carouselRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth * 0.8, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth * 0.8, behavior: 'smooth' });
    }
  };

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
            World-Class{' '}
            <span style={{ fontStyle: 'italic', color: '#0F2548' }}>Education</span>
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
            Multiple pathways to academic excellence, tailored to your child's journey.
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div style={{ position: 'relative' }}>
          
          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            style={{
              position: 'absolute',
              top: '50%',
              left: '-16px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1.5px solid rgba(26, 60, 110, 0.2)',
              background: 'rgba(248, 246, 242, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1A3C6E',
              fontSize: '18px',
              boxShadow: '0 2px 12px rgba(26, 60, 110, 0.1)',
            }}
            aria-label="Previous"
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            style={{
              position: 'absolute',
              top: '50%',
              right: '-16px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1.5px solid rgba(26, 60, 110, 0.2)',
              background: 'rgba(248, 246, 242, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#1A3C6E',
              fontSize: '18px',
              boxShadow: '0 2px 12px rgba(26, 60, 110, 0.1)',
            }}
            aria-label="Next"
          >
            →
          </button>

          {/* Scrollable Track */}
          <div
            ref={carouselRef}
            style={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              gap: '24px',
              paddingBottom: '16px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className="hide-scrollbar"
          >
            {CAMPUSES.map((campus, i) => (
              <div
                key={campus.id}
                style={{
                  flexShrink: 0,
                  scrollSnapAlign: 'center',
                  width: 'clamp(300px, 90vw, 420px)',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  boxShadow: '0 4px 24px rgba(26, 60, 110, 0.08)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* Image */}
                <div style={{ 
                  position: 'relative', 
                  width: '100%',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                }}>
                  <img
                    src={campus.image}
                    alt={campus.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: 'rgba(26, 60, 110, 0.85)',
                    backdropFilter: 'blur(8px)',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#D4AF37',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {campus.badge}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '28px 24px 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(22px, 2vw, 26px)',
                      fontWeight: 600,
                      color: '#1A3C6E',
                      lineHeight: 1.2,
                      margin: 0,
                    }}>
                      {campus.title}
                    </h3>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#D4AF37',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}>
                      {campus.subtitle}
                    </p>
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'rgba(26, 60, 110, 0.65)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {campus.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
            Learn More About Our Programs
            <span style={{ fontSize: '16px' }}>→</span>
          </motion.a>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
