import { test, expect } from '@playwright/test';
import { APIRequestContext } from 'playwright';

const apiUrl = 'https://aggregator.overnight.fi/tokens/42161?search=&limit=100';


test.describe('Tokens Arbitrum status', () => {
  async function getTokenData(request: APIRequestContext, tokenAddress: string) {
    const response = await request.get(apiUrl);
    expect(response.status()).toBe(200);
    const tokensArbitrum = await response.json();
    expect(tokensArbitrum).toHaveProperty('tokenMap');
    expect(tokensArbitrum.tokenMap).toHaveProperty(tokenAddress);
    return tokensArbitrum.tokenMap[tokenAddress];
  }

  const tokens = [
    {
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      name: 'Native ETH',
      chainId: '42161',
      score: 50,
      image_url: 'https://assets.odos.xyz/tokens/ETH.webp',
    },
    {
      address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      symbol: 'weth',
      name: 'Arbitrum Bridged WETH (Arbitrum One)',
      score: 50,
      image_url: 'https://coin-images.coingecko.com/coins/images/39713/large/WETH.PNG?1723731496',
    },
    {
      address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
      symbol: 'usdc',
      name: 'USDC',
      score: 50,
      image_url: 'https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694',
    },
    {
      address: '0xe80772eaf6e2e18b651f160bc9158b2a5cafca65',
      symbol: 'xUSD',
      name: 'xUSD',
      score: 50,
      image_url: 'https://coin-images.coingecko.com/coins/images/39630/large/xUSD_logo_200p.png?1738661628',
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