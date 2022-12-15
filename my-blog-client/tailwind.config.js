/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#53BD95',
        primarydark: '#2c785c'
      },
      boxShadow: {
        fullwidth: '0 0 0 100vmax #53bd9515'
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      caveatbrush: 'Caveat Brush',
      caveat: 'Caveat'
    }
  },
  plugins: [],
}
