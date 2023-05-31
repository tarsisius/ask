import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Albert Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          purple: '#D323FF',
          black: '#212121',
          white: '#F8F8F8',
        },
      },
    },
  },
  plugins: [],
}
