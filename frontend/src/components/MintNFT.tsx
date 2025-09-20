import React, { useState } from 'react';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import Navigation from './Navigation'; // Adjust the import based on your file structure

interface MintNFTProps {
  packageId: string;
}

const MintNFT: React.FC<MintNFTProps> = ({ packageId }) => {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    recipient: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [mintStatus, setMintStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'NFT name is required';
    if (!formData.description.trim()) return 'Description is required';
    if (!formData.imageUrl.trim()) return 'Image URL is required';
    if (!formData.recipient.trim()) return 'Recipient address is required';
    
    // Basic URL validation
    try {
      new URL(formData.imageUrl);
    } catch {
      return 'Please enter a valid image URL';
    }
    
    return null;
  };

  const handleMint = async () => {
    if (!currentAccount) {
      setErrorMessage('Please connect your wallet first');
      return;
    }
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setMintStatus('error');
      return;
    }
    setIsLoading(true);
    setMintStatus('idle');
    setErrorMessage('');
    try {
      const txb = new Transaction();
      txb.moveCall({
        target: `${packageId}::simple_nft::mint_nft`,
        arguments: [
          txb.pure.string(formData.name),
          txb.pure.string(formData.description),
          txb.pure.string(formData.imageUrl),
          txb.pure.address(formData.recipient),
        ],
      });
      signAndExecute(
        {
          transaction: txb,
          options: {
            showEffects: true,
            showObjectChanges: true,
          },
        },
        {
          onSuccess: (result) => {
            setMintStatus('success');
            setFormData({ name: '', description: '', imageUrl: '', recipient: '' });
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            console.log('Mint successful:', result);
          },
          onError: (error) => {
            setMintStatus('error');
            setErrorMessage(error.message || 'Minting failed');
            console.error('Mint error:', error);
          },
        },
      );
    } catch (error) {
      setMintStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', imageUrl: '', recipient: '' });
    setMintStatus('idle');
    setErrorMessage('');
  };

  return (
    <div>
      <Navigation /> {/* Add Navigation */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-8">
            <Upload className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Mint New NFT</h2>
          </div>

          {mintStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-green-800 font-medium">NFT minted successfully!</p>
                <p className="text-green-600 text-sm">Your NFT has been created and transferred to the recipient.</p>
              </div>
            </div>
          )}

          {mintStatus === 'error' && errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-red-800 font-medium">Minting failed</p>
                <p className="text-red-600 text-sm">{errorMessage}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NFT Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter NFT name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your NFT"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.png"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
              {formData.imageUrl && (
                <div className="mt-3">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Address *
              </label>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleInputChange}
                placeholder={currentAccount?.address || "0x..."}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
                disabled={isLoading}
              />
              {currentAccount && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, recipient: currentAccount.address }))}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Use my address
                </button>
              )}
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={handleMint}
              disabled={isLoading || !currentAccount}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Minting...</span>
                </>
              ) : (
                <span>Mint NFT</span>
              )}
            </button>
            
            <button
              onClick={resetForm}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 transition-all"
            >
              Reset
            </button>
          </div>

          {!currentAccount && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                Please connect your wallet to mint NFTs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MintNFT;