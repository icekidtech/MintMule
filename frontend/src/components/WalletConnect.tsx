import React from 'react';
import { ConnectButton } from '@mysten/dapp-kit';
import { motion } from 'framer-motion';

interface WalletConnectProps {
  size?: 'small' | 'large';
}

const WalletConnect: React.FC<WalletConnectProps> = ({ size = 'small' }) => {
  const isLarge = size === 'large';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={isLarge ? 'inline-block' : ''}
    >
      <ConnectButton
        connectText="Connect Wallet"
        className={`
          ${isLarge 
            ? 'px-12 py-4 text-lg font-semibold' 
            : 'px-6 py-2 text-sm font-medium'
          }
          bg-gradient-to-r from-[#215184] to-blue-500 
          hover:from-[#1a4068] hover:to-blue-600
          text-white rounded-xl border border-blue-400/20
          transition-all duration-300 shadow-lg 
          hover:shadow-xl hover:shadow-blue-500/20
          backdrop-blur-sm
        `}
      />
    </motion.div>
  );
};

export default WalletConnect;