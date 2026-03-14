import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['wavygo-brand-logo.png', 'vite.svg'],
      manifest: {
        name: 'WavyGo - Best Bike Rentals',
        short_name: 'WavyGo',
        description: 'Book self-drive adventures with WavyGo.',
        theme_color: '#035c3e',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/wavygo-brand-logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/wavygo-brand-logo.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/wavygo-brand-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 5174,
    strictPort: true,
  }
})
