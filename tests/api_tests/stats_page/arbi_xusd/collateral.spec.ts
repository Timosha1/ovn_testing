import { test, expect } from '@playwright/test';

// Threshold is Acceptable difference between Total supply and the sum of collateral
const threshold = 1000
const pctThreshold = 1
const collateralApi = 'https://backend.overnight.fi/strategy/arbitrum/xusd/collateral'
const totalSupplyApi = 'https://backend.overnight.fi/stat/arbitrum/XUSD/total-supply'


interface Collateral {
  name: string,
  netAssetValue: string,
  percentage: string,
  timestamp: number,
  address: string,
  explorerAddress: string
}

test('Collateral Status', async ({ request }) => {
  const response = await request.get(collateralApi);
  expect(response.status()).toBe(200);
  const collateral: Collateral [] = await response.json();
  expect(collateral.length).toBeGreaterThan(0);
});

test('Sum of collateral balance', async ({ request }) => {
  const responseCollateral = await request.get(collateralApi);
  const collateralBody = await responseCollateral.json();
  const responseSupply = await request.get(totalSupplyApi);
  const responseSupplyBody = await responseSupply.json();

  const collateralSum: number = collateralBody.reduce(
    (sum: number, item: Collateral) => sum + parseFloat(item.netAssetValue),
    0
  );
  const difference = Math.abs(collateralSum - responseSupplyBody);
  expect(difference).toBeLessThanOrEqual(threshold);
})

test('Sum of collateral percentages', async ({ request }) => {
  const responseCollateral = await request.get(collateralApi);
  const collateralBody = await responseCollateral.json();

  const collateralPct: number = collateralBody.reduce(
    (sum: number, item: Collateral) => sum + parseFloat(item.percentage),
    0
  );
  const difference = Math.abs(collateralPct - 100);
  expect(difference).toBeLessThanOrEqual(pctThreshold);
})