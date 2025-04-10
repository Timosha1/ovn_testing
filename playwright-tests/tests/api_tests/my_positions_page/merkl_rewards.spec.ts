import { test, expect } from '@playwright/test';

const apiUrlArbi = "https://api.merkl.xyz/v3/userRewards?chainId=42161&user=0x523be0bbbfa2221e015dbb4f8ecd0ac69d12eabc&proof=true";
const apiUrlBase = "https://api.merkl.xyz/v3/userRewards?chainId=8453&user=0x523be0bbbfa2221e015dbb4f8ecd0ac69d12eabc&proof=true";

test.beforeEach('Log test name', async () => {
  console.log(`Running ${test.info().title}`);
});

test.describe('Simple Merkl API request test', () => {

  test('Arbi api', async ({ request }) => {
    const responseArbi = await request.get(apiUrlArbi);
    expect(responseArbi.status()).toBe(200);
    const bodyArbi = await responseArbi.json();
    expect(bodyArbi).toBeDefined();
  });

  test('Base api', async ({ request }) => {
    const responseBase = await request.get(apiUrlBase);
    expect(responseBase.status()).toBe(200);
    const bodyBase = await responseBase.json();
    expect(bodyBase).toBeDefined();
  });
});





