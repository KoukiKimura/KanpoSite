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
        primary: {
          DEFAULT: '#2D5016',
          light: '#3D6B1F',
          dark: '#1E3610',
        },
        accent: {
          DEFAULT: '#8B6914',
          light: '#A67D1A',
          dark: '#6B500F',
        },
        brand: {
          bg: '#FAFAF7',
          text: '#1C1C1C',
          muted: '#9E9E8C',
          cream: '#F5F0E8',
          border: '#E8E4DA',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Noto Sans JP"', 'Helvetica Neue', 'Arial', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      keyframes: {
        heroZoom: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.08)' },
        },
      },
      animation: {
        'hero-zoom': 'heroZoom 5.2s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
