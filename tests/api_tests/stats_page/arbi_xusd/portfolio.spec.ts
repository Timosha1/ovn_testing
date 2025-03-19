import { test, expect } from "@playwright/test";

const portfolioApi =  "https://backend.overnight.fi/strategy/arbitrum/xusd/portfolio";
const totalSupplyApi =  "https://backend.overnight.fi/stat/arbitrum/XUSD/total-supply";
const acceptableInaccuracy = 100000;

interface Strategies {
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

test("Portfolio api status", async ({ request }) => {
  const responsePortfolio = await request.get(portfolioApi);
  expect(responsePortfolio.status()).toBe(200);
  const strategies: Strategies[] = await responsePortfolio.json();
  expect(strategies.length).toBeGreaterThan(0);
});

test("Sum of strategies balance", async ({ request }) => {
  const responsePortfolio = await request.get(portfolioApi);
  const responseSupply = await request.get(totalSupplyApi);
  const responsePortfolioBody = await responsePortfolio.json();
  const responseSupplyBody = await responseSupply.json();
  const strategiesSum: number = responsePortfolioBody.reduce(
    (sum: number, item: Strategies) => sum + parseFloat(item.netAssetValue),
    0
  );
  const difference = Math.abs(strategiesSum - responseSupplyBody);
  expect(difference).toBeLessThanOrEqual(acceptableInaccuracy);
});
