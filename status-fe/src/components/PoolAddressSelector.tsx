import { useState } from "react";

// components/PoolAddressSelector.tsx
const PoolAddressSelector: React.FC = () => {
    const [selectedChain, setSelectedChain] = useState<string | null>(null);
    const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
    const [selectedPair, setSelectedPair] = useState<string | null>(null);
  
    const chains = [
      { id: 'ethereum', name: 'Ethereum', icon: '🔵' },
      { id: 'polygon', name: 'Polygon', icon: '🟣' },
      { id: 'avalanche', name: 'Avalanche', icon: '🔴' }
    ];
  
    const protocols: { [key: string]: Array<{ id: string; name: string }> } = {
      ethereum: [
        { id: 'uniswap', name: 'Uniswap V3' },
        { id: 'aave', name: 'AAVE' }
      ],
      polygon: [
        { id: 'quickswap', name: 'QuickSwap' },
        { id: 'aave-polygon', name: 'AAVE' }
      ],
      avalanche: [
        { id: 'traderjoe', name: 'Trader Joe' },
        { id: 'aave-avalanche', name: 'AAVE' }
      ]
    };
  
    const pairs = [
      { id: 'usdc-usdt', name: 'USDC/USDT' },
      { id: 'usde-usdt', name: 'USDe/USDT' },
      { id: 'dai-usdc', name: 'DAI/USDC' }
    ];
  
    return (
      <div className="bg-[#1a1d25] rounded-xl p-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text mb-6">
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
                  className={`p-4 rounded-xl transition-all duration-300 text-left
                    ${selectedChain === chain.id 
                      ? 'bg-blue-500/20 border-blue-500/40' 
                      : 'bg-[#12141a] border-violet-500/10'} 
                    border hover:border-blue-500/40 flex items-center space-x-3`}
                >
                  <span>{chain.icon}</span>
                  <span>{chain.name}</span>
                </button>
              ))}
            </div>
          </div>
  
          {/* Protocol Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Select Protocol</h3>
            <div className="flex flex-col space-y-3">
              {selectedChain && protocols[selectedChain].map((protocol) => (
                <button
                  key={protocol.id}
                  onClick={() => {
                    setSelectedProtocol(protocol.id);
                    setSelectedPair(null);
                  }}
                  className={`p-4 rounded-xl transition-all duration-300 text-left
                    ${selectedProtocol === protocol.id 
                      ? 'bg-cyan-500/20 border-cyan-500/40' 
                      : 'bg-[#12141a] border-violet-500/10'} 
                    border hover:border-cyan-500/40`}
                >
                  {protocol.name}
                </button>
              ))}
            </div>
          </div>
  
          {/* Pair Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Select Pair</h3>
            <div className="flex flex-col space-y-3">
              {selectedProtocol && pairs.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => setSelectedPair(pair.id)}
                  className={`p-4 rounded-xl transition-all duration-300 text-left
                    ${selectedPair === pair.id 
                      ? 'bg-teal-500/20 border-teal-500/40' 
                      : 'bg-[#12141a] border-violet-500/10'} 
                    border hover:border-teal-500/40`}
                >
                  {pair.name}
                </button>
              ))}
            </div>
          </div>
        </div>
  
        {/* Selected Pool Info */}
        {selectedChain && selectedProtocol && selectedPair && (
          <div className="mt-8 p-6 bg-[#12141a] rounded-xl border border-blue-500/10">
            <h3 className="text-lg font-medium text-gray-300 mb-4">Selected Pool</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                Chain: {chains.find(c => c.id === selectedChain)?.name}
              </div>
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                Protocol: {protocols[selectedChain].find(p => p.id === selectedProtocol)?.name}
              </div>
              <div className="p-3 bg-teal-500/10 rounded-lg">
                Pair: {pairs.find(p => p.id === selectedPair)?.name}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default PoolAddressSelector;