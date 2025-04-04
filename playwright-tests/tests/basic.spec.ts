import { test, expect } from '@playwright/test';
const mainPageUrl = "https://app.overnight.fi";

test('Landing page has title', async ({ page }) => {
  await page.goto('https://overnight.fi');
  await expect(page).toHaveTitle(/Overnight/);
});

test('Main app page status 200', async ({ page }) => {
  const response = await page.goto(mainPageUrl);
  expect(response!.status()).toBe(200);
});

// broken test, fix needed
test.skip('main app page has Mint/redeem tab visible', async ({ page }) => {
  await page.goto(mainPageUrl);
  await page.getByRole('button', { name: 'Launch Dapp' }).click();
  await expect(page.getByText('MINT/REDEEM')).toBeVisible();
});

test('На странице нет ошибок в консоли', async ({ page }) => {
  const errors: string[] = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto(mainPageUrl);
  expect(errors).toEqual([]);
});