'use client';

import Link from 'next/link';

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: 'Home',       href: '#' },
  { label: 'About',      href: '#about' },
  { label: 'Academics',  href: '#programmes' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Contact',    href: '#contact' },
];

const ACADEMIC_LINKS = [
  { label: 'Pre School – Neelankarai',  href: '#' },
  { label: 'High School – Injambakkam', href: '#' },
];

// ─── Shared link style ────────────────────────────────────────────────────────

const linkBase: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '13.5px',
  fontWeight: 400,
  color: 'rgba(248, 246, 242, 0.6)',
  textDecoration: 'none',
  letterSpacing: '0.02em',
  lineHeight: 1.5,
  display: 'inline-block',
  transition: 'color 0.25s ease, opacity 0.25s ease',
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={linkBase}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#D4AF37'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248, 246, 242, 0.6)'; }}
    >
      {children}
    </a>
  );
}

// ─── Column heading ───────────────────────────────────────────────────────────

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <div style={{ width: '16px', height: '1px', background: '#D4AF37', flexShrink: 0 }} />
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '9.5px',
          letterSpacing: '0.26em',
          fontWeight: 600,
          color: '#D4AF37',
          textTransform: 'uppercase',
        }}>
          {children}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FooterSection() {
  return (
    <footer
      style={{
        background: 'linear-gradient(175deg, #091A35 0%, #0F2548 60%, #091A35 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.12)',
      }}
    >
      {/* Main footer body */}
      <div
        className="mx-auto"
        style={{
          maxWidth: '1280px',
          padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px) clamp(40px, 5vw, 64px)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(36px, 4vw, 56px)',
            alignItems: 'start',
          }}
        >
          {/* ── Col 1: Brand ── */}
          <div style={{ maxWidth: '260px' }}>
            {/* Logo mark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18 2L21.5 9.5L30 10.5L24 16.5L25.5 25L18 21L10.5 25L12 16.5L6 10.5L14.5 9.5L18 2Z" fill="#D4AF37" fillOpacity="0.92" />
                <path d="M18 6.5L20.8 12L27 12.7L22.5 17L23.7 23.2L18 20.2L12.3 23.2L13.5 17L9 12.7L15.2 12L18 6.5Z" fill="#F5E9B8" fillOpacity="0.55" />
                <rect x="15.5" y="26.5" width="5" height="7" rx="1" fill="#D4AF37" fillOpacity="0.75" />
                <rect x="13" y="32" width="10" height="1.5" rx="0.75" fill="#D4AF37" fillOpacity="0.9" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', lineHeight: 1 }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: '#D4AF37',
                  lineHeight: 1,
                }}>
                  VAELS
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '7px',
                  letterSpacing: '0.24em',
                  color: 'rgba(248, 246, 242, 0.45)',
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}>
                  INTERNATIONAL SCHOOL
                </span>
              </div>
            </div>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13.5px',
              fontWeight: 300,
              color: 'rgba(248, 246, 242, 0.5)',
              lineHeight: 1.75,
              margin: 0,
              letterSpacing: '0.01em',
            }}>
              Shaping future leaders with excellence in education.
            </p>

            {/* Gold rule accent */}
            <div style={{
              marginTop: '22px',
              width: '36px',
              height: '1px',
              background: 'linear-gradient(90deg, #D4AF37, rgba(212, 175, 55, 0.2))',
            }} aria-hidden="true" />
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <ColHeading>Quick Links</ColHeading>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {QUICK_LINKS.map(link => (
                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Academics ── */}
          <div>
            <ColHeading>Academics</ColHeading>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {ACADEMIC_LINKS.map(link => (
                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
              ))}
            </nav>
          </div>

          {/* ── Col 4: Contact ── */}
          <div>
            <ColHeading>Contact</ColHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Address */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#D4AF37', fontSize: '13px', lineHeight: 1.6, flexShrink: 0 }}>
                  ⌖
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(248, 246, 242, 0.55)',
                  lineHeight: 1.65,
                  letterSpacing: '0.01em',
                }}>
                  123, ECR, Neelankarai,<br />Chennai – 600041
                </span>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: '#D4AF37', fontSize: '12px', flexShrink: 0 }}>✆</span>
                <a
                  href="tel:+914400000000"
                  style={{
                    ...linkBase,
                    fontSize: '13px',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#D4AF37'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248, 246, 242, 0.6)'; }}
                >
                  +91 44 0000 0000
                </a>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: '#D4AF37', fontSize: '11px', flexShrink: 0 }}>✉</span>
                <a
                  href="mailto:info@vaels.edu.in"
                  style={{
                    ...linkBase,
                    fontSize: '13px',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#D4AF37'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248, 246, 242, 0.6)'; }}
                >
                  info@vaels.edu.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: '1px solid rgba(212, 175, 55, 0.1)',
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: '1280px',
            padding: '18px clamp(24px, 5vw, 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11.5px',
            letterSpacing: '0.08em',
            color: 'rgba(248, 246, 242, 0.22)',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.5,
          }}>
            © 2025 Vaels International School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
