/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        error404: "url('/src/assets/404.png')",
      },
    },
  },
  plugins: [],
};
