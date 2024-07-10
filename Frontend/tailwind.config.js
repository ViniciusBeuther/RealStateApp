/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
            'primary':{
              100: '#cce1df',
              200: '#99c2bf',
              300: '#66a49e',
              400: '#33857e',
              500: '#00675E',
              600: '#00524b',
              700: '#004842',
              800: '#00342f',
              900: '#001f1c',
            },
            'customGray': {
              100: '#808080'
            },
            'customWhite':{
              100: '#f9f9f9'
            }
           },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
  darkMode: "class",
}
}