import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {
  runner: 'local',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json',
    },
  },
  specs: ['./features/**/*.feature'],
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
      },
    },
  ],
  logLevel: 'error',
  baseUrl: 'http://localhost:9002',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'cucumber',
  reporters: ['spec'],
  cucumberOpts: {
    require: ['./step-definitions/**/*.ts'],
    backtrace: false,
    dryRun: false,
    failFast: false,
    snippets: true,
    strict: false,
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
