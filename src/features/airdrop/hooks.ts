import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useWallet } from '@solana/wallet-adapter-react';
import { getAirdrop, claimAirdrop } from './chain';
import BN from 'bn.js';

export const useAirdrop = (id: string) => {
    const { publicKey } = useWallet();

    return useQuery({
        queryKey: ['airdrop', id, publicKey?.toBase58()],
        queryFn: () => getAirdrop(id, publicKey || undefined),
        enabled: !!id,
        retry: false,
    });
};

export const useClaim = () => {
    const { wallet } = useWallet();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ 
            distributorId, 
            proof, 
            amountUnlocked, 
            amountLocked,
            claimableAmount
        }: { 
            distributorId: string; 
            proof: number[][]; 
            amountUnlocked: BN; 
            amountLocked: BN;
            claimableAmount: BN;
        }) => {
            if (!wallet) throw new Error('Wallet not connected');
            return claimAirdrop(distributorId, proof, amountUnlocked, amountLocked, claimableAmount, wallet.adapter);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['airdrop', variables.distributorId] });
        },
    });
};
