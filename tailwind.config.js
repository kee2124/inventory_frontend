/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          100: '#F5F5DC', // Light beige
        },
        brown: {
          300: '#9c6c52', // Light brown
          600: '#6F4F28', // Medium brown
          800: '#4E3629', // Dark brown
          900: '#3E2C1C', // Darkest brown (for hover effect)
        },
      },
    },
  },
  plugins: [],
}

