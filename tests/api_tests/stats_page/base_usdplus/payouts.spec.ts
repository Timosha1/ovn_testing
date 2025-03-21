import { test, expect } from "@playwright/test";

const config = {
  payoutApi: "https://backend.overnight.fi/payout/base/usd+",
  minAmountOfPayouts: 500,
  minAnnualizedYield: 0.01,
  maxAnnualizedYield: 50,
  amountOfPayoutsForTest: 10,
  maxDailyProfit: 0.001,
  minDailyProfit: 0.000001,
};

test.describe("Payouts API tests", () => {
  let payouts: Payouts[];

  test.beforeAll(async ({ request }) => {
    const response = await request.get(config.payoutApi);
    if (response.status() !== 200) {
      throw new Error(`API returned status ${response.status()}`);
    }
    try {
      payouts = await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message); // TypeScript knows error is an Error here
      } else {
        console.error("Unknown error:", error); // Handle non-Error cases
      }
    }
    expect(Array.isArray(payouts)).toBe(true);
  });

  test("Payouts status", () => {
    expect(payouts.length, `Expected at least ${config.minAmountOfPayouts} payouts, got ${payouts.length}`).toBeGreaterThan(config.minAmountOfPayouts);
  });

  test("Daily profits", () => {
    const lastPayouts = payouts.slice(0, config.amountOfPayoutsForTest);
    lastPayouts.forEach((payout) => {
      expect(payout).toHaveProperty("dailyProfit");
      const dailyProfit = parseFloat(payout.dailyProfit);
      expect(isNaN(dailyProfit), "dailyProfit is not a number").toBe(false);
      expect(dailyProfit).toBeLessThanOrEqual(config.maxDailyProfit);
      expect(dailyProfit).toBeGreaterThanOrEqual(config.minDailyProfit);
    });
  });

  test("Annualized Yield", () => {
    const lastPayouts = payouts.slice(0, config.amountOfPayoutsForTest);
    lastPayouts.forEach((payout) => {
      expect(payout).toHaveProperty("annualizedYield");
      const annualizedYield = parseFloat(payout.annualizedYield);
      expect(isNaN(annualizedYield), "annualizedYield is not a number").toBe(false);
      expect(annualizedYield).toBeLessThanOrEqual(config.maxAnnualizedYield);
      expect(annualizedYield).toBeGreaterThanOrEqual(config.minAnnualizedYield);
    });
  });
});