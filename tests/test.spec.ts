// Test mẫu sẽ xóa khi hoàn thành

import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test';

test('Test 1: Verify the title of the page', async () => {
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await page. goto('/');
    await expect(page).toHaveTitle('frontend-web');

    await browser.close();
});

test('Test 2: Verify the presence of a specific element', async () => {
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto('/');
    const element = await page.getByText('Đăng nhập');
    element ? await element.click() : null;
    const element2 = await page.getByText('email');
    await expect(element2).not.toBeNull();

    await browser.close();
});
