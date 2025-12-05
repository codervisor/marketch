/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'hard': '4px 4px 0px 0px rgba(0,0,0,1)',
      },
    },
  },
  plugins: [],
}
