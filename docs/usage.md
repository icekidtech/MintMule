# Usage Guide

This guide provides practical examples and API references for using MintMule NFTs on the Sui blockchain.

## 🎯 Quick Start Examples

### Mint Your First NFT

```bash
# Set your package ID
PACKAGE_ID="0x2f8e2c4b3a1d9e8f7c6b5a4938271e5f6c9d8a7b6e4f2a1c9d3e8b7f6a5c4e2b1"
RECIPIENT="0x8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3"

# Mint an NFT
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function mint_nft \
  --args "My First MintMule NFT" "This is my awesome NFT created on MintMule" "https://mintmule.com/nfts/my-nft.png" $RECIPIENT \
  --gas-budget 10000000
```

### Check Your NFTs

```bash
# List all your objects
sui client objects

# Get detailed NFT information
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function get_nft_info \
  --args $NFT_OBJECT_ID \
  --gas-budget 1000000
```

### Update NFT Description

```bash
# Update description (only creator can do this)
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function update_description \
  --args $NFT_OBJECT_ID "Updated description for my NFT" \
  --gas-budget 5000000
```

## 📚 API Reference

### Core Functions

#### `mint_nft`

**Purpose:** Create and mint a new NFT

**Parameters:**
- `name` (vector<u8>): NFT name as UTF-8 bytes
- `description` (vector<u8>): NFT description as UTF-8 bytes
- `image_url` (vector<u8>): Image URL as UTF-8 bytes
- `recipient` (address): Address to receive the NFT

**Gas Budget:** ~10,000,000

**Example:**
```bash
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function mint_nft \
  --args "Cool NFT" "This is a cool NFT" "https://example.com/image.png" $RECIPIENT \
  --gas-budget 10000000
```

#### `get_nft_info`

**Purpose:** Retrieve NFT metadata

**Parameters:**
- `nft` (&SimpleNFT): Reference to NFT object

**Returns:** (String, String, String, address)
- NFT name
- NFT description
- Image URL
- Creator address

**Gas Budget:** ~1,000,000

**Example:**
```bash
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function get_nft_info \
  --args $NFT_ID \
  --gas-budget 1000000
```

#### `update_description`

**Purpose:** Update NFT description (creator only)

**Parameters:**
- `nft` (&mut SimpleNFT): Mutable reference to NFT
- `new_description` (vector<u8>): New description as UTF-8 bytes

**Requirements:** Only the original creator can call this

**Gas Budget:** ~5,000,000

**Example:**
```bash
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function update_description \
  --args $NFT_ID "New description" \
  --gas-budget 5000000
```

## 🔧 Advanced Usage

### Batch Operations

Mint multiple NFTs in sequence:

```bash
#!/bin/bash

PACKAGE_ID="0x..."
RECIPIENT="0x..."

# Mint multiple NFTs
for i in {1..5}; do
  sui client call \
    --package $PACKAGE_ID \
    --module simple_nft \
    --function mint_nft \
    --args "NFT #$i" "Description for NFT $i" "https://example.com/nft$i.png" $RECIPIENT \
    --gas-budget 10000000
  
  echo "Minted NFT #$i"
  sleep 2  # Brief pause between transactions
done
```

### Integration with Scripts

Create a reusable minting script:

```bash
#!/bin/bash
# mint-nft.sh

PACKAGE_ID=$1
NAME=$2
DESCRIPTION=$3
IMAGE_URL=$4
RECIPIENT=${5:-$(sui client active-address)}

sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function mint_nft \
  --args "$NAME" "$DESCRIPTION" "$IMAGE_URL" $RECIPIENT \
  --gas-budget 10000000 \
  --json
```

Usage:
```bash
./mint-nft.sh $PACKAGE_ID "My NFT" "Description" "https://image.url" $RECIPIENT
```

## 📊 Querying NFTs

### Find All NFTs Owned by an Address

```bash
OWNER_ADDRESS="0x..."

# Get all objects owned by address
sui client objects --owner $OWNER_ADDRESS

# Filter for SimpleNFT objects
sui client objects --owner $OWNER_ADDRESS --type $PACKAGE_ID::simple_nft::SimpleNFT
```

### Get NFT Details

```bash
NFT_ID="0x..."

# Get basic object info
sui client object $NFT_ID

# Get NFT metadata
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function get_nft_info \
  --args $NFT_ID \
  --gas-budget 1000000
```

### Monitor NFT Events

```bash
# Query recent NFTMinted events
sui client query-events \
  --event $PACKAGE_ID::simple_nft::NFTMinted \
  --limit 10
```

