import { test, expect, APIRequestContext } from '@playwright/test';
import { Pool, PoolsResponse } from './types';
import { poolTestCases, baseUrl} from './test_cases';

test.beforeEach('Pools API', async () => {
  console.log(`Running test ${test.info().title}`);
});

test.describe('Pools API Check', () => {
  for (const{
    search,
    chainId,
    platform,
    expectedPoolName,
    expectedPoolAddress,
  } of poolTestCases){
    test(`${expectedPoolName} ${platform} found in the API response (Chain ID: ${chainId})`, async ({request}) => {
      const queryParams = {
        search,
        chainId,
        platform,
        poolAddress: expectedPoolAddress,
      };

      const response = await request.get(baseUrl, {
        params: queryParams,
      });

      expect(response.status(),'Response status should be 200').toBe(200);
      const body: PoolsResponse = await response.json();
      expect(body, 'API response should be an object').toBeDefined();
      expect(Array.isArray(body.pools), 'body.pools should be an array').toBe(true);
      expect(body.pools.length, 'API response should contain that pool').toBeGreaterThan(0)

      const pool: Pool | undefined = body.pools.find((pool: Pool) => {
        return pool.poolAddress === expectedPoolAddress;
      });

      expect(pool, `Pool ${expectedPoolAddress} not found in the API response`).toBeDefined();
      expect(pool?.poolAddress).toBe(expectedPoolAddress);
    });
  }
  test('Pools API request sent from dapp pools page', async ({page}) => {
    await page.goto('https://app.overnight.fi/pools');
    const apiUrl = '/pools/v2';
    let apiResponse;
    try {
      apiResponse = await page.waitForResponse(response => response.url().includes(apiUrl), { timeout: 10000 });
    } catch (error) {
      throw new Error(`Failed to wait for a response from the API with a URL containing “${apiUrl}” within the given time.`);
    }
    expect(apiResponse.status(), 'Response status should be 200').toBe(200);
    const responseBody: APIRequestContext = await apiResponse.json();
    expect(Object.keys(responseBody).length, ' Pools response body should not be empty').toBeGreaterThan(0);
  });

});