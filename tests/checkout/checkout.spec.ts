/**
 * FR-08 checkout tests — one error policy for the whole suite: every test
 * asserts the documented spec (README FR-08/FR-21). A failure is either a
 * test bug (fix the test) or a SUT bug — a finding (FIND-C1..C5), left red
 * on purpose; never quarantined with test.fail().
 */
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

// Spec-conformance findings (FIND-C1..C5) — left red on purpose, same error
// policy as every other test: no test.fail(), no quarantine.

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
  await addProductAndOpenCheckout(page);

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