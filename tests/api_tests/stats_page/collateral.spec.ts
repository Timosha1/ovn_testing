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
} from './test_configs.ts';
import {
  fetchAndValidateResponse
} from '../../test_functions/stats/fetchAndValidateResponse.ts';
import {
  fetchAndValidateSupply
} from './../../test_functions/stats/fetchAndValidateSupply.ts';

test.beforeEach('Collateral API', async () => {
  console.log(`Running ${test.info().title}`);
});

test.describe("USD+ collateral API tests", () => {
  let collateral: Collateral[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    collateral = await fetchAndValidateResponse(request, collateralApiUsdplus);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyUsdplus);
  });

  test("Collateral length", async () => {
    expect(collateral.length).toBeGreaterThan(0);
  });

  test("Sum of collateral balance", async () => {
    const collateralSum: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(collateralSum - supply);
    expect(difference).toBeLessThanOrEqual(acceptableInaccuracy);
  });

  test("Sum of collateral percentages", async () => {
    const collateralPct: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.percentage),
      0
    );
    const difference = Math.abs(collateralPct - 100);
    expect(difference).toBeLessThanOrEqual(pctAcceptableInaccuracy);
  });
});

test.describe("XUSD collateral API tests", () => {
  let collateral: Collateral[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    collateral = await fetchAndValidateResponse(request, collateralApiXusd);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyXusd);
  });

  test("Collateral length", async () => {
    expect(collateral.length).toBeGreaterThan(0);
  });

  test("Sum of collateral balance", async () => {
    const collateralSum: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(collateralSum - supply);
    expect(difference).toBeLessThanOrEqual(acceptableInaccuracy);
  });

  test("Sum of collateral percentages", async () => {
    const collateralPct: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.percentage),
      0
    );
    const difference = Math.abs(collateralPct - 100);
    expect(difference).toBeLessThanOrEqual(pctAcceptableInaccuracy);
  });
});

test.describe("OVN+ collateral API tests", () => {
  let collateral: Collateral[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    collateral = await fetchAndValidateResponse(request, collateralApiOvnplus);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyOvnplus);
  });

  test("Collateral length", async () => {
    expect(collateral.length).toBeGreaterThan(0);
  });

  test("Sum of collateral balance", async () => {
    const collateralSum: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(collateralSum - supply);
    expect(difference).toBeLessThanOrEqual(acceptableInaccuracy);
  });

  test("Sum of collateral percentages", async () => {
    const collateralPct: number = collateral.reduce(
      (sum: number, item: Collateral) => sum + parseFloat(item.percentage),
      0
    );
    const difference = Math.abs(collateralPct - 100);
    expect(difference).toBeLessThanOrEqual(pctAcceptableInaccuracy);
  });
});


