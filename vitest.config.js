import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['**/*.test.ts', '**/*.test.tsx'],
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    globals: true
  }
});
