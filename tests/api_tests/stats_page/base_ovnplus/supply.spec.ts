import { test, expect } from "@playwright/test";
import { totalSupplyApiOvnplus } from '../test_var.ts';

test("Total Supply status", async ({ request }) => {
  const response = await request.get(totalSupplyApiOvnplus);
  expect(response.status()).toBe(200);
  const totalSupplyBody: object = await response.json();
  expect(totalSupplyBody).toBeGreaterThan(0);
});
