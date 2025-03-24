import { test, expect } from "@playwright/test";
import { Payouts } from '../types';
import { configXusd } from '../test_var.ts';
import { fetchAndValidatePayouts } from '../../../test_functions/fetchAndValidatePayouts.ts';
import { validatePayoutProperty } from '../../../test_functions/validatePayoutProperty.ts';


test.describe("XUSD Payouts API tests", () => {
  let payouts: Payouts[];

  test.beforeAll(async ({ request }) => {
    payouts = await fetchAndValidatePayouts(request, configXusd.payoutApi);
  });

  test("Payouts status", () => {
    expect(payouts.length, `Expected at least ${configXusd.minAmountOfPayouts} payouts, got ${payouts.length}`).toBeGreaterThan(configXusd.minAmountOfPayouts);
  });

  test("Daily profits", () => {
    validatePayoutProperty(
      payouts,
      "dailyProfit",
      configXusd.minDailyProfit,
      configXusd.maxDailyProfit,
      configXusd.amountOfPayoutsForTest
    );
  });

  test("Annualized Yield", () => {
    validatePayoutProperty(
      payouts,
      "annualizedYield",
      configXusd.minAnnualizedYield,
      configXusd.maxAnnualizedYield,
      configXusd.amountOfPayoutsForTest
    );
  });
});

