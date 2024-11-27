export const predefinedColors = [
  {
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)',
  },
  {
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)',
  },
  {
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgb(75, 192, 192)',
    pointBackgroundColor: 'rgb(75, 192, 192)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(75, 192, 192)',
  },
  {
    backgroundColor: 'rgba(255, 205, 86, 0.2)',
    borderColor: 'rgb(255, 205, 86)',
    pointBackgroundColor: 'rgb(255, 205, 86)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 205, 86)',
  },
  {
    backgroundColor: 'rgba(153, 102, 255, 0.2)',
    borderColor: 'rgb(153, 102, 255)',
    pointBackgroundColor: 'rgb(153, 102, 255)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(153, 102, 255)',
  },
  {
    backgroundColor: 'rgba(255, 159, 64, 0.2)',
    borderColor: 'rgb(255, 159, 64)',
    pointBackgroundColor: 'rgb(255, 159, 64)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 159, 64)',
  },
  {
    backgroundColor: 'rgba(201, 203, 207, 0.2)',
    borderColor: 'rgb(201, 203, 207)',
    pointBackgroundColor: 'rgb(201, 203, 207)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(201, 203, 207)',
  },
  {
    backgroundColor: 'rgba(99, 255, 132, 0.2)',
    borderColor: 'rgb(99, 255, 132)',
    pointBackgroundColor: 'rgb(99, 255, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(99, 255, 132)',
  },
  {
    backgroundColor: 'rgba(132, 99, 255, 0.2)',
    borderColor: 'rgb(132, 99, 255)',
    pointBackgroundColor: 'rgb(132, 99, 255)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(132, 99, 255)',
  },
  {
    backgroundColor: 'rgba(255, 132, 99, 0.2)',
    borderColor: 'rgb(255, 132, 99)',
    pointBackgroundColor: 'rgb(255, 132, 99)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 132, 99)',
  },
];

export const mockData = {
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

export const options = {
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
