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
} from './test_configs';
import {
  fetchAndValidateResponse
} from './../../test_functions/stats/fetchAndValidateResponse';
import {
  fetchAndValidateSupply
} from './../../test_functions/stats/fetchAndValidateSupply';
import * as allure from 'allure-js-commons';

test.beforeEach('Log test name', async () => {
  await allure.suite("Portfolio API");
  console.log(`Running ${test.info().title}`);
});

test.describe("USD+ Base portfolio", () => {
  let strategies: Strategies[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    strategies = await fetchAndValidateResponse(request, configPortfolio.portfolioUsdplus);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyUsdplus);
  });

  test("USD+ Base Portfolio length", async () => {
    expect(strategies.length, 'Portfolio length should be greater than 0').toBeGreaterThan(0);
  });

  test("USD+ Base Sum of strategies balance", async () => {
    const strategiesSum: number = strategies.reduce(
      (sum: number, item: Strategies) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(strategiesSum - supply);
    expect(difference, `strategiesSum - total supply should be less than ${acceptableInaccuracy}`).toBeLessThanOrEqual(acceptableInaccuracy);
  });
});

test.describe("XUSD portfolio", () => {
  let strategies: Strategies[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    strategies = await fetchAndValidateResponse(request, configPortfolio.portfolioXusd);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyXusd);
  });

  test("XUSD Portfolio length", async () => {
    expect(strategies.length, 'Portfolio length should be greater than 0').toBeGreaterThan(0);
  });

  test("XUSD Sum of strategies balance", async () => {
    const strategiesSum: number = strategies.reduce(
      (sum: number, item: Strategies) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(strategiesSum - supply);
    expect(difference, `strategiesSum - total supply should be less than ${acceptableInaccuracy}`).toBeLessThanOrEqual(acceptableInaccuracy);
  });
});

test.describe("OVN+ portfolio", () => {
  let strategies: Strategies[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    strategies = await fetchAndValidateResponse(request, configPortfolio.portfolioOvnplus);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyOvnplus);
  });

  test("OVN+ Portfolio length", async () => {
    expect(strategies.length, 'Portfolio length should be greater than 0').toBeGreaterThan(0);
  });

  test("OVN+ Sum of strategies balance", async () => {
    const strategiesSum: number = strategies.reduce(
      (sum: number, item: Strategies) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(strategiesSum - supply);
    expect(difference, `strategiesSum - total supply should be less than ${acceptableInaccuracy}`).toBeLessThanOrEqual(acceptableInaccuracy);
  });
});


