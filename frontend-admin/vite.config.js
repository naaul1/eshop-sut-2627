import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
  },
  preview: {
    allowedHosts: ['admin-nmip.onrender.com', '.onrender.com'], // Cho phép tên miền cụ thể hoặc toàn bộ domain render
  }
})
