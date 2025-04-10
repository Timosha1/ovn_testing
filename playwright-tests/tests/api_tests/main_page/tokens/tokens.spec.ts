// import { test, expect } from '@playwright/test';
// import { APIRequestContext } from 'playwright';
// import {
//   apiUrlArbi,
//   apiUrlBase,
//   tokensArbi,
//   tokensBase,
//   apiUrlTokensOvn,
//   TestCases
// } from './test_cases';
// import { TokenInfo, TokensResponse } from './types';
// import * as allure from 'allure-js-commons';
//
// test.beforeEach('Tokens API', async () => {
//   console.log(`Running ${test.info().title}`);
// });
//
// test.describe('Arbitrum Tokens api check', () => {
//   async function getTokenData(request: APIRequestContext, tokenAddress: string) {
//     const response = await request.get(apiUrlArbi);
//     expect(response.status(), 'Response status should be 200').toBe(200);
//     const tokensArbitrum = await response.json();
//     expect(tokensArbitrum, 'Tokens api should have property tokenMap').toHaveProperty('tokenMap');
//     expect(tokensArbitrum.tokenMap, 'Tokens api should have property tokenAddress').toHaveProperty(tokenAddress);
//     return tokensArbitrum.tokenMap[tokenAddress];
//   }
//
//   for (const token of tokensArbi) {
//     test(`Tokens api on Base status ${token.symbol}`, async ({ request }) => {
//       await allure.suite("Tokens API");
//
//       const tokenData = await getTokenData(request, token.address);
//       expect(tokenData.symbol, `Token symbol should be ${token.symbol}`).toBe(token.symbol);
//       expect(tokenData.name, `Token name should be ${token.name}`).toBe(token.name);
//       if (token.chainId) {
//         expect(tokenData.chainId, `Chain ID should be ${token.chainId}`).toBe(token.chainId);
//       }
//       expect(tokenData.score, `Token score should be more than or equal to ${token.score}`).toBeGreaterThanOrEqual(token.score);
//       expect(tokenData.image_url, `Image url should be ${token.image_url}`).toBe(token.image_url);
//     });
//   }
// });
//
// test.describe('Base Tokens api check', () => {
//   async function getTokenData(request: APIRequestContext, tokenAddress: string) {
//     const response = await request.get(apiUrlBase);
//     expect(response.status(), 'Response status should be 200').toBe(200);
//     const tokensBase = await response.json();
//     expect(tokensBase, 'Tokens api should have property tokenMap').toHaveProperty('tokenMap');
//     expect(tokensBase.tokenMap, 'Tokens api should have property tokenAddress').toHaveProperty(tokenAddress);
//     return tokensBase.tokenMap[tokenAddress];
//   }
//
//   for (const token of tokensBase) {
//     test(`Tokens Base status ${token.symbol}`, async ({ request }) => {
//       await allure.suite("Tokens API");
//
//       const tokenData = await getTokenData(request, token.address);
//       expect(tokenData.symbol, `Token symbol should be ${token.symbol}`).toBe(token.symbol);
//       expect(tokenData.name, `Token name should be ${token.name}`).toBe(token.name);
//       if (token.chainId) {
//         expect(tokenData.chainId, `Chain ID should be ${token.chainId}`).toBe(token.chainId);
//       }
//       expect(tokenData.score, `Token score should be more than or equal to ${token.score}`).toBeGreaterThanOrEqual(token.score);
//       expect(tokenData.image_url, `Image url should be ${token.image_url}`).toBe(token.image_url);
//     });
//   }
// });
//
// test.describe('All Overnight tokens check', () => {
//   TestCases.forEach(({ chainId, address, name }) => {
//     test(`Check token ${name} ${chainId}`, async ({ request }) => {
//       await allure.suite("Tokens API");
//       const response = await request.get(apiUrlTokensOvn);
//       expect(response.status(), 'Response status should be 200').toBe(200);
//
//       const body: TokensResponse = await response.json();
//       expect(body, 'Response body should be defined').toBeDefined();
//       expect(body.chainTokenMap, 'Response body should have property chainTokenMap').toBeDefined();
//
//       const chainInfo = body.chainTokenMap[chainId];
//       expect(chainInfo, `Chain info for chainId ${chainId} should be defined`).toBeDefined();
//       expect(chainInfo.tokenMap, `Chain info for chainId ${chainId} should have property tokenMap`).toBeDefined();
//
//       const token: TokenInfo | undefined = chainInfo.tokenMap[address];
//       expect(token, `Token with address ${address} should be defined`).toBeDefined();
//
//       expect(token?.address.toLowerCase(), `Token address should be ${address.toLowerCase()}`).toBe(address.toLowerCase());
//       expect(token?.name, `Token name should be ${name}`).toBe(name);
//     });
//   });
// });