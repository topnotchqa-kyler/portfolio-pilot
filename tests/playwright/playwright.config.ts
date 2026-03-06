import { defineConfig, devices } from '@playwright/test';

const isVercel = !!process.env.VERCEL;

// Vercel's /var/task root is read-only; only /tmp is writable at runtime.
const outputDir = isVercel ? '/tmp/playwright-results' : './test-results';

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
    // On Vercel: use the @sparticuz/chromium binary extracted by the API route,
    // with the minimal args required for a containerised/serverless environment.
    ...(isVercel && {
      launchOptions: {
        executablePath: process.env.CHROMIUM_PATH,
        args: [
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--no-zygote',
          '--single-process',
        ],
      },
    }),
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
