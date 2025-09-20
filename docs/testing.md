# Testing

This document covers the testing strategy and implementation for the MintMule smart contract.

## 🧪 Testing Overview

MintMule includes comprehensive unit tests written in Move to ensure contract reliability and correctness. Tests are located in `tests/simple_nft_tests.move`.

## 📋 Test Structure

### Test Modules

```move
#[test_only]
module simple_nft_addr::simple_nft_tests {

    // === Imports ===
    use sui::test_scenario as ts;
    use simple_nft_addr::simple_nft::{Self, SimpleNFT, NFTMinted};

    // === Test Functions ===
    #[test]
    public fun test_mint_nft() { ... }

    #[test]
    public fun test_update_description() { ... }

    #[test]
    #[expected_failure(abort_code = simple_nft::ENotCreator)]
    public fun test_update_description_not_creator() { ... }
}
```

## 🧪 Individual Tests

### `test_mint_nft`

**Purpose:** Verifies that NFT minting works correctly.

**Test Flow:**
1. Create a test scenario
2. Mint an NFT with test data
3. Verify the NFT was created with correct properties
4. Check that the NFT was transferred to the recipient
5. Verify the minting event was emitted

**Key Assertions:**
- NFT object exists
- Name, description, image_url match input
- Creator is set correctly
- Recipient owns the NFT
- Event contains correct data

### `test_update_description`

**Purpose:** Tests that creators can update NFT descriptions.

**Test Flow:**
1. Mint an NFT as creator
2. Update the description
3. Verify the description was changed
4. Ensure other properties remain unchanged

**Key Assertions:**
- Description is updated successfully
- Other fields (name, image_url, creator) unchanged
- Function completes without errors

### `test_update_description_not_creator`

**Purpose:** Ensures only creators can update descriptions.

**Test Flow:**
1. Mint an NFT as creator A
2. Try to update description as creator B
3. Expect the transaction to fail

**Key Assertions:**
- Transaction aborts with `ENotCreator` error
- NFT description remains unchanged

## 🚀 Running Tests

### Execute All Tests

```bash
sui move test
```

### Run Specific Test

```bash
sui move test --filter test_mint_nft
```

### Verbose Output

```bash
sui move test --verbose
```

## 📊 Test Coverage

Current test coverage includes:

- ✅ NFT minting functionality
- ✅ Metadata retrieval
- ✅ Creator-only description updates
- ✅ Access control validation
- ✅ Event emission
- ✅ Error handling

## 🛠 Test Utilities

### Test Scenario

The tests use Sui's `test_scenario` module for:

```move
let scenario = ts::begin(@0xA);
```

This provides:
- Controlled transaction execution
- Object inspection capabilities
- Event verification
- Multi-step transaction testing

### Test Data

Common test constants:

```move
const TEST_NAME: vector<u8> = b"Test NFT";
const TEST_DESCRIPTION: vector<u8> = b"This is a test NFT";
const TEST_IMAGE_URL: vector<u8> = b"https://example.com/image.png";
const CREATOR: address = @0xA;
const RECIPIENT: address = @0xB;
```

## 🔍 Test Verification

### Object Inspection

```move
let nft = ts::take_from_sender<SimpleNFT>(&scenario);
assert!(simple_nft::get_nft_info(&nft).0 == string::utf8(TEST_NAME), 0);
```

### Event Verification

```move
ts::next_tx(&mut scenario, CREATOR);
let event = ts::take_from_sender<NFTMinted>(&scenario);
assert!(event.name == string::utf8(TEST_NAME), 0);
```

### Ownership Verification

```move
assert!(ts::has_most_recent_for_sender<SimpleNFT>(&scenario), 0);
```

## 🐛 Debugging Tests

### Common Issues

**Test Fails Unexpectedly:**
- Check assertion values
- Verify object ownership
- Ensure correct transaction sequencing

**Compilation Errors:**
- Check import statements
- Verify function signatures
- Ensure test-only modules are properly marked

**Event Not Found:**
- Check event emission in the function
- Verify event type and structure
- Ensure correct transaction step

### Debug Tips

1. Use `ts::debug(&object)` to inspect objects
2. Add intermediate assertions to isolate issues
3. Check the Move compiler output for detailed errors
4. Run tests individually to identify failures

## 📈 Test Maintenance

### Adding New Tests

1. Create a new `#[test]` function
2. Follow the naming convention: `test_<functionality>_<condition>`
3. Include both positive and negative test cases
4. Add appropriate assertions
5. Update this documentation

### Test Best Practices

- **Isolation:** Each test should be independent
- **Clarity:** Use descriptive names and comments
- **Coverage:** Test both success and failure cases
- **Maintenance:** Keep tests updated with code changes

## 🔄 CI/CD Integration

Tests are designed to run in automated environments:

```yaml
# Example GitHub Actions
- name: Run Tests
  run: sui move test
```

## 📊 Test Results

Expected output from `sui move test`:

```
Running Move unit tests
[ PASS ] simple_nft_addr::simple_nft_tests::test_mint_nft
[ PASS ] simple_nft_addr::simple_nft_tests::test_update_description
[ PASS ] simple_nft_addr::simple_nft_tests::test_update_description_not_creator
Test result: OK. Total tests: 3
```

## 🎯 Test Philosophy

The testing approach focuses on:

1. **Functional Correctness** - Core features work as expected
2. **Security** - Access controls prevent unauthorized actions
3. **Integration** - Events and object interactions work properly
4. **Regression Prevention** - Changes don't break existing functionality

---

**For the actual test implementations, see `tests/simple_nft_tests.move`**