import { test, expect } from '@playwright/test';

const apiUrlArbi = "https://api.merkl.xyz/v3/userRewards?chainId=42161&user=0x523be0bbbfa2221e015dbb4f8ecd0ac69d12eabc&proof=true";
const apiUrlBase = "https://api.merkl.xyz/v3/userRewards?chainId=8453&user=0x523be0bbbfa2221e015dbb4f8ecd0ac69d12eabc&proof=true";

test('Generic Merkl API request test', async ({ request }) => {
  const responseArbi = await request.get(apiUrlArbi);
  const responseBase = await request.get(apiUrlBase);

  expect(responseArbi.status()).toBe(200);
  expect(responseBase.status()).toBe(200);

  const bodyArbi = await responseArbi.json();
  const bodyBase = await responseArbi.json();

  expect(bodyArbi).toBeDefined();
  expect(bodyBase).toBeDefined();
});

