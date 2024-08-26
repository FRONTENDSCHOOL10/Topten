import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // src 폴더를 루트 디렉토리로 설정
  // root: 'src',
  publicDir: resolve(__dirname, 'public'),
  resolve: {
    // @ 기호를 사용하여 src 폴더의 경로를 별칭으로 설정
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // 빌드 결과물이 저장될 폴더를 dist로 설정
    outDir: 'dist',
    rollupOptions: {
      input: {
        // 기본 입력 파일을 설정 (index.html이 src 폴더 내에 위치한다고 가정)
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    // 개발 서버 설정
    host: 'localhost',
    port: 3000, // 개발 서버 포트 번호를 3000으로 설정
    open: false, // 서버 시작 시 브라우저 자동 열기
  },
  css: {
    // CSS 전처리기 옵션 설정
    preprocessorOptions: {
      scss: {
        // SCSS 변수 파일을 모든 SCSS 파일에 자동으로 포함
        // additionalData:
        //   @import "@/styles/main.scss";
        // ,
      },
      modules: {
        scopeBehaviour: 'local', // CSS Modules를 사용하여 CSS의 범위를 모듈 단위로 제한
      },
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
});