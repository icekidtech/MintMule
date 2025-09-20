import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface NFT {
  id: string;
  name: string;
  imageUrl: string;
}

interface TransferNFTProps {
  nfts: NFT[];
}

const TransferNFT: React.FC<TransferNFTProps> = ({ nfts }) => {
  const [selectedNFT, setSelectedNFT] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferring, setTransferring] = useState(false);

  // Mock NFTs for demo
  const mockNFTs = [
    { id: '1', name: 'Cosmic Warrior', imageUrl: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: '2', name: 'Digital Phoenix', imageUrl: 'https://images.pexels.com/photos/7130506/pexels-photo-7130506.jpeg?auto=compress&cs=tinysrgb&w=100' }
  ];

  const displayNFTs = nfts.length > 0 ? nfts : mockNFTs;

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedNFT || !recipientAddress.trim()) {
      toast.error('Please select an NFT and enter recipient address');
      return;
    }

    setTransferring(true);
    
    try {
      // Simulate transfer process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('NFT transferred successfully!');
      setSelectedNFT('');
      setRecipientAddress('');
      
    } catch (error) {
      toast.error('Transfer failed. Please try again.');
    } finally {
      setTransferring(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="p-2 bg-gradient-to-r from-[#215184] to-blue-600 rounded-lg"
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <Send className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-white">Transfer NFT</h1>
            <p className="text-slate-400">Send your NFT to another address</p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleTransfer} className="space-y-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Select NFT to Transfer *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayNFTs.map((nft) => (
              <motion.div
                key={nft.id}
                className={`
                  relative p-4 border rounded-xl cursor-pointer transition-all duration-200
                  ${selectedNFT === nft.id 
                    ? 'border-[#215184] bg-[#215184]/10 shadow-lg' 
                    : 'border-slate-600 hover:border-slate-500'
                  }
                `}
                onClick={() => setSelectedNFT(nft.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-600">
                    <img 
                      src={nft.imageUrl} 
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium truncate">{nft.name}</h3>
                    <p className="text-slate-400 text-sm">NFT #{nft.id}</p>
                  </div>
                  {selectedNFT === nft.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#215184]" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Recipient Address *
          </label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-[#215184] focus:ring-2 focus:ring-[#215184]/20 transition-all duration-200"
            disabled={transferring}
          />
        </motion.div>

        {selectedNFT && recipientAddress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-700 border border-slate-600 rounded-lg p-4"
          >
            <h3 className="text-white font-semibold mb-3">Transfer Summary</h3>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400">From:</span>
                <span className="text-white">Your Wallet</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#215184]" />
              <div className="flex items-center space-x-2">
                <span className="text-slate-400">To:</span>
                <span className="text-white font-mono text-xs">
                  {recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={transferring || !selectedNFT || !recipientAddress.trim()}
          className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#215184] to-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-[#1a4066] hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          whileHover={transferring ? {} : { scale: 1.02 }}
          whileTap={transferring ? {} : { scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {transferring ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Send className="w-6 h-6" />
              </motion.div>
              <span>Transferring...</span>
            </>
          ) : (
            <>
              <Send className="w-6 h-6" />
              <span>Transfer NFT</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default TransferNFT;