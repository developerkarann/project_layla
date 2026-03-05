import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    // Dev only: proxy /api to backend. Production uses API_BASE in src/api/client.js.
    proxy: {
      "/api": { target: "https://project-layla-cghn.vercel.app", changeOrigin: true },
      // "/api": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
})
