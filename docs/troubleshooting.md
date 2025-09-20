# Troubleshooting Guide

This guide helps you resolve common issues when working with MintMule NFTs on Sui.

## 🚫 Common Errors and Solutions

### Build Errors

#### "Module not found" Error

**Error:**
```
error[E03002]: module 'sui' not found
```

**Solutions:**
1. Check Sui CLI installation:
   ```bash
   sui --version
   ```

2. Update Sui CLI:
   ```bash
   # Via script
   curl -fsSL https://install.sui.io | sh

   # Or via package manager
   brew update && brew upgrade sui
   ```

3. Verify Move.toml dependencies:
   ```toml
   [dependencies]
   Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "framework/testnet" }
   ```

#### Compilation Errors

**Error:**
```
error[E01002]: unexpected token
```

**Solutions:**
1. Check syntax in Move files
2. Verify import statements
3. Ensure proper module structure
4. Check for missing semicolons or brackets

### Deployment Issues

#### Insufficient Gas Error

**Error:**
```
Error: Insufficient gas
```

**Solutions:**
1. Check your SUI balance:
   ```bash
   sui client balance
   ```

2. Get devnet tokens:
   ```bash
   sui client faucet
   ```

3. Increase gas budget:
   ```bash
   sui client publish --gas-budget 200000000
   ```

4. Check gas price:
   ```bash
   sui client gas-price
   ```

#### Network Connection Issues

**Error:**
```
Error: Network error
```

**Solutions:**
1. Check network connectivity:
   ```bash
   ping fullnode.devnet.sui.io
   ```

2. Switch networks:
   ```bash
   sui client switch --env devnet
   ```

3. Update client configuration:
   ```bash
   sui client active-env
   ```

4. Check Sui client status:
   ```bash
   sui client status
   ```

### Transaction Failures

#### Transaction Timeout

**Error:**
```
Transaction timed out
```

**Solutions:**
1. Increase timeout settings
2. Check network congestion
3. Retry during off-peak hours
4. Split large transactions

#### Invalid Transaction

**Error:**
```
Error: Invalid transaction
```

**Solutions:**
1. Verify package ID is correct
2. Check function arguments
3. Ensure proper object ownership
4. Validate addresses

### Frontend Issues

#### Wallet Connection Problems

**Error:**
```
Wallet not connected
```

**Solutions:**
1. Install Sui Wallet extension
2. Ensure wallet is unlocked
3. Check network compatibility
4. Clear browser cache

#### Package ID Not Found

**Error:**
```
Package ID not configured
```

**Solutions:**
1. Check deployment.json:
   ```bash
   cat deployment.json
   ```

2. Update environment variables:
   ```bash
   export VITE_PACKAGE_ID="0x..."
   ```

3. Restart development server:
   ```bash
   pnpm run dev
   ```

## 🔧 Diagnostic Tools

### Check Sui Client Status

```bash
# Check active environment
sui client active-env

# Check active address
sui client active-address

# Check balance
sui client balance

# Check network status
sui client status
```

### Verify Package Deployment

```bash
# Check if package exists
sui client object <PACKAGE_ID>

# Get package details
sui client object <PACKAGE_ID> --json

# List package modules
sui client object <PACKAGE_ID> --json | jq '.data.content.disassembled'
```

### Debug Transactions

```bash
# Get transaction details
sui client tx-block <TRANSACTION_DIGEST>

# Check transaction effects
sui client tx-block <TRANSACTION_DIGEST> --json | jq '.effects'

# Get transaction events
sui client tx-block <TRANSACTION_DIGEST> --json | jq '.events'
```

### Monitor Network

```bash
# Check gas price
sui client gas-price

# Get network info
sui client network

# Check recent blocks
sui client query-blocks --limit 5
```

## 🧪 Testing Issues

### Test Failures

**Common Test Issues:**

1. **Test Timeout:**
   ```bash
   sui move test --timeout 30000
   ```

2. **Gas Estimation Errors:**
   ```bash
   sui move test --gas-budget 100000000
   ```

3. **Dependency Issues:**
   ```bash
   sui move test --verbose
   ```

### Debug Test Execution

```bash
# Run specific test
sui move test --filter test_mint_nft

# Run with verbose output
sui move test --verbose

# Run with debug information
sui move test --debug
```

## 🌐 Network-Specific Issues

### Devnet Problems

