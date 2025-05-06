/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.tsx', // Source of content
  ],
  darkMode: 'class', // Enable dark mode via classes
  theme: {
    extend: {
      // Custom color palette
      colors: {
        primary: '#29ABE2', // Light Blue
        secondary: '#FFFFFF', // White
        accent: {
          DEFAULT: '#FFDA63', // Gold/Yellow
          dark: '#34495E',   // Dark Gray
        },
      },
      // Custom font families
      fontFamily: {
        'montserrat': ['Montserrat', ...defaultTheme.fontFamily.sans], // For headings and UI
        'open-sans': ['Open Sans', ...defaultTheme.fontFamily.sans], // For body text
      },
      // Custom screen sizes
      screens: {
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1536px',
      },
    },
  },
  plugins: [],
}