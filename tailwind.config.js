/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#5c6ac4',
      secondary: '#ecc94b',
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}

