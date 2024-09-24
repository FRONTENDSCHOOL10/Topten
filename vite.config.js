import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import imageminSVGO from 'imagemin-svgo';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  publicDir: resolve(__dirname, 'public'),
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          'react-router-dom': ['react-router-dom'],
          'react-ecosystem': ['zustand', 'axios', 'react-hot-toast', 'motion'],
        },
      },
    },
    chunkSizeWarningLimit: 500, // 경고 임계값을 설정
  },
  server: {
    host: 'localhost',
    port: 3000,
    open: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        modules: {
          scopeBehaviour: 'local',
        },
      },
    },
  },
  plugins: [
    react(),
    visualizer(),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngquant(),
        svg: imageminSVGO(),
      },
      makeWebp: {
        plugins: {
          jpg: imageminWebp(),
          png: imageminWebp(),
        },
      },
    }),
  ],
});
