import {
  test,
  expect
} from "@playwright/test";
import {
  Payouts
} from './types';
import {
  configOvnplus,
  configUsdplus,
  configXusd
} from './test_configs';
import {
  fetchAndValidateResponse
} from '../../test_functions/stats/fetchAndValidateResponse';
import {
  validatePayoutProperty
} from '../../test_functions/stats/validatePayoutProperty';
import * as allure from "allure-js-commons";

test.beforeEach('Log test name', async () => {
  await allure.suite("Payouts API");
  console.log(`Running ${test.info().title}`);
});

test.describe("USD+ Base payouts tests", () => {
  let payouts: Payouts[];

  test.beforeAll(async ({ request }) => {
    payouts = await fetchAndValidateResponse(request, configUsdplus.payoutApi);
  });

  test("USD+ Base payouts status", () => {
    expect(payouts.length, `Expected at least ${configUsdplus.minAmountOfPayouts} payouts, got ${payouts.length}`).toBeGreaterThan(configUsdplus.minAmountOfPayouts);
  });

  test("USD+ Base daily profits", () => {
    validatePayoutProperty(
      payouts,
      "dailyProfit",
      configUsdplus.minDailyProfit,
      configUsdplus.maxDailyProfit,
      configUsdplus.amountOfPayoutsForTest
    );
  });

  test("USD+ Base annualized Yield", () => {
    validatePayoutProperty(
      payouts,
      "annualizedYield",
      configUsdplus.minAnnualizedYield,
      configUsdplus.maxAnnualizedYield,
      configUsdplus.amountOfPayoutsForTest
    );
  });
});

test.describe("XUSD payouts tests", () => {
  let payouts: Payouts[];

  test.beforeAll(async ({ request }) => {
    payouts = await fetchAndValidateResponse(request, configXusd.payoutApi);
  });

  test("XUSD payouts status", () => {
    expect(payouts.length, `Expected at least ${configXusd.minAmountOfPayouts} payouts, got ${payouts.length}`).toBeGreaterThan(configXusd.minAmountOfPayouts);
  });

  test("XUSD daily profits", () => {
    validatePayoutProperty(
      payouts,
      "dailyProfit",
      configXusd.minDailyProfit,
      configXusd.maxDailyProfit,
      configXusd.amountOfPayoutsForTest
    );
  });

  test("XUSD annualized Yield", () => {
    validatePayoutProperty(
      payouts,
      "annualizedYield",
      configXusd.minAnnualizedYield,
      configXusd.maxAnnualizedYield,
      configXusd.amountOfPayoutsForTest
    );
  });
});

test.describe("OVN+ payouts tests", () => {
  let payouts: Payouts[];

  test.beforeAll(async ({ request }) => {
    payouts = await fetchAndValidateResponse(request, configOvnplus.payoutApi);
  });

  test("OVN+ payouts status", () => {
    expect(payouts.length, `Expected at least ${configOvnplus.minAmountOfPayouts} payouts, got ${payouts.length}`).toBeGreaterThan(configOvnplus.minAmountOfPayouts);
  });

  test("OVN+ daily profits", () => {
    validatePayoutProperty(
      payouts,
      "dailyProfit",
      configOvnplus.minDailyProfit,
      configOvnplus.maxDailyProfit,
      configOvnplus.amountOfPayoutsForTest
    );
  });

  test("OVN+ annualized Yield", () => {
    validatePayoutProperty(
      payouts,
      "annualizedYield",
      configOvnplus.minAnnualizedYield,
      configOvnplus.maxAnnualizedYield,
      configOvnplus.amountOfPayoutsForTest
    );
  });
});

