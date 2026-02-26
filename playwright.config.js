const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  // Run only in Chromium (headed)
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://newstagingbackoffice.tapsys.net',
        headless: process.env.CI === 'true', // headed locally, headless in GitHub Actions
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
