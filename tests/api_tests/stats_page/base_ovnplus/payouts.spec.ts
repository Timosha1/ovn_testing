import { test, expect } from "@playwright/test";
import { Payouts } from '../types';
import { configOvnplus } from '../test_var.ts';
import { fetchAndValidatePayouts } from '../../../test_functions/fetchAndValidatePayouts.ts';
import { validatePayoutProperty } from '../../../test_functions/validatePayoutProperty.ts';

test.describe("OVN+ Payouts API tests", () => {
  let payouts: Payouts[];

  test.beforeAll(async ({ request }) => {
    payouts = await fetchAndValidatePayouts(request, configOvnplus.payoutApi);
  });

  test("Payouts status", () => {
    expect(payouts.length, `Expected at least ${configOvnplus.minAmountOfPayouts} payouts, got ${payouts.length}`).toBeGreaterThan(configOvnplus.minAmountOfPayouts);
  });

  test("Daily profits", () => {
    validatePayoutProperty(
      payouts,
      "dailyProfit",
      configOvnplus.minDailyProfit,
      configOvnplus.maxDailyProfit,
      configOvnplus.amountOfPayoutsForTest
    );
  });

  test("Annualized Yield", () => {
    validatePayoutProperty(
      payouts,
      "annualizedYield",
      configOvnplus.minAnnualizedYield,
      configOvnplus.maxAnnualizedYield,
      configOvnplus.amountOfPayoutsForTest
    );
  });
});