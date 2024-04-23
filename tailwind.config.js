const colors = require('tailwindcss/colors')

module.exports = {
  content: [ 
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}' 
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      custom: {
        'brand': {
          DEFAULT: '#009AF2',
          hover: '#007AC2',
          link: 'link'
        },
        'text': {
          1: '#FFFFFF',
          2: '#BFBFBF',
          3: '#9F9F9F'
        },
        background: {
          1: '#353535',
          2: '#2B2B2B',
          3: '#202020',
          4: '#151515'
        }
      }
    },
    extend: {
      spacing: {
        'side-panel-width': '430px',
        'bottom-panel-height': '250px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
