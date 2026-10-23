import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCards = page.locator('main .grid > .bg-white');
    }

    productCard(name: string): Locator {
        return this.productCards.filter({ hasText: name });
    }

    async goto(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }

    async addProductToCart(name: string): Promise<void> {
        await this.productCard(name).getByRole('button', { name: 'Thêm vào giỏ' }).click();
    }

    async openProductDetails(name: string): Promise<void> {
        await this.productCard(name).getByRole('link', { name: 'Xem chi tiết' }).click();
    }

    async openCart(): Promise<void> {
        await this.page.getByRole('link', { name: /Giỏ hàng/ }).click();
    }
}
