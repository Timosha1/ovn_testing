export interface TokensResponse {
  chainTokenMap: ChainTokenMap;
}
export interface ChainTokenMap {
  [chainId: string]: ChainInfo;
}
export interface ChainInfo {
  tokenMap: TokenMap;
}
export interface TokenMap {
  [tokenAddress: string]: TokenInfo;
}
export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  id: string;
  tokenId: string;
  decimals: number;
  image_url?: string; // поле может отсутствовать
  score?: number;
  price?: number;
  chainId?: string; // Добавлено, так как встречается в некоторых объектах
  priceOracle?: string; // Добавлено, так как встречается в некоторых объектах
}

export interface TestCase {
  address: string;
  name: string;
  symbol: string;
  imageUrl: string;
  score: number;
  price: number;
}
