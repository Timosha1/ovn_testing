import { test, expect } from "@playwright/test";
import { Payouts } from '../types';
import { configXusd } from '../test_var.ts';
import { fetchAndValidatePayouts } from '../../../test_functions/fetch_api.ts';

test.describe("XUSD Payouts API tests", () => {
  let payouts: Payouts[];

  test.beforeAll(async ({ request }) => {
    payouts = await fetchAndValidatePayouts(request, configXusd.payoutApi);
  });

  test("Payouts status", () => {
    expect(payouts.length, `Expected at least ${configXusd.minAmountOfPayouts} payouts, got ${payouts.length}`).toBeGreaterThan(configXusd.minAmountOfPayouts);
  });

  test("Daily profits", () => {
    const lastPayouts = payouts.slice(0, configXusd.amountOfPayoutsForTest);
    lastPayouts.forEach((payout) => {
      expect(payout).toHaveProperty("dailyProfit");
      const dailyProfit = parseFloat(payout.dailyProfit);
      expect(isNaN(dailyProfit), "dailyProfit is not a number").toBe(false);
      expect(dailyProfit).toBeLessThanOrEqual(configXusd.maxDailyProfit);
      expect(dailyProfit).toBeGreaterThanOrEqual(configXusd.minDailyProfit);
    });
  });

  test("Annualized Yield", () => {
    const lastPayouts = payouts.slice(0, configXusd.amountOfPayoutsForTest);
    lastPayouts.forEach((payout) => {
      expect(payout).toHaveProperty("annualizedYield");
      const annualizedYield = parseFloat(payout.annualizedYield);
      expect(isNaN(annualizedYield), "annualizedYield is not a number").toBe(false);
      expect(annualizedYield).toBeLessThanOrEqual(configXusd.maxAnnualizedYield);
      expect(annualizedYield).toBeGreaterThanOrEqual(configXusd.minAnnualizedYield);
    });
  });
});

