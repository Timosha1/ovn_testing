import { test, expect, APIRequestContext } from '@playwright/test';
import { Chain } from './types';
import {expectedValues, apiUrl} from './expectedValues.ts';

// этот тест рандомно падал поэтому добавлены логи на время
test('Tvl data API request sent from main page', async ({ page }) => {

  page.on('request', request => {
    if (request.url().includes(apiUrl)) {
      console.log(`>> Request: ${request.method()} ${request.url()}`);
    }
  });

  page.on('response', response => {
    if (response.url().includes(apiUrl)) {
      console.log(`<< Response: ${response.status()} ${response.url()}`);
    }
  });

  await page.goto('https://app.overnight.fi');

  //await page.waitForLoadState('networkidle');

  const apiResponse = await page.waitForResponse(
    response => response.url() === apiUrl && response.request().method() === 'GET'
  );
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.json();
  expect(Array.isArray(responseBody)).toBe(true);
});

test.describe('Chain Values', () => {
  async function getChainValues(request: APIRequestContext): Promise<Chain[]> {
    const response = await request.get(apiUrl);
    expect(response.status()).toBe(200);
    return response.json();
  }

  test('Check response structure', async ({ request }) => {
    const chainValues = await getChainValues(request);
    expect(Array.isArray(chainValues)).toBe(true);
    chainValues.forEach((chain) => {
      expect(chain).toHaveProperty('chainName');
      expect(chain).toHaveProperty('values');
      expect(Array.isArray(chain.values)).toBe(true);
      chain.values.forEach((value) => {
        expect(value).toHaveProperty('name');
        expect(value).toHaveProperty('value');
        expect(typeof value.value).toBe('number');
      });
    });
  });

  expectedValues.forEach((expectedChain) => {
    test(`Check values for ${expectedChain.chainName}`, async ({ request }) => {
      const chainValues = await getChainValues(request);
      const chain = chainValues.find((c) => c.chainName === expectedChain.chainName);

      if (chain) {
        expectedChain.values.forEach((expectedValue) => {
          const value = chain.values.find((v) => v.name === expectedValue.name);

          if(value){
            expect(value.value).toBeGreaterThan(0);
          } else {
            expect(value).toBeDefined();
          }

        });
      } else {
        expect(chain).toBeDefined();
      }
    });
  });
});