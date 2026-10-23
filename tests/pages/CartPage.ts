import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly rows: Locator;
    readonly emptyMessage: Locator;
    readonly emptyIllustration: Locator;
    readonly totalLabel: Locator;
    readonly continueShoppingLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.rows = page.locator('table tbody tr');
        this.emptyMessage = page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống' });
        this.emptyIllustration = page.locator('main img, main svg');
        this.totalLabel = page.getByText('Tổng cộng', { exact: false });
        this.continueShoppingLink = page.getByRole('link', {
            name: 'Tiếp tục mua sắm',
            exact: true,
        });
    }

    row(productName: string): Locator {
        return this.rows.filter({ hasText: productName });
    }

    async goto(): Promise<void> {
        await this.page.goto('/cart', { waitUntil: 'domcontentloaded' });
    }

    async removeProduct(productName: string): Promise<void> {
        await this.row(productName).getByRole('button', { name: /Xóa/ }).click();
    }

    async openCartFromHeader(): Promise<void> {
        await this.page.getByRole('link', { name: /Giỏ hàng/ }).click();
    }
}
