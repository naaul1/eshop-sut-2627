import { test, expect, APIRequestContext, Page } from '@playwright/test';
import { loginViaAPI, registerViaAPI, seedAuthToken } from '../support/auth';
import { applyApiThrottle } from '../support/throttle';
import { HomePage } from '../pages/HomePage';

const PASSWORD = 'Test1234!';
const PRODUCTS = ['iPhone 15 Pro Max', 'Tai nghe AirPods Pro 2'];
const EXPECTED_SAVE10_TOTAL = 32_400_000;

test.beforeEach(async ({ page }) => {
  const delay = Number(process.env.THROTTLE_MS || 0);
  if (delay > 0) await applyApiThrottle(page, delay);
});

async function createUser(request: APIRequestContext): Promise<string> {
  const email = `scenario3-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
  await registerViaAPI(request, {
    name: 'Scenario 3 User',
    email,
    password: PASSWORD,
  });
  const { token } = await loginViaAPI(request, { email, password: PASSWORD });
  return token;
}

async function openCheckout(page: Page, request: APIRequestContext): Promise<void> {
  const token = await createUser(request);
  await seedAuthToken(page, token);

  const home = new HomePage(page);
  await home.goto();
  await expect(page.getByRole('link', { name: /Chào/ })).toBeVisible();
  for (const product of PRODUCTS) {
    await home.addProductToCart(product);
  }
  await home.openCart();
  await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
  await expect(page).toHaveURL(/\/checkout$/);
}

async function applyCoupon(page: Page, code: string): Promise<void> {
  await page.getByPlaceholder('Nhập mã giảm giá...').fill(code);
  await page.getByRole('button', { name: 'Áp dụng' }).click();
}

const couponCases = [
  {
    name: 'SAVE10 reduces an eligible order by 10%',
    code: 'SAVE10',
    expectedMessage: /Áp dụng thành công/,
    expectedTotal: EXPECTED_SAVE10_TOTAL,
  },
  {
    name: 'EXPIRED is rejected',
    code: 'EXPIRED',
    expectedMessage: /Mã giảm giá đã hết hạn/,
  },
  {
    name: 'an unknown coupon is rejected',
    code: 'NO_SUCH_COUPON',
    expectedMessage: /Mã giảm giá không tồn tại/,
  },
] as const;

for (const couponCase of couponCases) {
  test(`Scenario 3: ${couponCase.name}`, async ({ page, request }) => {
    await openCheckout(page, request);
    await applyCoupon(page, couponCase.code);

    if ('expectedTotal' in couponCase) {
      await expect(page.getByText(couponCase.expectedMessage)).toBeVisible();
      const totalText = await page.locator('p').filter({ hasText: 'Thành tiền:' }).innerText();
      expect.soft(
        Number(totalText.replace(/[^\d]/g, '')),
        'SAVE10 should reduce the cart total by 10%',
      ).toBe(couponCase.expectedTotal);
      return;
    }

    await expect(page.locator('p').filter({ hasText: couponCase.expectedMessage })).toBeVisible();
  });
}

test('Scenario 3: BIGBUY is rejected below its minimum order amount', async ({ page, request }) => {
  await openCheckout(page, request);
  await page.locator('input[type="number"]').fill('400000');
  await applyCoupon(page, 'BIGBUY');

  await expect(
    page.locator('p').filter({ hasText: 'Đơn hàng chưa đủ giá trị tối thiểu' }),
  ).toBeVisible();
});

test('Scenario 3: SAVE10 cannot be reused after checkout by the same user', async ({ page, request }) => {
  await openCheckout(page, request);
  await applyCoupon(page, 'SAVE10');
  await expect(page.getByText(/Áp dụng thành công/)).toBeVisible();
  await page.getByRole('button', { name: 'Xác Nhận Thanh Toán' }).click();
  await expect(page.getByRole('heading', { name: 'Thanh toán thành công!' })).toBeVisible();

  await page.getByRole('button', { name: 'Quay lại trang chủ' }).click();
  const home = new HomePage(page);
  for (const product of PRODUCTS) {
    await home.addProductToCart(product);
  }
  await home.openCart();
  await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
  await expect(page).toHaveURL(/\/checkout$/);

  await applyCoupon(page, 'SAVE10');
  await expect(
    page.locator('p').filter({ hasText: 'Bạn đã sử dụng mã này' }),
  ).toBeVisible();
});

test('Scenario 3: unauthenticated visitors are redirected from checkout to login', async ({ page }) => {
  await page.goto('/checkout', { waitUntil: 'domcontentloaded' });
  await expect.soft(page).toHaveURL(/\/login$/);
});
