import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
    readonly page: Page;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.quantityInput = page.locator('input[type="number"]');
        this.addToCartButton = page.getByRole('button', { name: /Thêm vào giỏ hàng|Đã thêm/ });
    }

    async goto(productId: number): Promise<void> {
        await this.page.goto(`/product/${productId}`, { waitUntil: 'domcontentloaded' });
    }

    async setQuantity(quantity: number): Promise<void> {
        await this.quantityInput.fill(String(quantity));
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }
}
