import {
  test,
  expect
} from "@playwright/test";
import {
  Strategies
} from './types';
import {
  configPortfolio,
  acceptableInaccuracy
} from './test_configs.ts';
import {
  fetchAndValidateResponse
} from './../../test_functions/stats/fetchAndValidateResponse.ts';
import {
  fetchAndValidateSupply
} from './../../test_functions/stats/fetchAndValidateSupply.ts';

test.beforeEach('Portfolio API', async () => {
  console.log(`Running ${test.info().title}`);
});

test.describe("USD+ Base portfolio API tests", () => {
  let strategies: Strategies[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    strategies = await fetchAndValidateResponse(request, configPortfolio.portfolioUsdplus);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyUsdplus);
  });

  test("Portfolio length", async () => {
    expect(strategies.length).toBeGreaterThan(0);
  });

  test("Sum of strategies balance", async () => {
    const strategiesSum: number = strategies.reduce(
      (sum: number, item: Strategies) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(strategiesSum - supply);
    expect(difference).toBeLessThanOrEqual(acceptableInaccuracy);
  });
});

test.describe("XUSD portfolio API tests", () => {
  let strategies: Strategies[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    strategies = await fetchAndValidateResponse(request, configPortfolio.portfolioXusd);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyXusd);
  });

  test("Portfolio length", async () => {
    expect(strategies.length).toBeGreaterThan(0);
  });

  test("Sum of strategies balance", async () => {
    const strategiesSum: number = strategies.reduce(
      (sum: number, item: Strategies) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(strategiesSum - supply);
    expect(difference).toBeLessThanOrEqual(acceptableInaccuracy);
  });
});

test.describe("OVN+ portfolio API tests", () => {
  let strategies: Strategies[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    strategies = await fetchAndValidateResponse(request, configPortfolio.portfolioOvnplus);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyOvnplus);
  });

  test("Portfolio length", async () => {
    expect(strategies.length).toBeGreaterThan(0);
  });

  test("Sum of strategies balance", async () => {
    const strategiesSum: number = strategies.reduce(
      (sum: number, item: Strategies) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(strategiesSum - supply);
    expect(difference).toBeLessThanOrEqual(acceptableInaccuracy);
  });
});


