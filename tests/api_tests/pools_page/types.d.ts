export interface PoolsResponse {
  pools: Pool[];
  total: number;
  page: number;
  limit: number;
}

export interface Pool {
  chainId: number;
  chainName: string;
  poolVersion: number;
  poolAddress: string;
  platform: string;
  fee: string;
  price: string;
  name: string;
  token0: Token;
  token1: Token;
  tickSpacing: string;
  gauge: string;
  tvl: string;
}

export interface PoolTestCase {
  search: string;
  chainId: string;
  platform: string;
  expectedPoolName: string;
  expectedToken0Symbol: string;
  expectedToken1Symbol: string;
  expectedPoolAddress: string;
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
  id: string;
  tokenId: string;
  decimals: number;
  image_url: string;
  score: number;
  price: number;
}
