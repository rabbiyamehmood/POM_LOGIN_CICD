import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages-ts/LoginPage';
import loginData from '../test-data/loginData.json';

type LoginRow = {
  name: string;
  userId: string;
  password: string;
  shouldPass: boolean;
};

for (const data of loginData as LoginRow[]) {
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

