# Smart Contract Architecture

This document provides a detailed overview of the MintMule smart contract implementation on the Sui blockchain.

## 📖 Overview

MintMule is built as an NFT launchpad where users can mint NFTs deployed by creators. The smart contract is written in Move and provides core NFT functionality including minting, transferring, and metadata updates.

## 🏗 Core Structures

### `SimpleNFT`

The main NFT structure that represents individual tokens:

```move
public struct SimpleNFT has key, store {
    id: UID,           // Unique identifier for the NFT object
    name: String,      // NFT name/title
    description: String, // NFT description
    image_url: String,  // URL to the NFT's image
    creator: address,   // Address of the original creator
}
```

**Fields:**
- `id: UID` - Sui's unique object identifier
- `name: String` - Human-readable name of the NFT
- `description: String` - Detailed description of the NFT
- `image_url: String` - Link to the NFT's visual representation
- `creator: address` - The address that originally created this NFT

### `NFTMinted` Event

Event emitted when a new NFT is minted:

```move
public struct NFTMinted has copy, drop {
    nft_id: address,    // Object ID of the newly minted NFT
    name: String,       // Name of the minted NFT
    creator: address,   // Address of the creator
    recipient: address, // Address receiving the NFT
}
```

This event enables off-chain tracking and indexing of NFT minting activity.

## 🔧 Public Functions

### `mint_nft`

Creates a new NFT and transfers it to the specified recipient.

```move
public fun mint_nft(
    name: vector<u8>,
    description: vector<u8>,
    image_url: vector<u8>,
    recipient: address,
    ctx: &mut TxContext
)
```

**Parameters:**
- `name: vector<u8>` - NFT name as UTF-8 bytes
- `description: vector<u8>` - NFT description as UTF-8 bytes
- `image_url: vector<u8>` - Image URL as UTF-8 bytes
- `recipient: address` - Address to receive the NFT
- `ctx: &mut TxContext` - Transaction context

**Behavior:**
1. Creates a new `SimpleNFT` object
2. Transfers the NFT to the recipient
3. Emits an `NFTMinted` event

### `get_nft_info`

Retrieves metadata information from an NFT.

```move
public fun get_nft_info(nft: &SimpleNFT): (String, String, String, address)
```

**Parameters:**
- `nft: &SimpleNFT` - Reference to the NFT object

**Returns:**
- `String` - NFT name
- `String` - NFT description
- `String` - Image URL
- `address` - Creator address

### `update_description`

Allows the creator to update the NFT's description.

```move
public fun update_description(
    nft: &mut SimpleNFT,
    new_description: vector<u8>,
    ctx: &TxContext
)
```

**Parameters:**
- `nft: &mut SimpleNFT` - Mutable reference to the NFT
- `new_description: vector<u8>` - New description as UTF-8 bytes
- `ctx: &TxContext` - Transaction context

**Requirements:**
- Only the original creator can update the description
- The NFT must exist and be accessible

## 🔐 Access Control

### Creator-Only Operations

The `update_description` function includes access control:

```move
assert!(nft.creator == ctx.sender(), ENotCreator);
```

This ensures that only the original creator of an NFT can modify its description, providing provenance and preventing unauthorized changes.

## 📊 Event System

### Minting Events

Every NFT mint emits an `NFTMinted` event containing:
- The new NFT's object ID
- NFT name
- Creator address
- Recipient address

This enables:
- Off-chain analytics and tracking
- Marketplace integrations
- Portfolio management tools
- Historical minting data

## 🏛 Module Structure

```move
module simple_nft_addr::simple_nft {

    // === Imports ===
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use std::string::{Self, String};

    // === Errors ===
    const ENotCreator: u64 = 0;

    // === Structs ===
    public struct SimpleNFT has key, store { ... }
    public struct NFTMinted has copy, drop { ... }

    // === Public Functions ===
    public fun mint_nft(...) { ... }
    public fun get_nft_info(...): (...) { ... }
    public fun update_description(...) { ... }
}
```

## 🔄 Object Capabilities

The `SimpleNFT` struct has `key, store` abilities:
- `key` - Makes it a Sui object with a unique ID
- `store` - Allows it to be stored in other objects or transferred

This design enables:
- Direct ownership and transfer
- Storage in collections or wallets
- Integration with other smart contracts

## 🧪 Testing Coverage

The contract includes comprehensive tests covering:
- Successful NFT minting
- Creator-only description updates
- Access control validation
- Event emission verification

See [Testing](testing.md) for detailed test information.

## 🚀 Deployment

The contract is deployed as a Sui package and can be called from:
- Sui CLI
- Frontend applications
- Other smart contracts
- dApps and marketplaces

## 🔗 Integration Points

The contract is designed to integrate with:
- NFT marketplaces
- Wallet applications
- Analytics platforms
- Portfolio trackers
- Creator tools

---

**For implementation details, see the source code in `sources/simple_nft.move`**