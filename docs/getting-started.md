# Getting Started with MintMule

Welcome to MintMule! This guide will help you get started with setting up and running the MintMule NFT launchpad on your local machine.

## 🛠 Prerequisites

Before you begin, ensure you have the following installed:

- [Sui CLI](https://docs.sui.io/guides/developer/getting-started/sui-install) - For interacting with the Sui blockchain
- Sui wallet configured for devnet or mainnet
- Basic understanding of Move programming language (optional, but helpful)
- Node.js 18+ and pnpm (for the frontend)

## ⚡ Quick Start

### 1. Clone and Setup
```bash
git clone https://https://github.com/icekidtech/MintMule.git
cd MintMule
```

### 2. Build the Smart Contract
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

### 5. Start the Frontend
```bash
cd frontend
pnpm install
pnpm run dev
```

## 📁 Project Structure

```
mintmule/
├── sources/
│   └── simple_nft.move      # Main NFT smart contract
├── tests/
│   └── simple_nft_tests.move # Unit tests
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   └── contexts/        # React contexts
│   └── ...
├── docs/                    # Documentation
├── Move.toml               # Package configuration
├── deployment.json         # Deployment information
├── deploy.sh              # Deployment script
└── README.md              # Main project README
```

## 🔧 Environment Setup

### Sui CLI Configuration

1. Install Sui CLI:
```bash
# Install via script
curl -fsSL https://install.sui.io | sh
```

2. Configure your wallet:
```bash
sui client active-address
sui client switch --address <YOUR_ADDRESS>
```

3. Get devnet tokens for testing:
```bash
sui client faucet
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
pnpm install
```

2. Start development server:
```bash
pnpm run dev
```

The frontend will be available at `http://localhost:5173`

## 🚀 First Mint

Once everything is set up:

1. Open your browser to the MintMule frontend
2. Connect your Sui wallet
3. Navigate to the Mint page
4. Fill in your NFT details (name, description, image URL)
5. Click "Mint NFT"
6. Confirm the transaction in your wallet

## 📚 Next Steps

- Learn about the [Smart Contract Architecture](smart-contract.md)
- Explore [Usage Examples](usage.md)
- Check out [Testing](testing.md)
- Read about [Deployment](deployment.md)

## 🆘 Need Help?

If you run into issues:

- Check the [Troubleshooting Guide](troubleshooting.md)
- Review the [Configuration](configuration.md) options
- Join the [Sui Discord](https://discord.gg/sui) for community support

---

**Ready to start minting? Let's go! 🚀**