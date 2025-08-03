/*
#[test_only]
module simple_nft::simple_nft_tests {
    use simple_nft::simple_nft::{Self, SimpleNFT};
    use sui::test_scenario;
    use std::string;

    #[test]
    fun test_mint_nft() {
        let creator = @0xCAFE;
        let recipient = @0xBEEF;
        
        let mut scenario = test_scenario::begin(creator);
        
        // Mint an NFT
        {
            simple_nft::mint_nft(
                b"My First NFT",
                b"This is my first NFT on Sui",
                b"https://example.com/image.png",
                recipient,
                test_scenario::ctx(&mut scenario)
            );
        };
        
        // Check if NFT was created for recipient
        test_scenario::next_tx(&mut scenario, recipient);
        {
            let nft = test_scenario::take_from_sender<SimpleNFT>(&scenario);
            let (name, description, image_url, nft_creator) = simple_nft::get_nft_info(&nft);
            
            assert!(name == string::utf8(b"My First NFT"), 0);
            assert!(description == string::utf8(b"This is my first NFT on Sui"), 1);
            assert!(image_url == string::utf8(b"https://example.com/image.png"), 2);
            assert!(nft_creator == creator, 3);
            
            test_scenario::return_to_sender(&scenario, nft);
        };
        
        test_scenario::end(scenario);
    }

    #[test]
    fun test_update_description() {
        let creator = @0xCAFE;
        
        let mut scenario = test_scenario::begin(creator);
        
        // Mint an NFT
        {
            simple_nft::mint_nft(
                b"Test NFT",
                b"Original description",
                b"https://example.com/test.png",
                creator,
                test_scenario::ctx(&mut scenario)
            );
        };
        
        // Update description
        test_scenario::next_tx(&mut scenario, creator);
        {
            let mut nft = test_scenario::take_from_sender<SimpleNFT>(&scenario);
            simple_nft::update_description(
                &mut nft,
                b"Updated description",
                test_scenario::ctx(&scenario)
            );
            
            let (_, description, _, _) = simple_nft::get_nft_info(&nft);
            assert!(description == string::utf8(b"Updated description"), 0);
            
            test_scenario::return_to_sender(&scenario, nft);
        };
        
        test_scenario::end(scenario);
    }
}
*/
