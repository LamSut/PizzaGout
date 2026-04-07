import { fileURLToPath, URL } from 'node:url'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
dotenv.config()

import vue from '@vitejs/plugin-vue'

const target = process.env.VITE_TARGET || 'http://localhost:3000'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
      },
      '/public': {
        target,
        changeOrigin: true
      }
    },
  },
})