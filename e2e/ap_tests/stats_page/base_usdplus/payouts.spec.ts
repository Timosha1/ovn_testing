import { test, expect } from '@playwright/test';

test('Проверка статус кода Payouts запроса', async ({ request }) => {
  const response = await request.get('https://backend.overnight.fi/payout/base/usd+');

  expect(response.status()).toBe(200);
});