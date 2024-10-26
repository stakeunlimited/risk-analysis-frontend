// pages/AuditPage.tsx
import React, { useState } from 'react';
import { Database, Lock, CircleDollarSign, Layers, Link } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import PoolAddressSelector from '../components/PoolAddressSelector';
interface CategoryButton {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  url: string;
}

const categories: CategoryButton[] = [
  {
    id: 'assets',
    name: 'Assets',
    icon: <CircleDollarSign className="w-6 h-6" />,
    color: 'violet',
    url: 'https://defi-risk-analysis.vercel.app/risk/assets'
  },
  {
    id: 'pools',
    name: 'Pools',
    icon: <Database className="w-6 h-6" />,
    color: 'blue',
    url: 'https://defi-risk-analysis.vercel.app/risk/pools'
  },
  {
    id: 'protocols',
    name: 'Protocols',
    icon: <Lock className="w-6 h-6" />,
    color: 'emerald',
    url: 'https://defi-risk-analysis.vercel.app/risk/protocols'
  },
  {
    id: 'chains',
    name: 'Chains',
    icon: <Layers className="w-6 h-6" />,
    color: 'pink',
    url: 'https://defi-risk-analysis.vercel.app/risk/chains'
  },
  {
    id: 'total',
    name: 'Pool Address Total',
    icon: <Link className="w-6 h-6" />,
    color: 'orange',
    url: 'https://defi-risk-analysis.vercel.app/risk?poolAddress=0x2f1DA4bafd5f2508EC2e2E425036063A374993B6'
  }
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
      setData(result);
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
              <Pie
                data={data}
                dataKey="risk"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
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

    const renderPoolAnalysis = () => (
        <PoolAddressSelector />
      );
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
    </div>
  

  const renderProtocolAnalysis = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#1a1d25] rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-200 mb-4">Security Metrics</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar name="Security Score" dataKey="securityScore" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-[#1a1d25] rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-200 mb-4">TVL Distribution</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tvl" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
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
              <Pie
                data={data}
                dataKey="validators"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
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
              ${selectedCategory === category.id 
                ? `bg-${category.color}-500/20 border-${category.color}-500/40` 
                : 'bg-[#12141a] border-violet-500/10'} 
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
      ) : data && (
        <div className="space-y-6">
          {selectedCategory === 'assets' && renderAssetAnalysis()}
          {selectedCategory === 'pools' && renderPoolAnalysis()}
          {selectedCategory === 'protocols' && renderProtocolAnalysis()}
          {selectedCategory === 'chains' && renderChainAnalysis()}
          {selectedCategory === 'total' && renderPoolAnalysis()}
        </div>
      )}
    </div>
  );
};

export default AuditPage;
