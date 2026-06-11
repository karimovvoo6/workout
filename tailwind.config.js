/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lesnar-dark': '#070709',
        'lesnar-slate': '#121217',
        'lesnar-card': '#16161f',
        'lesnar-input': '#20202a',
        'lesnar-red': '#e51b23',
        'lesnar-red-hover': '#ff2a30',
        'lesnar-gold': '#ff9500',
        'lesnar-green': '#30d158',
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
