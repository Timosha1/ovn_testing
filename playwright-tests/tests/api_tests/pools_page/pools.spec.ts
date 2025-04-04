import { test, expect, APIRequestContext } from '@playwright/test';
import { Pool, PoolsResponse } from './types';
import { poolTestCases, baseUrl} from './test_cases';

test.beforeEach('Payouts API', async () => {
  console.log(`Running ${test.info().title}`);
});

test('Generic Pools API request sent from pools page', async ({page}) => {
  await page.goto('https://app.overnight.fi/pools');
  const apiUrl = '/pools/v2';
  const apiResponse = await page.waitForResponse(response => response.url().includes(apiUrl));
  expect(apiResponse.status()).toBe(200);
  const responseBody: APIRequestContext = await apiResponse.json();
  expect(Object.keys(responseBody).length).toBeGreaterThan(0);
});

test.describe('API Pools Check', () => {
  for (const{
    search,
    chainId,
    platform,
    expectedPoolName,
    expectedPoolAddress,
  } of poolTestCases){

    test(`Test ${expectedPoolName} ${platform} in the API response (Chain ID: ${chainId})`, async ({request}) => {
      const queryParams = {
        search,
        chainId,
        platform,
        poolAddress: expectedPoolAddress,
      };

      const response = await request.get(baseUrl, {
        params: queryParams,
      });

      expect(response.status()).toBe(200);

      const body: PoolsResponse = await response.json();
      expect(body, 'The API response should be an object').toBeDefined();
      expect(Array.isArray(body.pools), 'body.pools should be an array').toBe(true);
      expect(body.pools.length, 'The response should contain at least one pool').toBeGreaterThan(0)
      //console.log(body.pools)

      const pool: Pool | undefined = body.pools.find((pool: Pool) => {
        return pool.poolAddress === expectedPoolAddress;
      });

      expect(pool, `Pool ${expectedPoolAddress} not found in the API response`).toBeDefined();
      expect(pool?.poolAddress).toBe(expectedPoolAddress);
    });
  }
});