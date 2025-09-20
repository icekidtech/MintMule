# Configuration Guide

This guide covers configuration options and settings for MintMule deployment and usage.

## 📁 Project Configuration

### Move.toml

The `Move.toml` file contains package configuration:

```toml
[package]
name = "simple_nft"
edition = "2024.beta"
version = "1.0.0"

[dependencies]
Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "framework/testnet" }
MoveStdlib = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/move-stdlib", rev = "framework/testnet" }

[addresses]
simple_nft = "0x0"
```

**Configuration Options:**

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Package name | `"simple_nft"` |
| `edition` | Move edition | `"2024.beta"` |
| `version` | Semantic version | `"1.0.0"` |

### Dependencies

**Required Dependencies:**
- **Sui Framework:** Core Sui functionality
- **MoveStdlib:** Standard Move library functions

**Optional Dependencies:**
- **Bridge:** Cross-chain functionality (if needed)
- **SuiSystem:** System-level operations

## 🌐 Network Configuration

### Sui Client Configuration

Configure your Sui client for different networks:

```bash
# Devnet (default for development)
sui client switch --env devnet

# Testnet (pre-production)
sui client switch --env testnet

# Mainnet (production)
sui client switch --env mainnet
```

### Environment Variables

Set environment variables for deployment:

```bash
# Network selection
export SUI_NETWORK=devnet

# Gas budget settings
export SUI_GAS_BUDGET=100000000

# Wallet configuration
export SUI_WALLET_PATH=~/.sui/sui_config/client.yaml
```

## 🔧 Deployment Configuration

### deployment.json

After deployment, this file contains:

```json
{
  "packageId": "0x2f8e2c4b3a1d9e8f7c6b5a4938271e5f6c9d8a7b6e4f2a1c9d3e8b7f6a5c4e2b1",
  "transactionDigest": "8LqXvHqN3JzKvR2FgYp8mK9Xc6W7aP4dR3sT2bN5vM8",
  "network": "devnet",
  "timestamp": "2024-01-15T10:30:00Z",
  "deployer": "0x8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3",
  "gasUsed": 98765432,
  "version": "1.0.0"
}
```

### Custom Deployment Settings

Create a `.env` file for deployment:

```bash
# .env
SUI_NETWORK=devnet
SUI_GAS_BUDGET=100000000
PACKAGE_NAME=mintmule_nft
COLLECTION_NAME="MintMule Collection"
COLLECTION_DESCRIPTION="NFTs minted on MintMule launchpad"
```

## 🎨 Frontend Configuration

### Environment Variables

Configure the frontend application:

```bash
# .env.local
VITE_SUI_NETWORK=devnet
VITE_PACKAGE_ID=0x2f8e2c4b3a1d9e8f7c6b5a4938271e5f6c9d8a7b6e4f2a1c9d3e8b7f6a5c4e2b1
VITE_APP_NAME=MintMule
VITE_APP_DESCRIPTION="NFT Launchpad on Sui"
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    __PACKAGE_ID__: JSON.stringify(process.env.VITE_PACKAGE_ID),
    __NETWORK__: JSON.stringify(process.env.VITE_SUI_NETWORK),
  },
})
```

### Sui dApp Kit Configuration

```typescript
// src/config/sui.ts
import { getFullnodeUrl } from '@mysten/sui.js/client'

export const networks = {
  devnet: { url: getFullnodeUrl('devnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
}

export const defaultNetwork = process.env.VITE_SUI_NETWORK || 'devnet'
export const packageId = process.env.VITE_PACKAGE_ID || ''
```

## 🧪 Testing Configuration

### Test Configuration

```move
// tests/simple_nft_tests.move
#[test_only]
module simple_nft_addr::simple_nft_tests {

    // Test constants
    const TEST_NAME: vector<u8> = b"Test NFT";
    const TEST_DESCRIPTION: vector<u8> = b"This is a test NFT";
    const TEST_IMAGE_URL: vector<u8> = b"https://example.com/test.png";
    const CREATOR: address = @0xA;
    const RECIPIENT: address = @0xB;
}
```

### Test Scenarios

Configure different test scenarios:

```move
// Multiple test scenarios
#[test]
public fun test_mint_nft_success() { ... }

#[test]
public fun test_mint_nft_empty_name() { ... }

#[test]
public fun test_update_description_by_creator() { ... }

#[test]
#[expected_failure(abort_code = simple_nft::ENotCreator)]
public fun test_update_description_by_non_creator() { ... }
```

