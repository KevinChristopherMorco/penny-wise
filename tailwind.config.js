/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        navFadeIn: {
          "0%": { opacity: 0.7 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { height: "0%" },
          "100%": { height: "70%" },
        },
        fillWidth: {
          "0%": { width: "0%" },
          "100%": { maxWidth: "100%" },
        },
      },
      animation: {
        navFadeIn: "navFadeIn 300ms ease-in-out",
        fadeIn: "fadeIn 100ms ease-in-out",
        slideUp: "slideUp 0.2s ease-in-out",
        fillWidth: "fillWidth 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};
