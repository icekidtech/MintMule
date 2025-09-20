import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Calendar, User } from 'lucide-react';

interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  creator: string;
  createdAt: string;
}

interface NFTGridProps {
  nfts: NFT[];
}

const NFTGrid: React.FC<NFTGridProps> = ({ nfts }) => {
  // Mock data for demonstration
  const mockNFTs: NFT[] = [
    {
      id: '1',
      name: 'Cosmic Warrior',
      description: 'A legendary warrior from the cosmic realm',
      imageUrl: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=400',
      creator: '0x1234...abcd',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Digital Phoenix',
      description: 'Reborn from digital ashes',
      imageUrl: 'https://images.pexels.com/photos/7130506/pexels-photo-7130506.jpeg?auto=compress&cs=tinysrgb&w=400',
      creator: '0x5678...efgh',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      name: 'Neon Dreams',
      description: 'A vibrant journey through neon lights',
      imageUrl: 'https://images.pexels.com/photos/7130507/pexels-photo-7130507.jpeg?auto=compress&cs=tinysrgb&w=400',
      creator: '0x9abc...ijkl',
      createdAt: '2024-01-13'
    }
  ];

  const displayNFTs = nfts.length > 0 ? nfts : mockNFTs;

  if (displayNFTs.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-slate-400"
        >
          <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No NFTs Found</h3>
          <p>Start minting your first NFT to see it here!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white mb-2">My NFT Collection</h1>
        <p className="text-slate-400">Your unique digital assets</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {displayNFTs.map((nft, index) => (
          <motion.div
            key={nft.id}
            className="bg-slate-700 rounded-xl overflow-hidden border border-slate-600 hover:border-[#215184] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(33, 81, 132, 0.4)"
            }}
          >
            <div className="aspect-square overflow-hidden bg-slate-600">
              <motion.img
                src={nft.imageUrl}
                alt={nft.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center text-slate-400">
                      <div class="text-center">
                        <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                        </svg>
                        <p class="text-sm">Image not available</p>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>

            <div className="p-4">
              <h3 className="text-white font-bold text-lg mb-2 truncate">{nft.name}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{nft.description}</p>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{nft.createdAt}</span>
                </div>
              </div>

              <motion.button
                className="w-full mt-4 bg-gradient-to-r from-[#215184] to-blue-600 text-white py-2 rounded-lg font-medium hover:from-[#1a4066] hover:to-blue-700 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default NFTGrid;