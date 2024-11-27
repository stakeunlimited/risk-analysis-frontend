import { Chart, Filler, LineElement, PointElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { AssetRisk, ChainRisk, PoolRisk, ProtocolRisk } from '../types';
import { useEffect, useState } from 'react';
import { mockData, options, predefinedColors } from '../data/home';

const HomePage: React.FC = () => {
  Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

  const apiUrl = `https://defi-risk-analysis.vercel.app`;

  type Dataset = {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointHoverBackgroundColor: string;
    pointHoverBorderColor: string;
  };

  type ChartData = {
    labels: string[];
    datasets: Dataset[];
  };

  const getColorForDataset = (index: number) => predefinedColors[index % predefinedColors.length];

  const [data, setData] = useState<ChartData>(mockData);

  const fetchRisk = async <T extends 'chain' | 'protocol' | 'pool' | 'asset'>(type: T) => {
    try {
      const url = {
        chain: `${apiUrl}/risk/chains`,
        protocol: `${apiUrl}/risk/protocols`,
        pool: `${apiUrl}/risk/pools`,
        asset: `${apiUrl}/risk/assets`,
      };
      type ReturnTypeMap = {
        chain: ChainRisk;
        protocol: ProtocolRisk;
        pool: PoolRisk;
        asset: AssetRisk;
      };
      const response = await fetch(url[type]);
      const dataRaw = await response.json();
      return dataRaw as ReturnTypeMap[T][];
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('API Error');
    }
  };

  const main = async () => {
    const chainData = await fetchRisk('chain');
    const protocolData = await fetchRisk('protocol');
    const poolData = await fetchRisk('pool');
    const assetData = await fetchRisk('asset');

    const datasets: Dataset[] = [];

    const data = {
      labels: [
        'Chain Maturity Risk',
        'Chain Market Cap Risk',

        'Protocol TVL Risk',
        'Protocol Maturity Risk',

        'Pair TVL Risk',
        'Pair Maturity Risk',

        'Asset Maturity Risk',
        'Asset Market Cap Risk',
        'Asset Volatility Risk',
      ],
      datasets,
    };

    poolData.forEach((pool, index) => {
      const protocol = protocolData.find((protocol) => protocol.id === pool.platformId) as ProtocolRisk;
      const chain = chainData.find((chain) => chain.id === protocol.chainId) as ChainRisk;
      const [asset1Name, asset2Name] = pool.name.split(' / ');
      let asset1 = assetData.find((asset) => asset.symbol === asset1Name) as AssetRisk;
      if (!asset1) {
        asset1 = assetData.find((asset) => asset.symbol === asset1Name.split('.')[0]) as AssetRisk;
      }
      let asset2 = assetData.find((asset) => asset.symbol === asset2Name) as AssetRisk;
      if (!asset2) {
        asset2 = assetData.find((asset) => asset.symbol === asset2Name.split('.')[0]) as AssetRisk;
      }

      data.datasets.push({
        label: pool.name,
        data: [
          chain.risks.maturity,
          chain.risks.marketCap,
          protocol.risks.tvl,
          protocol.risks.maturity,
          pool.risks.tvl,
          pool.risks.maturity,
          (asset1.risks.maturity + asset2.risks.maturity) / 2,
          (asset1.risks.marketCap + asset2.risks.marketCap) / 2,
          (asset1.risks.volatility + asset2.risks.volatility) / 2,
        ],
        fill: true,
        ...getColorForDataset(index),
      });
    });

    console.log('Datasets:', datasets);
    setData(data);
    // console.log('Chain Data:', chainData);
    // console.log('Protocol Data:', protocolData);
    // console.log('Pool Data:', poolData);
    // console.log('Asset Data:', assetData);
  };

  useEffect(() => {
    main();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
          {/* TVL Chart */}
          <div className="bg-[#fbfbfb] rounded-xl p-6 border max-w-screen-lg border-violet-500/10">
            <Radar data={data} options={options} />
          </div>
        </div>
      </main>
    </main>
  );
};

export default HomePage;
