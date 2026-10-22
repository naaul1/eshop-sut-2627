import { Page, Locator } from '@playwright/test';

export class LoginPage {

    page: Page;
    emailInput: Locator
    passwordInput: Locator
    submitButton: Locator
    errorMessage: Locator

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.locator('form input').nth(0);
        this.passwordInput = page.locator('form input').nth(1);
        this.submitButton = page.locator('form button[type="submit"]');
        this.errorMessage = page.getByText(/Đăng nhập thất bại./);
    }
    
    async goto() { await this.page.goto('/login', { waitUntil: 'domcontentloaded' }); }
    
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}