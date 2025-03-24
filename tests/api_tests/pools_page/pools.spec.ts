// Playwright tests for verifying pool Pools API responses.
// It defines test cases in the poolTestCases array,
// each specifying search parameters and expected pool details.
// Using forEach, it dynamically generates individual tests for each case

import {test, expect} from '@playwright/test';
import { Pool, PoolsResponse } from './types';
import { poolTestCases, baseUrl} from './test_cases.ts';

test.describe('Проверка API пулов', () => {
  for (const{
    search,
    chainId,
    platform,
    expectedPoolName,
    expectedPoolAddress,
  } of poolTestCases){

    test(`Test ${expectedPoolName} ${platform} in the API response (Chain ID: ${chainId})`, async ({
                                                                                                     request
                                                                                                   }) => {
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
      expect(body, 'Ответ API должен быть объектом').toBeDefined();
      expect(Array.isArray(body.pools), 'body.pools должен быть массивом').toBe(true);
      expect(body.pools.length, 'В ответе должен быть хотя бы один пул').toBeGreaterThan(0)
      //console.log(body.pools)

      const pool: Pool | undefined = body.pools.find((pool: Pool) => {
        return pool.poolAddress === expectedPoolAddress;
      });

      expect(pool, `Пул ${expectedPoolAddress} не найден в ответе API`).toBeDefined();
      expect(pool?.poolAddress).toBe(expectedPoolAddress);
    });
  }
});