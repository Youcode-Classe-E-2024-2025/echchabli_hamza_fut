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
        xsmall: '6px', // Define your custom small text size
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
],

}

