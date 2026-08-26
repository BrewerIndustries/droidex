import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /**
       * Sub-`xs` steps, in rem so they answer to the root font size set in
       * index.css. The app's terminal look leans on very small type, which was
       * hardcoded in px and therefore identical on a phone and on a 13" tablet.
       * Naming them keeps the scale finite — three steps below `xs` rather
       * than the ad-hoc 6/8/9/10/11px that had accumulated.
       */
      fontSize: {
        '4xs': ['0.5rem', { lineHeight: '1.3' }],
        '3xs': ['0.5625rem', { lineHeight: '1.3' }],
        '2xs': ['0.625rem', { lineHeight: '1.35' }],
      },
      /**
       * Apple's 44pt minimum, as a token so tap targets are not guessed at.
       *
       * Deliberately px rather than rem: this is a floor in physical units, not
       * part of the type scale. Controls whose padding is rem-based grow past
       * it on their own on a larger screen; this only catches the ones that
       * would otherwise stay too small to hit.
       */
      minHeight: {
        tap: '44px',
      },
      minWidth: {
        tap: '44px',
      },
      colors: {
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          glow: '#00e5ff',
        },
        orange: {
          accent: '#ff6a00',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 12px 2px rgba(0,229,255,0.45)',
        'glow-sm': '0 0 6px 1px rgba(0,229,255,0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
