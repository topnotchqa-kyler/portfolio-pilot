import { defineConfig, devices } from '@playwright/test';

// Vercel's /var/task root is read-only; only /tmp is writable at runtime.
const outputDir = process.env.VERCEL ? '/tmp/playwright-results' : './test-results';

export default defineConfig({
  testDir: './tests',
  outputDir,
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:9002',
    headless: true,
    screenshot: 'only-on-failure',
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
