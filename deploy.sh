#!/bin/bash

echo "Deploying Simple NFT to Sui Devnet..."

# Deploy and capture output
DEPLOY_OUTPUT=$(sui client publish --gas-budget 100000000 --json)

# Extract package ID from JSON output
PACKAGE_ID=$(echo $DEPLOY_OUTPUT | jq -r '.objectChanges[] | select(.type == "published") | .packageId')

# Create deployment info JSON
cat > deployment.json << EOF
{
  "network": "devnet",
  "packageId": "$PACKAGE_ID",
  "deployedAt": "$(date -Iseconds)",
  "transactionDigest": "$(echo $DEPLOY_OUTPUT | jq -r '.digest')",
  "modules": {
    "simple_nft": {
      "structs": {
        "SimpleNFT": {
          "abilities": ["key", "store"],
          "fields": ["id", "name", "description", "image_url", "creator"]
        },
        "NFTMinted": {
          "abilities": ["copy", "drop"],
          "fields": ["nft_id", "name", "creator", "recipient"]
        }
      },
      "functions": {
        "mint_nft": "public",
        "get_nft_info": "public", 
        "update_description": "public"
      }
    }
  }
}
EOF

echo "Package deployed successfully!"
echo "Package ID: $PACKAGE_ID"
echo "Deployment info saved to deployment.json"