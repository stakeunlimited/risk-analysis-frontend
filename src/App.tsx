import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, TrendingUp, DollarSign, BarChart2, Shield, Zap, Lock, Globe, AlertTriangle, FileCheck } from 'lucide-react';
import {ShieldCheck } from 'lucide-react'; // ShieldCheck ikonunu ekledik
import SecurityAuditPage from './pages/SecurityAuditPage'; // Yeni sayfayı import ediyoruz

import StablecoinPage from './pages/StableCoinPage';
import AuditPage from './pages/AuditPage';

interface ProtocolData {
  name: string;
  tvl: number;
  apy: number;
  riskScore: number;
  volume24h: number;
  chain: string;
  validators: number;
  age: number;
  marketCap: number;
  volatility: number;
}

const App: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState<string>('all');
  const [protocols, setProtocols] = useState<ProtocolData[]>([]);
    const [currentPage, setCurrentPage] = useState<'dashboard' | 'stablecoin' | 'audit' | 'security'>('dashboard');
    

  const mockData = [
    {
      name: 'Ethereum',
      tvl: 87.256,
      apy: 4.5,
      riskScore: 2,
      volume24h: 7.465,
      chain: 'ETH',
      validators: 543211,
      age: 8,
      marketCap: 245.6,
      volatility: 0.23
    },
    {
      name: 'BSC',
      tvl: 45.123,
      apy: 5.2,
      riskScore: 3,
      volume24h: 5.234,
      chain: 'BSC',
      validators: 21,
      age: 3,
      marketCap: 45.2,
      volatility: 0.45
    },
    // ... diğer protokoller
  ];

  useEffect(() => {
    setProtocols(mockData);
  }, []);

  const getRiskColor = (score: number) => {
    if (score <= 2) return 'text-emerald-400';
    if (score <= 4) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white">
      <nav className="bg-[#12141a] border-b border-violet-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
                <Shield className="h-8 w-8 text-violet-500" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-500 text-transparent bg-clip-text">
                  DeFi Risk Analyzer
                </span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentPage('stablecoin')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300
                    ${currentPage === 'stablecoin' 
                      ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 border-violet-500/40 text-white' 
                      : 'bg-gradient-to-r from-violet-500/10 to-blue-500/10 border-violet-500/20'
                    } border hover:border-violet-500/40 text-white/90 hover:text-white
                    shadow-lg shadow-violet-500/5 hover:shadow-violet-500/20`}
                >
                  Stablecoin Scores
                </button>

                <button
                  onClick={() => setCurrentPage('audit')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2
                    ${currentPage === 'audit' 
                      ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-500/40 text-white' 
                      : 'bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20'
                    } border hover:border-emerald-500/40 text-white/90 hover:text-white
                    shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/20`}
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Check Audit</span>
                </button>

                {/* Yeni Security Audit Checker butonu */}
                <button
                  onClick={() => setCurrentPage('security')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2
                    ${currentPage === 'security' 
                      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-white' 
                      : 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20'
                    } border hover:border-blue-500/40 text-white/90 hover:text-white
                    shadow-lg shadow-blue-500/5 hover:shadow-blue-500/20`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Security Audit Checker</span>
                </button>
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                className="bg-[#1a1d25] text-white rounded-xl px-4 py-2 border border-violet-500/20 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none"
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
              >
                <option value="all">All Chains</option>
                <option value="ETH">Ethereum</option>
                <option value="BSC">BSC</option>
                <option value="POLYGON">Polygon</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
      {currentPage === 'dashboard' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* TVL Card */}
              <div className="bg-[#12141a] rounded-xl p-6 border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300 shadow-lg hover:shadow-violet-500/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400">Total Value Locked</h3>
                  <Lock className="h-5 w-5 text-violet-500" />
                </div>
                <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-violet-400 to-blue-500 text-transparent bg-clip-text">
                  $87.256B
                </p>
                <p className="text-sm text-green-400 mt-2">+2.3% ↑</p>
              </div>

              {/* Validator Card */}
              <div className="bg-[#12141a] rounded-xl p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400">Total Validators</h3>
                  <Shield className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                  543,211
                </p>
                <p className="text-sm text-green-400 mt-2">+156 ↑</p>
              </div>

              {/* Average Risk Score */}
              <div className="bg-[#12141a] rounded-xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400">Average Risk Score</h3>
                  <AlertTriangle className="h-5 w-5 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-emerald-400 to-green-400 text-transparent bg-clip-text">
                  2.5
                </p>
                <p className="text-sm text-green-400 mt-2">Low Risk</p>
              </div>

              {/* Network Status */}
              <div className="bg-[#12141a] rounded-xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400">Network Status</h3>
                  <Globe className="h-5 w-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold mt-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  Optimal
                </p>
                <p className="text-sm text-green-400 mt-2">All Systems Go</p>
              </div>
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* TVL Chart */}
              <div className="bg-[#12141a] rounded-xl p-6 border border-violet-500/10">
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-blue-500 text-transparent bg-clip-text">
                  TVL Trend Analysis
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={protocols}>
                      <defs>
                        <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#4B5563" />
                      <YAxis stroke="#4B5563" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#F9FAFB' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="tvl"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#tvlGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Risk Analysis Matrix */}
              <div className="bg-[#12141a] rounded-xl p-6 border border-violet-500/10">
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-blue-500 text-transparent bg-clip-text">
                  Protocol Risk Matrix
                </h2>
                <div className="space-y-4">
                  {protocols.map((protocol, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-[#1a1d25] rounded-xl border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300"
                    >
                      <div>
                        <h3 className="font-medium">{protocol.name}</h3>
                        <div className="text-sm text-gray-400 mt-1">
                          <div>TVL: ${protocol.tvl}B</div>
                          <div>Validators: {protocol.validators.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${getRiskColor(protocol.riskScore)}`}>
                          Risk Score: {protocol.riskScore}
                        </p>
                        <p className="text-sm text-gray-400">APY: {protocol.apy}%</p>
                        <p className="text-sm text-gray-400">Age: {protocol.age} years</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Volatility Index */}
              <div className="bg-[#12141a] rounded-xl p-6 border border-violet-500/10">
                <h2 className="text-lg font-bold mb-4 bg-gradient-to-r from-violet-400 to-blue-500 text-transparent bg-clip-text">
                  Volatility Index
                </h2>
                <div className="space-y-4">
                  {protocols.map((protocol, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{protocol.name}</span>
                      <span className={protocol.volatility < 0.3 ? 'text-green-400' : 'text-yellow-400'}>
                        {(protocol.volatility * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Cap Analysis */}
              <div className="bg-[#12141a] rounded-xl p-6 border border-violet-500/10">
                <h2 className="text-lg font-bold mb-4 bg-gradient-to-r from-violet-400 to-blue-500 text-transparent bg-clip-text">
                  Market Cap Analysis
                </h2>
                <div className="space-y-4">
                  {protocols.map((protocol, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{protocol.name}</span>
                      <span className="text-blue-400">${protocol.marketCap}B</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Score */}
              <div className="bg-[#12141a] rounded-xl p-6 border border-violet-500/10">
                <h2 className="text-lg font-bold mb-4 bg-gradient-to-r from-violet-400 to-blue-500 text-transparent bg-clip-text">
                  Security Analysis
                </h2>
                <div className="space-y-4">
                  {protocols.map((protocol, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{protocol.name}</span>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400">High</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
          </main>
      ) : currentPage === 'stablecoin' ? (
        <StablecoinPage />
      ) : currentPage === 'audit' ? (
        <AuditPage />
      ) : (
        <SecurityAuditPage />
      )}
    </div>
  );
};


export default App;
