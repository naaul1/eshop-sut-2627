/** Add a fixed delay (ms) to every API call — used for M3 flakiness measurement. */
export async function applyApiThrottle(page, delayMs = 300) {
  await page.route('**/api/**', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    await route.continue();
  });
}
