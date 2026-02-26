import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages-ts/LoginPage';

test('valid login redirects away from login page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('TapsysMaker', 'Hammad@123'); // TODO: move creds to env vars later

  await expect(page).not.toHaveURL(/\/user\/login$/);
});

test('invalid login shows error toast', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('TapsysChecker', 'WrongPassword123');

  await expect(loginPage.invalidCredsError).toBeVisible();
  await expect(page).toHaveURL(/\/user\/login$/);
});

