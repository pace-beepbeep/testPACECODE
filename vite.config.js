import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        jurusan: resolve(__dirname, "jurusan.html"),
        profil: resolve(__dirname, "profil.html"),
      },
    },
  },
})