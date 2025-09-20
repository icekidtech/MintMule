import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "What is MintMule?",
      answer: "MintMule is a powerful NFT platform built on the Sui blockchain that allows users to mint, collect, transfer, and update unique digital assets with lightning-fast transactions and minimal fees."
    },
    {
      question: "How do I connect my wallet?",
      answer: "Click the 'Connect Wallet' button on the homepage and select your preferred Sui-compatible wallet from the dropdown menu. Make sure you have a Sui wallet extension installed in your browser."
    },
    {
      question: "What wallets are supported?",
      answer: "MintMule supports all major Sui wallets including Sui Wallet, Ethos Wallet, Suiet, and other Sui-compatible wallet extensions."
    },
    {
      question: "How much does it cost to mint an NFT?",
      answer: "Minting costs depend on the current Sui network gas fees, which are typically very low (usually less than $0.01). There are no additional platform fees for minting."
    },
    {
      question: "Can I update my NFT after minting?",
      answer: "Yes! As the creator of an NFT, you can update the description metadata of your NFTs at any time through the dashboard's Update section."
    },
    {
      question: "How do I transfer my NFT to someone else?",
      answer: "Go to the Transfer section in your dashboard, select the NFT you want to transfer, enter the recipient's Sui address, and confirm the transaction."
    },
    {
      question: "What file formats are supported for NFT images?",
      answer: "You can use any publicly accessible image URL. We recommend using JPEG, PNG, or GIF formats hosted on reliable services like IPFS, Arweave, or other decentralized storage solutions."
    },
    {
      question: "Is my NFT ownership secure?",
      answer: "Absolutely! All NFTs are secured by the Sui blockchain's robust consensus mechanism. Your ownership is cryptographically verified and cannot be altered without your private key."
    },
    {
      question: "Can I sell my NFTs on other marketplaces?",
      answer: "Yes! NFTs minted on MintMule are standard Sui NFTs that can be traded on any Sui-compatible NFT marketplace."
    },
    {
      question: "What happens if I lose access to my wallet?",
      answer: "If you lose access to your wallet, you'll lose access to your NFTs. Always backup your seed phrase securely and never share it with anyone. Consider using hardware wallets for additional security."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.header 
        className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
              
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-r from-[#215184] to-blue-500 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <HelpCircle className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-xl font-bold text-white">FAQ</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Find answers to common questions about MintMule and NFT creation on Sui blockchain
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <motion.button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                whileHover={{ backgroundColor: "rgba(51, 65, 85, 0.3)" }}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 border-t border-slate-700">
                      <p className="text-slate-300 leading-relaxed pt-4">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-slate-400 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <motion.button
              onClick={() => navigate('/support')}
              className="bg-gradient-to-r from-[#215184] to-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-[#1a4066] hover:to-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;