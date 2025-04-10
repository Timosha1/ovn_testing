import { Payouts } from '../../api_tests/stats_page/types';
import { expect } from "@playwright/test";


// Функция validatePayoutProperty берет массив выплат (payouts), название свойства для проверки (property - 'dailyProfit' | 'annualizedYield ), минимальное (minValue) и максимальное (maxValue) допустимые значения, а также количество последних выплат для проверки (amountOfPayoutsForTest).
//
// Она проверяет, что у указанного количества последних выплат существует заданное свойство, его значение является числом и находится в пределах между minValue и maxValue.
export function validatePayoutProperty(
  payouts: Payouts[],
  property: 'dailyProfit' | 'annualizedYield',
  minValue: number,
  maxValue: number,
  amountOfPayoutsForTest: number
) {
  const lastPayouts = payouts.slice(0, amountOfPayoutsForTest);
  lastPayouts.forEach((payout, index) => {
    const payoutIndex = index + 1; // Индекс, начиная с 1
    expect(payout, `Payout #${payoutIndex}: payout should have ${property}`).toHaveProperty(property);
    const value = parseFloat(payout[property]);
    expect(isNaN(value), `Payout #${payoutIndex}: ${property} should not be NaN`).toBe(false);
    expect(value, `Payout #${payoutIndex}: ${property} should be less than or equal to ${maxValue}`).toBeLessThanOrEqual(maxValue);
    expect(value, `Payout #${payoutIndex}: ${property} should be greater than or equal to ${minValue}`).toBeGreaterThanOrEqual(minValue);
  });
}