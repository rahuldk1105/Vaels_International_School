'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

// ─── Quote word-by-word highlight animation ───────────────────────────────────

function AnimatedQuote({ text, inView }: { text: string; inView: boolean }) {
  const words = text.split(' ');

  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.25, color: '#F8F6F2' }}
          animate={
            inView
              ? { opacity: 1, color: i % 5 === 0 ? '#D4AF37' : '#F8F6F2' }
              : { opacity: 0.25, color: '#F8F6F2' }
          }
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.4 + i * 0.055 }}
          style={{
            display: 'inline',
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Supporting Card ──────────────────────────────────────────────────────────

interface TestimonialCardProps {
  name: string;
  title: string;
  quote: string;
  image: string;
  inView: boolean;
  index: number;
}

function TestimonialCard({ name, title, quote, image, inView, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 + index * 0.14 }}
      style={{
        background: 'rgba(248, 246, 242, 0.055)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(212, 175, 55, 0.15)',
        borderTop: '2px solid rgba(212, 175, 55, 0.45)',
        borderRadius: '20px',
        padding: 'clamp(24px, 2.5vw, 36px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.65 + index * 0.14 + i * 0.06 }}
            style={{ color: '#D4AF37', fontSize: '14px', lineHeight: 1 }}
            aria-hidden="true"
          >
            ★
          </motion.span>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(16px, 1.5vw, 20px)',
        fontStyle: 'italic',
        fontWeight: 400,
        color: 'rgba(248, 246, 242, 0.82)',
        lineHeight: 1.6,
        margin: 0,
        flex: 1,
      }}>
        "{quote}"
      </p>

      {/* Attribution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(248,246,242,0.08)', paddingTop: '18px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1.5px solid rgba(212, 175, 55, 0.4)',
          flexShrink: 0,
          position: 'relative',
          background: 'rgba(212, 175, 55, 0.1)',
        }}>
          <Image src={image} alt={name} fill className="object-cover" sizes="44px" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            color: '#D4AF37',
            letterSpacing: '0.04em',
          }}>
            {name}
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 300,
            color: 'rgba(248, 246, 242, 0.45)',
            letterSpacing: '0.06em',
          }}>
            {title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section Variants ─────────────────────────────────────────────────────────

const spotlightVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const spotlightItemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

const SUPPORTING = [
  {
    name: 'Gautham Vasudev Menon',
    title: 'Filmmaker · National Award Winner · Vaels Parent',
    quote: 'The environment here does what parenting alone cannot — it gives children a reason to be excellent.',
    image: '/images/testimonial-gautham.jpg',
  },
  {
    name: 'Krish Srikanth',
    title: 'Former Indian Cricket Captain · Vaels Supporter',
    quote: "I've watched young athletes from this campus walk into national trials. Vaels builds competitors, not just students.",
    image: '/images/testimonial-krish.jpg',
  },
  {
    name: 'Aisha Nair',
    title: 'Vaels Alumna · UCL Class of 2024',
    quote: 'Cambridge interview. Oxford offer. Both started in a classroom here. Vaels never let me aim below my ceiling.',
    image: '/images/testimonial-alumni.jpg',
  },
];

export default function SocialProofSection() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const spotlightInView = useInView(spotlightRef, { once: true, margin: '-8% 0px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-5% 0px' });

  return (
    <section
      id="testimonials"
      data-dark-section="true"
      style={{
        background: 'linear-gradient(160deg, #1A3C6E 0%, #0F2548 100%)',
        padding: 'clamp(80px, 10vw, 140px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw',
        height: '60%',
        background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Background noise */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px',
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 clamp(24px, 5vw, 80px)' }}>

        {/* Spotlight Testimonial */}
        <motion.div
          ref={spotlightRef}
          variants={spotlightVariants}
          initial="hidden"
          animate={spotlightInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto', marginBottom: 'clamp(56px, 7vw, 96px)' }}
        >
          {/* Section eyebrow */}
          <motion.div
            variants={spotlightItemVariants}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}
          >
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6))' }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10.5px',
              letterSpacing: '0.28em',
              fontWeight: 500,
              color: 'rgba(212, 175, 55, 0.7)',
              textTransform: 'uppercase',
            }}>
              Voices of Vaels
            </span>
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, rgba(212,175,55,0.6), transparent)' }} />
          </motion.div>

          {/* Decorative quote mark */}
          <motion.div
            variants={spotlightItemVariants}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(72px, 9vw, 120px)',
              lineHeight: 0.7,
              color: 'rgba(212, 175, 55, 0.18)',
              marginBottom: '24px',
              userSelect: 'none',
            }}
            aria-hidden="true"
          >
            "
          </motion.div>

          {/* Animated Quote */}
          <motion.p
            variants={spotlightItemVariants}
            style={{
              fontSize: 'clamp(22px, 3vw, 40px)',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              margin: '0 0 36px 0',
            }}
          >
            <AnimatedQuote
              text="Vaels does not manufacture certificates. It manufactures conviction."
              inView={spotlightInView}
            />
          </motion.p>

          {/* Kamal Haasan Attribution */}
          <motion.div
            variants={spotlightItemVariants}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(212, 175, 55, 0.5)',
              position: 'relative',
              flexShrink: 0,
              background: 'rgba(212, 175, 55, 0.08)',
            }}>
              <Image
                src="/images/testimonial-kamal.jpg"
                alt="Kamal Haasan"
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                color: '#D4AF37',
                letterSpacing: '0.04em',
              }}>
                Kamal Haasan
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 300,
                color: 'rgba(248, 246, 242, 0.4)',
                letterSpacing: '0.08em',
              }}>
                Actor · Filmmaker · Cultural Icon · Vaels Parent
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={spotlightInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)',
            marginBottom: 'clamp(48px, 6vw, 80px)',
            transformOrigin: 'center',
          }}
          aria-hidden="true"
        />

        {/* Supporting Cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(14px, 2vw, 22px)',
          }}
        >
          {SUPPORTING.map((t, i) => (
            <TestimonialCard
              key={t.name}
              name={t.name}
              title={t.title}
              quote={t.quote}
              image={t.image}
              inView={cardsInView}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
