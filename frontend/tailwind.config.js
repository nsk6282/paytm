/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "text-gray-700":"#7F7F7F",
      "bg-gray-700":"#7F7F7F"
    },
  },
  plugins: [],
}

