'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

import imgKamal from '../src/assets/Kamal Hasan.webp';
import imgGVM from '../src/assets/GVM.webp';
import imgSrikanth from '../src/assets/Srikanth.webp';
import imgTareen from '../src/assets/A.K. Tareen.webp';
import imgJiva from '../src/assets/Jiva.webp';
import imgLea from '../src/assets/Lea Rushton.webp';
import imgRadhikaa from '../src/assets/Radhikaa.webp';
import imgYoshinori from '../src/assets/Yoshinori.webp';

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
    name: 'Kamal Haasan',
    title: 'Actor · Filmmaker · Cultural Icon · Vaels Parent',
    quote: 'Vaels does not manufacture certificates. It manufactures conviction.',
    image: imgKamal,
  },
  {
    name: 'Gautham Vasudev Menon',
    title: 'Filmmaker · National Award Winner · Vaels Parent',
    quote: 'The environment here does what parenting alone cannot — it gives children a reason to be excellent.',
    image: imgGVM,
  },
  {
    name: 'Krish Srikanth',
    title: 'Former Indian Cricket Captain · Vaels Supporter',
    quote: "I've watched young athletes from this campus walk into national trials. Vaels builds competitors, not just students.",
    image: imgSrikanth,
  },
  {
    name: 'Aisha Nair',
    title: 'Vaels Alumna · UCL Class of 2024',
    quote: 'Cambridge interview. Oxford offer. Both started in a classroom here. Vaels never let me aim below my ceiling.',
    image: imgLea,
  },
  {
    name: 'Radhikaa Sarathkumar',
    title: 'Actress & Producer · Vaels Parent',
    quote: 'A school that nurtures creativity and discipline equally, creating well-rounded individuals ready for the world.',
    image: imgRadhikaa,
  },
  {
    name: 'Jiiva',
    title: 'Actor · Vaels Supporter',
    quote: 'The passion for sports and arts here is unmatched. It truly builds strong character and resilience.',
    image: imgJiva,
  },
  {
    name: 'Nawab A.K. Tareen',
    title: 'Former Diplomat',
    quote: 'An international standard of education right here in Chennai, shaping future leaders.',
    image: imgTareen,
  },
  {
    name: 'Yoshinori',
    title: 'International Dignitary',
    quote: 'Vaels bridges cultures, preparing students to be true global citizens with a broad perspective.',
    image: imgYoshinori,
  },
];

export default function SocialProofSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SUPPORTING.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SUPPORTING.length) % SUPPORTING.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SUPPORTING.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="testimonials"
      data-dark-section="true"
      style={{
        background: 'linear-gradient(160deg, #1A3C6E 0%, #0F2548 100%)',
        padding: 'clamp(32px, 4vw, 48px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
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

        <motion.div
          ref={headerRef}
          variants={spotlightVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 5vw, 64px)' }}
        >
          <motion.div
            variants={spotlightItemVariants}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}
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

          <motion.h2
            variants={spotlightItemVariants}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(38px, 4.5vw, 62px)',
              fontWeight: 600,
              color: '#F8F6F2',
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            What People{' '}
            <span style={{ fontStyle: 'italic', color: '#D4AF37' }}>Are Saying</span>
          </motion.h2>
        </motion.div>

        <div style={{ position: 'relative', overflow: 'hidden', paddingTop: 'clamp(32px, 4vw, 48px)', paddingBottom: 'clamp(32px, 4vw, 48px)' }}>
          <button
            onClick={goToPrev}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: 'clamp(8px, 2vw, 24px)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid rgba(212, 175, 55, 0.4)',
              background: 'rgba(15, 37, 72, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              color: '#D4AF37',
              fontSize: '20px',
            }}
            aria-label="Previous"
          >
            ←
          </button>

          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: 'clamp(8px, 2vw, 24px)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid rgba(212, 175, 55, 0.4)',
              background: 'rgba(15, 37, 72, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              color: '#D4AF37',
              fontSize: '20px',
            }}
            aria-label="Next"
          >
            →
          </button>

          <div style={{
            display: 'flex',
            width: '100%',
            willChange: 'transform',
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 380ms ease-out',
          }}>
            {SUPPORTING.map((t) => (
              <div
                key={t.name}
                style={{
                  width: '100%',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 clamp(64px, 8vw, 96px)',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', gap: '6px' }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span
                      key={j}
                      style={{ color: '#D4AF37', fontSize: '18px', lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(20px, 3vw, 36px)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'rgba(248, 246, 242, 0.88)',
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: '840px',
                }}>
                  "{t.quote}"
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}>
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
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#D4AF37',
                      letterSpacing: '0.03em',
                    }}>
                      {t.name}
                    </span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: 300,
                      color: 'rgba(248, 246, 242, 0.5)',
                      letterSpacing: '0.05em',
                    }}>
                      {t.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: '16px',
        }}>
          {SUPPORTING.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                width: currentIndex === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentIndex === i 
                  ? 'linear-gradient(90deg, #C9A227, #D4AF37)' 
                  : 'rgba(248, 246, 242, 0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={currentIndex === i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
