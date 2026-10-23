import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { registerViaAPI } from '../support/auth';
import { applyApiThrottle } from '../support/throttle';
import { registerViaAPI } from '../support/auth';
import { request } from 'https';

let VALID_EMAIL: string;
const VALID_PASSWORD = 'ValidPassword123!';
const INVALID_PASSWORD = 'InvalidPassword';

test.beforeEach(async ({ page }) => {
    const delay = Number(process.env.THROTTLE_MS || 0);
    if (delay > 0) await applyApiThrottle(page, delay)
    else await applyApiThrottle(page, 300);
});

test.beforeEach(async ({ request }) => {
    const timestamp = Date.now();
    VALID_EMAIL = `test${timestamp}@eshop.com`;
    await registerViaAPI(request, { email: VALID_EMAIL, password: VALID_PASSWORD, name: 'Test User' });
});

test('Test 1: Lockout after 3 failed login attempts', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const email = `lockout-attempts-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;

    await test.step('Create a throwaway user via API', async () => {
        await registerViaAPI(request, { name: 'Lockout Attempts User', email, password: VALID_PASSWORD });
    });

    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    for (let i = 1; i <= 3; i++) {
        await test.step(`Attempt ${i}: Enter invalid credentials and submit the form`, async () => {
            await loginPage.login(email, INVALID_PASSWORD);
        });
    }

    await test.step('Login with valid credentials after lockout', async () => {
        await loginPage.login(email, VALID_PASSWORD);
    });

    await test.step('Verify that login fails with a lockout error message', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
    });
});

test('Test 2: FIND-A2 Lockout duration and reset', async ({ page, request }) => {
    test.setTimeout(90_000);

    const loginPage = new LoginPage(page);
    const email = `lockout-duration-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;

    await test.step('Create a throwaway user via API', async () => {
        await registerViaAPI(request, { name: 'Lockout Duration User', email, password: VALID_PASSWORD });
    });

    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    for (let i = 1; i <= 3; i++) {
        await test.step(`Attempt ${i}: Enter invalid credentials and submit the form`, async () => {
            await loginPage.login(email, INVALID_PASSWORD);
        });
    };

    await test.step('Wait for lockout duration to expire', async () => {
        await page.waitForTimeout(31000); // Wait for 31 seconds (adjust based on your lockout duration)
    });

    await test.step('Login with valid credentials after lockout duration', async () => {
        await loginPage.login(email, VALID_PASSWORD);
    });

    await test.step('Verify that login succeeds after lockout duration', async () => {
        await expect(loginPage.errorMessage).not.toBeVisible();
        await expect(page).toHaveURL('/');
    });
});

test('Test 3: FIND-A3 Login succeeds with in 3 retries', async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const email = `lockout-retries-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;

    await test.step('Create a throwaway user via API', async () => {
        await registerViaAPI(request, { name: 'Lockout Retries User', email, password: VALID_PASSWORD });
    });

    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    for (let i = 1; i <= 2; i++) {
        await test.step(`Attempt ${i}: Enter invalid credentials and submit the form`, async () => {
            await loginPage.login(email, INVALID_PASSWORD);
        });
    }

    await test.step('Attempt 3: Enter valid credentials and submit the form', async () => {
        await loginPage.login(email, VALID_PASSWORD);
    });

    await test.step('Verify that login succeeds with valid credentials', async () => {
        await expect(loginPage.errorMessage).not.toBeVisible();
        await expect(page).toHaveURL('/');
    });
});