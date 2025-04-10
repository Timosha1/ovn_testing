// import { APIRequestContext, expect, test } from '@playwright/test';
// import { apiUrlTokens, apiUrlTokensOvn } from './main_page/tokens/test_cases';
//
// const apiUrlTvlData = 'https://backend.overnight.fi/stat/tvl-data';
//
// test('Tokens OVN GET request sent from the main page', async ({page}) => {
//   page.on('request', request => {
//     if (request.url().includes(apiUrlTokensOvn)) {
//       console.log(`>> OVN Tokens Request: ${request.method()} ${request.url()}`);
//     }
//   });
//
//   page.on('response', response => {
//     if (response.url().includes(apiUrlTokensOvn)) {
//       console.log(`<< OVN Tokens Response: ${response.status()} ${response.url()}`);
//     }
//   });
//
//   await page.goto('https://app.overnight.fi');
//   const apiResponse = await page.waitForResponse(
//     response => response.url() === apiUrlTokensOvn && response.request().method() === 'GET'
//   );
//   expect(apiResponse.status()).toBe(200);
//   const responseBody = await apiResponse.json();
//   expect(Object.keys(responseBody).length).toBeGreaterThan(0);
// });
//
// test('Tokens POST request sent from the main page', async ({page}) => {
//   page.on('request', request => {
//     if (request.url().includes(apiUrlTokens)) {
//       console.log(`>> OVN Tokens Request: ${request.method()} ${request.url()}`);
//     }
//   });
//
//   page.on('response', response => {
//     if (response.url().includes(apiUrlTokens)) {
//       console.log(`<< OVN Tokens Response: ${response.status()} ${response.url()}`);
//     }
//   });
//   await page.goto('https://app.overnight.fi');
//   const apiResponse = await page.waitForResponse(
//     response => response.url() === apiUrlTokens && response.request().method() === 'POST'
//   );
//   expect(apiResponse.status()).toBe(201);
//   const responseBody = await apiResponse.json();
//   expect(Object.keys(responseBody).length).toBeGreaterThan(0);
// });
//
// // flaky test
// test.skip('Tvl data API request sent from main page', async ({ page }) => {
//
//   page.on('request', request => {
//     if (request.url().includes(apiUrlTvlData)) {
//       console.log(`>> Tvl data Request: ${request.method()} ${request.url()}`);
//     }
//   });
//   page.on('response', response => {
//     if (response.url().includes(apiUrlTvlData)) {
//       console.log(`<< Tvl data Response: ${response.status()} ${response.url()}`);
//     }
//   });
//
//   await page.goto('https://app.overnight.fi');
//   //await page.waitForLoadState('networkidle');
//
//   const apiResponse = await page.waitForResponse(
//     response => response.url() === apiUrlTvlData && response.request().method() === 'GET'
//   );
//   expect(apiResponse.status()).toBe(200);
//   const responseBody = await apiResponse.json();
//   expect(Array.isArray(responseBody)).toBe(true);
// });
//
// test('Pools API request sent from dapp pools page', async ({page}) => {
//   await page.goto('https://app.overnight.fi/pools');
//   const apiUrl = '/pools/v2';
//   let apiResponse;
//   try {
//     apiResponse = await page.waitForResponse(response => response.url().includes(apiUrl), { timeout: 10000 });
//   } catch (error) {
//     throw new Error(`Failed to wait for a response from the API with a URL containing “${apiUrl}” within the given time.`);
//   }
//   expect(apiResponse.status(), 'Response status should be 200').toBe(200);
//   const responseBody: APIRequestContext = await apiResponse.json();
//   expect(Object.keys(responseBody).length, ' Pools response body should not be empty').toBeGreaterThan(0);
// });