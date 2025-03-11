import { test, expect } from '@playwright/test';

test('Проверка статус кода Total Supply запроса', async ({ request }) => {
  const response = await request.get('https://backend.overnight.fi/stat/base/USD+/total-supply');

  expect(response.status()).toBe(200);
});