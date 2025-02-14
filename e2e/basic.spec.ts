import { test, expect } from '@playwright/test';

test('landing page has title', async ({ page }) => {
  await page.goto('https://overnight.fi');
  await expect(page).toHaveTitle(/Overnight/);
});

test('main app page has Mint/redeem tab visible', async ({ page }) => {
  await page.goto('https://overnight.fi');
  await page.getByRole('button', { name: 'Launch Dapp' }).click();
  await expect(page.getByText('MINT/REDEEM')).toBeVisible();
});

//locator('.close-button')