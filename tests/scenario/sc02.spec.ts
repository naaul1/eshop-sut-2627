import { test, expect, APIRequestContext, Browser, BrowserContext, Page } from '@playwright/test';
import { loginViaAPI, registerViaAPI, seedAuthToken } from '../support/auth';
import { HomePage } from '../pages/HomePage';

const API = 'http://localhost:3000';
const ADMIN_URL = 'http://localhost:5174';
const PASSWORD = 'Test1234!';
const ADMIN = { email: 'admin@eshop.com', password: 'Admin123!' };
const PRODUCTS = [
  { name: 'iPhone 15 Pro Max', price: 30_000_000 },
  { name: 'Tai nghe AirPods Pro 2', price: 6_000_000 },
];
const CART_TOTAL = PRODUCTS.reduce((total, product) => total + product.price, 0);
const EXPECTED_TOTAL = Math.floor(CART_TOTAL * 0.9);

async function createUser(request: APIRequestContext): Promise<{ token: string; id: number }> {
  const email = `scenario-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
  const registered = await registerViaAPI(request, {
    name: 'Scenario User',
    email,
    password: PASSWORD,
  });
  const { token, user } = await loginViaAPI(request, { email, password: PASSWORD });
  return { token, id: user.id ?? registered.id };
}

async function loginAdmin(browser: Browser): Promise<{
  context: BrowserContext;
  page: Page;
  revenueBefore: number;
}> {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(ADMIN_URL, { waitUntil: 'domcontentloaded' });

  const ordersLoaded = page.waitForResponse(
    (response) => response.url().endsWith('/api/admin/orders') && response.ok(),
  );
  await page.getByPlaceholder('Email').fill(ADMIN.email);
  await page.getByPlaceholder('Password').fill(ADMIN.password);
  await page.getByRole('button', { name: 'Login' }).click();
  const ordersResponse = await ordersLoaded;
  const orders = await ordersResponse.json() as Array<{
    status: string;
    total_amount: number;
  }>;
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  const revenueBefore = orders.reduce(
    (total, order) => total + (order.status === 'delivered' ? order.total_amount * 2 : 0),
    0,
  );

  return { context, page, revenueBefore };
}

async function readRevenue(page: Page): Promise<number> {
  const revenueCard = page.locator('div.bg-white')
    .filter({ hasText: 'Tổng doanh thu (Delivered)' });
  const revenueText = await revenueCard.locator('p').textContent();
  return Number((revenueText ?? '').replace(/[^\d]/g, ''));
}

test('Scenario 2: User checkout, coupon, admin fulfillment, cancellation and revenue', async ({
  browser,
  request,
}) => {
  test.setTimeout(120_000);

  const userContext = await browser.newContext();
  const userPage = await userContext.newPage();
  const admin = await loginAdmin(browser);
  const adminPage = admin.page;

  try {
    const { token } = await createUser(request);
    await seedAuthToken(userPage, token);

    const home = new HomePage(userPage);
    await home.goto();
    await expect(userPage.getByRole('link', { name: /Chào/ })).toBeVisible();

    for (const product of PRODUCTS) {
      await home.addProductToCart(product.name);
    }
    await home.openCart();
    await userPage.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
    await expect(userPage).toHaveURL(/\/checkout$/);
    await expect(userPage.locator('ul.list-disc li')).toHaveCount(2);

    await userPage.getByPlaceholder('Nhập mã giảm giá...').fill('SAVE10');
    await userPage.getByRole('button', { name: 'Áp dụng' }).click();
    await expect(userPage.getByText(/Áp dụng thành công/)).toBeVisible();
    await expect.soft(
      userPage.locator('p').filter({ hasText: 'Thành tiền:' }),
      'SAVE10 should reduce the cart total by 10%',
    ).toContainText('32.400.000 ₫');

    let clientTotal: number | undefined;
    await userPage.route('**/api/checkout', async (route) => {
      const payload = route.request().postDataJSON() as { total_amount: number };
      clientTotal = payload.total_amount;
      await route.continue({
        postData: JSON.stringify({ ...payload, total_amount: 1 }),
      });
    });

    const checkoutResponsePromise = userPage.waitForResponse(
      (response) => response.url().endsWith('/api/checkout') && response.request().method() === 'POST',
    );
    await userPage.getByRole('button', { name: 'Xác Nhận Thanh Toán' }).click();
    const checkoutResponse = await checkoutResponsePromise;
    expect(checkoutResponse.ok(), 'checkout API request should succeed').toBe(true);
    const { orderId } = await checkoutResponse.json();
    await expect(userPage.getByRole('heading', { name: 'Thanh toán thành công!' })).toBeVisible();

    const savedOrder = await (
      await request.get(`${API}/api/orders/${orderId}`)
    ).json() as { id: number; total_amount: number; status: string };
    expect.soft(clientTotal, 'checkout should send the correctly discounted total')
      .toBe(EXPECTED_TOTAL);
    expect.soft(savedOrder.total_amount, 'backend should recalculate the order total')
      .toBe(EXPECTED_TOTAL);
    expect.soft(savedOrder.total_amount, 'backend must not trust the intercepted client total')
      .not.toBe(1);

    const ordersLoaded = adminPage.waitForResponse(
      (response) => response.url().endsWith('/api/admin/orders') && response.ok(),
    );
    await adminPage.reload({ waitUntil: 'domcontentloaded' });
    await ordersLoaded;
    await adminPage.getByText('Đơn hàng', { exact: true }).click();

    const adminOrder = adminPage.locator('tbody tr').filter({ hasText: `#${orderId}` });
    await expect(adminOrder).toContainText('Chờ xác nhận');
    await adminOrder.getByRole('button', { name: 'Xác nhận' }).click();
    await expect(adminOrder).toContainText('Đã xác nhận');
    await adminOrder.getByRole('button', { name: 'Giao hàng' }).click();
    await expect(adminOrder).toContainText('Đang giao');

    await userPage.getByRole('button', { name: 'Quay lại trang chủ' }).click();
    await userPage.getByRole('link', { name: /Chào/ }).click();
    await expect(userPage.getByRole('heading', { name: 'Lịch sử đơn hàng' })).toBeVisible();
    const userOrder = userPage.locator('tbody tr').filter({ hasText: `#${orderId}` });
    await expect(userOrder).toContainText('Đang giao');

    let cancelAlert = '';
    userPage.once('dialog', async (dialog) => {
      cancelAlert = dialog.message();
      await dialog.accept();
    });
    await userOrder.getByRole('button', { name: 'Hủy đơn' }).click();
    expect.soft(cancelAlert, 'canceling an order in shipping should be rejected')
      .toMatch(/Lỗi/);
    await expect.soft(userOrder, 'order should remain in shipping after rejected cancellation')
      .toContainText('Đang giao');

    const refreshedOrders = adminPage.waitForResponse(
      (response) => response.url().endsWith('/api/admin/orders') && response.ok(),
    );
    await adminPage.reload({ waitUntil: 'domcontentloaded' });
    await refreshedOrders;
    await adminPage.getByText('Đơn hàng', { exact: true }).click();

    const refreshedOrder = adminPage.locator('tbody tr').filter({ hasText: `#${orderId}` });
    await expect(refreshedOrder).toContainText('Đã hủy');
    await expect.soft(
      refreshedOrder.getByRole('button', { name: 'Đánh dấu Đã giao' }),
      'a canceled order must not be allowed to transition to delivered',
    ).toHaveCount(0);
    await refreshedOrder.getByRole('button', { name: 'Đánh dấu Đã giao' }).click();
    await expect(refreshedOrder).toContainText('Đã giao');

    await adminPage.getByText('Dashboard', { exact: true }).first().click();
    const revenueAfter = await readRevenue(adminPage);
    expect.soft(revenueAfter - admin.revenueBefore, 'dashboard revenue should increase by the delivered order total')
      .toBe(EXPECTED_TOTAL);
  } finally {
    await userContext.close();
    await admin.context.close();
  }
});
