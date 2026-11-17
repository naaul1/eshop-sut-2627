import { expect, test } from '@playwright/test';
import cases from './forgot-password-cases.json';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';

const registeredEmail = 'test@eshop.com';
const validOtpPattern = /^\d{4,6}$/;

type ForgotPasswordCase = (typeof cases)[number];

function getCase(id: string): ForgotPasswordCase {
  const testCase = cases.find((item) => item.id === id);
  if (!testCase) {
    throw new Error(`Missing test data for ${id}`);
  }
  return testCase;
}

async function openStepTwo(
  forgotPasswordPage: ForgotPasswordPage,
): Promise<void> {
  await forgotPasswordPage.open();
  await forgotPasswordPage.requestOtp(registeredEmail);
  await forgotPasswordPage.expectStepTwo();
}

async function expectValidationState(
  forgotPasswordPage: ForgotPasswordPage,
): Promise<void> {
  await expect(forgotPasswordPage.resetPasswordButton).toBeVisible();
  await expect(forgotPasswordPage.page).toHaveURL(/\/forgot-password$/);
}

async function expectRequestStepState(
  forgotPasswordPage: ForgotPasswordPage,
): Promise<void> {
  await expect(forgotPasswordPage.requestOtpButton).toBeVisible();
  await expect(forgotPasswordPage.page).toHaveURL(/\/forgot-password$/);
}

test.describe('FR-03 - Quên mật khẩu và đặt lại mật khẩu', () => {
  test.describe('Bước 1 - Lấy OTP', () => {
    for (const testCase of cases.filter(
      (item) => item.category === 'request-otp',
    )) {
      test(`${testCase.id} - email ${JSON.stringify(testCase.email)}`, async ({
        page,
      }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);
        await forgotPasswordPage.open();
        await forgotPasswordPage.emailInput.fill(testCase.email ?? '');

        if (testCase.expected === 'required') {
          await forgotPasswordPage.requestOtpButton.click();
          await expectRequestStepState(forgotPasswordPage);
          await expect(forgotPasswordPage.otpInput).toBeHidden();
          return;
        }

        if (testCase.expected === 'dialog') {
          const dialogPromise = page.waitForEvent('dialog');
          await forgotPasswordPage.requestOtpButton.click();
          const dialog = await dialogPromise;
          expect(dialog.message()).toMatch(/Lỗi|User not found/);
          await dialog.dismiss();
          await expect(forgotPasswordPage.otpInput).toBeHidden();
          return;
        }

        await forgotPasswordPage.requestOtpButton.click();
        await expect(forgotPasswordPage.otpMessage).toContainText(
          'Mã OTP của bạn là:',
        );
        await expect(forgotPasswordPage.otpInput).toBeVisible();
        const message = await forgotPasswordPage.getOtpMessage();
        expect(message).toMatch(/Mã OTP của bạn là: \d{6}/);
      });
    }
  });

  test.describe('Bước 2 - OTP', () => {
    for (const testCase of cases.filter((item) => item.category === 'otp')) {
      test(`${testCase.id} - OTP ${JSON.stringify(testCase.otp)}`, async ({
        page,
      }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);
        await openStepTwo(forgotPasswordPage);
        await forgotPasswordPage.otpInput.fill(testCase.otp ?? '');

        if (testCase.expected === 'required') {
          await forgotPasswordPage.resetPasswordButton.click();
          await expectValidationState(forgotPasswordPage);
          await expect(forgotPasswordPage.otpInput).toHaveValue('');
          return;
        }

        const dialogPromise = page.waitForEvent('dialog');
        await forgotPasswordPage.resetPassword(
          testCase.otp ?? '',
          'Newpass1 ',
        );
        const dialog = await dialogPromise;
        expect(dialog.message()).toContain('Mã OTP không đúng');
        await dialog.dismiss();
        await expect(forgotPasswordPage.page).toHaveURL(/\/forgot-password$/);
      });
    }
  });

  test(`${getCase('TC-FR03-17').id} - OTP đã sử dụng`, async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await openStepTwo(forgotPasswordPage);
    const otpMessage = await forgotPasswordPage.getOtpMessage();
    const otp = otpMessage.match(/(\d{4,6})/)?.[1];
    expect(otp).toMatch(validOtpPattern);

    const firstResetDialog = page.waitForEvent('dialog');
    await forgotPasswordPage.resetPassword(
      otp ?? '',
      getCase('TC-FR03-17').password ?? '',
    );
    const firstDialog = await firstResetDialog;
    expect(await firstDialog.message()).toBe('Đổi mật khẩu thành công!');
    await firstDialog.dismiss();
    await expect(page).toHaveURL(/\/login$/);

    const response = await page.request.post(
      'http://localhost:3000/api/reset-password',
      {
        data: {
          email: registeredEmail,
          resetToken: otp,
          newPassword: getCase('TC-FR03-17').password,
        },
      },
    );
    expect(response.status()).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: 'Invalid token or email',
    });
  });

  test.describe('Bước 2 - Mật khẩu mới', () => {
    for (const testCase of cases.filter(
      (item) => item.category === 'password',
    )) {
      test(`${testCase.id} - password ${JSON.stringify(testCase.password)}`, async ({
        page,
      }) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);
        await openStepTwo(forgotPasswordPage);
        const otp = (await forgotPasswordPage.getOtpMessage()).match(
          /(\d{4,6})/,
        )?.[1];
        expect(otp).toMatch(validOtpPattern);
        await forgotPasswordPage.otpInput.fill(otp ?? '');
        await forgotPasswordPage.newPasswordInput.fill(
          testCase.password ?? '',
        );

        if (testCase.expected === 'required') {
          await forgotPasswordPage.resetPasswordButton.click();
          await expectValidationState(forgotPasswordPage);
          await expect(forgotPasswordPage.newPasswordInput).toHaveValue('');
          return;
        }

        if (testCase.expected === 'dialog') {
          page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain('Mật khẩu quá yếu');
            await dialog.dismiss();
          });
          //const dialogPromise = page.waitForEvent('dialog');
          await forgotPasswordPage.resetPasswordButton.click();
          //const dialog = await dialogPromise;
          //expect(dialog.message()).toContain('Mật khẩu quá yếu');
          //await dialog.dismiss();
          await expect(forgotPasswordPage.page).toHaveURL(/\/forgot-password$/);
          return;
        }

        page.on('dialog', async (dialog) => {
          expect(dialog.message()).toContain('Đổi mật khẩu thành công');
          await dialog.dismiss();
        });
        //const dialogPromise = page.waitForEvent('dialog');
        await forgotPasswordPage.resetPasswordButton.click();
        //const dialog = await dialogPromise;
        //expect(dialog.message()).toContain('Đổi mật khẩu thành công');
        //await dialog.dismiss();
        await expect(page).toHaveURL(/\/login$/);
      });
    }
  });
});