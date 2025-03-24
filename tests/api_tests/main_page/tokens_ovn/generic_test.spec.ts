import { expect, test } from '@playwright/test';
import {apiUrl} from "./test_cases.ts"

test('OVN Tokens API request sent from main page', async ({page}) => {
  page.on('request', request => {
    if (request.url().includes(apiUrl)) {
      console.log(`>> OVN Tokens Request: ${request.method()} ${request.url()}`);
    }
  });

  page.on('response', response => {
    if (response.url().includes(apiUrl)) {
      console.log(`<< OVN Tokens Response: ${response.status()} ${response.url()}`);
    }
  });

  await page.goto('https://app.overnight.fi');
  const apiResponse = await page.waitForResponse(
    response => response.url() === apiUrl && response.request().method() === 'GET'
  );
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.json();
  expect(Object.keys(responseBody).length).toBeGreaterThan(0);
});