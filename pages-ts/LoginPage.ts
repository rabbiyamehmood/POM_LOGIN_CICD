import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userIdInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredsError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userIdInput = page.locator('input[name="userId"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'LOGIN' });
    this.invalidCredsError = page.getByText('Invalid username or password');
  }

  async goto() {
    await this.page.goto('/user/login');
  }

  async login(userId: string, password: string) {
    await this.userIdInput.fill(userId);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

