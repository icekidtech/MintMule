# Simple NFT Project

A basic NFT (Non-Fungible Token) implementation on the Sui blockchain, demonstrating core Move programming concepts and NFT functionality.

## 🚀 Features

- **Mint NFTs**: Create unique NFTs with name, description, and image URL
- **Transfer Ownership**: NFTs can be transferred between addresses
- **Update Metadata**: Creators can update NFT descriptions
- **Event Emission**: Minting events are emitted for tracking
- **Creator Attribution**: Each NFT tracks its original creator

## 📁 Project Structure

```
simple_nft/
├── sources/
│   └── simple_nft.move      # Main NFT module
├── tests/
│   └── simple_nft_tests.move # Unit tests
├── Move.toml                 # Package configuration
├── deployment.json           # Deployment information
├── deploy.sh                 # Deployment script
└── README.md                 # This file
```

## 🛠 Prerequisites

- [Sui CLI](https://docs.sui.io/guides/developer/getting-started/sui-install) installed
- Sui wallet configured for devnet
- Basic understanding of Move programming language

## ⚡ Quick Start

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd simple_nft
```

### 2. Build the Project
```bash
sui move build
```

### 3. Run Tests
```bash
sui move test
```

### 4. Deploy to Devnet
```bash
./deploy.sh
```

## 📖 Smart Contract Overview

### Core Structures

#### `SimpleNFT`
```move
public struct SimpleNFT has key, store {
    id: UID,           // Unique identifier
    name: String,      // NFT name
    description: String, // NFT description  
    image_url: String,  // Image URL
    creator: address,   // Original creator
}
```

#### `NFTMinted` Event
```move
public struct NFTMinted has copy, drop {
    nft_id: address,    // NFT object ID
    name: String,       // NFT name
    creator: address,   // Creator address
    recipient: address, // Recipient address
}
```

### Public Functions

#### `mint_nft`
Creates a new NFT and transfers it to the recipient.

**Parameters:**
- `name: vector<u8>` - NFT name as bytes
- `description: vector<u8>` - NFT description as bytes  
- `image_url: vector<u8>` - Image URL as bytes
- `recipient: address` - Address to receive the NFT
- `ctx: &mut TxContext` - Transaction context

#### `get_nft_info`
Returns NFT metadata information.

**Returns:** `(String, String, String, address)` - name, description, image_url, creator

#### `update_description`
Updates NFT description (only by creator).

**Parameters:**
- `nft: &mut SimpleNFT` - Mutable reference to NFT
- `new_description: vector<u8>` - New description as bytes
- `ctx: &TxContext` - Transaction context

## 🧪 Testing

The project includes comprehensive tests in [`tests/simple_nft_tests.move`](tests/simple_nft_tests.move):

- **`test_mint_nft`**: Verifies NFT minting functionality
- **`test_update_description`**: Tests description update by creator

Run tests with:
```bash
sui move test
```

## 🚀 Deployment

### Using the Deploy Script
```bash
./deploy.sh
```

This will:
1. Deploy the contract to devnet
2. Extract the package ID
3. Save deployment info to `deployment.json`

### Manual Deployment
```bash
sui client publish --gas-budget 100000000
```

## 🎯 Usage Examples

### Mint an NFT
```bash
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function mint_nft \
  --args "My First NFT" "This is my first NFT on Sui" "https://example.com/image.png" $RECIPIENT_ADDRESS \
  --gas-budget 10000000
```

### Get NFT Information
```bash
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function get_nft_info \
  --args $NFT_OBJECT_ID \
  --gas-budget 1000000
```

### Update NFT Description
```bash
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function update_description \
  --args $NFT_OBJECT_ID "New description" \
  --gas-budget 5000000
```

## 🔍 Verification

After deployment, verify your contract:

```bash
# Check package exists
sui client object $PACKAGE_ID

# View your NFTs
sui client objects --owner $YOUR_ADDRESS

# Check specific NFT
sui client object $NFT_OBJECT_ID
```

## 📋 Deployment Information

After deployment, check `deployment.json` for:
- Package ID
- Transaction digest
- Deployment timestamp
- Network information

## 🔧 Configuration

### Move.toml
- **Package name**: `simple_nft`
- **Edition**: `2024.beta`
- **Address**: `simple_nft = "0x0"` (replaced during deployment)

### Dependencies
- Sui Framework
- Move Standard Library
- SuiSystem
- Bridge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run `sui move test`
6. Submit a pull request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

**Build Errors:**
- Ensure Sui CLI is properly installed
- Check Move.toml syntax
- Verify all dependencies are available

**Deployment Fails:**
- Check your devnet SUI balance: `sui client balance`
- Get devnet tokens: `sui client faucet`
- Increase gas budget if needed

**Transaction Fails:**
- Verify package ID is correct
- Check function parameters
- Ensure you own the NFT for update operations

### Getting Help

- [Sui Documentation](https://docs.sui.io/)
- [Move Programming Language](https://move-language.github.io/move/)
- [Sui Discord](https://discord.gg/sui)

## 🏗 Architecture Decisions

### Why These Design Choices?

1. **Separate Event Struct**: `NFTMinted` allows off-chain indexing
2. **Creator Field**: Enables royalty systems and provenance tracking  
3. **String Types**: Better UX than raw bytes for metadata
4. **Public Functions**: Allows integration with other contracts
5. **Mutable Description**: Flexibility for metadata updates

### Security Considerations

- Only creators can update descriptions
- NFTs are transferable objects (`key, store` abilities)
- Events provide transparency
- Input validation through Move's type system

---

**Built with ❤️ on Sui**