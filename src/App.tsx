import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  Activity,
  TrendingUp,
  DollarSign,
  BarChart2,
  Shield,
  Zap,
  Lock,
  Globe,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';
import { ShieldCheck } from 'lucide-react'; // ShieldCheck ikonunu ekledik
import SecurityAuditPage from './pages/SecurityAuditPage'; // Yeni sayfayı import ediyoruz

import StablecoinPage from './pages/StableCoinPage';
import AuditPage from './pages/AuditPage';
import HomePage from './pages/HomePage';

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
      volatility: 0.23,
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
      volatility: 0.45,
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
                  D'Analysis
                </span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentPage('stablecoin')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300
                    ${
                      currentPage === 'stablecoin'
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
                    ${
                      currentPage === 'audit'
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
                    ${
                      currentPage === 'security'
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
      {currentPage === 'security' ? (
        <SecurityAuditPage />
      ) : currentPage === 'stablecoin' ? (
        <StablecoinPage />
      ) : currentPage === 'audit' ? (
        <AuditPage />
      ) : (
        <HomePage />
      )}
    </div>
  );
};

export default App;
