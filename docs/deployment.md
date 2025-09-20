# Deployment Guide

This guide covers deploying the MintMule smart contract to Sui networks and verifying successful deployment.

## 🚀 Deployment Options

### Automated Deployment (Recommended)

Use the provided deployment script for the easiest experience:

```bash
./deploy.sh
```

**What the script does:**
1. Builds the Move package
2. Publishes to the configured network (devnet by default)
3. Extracts and saves the package ID
4. Updates `deployment.json` with deployment details

### Manual Deployment

For more control over the deployment process:

```bash
# Build the package
sui move build

# Publish to devnet
sui client publish --gas-budget 100000000
```

## 🌐 Network Selection

### Devnet (Development)

**Best for:** Testing and development

```bash
# Switch to devnet
sui client switch --env devnet

# Get test tokens
sui client faucet

# Deploy
./deploy.sh
```

### Testnet

**Best for:** Pre-production testing

```bash
# Switch to testnet
sui client switch --env testnet

# Deploy
./deploy.sh
```

### Mainnet

**Best for:** Production deployment

```bash
# Switch to mainnet
sui client switch --env mainnet

# Deploy (ensure sufficient SUI balance)
./deploy.sh
```

## 📋 Deployment Configuration

### Environment Variables

Set these before deployment:

```bash
export SUI_NETWORK=devnet  # devnet, testnet, or mainnet
export SUI_GAS_BUDGET=100000000  # Gas budget for deployment
```

### Client Configuration

Check your Sui client configuration:

```bash
sui client active-env
sui client active-address
sui client balance
```

## 🔍 Post-Deployment Verification

### 1. Check Package Existence

```bash
sui client object <PACKAGE_ID>
```

Expected output includes:
- Package ID
- Version information
- Module list
- Creation timestamp

### 2. Verify Package Modules

```bash
sui client object --json <PACKAGE_ID> | jq '.data.content.disassembled'
```

Should show:
- `simple_nft` module
- All public functions
- Struct definitions

### 3. Test Basic Functionality

Mint a test NFT:

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module simple_nft \
  --function mint_nft \
  --args "Test NFT" "Test Description" "https://example.com/image.png" <YOUR_ADDRESS> \
  --gas-budget 10000000
```

### 4. Check Deployment File

Verify `deployment.json` contains:

```json
{
  "packageId": "0x...",
  "transactionDigest": "...",
  "network": "devnet",
  "timestamp": "...",
  "deployer": "0x..."
}
```

## 📊 Deployment Information

### deployment.json Structure

```json
{
  "packageId": "0x2f8e2c4b3a1d9e8f7c6b5a4938271e5f6c9d8a7b6e4f2a1c9d3e8b7f6a5c4e2b1",
  "transactionDigest": "8LqXvHqN3JzKvR2FgYp8mK9Xc6W7aP4dR3sT2bN5vM8",
  "network": "devnet",
  "timestamp": "2024-01-15T10:30:00Z",
  "deployer": "0x8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3",
  "gasUsed": 98765432
}
```

### Key Fields

- **packageId**: The published package's object ID
- **transactionDigest**: Unique identifier for the publish transaction
- **network**: Network where the contract was deployed
- **timestamp**: ISO 8601 timestamp of deployment
- **deployer**: Address that performed the deployment
- **gasUsed**: Gas units consumed during deployment

## 🧪 Testing Deployment

### Mint Test NFT

```bash
# Set variables
PACKAGE_ID=$(jq -r '.packageId' deployment.json)
YOUR_ADDRESS=$(sui client active-address)

# Mint NFT
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function mint_nft \
  --args "Hello MintMule" "My first MintMule NFT" "https://mintmule.com/logo.png" $YOUR_ADDRESS \
  --gas-budget 10000000
```

### Verify NFT Creation

```bash
# Check your objects
sui client objects --owner $YOUR_ADDRESS

# Inspect the NFT
sui client object <NFT_OBJECT_ID>
```

### Test Metadata Retrieval

```bash
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function get_nft_info \
  --args <NFT_OBJECT_ID> \
  --gas-budget 1000000
```

## 🔧 Troubleshooting Deployment

### Common Issues

**Insufficient Gas:**
```
Error: Insufficient gas
```
**Solution:** Increase gas budget or get more SUI tokens
```bash
sui client faucet  # For devnet
```

**Build Errors:**
```
Error: Build failed
```
**Solution:** Check Move code syntax and dependencies
```bash
sui move build --verbose
```

**Network Connection:**
```
Error: Network error
```
**Solution:** Check network connectivity and client configuration
```bash
sui client switch --env devnet
```

**Package Not Found:**
```
Error: Package not found
```
**Solution:** Verify package ID and network
```bash
sui client object <PACKAGE_ID>
```

### Gas Estimation

Estimate deployment gas cost:

```bash
sui move build --dump-bytecode-as-base64 | wc -c
```

General guidelines:
- Devnet/Testnet: 50,000,000 - 200,000,000
- Mainnet: 100,000,000 - 500,000,000

## 📈 Deployment Best Practices

### Pre-Deployment Checklist

- [ ] Run all tests: `sui move test`
- [ ] Build successfully: `sui move build`
- [ ] Sufficient gas balance
- [ ] Correct network selected
- [ ] Backup existing deployment info

### Post-Deployment Checklist

- [ ] Package ID saved to `deployment.json`
- [ ] Package verified on blockchain
- [ ] Test NFT minting works
- [ ] Frontend configured with correct package ID
- [ ] Documentation updated with deployment details

### Security Considerations

- **Private Keys:** Never commit private keys to version control
- **Network Selection:** Test thoroughly on devnet before mainnet
- **Gas Limits:** Set appropriate gas budgets to prevent failed transactions
- **Backup:** Keep deployment information secure and backed up

## 🔄 Redeployment

### Updating Existing Deployment

For contract updates:

1. Modify the Move code
2. Run tests: `sui move test`
3. Build: `sui move build`
4. Deploy new version: `./deploy.sh`
5. Update frontend with new package ID
6. Test all functionality

### Version Management

Track deployments:

```json
{
  "deployments": [
    {
      "version": "1.0.0",
      "packageId": "0x...",
      "network": "devnet",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## 🎯 Deployment Scripts

### Custom Deployment Script

Create `deploy-custom.sh`:

```bash
#!/bin/bash

# Configuration
NETWORK=${SUI_NETWORK:-devnet}
GAS_BUDGET=${SUI_GAS_BUDGET:-100000000}

echo "Deploying to $NETWORK with gas budget $GAS_BUDGET"

# Switch network
sui client switch --env $NETWORK

# Build and deploy
sui move build
sui client publish --gas-budget $GAS_BUDGET --json > deployment-raw.json

# Extract package ID
PACKAGE_ID=$(jq -r '.objectChanges[] | select(.type == "published") | .packageId' deployment-raw.json)

# Save deployment info
jq -n --arg packageId "$PACKAGE_ID" --arg network "$NETWORK" --arg timestamp "$(date -Iseconds)" \
  '{packageId: $packageId, network: $network, timestamp: $timestamp}' > deployment.json

echo "Deployed package: $PACKAGE_ID"
```

---

**Ready to deploy? Make sure to test thoroughly on devnet first! 🚀**