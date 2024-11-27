import { Chart, Filler, LineElement, PointElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { AssetRisk, ChainRisk, PoolRisk, ProtocolRisk } from '../types';
import { useEffect, useState } from 'react';

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

  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

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

    poolData.forEach((pool) => {
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
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
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

  const data2 = {
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
    datasets: [
      {
        label: 'DAI / USDC on Uniswap V3 Ethereum',
        data: [1, 1, 1, 1, 4, 1, 1, 1.5, 1.726327332],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'DAI.e / USDC on TraderJoe V2 Avalanche',
        data: [2, 2, 3, 1, 5, 2, 1, 1.5, 1.726327332],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'USDT / cUSD on Uniswap V3 Celo',
        data: [1, 5, 1, 1, 5, 4, 1.5, 3, 3.349583194],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
        tooltip: {
          bodyFont: {
            size: 14, // Set font size for tooltip body
          },
          titleFont: {
            size: 14, // Set font size for tooltip title
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3, // Custom line width
      },
    },
    scales: {
      r: {
        min: 0, // Center value
        max: 5, // Outer value
        ticks: {
          stepSize: 1, // Increment steps between number
          font: {
            size: 14, // Set font size for radial ticks
          },
        },
        pointLabels: {
          font: {
            size: 14, // Set font size for axis labels
          },
        },
      },
    },
  };

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
