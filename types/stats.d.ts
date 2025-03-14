interface Collateral {
  name: string,
  netAssetValue: string,
  percentage: string,
  timestamp: number,
  address: string,
  explorerAddress: string
}

interface Payouts {
  "transactionHash": string,
  "payableDate": string,
  "dailyProfit": string,
  "annualizedYield": string,
  "duration": string,
  "totalUsdPlus": string,
  "totalUsdc": string
}

interface Strategies {
  address: string;
  explorerAddress: string;
  collateralToken: string;
  name: string;
  weight: string;
  netAssetValue: string;
  liquidationValue: string;
  riskFactor: string;
  block: number;
  timestamp: number;
}