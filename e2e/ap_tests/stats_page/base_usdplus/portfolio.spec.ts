import { test, expect } from '@playwright/test';

// Threshold is Acceptable difference between Total supply responses and the sum of balances of all strategies
const threshold = 1000
const portfolioApi = 'https://backend.overnight.fi/strategy/base/usd+/portfolio';
const totalSupplyApi = 'https://backend.overnight.fi/stat/base/USD+/total-supply'

interface strategies {
  address: string;
  explorerAddress: string;
  collateralToken: string;
  name: string;
  weight: string;
  netAssetValue: string;
  liquidationValue: string;
  riskFactor: string;
  block: number;
  timestamp: number;
}

test('Portfolio api status and array length', async ({ request }) => {
  const responsePortfolio = await request.get(portfolioApi);
  expect(responsePortfolio.status()).toBe(200);
  const strategies: strategies [] = await responsePortfolio.json();
  expect(strategies.length).toBeGreaterThan(0);
});

test('Sum of strategies balance', async ({ request }) => {
  const responsePortfolio = await request.get(portfolioApi);
  const responseSupply = await request.get(totalSupplyApi);
  const responsePortfolioBody = await responsePortfolio.json();
  const responseSupplyBody = await responseSupply.json();

  const strategiesSum: number = responsePortfolioBody.reduce(
    (sum: number, item: strategies) => sum + parseFloat(item.netAssetValue),
    0
  );
  console.log(strategiesSum);

  const difference = Math.abs(strategiesSum - responseSupplyBody);
  expect(difference).toBeLessThanOrEqual(threshold);
  console.log(difference);
})
