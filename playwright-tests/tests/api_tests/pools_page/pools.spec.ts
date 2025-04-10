import { test, expect, APIRequestContext } from '@playwright/test';
import { Pool, PoolsResponse } from './types';
import { poolTestCases, baseUrl} from './test_cases';
import * as allure from "allure-js-commons";


test.beforeEach('Log test name', async () => {
  console.log(`Running test ${test.info().title}`);
});

test.describe('Pools API', () => {
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

      expect(pool, `Pool ${expectedPoolAddress} should be found in the API response`).toBeDefined();
      expect(pool?.poolAddress, `poolAddress property of the found pool object is equal to the value of ${expectedPoolAddress}`).toBe(expectedPoolAddress);
    });
  }
});