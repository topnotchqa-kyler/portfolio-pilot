
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Prevent Next.js from bundling @sparticuz/chromium into the route handler.
  // When bundled, __dirname inside the package points to the bundle directory
  // rather than the package's node_modules directory, so the binary file at
  // bin/chromium.br cannot be found and executablePath() throws silently.
  // Marking it as external forces a runtime require() from node_modules with
  // the correct __dirname so binary extraction works on Vercel.
  serverExternalPackages: ['@sparticuz/chromium'],

  // Tell Vercel's bundler to include test suite node_modules in the
  // run-tests serverless function, since spawn() calls aren't statically traceable.
  //
  // Only playwright node_modules are included here — wdio (153 MB) and cypress
  // (47.7 MB) node_modules would push the function over Vercel's 250 MB limit.
  // wdio and cypress test files (features, step-definitions, cypress/) are still
  // included so the test code itself is present; only their heavy node_modules
  // are excluded.  Those two suites are best run locally or in a dedicated CI job.
  //
  // @sparticuz/chromium is listed explicitly so its bin/chromium.br binary is
  // guaranteed to be present alongside the JS files at runtime.
  outputFileTracingIncludes: {
    '/api/run-tests': [
      './node_modules/@sparticuz/chromium/**/*',
      './tests/playwright/node_modules/**/*',
      './tests/playwright/tests/**/*',
      './tests/cypress/cypress/**/*',
      './tests/wdio/features/**/*',
      './tests/wdio/step-definitions/**/*',
      './tests/wdio/dist/**/*',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'webdriver.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'playwright.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'go.cypress.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
