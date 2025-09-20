import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface UpdateNFTProps {
  nfts: NFT[];
}

const UpdateNFT: React.FC<UpdateNFTProps> = ({ nfts }) => {
  const [selectedNFT, setSelectedNFT] = useState<string>('');
  const [newDescription, setNewDescription] = useState('');
  const [updating, setUpdating] = useState(false);

  // Mock NFTs for demo
  const mockNFTs = [
    { 
      id: '1', 
      name: 'Cosmic Warrior', 
      description: 'A legendary warrior from the cosmic realm',
      imageUrl: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=100' 
    },
    { 
      id: '2', 
      name: 'Digital Phoenix', 
      description: 'Reborn from digital ashes',
      imageUrl: 'https://images.pexels.com/photos/7130506/pexels-photo-7130506.jpeg?auto=compress&cs=tinysrgb&w=100' 
    }
  ];

  const displayNFTs = nfts.length > 0 ? nfts : mockNFTs;
  const selectedNFTData = displayNFTs.find(nft => nft.id === selectedNFT);

  const handleNFTSelect = (nftId: string) => {
    setSelectedNFT(nftId);
    const nft = displayNFTs.find(n => n.id === nftId);
    if (nft) {
      setNewDescription(nft.description);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedNFT || !newDescription.trim()) {
      toast.error('Please select an NFT and enter a new description');
      return;
    }

    setUpdating(true);
    
    try {
      // Simulate update process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('NFT metadata updated successfully!');
      setSelectedNFT('');
      setNewDescription('');
      
    } catch (error) {
      toast.error('Update failed. Please try again.');
    } finally {
      setUpdating(false);
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
            <Edit3 className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-white">Update NFT Metadata</h1>
            <p className="text-slate-400">Edit your NFT's description</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Select NFT to Update *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                onClick={() => handleNFTSelect(nft.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-600 flex-shrink-0">
                    <img 
                      src={nft.imageUrl} 
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{nft.name}</h3>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">{nft.description}</p>
                  </div>
                  {selectedNFT === nft.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#215184] flex-shrink-0" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {selectedNFTData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Current Description
                </label>
                <div className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                  <p className="text-slate-400 text-sm">{selectedNFTData.description}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  New Description *
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter new description..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-[#215184] focus:ring-2 focus:ring-[#215184]/20 transition-all duration-200 resize-none"
                  disabled={updating}
                />
              </div>

              <motion.button
                type="submit"
                disabled={updating || !newDescription.trim() || newDescription === selectedNFTData.description}
                className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#215184] to-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-[#1a4066] hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={updating ? {} : { scale: 1.02 }}
                whileTap={updating ? {} : { scale: 0.98 }}
              >
                {updating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Save className="w-6 h-6" />
                    </motion.div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    <span>Update Description</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UpdateNFT;