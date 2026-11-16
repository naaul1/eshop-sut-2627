import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { APIRequestContext, Page, Response, test, expect } from '@playwright/test';
import { applyApiThrottle } from '../support/throttle';
import { loginViaAPI, registerViaAPI } from '../support/auth';

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
  admin: { email: string; password: string };
  registrationCases: {
    title: string;
    caseType: CaseType;
    emailTemplate: string;
    password?: string;
    expectedOutcome: 'accept' | 'reject';
  }[];
};

function watchRegistration(page: Page) {
  let requestSent = false;
  let resolveResponse!: (response: Response) => void;
  const response = new Promise<Response>((resolve) => {
    resolveResponse = resolve;
  });
  const isRegistration = (method: string, url: string) =>
    method === 'POST' && url.endsWith('/api/register');

  page.on('request', (request) => {
    if (isRegistration(request.method(), request.url())) requestSent = true;
  });
  page.on('response', (response) => {
    if (isRegistration(response.request().method(), response.url())) {
      resolveResponse(response);
    }
  });

  return { response, wasSent: () => requestSent };
}

async function deleteRegisteredUsers(
  request: APIRequestContext,
  userIds: number[],
): Promise<void> {
  if (userIds.length === 0) return;

  const { token } = await loginViaAPI(request, registrationData.admin);
  for (const userId of new Set(userIds)) {
    const response = await request.delete(
      `http://localhost:3000/api/admin/users/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (!response.ok()) {
      throw new Error(`API user cleanup failed: ${response.status()} ${await response.text()}`);
    }
  }
}

test.beforeEach(async ({ page }) => {
  const delay = Number(process.env.THROTTLE_MS || 0);
  if (delay > 0) await applyApiThrottle(page, delay);
});

test('FIND-REG-01: valid registration redirects to login', async ({ page, request }) => {
  const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  const name = `${registrationData.namePrefix} ${uniqueSuffix}`;
  const email = `${registrationData.emailPrefix}-${uniqueSuffix}@${registrationData.emailDomain}`;
  const userIdsToDelete: number[] = [];
  const registration = watchRegistration(page);
  const nameInput = page.locator('form div').filter({ hasText: 'Họ Tên' }).locator('input');
  const emailInput = page.locator('form div').filter({ hasText: 'Email' }).locator('input');
  const passwordInput = page.locator('form div').filter({ hasText: 'Mật khẩu' }).locator('input');

  try {
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

    const response = registration.wasSent() ? await registration.response : undefined;
    if (response?.ok()) {
      const result = await response.json() as { id: number };
      userIdsToDelete.push(result.id);
    }
    await expect.soft(page).toHaveURL(/\/login$/);
    expect.soft(registration.wasSent()).toBe(true);
    expect.soft(response?.ok()).toBe(true);
    await expect.soft(page.getByText(/Mật khẩu quá yếu!/)).not.toBeVisible();
  } finally {
    await deleteRegisteredUsers(request, userIdsToDelete);
  }
});

for (const testCase of registrationData.registrationCases) {
  test(testCase.title, async ({ page, request }) => {
    const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const userIdsToDelete: number[] = [];
    const name = testCase.caseType === 'name-required'
      ? ''
      : `${registrationData.namePrefix} ${uniqueSuffix}`;
    const email = testCase.emailTemplate
      .replace('{prefix}', registrationData.emailPrefix)
      .replace('{suffix}', uniqueSuffix)
      .replace('{domain}', registrationData.emailDomain);
    const password = testCase.password ?? registrationData.password;
    const registration = watchRegistration(page);
    const nameInput = page.locator('form div').filter({ hasText: 'Họ Tên' }).locator('input');
    const emailInput = page.locator('form div').filter({ hasText: 'Email' }).locator('input');
    const passwordInput = page.locator('form div').filter({ hasText: 'Mật khẩu' }).locator('input');

    try {
      if (testCase.caseType === 'duplicate-email') {
        const existingUser = await registerViaAPI(request, {
          name: `${registrationData.namePrefix} existing ${uniqueSuffix}`,
          email,
          password: registrationData.password,
        });
        userIdsToDelete.push(existingUser.id);
      }

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
        expect.soft(
          await requiredInput.evaluate((input) =>
            (input as HTMLInputElement).checkValidity(),
          ),
        ).toBe(false);
      }

      await page.getByRole('button', { name: 'Đăng Ký' }).click();
      const uiResponse = registration.wasSent() ? await registration.response : undefined;
      if (uiResponse?.ok()) {
        const result = await uiResponse.json() as { id: number };
        userIdsToDelete.push(result.id);
      }

      await expect.soft(page).toHaveURL(
        testCase.expectedOutcome === 'accept' ? /\/login$/ : /\/register$/,
      );
      if (testCase.expectedOutcome === 'accept') {
        expect.soft(registration.wasSent()).toBe(true);
        expect.soft(uiResponse?.ok()).toBe(true);
      } else if (uiResponse) {
        expect.soft(uiResponse.ok()).toBe(false);
      }

      if (
        testCase.caseType === 'password-too-short' ||
        testCase.caseType === 'password-no-uppercase' ||
        testCase.caseType === 'password-no-lowercase' ||
        testCase.caseType === 'password-no-digit'
      ) {
        await expect.soft(page.getByText(/Mật khẩu quá yếu!/)).toBeVisible();
      }

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
          if (duplicateResponse.ok()) {
            const result = await duplicateResponse.json() as { id: number };
            userIdsToDelete.push(result.id);
          }
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
    } finally {
      await deleteRegisteredUsers(request, userIdsToDelete);
    }
  });
}
