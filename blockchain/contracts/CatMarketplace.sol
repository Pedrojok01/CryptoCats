// SPDX-License-Identifier: MIT
pragma solidity = 0.8.9;

import "./interface/ICatMarketplace.sol";
import "./Catcontract.sol";
import "./Ownable.sol";


abstract contract CatMarketplace is ICatMarketPlace, Ownable {
    Catcontract private _catContract;

    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

    Offer[] offers;

    mapping(uint256 => Offer) tokenIdTOffer;



}