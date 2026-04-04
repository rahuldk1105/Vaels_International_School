'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

// ─── Announcement Content ────────────────────────────────────────────────────

const ANNOUNCEMENTS = [
  'Admissions Open for 2025–26',
  'Cambridge · IGCSE · AS & A Levels now accepting applications',
  'Guided campus tours every Saturday — Book your slot',
  'Scholarship examinations open for Grades 6 to 11',
  'KKIC Early Years Programme — limited seats remaining',
  'Over 14,000 alumni across 48 countries',
];

const SEGMENT = ANNOUNCEMENTS.join('     ·     ') + '     ·     ';
const TICKER_CONTENT = SEGMENT + SEGMENT; // duplicated for seamless loop

// ─── Inline Social Icons (thin-stroke SVG) ───────────────────────────────────

function InstagramSVG() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.6" cy="6.4" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookSVG() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeSVG() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.94A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── Social Icon Button ──────────────────────────────────────────────────────

interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -1, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0.55 }}
      animate={{ opacity: 0.55 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(26, 60, 110, 0.7)',
        padding: '12px 7px',
        cursor: 'pointer',
        textDecoration: 'none',
        lineHeight: 0,
      }}
    >
      {children}
    </motion.a>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function TopBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      className="topbar-root"
      role="banner"
      aria-label="School news and social links"
    >
      <div className="topbar-inner">

        {/* ── LEFT: Social icons ───────────────────────────────────────── */}
        <nav className="topbar-social" aria-label="Social media links">
          <SocialIcon href="https://instagram.com/vaelsinternationalschool" label="Vaels on Instagram">
            <InstagramSVG />
          </SocialIcon>
          <SocialIcon href="https://facebook.com/vaelsinternationalschool" label="Vaels on Facebook">
            <FacebookSVG />
          </SocialIcon>
          <SocialIcon href="https://youtube.com/@vaelsinternationalschool" label="Vaels on YouTube">
            <YoutubeSVG />
          </SocialIcon>

          {/* Separator */}
          <div className="topbar-sep" aria-hidden="true" />
        </nav>

        {/* ── CENTER: Ticker ───────────────────────────────────────────── */}
        <div className="topbar-ticker-wrap" aria-label="School announcements">
          {/* Edge fade masks */}
          <div className="topbar-mask topbar-mask-l" aria-hidden="true" />

          <div className="topbar-ticker-track" aria-hidden="true">
            <span className="topbar-ticker-text">{TICKER_CONTENT}</span>
          </div>

          {/* Screen-reader-only static version */}
          <ul style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
            {ANNOUNCEMENTS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <div className="topbar-mask topbar-mask-r" aria-hidden="true" />
        </div>

        {/* ── RIGHT: Contact ───────────────────────────────────────────── */}
        <div className="topbar-contact">
          <div className="topbar-sep topbar-sep-r" aria-hidden="true" />
          <motion.a
            href="tel:+914422571234"
            aria-label="Call Vaels International School"
            whileHover={{ opacity: 1, y: -1 }}
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 0.55 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: 'rgba(26, 60, 110, 0.7)',
              textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10.5px',
              letterSpacing: '0.05em',
              fontWeight: 400,
              whiteSpace: 'nowrap',
              padding: '0 0 0 12px',
            }}
          >
            <Phone size={11} strokeWidth={1.6} style={{ flexShrink: 0 }} />
            <span className="topbar-phone-num">+91 44 2257 1234</span>
          </motion.a>
        </div>
      </div>

      {/* ── Styles ─────────────────────────────────────────────────────── */}
      <style>{`
        /* Root bar */
        .topbar-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--topbar-height, 40px);
          z-index: 52;
          background: linear-gradient(
            90deg,
            rgba(235, 243, 255, 0.97) 0%,
            rgba(248, 246, 242, 0.98) 42%,
            rgba(248, 246, 242, 0.98) 58%,
            rgba(235, 243, 255, 0.97) 100%
          );
          backdrop-filter: blur(30px) saturate(170%);
          -webkit-backdrop-filter: blur(30px) saturate(170%);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.55) inset,
            0 1px 16px rgba(26, 60, 110, 0.045);
        }

        /* Inner flex row */
        .topbar-inner {
          display: flex;
          align-items: center;
          height: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 clamp(14px, 3vw, 48px);
        }

        /* Vertical separator */
        .topbar-sep {
          width: 1px;
          height: 14px;
          background: rgba(26, 60, 110, 0.1);
          flex-shrink: 0;
          margin: 0 4px;
        }
        .topbar-sep-r {
          margin: 0 0 0 4px;
        }

        /* ── Social ── */
        .topbar-social {
          display: flex;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
        }

        /* ── Ticker ── */
        .topbar-ticker-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          min-width: 0;
        }

        .topbar-mask {
          position: absolute;
          top: 0;
          height: 100%;
          width: 52px;
          z-index: 2;
          pointer-events: none;
        }
        .topbar-mask-l {
          left: 0;
          background: linear-gradient(90deg,
            rgba(240, 245, 255, 0.98) 0%,
            transparent 100%);
        }
        .topbar-mask-r {
          right: 0;
          background: linear-gradient(270deg,
            rgba(248, 246, 242, 0.98) 0%,
            transparent 100%);
        }

        .topbar-ticker-track {
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .topbar-ticker-text {
          display: inline-block;
          white-space: nowrap;
          will-change: transform;
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          letter-spacing: 0.045em;
          font-weight: 400;
          color: rgba(26, 60, 110, 0.52);
          animation: topbar-ticker 42s linear infinite;
          line-height: 1;
        }

        /* Pause on hover — gives user time to read */
        .topbar-ticker-wrap:hover .topbar-ticker-text {
          animation-play-state: paused;
        }

        @keyframes topbar-ticker {
          from { transform: translateX(0%); }
          to   { transform: translateX(-50%); }
        }

        /* ── Contact ── */
        .topbar-contact {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        /* ── Mobile overrides ── */
        @media (max-width: 640px) {
          .topbar-phone-num {
            display: none;
          }
          .topbar-contact {
            display: none;
          }
          .topbar-ticker-text {
            font-size: 10px;
            animation-duration: 36s;
          }
          .topbar-mask {
            width: 28px;
          }
        }

        @media (max-width: 380px) {
          .topbar-social {
            display: none;
          }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .topbar-ticker-text {
            animation: none;
          }
        }
      `}</style>
    </motion.div>
  );
}
