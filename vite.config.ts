import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'c8'
    },
    exclude: [
      ...configDefaults.exclude,
      './out/**/*',
    ],
  },
});
