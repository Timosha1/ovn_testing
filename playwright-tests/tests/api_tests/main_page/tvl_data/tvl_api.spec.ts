import { test, expect, APIRequestContext } from '@playwright/test';
import { Chain } from './types';
import {expectedValues, apiUrlTvlData } from './expectedValues';

let cachedChainValues: Chain[];

test.describe('TVL API', () => {
  test.beforeAll(async ({ request }) => {
    console.log('Fetching TVL data...');
    const response = await request.get(apiUrlTvlData);
    expect(response.status()).toBe(200);
    cachedChainValues = await response.json();
    console.log('TVL data fetched successfully.');
  });

  test.beforeEach('Log test name', async () => {
    console.log(`Running ${test.info().title}`);
  });

  test('Check TVL data response structure', async () => {
    expect(Array.isArray(cachedChainValues), 'cachedChainValues should be an array').toBe(true);

    for (const chain of cachedChainValues) {
      expect(chain, `Chain "${chain.chainName}" should have property 'chainName'`).toHaveProperty('chainName');
      expect(chain, `Chain "${chain.chainName}" should have property 'values'`).toHaveProperty('values');
      expect(Array.isArray(chain.values),`Chain "${chain.chainName}".values should be an array`).toBe(true);

      for (const value of chain.values) {
        expect(value, `Chain "${chain.chainName}", value "${value.name}" should have property 'name'`).toHaveProperty('name');
        expect(value, `Chain "${chain.chainName}", value "${value.name}" should have property 'value'`).toHaveProperty('value');
        expect(typeof value.value, `Chain "${chain.chainName}", value "${value.name}".value should be a number, but got ${typeof value.value}`).toBe('number');
      }
    }
  });

  test('Check values against expectedValues', async () => {
    expect(cachedChainValues, 'Data should have been fetched in beforeAll').toBeDefined();

    for (const expectedChain of expectedValues) {
      const actualChain = cachedChainValues.find((chain) => chain.chainName === expectedChain.chainName);
      expect(actualChain, `Chain with name "${expectedChain.chainName}" should be present`).toBeDefined();

      if (actualChain) {
        for (const expectedValue of expectedChain.values) {
          const actualValue = actualChain.values.find((value) => value.name === expectedValue.name);
          expect(actualValue, `Value "${expectedValue.name}" in chain "${expectedChain.chainName}" should be present`).toBeDefined();
          if (actualValue) {
            expect(actualValue.value, 'TVL value should be greater than 0').toBeGreaterThan(0);
          }
        }
      }
    }
  });
});