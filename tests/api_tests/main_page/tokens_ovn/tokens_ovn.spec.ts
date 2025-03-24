import { test, expect } from '@playwright/test';
import { TokensResponse, TokenInfo } from './types';

const apiUrl = "https://aggregator.overnight.fi/tokens/ovn";

const TestCases = [
  {
    chainId: "10",
    address: "0x73cb180bf0521828d8849bc8cf2b920918e23032",
    name: "Overnight.fi USD+ (Optimism)",
  },
  {
    chainId: "10",
    address: "0x3b08fcd15280e7b5a6e404c4abb87f7c774d1b2e",
    name: "Overnight Finance",
  },
  {
    chainId: "10",
    address: "0xa348700745d249c3b49d2c2acac9a5ae8155f826",
    name: "Wrapped USD+",
  },
  {
    chainId: "56",
    address: "0xe80772eaf6e2e18b651f160bc9158b2a5cafca65",
    name: "Overnight.fi USD+",
  },
  {
    chainId: "56",
    address: "0x259b30c916e440fb79747cd559207ffdabbae057",
    name: "Overnight Finance",
  },
  {
    chainId: "146",
    address: "0x53e24706d6642ca495498557415b1af7a025d8da",
    name: "USD+",
  },
  {
    chainId: "146",
    address: "0x281a4b9fba11971f28901c320f34908a779fe3ad",
    name: "Wrapped USD+",
  },
  {
    chainId: "8453",
    address: "0xa3d1a8deb97b111454b294e2324efad13a9d8396",
    name: "Overnight Finance",
  },
  {
    chainId: "8453",
    address: "0xb79dd08ea68a908a97220c76d19a6aa9cbde4376",
    name: "Overnight.fi USD+ (Base)",
  },
  {
    chainId: "8453",
    address: "0x85483696cc9970ad9edd786b2c5ef735f38d156f",
    name: "Overnight.fi USDC+",
  },
  {
    chainId: "8453",
    address: "0xd95ca61ce9aaf2143e81ef5462c0c2325172e028",
    name: "Wrapped USD+",
  },
  {
    chainId: "8453",
    address: "0x8cd408bbb63b804afdcf2110a34e123b0f9ba132",
    name: "OVN+",
  },
  {
    chainId: "42161",
    address: "0xe80772eaf6e2e18b651f160bc9158b2a5cafca65",
    name: "xUSD",
  },
  {
    chainId: "42161",
    address: "0xb1084db8d3c05cebd5fa9335df95ee4b8a0edc30",
    name: "Overnight.fi USDT+",
  },
  {
    chainId: "42161",
    address: "0xa3d1a8deb97b111454b294e2324efad13a9d8396",
    name: "Overnight Finance",
  },
  {
    chainId: "42161",
    address: "0xb86fb1047a955c0186c77ff6263819b37b32440d",
    name: "Wrapped USD+",
  },
];

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