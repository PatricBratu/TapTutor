import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows access from local network (phone on same WiFi)
    port: 5173,
  },
})
