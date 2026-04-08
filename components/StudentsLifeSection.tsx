'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';

// ─── Image Arrays ─────────────────────────────────────────────────────────────

const blogImages = [
  '/images/blog-images/b1.jpeg',
  '/images/blog-images/b2.webp',
  '/images/blog-images/b3.jpeg',
  '/images/blog-images/b4.webp',
  '/images/blog-images/b5.jpeg',
  '/images/blog-images/b6.jpeg',
  '/images/blog-images/b7.webp',
  '/images/blog-images/b8.jpeg',
];

const eventImages = [
  '/images/vaels-events/v1.jpg',
  '/images/vaels-events/v2.jpg',
  '/images/vaels-events/v3.jpg',
  '/images/vaels-events/v4.jpeg',
  '/images/vaels-events/v5.jpeg',
  '/images/vaels-events/v6.jpg',
];

const newsImages = [
  '/images/vaels-news/v1.webp',
  '/images/vaels-news/v2.webp',
  '/images/vaels-news/v3.webp',
  '/images/vaels-news/v4.webp',
  '/images/vaels-news/v5.jpeg',
  '/images/vaels-news/v6.jpg',
];

// ─── Student Life Card Data ───────────────────────────────────────────────────

const CARDS = [
  {
    id: 'blogs',
    category: 'Blogs',
    headline: 'Vaels International School Neelankarai – Shaping Future',
    images: blogImages,
  },
  {
    id: 'events',
    category: 'Vaels Events',
    headline: 'Vijayadasami Aksharabhyasam Celebration at Vaels International School – Neelankarai',
    images: eventImages,
  },
  {
    id: 'news',
    category: 'Vaels News',
    headline: 'Vaels International School Celebrates Outstanding Academic Excellence In CISCE Examinations 2024-2025',
    images: newsImages,
  },
];

// ─── Life Card ────────────────────────────────────────────────────────────────

interface LifeCardProps {
  card: (typeof CARDS)[number];
  index: number;
  inView: boolean;
}

function LifeCard({ card, index, inView }: LifeCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { images } = card;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.13 }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 28px rgba(26, 60, 110, 0.07)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        transition: 'box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        height: '100%',
      }}
    >
      {/* Image Carousel */}
      <div
        style={{
          position: 'relative',
          height: 'clamp(160px, 20vw, 220px)',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {/* Gold top accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #D4AF37, rgba(212, 175, 55, 0.2))',
            zIndex: 2,
          }}
          aria-hidden="true"
        />

        {/* Slides */}
        {images.map((src, i) => (
          <div
            key={src}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === currentIndex ? 1 : 0,
              transition: 'opacity 280ms ease',
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={index === 0 && i === 0}
            />
          </div>
        ))}

        {/* Dot navigation */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: '5px',
            zIndex: 3,
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === currentIndex ? '16px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === currentIndex ? '#D4AF37' : 'rgba(255,255,255,0.65)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 280ms ease, background 280ms ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div style={{
        padding: 'clamp(20px, 2.5vw, 28px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1,
      }}>
        {/* Category label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '1px', background: '#D4AF37', flexShrink: 0 }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.22em',
            fontWeight: 600,
            color: '#D4AF37',
            textTransform: 'uppercase',
          }}>
            {card.category}
          </span>
        </div>

        {/* Headline */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(16px, 1.5vw, 20px)',
          fontWeight: 600,
          color: '#1A3C6E',
          lineHeight: 1.3,
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          {card.headline}
        </h3>
      </div>
    </motion.div>
  );
}

// ─── Header Variants ──────────────────────────────────────────────────────────

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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StudentsLifeSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-5% 0px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-5% 0px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-5% 0px' });

  return (
    <section
      id="students-life"
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
              Campus Stories
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
            Student&apos;s{' '}
            <span style={{ fontStyle: 'italic', color: '#0F2548' }}>Life</span>
          </motion.h2>
        </motion.div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(24px, 2vw, 32px)',
            alignItems: 'stretch',
          }}
        >
          {CARDS.map((card, i) => (
            <LifeCard key={card.id} card={card} index={i} inView={cardsInView} />
          ))}
        </div>

        {/* Read More CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 16 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: 'clamp(48px, 5vw, 64px)' }}
        >
          <button
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.26em',
              fontWeight: 500,
              color: '#1A3C6E',
              textTransform: 'uppercase',
              background: 'transparent',
              border: '1px solid rgba(26, 60, 110, 0.3)',
              borderRadius: '100px',
              padding: '14px 40px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#1A3C6E';
              (e.currentTarget as HTMLButtonElement).style.color = '#F8F6F2';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#1A3C6E';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = '#1A3C6E';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(26, 60, 110, 0.3)';
            }}
          >
            Read More...
          </button>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={ctaInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
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
