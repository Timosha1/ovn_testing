import { test, expect } from "@playwright/test";
import { Payouts } from '../types';
import { configUsdplus } from '../test_var.ts';
import { fetchAndValidatePayouts } from '../../../test_functions/fetchAndValidatePayouts.ts';
import { validatePayoutProperty } from '../../../test_functions/validatePayoutProperty.ts';

test.describe("USD+ Base Payouts API tests", () => {
  let payouts: Payouts[];

  test.beforeAll(async ({ request }) => {
    payouts = await fetchAndValidatePayouts(request, configUsdplus.payoutApi);
  });

  test("Payouts status", () => {
    expect(payouts.length, `Expected at least ${configUsdplus.minAmountOfPayouts} payouts, got ${payouts.length}`).toBeGreaterThan(configUsdplus.minAmountOfPayouts);
  });

  test("Daily profits", () => {
    validatePayoutProperty(
      payouts,
      "dailyProfit",
      configUsdplus.minDailyProfit,
      configUsdplus.maxDailyProfit,
      configUsdplus.amountOfPayoutsForTest
    );
  });

  test("Annualized Yield", () => {
    validatePayoutProperty(
      payouts,
      "annualizedYield",
      configUsdplus.minAnnualizedYield,
      configUsdplus.maxAnnualizedYield,
      configUsdplus.amountOfPayoutsForTest
    );
  });
});