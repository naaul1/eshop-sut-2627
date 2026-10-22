/**
 * M3 forced-race experiment (Task_Assignment §8.4) — SCRATCH FILE, delete before merging.
 *
 * Reproduces the app-side auth bootstrap race: Cart.jsx decides `user` from AuthContext
 * before the async GET /api/users/me resolves, so an early "Tiến hành thanh toán" click
 * hits the `!user` branch (alert + redirect to /login).
 *
 * Run:  PROFILE_DELAY_MS=350 npx playwright test tests/checkout/race-experiment.spec.js \
 *         --repeat-each=20 --workers=1 --reporter=list
 *
 * RACE_THROTTLE_MS delays every API call (Task_Assignment §8.4); PROFILE_DELAY_MS
 * delays only GET /api/users/me, which widens the window where `user` is still null.
 */
import { test } from '@playwright/test';
import { loginViaAPI, seedAuthToken } from '../support/auth.js';
import { applyApiThrottle } from '../support/throttle.js';

test('race experiment: checkout clicked before the profile finishes loading', async ({
  page,
  request,
}) => {
  const throttle = Number(process.env.RACE_THROTTLE_MS || 0);
  const profileDelay = Number(process.env.PROFILE_DELAY_MS || 0);
  const { token } = await loginViaAPI(request, { email: 'test@eshop.com', password: 'Test1234!' });
  await seedAuthToken(page, token);
  if (throttle > 0) await applyApiThrottle(page, throttle);
  if (profileDelay > 0) {
    await page.route('**/api/users/me', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, profileDelay));
      await route.continue();
    });
  }
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const card = page.locator('.bg-white', { hasText: 'iPhone 15 Pro Max' });
  await card.getByRole('button', { name: 'Thêm vào giỏ' }).click();
  await page.getByRole('link', { name: 'Giỏ hàng' }).click();
  // Deliberately NO wait for the "Chào," greeting here.
  await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
  console.log(`RACE_RESULT_URL=${page.url()}`);
});