**Common Devnet Issues:**

1. **Faucet Not Working:**
   ```bash
   # Try alternative faucet
   curl -X POST https://faucet.devnet.sui.io/gas -H "Content-Type: application/json" -d '{"FixedAmountRequest": {"recipient": "'$YOUR_ADDRESS'"}}'
   ```

2. **Network Congestion:**
   - Wait for network to stabilize
   - Use testnet for testing
   - Reduce transaction frequency

### Testnet Issues

**Testnet-Specific Problems:**

1. **Version Compatibility:**
   - Ensure Sui CLI matches testnet version
   - Update dependencies in Move.toml

2. **State Inconsistencies:**
   - Reset local state if needed
   - Use fresh addresses for testing

### Mainnet Issues

**Production Issues:**

1. **High Gas Fees:**
   - Monitor gas prices
   - Schedule transactions during low-usage periods
   - Use gas estimation tools

2. **Network Outages:**
   - Check Sui status page
   - Monitor official channels
   - Have backup deployment strategy

## 🔧 Advanced Troubleshooting

### Reset Local State

```bash
# Reset Sui client
sui client reset

# Clear local database
rm -rf ~/.sui/

# Reinitialize
sui client init
```

### Debug Smart Contract

```bash
# Build with debug information
sui move build --debug

# Test with debug output
sui move test --debug

# Deploy with verbose output
sui client publish --gas-budget 100000000 --verbose
```

### Analyze Gas Usage

```bash
# Estimate gas for transaction
sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function mint_nft \
  --args "Test" "Test" "https://test.com" $ADDRESS \
  --dry-run

# Check gas breakdown
sui client tx-block $DIGEST --json | jq '.effects.gasUsed'
```

## 📊 Performance Issues

### Slow Transactions

**Causes and Solutions:**

1. **Network Congestion:**
   - Monitor network status
   - Use different RPC endpoints
   - Implement retry logic

2. **Large Payloads:**
   - Optimize image sizes
   - Minimize metadata length
   - Batch operations when possible

3. **Gas Estimation:**
   - Use accurate gas budgets
   - Monitor gas price changes
   - Implement dynamic gas adjustment

### Memory Issues

**Frontend Memory Problems:**

1. **Large NFT Collections:**
   - Implement pagination
   - Use virtual scrolling
   - Cache NFT data

2. **Image Loading:**
   - Lazy load images
   - Use appropriate image formats
   - Implement image optimization

## 🔐 Security Issues

### Access Control Problems

**Permission Errors:**

1. **Creator-Only Operations:**
   ```bash
   # Verify you're the creator
   sui client object $NFT_ID --json | jq '.data.content.fields.creator'
   ```

2. **Ownership Verification:**
   ```bash
   # Check NFT ownership
   sui client object $NFT_ID --json | jq '.owner'
   ```

### Private Key Issues

**Key Management Problems:**

1. **Lost Keys:**
   - Use hardware wallets when possible
   - Implement multi-signature for important operations
   - Keep secure backups

2. **Key Compromise:**
   - Immediately transfer assets to new address
   - Monitor for unauthorized transactions
   - Revoke compromised access

## 📞 Getting Help

### Community Support

- **Sui Discord:** https://discord.gg/sui
- **Sui Forum:** https://forum.sui.io
- **GitHub Issues:** Report bugs and issues

### Professional Support

- **Sui Documentation:** https://docs.sui.io
- **Developer Guides:** https://docs.sui.io/guides
- **API References:** https://docs.sui.io/reference

### Debug Information

When reporting issues, include:

```bash
# System information
sui --version
sui client status

# Error logs
sui move build --verbose

# Transaction details
sui client tx-block $DIGEST --json
```

## 🚀 Preventive Measures

### Best Practices

1. **Regular Backups:**
   ```bash
   # Backup configuration
   cp ~/.sui/sui_config/client.yaml ~/sui-config-backup.yaml
   ```

2. **Version Control:**
   ```bash
   # Track changes
   git add .
   git commit -m "Update configuration"
   ```

3. **Monitoring:**
   ```bash
   # Monitor deployments
   watch -n 30 sui client balance
   ```

4. **Testing:**
   ```bash
   # Run tests before deployment
   sui move test
   sui move build
   ```

---

**Still having issues? Check the [Getting Started Guide](getting-started.md) or join the Sui community for help.**