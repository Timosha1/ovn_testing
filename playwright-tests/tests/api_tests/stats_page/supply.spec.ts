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

test.beforeEach('Log test name', async () => {
  console.log(`Running ${test.info().title}`);
});

test.describe("Supply API", () => {
  let usdPlus: number;
  let xusd: number;
  let ovnPlus: number;

  test.beforeAll(async ({ request }) => {
    usdPlus = await fetchAndValidateSupply(request, configPortfolio.supplyUsdplus);
    xusd = await fetchAndValidateSupply(request, configPortfolio.supplyXusd);
    ovnPlus = await fetchAndValidateSupply(request, configPortfolio.supplyOvnplus);
  });

  test("USD+ Supply", async () => {
    expect(usdPlus, 'Supply should be greater than 0').toBeGreaterThan(0)
  });

  test("XUSD Supply", async () => {
    expect(xusd, 'Supply should be greater than 0').toBeGreaterThan(0)
  });

  test("OVN+ Supply", async () => {
    expect(ovnPlus, 'Supply should be greater than 0').toBeGreaterThan(0)
  });
});