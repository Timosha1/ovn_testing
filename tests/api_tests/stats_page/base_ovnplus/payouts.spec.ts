import { test, expect } from "@playwright/test";

const payoutApi = "https://backend.overnight.fi/payout/base/ovn+";
const minAmountOfPayouts = 25;
const minAnnualizedYield = 0.01;
const maxAnnualizedYield = 100;
const amountOfPayoutsForTest = 10;
const maxDailyProfit = 0.002;
const minDailyProfit = 0.000001;

interface Payouts {
  transactionHash: string;
  payableDate: string;
  dailyProfit: string;
  annualizedYield: string;
  duration: string;
  totalUsdPlus: string;
  totalUsdc: string;
}

test("Payouts status", async ({ request }) => {
  const response = await request.get(payoutApi);
  expect(response.status()).toBe(200);
  const payouts: Payouts[] = await response.json();
  expect(payouts.length).toBeGreaterThan(minAmountOfPayouts);
});

test("Daily profits", async ({ request }) => {
  const response = await request.get(payoutApi);
  expect(response.status()).toBe(200);
  const payouts: Payouts[] = await response.json();
  const lastPayouts = payouts.slice(0, amountOfPayoutsForTest);
  lastPayouts.forEach((payout) => {
    const dailyProfit = parseFloat(payout.dailyProfit);
    expect(dailyProfit).toBeLessThanOrEqual(maxDailyProfit);
    expect(dailyProfit).toBeGreaterThanOrEqual(minDailyProfit);
  });
});

test("Annualized Yield", async ({ request }) => {
  const response = await request.get(payoutApi);
  expect(response.status()).toBe(200);
  const payouts: Payouts[] = await response.json();
  const lastPayouts = payouts.slice(0, amountOfPayoutsForTest);
  lastPayouts.forEach((payout) => {
    const annualizedYield = parseFloat(payout.annualizedYield);
    expect(annualizedYield).toBeLessThanOrEqual(maxAnnualizedYield);
    expect(annualizedYield).toBeGreaterThanOrEqual(minAnnualizedYield);
  });
});
