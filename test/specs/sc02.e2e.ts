import { browser, $, $$ } from '@wdio/globals';
import { expect } from 'expect-webdriverio';

const API_URL = 'http://localhost:3000';
const USER_URL = 'http://localhost:5173';
const ADMIN_URL = 'http://localhost:5174';
const PASSWORD = 'Test1234!';
const ADMIN = { email: 'admin@eshop.com', password: 'Admin123!' };
const PRODUCTS = [
    { name: 'iPhone 15 Pro Max', price: 30_000_000 },
    { name: 'Tai nghe AirPods Pro 2', price: 6_000_000 },
];
const EXPECTED_TOTAL = 32_400_000;

interface ApiResponse<T> {
    status: number;
    data: T;
}

interface User {
    id: number;
}

interface AuthResponse {
    token: string;
    user: User;
}

interface Order {
    id: number;
    total_amount: number;
    status: string;
}

type Assertion = () => Promise<void>;

async function softExpect(
    failures: string[],
    description: string,
    assertion: Assertion,
): Promise<void> {
    try {
        await assertion();
    } catch (error) {
        failures.push(`${description}: ${error instanceof Error ? error.message : String(error)}`);
    }
}

async function api<T>(
    path: string,
    options: { method?: string; body?: unknown; token?: string } = {},
): Promise<ApiResponse<T>> {
    const response = await fetch(API_URL + path, {
        method: options.method ?? 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(options.token ? { Authorization: 'Bearer ' + options.token } : {}),
        },
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });

    return { status: response.status, data: await response.json() as T };
}

async function createUser(): Promise<{ email: string; token: string; user: User }> {
    const email = `scenario-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const registered = await api<{ id: number }>('/api/register', {
        method: 'POST',
        body: { name: 'Scenario User', email, password: PASSWORD },
    });
    expect(registered.status).toBe(200);

    const loggedIn = await api<AuthResponse>('/api/login', {
        method: 'POST',
        body: { email, password: PASSWORD },
    });
    expect(loggedIn.status).toBe(200);
    return { email, ...loggedIn.data };
}

async function findRow(orderId: number): Promise<WebdriverIO.Element> {
    for (const row of await $$('tbody tr')) {
        if ((await row.getText()).includes(`#${orderId}`)) return row;
    }
    throw new Error(`Could not find order #${orderId}`);
}

async function findProductCard(name: string): Promise<WebdriverIO.Element> {
    for (const card of await $$('main .grid > .bg-white')) {
        if ((await card.getText()).includes(name)) return card;
    }
    throw new Error(`Product card not found: ${name}`);
}

async function readRevenue(): Promise<number> {
    for (const card of await $$('div.bg-white')) {
        if ((await card.getText()).includes('Tổng doanh thu (Delivered)')) {
            return Number((await card.$('p').getText()).replace(/[^\d]/g, ''));
        }
    }
    throw new Error('Revenue card was not found');
}

