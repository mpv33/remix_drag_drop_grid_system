const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
