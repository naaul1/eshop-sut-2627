/**
 * FR-08 / FR-21 spec-conformance tests — every case below is a known SUT deviation.
 * These tests are NOT quarantined: when the SUT violates the spec the test fails
 * for real, so the run stays red while the findings are unfixed.
 * See docs/team-log/findings-checkout.md for FIND-C1..C5.
 */
import { test, expect, Page, APIRequestContext } from '@playwright/test';
import { loginViaAPI, seedAuthToken } from '../support/auth';
import { applyApiThrottle } from '../support/throttle';
import { CheckoutPage } from '../pages/CheckoutPage';

const API = 'http://localhost:3000';
const PRODUCT = 'iPhone 15 Pro Max';
const SHARED_USER = { email: 'test@eshop.com', password: 'Test1234!' };

test.beforeEach(async ({ page }) => {
  const delay = Number(process.env.THROTTLE_MS || 0);
  if (delay > 0) await applyApiThrottle(page, delay);
});

async function loginAndSeed(page: Page, request: APIRequestContext): Promise<string> {
  const { token } = await loginViaAPI(request, SHARED_USER);
  await seedAuthToken(page, token);
  return token;
}

test('FIND-C1 / FR-08 spec: the total amount must not be editable by the user', async ({ page }) => {
  // actual: a normal <input type="number"> that the user can change
  const checkout = new CheckoutPage(page);
  await checkout.goto();
  await expect(checkout.totalInput).toBeVisible();
  await expect.soft(checkout.totalInput.isEditable()).resolves.toBe(false);
});

test('FIND-C2 / FR-08 spec: unauthenticated visitor must be sent from /checkout to /login', async ({
  page,
}) => {
  // actual: /checkout renders for anonymous users
  await page.goto('/checkout', { waitUntil: 'domcontentloaded' });
  await expect.soft(page).toHaveURL(/\/login/);
});

test('FIND-C3 / FR-08 spec: the cart must be cleared after a successful checkout', async ({
  page,
  request,
}) => {
  // actual: clearCart() is never called, the item is still in the cart

  await loginAndSeed(page, request);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('link', { name: /Chào/ })).toBeVisible();
  const card = page.locator('.bg-white', { hasText: PRODUCT });
  await card.getByRole('button', { name: 'Thêm vào giỏ' }).click();
  await page.getByRole('link', { name: 'Giỏ hàng' }).click();
  await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();

  const checkout = new CheckoutPage(page);
  await checkout.confirm();
  await expect(checkout.successHeading).toBeVisible();

  // Navigate back in-app so the in-memory cart survives.
  await page.getByRole('button', { name: 'Quay lại trang chủ' }).click();
  await page.getByRole('link', { name: 'Giỏ hàng' }).click();
  await expect.soft(page.getByText('Giỏ hàng của bạn đang trống')).toBeVisible();
});

test('FIND-C4 / FR-08 spec: backend must ignore a client-sent total_amount', async ({ request }) => {
  // actual: /api/checkout stores whatever the client sends

  const { token } = await loginViaAPI(request, SHARED_USER);
  const res = await request.post(`${API}/api/checkout`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      items: [{ id: 1, name: PRODUCT, price: 30000000, quantity: 1 }],
      total_amount: 1,
      shipping_address: 'x',
    },
  });
  const { orderId } = await res.json();
  const order = await (await request.get(`${API}/api/orders/${orderId}`)).json();
  await expect.soft(order.total_amount).not.toBe(1);
});

test('FIND-C5 / FR-21 conformance: the checkout page must have exactly one <h1>', async ({
  page,
}) => {
  // actual: 0 <h1> (the page title is an <h2>)
  await page.goto('/checkout', { waitUntil: 'domcontentloaded' });
  await expect.soft(page.locator('h1')).toHaveCount(1);
});