// components/PoolAddressSelector.tsx
import React, { useState } from 'react';
import { Shield, TrendingUp, CircleDollarSign, AlertTriangle, Info } from 'lucide-react';
interface Chain {
  id: string;
  name: string;
  icon: string;
  chainId: string;
}

interface Protocol {
  id: string;
  name: string;
  tvl: string;
  risk: number;
}

interface Pair {
  id: string;
  name: string;
  apy: string;
  liquidity: string;
  risk: number;
  tokens: string[];
}

interface RiskMetrics {
  chainRisk: number;
  protocolRisk: number;
  poolRisk: number;
  avgAssetRisk: number;
  totalRisk: number;
}

const RiskGauge: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const getColor = (score: number) => {
    if (score <= 1.5) return 'from-green-500 to-emerald-400';
    if (score <= 2.5) return 'from-green-400 to-yellow-400';
    if (score <= 3.5) return 'from-yellow-400 to-orange-400';
    return 'from-orange-400 to-red-400';
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl font-bold">{value.toFixed(1)}</div>
        </div>
        <svg className="transform -rotate-90 w-24 h-24">
          <circle
            className="text-gray-700"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="38"
            cx="48"
            cy="48"
          />
          <circle
            className={`text-transparent bg-gradient-to-r ${getColor(value)} transition-all duration-1000 ease-in-out`}
            strokeWidth="8"
            strokeDasharray={240}
            strokeDashoffset={240 - (240 * Math.min(value, 5)) / 5}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="38"
            cx="48"
            cy="48"
          />
        </svg>
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
};

const RiskSummary: React.FC<{ risks: RiskMetrics }> = ({ risks }) => {
  return (
    <div className="mt-8 bg-[#12141a] rounded-xl p-6 border border-violet-500/10">
      <h3 className="text-lg font-medium text-gray-300 mb-6 flex items-center space-x-2">
        <AlertTriangle className="w-5 h-5 text-violet-400" />
        <span>Risk Analysis</span>
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <RiskGauge value={risks.chainRisk} label="Chain Risk" />
        <RiskGauge value={risks.protocolRisk} label="Protocol Risk" />
        <RiskGauge value={risks.poolRisk} label="Pool Risk" />
        <RiskGauge value={risks.avgAssetRisk} label="Asset Risk" />
        <div className="col-span-2 lg:col-span-1 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-xl p-4 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 text-transparent bg-clip-text">
            {risks.totalRisk.toFixed(1)}
          </div>
          <div className="text-sm text-gray-400 mt-2">Total Risk Score</div>
          <div
            className={`mt-2 px-3 py-1 rounded-full text-xs ${
              risks.totalRisk <= 2
                ? 'bg-green-500/20 text-green-400'
                : risks.totalRisk <= 3
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-red-500/20 text-red-400'
            }`}
          >
            {risks.totalRisk <= 2 ? 'Low Risk' : risks.totalRisk <= 3 ? 'Medium Risk' : 'High Risk'}
          </div>
        </div>
      </div>

      {/* Risk Description */}
      <div className="mt-6 p-4 bg-violet-500/5 rounded-xl">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-400">
            Risk scores range from 1 (lowest risk) to 5 (highest risk). The total risk score is calculated based on
            chain security, protocol reliability, pool performance, and underlying asset stability.
          </div>
        </div>
      </div>
    </div>
  );
};

