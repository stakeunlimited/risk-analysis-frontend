// pages/AuditPage.tsx
import React, { useState } from 'react';
import { Database, Lock, CircleDollarSign, Layers, Link } from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from 'recharts';
import PoolAddressSelector from '../components/PoolAddressSelector';
interface CategoryButton {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  url: string;
}
interface Protocol {
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

const categories: CategoryButton[] = [
  {
    id: 'assets',
    name: 'Assets',
    icon: <CircleDollarSign className="w-6 h-6" />,
    color: 'violet',
    url: 'https://defi-risk-analysis.vercel.app/risk/assets',
  },
  {
    id: 'pools',
    name: 'Pools',
    icon: <Database className="w-6 h-6" />,
    color: 'blue',
    url: 'https://defi-risk-analysis.vercel.app/risk/pools',
  },
  {
    id: 'protocols',
    name: 'Protocols',
    icon: <Lock className="w-6 h-6" />,
    color: 'emerald',
    url: 'https://defi-risk-analysis.vercel.app/risk/protocols',
  },
  {
    id: 'chains',
    name: 'Chains',
    icon: <Layers className="w-6 h-6" />,
    color: 'pink',
    url: 'https://defi-risk-analysis.vercel.app/risk/chains',
  },
  {
    id: 'total',
    name: 'Pool Address Total',
    icon: <Link className="w-6 h-6" />,
    color: 'orange',
    url: 'https://defi-risk-analysis.vercel.app/risk?poolAddress=0x2f1DA4bafd5f2508EC2e2E425036063A374993B6',
  },
];

const AuditPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#ec4899', '#f97316'];

  const fetchCategoryData = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();

      // Format data for charts based on actual protocol data
      const formattedData = result.map((protocol: Protocol) => ({
        name: protocol.name.replace(/ (Ethereum|Polygon|Avalanche|Solana)$/, ''),
        tvl: parseFloat(protocol.tvlUSD) / 1000000, // Convert to millions
        securityScore: {
          total: protocol.risks.total,
          tvl: protocol.risks.tvl,
          maturity: protocol.risks.maturity,
        },
        risk: protocol.risk,
        chainName: protocol.name.split(' ').pop(),
        dateLaunched: protocol.dateLaunched,
      }));

