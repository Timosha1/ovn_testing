import { test, expect } from '@playwright/test';

test('Проверка статус кода Portfolio запроса', async ({ request }) => {
  const response = await request.get('\'https://backend.overnight.fi/strategy/base/usd+/portfolio');

  expect(response.status()).toBe(200);
});
