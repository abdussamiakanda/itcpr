import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  envPrefix: 'VITE_',
  // Handle .env file access issues gracefully
  envDir: process.cwd(),
  clearScreen: false
})

