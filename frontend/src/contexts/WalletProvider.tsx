import { WalletProvider } from '@mysten/wallet-adapter-react';
import { WalletStandardAdapterProvider } from '@mysten/wallet-adapter-wallet-standard';

export function SuiWalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WalletStandardAdapterProvider>
      <WalletProvider>
        {children}
      </WalletProvider>
    </WalletStandardAdapterProvider>
  );
}