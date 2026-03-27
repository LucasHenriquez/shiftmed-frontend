// shiftmed-frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Esta línea es la magia. Los asteriscos dobles (**) son VITALES 
    // para que busque en todas las subcarpetas (views, modals, pages, etc.).
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        // Tu verde esmeralda original de la plataforma.
        // Ahora tienes clases como: text-primary, bg-primary, etc.
        primary: {
          DEFAULT: '#10b981',
        },
        // Tu azul muy oscuro original de la plataforma.
        // Ahora tienes clases como: text-dark, bg-dark, etc.
        dark: {
          DEFAULT: '#0f172a',
        },
      },
    },
  },
  plugins: [],
}