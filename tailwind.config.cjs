/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          800: "#0C2C55",
          900: "#071f3c",
          50: "#eef3fb",
        },
      },
      boxShadow: {
        soft: "0 10px 25px rgba(2, 6, 23, 0.08)",
      },
    },
  },
  plugins: [],
};
