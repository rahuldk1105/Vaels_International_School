'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ─── Count-up Hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number, triggered: boolean): { value: number; done: boolean } {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
        setDone(true);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [triggered, target, duration]);

  return { value, done };
}

// ─── World Map SVG ────────────────────────────────────────────────────────────
// Simplified continent paths — 800×400 viewBox

const CONTINENTS = [
  // North America
  { id: 'na', d: 'M 65 55 L 90 45 L 130 48 L 158 60 L 175 75 L 185 100 L 195 130 L 185 155 L 170 170 L 150 175 L 125 168 L 105 152 L 85 130 L 70 108 L 60 82 Z' },
  // South America
  { id: 'sa', d: 'M 148 185 L 175 180 L 196 195 L 205 222 L 204 262 L 194 295 L 178 320 L 160 330 L 148 314 L 140 285 L 137 248 L 140 215 Z' },
  // Europe
  { id: 'eu', d: 'M 342 58 L 390 53 L 416 64 L 426 82 L 415 100 L 388 108 L 363 106 L 347 90 L 340 72 Z' },
  // Africa
  { id: 'af', d: 'M 344 118 L 394 112 L 425 122 L 441 150 L 445 188 L 440 232 L 420 268 L 394 288 L 364 284 L 341 258 L 332 224 L 332 178 L 338 145 Z' },
  // Middle East peninsula
  { id: 'me', d: 'M 428 106 L 466 100 L 490 116 L 488 140 L 462 147 L 434 132 Z' },
  // Asia (main body)
  { id: 'as', d: 'M 420 54 L 502 46 L 582 50 L 648 57 L 702 64 L 726 86 L 730 112 L 716 138 L 693 155 L 648 164 L 590 168 L 545 175 L 510 165 L 472 152 L 448 132 L 430 108 L 422 80 Z' },
  // Indian subcontinent
  { id: 'in', d: 'M 488 162 L 520 165 L 536 192 L 520 218 L 500 220 L 484 202 L 482 176 Z' },
  // Southeast Asia
  { id: 'se', d: 'M 590 158 L 635 160 L 660 175 L 658 196 L 634 200 L 607 194 L 590 178 Z' },
  // Australia
  { id: 'au', d: 'M 614 240 L 665 232 L 706 242 L 720 268 L 714 296 L 686 312 L 646 312 L 618 298 L 604 272 L 608 252 Z' },
  // Japan
  { id: 'jp', d: 'M 698 86 L 720 82 L 732 94 L 728 112 L 712 118 L 698 108 Z' },
  // UK island (small)
  { id: 'uk', d: 'M 334 56 L 344 52 L 350 60 L 344 70 L 336 66 Z' },
];

// City positions on the 800×400 viewBox (approximate lon/lat projection)
const CITIES = [
  { id: 'chennai',  label: 'Chennai',   x: 543, y: 182, isOrigin: true  },
  { id: 'london',   label: 'London',    x: 352, y: 74,  isOrigin: false },
  { id: 'newyork',  label: 'New York',  x: 195, y: 100, isOrigin: false },
  { id: 'singapore',label: 'Singapore', x: 627, y: 188, isOrigin: false },
  { id: 'sydney',   label: 'Sydney',    x: 700, y: 278, isOrigin: false },
  { id: 'toronto',  label: 'Toronto',   x: 188, y: 93,  isOrigin: false },
  { id: 'dubai',    label: 'Dubai',     x: 510, y: 140, isOrigin: false },
  { id: 'tokyo',    label: 'Tokyo',     x: 706, y: 108, isOrigin: false },
];

// Build arc path from Chennai to each destination
function buildArc(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.18;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

const ORIGIN = CITIES.find(c => c.isOrigin)!;

function WorldMap({ inView }: { inView: boolean }) {
  return (
    <svg
      viewBox="0 0 800 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      aria-label="World map showing Vaels alumni destinations"
      role="img"
    >
      {/* Ocean background */}
      <rect width="800" height="400" fill="transparent" />

      {/* Continent fills */}
      {CONTINENTS.map(c => (
        <path
          key={c.id}
          d={c.d}
          fill="rgba(26, 60, 110, 0.18)"
          stroke="rgba(26, 60, 110, 0.35)"
          strokeWidth="0.8"
        />
      ))}

      {/* Connection arcs from Chennai */}
      {CITIES.filter(c => !c.isOrigin).map((city, i) => (
        <motion.path
          key={city.id}
          d={buildArc(ORIGIN.x, ORIGIN.y, city.x, city.y)}
          stroke="rgba(212, 175, 55, 0.22)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 + i * 0.12 }}
        />
      ))}

      {/* City dots */}
      {CITIES.map((city, i) => (
        <g key={city.id}>
          {/* Outer pulse ring */}
          <motion.circle
            cx={city.x}
            cy={city.y}
            r={city.isOrigin ? 14 : 10}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.8"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={inView
              ? { scale: [0.8, 1.4, 0.8], opacity: [0, 0.35, 0] }
              : { scale: 0.6, opacity: 0 }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.2 + i * 0.18,
            }}
          />
          {/* Dot */}
          <motion.circle
            cx={city.x}
            cy={city.y}
            r={city.isOrigin ? 4.5 : 3}
            fill={city.isOrigin ? '#D4AF37' : 'rgba(212, 175, 55, 0.75)'}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 1.0 + i * 0.1 }}
          />
          {/* City label (only on larger screens — hidden for clutter control) */}
          {city.isOrigin && (
            <motion.text
              x={city.x + 8}
              y={city.y - 6}
              fill="#D4AF37"
              fontSize="8"
              fontFamily="'DM Sans', sans-serif"
              letterSpacing="0.08em"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.8 } : {}}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              CHENNAI
            </motion.text>
          )}
        </g>
      ))}
    </svg>
  );
}

