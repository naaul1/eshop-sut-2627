import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '@playwright/test';
import { applyApiThrottle } from '../support/throttle';
import { registerViaAPI } from '../support/auth';

type CaseType =
  | 'duplicate-email'
  | 'email-no-at'
  | 'email-no-domain'
  | 'name-required'
  | 'email-required'
  | 'password-required'
  | 'password-too-short'
  | 'password-valid-boundary'
  | 'password-no-uppercase'
  | 'password-no-lowercase'
  | 'password-no-digit';

const registrationData = JSON.parse(
  readFileSync(join(__dirname, 'data', 'fr01-registration.json'), 'utf8'),
) as {
  namePrefix: string;
  emailPrefix: string;
  emailDomain: string;
  password: string;
  registrationCases: {
    title: string;
    caseType: CaseType;
    emailTemplate: string;
    password?: string;
    expectedOutcome: 'accept' | 'reject';
  }[];
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

for (const testCase of registrationData.registrationCases) {
  test(testCase.title, async ({ page, request }) => {
    const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const name = testCase.caseType === 'name-required'
      ? ''
      : `${registrationData.namePrefix} ${uniqueSuffix}`;
    const email = testCase.emailTemplate
      .replace('{prefix}', registrationData.emailPrefix)
      .replace('{suffix}', uniqueSuffix)
      .replace('{domain}', registrationData.emailDomain);
    const password = testCase.password ?? registrationData.password;
    const nameInput = page.locator('form input').nth(0);
    const emailInput = page.locator('form input').nth(1);
    const passwordInput = page.locator('form input').nth(2);
    let registrationRequestSent = false;

    if (testCase.caseType === 'duplicate-email') {
      await registerViaAPI(request, {
        name: `${registrationData.namePrefix} existing ${uniqueSuffix}`,
        email,
        password: registrationData.password,
      });
    }

    page.on('request', (request) => {
      if (
        request.method() === 'POST' &&
        request.url().endsWith('/api/register')
      ) {
        registrationRequestSent = true;
      }
    });

    await page.goto('/register', { waitUntil: 'domcontentloaded' });
    await nameInput.fill(name);
    await emailInput.fill(email);
    await passwordInput.fill(password);

    if (
      testCase.caseType === 'email-no-at' ||
      testCase.caseType === 'email-no-domain'
    ) {
      await expect.soft(emailInput).toHaveAttribute('type', 'email');
      const emailIsValid = await emailInput.evaluate((input) =>
        (input as HTMLInputElement).checkValidity(),
      );
      expect.soft(emailIsValid).toBe(false);
    } else if (
      testCase.caseType === 'name-required' ||
      testCase.caseType === 'email-required' ||
      testCase.caseType === 'password-required'
    ) {
      const requiredInput = {
        'name-required': nameInput,
        'email-required': emailInput,
        'password-required': passwordInput,
      }[testCase.caseType];
      await expect.soft(requiredInput).toHaveAttribute('required', '');
    }

    await page.getByRole('button', { name: 'Đăng Ký' }).click();

    await expect.soft(page).toHaveURL(
      testCase.expectedOutcome === 'accept' ? /\/login$/ : /\/register$/,
    );
    expect.soft(registrationRequestSent).toBe(
      testCase.expectedOutcome === 'accept',
    );
    if (testCase.caseType === 'duplicate-email') {
      await test.step('Verify API rejects the duplicate email', async () => {
        const duplicateResponse = await request.post(
          'http://localhost:3000/api/register',
          {
            data: {
              name: `${registrationData.namePrefix} duplicate ${uniqueSuffix}`,
              email,
              password: registrationData.password,
            },
          },
        );
        expect.soft(duplicateResponse.ok()).toBe(false);
      });
    }
    if (
      testCase.caseType === 'duplicate-email' ||
      testCase.caseType === 'email-no-at' ||
      testCase.caseType === 'email-no-domain' ||
      testCase.caseType === 'password-valid-boundary'
    ) {
      await expect.soft(page.getByText(/Mật khẩu quá yếu!/)).not.toBeVisible();
    }
  });
}