## 🔄 Transfer Operations

### Transfer NFT to Another Address

```bash
NFT_ID="0x..."
RECIPIENT="0x..."

# Transfer using Sui's transfer command
sui client transfer \
  --object-id $NFT_ID \
  --to $RECIPIENT \
  --gas-budget 10000000
```

**Note:** NFTs use Sui's standard transfer mechanism since they have `store` capability.

## 🖼️ Image URL Best Practices

### Supported Formats

- **HTTP/HTTPS URLs:** Standard web URLs
- **IPFS:** `ipfs://` or `https://ipfs.io/ipfs/...`
- **Arweave:** `ar://` URLs
- **Centralized Storage:** AWS S3, Google Cloud, etc.

### Image Requirements

- **Format:** PNG, JPG, GIF, SVG, WebP
- **Size:** Recommended 500x500px minimum
- **Aspect Ratio:** Square (1:1) preferred
- **File Size:** Under 10MB recommended

### Example URLs

```bash
# Direct image URL
"https://mintmule.com/nfts/001.png"

# IPFS
"ipfs://QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7"

# Arweave
"ar://abc123..."
```

## 💰 Gas Optimization

### Gas Budget Guidelines

| Operation | Gas Budget | Description |
|-----------|------------|-------------|
| `mint_nft` | 10,000,000 | Create new NFT |
| `get_nft_info` | 1,000,000 | Read metadata |
| `update_description` | 5,000,000 | Update description |
| Transfer | 10,000,000 | Transfer ownership |

### Cost Saving Tips

1. **Batch Operations:** Group multiple calls when possible
2. **Efficient Strings:** Keep metadata concise
3. **Gas Estimation:** Use `--dry-run` to estimate costs
4. **Network Timing:** Avoid network congestion periods

## 🔍 Error Handling

### Common Error Codes

| Error Code | Description | Solution |
|------------|-------------|----------|
| `ENotCreator` | Non-creator trying to update | Only creator can update description |
| `InsufficientGas` | Gas budget too low | Increase gas budget |
| `ObjectNotFound` | NFT doesn't exist | Verify object ID |
| `InvalidAddress` | Invalid recipient address | Check address format |

### Debugging Transactions

```bash
# Get transaction details
sui client tx-block $TRANSACTION_DIGEST

# Check transaction effects
sui client tx-block $TRANSACTION_DIGEST --json | jq '.effects'
```

## 🛠️ Tools and Utilities

### NFT Explorer Script

```bash
#!/bin/bash
# explore-nfts.sh

PACKAGE_ID=$1
OWNER=$2

echo "Exploring NFTs for $OWNER"

# Get all NFTs
NFTS=$(sui client objects --owner $OWNER --type $PACKAGE_ID::simple_nft::SimpleNFT --json)

echo "$NFTS" | jq -r '.[] | .objectId' | while read NFT_ID; do
  echo "=== NFT: $NFT_ID ==="
  sui client call \
    --package $PACKAGE_ID \
    --module simple_nft \
    --function get_nft_info \
    --args $NFT_ID \
    --gas-budget 1000000 \
    --json | jq '.'
done
```

### Batch Metadata Updater

```bash
#!/bin/bash
# update-metadata.sh

PACKAGE_ID=$1
NFT_ID=$2
NEW_DESCRIPTION=$3

sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function update_description \
  --args $NFT_ID "$NEW_DESCRIPTION" \
  --gas-budget 5000000
```

## 📈 Analytics and Monitoring

### Track Minting Activity

```bash
# Get recent minting events
sui client query-events \
  --event $PACKAGE_ID::simple_nft::NFTMinted \
  --start-time "$(date -d '1 day ago' +%s)000" \
  --limit 100
```

### Calculate Collection Stats

```bash
# Count total NFTs minted
sui client query-events \
  --event $PACKAGE_ID::simple_nft::NFTMinted \
  --count
```

## 🔐 Security Best Practices

### Safe Usage Guidelines

1. **Verify Addresses:** Always double-check recipient addresses
2. **Gas Limits:** Set appropriate gas budgets to prevent overpayment
3. **Private Keys:** Never share private keys or mnemonics
4. **Network Verification:** Confirm you're on the correct network
5. **Backup Data:** Keep records of important NFT IDs and transactions

### Access Control

- Only NFT creators can update descriptions
- NFTs can be freely transferred between addresses
- All operations require proper authentication

---

**Need more examples? Check out the [Smart Contract Documentation](smart-contract.md) for detailed API information.**