const PoolAddressSelector: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [selectedPair, setSelectedPair] = useState<string | null>(null);

  const chains: Chain[] = [
    { id: 'ethereum', name: 'Ethereum', icon: '🔵', chainId: 'cb0c5f83-ccb8-4930-a030-bbd86f7a5b65' },
    { id: 'polygon', name: 'Polygon', icon: '🟣', chainId: '99f2da9e-f246-46ed-af69-f0a67158f308' },
    { id: 'avalanche', name: 'Avalanche', icon: '🔴', chainId: '9c53367a-cf46-4154-98ef-724de81ce805' },
  ];

  const protocols: { [key: string]: Protocol[] } = {
    ethereum: [
      {
        id: '035401ba-b37a-446e-8b4d-3eb1ae7b0bb2',
        name: 'Uniswap V3',
        tvl: '$3.09B',
        risk: 1,
      },
      {
        id: 'aave-eth',
        name: 'AAVE V3',
        tvl: '$2.1B',
        risk: 1,
      },
    ],
    polygon: [
      {
        id: '9135d64e-9ab6-4510-8896-341a76a7a9f1',
        name: 'Uniswap V3',
        tvl: '$3.09B',
        risk: 1,
      },
    ],
    avalanche: [
      {
        id: '442cc769-3033-47c9-9d2b-e30ce49ee2c3',
        name: 'TraderJoe V2',
        tvl: '$145.3M',
        risk: 1,
      },
    ],
  };

  const pairs: { [key: string]: { [key: string]: Pair[] } } = {
    ethereum: {
      uniswap: [
        {
          id: 'usdc-usdt',
          name: 'USDC/USDT',
          apy: '3.2%',
          liquidity: '$245M',
          risk: 1,
          tokens: ['USDC', 'USDT'],
        },
        {
          id: 'usde-usdt',
          name: 'USDe/USDT',
          apy: '4.1%',
          liquidity: '$89M',
          risk: 2,
          tokens: ['USDe', 'USDT'],
        },
        {
          id: 'dai-usdc',
          name: 'DAI/USDC',
          apy: '2.8%',
          liquidity: '$156M',
          risk: 1,
          tokens: ['DAI', 'USDC'],
        },
      ],
      'aave-eth': [
        {
          id: 'usdc-pool',
          name: 'USDC',
          apy: '3.5%',
          liquidity: '$340M',
          risk: 1,
          tokens: ['USDC'],
        },
        {
          id: 'dai-pool',
          name: 'DAI',
          apy: '3.1%',
          liquidity: '$220M',
          risk: 1,
          tokens: ['DAI'],
        },
      ],
    },
    polygon: {
      uniswap: [
        {
          id: 'usdc-usdt-poly',
          name: 'USDC/USDT',
          apy: '3.4%',
          liquidity: '$180M',
          risk: 1,
          tokens: ['USDC', 'USDT'],
        },
        {
          id: 'usdce-usdc-poly',
          name: 'USDC.e/USDC',
          apy: '2.9%',
          liquidity: '$65M',
          risk: 2,
          tokens: ['USDC.e', 'USDC'],
        },
      ],
    },
    avalanche: {
      traderjoe: [
        {
          id: 'usdce-usdt-avax',
          name: 'USDC.e/USDT',
          apy: '3.8%',
          liquidity: '$45M',
          risk: 2,
          tokens: ['USDC.e', 'USDT'],
        },
        {
          id: 'usdc-usdt-avax',
          name: 'USDC/USDT',
          apy: '3.6%',
          liquidity: '$38M',
          risk: 1,
          tokens: ['USDC', 'USDT'],
        },
      ],
    },
  };

  return (
    <div className="bg-[#1a1d25] rounded-xl p-6">
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text mb-6 flex items-center gap-2">
        <Shield className="w-6 h-6 text-blue-400" />
        Pool Selection
      </h2>

      <div className="grid grid-cols-3 gap-8">
        {/* Chain Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300 mb-4">Select Chain</h3>
          <div className="flex flex-col space-y-3">
            {chains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => {
                  setSelectedChain(chain.id);
                  setSelectedProtocol(null);
                  setSelectedPair(null);
                }}
                className={`p-4 rounded-xl transition-all duration-300
                      ${
                        selectedChain === chain.id
                          ? 'bg-blue-500/20 border-blue-500/40'
                          : 'bg-[#12141a] border-violet-500/10'
                      } 
                      border hover:border-blue-500/40`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{chain.icon}</span>
                    <span className="font-medium">{chain.name}</span>
                  </div>
                  {selectedChain === chain.id && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Protocol Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300 mb-4">Select Protocol</h3>
          <div className="flex flex-col space-y-3">
            {selectedChain &&
              protocols[selectedChain]?.map((protocol) => (
                <button
                  key={protocol.id}
                  onClick={() => {
                    setSelectedProtocol(protocol.id);
                    setSelectedPair(null);
                  }}
                  className={`p-4 rounded-xl transition-all duration-300
                      ${
                        selectedProtocol === protocol.id
                          ? 'bg-cyan-500/20 border-cyan-500/40'
                          : 'bg-[#12141a] border-violet-500/10'
                      } 
                      border hover:border-cyan-500/40`}
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{protocol.name}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          protocol.risk === 1
                            ? 'bg-green-500/20 text-green-400'
                            : protocol.risk === 2
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        Risk: {protocol.risk}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">TVL: {protocol.tvl}</span>
                      {selectedProtocol === protocol.id && <div className="h-2 w-2 rounded-full bg-cyan-500"></div>}
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* Pair Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300 mb-4">Select Pair</h3>
          <div className="flex flex-col space-y-3">
            {selectedChain &&
              selectedProtocol &&
              pairs[selectedChain]?.[selectedProtocol]?.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => setSelectedPair(pair.id)}
                  className={`p-4 rounded-xl transition-all duration-300
                      ${
                        selectedPair === pair.id
                          ? 'bg-teal-500/20 border-teal-500/40'
                          : 'bg-[#12141a] border-violet-500/10'
                      } 
                      border hover:border-teal-500/40`}
                >
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pair.name}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          pair.risk === 1
                            ? 'bg-green-500/20 text-green-400'
                            : pair.risk === 2
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        Risk: {pair.risk}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Liquidity: {pair.liquidity}</span>
                      <span className="text-green-400">APY: {pair.apy}</span>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Selected Pool Summary */}
      {selectedChain && selectedProtocol && selectedPair && (
        <>
          <div className="mt-8 p-6 bg-[#12141a] rounded-xl border border-blue-500/10">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Selected Pool Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-500/10 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Chain</div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{chains.find((c) => c.id === selectedChain)?.icon}</span>
                  <span className="font-medium">{chains.find((c) => c.id === selectedChain)?.name}</span>
                </div>
              </div>
              <div className="p-4 bg-cyan-500/10 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Protocol</div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {protocols[selectedChain].find((p) => p.id === selectedProtocol)?.name}
                  </span>
                  <TrendingUp className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="text-sm text-cyan-400 mt-1">
                  {protocols[selectedChain].find((p) => p.id === selectedProtocol)?.tvl}
                </div>
              </div>
              <div className="p-4 bg-teal-500/10 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Pool</div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {pairs[selectedChain][selectedProtocol]?.find((p) => p.id === selectedPair)?.name}
                  </span>
                  <CircleDollarSign className="h-4 w-4 text-teal-400" />
                </div>
                <div className="text-sm text-teal-400 mt-1">
                  APY: {pairs[selectedChain][selectedProtocol]?.find((p) => p.id === selectedPair)?.apy}
                </div>
              </div>
            </div>
          </div>

          {/* Risk Analysis Section */}
          <RiskSummary
            risks={{
              chainRisk: 2,
              protocolRisk: 2.2,
              poolRisk: 4.1,
              avgAssetRisk: 1.225,
              totalRisk: 2.525,
            }}
          />
        </>
      )}
    </div>
  );
};

export default PoolAddressSelector;
