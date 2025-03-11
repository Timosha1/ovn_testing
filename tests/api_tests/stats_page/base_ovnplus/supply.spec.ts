import { test, expect } from '@playwright/test';

const totalSupplyApi = 'https://backend.overnight.fi/stat/base/OVN+/total-supply'
const ovnPlusSupply = 100000

test('Total Supply status', async ({ request }) => {
  const response = await request.get(totalSupplyApi);
  expect(response.status()).toBe(200);
  const totalSupplyBody: object = await response.json();
  expect(totalSupplyBody).toBeGreaterThan(ovnPlusSupply)
});