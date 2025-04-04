
// Collateral
export const collateralApiXusd =  "https://backend.overnight.fi/strategy/arbitrum/xusd/collateral";
export const collateralApiOvnplus =  "https://backend.overnight.fi/strategy/base/ovn+/collateral";
export const collateralApiUsdplus =  "https://backend.overnight.fi/strategy/base/usd+/collateral";

// Inaccuracy Total supply var
export const acceptableInaccuracy = 100000; // Acceptable difference in $ between Total supply and the Sum of all collaterals
export const pctAcceptableInaccuracy = 1;

const minAnnualizedYield = 0.01; // Min and Max Yield vary a lot, so I tried to choose smth that wont fail tests frequently
const maxAnnualizedYield = 100;
const amountOfPayoutsForTest = 10; // No reason to test all 500+ payouts, lets take last 10
const maxDailyProfit = 0.002; // Daily profit also vary, I picked smth loose
const minDailyProfit = 0.000001;

// USD+ payouts config
export const configUsdplus = {
  payoutApi: "https://backend.overnight.fi/payout/base/usd+",
  minAmountOfPayouts: 500,
  minAnnualizedYield: minAnnualizedYield,
  maxAnnualizedYield: maxAnnualizedYield,
  amountOfPayoutsForTest: amountOfPayoutsForTest,
  maxDailyProfit: maxDailyProfit,
  minDailyProfit: minDailyProfit,
};

// Xusd payouts config
export const configXusd = {
  payoutApi: "https://backend.overnight.fi/payout/arbitrum/xusd",
  minAmountOfPayouts: 500,
  minAnnualizedYield: minAnnualizedYield,
  maxAnnualizedYield: maxAnnualizedYield,
  amountOfPayoutsForTest: amountOfPayoutsForTest,
  maxDailyProfit: maxDailyProfit,
  minDailyProfit: minDailyProfit,
};

// OVN+ payouts config
export const configOvnplus = {
  payoutApi: "https://backend.overnight.fi/payout/base/ovn+",
  minAmountOfPayouts: 25,
  minAnnualizedYield: minAnnualizedYield,
  maxAnnualizedYield: maxAnnualizedYield,
  amountOfPayoutsForTest: amountOfPayoutsForTest,
  maxDailyProfit: maxDailyProfit,
  minDailyProfit: minDailyProfit,
};

// Portfolio config
export const configPortfolio = {
  portfolioUsdplus: "https://backend.overnight.fi/strategy/base/usd+/portfolio",
  portfolioXusd: "https://backend.overnight.fi/strategy/arbitrum/xusd/portfolio",
  portfolioOvnplus: "https://backend.overnight.fi/strategy/base/ovn+/portfolio",
  supplyUsdplus: "https://backend.overnight.fi/stat/base/usd+/total-supply",
  supplyXusd: "https://backend.overnight.fi/stat/arbitrum/XUSD/total-supply",
  supplyOvnplus: "https://backend.overnight.fi/stat/base/OVN+/total-supply",
};

