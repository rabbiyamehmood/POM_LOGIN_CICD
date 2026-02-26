// pages/LoginPage.js
// Page Object Model for the login page

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.userIdInput = page.locator('input[name="userId"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'LOGIN' });
    this.invalidCredsError = page.getByText('Invalid username or password');
  }

  async goto() {
    await this.page.goto('/user/login');
  }

  async login(userId, password) {
    await this.userIdInput.fill(userId);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };

