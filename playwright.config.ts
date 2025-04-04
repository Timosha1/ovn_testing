import { defineConfig, devices } from '@playwright/test';

const env = process.env.TEST_ENV || 'dev';

const environments = {
  dev: {
    baseURL: 'https://dev.app.overnight.fi',
  },
  prod: {
    baseURL: 'https://app.overnight.fi',
  },
};

export default defineConfig({
  testDir: './playwright-tests/tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
  ],
  use: {
    ...environments[env as keyof typeof environments],
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
}); 