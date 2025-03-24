import { test, expect } from "@playwright/test";
import { Strategies } from '../types';
import { configPortfolio, acceptableInaccuracy} from '../test_var';
import { fetchAndValidateStrategies } from '../../../test_functions/fetchAndValidateStrategies.ts';
import { fetchAndValidateSupply } from '../../../test_functions/fetchAndValidateSupply.ts';

test.describe("USD+ Base portfolio API tests", () => {
  let strategies: Strategies[];
  let supply: number;

  test.beforeAll(async ({ request }) => {
    strategies = await fetchAndValidateStrategies(request, configPortfolio.portfolioUsdplus);
    supply =  await fetchAndValidateSupply(request, configPortfolio.supplyUsdplus);
  });

  test("Portfolio length", async () => {
    expect(strategies.length).toBeGreaterThan(0);
  });

  test("Sum of strategies balance", async () => {
    const strategiesSum: number = strategies.reduce(
      (sum: number, item: Strategies) => sum + parseFloat(item.netAssetValue),
      0
    );
    const difference = Math.abs(strategiesSum - supply);
    expect(difference).toBeLessThanOrEqual(acceptableInaccuracy);
  });
});
