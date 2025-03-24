import { test, expect } from "@playwright/test";
import {Collateral} from '../types';
import {
  collateralApiXusd,
  totalSupplyApiXusd,
  acceptableInaccuracy,
  pctAcceptableInaccuracy
} from '../test_var'

test("Collateral Status", async ({ request }) => {
  const response = await request.get(collateralApiXusd);
  expect(response.status()).toBe(200);
  const collateral: Collateral[] = await response.json();
  expect(collateral.length).toBeGreaterThan(0);
});

test("Sum of collateral balance", async ({ request }) => {
  const responseCollateral = await request.get(collateralApiXusd);
  const collateral = await responseCollateral.json();
  const responseSupply = await request.get(totalSupplyApiXusd);
  const totalSupply = await responseSupply.json();
  const collateralSum: number = collateral.reduce(
    (sum: number, item: Collateral) => sum + parseFloat(item.netAssetValue),
    0
  );
  const difference = Math.abs(collateralSum - totalSupply);
  expect(difference).toBeLessThanOrEqual(acceptableInaccuracy);
});

test("Sum of collateral percentages", async ({ request }) => {
  const responseCollateral = await request.get(collateralApiXusd);
  const collateralBody = await responseCollateral.json();
  const collateralPct: number = collateralBody.reduce(
    (sum: number, item: Collateral) => sum + parseFloat(item.percentage),
    0
  );
  const difference = Math.abs(collateralPct - 100);
  expect(difference).toBeLessThanOrEqual(pctAcceptableInaccuracy);
});
