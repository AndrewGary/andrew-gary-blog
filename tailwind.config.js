/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'sky': '#CAEBF2',
      'carbon': '#A9A9A9',
      'watermellon': '#FF3B3F',
      'neutral': '#EFEFEF',
      'black': '#000000'
    }
  },
  plugins: [],
}