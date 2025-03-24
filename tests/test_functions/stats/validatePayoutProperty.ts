import { Payouts } from '../../api_tests/stats_page/types';
import { expect } from "@playwright/test";

export function validatePayoutProperty(
  payouts: Payouts[],
  property: 'dailyProfit' | 'annualizedYield', // Update this based on your Payouts interface
  minValue: number,
  maxValue: number,
  amountToCheck: number
) {
  const lastPayouts = payouts.slice(0, amountToCheck);
  lastPayouts.forEach((payout) => {
    expect(payout).toHaveProperty(property);
    const value = parseFloat(payout[property]);
    expect(isNaN(value)).toBe(false);
    expect(value).toBeLessThanOrEqual(maxValue);
    expect(value).toBeGreaterThanOrEqual(minValue);
  });
}