export interface ChainRisk {
  id: string;
  name: string;
  symbol: string;
  dateLaunched: string;
  marketCapUSD: string;
  createdAt: string;
  risk: number;
  risks: {
    maturity: number;
    marketCap: number;
    total: number;
  };
}

export interface ProtocolRisk {
  id: string;
  name: string;
  tvlUSD: string;
  dateLaunched: string;
  chainId: string;
  createdAt: string;
  risk: number;
  risks: {
    tvl: number;
    maturity: number;
    total: number;
  };
}

export interface PoolRisk {
  id: string;
  name: string;
  address: string;
  tvlUSD: string;
  dateLaunched: string;
  platformId: string;
  createdAt: string;
  risk: number;
  risks: {
    tvl: number;
    maturity: number;
    total: number;
  };
}

export interface AssetRisk {
  id: string;
  name: string;
  symbol: string;
  marketCapUSD: string;
  dateLaunched: string;
  createdAt: string;
  risk: number;
  risks: {
    maturity: number;
    marketCap: number;
    volatility: number;
    total: number;
  };
}
