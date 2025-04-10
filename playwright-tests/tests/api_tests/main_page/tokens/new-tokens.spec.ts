import { test, expect, APIRequestContext } from '@playwright/test';
import {
  apiUrlArbi,
  apiUrlBase,
  tokensArbi,
  tokensBase,
  apiUrlTokensOvn,
  TestCases
} from './test_cases';
import { ChainTokenMap, TokenInfo, TokenMap, TokensResponse } from './types';
import * as allure from 'allure-js-commons';
import { assertTokenProperties, getArbitrumBaseTokenData, getOvnTokensData } from './functions';

let arbitrumTokens: TokenMap = {};
let baseTokens: TokenMap = {};
let overnightChainTokens: ChainTokenMap;

test.beforeEach('Tokens API', async () => {
  console.log(`Running ${test.info().title}`);
});

test.describe('Arbitrum Tokens api check', () => {
  test.beforeAll(async ({ request }) => {
    arbitrumTokens = await getArbitrumBaseTokenData(request, apiUrlArbi);
  });

  for (const token of tokensArbi) {
    test(`Arbitrum ${token.symbol}`, async ({ request }) => {
      await allure.suite("Tokens API");

      await allure.parameter("Token Address", token.address);
      await allure.parameter("Token Symbol", token.symbol);
      await allure.parameter("Token Name", token.name);
      if (token.chainId) {
        await allure.parameter("Chain ID", token.chainId);
      }
      await allure.parameter("Expected Score", token.score.toString());
      if (token.image_url) {
        await allure.parameter("Image URL", token.image_url);
      }

      const tokenData = arbitrumTokens[token.address];
      assertTokenProperties(tokenData, token);
    });
  }
});

test.describe('Base Tokens api check', () => {
  test.beforeAll(async ({ request }) => {
    baseTokens = await getArbitrumBaseTokenData(request, apiUrlBase);
  });

  for (const token of tokensBase) {
    test(`Base ${token.symbol}`, async () => {
      await allure.suite("Tokens API");
      await allure.parameter("Token Address", token.address);
      await allure.parameter("Token Symbol", token.symbol);
      await allure.parameter("Token Name", token.name);
      if (token.chainId) {
        await allure.parameter("Chain ID", token.chainId);
      }
      await allure.parameter("Expected Score", token.score.toString());
      if (token.image_url) {
        await allure.parameter("Image URL", token.image_url);
      }
      const tokenData = baseTokens[token.address];
      assertTokenProperties(tokenData, token);
    });
  }
});

test.describe('All Overnight tokens check', () => {
  test.beforeAll(async ({ request }) => {
    overnightChainTokens = await getOvnTokensData(request, apiUrlTokensOvn);
  });

  TestCases.forEach(({ chainId, address, name }) => {
    test(`${name} ${chainId}`, async () => {
      await allure.suite("Tokens API");
      await allure.parameter("Chain ID", chainId);
      await allure.parameter("Token Address", address);
      await allure.parameter("Token Name", name);
      const chainInfo = overnightChainTokens[chainId];
      expect(chainInfo, `Chain info for chainId ${chainId} should be defined`).toBeDefined();
      const token = chainInfo?.tokenMap[address];
      expect(token, `Token with address ${address} should be defined`).toBeDefined();
      expect(token?.address.toLowerCase(), `Token address should be ${address.toLowerCase()}`).toBe(address.toLowerCase());
      expect(token?.name, `Token name should be ${name}`).toBe(name);
    });
  });
});