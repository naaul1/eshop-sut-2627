import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

const PRODUCTS = {
    iphone: { id: 1, name: 'iPhone 15 Pro Max' },
    airpods: { id: 4, name: 'AirPods Pro 2' },
};

test('Test 1: Add one product to the cart from the catalog', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    await expect(cart.rows).toHaveCount(1);
    await expect(cart.rows.first()).toContainText(PRODUCTS.iphone.name);
    await expect(cart.rows.first().locator('td').nth(2)).toHaveText('1');
});

test('Test 2: Add two different products to the cart', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.addProductToCart(PRODUCTS.airpods.name);
    await home.openCart();

    await expect(cart.rows).toHaveCount(2);
    await expect(cart.row(PRODUCTS.iphone.name)).toHaveCount(1);
    await expect(cart.row(PRODUCTS.airpods.name)).toHaveCount(1);
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

test('Test 4: FIND-B1 adding the same product twice merges into one row', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    await expect.soft(cart.rows).toHaveCount(1);
    await expect.soft(cart.rows.first().locator('td').nth(2)).toHaveText('2');
});

test('Test 5: FIND-B2 cart quantity controls update quantity and total', async ({ page }) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    const row = cart.row(PRODUCTS.iphone.name);
    const increase = row.getByRole('button', { name: '+' });
    const decrease = row.getByRole('button', { name: '-' });
    await expect.soft(increase).toBeVisible();
    await expect.soft(decrease).toBeVisible();

    if (await increase.count() > 0 && await decrease.count() > 0) {
        await increase.click();
        await expect(row.locator('td').nth(2)).toHaveText('2');
        await expect(row.locator('td').nth(3)).toContainText('60.000.000 ₫');

        await decrease.click();
        await expect(row.locator('td').nth(2)).toHaveText('1');
    }
});

test('Test 6: FIND-B3 removing a product requires confirmation', async ({ page }) => {
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
    await expect(cart.rows).toHaveCount(0);
    await expect(cart.emptyMessage).toBeVisible();
});

test('Test 7: FIND-B4 cart total and continue-shopping labels match the specification', async ({
    page,
}) => {
    const home = new HomePage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.addProductToCart(PRODUCTS.iphone.name);
    await home.openCart();

    await expect.soft(cart.totalLabel).toBeVisible();
    await expect.soft(cart.continueShoppingLink).toBeVisible();
});

test('Test 8: FIND-B5 empty cart includes an illustration and message', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.goto();

    await expect(cart.emptyMessage).toBeVisible();
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
