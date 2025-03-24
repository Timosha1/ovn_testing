import { test, expect } from '@playwright/test';
import {totalSupplyApiXusd} from '../test_var.ts';

test('Total Supply status', async ({ request }) => {
  const response = await request.get(totalSupplyApiXusd);
  expect(response.status()).toBe(200);
  const totalSupplyBody: object = await response.json();
  expect(totalSupplyBody).toBeGreaterThan(0)
});