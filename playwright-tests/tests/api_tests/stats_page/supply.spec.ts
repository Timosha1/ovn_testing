import {
  test,
  expect
} from "@playwright/test";
import {
  configPortfolio
} from './test_configs';
import {
  fetchAndValidateSupply
} from '../../test_functions/stats/fetchAndValidateSupply';

test.beforeEach('Supply API', async () => {
  console.log(`Running ${test.info().title}`);
});

test.describe("Supply API tests", () => {
  let usdPlus: number;
  let xusd: number;
  let ovnPlus: number;

  test.beforeAll(async ({ request }) => {
    usdPlus = await fetchAndValidateSupply(request, configPortfolio.supplyUsdplus);
    xusd = await fetchAndValidateSupply(request, configPortfolio.supplyXusd);
    ovnPlus = await fetchAndValidateSupply(request, configPortfolio.supplyOvnplus);
  });

  test("USD+ Supply", async () => {
    expect(usdPlus).toBeGreaterThan(0)
  });

  test("XUSD Supply", async () => {
    expect(xusd).toBeGreaterThan(0)
  });

  test("OVN+ Supply", async () => {
    expect(ovnPlus).toBeGreaterThan(0)
  });
});