import { test, expect } from '@playwright/test';
import { TokensResponse, TokenInfo } from './types';
import {TestCases, apiUrl} from "./test_cases.ts"

test.describe('Ovn tokens API', () => {
  TestCases.forEach(({ chainId, address, name }) => {
    test(`Check token ${name} ${chainId}`, async ({ request }) => {
      const response = await request.get(apiUrl);
      expect(response.status()).toBe(200);

      const body: TokensResponse = await response.json();
      expect(body).toBeDefined();
      expect(body.chainTokenMap).toBeDefined();

      const chainInfo = body.chainTokenMap[chainId];
      expect(chainInfo).toBeDefined();
      expect(chainInfo.tokenMap).toBeDefined();

      const token: TokenInfo | undefined = chainInfo.tokenMap[address];
      expect(token).toBeDefined();

      expect(token?.address.toLowerCase()).toBe(address.toLowerCase());
      expect(token?.name).toBe(name);

      //console.log(`Токен ${name} найден на сети ${chainId}`);
    });
  });
});