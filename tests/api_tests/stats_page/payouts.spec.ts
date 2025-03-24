import { test, expect } from "@playwright/test";
import { Payouts } from './types';
import { configOvnplus, configUsdplus, configXusd } from './test_configs.ts';
import { fetchAndValidatePayouts } from './../../test_functions/fetchAndValidatePayouts.ts';
import { validatePayoutProperty } from './../../test_functions/validatePayoutProperty.ts';

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

