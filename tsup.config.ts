import { defineConfig } from 'tsup';
import postCssPlugin from 'esbuild-style-plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  dts: true,
  format: ['cjs', 'esm'],
  esbuildPlugins: [
    postCssPlugin({
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    })
  ],
  target: 'es2020',
  outDir: 'dist',
  platform: 'browser',
  bundle: true,
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  }
});
