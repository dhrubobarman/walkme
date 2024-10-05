import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'walkme',
      fileName: (format) => `walkme.${format}.js`
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
