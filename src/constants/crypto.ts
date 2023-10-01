export enum Networks {
  BINANCE = 'BINANCE',
  ZKSYNC = 'ZKSYNC',
  ETHEREUM = 'ETHEREUM',
}

type PriceList = {
  [key in Networks]: number;
};

export const MAP_PRICES: PriceList = {
  [Networks.BINANCE]: 100,
  [Networks.ZKSYNC]: 150,
  [Networks.ETHEREUM]: 200,
};