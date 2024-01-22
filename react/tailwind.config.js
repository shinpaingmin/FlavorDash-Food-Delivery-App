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
        },
        transitionProperty: {
            animate: '0.6s cubic-bezier(0.19, 1, 0.22, 1)'
        },
        minHeight: (theme) => ({
            ...theme('spacing'),
          }),
      },
    },
    plugins: [],
  }

