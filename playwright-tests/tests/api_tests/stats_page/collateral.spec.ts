import {
  test,
  expect
} from "@playwright/test";
import {
  Collateral
} from './types';
import {
  collateralApiUsdplus,
  acceptableInaccuracy,
  pctAcceptableInaccuracy,
  configPortfolio,
  collateralApiOvnplus,
  collateralApiXusd
} from './test_configs';
import {
  fetchAndValidateResponse
} from '../../test_functions/stats/fetchAndValidateResponse';
import {
  fetchAndValidateSupply
} from '../../test_functions/stats/fetchAndValidateSupply';
import * as allure from 'allure-js-commons';

test.beforeEach('Log test name', async () => {
  await allure.suite("Tokens API");
  console.log(`Running ${test.info().title}`);
});

test.describe("USD+ Base collateral API tests", () => {
  let collateral: Collateral[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    collateral = await fetchAndValidateResponse(request, collateralApiUsdplus);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyUsdplus);
  });

  test("Collateral length", async () => {
    expect(collateral.length, 'Collateral should not be empty').toBeGreaterThan(0);
  });

  test("Sum of collateral balance", async () => {
    const collateralSum: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(collateralSum - supply);
    expect(difference, 'Difference between collateralSum and supply should be less than acceptableInaccuracy').toBeLessThanOrEqual(acceptableInaccuracy);
  });

  test("Sum of collateral percentages", async () => {
    const collateralPct: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.percentage),
      0
    );
    const difference = Math.abs(collateralPct - 100);
    expect(difference, 'Difference in percentages sum should be less than pctAcceptableInaccuracy').toBeLessThanOrEqual(pctAcceptableInaccuracy);
  });
});

test.describe("XUSD Arbi collateral API tests", () => {
  let collateral: Collateral[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    collateral = await fetchAndValidateResponse(request, collateralApiXusd);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyXusd);
  });

  test("Collateral length", async () => {
    expect(collateral.length, 'Collateral should not be empty').toBeGreaterThan(0);
  });

  test("Sum of collateral balance", async () => {
    const collateralSum: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(collateralSum - supply);
    expect(difference, 'Difference between collateralSum and supply should be less than acceptableInaccuracy').toBeLessThanOrEqual(acceptableInaccuracy);
  });

  test("Sum of collateral percentages", async () => {
    const collateralPct: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.percentage),
      0
    );
    const difference = Math.abs(collateralPct - 100);
    expect(difference, 'Difference in percentages sum should be less than pctAcceptableInaccuracy').toBeLessThanOrEqual(pctAcceptableInaccuracy);
  });
});

test.describe("OVN+ Base collateral API tests", () => {
  let collateral: Collateral[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    collateral = await fetchAndValidateResponse(request, collateralApiOvnplus);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyOvnplus);
  });

  test("Collateral length", async () => {
    expect(collateral.length, 'Collateral should not be empty').toBeGreaterThan(0);
  });

  test("Sum of collateral balance", async () => {
    const collateralSum: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(collateralSum - supply);
    expect(difference, 'Difference between collateralSum and supply should be less than acceptableInaccuracy').toBeLessThanOrEqual(acceptableInaccuracy);
  });

  test("Sum of collateral percentages", async () => {
    const collateralPct: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.percentage),
      0
    );
    const difference = Math.abs(collateralPct - 100);
    expect(difference, 'Difference in percentages sum should be less than pctAcceptableInaccuracy').toBeLessThanOrEqual(pctAcceptableInaccuracy);
  });
});