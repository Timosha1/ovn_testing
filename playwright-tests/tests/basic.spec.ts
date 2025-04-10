import { test, expect } from '@playwright/test';
const mainPageUrl = "https://app.overnight.fi";
const landingPageUrl = "https://overnight.fi"

test.describe('Simple health Check', () => {

  test('Main dapp page status code should be 200', async ({ page }) => {
    const response = await page.goto(mainPageUrl);
    expect(response!.status(), 'Response status should be 200').toBe(200);
  });

  test('Landing page status code should be 200', async ({ page }) => {
    const response = await page.goto(landingPageUrl);
    expect(response!.status(), 'Response status should be 200').toBe(200);
  });

  test('Overnight dapp page has title', async ({ page }) => {
    await page.goto(mainPageUrl);
    await expect(page, 'Title "Overnight" should be visible on the Dapp page ').toHaveTitle(/Overnight/);
  });

  test('Overnight Landing page has title', async ({ page }) => {
    await page.goto(landingPageUrl);
    await expect(page, 'Title "Overnight" should be visible on the landing page ').toHaveTitle(/Overnight/);
  });

  test('There are no errors in the console on the main dapp page', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto(mainPageUrl);
    expect(errors, 'There should be no errors in the console').toEqual([]);
  });
});