      console.log('Formatted Data:', formattedData); // Debug için
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const renderAssetAnalysis = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Risk Distribution */}
      <div className="bg-[#1a1d25] rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-200 mb-4">Risk Distribution</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="risk" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {data?.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Cap Distribution */}
      <div className="bg-[#1a1d25] rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-200 mb-4">Market Cap Analysis</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="symbol" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="marketCapUSD" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderPoolAnalysis = () => <PoolAddressSelector />;
  <div className="bg-[#1a1d25] rounded-xl p-6">
    <h3 className="text-lg font-medium text-gray-200 mb-4">TVL Analysis</h3>
    <div className="h-96">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="tvl" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>;

  const renderProtocolAnalysis = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Security Metrics - Gelişmiş RadarChart */}
      <div className="bg-[#1a1d25] rounded-xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
        <h3 className="text-lg font-medium bg-gradient-to-r from-emerald-400 to-green-400 text-transparent bg-clip-text mb-4">
          Security Analysis
        </h3>
        <div className="h-80">
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <defs>
                <linearGradient id="securityGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="#1f2937" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Radar
                name="Total Risk"
                dataKey="securityScore.total"
                stroke="#10b981"
                fill="url(#securityGradient)"
                fillOpacity={0.6}
              />
              <Radar name="TVL Risk" dataKey="securityScore.tvl" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
              <Radar
                name="Maturity Risk"
                dataKey="securityScore.maturity"
                stroke="#ec4899"
                fill="#ec4899"
                fillOpacity={0.4}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.1)',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        {/* Security Stats */}
        {/* Security Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-[#12141a] rounded-lg p-3 border border-emerald-500/10">
            <div className="text-sm text-gray-400">Average Total Risk</div>
            <div className="text-lg font-bold text-emerald-400">
              {(
                data?.reduce((acc: any, curr: { securityScore: { total: any } }) => acc + curr.securityScore.total, 0) /
                  data?.length || 0
              ).toFixed(2)}
            </div>
          </div>
          <div className="bg-[#12141a] rounded-lg p-3 border border-emerald-500/10">
            <div className="text-sm text-gray-400">Highest Risk</div>
            <div className="text-lg font-bold text-emerald-400">
              {data && data.length > 0
                ? Math.max(...data.map((item: { securityScore: { total: any } }) => item.securityScore.total)).toFixed(
                    2,
                  )
                : '0.00'}
            </div>
          </div>
          <div className="bg-[#12141a] rounded-lg p-3 border border-emerald-500/10">
            <div className="text-sm text-gray-400">Lowest Risk</div>
            <div className="text-lg font-bold text-emerald-400">
              {data && data.length > 0
                ? Math.min(...data.map((item: { securityScore: { total: any } }) => item.securityScore.total)).toFixed(
                    2,
                  )
                : '0.00'}
            </div>
          </div>
        </div>
      </div>

      {/* TVL Distribution - Gelişmiş BarChart */}
      <div className="bg-[#1a1d25] rounded-xl p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
        <h3 className="text-lg font-medium bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text mb-4">
          TVL Distribution
        </h3>
        <div className="h-80">
          <ResponsiveContainer>
            <BarChart data={data}>
              <defs>
                <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
                <filter id="tvlGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <XAxis dataKey="name" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.1)',
                }}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              <Bar dataKey="tvl" fill="url(#tvlGradient)" filter="url(#tvlGlow)" radius={[4, 4, 0, 0]} maxBarSize={50}>
                {data?.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={`url(#tvlGradient-${index})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* TVL Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-[#12141a] rounded-lg p-3 border border-emerald-500/10">
            <div className="text-sm text-gray-400">Average Total Risk</div>
            <div className="text-lg font-bold text-emerald-400">
              {(
                data?.reduce((acc: any, curr: { securityScore: { total: any } }) => acc + curr.securityScore.total, 0) /
                  data?.length || 0
              ).toFixed(2)}
            </div>
          </div>
          <div className="bg-[#12141a] rounded-lg p-3 border border-emerald-500/10">
            <div className="text-sm text-gray-400">Average TVL Risk</div>
            <div className="text-lg font-bold text-emerald-400">
              {(
                data?.reduce((acc: any, curr: { securityScore: { tvl: any } }) => acc + curr.securityScore.tvl, 0) /
                  data?.length || 0
              ).toFixed(2)}
            </div>
          </div>
          <div className="bg-[#12141a] rounded-lg p-3 border border-emerald-500/10">
            <div className="text-sm text-gray-400">Average Maturity Risk</div>
            <div className="text-lg font-bold text-emerald-400">
              {(
                data?.reduce(
                  (acc: any, curr: { securityScore: { maturity: any } }) => acc + curr.securityScore.maturity,
                  0,
                ) / data?.length || 0
              ).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChainAnalysis = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#1a1d25] rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-200 mb-4">Validator Distribution</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="validators" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {data?.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#1a1d25] rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-200 mb-4">Security Metrics</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data?.map((chain: any) => chain.securityMetrics)}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar dataKey="value" stroke="#ec4899" fill="#ec4899" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              fetchCategoryData(category.url);
            }}
            className={`p-4 rounded-xl transition-all duration-300
              ${
                selectedCategory === category.id
                  ? `bg-${category.color}-500/20 border-${category.color}-500/40`
                  : 'bg-[#12141a] border-violet-500/10'
              } 
              border hover:border-${category.color}-500/40
              flex flex-col items-center justify-center gap-2`}
          >
            <span className={`text-${category.color}-500`}>{category.icon}</span>
            <span className="font-medium text-center text-sm">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Analysis Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500" />
        </div>
      ) : (
        data && (
          <div className="space-y-6">
            {selectedCategory === 'assets' && renderAssetAnalysis()}
            {selectedCategory === 'pools' && renderPoolAnalysis()}
            {selectedCategory === 'protocols' && renderProtocolAnalysis()}
            {selectedCategory === 'chains' && renderChainAnalysis()}
            {selectedCategory === 'total' && renderPoolAnalysis()}
          </div>
        )
      )}
    </div>
  );
};

export default AuditPage;
