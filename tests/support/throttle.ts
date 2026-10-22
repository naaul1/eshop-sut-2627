import { Page } from '@playwright/test';

/** Add a fixed delay (ms) to every API call — used for M3 flakiness measurement. */
export async function applyApiThrottle(page: Page, delayMs = 300): Promise<void> {
  await page.route('**/api/**', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    await route.continue();
  });
}