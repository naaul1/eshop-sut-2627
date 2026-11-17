import { expect, test } from '@playwright/test';
import cases from './coupon-cases.json';
import { CouponPage } from '../pages/CouponPage';

type CouponCase = (typeof cases)[number];

test.describe('FR-09 - Mã giảm giá', () => {
  for (const testCase of cases) {
    test(`${testCase.id} - ${testCase.category}`, async ({ page }) => {
      const couponPage = new CouponPage(page);

      if (testCase.expected.buttonDisabled) {
        await couponPage.openCheckout();
        await couponPage.setCouponCode(String(testCase.request.code ?? ''));
        await couponPage.expectApplyButtonRejected();
      }

      const response = await couponPage.applyCoupon(testCase.request);
      expect(response.url()).toMatch(/\/api\/apply-coupon$/);
      expect(response.status()).toBe(testCase.expected.status);

      const body = await response.json();
      if (testCase.expected.error) {
        expect(body).toHaveProperty('error', testCase.expected.error);
        return;
      }

      expect(body).toHaveProperty('success', testCase.expected.success);
      if (testCase.expected.discount_amount !== undefined) {
        expect(body).toHaveProperty(
          'discount_amount',
          testCase.expected.discount_amount,
        );
        expect(body).toHaveProperty(
          'final_amount',
          testCase.expected.final_amount,
        );
      }
    });
  }
});
