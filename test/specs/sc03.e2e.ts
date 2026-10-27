import { browser, $, $$ } from '@wdio/globals';
import { expect } from 'expect-webdriverio';

const API_URL = 'http://localhost:3000';
const USER_URL = 'http://localhost:5173';
const PASSWORD = 'Test1234!';
const PRODUCTS = [
    { name: 'iPhone 15 Pro Max' },
    { name: 'Tai nghe AirPods Pro 2' },
];
const EXPECTED_TOTAL = 32_400_000;

async function api(
    path: string,
    body: unknown,
): Promise<number> {
    const response = await fetch(API_URL + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    return response.status;
}

async function createUser(): Promise<string> {
    const email = `scenario3-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const status = await api('/api/register', {
        name: 'Scenario 3 User',
        email,
        password: PASSWORD,
    });
    expect(status).toBe(200);
    return email;
}

async function findProductCard(name: string): Promise<WebdriverIO.Element> {
    await browser.waitUntil(async () => (await $$('main .grid > .bg-white')).length > 0, {
        timeoutMsg: 'Product cards did not load',
    });
    for (const card of await $$('main .grid > .bg-white')) {
        if ((await card.getText()).includes(name)) return card;
    }
    throw new Error(`Product card not found: ${name}`);
}

async function openCheckout(): Promise<void> {
    const email = await createUser();
    await browser.url(USER_URL);
    await browser.execute(() => localStorage.clear());
    await browser.url(USER_URL + '/login');
    const loginInputs = await $$('input[type="text"]');
    await loginInputs[0].setValue(email);
    await loginInputs[1].setValue(PASSWORD);
    await $('button=Sign In').click();
    await expect($('a[href="/profile"]')).toBeDisplayed();

    await browser.url(USER_URL);
    for (const product of PRODUCTS) {
        await (await findProductCard(product.name)).$('button=Thêm vào giỏ').click();
    }
    await $('a*=Giỏ hàng').click();
    await $('button=Tiến hành thanh toán').click();
    await expect(browser).toHaveUrl(expect.stringContaining('/checkout'));
}

async function applyCoupon(code: string): Promise<void> {
    await $('input[placeholder="Nhập mã giảm giá..."]').setValue(code);
    await $('button=Áp dụng').click();
}

describe('Scenario 3: Coupon validation matrix', () => {
    it('applies SAVE10 and calculates a 10% discount', async () => {
        await openCheckout();
        await applyCoupon('SAVE10');
        await expect($('p*=Áp dụng thành công')).toBeDisplayed();

        const totalText = await $('p*=Thành tiền:').getText();
        expect(Number(totalText.replace(/[^\d]/g, ''))).toBe(EXPECTED_TOTAL);
    });

    it('rejects the expired EXPIRED coupon', async () => {
        await openCheckout();
        await applyCoupon('EXPIRED');
        await expect($('p*=Mã giảm giá đã hết hạn')).toBeDisplayed();
    });

    it('rejects a coupon code that does not exist', async () => {
        await openCheckout();
        await applyCoupon('NO_SUCH_COUPON');
        await expect($('p*=Mã giảm giá không tồn tại')).toBeDisplayed();
    });

    it('rejects BIGBUY when the order total is below its minimum', async () => {
        await openCheckout();
        await $('input[type="number"]').setValue('400000');
        await applyCoupon('BIGBUY');
        await expect($('p*=Đơn hàng chưa đủ giá trị tối thiểu')).toBeDisplayed();
    });

    it('rejects SAVE10 after the same user has used it once', async () => {
        await openCheckout();
        await applyCoupon('SAVE10');
        await expect($('p*=Áp dụng thành công')).toBeDisplayed();

        await $('button=Xác Nhận Thanh Toán').click();
        await expect($('h2=Thanh toán thành công!')).toBeDisplayed();
        await $('button=Quay lại trang chủ').click();
        await $('a*=Giỏ hàng').click();
        await $('button=Tiến hành thanh toán').click();
        await expect(browser).toHaveUrl(expect.stringContaining('/checkout'));

        await applyCoupon('SAVE10');
        await expect($('p*=Bạn đã sử dụng mã này')).toBeDisplayed();
    });

    it('redirects an unauthenticated visitor away from checkout', async () => {
        await browser.url(USER_URL);
        await browser.execute(() => localStorage.clear());
        await browser.url(USER_URL + '/checkout');
        await expect(browser).toHaveUrl(expect.stringContaining('/login'));
    });
});
