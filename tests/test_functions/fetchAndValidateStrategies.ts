import { APIRequestContext } from '@playwright/test';

export async function fetchAndValidateStrategies(request: APIRequestContext, apiUrl: string) {
  const response = await request.get(apiUrl);
  if (response.status() !== 200) {
    throw new Error(`API returned status ${response.status()}`);
  }

  let strategies;
  try {
    strategies = await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    } else {
      throw new Error(`Failed to parse JSON: Unknown error`);
    }
  }

  if (!Array.isArray(strategies)) {
    throw new Error('Payouts is not an array');
  }

  return strategies;
}