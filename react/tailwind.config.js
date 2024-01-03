/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            orange: "#ff6b35",
            grey: "#eee"
        }
      },
    },
    plugins: [],
  }

