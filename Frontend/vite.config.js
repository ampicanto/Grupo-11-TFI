// frontend/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ------------------------------------
  // AÑADIMOS LA CONFIGURACIÓN DEL PROXY
  server: {
    proxy: {
      // Redirige todas las peticiones a /api a tu servidor de Express en el puerto 8000
      '/api': {
        target: 'http://localhost:8000', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // ------------------------------------
})