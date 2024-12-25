import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures all build files go into the 'dist' folder
    rollupOptions: {
      input: './index.html', // Define entry point
    },
  },
  root: './'
})