describe('Scenario 2: User checkout, coupon and admin fulfillment', () => {
    it('checks out with a coupon and completes the order lifecycle', async () => {
        const softFailures: string[] = [];

        await browser.url(ADMIN_URL);
        await $('input[placeholder="Email"]').setValue(ADMIN.email);
        await $('input[placeholder="Password"]').setValue(ADMIN.password);
        await $('button=Login').click();
        await expect($('h1=EShop Admin')).toBeDisplayed();
        const revenueBefore = await readRevenue();

        const user = await createUser();
        await browser.url(USER_URL + '/login');
        const loginInputs = await $$('input[type="text"]');
        await loginInputs[0].setValue(user.email);
        await loginInputs[1].setValue(PASSWORD);
        await $('button=Sign In').click();
        await expect($('a[href="/profile"]')).toBeDisplayed();

        for (const product of PRODUCTS) {
            await (await findProductCard(product.name)).$('button=Thêm vào giỏ').click();
        }
        await $('a*=Giỏ hàng').click();
        await $('button=Tiến hành thanh toán').click();
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout'));
        await expect($$('ul.list-disc li')).toBeElementsArrayOfSize(2);

        await $('input[placeholder="Nhập mã giảm giá..."]').setValue('SAVE10');
        await $('button=Áp dụng').click();
        await expect($('*=Áp dụng thành công')).toBeDisplayed();
        await softExpect(
            softFailures,
            'SAVE10 should reduce the cart total by 10%',
            () => expect($('p*=Thành tiền:')).toHaveText(expect.stringContaining('32.400.000 ₫')),
        );

        await browser.execute(() => {
            const originalOpen = XMLHttpRequest.prototype.open;
            const originalSend = XMLHttpRequest.prototype.send;
            XMLHttpRequest.prototype.open = function (...args) {
                (this as XMLHttpRequest & { requestUrl?: string }).requestUrl = String(args[1]);
                return originalOpen.apply(this, args);
            };
            XMLHttpRequest.prototype.send = function (body) {
                const requestUrl = (this as XMLHttpRequest & { requestUrl?: string }).requestUrl;
                if (requestUrl?.includes('/api/checkout') && typeof body === 'string') {
                    const payload = JSON.parse(body) as { total_amount: number };
                    (window as Window & { checkoutClientTotal?: number }).checkoutClientTotal =
                        payload.total_amount;
                    originalSend.call(this, JSON.stringify({ ...payload, total_amount: 1 }));
                    return;
                }
                originalSend.call(this, body);
            };
        });
        await $('button=Xác Nhận Thanh Toán').click();
        await expect($('h2=Thanh toán thành công!')).toBeDisplayed();

        const orders = await api<Order[]>('/api/orders/my-orders', { token: user.token });
        expect(orders.status).toBe(200);
        const order = orders.data[0];
        const clientTotal = await browser.execute(
            () => (window as Window & { checkoutClientTotal?: number }).checkoutClientTotal,
        );
        await softExpect(
            softFailures,
            'checkout should send the correctly discounted total',
            async () => expect(clientTotal).toBe(EXPECTED_TOTAL),
        );
        await softExpect(
            softFailures,
            'backend should recalculate the order total',
            async () => expect(order.total_amount).toBe(EXPECTED_TOTAL),
        );
        await softExpect(
            softFailures,
            'backend must not trust the intercepted client total',
            async () => expect(order.total_amount).not.toBe(1),
        );

        await browser.url(ADMIN_URL);
        await expect($('h1=EShop Admin')).toBeDisplayed();
        await $('li*=Đơn hàng').click();
        let adminOrder = await findRow(order.id);
        await expect(adminOrder).toHaveText(expect.stringContaining('Chờ xác nhận'));
        await adminOrder.$('button=Xác nhận').click();
        await expect(adminOrder).toHaveText(expect.stringContaining('Đã xác nhận'));
        await adminOrder.$('button=Giao hàng').click();
        await expect(adminOrder).toHaveText(expect.stringContaining('Đang giao'));

        await browser.url(USER_URL + '/login');
        const returnLoginInputs = await $$('input[type="text"]');
        await returnLoginInputs[0].setValue(user.email);
        await returnLoginInputs[1].setValue(PASSWORD);
        await $('button=Sign In').click();
        await $('a[href="/profile"]').click();
        await expect($('h2=Lịch sử đơn hàng')).toBeDisplayed();
        const userOrder = await findRow(order.id);
        await expect(userOrder).toHaveText(expect.stringContaining('Đang giao'));

        await browser.execute(() => {
            (window as Window & { lastAlert?: string }).lastAlert = '';
            window.alert = (message?: string) => {
                (window as Window & { lastAlert?: string }).lastAlert = message ?? '';
            };
        });
        await userOrder.$('button=Hủy đơn').click();
        await browser.waitUntil(async () => Boolean(await browser.execute(
            () => (window as Window & { lastAlert?: string }).lastAlert,
        )));
        const alertMessage = await browser.execute(
            () => (window as Window & { lastAlert?: string }).lastAlert ?? '',
        );
        await softExpect(
            softFailures,
            'canceling an order in shipping should be rejected',
            async () => expect(alertMessage).toMatch(/Lỗi/),
        );
        await softExpect(
            softFailures,
            'order should remain in shipping after rejected cancellation',
            () => expect(userOrder).toHaveText(expect.stringContaining('Đang giao')),
        );

        await browser.url(ADMIN_URL);
        if (await $('input[placeholder="Email"]').isExisting()) {
            await $('input[placeholder="Email"]').setValue(ADMIN.email);
            await $('input[placeholder="Password"]').setValue(ADMIN.password);
            await $('button=Login').click();
        }
        await expect($('h1=EShop Admin')).toBeDisplayed();
        await $('li*=Đơn hàng').click();
        adminOrder = await findRow(order.id);
        await expect(adminOrder).toHaveText(expect.stringContaining('Đã hủy'));
        await softExpect(
            softFailures,
            'canceled order must not be allowed to transition to delivered',
            () => expect(adminOrder.$$('button=Đánh dấu Đã giao')).toBeElementsArrayOfSize(0),
        );
        await adminOrder.$('button=Đánh dấu Đã giao').click();
        await expect(adminOrder).toHaveText(expect.stringContaining('Đã giao'));
        await $('li=Dashboard').click();
        await softExpect(
            softFailures,
            'dashboard revenue should increase by the delivered order total',
            async () => expect(await readRevenue() - revenueBefore).toBe(EXPECTED_TOTAL),
        );

        if (softFailures.length > 0) {
            throw new Error(`Soft assertions failed:\n${softFailures.join('\n')}`);
        }
    });
});
