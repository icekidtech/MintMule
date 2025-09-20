import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { Sparkles, Zap, Shield, Users } from 'lucide-react';
import WalletConnect from './WalletConnect';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();

  React.useEffect(() => {
    if (currentAccount) {
      navigate('/dashboard');
    }
  }, [currentAccount, navigate]);

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Mint Unique NFTs",
      description: "Create one-of-a-kind digital assets with custom metadata and imagery"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Built on Sui blockchain for ultra-fast transactions and low fees"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Ownership",
      description: "True ownership with transparent blockchain verification"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Transfer & Trade",
      description: "Seamlessly transfer your NFTs to other collectors"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#215184] opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav 
          className="flex justify-between items-center px-6 lg:px-12 py-6 border-b border-slate-700/50"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-r from-[#215184] to-blue-500 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#215184] to-blue-400 bg-clip-text text-transparent">
              MintMule
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link to="/support" className="text-slate-300 hover:text-white transition-colors">
              Support
            </Link>
          </div>
          
          <WalletConnect />
        </motion.nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-white mb-6"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Create & Collect
              <span className="block bg-gradient-to-r from-[#215184] to-blue-400 bg-clip-text text-transparent">
                Extraordinary NFTs
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-300 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              The most powerful NFT platform on Sui blockchain. Mint, collect, and trade 
              unique digital assets with lightning speed and minimal fees.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <WalletConnect size="large" />
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center"
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(33, 81, 132, 0.3)"
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + (index * 0.1), type: "spring", stiffness: 400 }}
              >
                <motion.div 
                  className="text-[#215184] mb-4 flex justify-center"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div>
              <motion.div 
                className="text-4xl font-bold text-[#215184] mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                1000+
              </motion.div>
              <p className="text-slate-400">NFTs Minted</p>
            </div>
            <div>
              <motion.div 
                className="text-4xl font-bold text-[#215184] mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                500+
              </motion.div>
              <p className="text-slate-400">Active Creators</p>
            </div>
            <div>
              <motion.div 
                className="text-4xl font-bold text-[#215184] mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                &lt;1s
              </motion.div>
              <p className="text-slate-400">Transaction Time</p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="border-t border-slate-700 pt-12 mt-20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-[#215184] to-blue-500 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-xl font-bold bg-gradient-to-r from-[#215184] to-blue-400 bg-clip-text text-transparent">
                    MintMule
                  </span>
                </div>
                <p className="text-slate-400 text-sm">
                  The most powerful NFT platform on Sui blockchain for creating and trading unique digital assets.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Platform</h4>
                <div className="space-y-2">
                  <Link to="/dashboard" className="block text-slate-400 hover:text-white transition-colors text-sm">
                    Dashboard
                  </Link>
                  <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                    Marketplace
                  </a>
                  <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                    Collections
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <div className="space-y-2">
                  <Link to="/faq" className="block text-slate-400 hover:text-white transition-colors text-sm">
                    FAQ
                  </Link>
                  <Link to="/support" className="block text-slate-400 hover:text-white transition-colors text-sm">
                    Contact Support
                  </Link>
                  <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                    Documentation
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Community</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                    Discord
                  </a>
                  <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                    Twitter
                  </a>
                  <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-700 pt-8 text-center">
              <p className="text-slate-400 text-sm">
                © 2024 MintMule. All rights reserved. Built on Sui blockchain.
              </p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default LandingPage;