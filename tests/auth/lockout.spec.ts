import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { applyApiThrottle } from '../support/throttle.js';

const VALID_EMAIL = 'test@eshop.com';
const VALID_PASSWORD = 'Test1234!';
const INVALID_PASSWORD = 'InvalidPassword123!';

test.beforeEach(async ({ page }) => {
    const delay = Number(process.env.THROTTLE_MS || 0);
    if (delay > 0) await applyApiThrottle(page, delay)
    else await applyApiThrottle(page, 300);
});

test('Test 1: Lockout after 3 failed login attempts', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    for (let i = 1; i <= 3; i++) {
        await test.step(`Attempt ${i}: Enter invalid credentials and submit the form`, async () => {
            await loginPage.login(VALID_EMAIL, INVALID_PASSWORD);
        });
    }

    await test.step('Login with valid credentials after lockout', async () => {
        await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    });

    await test.step('Verify that login fails with a lockout error message', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
    });
});

test('Test 2: Lockout duration and reset', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    for (let i = 1; i <= 3; i++) {
        await test.step(`Attempt ${i}: Enter invalid credentials and submit the form`, async () => {
            await loginPage.login(VALID_EMAIL, INVALID_PASSWORD);
        });
    };

    await test.step('Wait for lockout duration to expire', async () => {
        await page.waitForTimeout(31000); // Wait for 31 seconds (adjust based on your lockout duration)
    });

    await test.step('Login with valid credentials after lockout duration', async () => {
        await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    });

    await test.step('Verify that login succeeds after lockout duration', async () => {
        await expect(loginPage.errorMessage).not.toBeVisible();
        await expect(page).toHaveURL('/');
    });
});

test('Test 3: Login succeeds with in 3 retries', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    for (let i = 1; i <= 2; i++) {
        await test.step(`Attempt ${i}: Enter invalid credentials and submit the form`, async () => {
            await loginPage.login(VALID_EMAIL, INVALID_PASSWORD);
        });
    }

    await test.step('Attempt 3: Enter valid credentials and submit the form', async () => {
        await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    });

    await test.step('Verify that login succeeds with valid credentials', async () => {
        await expect(loginPage.errorMessage).not.toBeVisible();
        await expect(page).toHaveURL('/');
    });
});