/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',      
    './card.html',      
    './js/script.js',   
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
],

}

