import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: 5500,
  },
  root: resolve(__dirname, 'src'),
  build: {
    sourcemap: true,
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        // nested: resolve(__dirname, 'nested/index.html'),
      },
      output: {
        assetFileNames: assetInfo => {
          let extType = assetInfo.name.split('.').at(1);
          let fileName = '[name]';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }

          // CSS NAME
          if (/css/i.test(extType)) {
            fileName = 'style';
          }

          return `assets/${extType}/${fileName}-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/script-[hash].js',
        entryFileNames: 'assets/js/script-[hash].js',
      },
    },
  },
});
