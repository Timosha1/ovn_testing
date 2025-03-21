import { test, expect } from "@playwright/test";

const totalSupplyApi =  "https://backend.overnight.fi/stat/base/USD+/total-supply";
const minTotalSupply = 1;

test("Total Supply status", async ({ request }) => {
  const response = await request.get(totalSupplyApi);
  expect(response.status()).toBe(200);
  const totalSupplyBody: object = await response.json();
  expect(totalSupplyBody).toBeGreaterThan(minTotalSupply);
});
