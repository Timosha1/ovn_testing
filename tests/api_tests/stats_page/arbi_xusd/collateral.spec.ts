import { test, expect } from "@playwright/test";
import { Collateral } from '../types';
import {
  collateralApiXusd,
  acceptableInaccuracy,
  pctAcceptableInaccuracy, configPortfolio
} from '../test_var';
import { fetchAndValidateCollateral } from '../../../test_functions/fetchAndValidateCollateral.ts';
import { fetchAndValidateSupply } from '../../../test_functions/fetchAndValidateSupply.ts';

test.describe("XUSD collateral API tests", () => {
  let collateral: Collateral[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    collateral = await fetchAndValidateCollateral(request, collateralApiXusd);
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
