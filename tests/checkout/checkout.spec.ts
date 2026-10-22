import { test, expect, Page, APIRequestContext } from '@playwright/test';
import { loginViaAPI, seedAuthToken } from '../support/auth';
import { applyApiThrottle } from '../support/throttle';
import { CheckoutPage } from '../pages/CheckoutPage';

const API = 'http://localhost:3000';
const PRODUCT = 'iPhone 15 Pro Max';
const PRICE = 30000000;
const SHARED_USER = { email: 'test@eshop.com', password: 'Test1234!' };

test.beforeEach(async ({ page }) => {
  const delay = Number(process.env.THROTTLE_MS || 0);
  if (delay > 0) await applyApiThrottle(page, delay);
});

/** Login via API, seed the JWT, and return { token, user }. */
async function loginAndSeed(page: Page, request: APIRequestContext): Promise<{ token: string; user: { id: number } }> {
  const { token, user } = await loginViaAPI(request, SHARED_USER);
  await seedAuthToken(page, token);
  return { token, user };
}

/** Cart lives in React memory: build it with UI clicks and navigate in-app only. */
async function addProductAndOpenCheckout(page: Page): Promise<void> {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  // Mandatory guard: clicking checkout before /api/users/me resolves redirects to /login.
  await expect(page.getByRole('link', { name: /Chào/ })).toBeVisible();

  const card = page.locator('.bg-white', { hasText: PRODUCT });
  await card.getByRole('button', { name: 'Thêm vào giỏ' }).click();
  await page.getByRole('link', { name: 'Giỏ hàng' }).click();
  await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
  await expect(page).toHaveURL(/\/checkout$/);
}

test.describe('FR-08 checkout — behavior', () => {
  test('happy path: user places an order that the backend stores correctly', async ({
    page,
    request,
  }) => {
    const { token, user } = await loginAndSeed(page, request);
    const api = { headers: { Authorization: `Bearer ${token}` } };

    // State-delta pattern: robust against orders created by teammates on the shared SUT.
    const before = await (await request.get(`${API}/api/orders/my-orders`, api)).json();
    const beforeIds = new Set(before.map((o: { id: number }) => o.id));

    await addProductAndOpenCheckout(page);

    const checkout = new CheckoutPage(page);
    await expect(checkout.itemLines).toHaveCount(1);
    await expect(checkout.itemLines.first()).toContainText(`${PRODUCT} x 1`);
    await expect(checkout.totalInput).toHaveValue(String(PRICE));

    await checkout.confirm();
    await expect(checkout.successHeading).toBeVisible();

    const after = await (await request.get(`${API}/api/orders/my-orders`, api)).json();
    const created = after.find((o: { id: number }) => !beforeIds.has(o.id));
    expect(created, 'a new order must be visible in /api/orders/my-orders').toBeTruthy();
    expect(created.status).toBe('pending');
    expect(created.total_amount).toBe(PRICE);
    expect(created.user_id).toBe(user.id);
  });

  test('checkout shows the cart line and the cart total before confirming', async ({
    page,
    request,
  }) => {
    await loginAndSeed(page, request);
    await addProductAndOpenCheckout(page);

    const checkout = new CheckoutPage(page);
    await expect(checkout.itemLines).toHaveCount(1);
    await expect(checkout.itemLines.first()).toContainText(`${PRODUCT} x 1`);
    await expect(checkout.itemLines.first()).toContainText('30.000.000 ₫');
    // The input holds the raw number; the summary text uses vi-VN separators.
    await expect(checkout.totalInput).toHaveValue(String(PRICE));
    await expect(checkout.summaryTotal).toContainText('30.000.000 ₫');
    await expect(checkout.confirmButton).toBeVisible();
  });
});