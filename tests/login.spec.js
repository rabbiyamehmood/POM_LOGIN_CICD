// tests/login.spec.js
// Login test using the LoginPage POM

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('valid login redirects away from login page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('TapsysMaker', 'Hammad@123'); // TODO: move creds to env vars later

  // Basic assertion: we are no longer on the login URL
  await expect(page).not.toHaveURL(/\/user\/login$/);
});

test('invalid login shows error toast', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('TapsysChecker', 'WrongPassword123');

  // Assert the "Invalid username or password" error is visible (top-right toast)
  await expect(loginPage.invalidCredsError).toBeVisible();
  await expect(page).toHaveURL(/\/user\/login$/);
});

