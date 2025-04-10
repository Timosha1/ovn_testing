export const apiUrlBase = 'https://aggregator.overnight.fi/tokens/8453?search=&limit=100';
export const apiUrlArbi = 'https://aggregator.overnight.fi/tokens/42161?search=&limit=100';
export const apiUrlTokensOvn = "https://aggregator.overnight.fi/tokens/ovn";


export const tokensArbi = [
  {
    address: '0x0000000000000000000000000000000000000000',
    symbol: 'ETH',
    name: 'Native ETH',
    chainId: '42161',
    score: 50,
    image_url: 'https://assets.odos.xyz/tokens/ETH.webp',
  },
  {
    address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    symbol: 'weth',
    name: 'Arbitrum Bridged WETH (Arbitrum One)',
    score: 50,
    image_url: 'https://coin-images.coingecko.com/coins/images/39713/large/WETH.PNG?1723731496',
  },
  {
    address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    symbol: 'usdc',
    name: 'USDC',
    score: 50,
    image_url: 'https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694',
  },
  {
    address: '0xe80772eaf6e2e18b651f160bc9158b2a5cafca65',
    symbol: 'xUSD',
    name: 'xUSD',
    score: 50,
    image_url: 'https://coin-images.coingecko.com/coins/images/39630/large/xUSD_logo_200p.png?1738661628',
  },
];

export const tokensBase = [
  {
    address: '0x0000000000000000000000000000000000000000',
    symbol: 'ETH',
    name: 'Native ETH',
    chainId: '8453',
    score: 50,
    image_url: 'https://assets.odos.xyz/tokens/ETH.webp',
  },
  {
    address: '0x4200000000000000000000000000000000000006',
    symbol: 'weth',
    name: 'L2 Standard Bridged WETH (Base)',
    score: 50,
    image_url: 'https://coin-images.coingecko.com/coins/images/39810/large/weth.png?1724139790',
  },
  {
    address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    symbol: 'usdc',
    name: 'USDC',
    score: 50,
    image_url: 'https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694',
  },
  {
    address: '0xb79dd08ea68a908a97220c76d19a6aa9cbde4376',
    symbol: 'usd+',
    name: 'Overnight.fi USD+ (Base)',
    score: 50,
    image_url: 'https://coin-images.coingecko.com/coins/images/39624/large/USD_.png?1723179227',
  },
];

export const TestCases = [
  {
    chainId: "10",
    address: "0x73cb180bf0521828d8849bc8cf2b920918e23032",
    name: "Overnight.fi USD+ (Optimism)",
  },
  {
    chainId: "10",
    address: "0x3b08fcd15280e7b5a6e404c4abb87f7c774d1b2e",
    name: "Overnight Finance",
  },
  {
    chainId: "10",
    address: "0xa348700745d249c3b49d2c2acac9a5ae8155f826",
    name: "Wrapped USD+",
  },
  {
    chainId: "56",
    address: "0xe80772eaf6e2e18b651f160bc9158b2a5cafca65",
    name: "Overnight.fi USD+",
  },
  {
    chainId: "56",
    address: "0x259b30c916e440fb79747cd559207ffdabbae057",
    name: "Overnight Finance",
  },
  {
    chainId: "146",
    address: "0x53e24706d6642ca495498557415b1af7a025d8da",
    name: "USD+",
  },
  {
    chainId: "146",
    address: "0x281a4b9fba11971f28901c320f34908a779fe3ad",
    name: "Wrapped USD+",
  },
  {
    chainId: "8453",
    address: "0xa3d1a8deb97b111454b294e2324efad13a9d8396",
    name: "Overnight Finance",
  },
  {
    chainId: "8453",
    address: "0xb79dd08ea68a908a97220c76d19a6aa9cbde4376",
    name: "Overnight.fi USD+ (Base)",
  },
  {
    chainId: "8453",
    address: "0x85483696cc9970ad9edd786b2c5ef735f38d156f",
    name: "Overnight.fi USDC+",
  },
  {
    chainId: "8453",
    address: "0xd95ca61ce9aaf2143e81ef5462c0c2325172e028",
    name: "Wrapped USD+",
  },
  {
    chainId: "8453",
    address: "0x8cd408bbb63b804afdcf2110a34e123b0f9ba132",
    name: "OVN+",
  },
  {
    chainId: "42161",
    address: "0xe80772eaf6e2e18b651f160bc9158b2a5cafca65",
    name: "xUSD",
  },
  {
    chainId: "42161",
    address: "0xb1084db8d3c05cebd5fa9335df95ee4b8a0edc30",
    name: "Overnight.fi USDT+",
  },
  {
    chainId: "42161",
    address: "0xa3d1a8deb97b111454b294e2324efad13a9d8396",
    name: "Overnight Finance",
  },
  {
    chainId: "42161",
    address: "0xb86fb1047a955c0186c77ff6263819b37b32440d",
    name: "Wrapped USD+",
  },
];