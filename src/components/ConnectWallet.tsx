import { type FC } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const ConnectWallet: FC = () => {
    return (
        <div className="flex justify-end p-4">
            <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 transition-colors" />
        </div>
    );
};
