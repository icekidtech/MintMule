#!/bin/bash

if [ -f "deployment.json" ]; then
    PACKAGE_ID=$(jq -r '.packageId' deployment.json)
else
    echo "deployment.json not found. Please deploy first."
    exit 1
fi

echo "Minting example NFT..."

sui client call \
  --package $PACKAGE_ID \
  --module simple_nft \
  --function mint_nft \
  --args \
    "$(printf 'My Awesome NFT' | base64 -w 0)" \
    "$(printf 'This is an example NFT created on Sui blockchain' | base64 -w 0)" \
    "$(printf 'https://example.com/awesome-nft.png' | base64 -w 0)" \
    "$(sui client active-address)" \
  --gas-budget 10000000