// ─── Stat Row Item ────────────────────────────────────────────────────────────

interface StatRowProps {
  value: number;
  suffix: string;
  label: string;
  triggered: boolean;
  duration?: number;
}

function StatRow({ value, suffix, label, triggered, duration = 1.8 }: StatRowProps) {
  const { value: count } = useCountUp(value, duration, triggered);

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', padding: '14px 0', borderBottom: '1px solid rgba(26,60,110,0.08)' }}>
      <div style={{
        fontFamily: "'DM Mono', 'Courier New', monospace",
        fontSize: 'clamp(26px, 2.8vw, 38px)',
        fontWeight: 700,
        color: '#1A3C6E',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        minWidth: '3ch',
      }}>
        {count.toLocaleString()}
        <span style={{ color: '#D4AF37', fontSize: '0.62em', marginLeft: '2px' }}>{suffix}</span>
      </div>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 'clamp(12px, 1vw, 14px)',
        fontWeight: 300,
        color: 'rgba(26, 60, 110, 0.58)',
        lineHeight: 1.5,
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── University Logo Strip ────────────────────────────────────────────────────

const UNIVERSITIES = ['UCL', 'NUS', 'UIUC', 'TU Munich', 'NYU', 'Warwick', 'RMIT'];

function UniversityStrip({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
      style={{ marginTop: '28px' }}
    >
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '10px',
        letterSpacing: '0.2em',
        color: 'rgba(26, 60, 110, 0.4)',
        marginBottom: '12px',
        textTransform: 'uppercase',
      }}>
        Alumni Admitted To
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {UNIVERSITIES.map((uni, i) => (
          <motion.div
            key={uni}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.95 + i * 0.07 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: 'rgba(26, 60, 110, 0.55)',
              background: 'rgba(26, 60, 110, 0.05)',
              border: '1px solid rgba(26, 60, 110, 0.1)',
              borderRadius: '100px',
              padding: '5px 12px',
            }}
          >
            {uni}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Motion Variants ─────────────────────────────────────────────────────────

const textBlockVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GlobalOutcomesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-6% 0px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-5% 0px' });
  const mapInView = useInView(mapRef, { once: true, margin: '-8% 0px' });

  return (
    <section
      id="alumni"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(to bottom, #F8F6F2 0%, #EEF2FA 35%, #E8EFF9 65%, #F8F6F2 100%)',
        padding: 'clamp(80px, 10vw, 140px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(48px, 6vw, 88px)',
            alignItems: 'center',
          }}
        >
          {/* ── Left: World Map ── */}
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, x: -32, filter: 'blur(10px)' }}
            animate={mapInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'linear-gradient(145deg, #DDE8F8 0%, #E6F0FF 60%, #D8E6F8 100%)',
              borderRadius: '24px',
              padding: 'clamp(20px, 3vw, 32px)',
              aspectRatio: '2 / 1',
              minHeight: '280px',
              boxShadow: '0 12px 60px rgba(26, 60, 110, 0.14), 0 2px 12px rgba(26, 60, 110, 0.06), inset 0 1px 0 rgba(255,255,255,0.55)',
              border: '1px solid rgba(26, 60, 110, 0.09)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Grid overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(26,60,110,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(26,60,110,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              borderRadius: '24px',
              pointerEvents: 'none',
            }} aria-hidden="true" />

            <WorldMap inView={mapInView} />

            {/* Legend */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37' }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '9px',
                letterSpacing: '0.16em',
                color: 'rgba(26, 60, 110, 0.45)',
                textTransform: 'uppercase',
              }}>
                Vaels Alumni Destinations
              </span>
            </div>
          </motion.div>

          {/* ── Right: Stats ── */}
          <motion.div
            ref={statsRef}
            variants={textBlockVariants}
            initial="hidden"
            animate={sectionInView ? 'visible' : 'hidden'}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {/* Eyebrow */}
            <motion.div variants={textItemVariants} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '28px', height: '1px', background: '#D4AF37' }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10.5px',
                letterSpacing: '0.26em',
                fontWeight: 500,
                color: '#D4AF37',
                textTransform: 'uppercase',
              }}>
                The Vaels Atlas
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2 variants={textItemVariants} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(34px, 4vw, 54px)',
              fontWeight: 600,
              color: '#1A3C6E',
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              margin: '0 0 32px 0',
            }}>
              48 countries.
              <br />
              <span style={{ fontStyle: 'italic', color: '#0F2548' }}>One origin story.</span>
            </motion.h2>

            {/* Stats */}
            <motion.div variants={textItemVariants}>
              <StatRow value={94} suffix="%" label="admitted to top-100 global universities" triggered={statsInView} duration={1.4} />
              <StatRow value={2.4} suffix="M+" label="in international scholarships — 2024 alone" triggered={statsInView} duration={1.6} />
              <StatRow value={12} suffix="" label="national athletes, 2 international" triggered={statsInView} duration={1.2} />
              <StatRow value={48} suffix="+" label="countries with active Vaels alumni" triggered={statsInView} duration={1.5} />
            </motion.div>

            {/* University strip */}
            <motion.div variants={textItemVariants}>
              <UniversityStrip inView={statsInView} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
