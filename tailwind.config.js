/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/layouts/*.ejs",
    "./views/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    }
  ],
}
