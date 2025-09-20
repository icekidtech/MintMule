import { useWallet } from '@mysten/wallet-adapter-react';

export function WalletButton() {
  const { wallet, connected, connect, disconnect, wallets } = useWallet();

  if (connected) {
    return (
      <button onClick={disconnect}>
        Disconnect {wallet?.name}
      </button>
    );
  }

  return (
    <div>
      {wallets.map((wallet) => (
        <button
          key={wallet.name}
          onClick={() => connect(wallet.name)}
        >
          Connect {wallet.name}
        </button>
      ))}
    </div>
  );
}