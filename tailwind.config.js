/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canal: { DEFAULT: '#0f5e7a', dark: '#0a3d52', light: '#e0f4fb' },
        amber: { DEFAULT: '#e8843a', dark: '#c56a24' },
        cream: '#faf7f2',
        sand:  '#f2ece1',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
