import { APIRequestContext, expect } from '@playwright/test';
import { ChainTokenMap, TokenInfo, TokenMap } from './types';


export async function getArbitrumBaseTokenData(request: APIRequestContext, apiUrl: string): Promise<TokenMap> {
  const response = await request.get(apiUrl);
  expect(response.status(), 'Response status should be 200').toBe(200);
  const tokensResponse: { tokenMap: TokenMap } = await response.json();
  expect(tokensResponse, 'Tokens api should have property tokenMap').toHaveProperty('tokenMap');
  return tokensResponse.tokenMap;
}

export async function getOvnTokensData(request: APIRequestContext, apiUrl: string): Promise<ChainTokenMap> {
  const response = await request.get(apiUrl);
  expect(response.status(), 'Response status should be 200').toBe(200);
  const tokensResponse: { chainTokenMap: ChainTokenMap } = await response.json();
  expect(tokensResponse, 'Response should have chainTokenMap').toHaveProperty('chainTokenMap');
  return tokensResponse.chainTokenMap;
}

// Функция для проверки свойств токена
export async function assertTokenProperties(tokenData: TokenInfo | undefined, expectedToken: { address: string; symbol: string; name: string; chainId?: string; score: number; imageUrl?: string }) {
  expect(tokenData, `Token with address ${expectedToken.address} should exist`).toBeDefined();
  expect(tokenData?.symbol, `Token symbol should be ${expectedToken.symbol}`).toBe(expectedToken.symbol);
  expect(tokenData?.name, `Token name should be ${expectedToken.name}`).toBe(expectedToken.name);
  if (expectedToken.chainId) {
    expect(tokenData?.chainId, `Chain ID should be ${expectedToken.chainId}`).toBe(expectedToken.chainId);
  }
  expect(tokenData?.score, `Token score should be more than or equal to ${expectedToken.score}`).toBeGreaterThanOrEqual(expectedToken.score);
  if (expectedToken.imageUrl !== undefined) { // Проверяем, определено ли imageUrl в expectedToken
    expect(tokenData?.image_url, `Image url should be ${expectedToken.imageUrl}`).toBe(expectedToken.imageUrl);
  }
}