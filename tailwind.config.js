/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    // spacing: {
    // 1: '1rem',
    // 2: '2rem',
    // 3: '3rem',
    // 4: '3.5rem',
    // 20: '4rem',
    // 36: '8rem',
    // 48: '12rem',
    // 64: '16rem',
    // 80: '20rem',
    // 96: '24rem',
    // 112: '28rem',
    // 128: '32rem',
    // 144: '36rem',
    // },
    extend: {
      colors: {
        green: {
          600: "#164700",
          500: "#216b00",
          400: "#2d8e00",
          300: "#46c90c",
          200: "#38b200",
          100: "#43d600",
        },
        red: {
          600: "#DC2626",
          500: "#f3060d",
          400: "#f9242a",
          300: "#fa464c",
          200: "#fb696e",
          100: "#fc8c90",
        },
        yellow: {
          600: "#79780C",
          500: "#827C00",
          400: "#91900E",
          300: "#9D9C10",
          200: "#B3B39E",
          100: "#B4B319",
        },
      },
      boxShadow: {
        button: "0px 3px 11px #9F9F9F29",
        primary: "0px 3px 35px #8D8D8D29",
        secondary: "0px 3px 6px #0000001A",
        coupon: "0px 3px 26px #B7B7B729",
      },
    },
  },
  plugins: [],
};
