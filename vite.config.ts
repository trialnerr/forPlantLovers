import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3001",
    //     changeOrigin: true,
    //   },
    // },
    proxy: {
      "/api": {
        target: "https://forplantlovers-server.onrender.com",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
