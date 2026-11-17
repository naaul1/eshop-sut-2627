import { expect, APIResponse, Locator, Page } from '@playwright/test';

export type CouponRequest = {
  code?: string | number | null;
  total_amount: number;
  user_id: number;
};

export class CouponPage {
  readonly page: Page;
  readonly couponInput: Locator;
  readonly applyButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    this.applyButton = page.getByRole('button', { name: 'Áp dụng' });
  }

  async openCheckout(): Promise<void> {
    await this.page.goto('/checkout');
  }

  async setCouponCode(code: string): Promise<void> {
    await this.couponInput.fill(code);
  }

  async applyCoupon(
    request: CouponRequest,
    token?: string,
  ): Promise<APIResponse> {
    return this.page.request.post('http://localhost:3000/api/apply-coupon', {
      data: request,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }

  async expectApplyButtonRejected(): Promise<void> {
    await expect(this.applyButton).toBeDisabled();
  }
}
