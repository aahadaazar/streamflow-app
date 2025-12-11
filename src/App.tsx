import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletContextProvider } from './wallet/WalletContextProvider';
import { ConnectWallet } from './components/ConnectWallet';
import { AirdropLookup } from './features/airdrop/components/AirdropLookup';
import { AirdropDetails } from './features/airdrop/components/AirdropDetails';

const queryClient = new QueryClient();

function App() {
  const [airdropId, setAirdropId] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <WalletContextProvider>
        <div className="min-h-screen bg-gray-900 text-white">
          <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Streamflow Claim
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                  Devnet
                </span>
              </div>
              <ConnectWallet />
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center py-12">
                <h2 className="text-3xl font-bold mb-4">Claim your Airdrop</h2>
                <p className="text-gray-400">
                  Enter your Airdrop ID to check eligibility and claim your tokens.
                </p>
              </div>
              
              <AirdropLookup onLookup={setAirdropId} />
              
              {airdropId && <AirdropDetails airdropId={airdropId} />}
            </div>
          </main>
        </div>
      </WalletContextProvider>
    </QueryClientProvider>
  );
}

export default App;
