import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app.overnight.fi/market/usd');
  await page.locator('.close-button').click();
  await page.locator('div').filter({ hasText: /^Base$/ }).click();
  await expect(page.getByText('Last payout')).toBeVisible();
  await page.getByText('USD+ TVL').first().click();
  await expect(page.locator('#app')).toContainText('USD+ TVL');
});