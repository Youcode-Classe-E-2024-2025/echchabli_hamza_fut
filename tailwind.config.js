/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',      
    './card.html',      
    './js/script.js',   
  ],
  theme: {
    extend: {
      fontSize: {
        xsmall: '6px',
        tiny: '8px',
        // Define your custom small text size
      },
      screens: {
        'max-900': { max: '900px' },
        'max-950': { max: '950px' },
        'max-800': { max: '800px' },
        'max-700': { max: '700px' },
        'max-600': { max: '600px' },
        'max-500': { max: '500px' },
        'max-470': { max: '470px' },
        'max-1000': { max: '1000px' },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
],

}

