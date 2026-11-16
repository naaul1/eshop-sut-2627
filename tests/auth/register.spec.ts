import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '@playwright/test';
import { applyApiThrottle } from '../support/throttle';

const registrationData = JSON.parse(
  readFileSync(join(__dirname, 'data', 'fr01-registration.json'), 'utf8'),
) as {
  namePrefix: string;
  emailPrefix: string;
  emailDomain: string;
  password: string;
};

test.beforeEach(async ({ page }) => {
  const delay = Number(process.env.THROTTLE_MS || 0);
  if (delay > 0) await applyApiThrottle(page, delay);
});

test('FIND-REG-01: valid registration redirects to login', async ({ page }) => {
  const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  const name = `${registrationData.namePrefix} ${uniqueSuffix}`;
  const email = `${registrationData.emailPrefix}-${uniqueSuffix}@${registrationData.emailDomain}`;
  const nameInput = page.locator('form input').nth(0);
  const emailInput = page.locator('form input').nth(1);
  const passwordInput = page.locator('form input').nth(2);

  await page.goto('/register', { waitUntil: 'domcontentloaded' });

  await expect.soft(nameInput).toBeVisible();
  await expect.soft(emailInput).toBeVisible();
  await expect.soft(emailInput).toHaveAttribute('type', 'email');
  await expect.soft(passwordInput).toBeVisible();
  await expect.soft(passwordInput).toHaveAttribute('type', 'password');

  await nameInput.fill(name);
  await emailInput.fill(email);
  await passwordInput.fill(registrationData.password);
  await page.getByRole('button', { name: 'Đăng Ký' }).click();

  await expect.soft(page).toHaveURL(/\/login$/);
  await expect.soft(page.getByText(/Mật khẩu quá yếu!/)).not.toBeVisible();
});
