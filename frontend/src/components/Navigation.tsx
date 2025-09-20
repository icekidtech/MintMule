import React from 'react';
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, Grid, User, LogOut } from 'lucide-react';

const Navigation: React.FC = () => {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const location = useLocation();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/mint', label: 'Mint NFT', icon: Plus },
    { path: '/gallery', label: 'Gallery', icon: Grid },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SN</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Simple NFT</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {currentAccount ? (
              <>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">W</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {formatAddress(currentAccount.address)}
                  </span>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </>
            ) : (
              <div className="text-sm text-gray-600">Not connected</div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-gray-50">
        <div className="flex justify-around py-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-3 text-xs ${
                location.pathname === path
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;