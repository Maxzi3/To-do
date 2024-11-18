/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5F5F5",
        secondary: "#f1c40f",
        active: "#4CAF50",
        textcolor:"#333333",
      },
    },
  },
  plugins: [],
};
