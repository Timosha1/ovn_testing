// Playwright tests for verifying pool Pools API responses.
// It defines test cases in the poolTestCases array,
// each specifying search parameters and expected pool details.
// Using forEach, it dynamically generates individual tests for each case


import {
  test,
  expect
} from '@playwright/test';
import {
  Pool,
  PoolsResponse
} from '../types/pools';
const baseUrl = 'https://aggregator.overnight.fi/pools/v2';


test('Проверка общего API запроса Pools на странице пулов', async ({
                                                                     page
                                                                   }) => {
  await page.goto('https://app.overnight.fi/pools');
  const apiUrl = '/pools/v2';
  const apiResponse = await page.waitForResponse(response => response.url().includes(apiUrl));
  expect(apiResponse.status()).toBe(200);
  const responseBody = await apiResponse.json();
  expect(Object.keys(responseBody).length).toBeGreaterThan(0);
});

interface PoolTestCase {
  search: string;
  chainId: string;
  platform: string;
  expectedPoolName: string;
  expectedToken0Symbol: string;
  expectedToken1Symbol: string;
}

const poolTestCases: PoolTestCase[] = [{
  search: 'USDC/USD+',
  chainId: '8453',
  platform: 'Aerodrome',
  expectedPoolName: 'USDC/USD+',
  expectedToken0Symbol: 'USDC',
  expectedToken1Symbol: 'USD+',
},
  {
    search: 'WETH/USD+',
    chainId: '8453',
    platform: 'Aerodrome',
    expectedPoolName: 'WETH/USD+',
    expectedToken0Symbol: 'WETH',
    expectedToken1Symbol: 'USD+',
  },
  {
    search: 'USDC/USD+',
    chainId: '8453',
    platform: 'Pancake',
    expectedPoolName: 'USDC/USD+',
    expectedToken0Symbol: 'USDC',
    expectedToken1Symbol: 'USD+',
  },
  {
    search: 'WETH/XUSD',
    chainId: '42161',
    platform: 'Uniswap',
    expectedPoolName: 'WETH/XUSD',
    expectedToken0Symbol: 'WETH',
    expectedToken1Symbol: 'XUSD',
  },
  {
    search: 'BSC-USD/WBNB',
    chainId: '56',
    platform: 'Pancake',
    expectedPoolName: 'BSC-USD/WBNB',
    expectedToken0Symbol: 'BSC-USD',
    expectedToken1Symbol: 'WBNB',
  },
  {
    search: 'WETH/AERO',
    chainId: '8453',
    platform: 'Aerodrome',
    expectedPoolName: 'WETH/AERO',
    expectedToken0Symbol: 'WETH',
    expectedToken1Symbol: 'AERO',
  },
  {
    search: 'WETH/USDC',
    chainId: '8453',
    platform: 'Pancake',
    expectedPoolName: 'WETH/USDC',
    expectedToken0Symbol: 'WETH',
    expectedToken1Symbol: 'USDC',
  },
  {
    search: 'WETH/USDC',
    chainId: '42161',
    platform: 'Pancake',
    expectedPoolName: 'WETH/USDC',
    expectedToken0Symbol: 'WETH',
    expectedToken1Symbol: 'USDC',
  }
];

test.describe('Проверка API пулов для разных пар', () => {
  poolTestCases.forEach(async ({
                                 search,
                                 chainId,
                                 platform,
                                 expectedPoolName,
                                 expectedToken0Symbol,
                                 expectedToken1Symbol
                               }) => {
    test(`Пул ${expectedPoolName} есть в ответе API ${platform}`, async ({
                                                                           request
                                                                         }) => {
      const queryParams = {
        search,
        chainId,
        minTvl: '0',
        platform,
        page: '1',
        limit: '30',
        sortByTvl: 'desc',
        score_gt: '20',
      };

      const response = await request.get(baseUrl, {
        params: queryParams,
      });

      expect(response.status()).toBe(200);

      const body: PoolsResponse = await response.json();

      expect(body).toBeDefined();
      expect(Array.isArray(body.pools)).toBe(true);
      expect(body.pools.length).toBeGreaterThan(0);

      const pool = body.pools.find((pool: Pool) => {
        return pool.name?.includes(expectedPoolName) || (pool.token0.symbol === expectedToken0Symbol && pool.token1.symbol === expectedToken1Symbol);
      });

      expect(pool).toBeDefined();
    });
  });
});