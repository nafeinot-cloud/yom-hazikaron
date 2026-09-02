import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon-32.png', 'apple-touch-icon.png'],
      manifest: {
        id: '/',
        name: 'לוח הזכרונות',
        short_name: 'לוח הזכרונות',
        description: 'תאריכי יום הזכרון, לימוד משניות, ותפילה בעלייה לקבר - לכל המשפחה',
        lang: 'he',
        dir: 'rtl',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#fdf6ec',
        theme_color: '#fdf6ec',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Cache the app shell so it opens even with a flaky connection;
        // Firestore/Storage/Auth calls still need real network to work.
        globPatterns: ['**/*.{js,css,html,png,svg}'],
      },
    }),
  ],
});
