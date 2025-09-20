import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Grid3X3, 
  Send, 
  Edit3, 
  Sparkles, 
  ArrowLeft,
  Image as ImageIcon,
  User,
  Calendar,
  Hash,
  Coins,
  Trophy
} from 'lucide-react';
import toast from 'react-hot-toast';
import WalletConnect from './WalletConnect';
import MintNFT from './MintNFT';
import TransferNFT from './TransferNFT';
import UpdateNFT from './UpdateNFT';
import NFTGrid from './NFTGrid';

const Dashboard: React.FC = () => {
  const currentAccount = useCurrentAccount();
  const suiClient = useSuiClient();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mint');
  const [userNFTs, setUserNFTs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentAccount) {
      fetchUserNFTs();
    }
  }, [currentAccount]);

  useEffect(() => {
    if (!currentAccount) {
      navigate('/');
    }
  }, [currentAccount, navigate]);

  const fetchUserNFTs = async () => {
    if (!currentAccount) {
      setLoading(false);
      return;
    }
    
    try {
      // Fetch owned objects (NFTs) for the current account
      const objects = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        filter: {
          StructType: '0x2::devnet_nft::DevNetNFT', // Replace with your actual NFT type
        },
      });

      const nftDetails = await Promise.all(
        objects.data.map(async (obj) => {
          const object = await suiClient.getObject({
            id: obj.data?.objectId!,
            options: { showContent: true },
          });
          return object.data?.content;
        })
      );

      setUserNFTs(nftDetails.filter(Boolean));
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      toast.error('Failed to load NFTs');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'mint', label: 'Mint NFT', icon: Plus },
    { id: 'collection', label: 'My NFTs', icon: Grid3X3 },
    { id: 'transfer', label: 'Transfer', icon: Send },
    { id: 'update', label: 'Update', icon: Edit3 }
  ];

  if (!currentAccount) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please connect your wallet</h2>
          <Link to="/" className="text-[#215184] hover:text-blue-400 transition-colors">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.header 
        className="flex justify-between items-center px-6 lg:px-12 py-6 border-b border-slate-700/50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-r from-[#215184] to-blue-500 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#215184] to-blue-400 bg-clip-text text-transparent">
              MintMule Dashboard
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-slate-300 text-sm">Connected as</p>
          <p className="text-white font-mono text-sm">
            {currentAccount.address.slice(0, 6)}...{currentAccount.address.slice(-4)}
          </p>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Stats Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Coins className="w-8 h-8 text-[#215184]" />
              <h3 className="text-lg font-semibold text-white">Total NFTs</h3>
            </div>
            <p className="text-3xl font-bold text-[#215184]">{userNFTs.length}</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Trophy className="w-8 h-8 text-[#215184]" />
              <h3 className="text-lg font-semibold text-white">Collections</h3>
            </div>
            <p className="text-3xl font-bold text-[#215184]">1</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-8 h-8 text-[#215184]" />
              <h3 className="text-lg font-semibold text-white">Minted Today</h3>
            </div>
            <p className="text-3xl font-bold text-[#215184]">0</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-[#215184] to-blue-500 hover:from-[#1a4068] hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <Plus className="w-6 h-6 inline mr-2" />
            Mint New NFT
          </motion.button>
        </motion.div>

        {/* NFTs Grid */}
        <motion.div 
          className="mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your NFTs</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#215184] mx-auto"></div>
              <p className="text-slate-400 mt-4">Loading your NFTs...</p>
            </div>
          ) : userNFTs.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No NFTs yet</h3>
              <p className="text-slate-400 mb-6">Start by minting your first NFT!</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-[#215184] to-blue-500 hover:from-[#1a4068] hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                Mint Your First NFT
              </motion.button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userNFTs.map((nft, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-colors"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="aspect-square bg-slate-700 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-slate-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{nft?.name || 'Unnamed NFT'}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{nft?.description || 'No description'}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">ID: {nft?.id?.slice(-8)}</span>
                      <button className="text-[#215184] hover:text-blue-400 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;