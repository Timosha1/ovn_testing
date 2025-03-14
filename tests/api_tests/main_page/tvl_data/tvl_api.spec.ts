import { test, expect, APIRequestContext } from '@playwright/test';

const apiUrl = 'https://backend.overnight.fi/stat/tvl-data';

interface Value {
  name: string;
  value: number;
}

interface Chain {
  chainName: string;
  values: Value[];
}

const expectedValues: Chain[] = [
  {
    chainName: 'arbitrum',
    values: [
      { name: 'xUSD', value: 2306867.820887 },
      { name: 'DAI+', value: 8874.207446270242 },
      { name: 'ETH+', value: 2.0904261398051234 },
      { name: 'USDT+', value: 721301.153282 },
    ],
  },
  {
    chainName: 'base',
    values: [
      { name: 'USD+', value: 8955619.076011 },
      { name: 'DAI+', value: 20174.015077003485 },
      { name: 'USDC+', value: 121711.783733 },
      { name: 'OVN+', value: 331389.13628412556 },
    ],
  },
  {
    chainName: 'blast',
    values: [
      { name: 'USD+', value: 9401819.685859567 },
      { name: 'USDC+', value: 826.1509537965514 },
    ],
  },
  {
    chainName: 'optimism',
    values: [
      { name: 'USD+', value: 89971.408788 },
      { name: 'DAI+', value: 4084.9125016824387 },
    ],
  },
  {
    chainName: 'sonic',
    values: [{ name: 'USD+', value: 9.937924 }],
  },
];

test('Tvl data API request sent from main page', async ({ page }) => {
  await page.goto('https://app.overnight.fi');
  const apiResponse = await page.waitForResponse(response => response.url().includes(apiUrl));
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