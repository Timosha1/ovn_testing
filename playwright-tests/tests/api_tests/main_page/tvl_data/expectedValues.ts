import { Chain } from './types';

export const apiUrl = 'https://backend.overnight.fi/stat/tvl-data';

// Конкретные значения "value:" не используются в тесте
export const expectedValues: Chain[] = [
  {
    chainName: 'arbitrum',
    values: [
      { name: 'xUSD', value: 2306867.820887 },
      { name: 'DAI+', value: 8874.207446270242 },
      { name: 'ETH+', value: 2.0904261398051234 },
      { name: 'USDT+', value: 721301.153282 },
    ],
  },
  {
    chainName: 'base',
    values: [
      { name: 'USD+', value: 8955619.076011 },
      { name: 'DAI+', value: 20174.015077003485 },
      { name: 'USDC+', value: 121711.783733 },
      { name: 'OVN+', value: 331389.13628412556 },
    ],
  },
  {
    chainName: 'blast',
    values: [
      { name: 'USD+', value: 9401819.685859567 },
      { name: 'USDC+', value: 826.1509537965514 },
    ],
  },
  {
    chainName: 'optimism',
    values: [
      { name: 'USD+', value: 89971.408788 },
      { name: 'DAI+', value: 4084.9125016824387 },
    ],
  },
  {
    chainName: 'sonic',
    values: [{ name: 'USD+', value: 9.937924 }],
  },
];