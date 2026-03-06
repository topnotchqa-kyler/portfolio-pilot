
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // Tell Vercel's bundler to include test suite node_modules in the
    // run-tests serverless function, since spawn() calls aren't statically traceable.
    outputFileTracingIncludes: {
      '/api/run-tests': [
        './tests/playwright/node_modules/**/*',
        './tests/cypress/node_modules/**/*',
        './tests/wdio/node_modules/**/*',
        './tests/playwright/tests/**/*',
        './tests/cypress/cypress/**/*',
        './tests/wdio/features/**/*',
        './tests/wdio/step-definitions/**/*',
        './tests/wdio/dist/**/*',
      ],
    },
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
