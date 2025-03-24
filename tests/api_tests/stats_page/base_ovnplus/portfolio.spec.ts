import { test, expect } from "@playwright/test";
import { Strategies } from '../types';
import {
  portfolioApiOvnplus,
  totalSupplyApiOvnplus,
  acceptableInaccuracy
} from '../test_var'

test("Portfolio api status and array length", async ({ request }) => {
  const responsePortfolio = await request.get(portfolioApiOvnplus);
  expect(responsePortfolio.status()).toBe(200);
  const strategies: Strategies[] = await responsePortfolio.json();
  expect(strategies.length).toBeGreaterThan(0);
});

test("Sum of strategies balance", async ({ request }) => {
  const responsePortfolio = await request.get(portfolioApiOvnplus);
  const responseSupply = await request.get(totalSupplyApiOvnplus);
  const responsePortfolioBody = await responsePortfolio.json();
  const responseSupplyBody = await responseSupply.json();
  const strategiesSum: number = responsePortfolioBody.reduce(
    (sum: number, item: Strategies) => sum + parseFloat(item.netAssetValue),
    0
  );
  const difference = Math.abs(strategiesSum - responseSupplyBody);
  expect(difference).toBeLessThanOrEqual(acceptableInaccuracy);
});
