import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests-ts',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://newstagingbackoffice.tapsys.net',
        headless: false,
      },
    },
  ],
  reporter: [
    ['html'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false,
    }],
  ],
  timeout: 30_000,
});

