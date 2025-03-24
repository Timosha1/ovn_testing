import { test, expect } from "@playwright/test";
import { Payouts } from '../types';
import { configUsdplus } from '../test_var.ts';
import { fetchAndValidatePayouts } from '../../../test_functions/fetch_api.ts';

test.describe("USD+ Base Payouts API tests", () => {
  let payouts: Payouts[];

  test.beforeAll(async ({ request }) => {
    payouts = await fetchAndValidatePayouts(request, configUsdplus.payoutApi);
  });

  test("Payouts status", () => {
    expect(payouts.length, `Expected at least ${configUsdplus.minAmountOfPayouts} payouts, got ${payouts.length}`).toBeGreaterThan(configUsdplus.minAmountOfPayouts);
  });

  test("Daily profits", () => {
    const lastPayouts = payouts.slice(0, configUsdplus.amountOfPayoutsForTest);
    lastPayouts.forEach((payout) => {
      expect(payout).toHaveProperty("dailyProfit");
      const dailyProfit = parseFloat(payout.dailyProfit);
      expect(isNaN(dailyProfit), "dailyProfit is not a number").toBe(false);
      expect(dailyProfit).toBeLessThanOrEqual(configUsdplus.maxDailyProfit);
      expect(dailyProfit).toBeGreaterThanOrEqual(configUsdplus.minDailyProfit);
    });
  });

  test("Annualized Yield", () => {
    const lastPayouts = payouts.slice(0, configUsdplus.amountOfPayoutsForTest);
    lastPayouts.forEach((payout) => {
      expect(payout).toHaveProperty("annualizedYield");
      const annualizedYield = parseFloat(payout.annualizedYield);
      expect(isNaN(annualizedYield), "annualizedYield is not a number").toBe(false);
      expect(annualizedYield).toBeLessThanOrEqual(configUsdplus.maxAnnualizedYield);
      expect(annualizedYield).toBeGreaterThanOrEqual(configUsdplus.minAnnualizedYield);
    });
  });
});