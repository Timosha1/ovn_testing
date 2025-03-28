export interface Collateral {
  name: string;
  netAssetValue: string;
  percentage: string;
  timestamp: number; // тут число юникс добавить проверки
  address: string;
  explorerAddress: string;
}

export interface Payouts {
  transactionHash: string;
  payableDate: string;
  dailyProfit: string;
  annualizedYield: string;
  duration: string;
  totalUsdPlus: string;
  totalUsdc: string;
}

export interface Strategies {
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