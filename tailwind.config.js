/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00df82',
          primaryAccent: '#05c671',
          glow: '#b9ffe2',
          soft: 'rgba(0, 223, 130, 0.18)',
          secondary: '#030f0f',
        },
        surface: {
          light: '#f5fff9',
          DEFAULT: '#ffffff',
          muted: '#f1f5f9',
          dark: '#071f23',
        },
        ink: {
          DEFAULT: '#030f0f',
          subtle: '#516e66',
          light: '#e6fff5',
        },
      },
      fontFamily: {
        sans: ['"Poppins"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 22px 48px -18px rgba(0, 223, 130, 0.45)',
        'soft-lg': '0 28px 60px -24px rgba(3, 15, 15, 0.28)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at top left, rgba(0,223,130,0.25), transparent 55%), radial-gradient(circle at 80% 20%, rgba(3,15,15,0.35), transparent 60%)',
        'card-gradient':
          'linear-gradient(145deg, rgba(0, 223, 130, 0.08), rgba(3, 15, 15, 0.06))',
      },
    },
  },
  plugins: [],
}

