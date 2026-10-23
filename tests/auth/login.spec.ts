import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { registerViaAPI } from '../support/auth';
import { applyApiThrottle } from '../support/throttle';

test.beforeEach(async ({ page }) => {
    const delay = Number(process.env.THROTTLE_MS || 0);
    if (delay > 0) await applyApiThrottle(page, delay)
    else await applyApiThrottle(page, 300);
});

test('Test 1: Login (happy path)', async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const email = `login-valid-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const password = 'Test1234!';

    await test.step('Create a throwaway user via API', async () => {
        await registerViaAPI(request, { name: 'Login Happy Path User', email, password });
    });

    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    await test.step('Enter valid credentials and submit the form', async () => {
        await loginPage.login(email, password);
    });

    await test.step('Verify that login succeeds', async () => {
        await expect(loginPage.errorMessage).not.toBeVisible();
        await expect(page).toHaveURL('/');
    });
});

test('Test 2: Login with invalid email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    await test.step('Enter invalid email and submit the form', async () => {
        await loginPage.login('invalid-email', 'Test1234!');
    });

    await test.step('Verify that login fails with an error message', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
    });
});

test('Test 3: Login with invalid password', async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const email = `login-invalid-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const password = 'Test1234!';

    await test.step('Create a throwaway user via API', async () => {
        await registerViaAPI(request, { name: 'Login Invalid Password User', email, password });
    });

    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    await test.step('Enter valid email and invalid password and submit the form', async () => {
        await loginPage.login(email, 'InvalidPassword123!');
    });

    await test.step('Verify that login fails with an error message', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
    });
});

test('Test 4: FIND-A1 Password field should be masked', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    await test.step('Verify that the password input field is of type "password"', async () => {
        const passwordInputType = await loginPage.passwordInput.getAttribute('type');
        expect(passwordInputType).toBe('password');
    });
});

test('Test 5: FIND-C2 Checkout without login', async ({ page }) => {
    await test.step('Open the home page', async () => {
        await page.goto('/');
    });

    await test.step('Attempt to access the checkout page without logging in', async () => {
        await page.goto('/checkout');
    });

    await test.step('Verify that the user is redirected to the login page', async () => {
        await expect(page).toHaveURL('/login');
    });
});