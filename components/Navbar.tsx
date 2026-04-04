'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, Variants, useSpring, useMotionValue } from 'framer-motion';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Campus', href: '#campus' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Alumni', href: '#alumni' },
] as const;

// ─── Motion Variants ─────────────────────────────────────────────────────────

const navContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -14, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, x: -20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, x: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
};

// ─── NavLink Component ────────────────────────────────────────────────────────

interface NavLinkProps {
  href: string;
  label: string;
  scrolled: boolean;
}

function NavLink({ href, label, scrolled }: NavLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div variants={navItemVariants} className="relative">
      <motion.div
        animate={{ y: hovered ? -1 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <Link
          href={href}
          className="relative flex flex-col items-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            letterSpacing: '0.15em',
            fontVariant: 'small-caps',
            fontWeight: 500,
            color: scrolled ? '#1A3C6E' : '#F8F6F2',
            textDecoration: 'none',
            transition: 'color 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            gap: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '2px',
          }}
        >
          {label}
          {/* Gold underline — slides from center */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'block',
              height: '1px',
              width: '100%',
              background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
              transformOrigin: 'center',
            }}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Navbar CTA Button ────────────────────────────────────────────────────────

function NavCTAButton({ scrolled }: { scrolled: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="#admissions"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '12px',
        letterSpacing: '0.1em',
        fontWeight: 500,
        color: hovered ? '#0F2548' : '#D4AF37',
        background: hovered
          ? 'linear-gradient(135deg, #D4AF37 0%, #F5E9B8 50%, #D4AF37 100%)'
          : 'transparent',
        backgroundSize: hovered ? '200% 100%' : '100% 100%',
        border: `1.5px solid ${hovered ? '#D4AF37' : 'rgba(212, 175, 55, 0.65)'}`,
        borderRadius: '100px',
        padding: '10px 22px',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: 'color 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease',
        boxShadow: hovered
          ? '0 0 20px rgba(212, 175, 55, 0.35), 0 4px 16px rgba(212, 175, 55, 0.15)'
          : scrolled
          ? '0 2px 12px rgba(26, 60, 110, 0.06)'
          : 'none',
      }}
    >
      Enquire Now
      <motion.span
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 20 }}
        style={{ display: 'inline-block', fontSize: '14px' }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

// ─── Mobile Menu ─────────────────────────────────────────────────────────────

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 right-0 border-b"
          style={{
            background: 'rgba(248, 246, 242, 0.98)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            borderColor: 'rgba(212, 175, 55, 0.22)',
            boxShadow: '0 16px 48px rgba(26, 60, 110, 0.12)',
          }}
        >
          <nav className="flex flex-col px-6 py-5 gap-0">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.36,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    letterSpacing: '0.14em',
                    fontVariant: 'small-caps',
                    fontWeight: 500,
                    color: '#1A3C6E',
                    textDecoration: 'none',
                    borderColor: 'rgba(26, 60, 110, 0.07)',
                    // Minimum 44px touch target height
                    padding: '14px 0',
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '44px',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="pt-5 pb-1"
            >
              <Link
                href="#admissions"
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12.5px',
                  letterSpacing: '0.1em',
                  fontWeight: 500,
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F5E9B8 60%, #D4AF37 100%)',
                  color: '#0F2548',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  // 48px min height for thumb-friendly CTA
                  minHeight: '48px',
                  padding: '0 28px',
                  boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
                }}
              >
                Enquire Now&nbsp;→
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      className="fixed left-0 right-0 z-50"
      style={{
        top: 'var(--topbar-height, 40px)',
        background: scrolled
          ? 'rgba(248, 246, 242, 0.92)'
          : 'rgba(15, 37, 72, 0.55)',
        backdropFilter: scrolled ? 'blur(28px) saturate(200%)' : 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(200%)' : 'blur(16px) saturate(140%)',
        borderBottom: scrolled
          ? '1px solid rgba(212, 175, 55, 0.18)'
          : '1px solid rgba(212, 175, 55, 0.12)',
        boxShadow: scrolled
          ? '0 4px 40px rgba(26, 60, 110, 0.08), 0 1px 0 rgba(212, 175, 55, 0.08)'
          : '0 2px 32px rgba(15, 37, 72, 0.18)',
        transition:
          'background 0.45s cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease',
      }}
    >
      {/* Top gradient overlay – ensures nav is always readable over any hero background */}
      {!scrolled && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(15, 37, 72, 0.42) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1440px', position: 'relative', zIndex: 1 }}>
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ── */}
          <motion.div variants={logoVariants}>
            <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Outer star shape */}
                <path
                  d="M18 2L21.5 9.5L30 10.5L24 16.5L25.5 25L18 21L10.5 25L12 16.5L6 10.5L14.5 9.5L18 2Z"
                  fill="#D4AF37"
                  fillOpacity="0.92"
                />
                {/* Inner highlight */}
                <path
                  d="M18 6.5L20.8 12L27 12.7L22.5 17L23.7 23.2L18 20.2L12.3 23.2L13.5 17L9 12.7L15.2 12L18 6.5Z"
                  fill="#F5E9B8"
                  fillOpacity="0.55"
                />
                {/* Base/shield */}
                <rect x="15.5" y="26.5" width="5" height="7" rx="1" fill="#D4AF37" fillOpacity="0.75" />
                <rect x="13" y="32" width="10" height="1.5" rx="0.75" fill="#D4AF37" fillOpacity="0.9" />
              </svg>

              <div className="flex flex-col leading-none gap-0.5">
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '22px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: '#D4AF37',
                    lineHeight: 1,
                  }}
                >
                  VAELS
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '7.5px',
                    letterSpacing: '0.24em',
                    color: scrolled
                      ? 'rgba(26, 60, 110, 0.5)'
                      : 'rgba(248, 246, 242, 0.72)',
                    transition: 'color 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                    lineHeight: 1.4,
                    fontWeight: 400,
                  }}
                >
                  INTERNATIONAL SCHOOL
                </span>
              </div>
            </Link>
          </motion.div>

          {/* ── Desktop Nav Links ── */}
          <motion.nav
            variants={navContainerVariants}
            className="hidden lg:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} scrolled={scrolled} />
            ))}
          </motion.nav>

          {/* ── CTA Button ── */}
          <motion.div variants={ctaVariants} className="hidden lg:block">
            <NavCTAButton scrolled={scrolled} />
          </motion.div>

          {/* ── Mobile Hamburger (44×44 touch target) ── */}
          <motion.button
            variants={ctaVariants}
            className="lg:hidden flex flex-col justify-center items-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              // Minimum 44×44px for WCAG touch target compliance
              width: '44px',
              height: '44px',
              gap: '5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              // Slightly larger hit area via padding
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: scrolled ? '#1A3C6E' : '#F8F6F2',
                borderRadius: '2px',
                transformOrigin: 'center',
                transition: 'background 0.35s ease',
              }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
              style={{
                display: 'block',
                width: '15px',
                height: '1.5px',
                background: scrolled ? '#1A3C6E' : '#F8F6F2',
                borderRadius: '2px',
                transition: 'background 0.35s ease',
              }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: scrolled ? '#1A3C6E' : '#F8F6F2',
                borderRadius: '2px',
                transformOrigin: 'center',
                transition: 'background 0.35s ease',
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </motion.header>
  );
}
