/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},

    fontFamily: {
      work: ["Work Sans", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
      Orbitron: ["Orbitron", "sans-serif"],
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
