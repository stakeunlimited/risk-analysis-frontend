import { Chart, Filler, LineElement, PointElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

const HomePage: React.FC = () => {
  Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

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
