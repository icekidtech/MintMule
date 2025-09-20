import React, { useState, useEffect } from 'react';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { Grid, Eye, User, Calendar, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import Navigation from './Navigation'; // Adjust the import based on your file structure

interface NFTData {
  id: string;
  name: string;
  description: string;
  image_url: string;
  creator: string;
  type: string;
}

interface NFTGalleryProps {
  packageId: string;
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ packageId }) => {
  const currentAccount = useCurrentAccount();
  const suiClient = useSuiClient();
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [selectedNFT, setSelectedNFT] = useState<NFTData | null>(null);

  const fetchNFTs = async () => {
    if (!currentAccount) return;
    setIsLoading(true);
    setError('');
    try {
      const ownedObjects = await suiClient.getOwnedObjects({
        owner: currentAccount.address,
        filter: {
          StructType: `${packageId}::simple_nft::SimpleNFT`, // Use correct type
        },
        options: {
          showContent: true,
          showType: true,
        },
      });
      const nftData: NFTData[] = [];
      for (const obj of ownedObjects.data) {
        if (obj.data?.content && 'fields' in obj.data.content) {
          const fields = obj.data.content.fields as any;
          nftData.push({
            id: obj.data.objectId,
            name: fields.name || 'Unnamed NFT',
            description: fields.description || 'No description',
            image_url: fields.image_url || '',
            creator: fields.creator || '',
            type: obj.data.type || '',
          });
        }
      }
      setNfts(nftData);
    } catch (err) {
      console.error('Error fetching NFTs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch NFTs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [currentAccount, packageId]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const NFTCard: React.FC<{ nft: NFTData }> = ({ nft }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
      <div className="aspect-square relative">
        {nft.image_url ? (
          <img
            src={nft.image_url}
            alt={nft.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/api/placeholder/400/400';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Grid className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <button
            onClick={() => setSelectedNFT(nft)}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transform translate-y-4 hover:translate-y-0 transition-transform"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{nft.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{nft.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>Creator: {formatAddress(nft.creator)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const NFTModal: React.FC<{ nft: NFTData; onClose: () => void }> = ({ nft, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{nft.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-light"
            >
              ×
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {nft.image_url ? (
                <img
                  src={nft.image_url}
                  alt={nft.name}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <Grid className="w-24 h-24 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{nft.description}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Creator</p>
                    <p className="font-mono text-sm">{nft.creator}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Object ID</p>
                    <p className="font-mono text-sm break-all">{nft.id}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <a
                  href={`https://suiexplorer.com/object/${nft.id}?network=testnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View on Sui Explorer</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!currentAccount) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <Grid className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600">Please connect your wallet to view your NFT collection.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation /> {/* Add Navigation */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Grid className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">My NFT Collection</h1>
          </div>
          <button
            onClick={fetchNFTs}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                <span>Refresh Collection</span>
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="mb-4">
            <div className="flex items-center p-4 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          </div>
        )}
        
        {nfts.length === 0 ? (
          <div className="text-center py-12">
            <Grid className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No NFTs Found</h2>
            <p className="text-gray-600">You don't own any NFTs from this collection yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        )}
      </div>
      
      {selectedNFT && (
        <NFTModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
      )}
    </div>
  );
};

export default NFTGallery;