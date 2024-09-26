/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('/src/assets/banner2.jpg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
  },
},
  plugins: [],
}

