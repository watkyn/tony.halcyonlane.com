import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: '_src/js/index.js',
      output: {
        dir: 'assets/js',
        entryFileNames: 'bundle.js',
        format: 'iife',
      },
    },
    minify: 'esbuild',
    emptyOutDir: false,
  },
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/_site/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['_src/js/engine/**/*.js'],
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
});
