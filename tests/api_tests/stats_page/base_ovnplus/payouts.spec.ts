import { test, expect } from "@playwright/test";
import { Payouts } from '../types';
import { configOvnplus } from '../test_var.ts';
import { fetchAndValidatePayouts } from '../../../test_functions/fetch_api.ts';

test.describe("OVN+ Payouts API tests", () => {
  let payouts: Payouts[];

  test.beforeAll(async ({ request }) => {
    payouts = await fetchAndValidatePayouts(request, configOvnplus.payoutApi);
  });

  test("Payouts status", () => {
    expect(payouts.length, `Expected at least ${configOvnplus.minAmountOfPayouts} payouts, got ${payouts.length}`).toBeGreaterThan(configOvnplus.minAmountOfPayouts);
  });

  test("Daily profits", () => {
    const lastPayouts = payouts.slice(0, configOvnplus.amountOfPayoutsForTest);
    lastPayouts.forEach((payout) => {
      expect(payout).toHaveProperty("dailyProfit");
      const dailyProfit = parseFloat(payout.dailyProfit);
      expect(isNaN(dailyProfit), "dailyProfit is not a number").toBe(false);
      expect(dailyProfit).toBeLessThanOrEqual(configOvnplus.maxDailyProfit);
      expect(dailyProfit).toBeGreaterThanOrEqual(configOvnplus.minDailyProfit);
    });
  });

  test("Annualized Yield", () => {
    const lastPayouts = payouts.slice(0, configOvnplus.amountOfPayoutsForTest);
    lastPayouts.forEach((payout) => {
      expect(payout).toHaveProperty("annualizedYield");
      const annualizedYield = parseFloat(payout.annualizedYield);
      expect(isNaN(annualizedYield), "annualizedYield is not a number").toBe(false);
      expect(annualizedYield).toBeLessThanOrEqual(configOvnplus.maxAnnualizedYield);
      expect(annualizedYield).toBeGreaterThanOrEqual(configOvnplus.minAnnualizedYield);
    });
  });
});