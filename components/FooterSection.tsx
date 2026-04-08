'use client';

import Link from 'next/link';
import Image from 'next/image';

// ─── Data ─────────────────────────────────────────────────────────────────────

const USEFUL_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Admission',  href: '#admissions' },
  { label: 'Academics',  href: '#programmes' },
  { label: 'Alumni',     href: '#alumni' },
  { label: 'Blogs',      href: '#' },
  { label: 'Newsletter', href: '#' },
  { label: 'Gallery',    href: '#' },
  { label: 'Contact Us', href: '#contact' },
];

// ─── Shared link style ────────────────────────────────────────────────────────

const linkBase: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '14px',
  fontWeight: 400,
  color: 'rgba(248, 246, 242, 0.8)',
  textDecoration: 'none',
  letterSpacing: '0.01em',
  lineHeight: 1.5,
  display: 'inline-block',
  transition: 'color 0.25s ease',
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={linkBase}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248, 246, 242, 0.8)'; }}
    >
      {children}
    </a>
  );
}

// ─── Column heading ───────────────────────────────────────────────────────────

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '18px',
      fontWeight: 600,
      color: '#FFFFFF',
      marginBottom: '16px',
      letterSpacing: '0.01em',
    }}>
      {children}
    </h3>
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
        className="mx-auto w-full px-6 lg:px-12"
        style={{
          maxWidth: '1440px',
          paddingTop: 'clamp(48px, 6vw, 64px)',
          paddingBottom: 'clamp(48px, 6vw, 64px)',
          textAlign: 'left',
        }}
      >
        {/* Logo Section */}
        <div className="mx-auto w-full max-w-2xl" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px', marginBottom: '32px' }}>
          <Image
            src="/images/vels-logo.webp"
            alt="Vaels International School Logo"
            width={100}
            height={100}
            style={{ objectFit: 'contain' }}
          />
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            fontWeight: 300,
            color: 'rgba(248, 246, 242, 0.8)',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '420px',
            letterSpacing: '0.01em',
          }}>
            Vaels International School is dedicated to providing a nurturing and stimulating environment for children that fosters joy, curiosity, and love for learning.
          </p>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'rgba(248, 246, 242, 0.1)',
          margin: '32px 0',
        }} />

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {/* ── Col 1: Pre-School ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <ColHeading>Pre-School</ColHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                color: 'rgba(248, 246, 242, 0.8)',
                lineHeight: 1.6,
                letterSpacing: '0.01em',
              }}>
                480, Third Main Road (South), Sri Kapaleeswarar Nagar, East Coast Road, Neelankarai, Chennai, Tamil Nadu - 600115
              </span>
              <a href="tel:+919790937620" style={{
                ...linkBase,
                fontSize: '14px',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248, 246, 242, 0.8)'; }}>
                +91-9790937620 / +91-9500057634
              </a>
              <a href="mailto:inquiry@vaelsinternationalschool.com" style={{
                ...linkBase,
                fontSize: '14px',
                wordBreak: 'break-all',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248, 246, 242, 0.8)'; }}>
                inquiry@vaelsinternationalschool.com
              </a>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                color: '#FFFFFF',
                marginBottom: '12px',
              }}>
                Follow Us
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start' }}>
                {['facebook', 'instagram', 'youtube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(248, 246, 242, 0.2)',
                      color: 'rgba(248, 246, 242, 0.8)',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = '#FFFFFF';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(248, 246, 242, 0.2)';
                      (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248, 246, 242, 0.8)';
                    }}
                  >
                    {social === 'facebook' && 'f'}
                    {social === 'instagram' && 'i'}
                    {social === 'youtube' && 'y'}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Col 2: High-School ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <ColHeading>High-School</ColHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                color: 'rgba(248, 246, 242, 0.8)',
                lineHeight: 1.6,
                letterSpacing: '0.01em',
              }}>
                Valmiki Street, Injambakkam, East Coast Road, Chennai, Tamil Nadu - 600115
              </span>
              <a href="tel:9600039910" style={{
                ...linkBase,
                fontSize: '14px',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248, 246, 242, 0.8)'; }}>
                96000 39910
              </a>
              <a href="mailto:info@vaelsinternationalschool.com" style={{
                ...linkBase,
                fontSize: '14px',
                wordBreak: 'break-all',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248, 246, 242, 0.8)'; }}>
                info@vaelsinternationalschool.com
              </a>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                color: '#FFFFFF',
                marginBottom: '12px',
              }}>
                Follow Us
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start' }}>
                {['facebook', 'instagram', 'youtube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(248, 246, 242, 0.2)',
                      color: 'rgba(248, 246, 242, 0.8)',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = '#FFFFFF';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(248, 246, 242, 0.2)';
                      (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248, 246, 242, 0.8)';
                    }}
                  >
                    {social === 'facebook' && 'f'}
                    {social === 'instagram' && 'i'}
                    {social === 'youtube' && 'y'}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Col 3: Useful Link ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <ColHeading>Useful Link</ColHeading>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
              {USEFUL_LINKS.map(link => (
                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        borderTop: '1px solid rgba(248, 246, 242, 0.1)',
      }}>
        <div
          className="mx-auto w-full px-6 lg:px-12"
          style={{
            maxWidth: '1440px',
            paddingTop: '16px',
            paddingBottom: '16px',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            color: 'rgba(248, 246, 242, 0.6)',
            margin: 0,
            lineHeight: 1.5,
          }}>
            Copyright 2025 © Vaels International Schools All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
