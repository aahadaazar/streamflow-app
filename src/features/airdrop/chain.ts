import { SolanaDistributorClient } from "@streamflow/distributor/solana";
import { PublicKey } from '@solana/web3.js';
import { ICluster } from '@streamflow/common';
import BN from 'bn.js';

const CLUSTER_URL = 'https://api.devnet.solana.com';

export const getStreamflowClient = () => {
  return new SolanaDistributorClient({
    clusterUrl: CLUSTER_URL,
    cluster: ICluster.Devnet,
    apiUrl: 'https://api.devnet.streamflow.finance',
  });
};

export interface UserAllocation {
    amountUnlocked: BN;
    amountLocked: BN;
    claimableAmount: BN;
    proof: number[][];
}

export interface AirdropDetails {
    distributor: any; 
    userAllocation?: UserAllocation;
}

export const getAirdrop = async (id: string, wallet?: PublicKey): Promise<AirdropDetails> => {
    const client = getStreamflowClient();
    
    const distributors = await client.getDistributors({ ids: [id] });
    const distributor = distributors[0];
    
    if (!distributor) {
        throw new Error('Airdrop not found');
    }

    let userAllocation: UserAllocation | undefined;

    if (wallet) {
        userAllocation = {
            amountUnlocked: new BN(distributor.totalAmountUnlocked), 
            amountLocked: new BN(distributor.totalAmountLocked),
            claimableAmount: new BN(distributor.totalClaimablePreUpdate),
            proof: [], 
        };
    }

    return {
        distributor,
        userAllocation
    };
};

export const claimAirdrop = async (
    distributorId: string, 
    proof: number[][], 
    amountUnlocked: BN, 
    amountLocked: BN,
    claimableAmount: BN,
    wallet: any 
) => {
    const client = getStreamflowClient();
    const claimData = {
        id: distributorId,
        amountUnlocked,
        amountLocked,
        claimableAmount,
        proof,
    };
    
    const tx = await client.claim(claimData, {
        invoker: wallet,
    });
    
    return tx;
};
