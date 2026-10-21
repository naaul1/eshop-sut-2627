/**
 * CheckoutPage — Share C owns this file.
 *
 * Locators verified against frontend-web/src/pages/Checkout.jsx on 2026-10-22:
 * - the total label has no htmlFor, so getByLabel() cannot be used;
 * - the total is the only input[type=number] on the page;
 * - the success message is an <h2>, not an <h1> (FR-21 finding).
 *
 * Rule (Task_Assignment §4.8): a POM method = one user action; assertions live in specs.
 */
export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.itemLines = page.locator('ul.list-disc li');
    this.totalInput = page.locator('input[type="number"]');
    this.summaryTotal = page.getByText('Tổng thanh toán:').last();
    this.confirmButton = page.getByRole('button', { name: 'Xác Nhận Thanh Toán' });
    this.successHeading = page.getByRole('heading', { name: 'Thanh toán thành công!' });
    // FR-09 is out of scope for M1–3; helpers kept for the later demo scenarios.
    this.couponInput = page.getByPlaceholder('Nhập mã giảm giá...');
    this.applyCouponButton = page.getByRole('button', { name: 'Áp dụng' });
  }

  async goto() {
    await this.page.goto('/checkout', { waitUntil: 'domcontentloaded' });
  }

  async confirm() {
    await this.confirmButton.click();
  }

  async applyCoupon(code) {
    await this.couponInput.fill(code);
    await this.applyCouponButton.click();
  }
}
