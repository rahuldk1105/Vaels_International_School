'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ITEMS = [
  { type: 'text', value: 'Cambridge' },
  { type: 'dot' },
  { type: 'text', value: 'CISCE' },
  { type: 'dot' },
  { type: 'text', value: 'KKIC' },
  { type: 'dot' },
  { type: 'text', value: 'Est. 1992' },
  { type: 'dot' },
  { type: 'text', value: '14,000+ Alumni' },
  { type: 'dot' },
  { type: 'text', value: 'Chennai, India' },
  { type: 'dot' },
  { type: 'text', value: '48 Countries' },
  { type: 'dot' },
  { type: 'text', value: '98% Placement' },
  { type: 'dot' },
  { type: 'text', value: 'Cambridge' },
  { type: 'dot' },
  { type: 'text', value: 'CISCE' },
  { type: 'dot' },
  { type: 'text', value: 'KKIC' },
  { type: 'dot' },
  { type: 'text', value: 'Est. 1992' },
  { type: 'dot' },
  { type: 'text', value: '14,000+ Alumni' },
  { type: 'dot' },
  { type: 'text', value: 'Chennai, India' },
  { type: 'dot' },
  { type: 'text', value: '48 Countries' },
  { type: 'dot' },
  { type: 'text', value: '98% Placement' },
  { type: 'dot' },
] as const;

function MarqueeItems({ direction = 1 }: { direction?: 1 | -1 }) {
  return (
    <div
      className={direction === 1 ? 'marquee-track' : 'marquee-track-reverse'}
      style={{ display: 'flex', alignItems: 'center', gap: '0' }}
      aria-hidden="true"
    >
      {ITEMS.map((item, i) =>
        item.type === 'dot' ? (
          <span
            key={`dot-${i}`}
            style={{
              display: 'inline-block',
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.45)',
              margin: '0 18px',
              flexShrink: 0,
            }}
          />
        ) : (
          <span
            key={`text-${i}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.24em',
              fontWeight: 500,
              color:
                item.value === 'Cambridge' || item.value === 'CISCE' || item.value === 'KKIC'
                  ? '#D4AF37'
                  : 'rgba(248, 246, 242, 0.38)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {item.value}
          </span>
        )
      )}
    </div>
  );
}

export default function MarqueeStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(90deg, #0F2548 0%, #1A3C6E 50%, #0F2548 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.12)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.12)',
        overflow: 'hidden',
        padding: '14px 0',
        position: 'relative',
      }}
      aria-label="School highlights marquee"
    >
      {/* Left fade mask */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '80px',
          height: '100%',
          background:
            'linear-gradient(90deg, #0F2548 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Right fade mask */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80px',
          height: '100%',
          background:
            'linear-gradient(270deg, #0F2548 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <MarqueeItems direction={1} />

      {/* CSS keyframes injected inline */}
      <style>{`
        .marquee-track {
          animation: marquee-ltr 28s linear infinite;
          will-change: transform;
        }
        .marquee-track-reverse {
          animation: marquee-rtl 32s linear infinite;
          will-change: transform;
        }
        @keyframes marquee-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-rtl {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track,
          .marquee-track-reverse {
            animation: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
