import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base makes assets work on subpaths (e.g. GitHub Pages).
  base: './',
  plugins: [react(), tailwindcss()],
})
