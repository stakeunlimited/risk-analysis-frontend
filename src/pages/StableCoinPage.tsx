// pages/StablecoinPage.tsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';

interface CoinData {
  symbol: string;
  name: string;
  logo: string;
  chain: string;
  hypeScore: number;
  maxROI: string;
  price: number;
  priceChange: string;
  fdv: string;
  age: string;
}

const mockData: CoinData[] = [
  {
    symbol: 'USDT',
    name: 'Tether',
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    chain: 'Ethereum',
    hypeScore: 95,
    maxROI: '+2.5%',
    price: 1.001,
    priceChange: '+0.03%',
    fdv: '80B',
    age: '1000 Days',
  },
  {
    symbol: 'USDC',
    logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    name: 'USD Coin',
    chain: 'Ethereum',
    hypeScore: 92,
    maxROI: '+2.1%',
    price: 1.002,
    priceChange: '+0.02%',
    fdv: '65B',
    age: '900 Days',
  },
  {
    symbol: 'DAI',
    logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
    name: 'Dai',
    chain: 'Multi-Chain',
    hypeScore: 88,
    maxROI: '+1.8%',
    price: 1.003,
    priceChange: '+0.04%',
    fdv: '50B',
    age: '800 Days',
  },
  {
    symbol: 'BUSD',
    logo: 'https://cryptologos.cc/logos/binance-usd-busd-logo.png',
    name: 'Binance USD',
    chain: 'BSC',
    hypeScore: 85,
    maxROI: '+1.5%',
    price: 1.001,
    priceChange: '+0.01%',
    fdv: '35B',
    age: '700 Days',
  },
  {
    symbol: 'FRAX',
    logo: 'https://cryptologos.cc/logos/frax-frax-logo.png',
    name: 'Frax',
    chain: 'Ethereum',
    hypeScore: 82,
    maxROI: '+1.2%',
    price: 1.004,
    priceChange: '+0.02%',
    fdv: '20B',
    age: '600 Days',
  },
];

const StablecoinPage: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState('All Chains');
  const [selectedCategory, setSelectedCategory] = useState('Stablecoins');

  const categories = [
    'All Categories',
    'Stablecoins',
    'Platform-Based Utility Tokens',
    'Exchange-Issued Asset Tokens',
    'Wrapped-Tokens',
    'More',
  ];
  const chainOptions = [
    { name: 'All Chains', icon: <Shield className="h-4 w-4" /> },
    { name: 'Solana', icon: '◎', color: 'text-green-400' },
    { name: 'Ethereum', icon: 'Ξ', color: 'text-blue-400' },
    { name: 'Binance', icon: 'BNB', color: 'text-yellow-400' },
    { name: 'Base', icon: 'B', color: 'text-blue-500' },
    { name: 'Arbitrum', icon: 'A', color: 'text-blue-600' },
    { name: 'Polygon', icon: 'P', color: 'text-purple-400' },
  ];

  const getProgressBars = (score: number) => {
    return (
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5 w-32">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-3 rounded-sm ${i < Math.floor(score / 10) ? 'bg-violet-500' : 'bg-gray-700'}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-400 ml-2">{score}%</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#12141a] rounded-xl p-6 border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Total Stablecoins</h3>
            <Shield className="h-5 w-5 text-violet-500" />
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-500 text-transparent bg-clip-text">
            351
          </p>
          <p className="text-sm text-gray-400 mt-2">Across all chains</p>
        </div>

        <div className="bg-[#12141a] rounded-xl p-6 border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Total Value Locked</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            $92.4B
          </p>
          <p className="text-sm text-green-400 mt-2">+2.3% (24h)</p>
        </div>

        <div className="bg-[#12141a] rounded-xl p-6 border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Risk Level</h3>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
            Moderate
          </p>
          <p className="text-sm text-yellow-400 mt-2">Market volatility: 2.1%</p>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl 
                       ${
                         selectedCategory === category
                           ? 'bg-violet-500/20 border-violet-500/40 text-white'
                           : 'bg-[#12141a] border-violet-500/10 text-gray-400'
                       }
                       border hover:border-violet-500/40 transition-all duration-300`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* Chain Selector */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-blue-500 text-transparent bg-clip-text">
          Select Chain
        </h2>
        <div className="flex flex-wrap gap-3">
          {chainOptions.map((chain) => (
            <button
              key={chain.name}
              onClick={() => setSelectedChain(chain.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl 
                         ${
                           selectedChain === chain.name
                             ? 'bg-violet-500/20 border-violet-500/40 text-white'
                             : 'bg-[#12141a] border-violet-500/10 text-gray-400'
                         }
                         border hover:border-violet-500/40 transition-all duration-300`}
            >
              <span className={chain.color}>{chain.icon}</span>
              <span>{chain.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#12141a] rounded-xl border border-violet-500/10 overflow-hidden">
        <div className="p-6 border-b border-violet-500/10">
          <h2 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-500 text-transparent bg-clip-text">
            Token Rankings
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1d25]">
                <th className="px-6 py-4 text-left text-gray-400"># Token</th>
                <th className="px-6 py-4 text-left text-gray-400">
                  <div className="flex items-center gap-2">
                    Hype Score
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-gray-400">
                  <div className="flex items-center gap-2">
                    Max ROI
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-gray-400">Price (24h)</th>
                <th className="px-6 py-4 text-left text-gray-400">FDV</th>
                <th className="px-6 py-4 text-left text-gray-400">Coin Age</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-violet-500/10">
              {mockData.map((coin, i) => (
                <tr key={i} className="hover:bg-violet-500/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400">{i + 1}</span>
                      <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center overflow-hidden">
                        <img
                          src={coin.logo}
                          alt={coin.symbol}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://cryptologos.cc/logos/placeholder.png'; // fallback image
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-white">{coin.name}</div>
                        <div className="text-sm text-gray-400">{coin.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getProgressBars(coin.hypeScore)}</td>
                  <td className="px-6 py-4">
                    <span className="text-green-400">{coin.maxROI}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">${coin.price.toFixed(3)}</div>
                    <div className="text-sm text-green-400">{coin.priceChange}</div>
                  </td>
                  <td className="px-6 py-4">${coin.fdv}</td>
                  <td className="px-6 py-4">{coin.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default StablecoinPage;
