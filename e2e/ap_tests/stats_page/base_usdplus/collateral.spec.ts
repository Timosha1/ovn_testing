import { test, expect } from '@playwright/test';

test('Проверка статус кода Collateral запроса', async ({ request }) => {
  const response = await request.get('https://backend.overnight.fi/strategy/base/usd+/collateral');

  expect(response.status()).toBe(200);
});