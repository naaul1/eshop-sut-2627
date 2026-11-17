import { expect, Locator, Page } from '@playwright/test';

export class ForgotPasswordPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly requestOtpButton: Locator;
  readonly otpMessage: Locator;
  readonly otpInput: Locator;
  readonly newPasswordInput: Locator;
  readonly resetPasswordButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('form input[type="text"]').first();
    this.requestOtpButton = page.getByRole('button', { name: 'Lấy mã OTP' });
    this.otpMessage = page.locator('.bg-green-100');
    this.otpInput = page
      .locator('form')
      .filter({ has: page.locator('.bg-green-100') })
      .locator('input[type="text"]');
    this.newPasswordInput = page.locator('input[type="password"]');
    this.resetPasswordButton = page.getByRole('button', {
      name: 'Đặt lại mật khẩu',
    });
    this.backButton = page.getByRole('button', { name: /Quay lại/ });
  }

  async open(): Promise<void> {
    await this.page.goto('/forgot-password');
  }

  async openFromLogin(): Promise<void> {
    await this.page.goto('/login');
    await this.page.getByRole('link', { name: 'Quên mật khẩu?' }).click();
  }

  async requestOtp(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.requestOtpButton.click();
  }

  async expectStepTwo(): Promise<void> {
    await expect(this.otpInput).toBeVisible();
    await expect(this.newPasswordInput).toBeVisible();
    await expect(this.otpMessage).toBeVisible();
  }

  async getOtpMessage(): Promise<string> {
    return (await this.otpMessage.textContent()) ?? '';
  }

  async resetPassword(otp: string, newPassword: string): Promise<void> {
    await this.otpInput.fill(otp);
    await this.newPasswordInput.fill(newPassword);
    await this.resetPasswordButton.click();
  }

  async goBackToStepOne(): Promise<void> {
    await this.backButton.click();
    await expect(this.emailInput).toBeVisible();
  }
}
