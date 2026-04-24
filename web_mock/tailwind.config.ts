import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mock: {
          background: 'rgb(var(--mock-background) / <alpha-value>)',
          paper: 'rgb(var(--mock-paper) / <alpha-value>)',
          ink: 'rgb(var(--mock-ink) / <alpha-value>)',
          moss: 'rgb(var(--mock-moss) / <alpha-value>)',
          olive: 'rgb(var(--mock-olive) / <alpha-value>)',
          earth: 'rgb(var(--mock-earth) / <alpha-value>)',
          sand: 'rgb(var(--mock-sand) / <alpha-value>)',
          border: 'rgb(var(--mock-border) / <alpha-value>)',
          muted: 'rgb(var(--mock-muted) / <alpha-value>)',
          gold: 'rgb(var(--mock-gold) / <alpha-value>)',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'var(--font-noto-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-noto-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        frame: '0 24px 60px rgba(29, 36, 28, 0.12)',
      },
      maxWidth: {
        'screen-2xl': '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
