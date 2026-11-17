import { expect, Locator, Page } from '@playwright/test';

export type AdminCredentials = {
  email: string;
  password: string;
};

export type CouponInput = {
  code: string;
  type: 'percent' | 'fixed';
  discountValue: string;
  minOrderAmount: string;
  expiredAt: string;
  maxUsesPerUser: string;
};

export class AdminCouponPage {
  readonly page: Page;
  readonly loginForm: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly couponTab: Locator;
  readonly couponForm: Locator;
  readonly codeInput: Locator;
  readonly typeSelect: Locator;
  readonly discountValueInput: Locator;
  readonly minOrderAmountInput: Locator;
  readonly expiredAtInput: Locator;
  readonly maxUsesPerUserInput: Locator;
  readonly createButton: Locator;
  readonly couponsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginForm = page.locator('form').filter({ hasText: 'Admin Login' });
    this.emailInput = this.loginForm.getByPlaceholder('Email');
    this.passwordInput = this.loginForm.getByPlaceholder('Password');
    this.loginButton = this.loginForm.getByRole('button', { name: 'Login' });
    this.couponTab = page.getByText('Mã Giảm Giá', { exact: true });
    this.couponForm = page
      .locator('form')
      .filter({ hasText: 'Tạo mã giảm giá mới' });
    this.codeInput = this.couponForm.getByPlaceholder('Mã coupon (VD: SAVE10)');
    this.typeSelect = this.couponForm.locator('select');
    this.discountValueInput = this.couponForm.locator('input[type="number"]').nth(0);
    this.minOrderAmountInput = this.couponForm.locator('input[type="number"]').nth(1);
    this.expiredAtInput = this.couponForm.locator('input[type="date"]');
    this.maxUsesPerUserInput = this.couponForm.locator('input[type="number"]').nth(2);
    this.createButton = this.couponForm.getByRole('button', { name: 'Tạo mã' });
    this.couponsHeading = page.getByRole('heading', {
      name: 'Quản lý Mã Giảm Giá',
    });
  }

  async open(): Promise<void> {
    await this.page.goto('http://localhost:5174');
  }

  async login(credentials: AdminCredentials): Promise<void> {
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  async expectLoginVisible(): Promise<void> {
    await expect(this.loginForm).toBeVisible();
  }

  async openCoupons(): Promise<void> {
    await this.couponTab.click();
    await expect(this.couponsHeading).toBeVisible();
  }

  async fillCoupon(input: CouponInput): Promise<void> {
    await this.codeInput.fill(input.code);
    await this.typeSelect.selectOption(input.type);
    await this.discountValueInput.fill(input.discountValue);
    await this.minOrderAmountInput.fill(input.minOrderAmount);
    await this.expiredAtInput.fill(input.expiredAt);
    await this.maxUsesPerUserInput.fill(input.maxUsesPerUser);
  }

  async submitCoupon(): Promise<void> {
    await this.createButton.click();
  }

  async expectCouponVisible(code: string): Promise<void> {
    await expect(this.page.getByRole('row').filter({ hasText: code })).toBeVisible();
  }

  async expectCouponAbsent(code: string): Promise<void> {
    await expect(this.page.getByRole('row').filter({ hasText: code })).toHaveCount(0);
  }

  async deleteCoupon(code: string): Promise<void> {
    const row = this.page.getByRole('row').filter({ hasText: code });
    await row.getByRole('button', { name: 'Xóa' }).click();
    await expect(row).toHaveCount(0);
  }

  async expectFormInvalid(): Promise<void> {
    await expect
      .poll(() =>
        this.couponForm.evaluate((form) => !(form as HTMLFormElement).checkValidity()),
      )
      .toBe(true);
  }
}
