// Playwright tests for verifying pool Pools API responses.
// It defines test cases in the poolTestCases array,
// each specifying search parameters and expected pool details.
// Using forEach, it dynamically generates individual tests for each case

import {test, expect} from '@playwright/test';
import { Pool, PoolsResponse, PoolTestCase } from './types';
const baseUrl = 'https://aggregator.overnight.fi/pools/v2';

const poolTestCases: PoolTestCase[] = [{
  search: 'USDC/USD+',
  chainId: '8453',
  platform: 'Aerodrome',
  expectedPoolName: 'USDC/USD+',
  expectedPoolAddress: '0x0c1A09d5D0445047DA3Ab4994262b22404288A3B',
  },
  {
    search: 'WETH/USD+',
    chainId: '8453',
    platform: 'Aerodrome',
    expectedPoolName: 'WETH/USD+',
    expectedPoolAddress: '0x4D69971CCd4A636c403a3C1B00c85e99bB9B5606',
  },
  {
    search: 'USDC/USD+',
    chainId: '8453',
    platform: 'Pancake',
    expectedPoolName: 'USDC/USD+',
    expectedPoolAddress: '0x167c9F0AF189DDF58f4B43683404a45096c23b67',
  },
  {
    search: 'WETH/XUSD',
    chainId: '42161',
    platform: 'Uniswap',
    expectedPoolName: 'WETH/XUSD',
    expectedPoolAddress: '0x421803da50d3932caa36bd1731d36a0e2af93542',
  },
  {
    search: 'BSC-USD/WBNB',
    chainId: '56',
    platform: 'Pancake',
    expectedPoolName: 'BSC-USD/WBNB',
    expectedPoolAddress: '0x36696169C63e42cd08ce11f5deeBbCeBae652050',
  },
  {
    search: 'WETH/AERO',
    chainId: '8453',
    platform: 'Uniswap',
    expectedPoolName: 'WETH/AERO',
    expectedPoolAddress: '0x3d5d143381916280ff91407febeb52f2b60f33cf',
  },
  {
    search: 'WETH/USDC',
    chainId: '8453',
    platform: 'Pancake',
    expectedPoolName: 'WETH/USDC',
    expectedPoolAddress: '0x72AB388E2E2F6FaceF59E3C3FA2C4E29011c2D38',
  },
  {
    search: 'WETH/USDC',
    chainId: '42161',
    platform: 'Pancake',
    expectedPoolName: 'WETH/USDC',
    expectedPoolAddress: '0xd9e2a1a61B6E61b275cEc326465d417e52C1b95c',
  }
];

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
      console.log(body.pools)

      const pool: Pool | undefined = body.pools.find((pool: Pool) => {
        return pool.poolAddress === expectedPoolAddress;
      });

      expect(pool, `Пул ${expectedPoolAddress} не найден в ответе API`).toBeDefined();
      expect(pool?.poolAddress).toBe(expectedPoolAddress);
    });
  }
});