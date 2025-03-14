import { test, expect } from '@playwright/test';

const totalSupplyApi =  "https://backend.overnight.fi/stat/arbitrum/XUSD/total-supply";
const minTotalSupply = 1 // Total supply api takes data from blockchain, it's a robust way to gather data so anything more than 1 should be trustworthy

test('Total Supply status', async ({ request }) => {
  const response = await request.get(totalSupplyApi);
  expect(response.status()).toBe(200);
  const totalSupplyBody: object = await response.json();
  expect(totalSupplyBody).toBeGreaterThan(minTotalSupply)
});