const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Tenor Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          pink: '#ff3f6c',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        's1-cursor': 's1Cursor 8s ease-in-out infinite',
        's1-prompt': 's1Prompt 8s ease-in-out infinite',
        's1-loader': 's1Loader 8s ease-in-out infinite',
        's1-photo': 's1Photo 8s ease-in-out infinite',
        's1-scan': 's1Scan 8s ease-in-out infinite',
        'step2-cursor': 'clickBtn 4s ease-in-out infinite',
        'step2-btn': 'btnPress 4s ease-in-out infinite',
        'step3-loader': 's3Loader 6s ease-in-out infinite',
        'step3-image': 's3Image 6s ease-in-out infinite',
        'step3-badge': 's3Badge 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        s1Cursor: {
          '0%': { opacity: '0', transform: 'translate(30px, 30px)' },
          '10%': { opacity: '1', transform: 'translate(0, 0)' },
          '15%': { transform: 'scale(0.9)' },
          '20%': { transform: 'scale(1)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        s1Prompt: {
          '0%, 15%': { opacity: '1', transform: 'scale(1)' },
          '20%, 90%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        s1Loader: {
          '0%, 20%': { opacity: '0', transform: 'scale(0.8)' },
          '25%, 40%': { opacity: '1', transform: 'scale(1)' },
          '45%, 100%': { opacity: '0', transform: 'scale(1.1)' },
        },
        s1Photo: {
          '0%, 40%': { opacity: '0' },
          '45%, 90%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        s1Scan: {
          '0%, 50%': { top: '0%', opacity: '0' },
          '55%': { opacity: '1' },
          '85%': { top: '100%', opacity: '1' },
          '90%': { opacity: '0', top: '100%' },
          '100%': { opacity: '0' },
        },
        clickBtn: {
          '0%': { transform: 'translate(30px, 30px)' },
          '35%': { transform: 'translate(0, 0)' },
          '45%': { transform: 'scale(0.9) translate(0, 0)' },
          '55%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'translate(30px, 30px)' },
        },
        btnPress: {
          '0%, 35%': { transform: 'scale(1)', backgroundColor: '#facc15' },
          '45%': { transform: 'scale(0.95)', backgroundColor: '#eab308' },
          '55%': { transform: 'scale(1)', backgroundColor: '#facc15' },
          '100%': { transform: 'scale(1)' },
        },
        s3Loader: {
          '0%, 25%': { opacity: '1', transform: 'scale(1)' },
          '30%': { opacity: '0', transform: 'scale(0.8)' },
          '90%': { opacity: '0' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        s3Image: {
          '0%, 25%': { opacity: '0' },
          '30%, 90%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        s3Badge: {
          '0%, 35%': { opacity: '0', transform: 'translateY(10px) scale(0.9)' },
          '40%, 85%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '90%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
