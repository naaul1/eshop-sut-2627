// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,                 // per test
  expect: { timeout: 5_000 },      // assertion retry window
  fullyParallel: false,
  retries: 0,                      // IMPORTANT: no retries — flakiness must be visible, not hidden
  workers: 1,                      // single worker: deterministic runs + shared SUT
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:5173',
    locale: 'vi-VN',               // makes toLocaleString() deterministic: 6.000.000
    timezoneId: 'Asia/Ho_Chi_Minh',
    headless: true,
    trace: 'retain-on-failure',    // evidence for flake investigations
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: { slowMo: Number(process.env.SLOWMO || 0) },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
