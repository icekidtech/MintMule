import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';
import { useWallet } from '@mysten/wallet-adapter-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

const MintNFT: React.FC = () => {
  const { signAndExecuteTransactionBlock } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: ''
  });
  const [minting, setMinting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const triggerSuccessAnimation = () => {
    // Confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#215184', '#3B82F6', '#60A5FA', '#93C5FD']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#215184', '#3B82F6']
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#215184', '#3B82F6']
      });
    }, 400);
  };

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || !formData.imageUrl.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setMinting(true);
    
    try {
      // Simulate minting process for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with your actual Sui smart contract
      // const txb = new TransactionBlock();
      // txb.moveCall({
      //   target: `${PACKAGE_ID}::nft::mint`,
      //   arguments: [
      //     txb.pure(formData.name),
      //     txb.pure(formData.description),
      //     txb.pure(formData.imageUrl)
      //   ]
      // });
      // await signAndExecuteTransactionBlock({ transactionBlock: txb });
      
      triggerSuccessAnimation();
      toast.success('NFT minted successfully! 🎉');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        imageUrl: ''
      });
      
    } catch (error) {
      console.error('Minting failed:', error);
      toast.error('Failed to mint NFT. Please try again.');
    } finally {
      setMinting(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-8">
          <motion.div
            className="p-2 bg-gradient-to-r from-[#215184] to-blue-600 rounded-lg"
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-white">Mint Your NFT</h1>
            <p className="text-slate-400">Create a unique digital collectible</p>
          </div>
        </div>

        <form onSubmit={handleMint} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-slate-300 mb-2">
                NFT Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter NFT name"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-[#215184] focus:ring-2 focus:ring-[#215184]/20 transition-all duration-200"
                disabled={minting}
              />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-[#215184] focus:ring-2 focus:ring-[#215184]/20 transition-all duration-200"
                disabled={minting}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your NFT..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-[#215184] focus:ring-2 focus:ring-[#215184]/20 transition-all duration-200 resize-none"
              disabled={minting}
            />
          </motion.div>

          {/* Preview */}
          {formData.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="border border-slate-600 rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="aspect-square w-full max-w-xs mx-auto mb-4 rounded-lg overflow-hidden bg-slate-600">
                  <img 
                    src={formData.imageUrl}
                    alt="NFT Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-slate-400">
                          <div class="text-center">
                            <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                            </svg>
                            <p class="text-sm">Invalid image URL</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
                <h4 className="text-white font-semibold mb-2">{formData.name || 'NFT Name'}</h4>
                <p className="text-slate-400 text-sm">{formData.description || 'NFT Description'}</p>
              </div>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={minting || !formData.name.trim() || !formData.description.trim() || !formData.imageUrl.trim()}
            className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#215184] to-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-[#1a4066] hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            whileHover={minting ? {} : { scale: 1.02 }}
            whileTap={minting ? {} : { scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {minting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-6 h-6" />
                </motion.div>
                <span>Minting NFT...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                <span>Mint NFT</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default MintNFT;