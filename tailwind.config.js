/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',      // Navy Blue
        secondary: '#059669',    // Emerald Green
        accent: '#F59E0B',       // Amber
        'base-100': '#FFFFFF',
        'base-200': '#F9FAFB',   // Light Gray
        'base-content': '#0F172A', // Dark Slate
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