## 🔐 Security Configuration

### Access Control

Configure creator permissions:

```move
// In smart contract
public fun update_description(
    nft: &mut SimpleNFT,
    new_description: vector<u8>,
    ctx: &TxContext
) {
    // Only creator can update
    assert!(nft.creator == ctx.sender(), ENotCreator);
    // ... rest of function
}
```

### Gas Limits

Set appropriate gas limits:

```bash
# Safe gas budgets
MINT_GAS=10000000
UPDATE_GAS=5000000
QUERY_GAS=1000000
```

## 📊 Analytics Configuration

### Event Tracking

Configure event monitoring:

```typescript
// Track NFT minting events
const mintEvents = await suiClient.queryEvents({
  query: {
    MoveEventType: `${packageId}::simple_nft::NFTMinted`,
  },
  limit: 100,
})
```

### Metrics Collection

```typescript
// Analytics configuration
export const analytics = {
  enabled: process.env.VITE_ANALYTICS_ENABLED === 'true',
  trackingId: process.env.VITE_ANALYTICS_ID,
  events: {
    nftMinted: 'nft_minted',
    nftTransferred: 'nft_transferred',
    descriptionUpdated: 'description_updated',
  },
}
```

## 🌍 Multi-Network Setup

### Network-Specific Configurations

```typescript
// Network configurations
export const networkConfigs = {
  devnet: {
    packageId: '0x...',
    faucetUrl: 'https://faucet.devnet.sui.io',
    explorerUrl: 'https://suiexplorer.com',
  },
  testnet: {
    packageId: '0x...',
    faucetUrl: 'https://faucet.testnet.sui.io',
    explorerUrl: 'https://testnet.suiscan.xyz',
  },
  mainnet: {
    packageId: '0x...',
    explorerUrl: 'https://suiscan.xyz',
  },
}
```

### Environment-Based Configuration

```typescript
// Dynamic configuration based on environment
export const getConfig = () => {
  const network = process.env.VITE_SUI_NETWORK || 'devnet'
  return {
    ...networkConfigs[network],
    appName: 'MintMule',
    version: '1.0.0',
  }
}
```

## 🔧 Build Configuration

### Build Scripts

```json
// package.json
{
  "scripts": {
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "build:testnet": "VITE_SUI_NETWORK=testnet vite build",
    "build:mainnet": "VITE_SUI_NETWORK=mainnet vite build"
  }
}
```

### Move Build Configuration

```bash
# Build with verbose output
sui move build --verbose

# Build with specific dependencies
sui move build --deps Sui,MoveStdlib
```

## 📦 Asset Configuration

### Image Assets

Configure image handling:

```typescript
// Image configuration
export const imageConfig = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
  recommendedSize: { width: 500, height: 500 },
}
```

### Metadata Standards

```typescript
// NFT metadata standards
export const metadataStandards = {
  name: { maxLength: 100 },
  description: { maxLength: 1000 },
  imageUrl: { 
    allowedProtocols: ['http:', 'https:', 'ipfs:', 'ar:'],
    maxLength: 500 
  },
}
```

## 🚀 Deployment Pipeline

### CI/CD Configuration

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

env:
  SUI_NETWORK: devnet
  SUI_GAS_BUDGET: 100000000

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Deploy Contract
        run: ./deploy.sh
      - name: Update Frontend Config
        run: |
          echo "VITE_PACKAGE_ID=$(jq -r .packageId deployment.json)" >> .env.local
      - name: Build Frontend
        run: npm run build
```

## 🔍 Monitoring Configuration

### Health Checks

```typescript
// Health check configuration
export const healthChecks = {
  contract: {
    endpoint: `${networks[defaultNetwork].url}/health`,
    interval: 30000, // 30 seconds
  },
  database: {
    enabled: process.env.VITE_DB_ENABLED === 'true',
    url: process.env.VITE_DB_URL,
  },
}
```

### Logging Configuration

```typescript
// Logging levels
export const logConfig = {
  level: process.env.VITE_LOG_LEVEL || 'info',
  enableConsole: process.env.NODE_ENV === 'development',
  enableRemote: process.env.VITE_REMOTE_LOGGING === 'true',
}
```

---

**For specific configuration examples, check the project's configuration files and environment templates.**