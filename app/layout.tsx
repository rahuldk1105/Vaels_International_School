import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vaels International School — Chennai',
  description:
    'Cambridge, CISCE & KKIC curricula. Shaping the next generation of global thinkers, leaders, and changemakers since 1992.',
  keywords: [
    'Vaels International School',
    'Cambridge school Chennai',
    'IGCSE Chennai',
    'ICSE school Chennai',
    'best international school Chennai',
  ],
  openGraph: {
    title: 'Vaels International School',
    description: 'Some schools teach children. We shape the people they become.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body
        style={{
          margin: 0,
          padding: 0,
          background: '#F8F6F2',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        {children}
      </body>
    </html>
  );
}
