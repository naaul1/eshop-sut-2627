import { expect, test } from '@playwright/test';
import cases from './fr17-cases.json';
import { AdminCouponPage } from '../pages/AdminCouponPage';

const adminCredentials = {
  email: 'admin@eshop.com',
  password: 'Admin123!',
};

type CouponCase = (typeof cases)[number];

test.describe('FR-17 - Quản lý Mã Giảm Giá', () => {
  for (const testCase of cases) {
    test(`${testCase.id} - ${testCase.category}`, async ({ page }) => {
      const couponPage = new AdminCouponPage(page);
      await couponPage.open();

      if (testCase.id === 'TC-FR17-03') {
        const dialog = page.waitForEvent('dialog');
        await couponPage.login(testCase.credentials);
        const alert = await dialog;
        expect(alert.type()).toBe('alert');
        expect(alert.message()).toContain('admin');
        await alert.dismiss();
        await couponPage.expectLoginVisible();
        return;
      }

      await couponPage.login(adminCredentials);
      await couponPage.openCoupons();
      const couponCase = testCase as Extract<CouponCase, { input: object }>;
      await couponPage.fillCoupon(couponCase.input);

      if (couponCase.expected.formInvalid) {
        await couponPage.expectFormInvalid();
        return;
      }

      if (testCase.id === 'TC-FR17-07') {
        await couponPage.submitCoupon();
        await couponPage.expectCouponVisible(couponCase.input.code.toUpperCase());
        const duplicateDialog = page.waitForEvent('dialog');
        await couponPage.fillCoupon(couponCase.input);
        await couponPage.submitCoupon();
        const alert = await duplicateDialog;
        expect(alert.type()).toBe('alert');
        expect(alert.message()).toContain('Lỗi');
        await alert.dismiss();
        await couponPage.deleteCoupon(couponCase.input.code.toUpperCase());
        return;
      }

      await couponPage.submitCoupon();
      const normalizedCode = couponCase.input.code.toUpperCase();
      await couponPage.expectCouponVisible(normalizedCode);
      if (couponCase.expected.displayType) {
        await expect(
          page.getByRole('row').filter({ hasText: normalizedCode }),
        ).toContainText(couponCase.expected.displayType);
      }
      await couponPage.deleteCoupon(normalizedCode);
    });
  }
});
