// tests/login-dd-json.spec.js
// Data-driven login tests using JSON file

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const loginData = require('../test-data/loginData.json');

for (const data of loginData) {
  test(`login (JSON) – ${data.name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(data.userId, data.password);

    if (data.shouldPass) {
      await expect(page).not.toHaveURL(/\/user\/login$/);
    } else {
      await expect(loginPage.invalidCredsError).toBeVisible();
      await expect(page).toHaveURL(/\/user\/login$/);
    }
  });
}

