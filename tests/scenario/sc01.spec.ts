/*
    Scenario 1: Smoke Test
    1. Login with valid credentials -> Verify that the user is redirected to the home page
    2. 
*/


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { registerViaAPI } from '../support/auth';
import { applyApiThrottle } from '../support/throttle';

const PASSWORD: string = 'Test1234!';

test.beforeEach(async ({ page }) => {
    const delay = Number(process.env.THROTTLE_MS || 0);
    if (delay > 0) await applyApiThrottle(page, delay)
    else await applyApiThrottle(page, 300);
});

test('Test Scenario 1: Smoke Test', async ({ page, request }) => {
    const email = `scenario-smoke-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;

    await test.step('Create a throwaway user via API', async () => {
        await registerViaAPI(request, { name: 'Scenario Smoke User', email, password: PASSWORD });
    });

    await test.step('Navigate to the login page', async () => {
        await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded' });
    });

    await test.step('Fill email input', async () => {
        const emailInput = page.locator('form input').nth(0);
        await emailInput.fill(email);
    });

    await test.step('Fill password input', async () => {
        const passwordInput = page.locator('form input').nth(1);
        await passwordInput.fill(PASSWORD);
    });

    await test.step('Click the submit button', async () => {
        const submitButton = page.locator('form button[type="submit"]');
        await submitButton.click();
    });

    await test.step('Verify that the user is redirected to the home page', async () => {
        await expect(page).toHaveURL('http://localhost:5173/');
    });

    await test.step('Verify that the page have only 1 h1 element', async () => {
        const h1Elements = page.locator('h1');
        const h1Count = await h1Elements.count();
        expect.soft(h1Count).toBe(1);
    });

    let productCards: any;

    await test.step('Verify each product card is displayed with the correct information', async () => {
        productCards = page.locator('main > div > div.grid > div');
        // Wait for the product cards to be fetched
        await productCards.first().waitFor({ timeout: 5000 });

        const productCount = await productCards.count();
        console.log(`Found ${productCount} product cards on the page.`);

        for (let i = 0; i < productCount; i++) {
            const productCard = productCards.nth(i);
            
            const image = productCard.locator('img');
            const title = productCard.locator('h2');
            const price = productCard.locator('p');

            expect.soft(
                image,
                `Product ${i} card image should be visible`,
            ).toBeVisible();

            expect.soft(
                image,
                `Product ${i} card image should have a valid src attribute`,
            ).toHaveAttribute('src', /.+/);

            expect.soft(
                image,
                `Product ${i} card image should have a valid alt attribute`,
            ).toHaveAttribute('alt', /.+/);

            expect.soft(
                title,
                `Product ${i} card title should not be empty`,
            ).not.toBeEmpty();

            expect.soft(
                price,
                `Product ${i} card price should not be empty`,
            ).not.toBeEmpty();

            expect.soft(
                price,
                `Product ${i} price should have ₫ currency`,
            ).toHaveText(/₫/);
        };
    });

    await test.step('Search products by name', async () => {
        const searchInput = page.getByPlaceholder('Tìm kiếm...');
        const searchButton = page.getByRole('button', { name: 'Tìm' });

        await searchInput.fill('iPhone');
        await searchButton.click();

        productCards = page.locator('main > div > div.grid > div');

        await expect.soft(
            productCards.first(),
            'At least one product card should be visible after searching for "iPhone"',
        ).toBeVisible();

        const productCount = await productCards.count();
        expect.soft(
            productCount,
            'Expected at least one product to be found after searching for "iPhone"',
        ).toBeGreaterThan(0);

        for (let index = 0; index < productCount; index++) {
            await expect.soft(
                productCards.nth(index).locator('h2'),
                `Product ${index + 1} name should match the search keyword`,
            ).toContainText('iPhone', { ignoreCase: true });
        }
    });

    await test.step('Verify that HTML search input is escaped', async () => {
        const htmlKeyword = '<img src=x onerror=alert("XSS")>';

        await page.getByPlaceholder('Tìm kiếm...').fill(htmlKeyword);
        await page.getByRole('button', { name: 'Tìm' }).click();

        const resultText = page.locator('div.mb-4.text-gray-600');

        await expect.soft(
            resultText,
            `Result text should display the escaped HTML keyword: ${htmlKeyword}`,
        ).toHaveText(
            `Kết quả tìm kiếm cho: ${htmlKeyword}`,
        );

        await expect.soft(
            resultText.locator('img'),
            `Result text should not contain any img elements`,
        ).toHaveCount(0);

        await expect.soft(
            resultText.locator('script'),
            `Result text should not contain any script elements`,
        ).toHaveCount(0);
        
    });

    await test.step('Clear search results for the next test', async () => {
        // Empty the search input for the next test step
        await page.getByPlaceholder('Tìm kiếm...').fill('');
        await page.getByRole('button', { name: 'Tìm' }).click();
        productCards = page.locator('main > div > div.grid > div');
        productCards.first().waitFor({ timeout: 5000 });
    });

    await test.step('Verify that product have a "Xem chi tiết" button', async () => {
        const productCount = await productCards.count();
        for (let i = 0; i < productCount; i++) {
            const productCard = productCards.nth(i);
            const detailsButton = productCard.locator('a', { hasText: 'Xem chi tiết' });
            await expect.soft(
                detailsButton,
                `Product ${i + 1} should have a "Xem chi tiết" button`,
            ).toBeVisible();
        }
    });

    productCards.first().locator('a', { hasText: 'Xem chi tiết' }).click();

    await test.step('Verify that the product detail page is displayed', async () => {
        await expect(
            page,
            'Product detail page must be displayed',
        ).toHaveURL(/\/product\/\d+$/);
        await expect(page.getByRole('button', { name: 'Thêm vào giỏ hàng', exact: true })).toBeVisible();
    });
    
    await test.step('Verify that add to cart function is working with correct information', async () => {
        const quantityInput = page.locator('input[type="number"]');
        const addToCartButton = page.getByRole('button', { name: 'Thêm vào giỏ hàng', exact: true });
        const cartButton = page.getByRole('link', { name: 'Giỏ hàng', exact: true });
        const productTitle = await page.locator('main h1').textContent();
        const productPrice = await page.locator('main p').first().textContent();

        await quantityInput.fill('1');
        await addToCartButton.click();
        await addToCartButton.click();
        await cartButton.click();

        await expect(
            page,
            'Cart page must be displayed',
        ).toHaveURL(/\/cart$/);

        const cartItems = page.locator('table > tbody  > tr');
        const cartItemCountValue = await cartItems.count();
        await expect(
            cartItemCountValue, 
            'Expected 1 item in the cart'
        ).toBe(1);

        const cartItemTitle = cartItems.nth(0).locator('td').nth(0);
        const cartItemPrice = cartItems.nth(0).locator('td').nth(1);
        const cartItemQuantity = cartItems.nth(0).locator('td').nth(2);
        const cartItemTotal = cartItems.nth(0).locator('td').nth(3);

        await expect.soft(
            cartItemTitle,
            'Cart item title should not be empty',
        ).not.toBeEmpty();

        await expect.soft(
            cartItemTitle,
            'Cart item title should match the product title',
        ).toHaveText(productTitle || '');

        await expect.soft(
            cartItemPrice,
            'Cart item price should not be empty',
        ).not.toBeEmpty();

        await expect.soft(
            cartItemPrice,
            'Cart item price should match the product price',
        ).toHaveText(productPrice || '');

        await expect.soft(
            cartItemQuantity,
            'Cart item quantity should be 1',
        ).toHaveText('1');

        await expect.soft(
            cartItemTotal,
            'Cart item total should match the product price',
        ).toHaveText(productPrice || '');
    });

});