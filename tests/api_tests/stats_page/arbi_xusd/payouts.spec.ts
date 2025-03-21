import { test, expect } from "@playwright/test";

const payoutApi = "https://backend.overnight.fi/payout/arbitrum/xusd";
const minAmountOfPayouts = 500; // At this day there was 500+ payouts, anything less than that probably means that some of them missing
const minAnnualizedYield = 0.01; // Min and Max Yield vary a lot, so I tried to choose smth that wont fail tests frequently
const maxAnnualizedYield = 50;
const amountOfPayoutsForTest = 10; // No reason to test all 500+ payouts, lets take last 10
const maxDailyProfit = 0.001; // Daily profit also vary, I picked smth loose
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

