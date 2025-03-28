import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-tests/tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['./playwright-tests/global-teardown.ts']
  ],
  use: {
    baseURL: 'https://app.overnight.fi',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
}); 