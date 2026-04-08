'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutUsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });

  return (
    <section
      id="about-us"
      style={{
        background: 'linear-gradient(175deg, #F8F6F2 0%, #F2F4F8 50%, #F8F6F2 100%)',
        padding: 'clamp(32px, 4vw, 48px) 0',
        overflow: 'hidden',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}
        >
          {/* Eyebrow rule */}
          <motion.div
            variants={itemVariants}
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
              Our Story
            </span>
            <div style={{ width: '32px', height: '1px', background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(38px, 4.5vw, 62px)',
              fontWeight: 600,
              color: '#1A3C6E',
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              margin: '0 0 clamp(32px, 4vw, 48px) 0',
            }}
          >
            About{' '}
            <span style={{ fontStyle: 'italic', color: '#0F2548' }}>Us</span>
          </motion.h2>

          {/* Paragraph 1 */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              fontWeight: 300,
              color: 'rgba(26, 60, 110, 0.65)',
              lineHeight: 1.75,
              margin: '0 0 24px 0',
            }}
          >
            Vaels International School provides a nurturing and stimulating environment for children that fosters joy, curiosity, and love for learning. Our philosophy is deeply rooted in creating a safe, loving, and inclusive space where our little ones can embark on their learning journey with joy and enthusiasm.
          </motion.p>

          {/* Gold divider */}
          <motion.div
            variants={itemVariants}
            style={{
              width: '40px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
              margin: '0 auto 24px',
            }}
            aria-hidden="true"
          />

          {/* Paragraph 2 */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              fontWeight: 300,
              color: 'rgba(26, 60, 110, 0.65)',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            The lush green campus in Neelankarai caters to children from Playschool to Grade 3. The children will then seamlessly get transferred to Vaels International School in Injambakkam that offers a National (ICSE &amp; ISC) and the International Cambridge curriculum (IGCSE/ AS/ A levels) from Grade 4 to Grade 12. The school has produced world toppers (IGCSE) and country toppers (AS/ A levels) in many subjects. Our students are well placed in highly reputed universities in India and across the world. The apt social physical and emotional environment in school allows the children to excel and forge ahead with confidence and drive to make them lifelong learners.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
