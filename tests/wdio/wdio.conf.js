export const config = {
  runner: 'local',
  autoCompileOpts: {
    autoCompile: false,
  },
  specs: ['./features/**/*.feature'],
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,800'],
      },
    },
  ],
  logLevel: 'error',
  baseUrl: 'http://localhost:9002',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [],
  hostname: 'localhost',
  port: 9515,
  path: '/',
  framework: 'cucumber',
  reporters: ['spec'],
  cucumberOpts: {
    import: ['./dist/step-definitions/**/*.js'],
    backtrace: false,
    dryRun: false,
    failFast: false,
    snippets: true,
    strict: false,
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
