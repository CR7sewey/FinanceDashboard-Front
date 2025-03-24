/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/dashboard/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Garante que o Next.js use classes para dark mode

  theme: {
    extend: {},
  },
  plugins: [],
};
