/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
