/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        primary: "#F07863",
        secondary: "#FFF8EE",
        complimentary: "#5AC2A7",
        dark: "#2C2C2C",
        card: "#DAD8CD",
      },
    },
    fontFamily: {
      headers: ["Fredoka one"],
      paragraphs: ["Inter"],
    },
  },
  plugins: [],
};
