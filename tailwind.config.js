/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#ecffff",
          100: "#cffefe",
          200: "#a5fafc",
          300: "#67f3f9",
          400: "#22e2ee",
          500: "#06c6d4",
          600: "#089eb2",
          700: "#0e7e90",
          800: "#156575",
          900: "#134855",
          950: "#083844",
        },
      },
    },
  },
  plugins: [],
};
