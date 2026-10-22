import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Test 1: Login (happy path)', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    await test.step('Enter valid credentials and submit the form', async () => {
        await loginPage.login('test@eshop.com', 'Test1234!');
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

test('Test 3: Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open the login page', async () => {
        await loginPage.goto();
    });

    await test.step('Enter valid email and invalid password and submit the form', async () => {
        await loginPage.login('test@eshop.com', 'InvalidPassword123!');
    });

    await test.step('Verify that login fails with an error message', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
    });
});