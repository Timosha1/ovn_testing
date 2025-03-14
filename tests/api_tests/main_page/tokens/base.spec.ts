import { test, expect } from '@playwright/test';
import { APIRequestContext } from 'playwright';

const apiUrl = 'https://aggregator.overnight.fi/tokens/8453?search=&limit=100';

test.describe('Tokens Base status', () => {
  async function getTokenData(request: APIRequestContext, tokenAddress: string) {
    const response = await request.get(apiUrl);
    expect(response.status()).toBe(200);
    const tokensBase = await response.json();
    expect(tokensBase).toHaveProperty('tokenMap');
    expect(tokensBase.tokenMap).toHaveProperty(tokenAddress);
    return tokensBase.tokenMap[tokenAddress];
  }

  const tokens = [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      name: 'Native ETH',
      chainId: '8453',
      score: 50,
      image_url: 'https://assets.odos.xyz/tokens/ETH.webp',
    },
    {
      address: '0x4200000000000000000000000000000000000006',
      symbol: 'weth',
      name: 'L2 Standard Bridged WETH (Base)',
      score: 50,
      image_url: 'https://coin-images.coingecko.com/coins/images/39810/large/weth.png?1724139790',
    },
    {
      address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
      symbol: 'usdc',
      name: 'USDC',
      score: 50,
      image_url: 'https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694',
    },
    {
      address: '0xb79dd08ea68a908a97220c76d19a6aa9cbde4376',
      symbol: 'usd+',
      name: 'Overnight.fi USD+ (Base)',
      score: 50,
      image_url: 'https://coin-images.coingecko.com/coins/images/39624/large/USD_.png?1723179227',
    },
  ];

  for (const token of tokens) {
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