import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'royal-blue': '#1A3C6E',
        'soft-gold': '#D4AF37',
        ivory: '#F8F6F2',
        'sky-blue': '#E6F0FF',
        'deep-blue': '#0F2548',
        'gold-light': '#F5E9B8',
        mist: '#F2F4F8',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
      },
      screens: {
        xs: '480px',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'ken-burns': 'kenBurns 14s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
