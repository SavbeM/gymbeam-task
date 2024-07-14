/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#252525',
      'purple': '#6C63FF',
      'white': '#F7F7F7',
      'dark-purple': '#534CC2',
      'green': '#4CAF50', // Зеленый
      'red': '#F44336', // Красный
      'yellow': '#FFEB3B',
    },
    extend: {
      fontFamily: {
        'kanit-medium': ['Kanit', 'sans-serif'],
        'inter-medium': ['Inter', 'sans-serif'],
        'kanit-regular': ['Kanit', 'sans-serif'],
        'inter-bold': ['Inter', 'sans-serif'],
        'raleway-regular': ['Raleway', 'sans-serif'],
        'raleway-bold': ['Raleway', 'sans-serif'],
      },
      fontWeight: {
        'regular': 400,
        'medium': 500,
        'bold': 700,
      },
      stroke: theme => ({
        'purple': theme('colors.purple.600'),
        'red': theme('colors.red.600'),
      }),
    },
      variants: {
          fill: ['hover', 'focus'],
          stroke: ['hover', 'focus'],
      },
    plugins: [],

  }
}