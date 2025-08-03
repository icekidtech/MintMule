/*
/// Module: simple_nft
module simple_nft::simple_nft;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module simple_nft::simple_nft {
    use std::string::{Self, String};
    use sui::event;

    // The NFT struct
    public struct SimpleNFT has key, store {
        id: UID,
        name: String,
        description: String,
        image_url: String,
        creator: address,
    }

    // Event emitted when an NFT is minted
    public struct NFTMinted has copy, drop {
        nft_id: address,
        name: String,
        creator: address,
        recipient: address,
    }

    // Mint a new NFT
    public fun mint_nft(
        name: vector<u8>,
        description: vector<u8>,
        image_url: vector<u8>,
        recipient: address,
        ctx: &mut TxContext
    ) {
        let nft_id = object::new(ctx);
        let nft_address = object::uid_to_address(&nft_id);
        let creator = tx_context::sender(ctx);

        let nft = SimpleNFT {
            id: nft_id,
            name: string::utf8(name),
            description: string::utf8(description),
            image_url: string::utf8(image_url),
            creator,
        };

        // Emit minting event
        event::emit(NFTMinted {
            nft_id: nft_address,
            name: string::utf8(name),
            creator,
            recipient,
        });

        transfer::public_transfer(nft, recipient);
    }

    // Get NFT details
    public fun get_nft_info(nft: &SimpleNFT): (String, String, String, address) {
        (nft.name, nft.description, nft.image_url, nft.creator)
    }

    // Update NFT description (only by creator)
    public fun update_description(
        nft: &mut SimpleNFT,
        new_description: vector<u8>,
        ctx: &TxContext
    ) {
        assert!(nft.creator == tx_context::sender(ctx), 0);
        nft.description = string::utf8(new_description);
    }
}


