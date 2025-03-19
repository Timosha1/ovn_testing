import { expect, test } from '@playwright/test';
const apiUrl = "https://aggregator.overnight.fi/tokens/ovn"


test('Generic OVN Tokens API request sent from main page', async ({
                                                                    page
                                                                  }) => {
  await page.goto('https://app.overnight.fi');
  const apiResponse = await page.waitForResponse(response => response.url().includes(apiUrl));
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.json();
  expect(Object.keys(responseBody).length).toBeGreaterThan(0);
});