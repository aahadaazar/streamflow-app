import { useAirdrop, useClaim } from '../hooks';
import { useWallet } from '@solana/wallet-adapter-react';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    airdropId: string;
}

export const AirdropDetails = ({ airdropId }: Props) => {
    const { data, isLoading, error } = useAirdrop(airdropId);
    const { mutate: claim, isPending: isClaiming } = useClaim();
    const { connected } = useWallet();

    const [successData, setSuccessData] = useState<{ amount: string, signature: string } | null>(null);

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center text-red-400">
                {error ? (error as Error).message : 'Airdrop not found'}
            </div>
        );
    }

    const { distributor, userAllocation } = data;

    const handleClaim = () => {
        if (!userAllocation) return;
        claim({
            distributorId: airdropId,
            proof: userAllocation.proof,
            amountUnlocked: userAllocation.amountUnlocked,
            amountLocked: userAllocation.amountLocked,
            claimableAmount: userAllocation.claimableAmount,
        }, {
            onSuccess: (tx: any) => {
                const signature = typeof tx === 'string' 
                    ? tx 
                    : (tx.id || tx.signature || tx.txId || '');
                    
                setSuccessData({
                    amount: userAllocation.claimableAmount.toString(),
                    signature
                });
            }
        });
    };

    return (
        <div className="space-y-6">
            {successData && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 relative">
                    <button 
                        onClick={() => setSuccessData(null)}
                        className="absolute top-4 right-4 text-green-400 hover:text-green-300"
                    >
                        ✕
                    </button>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Claim Successful!</h3>
                    <p className="text-gray-300 mb-4">
                        You have successfully claimed <span className="font-bold text-white">{successData.amount}</span> tokens.
                    </p>
                    <a 
                        href={`https://explorer.solana.com/tx/${successData.signature}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline text-sm"
                    >
                        View transaction on Explorer
                    </a>
                </div>
            )}

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
                <h3 className="text-xl font-semibold mb-4">Airdrop Details</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-400">Mint</p>
                        <p className="font-mono text-sm truncate" title={distributor.mint.toBase58()}>
                            {distributor.mint.toBase58()}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Total Amount</p>
                        <p>{distributor.maxTotalClaim.toString()}</p>
                    </div>
                    <div>
                         <p className="text-sm text-gray-400">Claimed Amount</p>
                         <p>{distributor.totalAmountClaimed.toString()}</p>
                    </div>
                </div>
            </div>

            {userAllocation && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
                    <h3 className="text-xl font-semibold mb-4">Your Allocation</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg">
                            <span className="text-gray-400">Claimable Now</span>
                            <span className="text-2xl font-bold text-green-400">
                                {userAllocation.claimableAmount.toString()}
                            </span>
                        </div>
                        <button
                            onClick={handleClaim}
                            disabled={!connected || userAllocation.claimableAmount.isZero() || isClaiming}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isClaiming && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isClaiming ? 'Claiming...' : 'Claim Tokens'}
                        </button>
                        
                        {!connected && (
                            <p className="text-center text-sm text-yellow-500">
                                Connect wallet to claim
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
