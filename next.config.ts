
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Tell Vercel's bundler to include test suite node_modules in the
  // run-tests serverless function, since spawn() calls aren't statically traceable.
  //
  // Only playwright node_modules are included here — wdio (153 MB) and cypress
  // (47.7 MB) node_modules would push the function over Vercel's 250 MB limit.
  // wdio and cypress test files (features, step-definitions, cypress/) are still
  // included so the test code itself is present; only their heavy node_modules
  // are excluded.  Those two suites are best run locally or in a dedicated CI job.
  outputFileTracingIncludes: {
    '/api/run-tests': [
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
