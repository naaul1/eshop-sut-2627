import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly itemLines: Locator;
    readonly totalInput: Locator;
    readonly summaryTotal: Locator;
    readonly confirmButton: Locator;
    readonly successHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        this.itemLines = page.locator('ul.list-disc li');
        this.totalInput = page.locator('input[type="number"]');
        this.summaryTotal = page.getByText('Tổng thanh toán:').last();
        this.confirmButton = page.getByRole('button', { name: 'Xác Nhận Thanh Toán' });
        this.successHeading = page.getByRole('heading', { name: 'Thanh toán thành công!' });
    }

    async goto(): Promise<void> {
        await this.page.goto('/checkout', { waitUntil: 'domcontentloaded' });
    }

    async confirm(): Promise<void> {
        await this.confirmButton.click();
    }
}
