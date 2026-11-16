import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { applyApiThrottle } from '../support/throttle';

const cartData = JSON.parse(
    readFileSync(join(__dirname, 'data', 'fr07-cart.json'), 'utf8'),
) as {
    products: {
        iphone: { id: number; name: string };
        airpods: { id: number; name: string };
    };
    emptyMessage: string;
    expectedUnitPrice: string;
    expectedLineTotal: string;
    quantity: {
        initial: number;
        increased: number;
        minimum: number;
        lineTotalAfterIncrease: string;
    };
    expectedHeaders: string[];
};
const PRODUCTS = cartData.products;

test.beforeEach(async ({ page }) => {
    const delay = Number(process.env.THROTTLE_MS || 0);
    if (delay > 0) await applyApiThrottle(page, delay);
});

test('CART-03: add one product to the cart from the catalog', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    await expect(cart.rows).toHaveCount(1);
    await expect(cart.rows.first()).toBeVisible();
    await expect(cart.rows.first()).toContainText(PRODUCTS.iphone.name);
    await expect(cart.rows.first().locator('td').nth(2)).toHaveText('1');
});

test('CART-05: add two different products to the cart', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.addProductToCart(PRODUCTS.airpods.name);
    await home.openCart();

    await expect(cart.rows).toHaveCount(2);
    await expect(cart.row(PRODUCTS.iphone.name)).toHaveCount(1);
    await expect(cart.row(PRODUCTS.iphone.name)).toBeVisible();
    await expect(cart.row(PRODUCTS.airpods.name)).toHaveCount(1);
    await expect(cart.row(PRODUCTS.airpods.name)).toBeVisible();
});

test('Test 3: Add a product from its detail page', async ({ page }) => {
    const home = new HomePage(page);
    const detail = new ProductDetailPage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.openProductDetails(PRODUCTS.iphone.name);
    await detail.setQuantity(2);
    await detail.addToCart();
    await detail.addToCart();
    await cart.openCartFromHeader();

    await expect(cart.rows).toHaveCount(1);
    await expect(cart.rows.first()).toContainText(PRODUCTS.iphone.name);
    await expect(cart.rows.first().locator('td').nth(2)).toHaveText('2');
});

test('FIND-CART-04: adding the same product twice merges into one row', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    await expect.soft(cart.rows).toHaveCount(1);
    await expect.soft(cart.rows.first().locator('td').nth(2)).toHaveText('2');
});

test('FIND-CART-02: cart table has the specified columns', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    const table = page.locator('table');
    const headers = table.locator('thead th');
    await expect.soft(table).toBeVisible();
    await expect.soft(headers).toHaveCount(cartData.expectedHeaders.length);
    await expect.soft(headers).toHaveText(cartData.expectedHeaders);
});

test('CART-06: unit price and line total are displayed correctly', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    const row = cart.row(PRODUCTS.iphone.name);
    await expect.soft(row).toBeVisible();
    await expect.soft(row.locator('td').nth(1)).toHaveText(cartData.expectedUnitPrice);
    await expect.soft(row.locator('td').nth(2)).toHaveText('1');
    await expect.soft(row.locator('td').nth(3)).toHaveText(cartData.expectedLineTotal);
});

test('FIND-CART-07: increase button updates quantity and line total', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    const row = cart.row(PRODUCTS.iphone.name);
    const increase = row.getByRole('button', { name: '+' });
    await expect.soft(increase).toBeVisible();

    await expect.soft(row.locator('td').nth(2)).toHaveText(String(cartData.quantity.initial));
    if (await increase.count() > 0) {
        await increase.click();
        await expect.soft(row.locator('td').nth(2)).toHaveText(String(cartData.quantity.increased));
        await expect.soft(row.locator('td').nth(3)).toHaveText(cartData.quantity.lineTotalAfterIncrease);
    }
});

test('FIND-CART-08: decrease button does not reduce quantity below one', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    const row = cart.row(PRODUCTS.iphone.name);
    const decrease = row.getByRole('button', { name: '-' });
    await expect.soft(decrease).toBeVisible();
    await expect.soft(row.locator('td').nth(2)).toHaveText(String(cartData.quantity.minimum));

    if (await decrease.count() > 0 && !(await decrease.isDisabled())) {
        await decrease.click();
    }
    await expect.soft(row.locator('td').nth(2)).toHaveText(String(cartData.quantity.minimum));
});

test('FIND-CART-09: removing a product requires confirmation', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);
    let confirmationShown = false;

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();
    page.once('dialog', async (dialog) => {
        confirmationShown = dialog.type() === 'confirm';
        await dialog.accept();
    });

    await cart.removeProduct(PRODUCTS.iphone.name);

    expect.soft(confirmationShown).toBe(true);
    await expect.soft(cart.rows).toHaveCount(0);
});

test('FIND-CART-10: canceling removal keeps the product in the cart', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);
    let confirmationShown = false;

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();
    page.once('dialog', async (dialog) => {
        confirmationShown = dialog.type() === 'confirm';
        await dialog.dismiss();
    });

    await cart.removeProduct(PRODUCTS.iphone.name);

    expect.soft(confirmationShown).toBe(true);
    await expect.soft(cart.row(PRODUCTS.iphone.name)).toBeVisible();
    await expect.soft(cart.rows).toHaveCount(1);
});

test('FIND-CART-12: total label is exactly Tổng cộng', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    await expect.soft(cart.totalLabel).toBeVisible();
    await expect.soft(cart.totalLabel).toHaveText(/^Tổng cộng:/);
});

test('FIND-CART-13: continue-shopping link has the specified label and destination', async ({
    page,
}) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    await expect.soft(cart.continueShoppingLink).toBeVisible();
    await expect.soft(cart.continueShoppingLink).toHaveText(/^Tiếp tục mua sắm$/);
    await expect.soft(cart.continueShoppingLink).toHaveAttribute('href', '/');
    await cart.continueShoppingLink.click();
    await expect.soft(page).toHaveURL('/');
});

test('FIND-CART-01: empty cart has an illustration and message', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.goto();

    await expect.soft(cart.rows).toHaveCount(0);
    await expect.soft(cart.emptyMessage).toBeVisible();
    await expect.soft(cart.emptyMessage).toHaveText(cartData.emptyMessage);
    await expect.soft(cart.emptyIllustration.first()).toBeVisible();
});

test('Test 9: FIND-B6 the cart navigation link shows the item-count badge', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);

    const badge = page.getByRole('link', { name: /Giỏ hàng/ }).locator('span');
    await expect.soft(badge).toHaveText('1');
});

test('Test 10: FIND-B7 catalog product images have descriptive alt text', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    const images = home.productCards.locator('img');
    await expect(images.first()).toBeVisible();
    for (let index = 0; index < await images.count(); index++) {
        await expect.soft(images.nth(index)).toHaveAttribute('alt', /.+/);
    }
});
