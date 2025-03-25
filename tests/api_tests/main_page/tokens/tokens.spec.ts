import { test, expect } from '@playwright/test';
import { APIRequestContext } from 'playwright';
import {
  apiUrlTokens,
  apiUrlArbi,
  apiUrlBase,
  tokensArbi,
  tokensBase,
  apiUrlTokensOvn,
  TestCases
} from './test_cases.ts';
import { TokenInfo, TokensResponse } from './types';

test.beforeEach('Tokens API', async () => {
  console.log(`Running ${test.info().title}`);
});

test('Tokens OVN GET request sent from the main page', async ({page}) => {
  page.on('request', request => {
    if (request.url().includes(apiUrlTokensOvn)) {
      console.log(`>> OVN Tokens Request: ${request.method()} ${request.url()}`);
    }
  });

  page.on('response', response => {
    if (response.url().includes(apiUrlTokensOvn)) {
      console.log(`<< OVN Tokens Response: ${response.status()} ${response.url()}`);
    }
  });

  await page.goto('https://app.overnight.fi');
  const apiResponse = await page.waitForResponse(
    response => response.url() === apiUrlTokensOvn && response.request().method() === 'GET'
  );
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.json();
  expect(Object.keys(responseBody).length).toBeGreaterThan(0);
});

test('Tokens POST request sent from the main page', async ({page}) => {
  page.on('request', request => {
    if (request.url().includes(apiUrlTokens)) {
      console.log(`>> OVN Tokens Request: ${request.method()} ${request.url()}`);
    }
  });

  page.on('response', response => {
    if (response.url().includes(apiUrlTokens)) {
      console.log(`<< OVN Tokens Response: ${response.status()} ${response.url()}`);
    }
  });
  await page.goto('https://app.overnight.fi');
  const apiResponse = await page.waitForResponse(
    response => response.url() === apiUrlTokens && response.request().method() === 'POST'
  );
  expect(apiResponse.status()).toBe(201);
  const responseBody = await apiResponse.json();
  expect(Object.keys(responseBody).length).toBeGreaterThan(0);
});

test.describe('Tokens Arbitrum status', () => {
  async function getTokenData(request: APIRequestContext, tokenAddress: string) {
    const response = await request.get(apiUrlArbi);
    expect(response.status()).toBe(200);
    const tokensArbitrum = await response.json();
    expect(tokensArbitrum).toHaveProperty('tokenMap');
    expect(tokensArbitrum.tokenMap).toHaveProperty(tokenAddress);
    return tokensArbitrum.tokenMap[tokenAddress];
  }

  for (const token of tokensArbi) {
    test(`Tokens Base status ${token.symbol}`, async ({ request }) => {
      const tokenData = await getTokenData(request, token.address);
      expect(tokenData.symbol).toBe(token.symbol);
      expect(tokenData.name).toBe(token.name);
      if (token.chainId) {
        expect(tokenData.chainId).toBe(token.chainId);
      }
      expect(tokenData.score).toBeGreaterThanOrEqual(token.score);
      expect(tokenData.image_url).toBe(token.image_url);
    });
  }
});

test.describe('Tokens Base status', () => {
  async function getTokenData(request: APIRequestContext, tokenAddress: string) {
    const response = await request.get(apiUrlBase);
    expect(response.status()).toBe(200);
    const tokensBase = await response.json();
    expect(tokensBase).toHaveProperty('tokenMap');
    expect(tokensBase.tokenMap).toHaveProperty(tokenAddress);
    return tokensBase.tokenMap[tokenAddress];
  }

  for (const token of tokensBase) {
    test(`Tokens Base status ${token.symbol}`, async ({ request }) => {
      const tokenData = await getTokenData(request, token.address);
      expect(tokenData.symbol).toBe(token.symbol);
      expect(tokenData.name).toBe(token.name);
      if (token.chainId) {
        expect(tokenData.chainId).toBe(token.chainId);
      }
      expect(tokenData.score).toBeGreaterThanOrEqual(token.score);
      expect(tokenData.image_url).toBe(token.image_url);
    });
  }
});

test.describe('Tokens Ovn status', () => {
  TestCases.forEach(({ chainId, address, name }) => {
    test(`Check token ${name} ${chainId}`, async ({ request }) => {
      const response = await request.get(apiUrlTokensOvn);
      expect(response.status()).toBe(200);

      const body: TokensResponse = await response.json();
      expect(body).toBeDefined();
      expect(body.chainTokenMap).toBeDefined();

      const chainInfo = body.chainTokenMap[chainId];
      expect(chainInfo).toBeDefined();
      expect(chainInfo.tokenMap).toBeDefined();

      const token: TokenInfo | undefined = chainInfo.tokenMap[address];
      expect(token).toBeDefined();

      expect(token?.address.toLowerCase()).toBe(address.toLowerCase());
      expect(token?.name).toBe(name);

      //console.log(`Токен ${name} найден на сети ${chainId}`);
    });
  });
});
