import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Timeout for each test */
  timeout: 60_000,                 // per test
  expect: { timeout: 3_000 },
  /* Retry on CI only */
  retries: 0, //process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1, // process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:5173',
    locale: 'vi-VN',               // makes toLocaleString() deterministic: 6.000.000
    timezoneId: 'Asia/Ho_Chi_Minh',
    headless: false,                // headless by default, unless test:headed
    trace: 'retain-on-failure',    // evidence for flake investigations
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: { slowMo: 3000 },//umber(process.env.SLOWMO || 0) },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Start the backend API and web frontend before running the tests. */
  webServer: [
    {
      command: 'node server.js',
      cwd: './backend',
      url: 'http://localhost:3000/api/products',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev',
      cwd: './frontend-web',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev',
      cwd: './frontend-admin',
      url: 'http://localhost:5174',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
