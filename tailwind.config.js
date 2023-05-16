import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
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
