import { test, expect } from "@playwright/test";
import {Collateral} from '../types';
import {
  collateralApiUsdplus,
  totalSupplyApiUsdplus,
  acceptableInaccuracy,
  pctAcceptableInaccuracy
} from '../test_var'

test("Collateral Status", async ({ request }) => {
  const response = await request.get(collateralApiUsdplus);
  expect(response.status()).toBe(200);
  const collateral: Collateral[] = await response.json();
  expect(collateral.length).toBeGreaterThan(0);
});

test("Sum of collateral balance", async ({ request }) => {
  const responseCollateral = await request.get(collateralApiUsdplus);
  expect(responseCollateral.status()).toBe(200);
  const collateralBody = await responseCollateral.json();
  const responseSupply = await request.get(totalSupplyApiUsdplus);
  const responseSupplyBody = await responseSupply.json();
  const collateralSum: number = collateralBody.reduce(
    (sum: number, item: Collateral) => sum + parseFloat(item.netAssetValue),
    0
  );
  const difference = Math.abs(collateralSum - responseSupplyBody);
  expect(difference).toBeLessThanOrEqual(acceptableInaccuracy);
});

test("Sum of collateral percentages", async ({ request }) => {
  const responseCollateral = await request.get(collateralApiUsdplus);
  const collateralBody = await responseCollateral.json();
  const collateralPct: number = collateralBody.reduce(
    (sum: number, item: Collateral) => sum + parseFloat(item.percentage),
    0
  );
  const difference = Math.abs(collateralPct - 100);
  expect(difference).toBeLessThanOrEqual(pctAcceptableInaccuracy);
});
