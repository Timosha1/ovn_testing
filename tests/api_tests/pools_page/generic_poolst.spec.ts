import {test, expect} from '@playwright/test';

test('Generic Pools API request sent from pools page', async ({
                                                                page
                                                              }) => {
  await page.goto('https://app.overnight.fi/pools');
  const apiUrl = '/pools/v2';
  const apiResponse = await page.waitForResponse(response => response.url().includes(apiUrl));
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.json();
  expect(Object.keys(responseBody).length).toBeGreaterThan(0);
});
