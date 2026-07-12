import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    '../../packages/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // ─── CMYK ink palette (brand core) ────────────────────
        cyan: {
          DEFAULT: '#0AAEEC',
          50:  '#E6F7FE',
          100: '#C0EAFC',
          200: '#85D6F8',
          300: '#4AC2F4',
          400: '#0FAEEF',
          500: '#0AAEEC',
          600: '#0892C5',
          700: '#06769E',
          800: '#045B78',
          900: '#023F52',
        },
        magenta: {
          DEFAULT: '#E91E63',
          50:  '#FCE4EC',
          100: '#F8BBD0',
          200: '#F48FB1',
          300: '#F06292',
          400: '#EC407A',
          500: '#E91E63',
          600: '#D81B60',
          700: '#C2185B',
          800: '#AD1457',
          900: '#880E4F',
        },
        yellow: {
          DEFAULT: '#FFD600',
          50:  '#FFFDE7',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FFD600',
          600: '#FBC02D',
          700: '#F9A825',
          800: '#F57F17',
          900: '#E65100',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          50:  '#F7F7F7',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
          950: '#0A0A0A',
        },

        // Paper surfaces
        paper: {
          DEFAULT: '#FFFFFF',
          cream: '#F7F4EE',
          grey: '#F0F0F0',
        },

        // Utility / legacy aliases (kept so older components still compile)
        fountain: { DEFAULT: '#E91E63', 100: '#FCE4EC', 600: '#C2185B' },
        quiet: '#6B6B6B',
        edge: '#E5E7EB',
        forest: '#22C55E',
        stamp: '#EF4444',
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-inter)', 'Helvetica Neue', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'monospace'],
      },

      fontSize: {
        // Brochure-style oversized display
        'display-2xl': ['clamp(3rem, 10vw, 8rem)',     { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '900' }],
        'display-xl':  ['clamp(2.5rem, 7vw, 6rem)',    { lineHeight: '0.95', letterSpacing: '-0.035em', fontWeight: '900' }],
        'display-lg':  ['clamp(2rem, 5vw, 4.5rem)',    { lineHeight: '1.0',  letterSpacing: '-0.03em',  fontWeight: '800' }],
        'display-md':  ['clamp(1.75rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-sm':  ['clamp(1.5rem, 3vw, 2.5rem)',  { lineHeight: '1.1',  letterSpacing: '-0.02em',  fontWeight: '700' }],
      },

      letterSpacing: {
        tightest: '-0.04em',
        tracked: '0.18em',
        'tracked-wide': '0.24em',
      },

      maxWidth: {
        prose: '65ch',
        editorial: '52rem',
      },

      spacing: {
        'section-sm': 'clamp(3rem, 6vw, 5rem)',
        section: 'clamp(4rem, 8vw, 7rem)',
        'section-lg': 'clamp(6rem, 12vw, 10rem)',
      },

      borderRadius: {
        DEFAULT: '0.5rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        pill: '9999px',
        full: '9999px',
      },

      backgroundImage: {
        // Diagonal halftone texture for the hero (matches brochure)
        'halftone': `radial-gradient(circle at center, rgba(0,0,0,0.06) 1.2px, transparent 1.6px)`,
        'halftone-diagonal': `repeating-linear-gradient(135deg, rgba(0,0,0,0.025) 0 1px, transparent 1px 14px)`,
        'cmyk-stripe': 'linear-gradient(90deg, #0AAEEC 0 25%, #E91E63 25% 50%, #FFD600 50% 75%, #1A1A1A 75% 100%)',
      },

      animation: {
        'fade-in': 'fadeIn 700ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-up': 'fadeInUp 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-medium': 'floatSlow 6s ease-in-out infinite',
        'float-fast': 'floatSlow 4.5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee 32s linear infinite reverse',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'ribbon-flow': 'ribbonFlow 9s linear infinite',
      },

      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':      { transform: 'translateY(-14px) rotate(2deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%':      { transform: 'scale(1.05)', opacity: '0.92' },
        },
        ribbonFlow: {
          '0%':   { transform: 'translateX(-100%) skewY(-3deg)' },
          '100%': { transform: 'translateX(100%) skewY(-3deg)' },
        },
      },

      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
