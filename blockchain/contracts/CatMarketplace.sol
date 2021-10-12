// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./interface/ICatMarketplace.sol";
import "./Catcontract.sol";


contract CatMarketplace is ICatMarketPlace, Ownable {
    Catcontract private _catContract;


    /*Storage:
     **********/

    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

    Offer[] offers;

    mapping(uint256 => Offer) tokenIdToOffer;
    mapping(uint256 => uint256) tokenIdToOfferId;


    /*Constructor:
     **************/

    constructor(address _catContractAddress) {
        _catContract = Catcontract(_catContractAddress);
    }


    /*Functions:
     ************/

    //Set the current Catcontract address and initialize the instance of Catcontract:
    function setCatContract(address _catContractAddress) external onlyOwner {
        _catContract = Catcontract(_catContractAddress);
    }

    //Get the details about a offer for _tokenId.
    function getOffer(uint256 _tokenId)
        external
        view
        override
        returns (
            address seller,
            uint256 price,
            uint256 index,
            uint256 tokenId,
            bool active
        )
    {
        require(_isOffer(_tokenId), "This cat isn't for sale!");
        
        Offer memory offer = tokenIdToOffer[_tokenId];

        return (offer.seller, offer.price, offer.index, offer.tokenId, offer.active);
    }

    //Get all tokenId's that are currently for sale. Returns an empty array if none exist.
    function getAllTokenOnSale()
        external
        view
        override
        returns (uint256[] memory listOfOffers)
    {
        uint256 totalOffers = offers.length;

        if (totalOffers == 0) {
            return new uint256[](0);
        } else {
            listOfOffers = new uint256[](totalOffers);

            for (uint256 offerId = 0; offerId < totalOffers; offerId++) {
                if (offers[offerId].active != false)
                    listOfOffers[offerId] = offers[offerId].tokenId;
            }
        }

        return listOfOffers;
    }

    // Creates a new offer for _tokenId for the price _price.
    function setOffer(uint256 _price, uint256 _tokenId) external override {
        require(
            msg.sender == _catContract.ownerOf(_tokenId),
            "You do not own this cat!"
        );
        require(
            tokenIdToOffer[_tokenId].active == false,
            "This cat is already on sale!"
        );

        _catContract.approve(address(this), _tokenId);

        Offer memory _offer = Offer({
            seller: payable(msg.sender),
            price: _price,
            index: offers.length,
            tokenId: _tokenId,
            active: true
        });

        offers.push(_offer);

        tokenIdToOffer[_tokenId] = _offer;
        tokenIdToOfferId[_tokenId] = _offer.index;

        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }

    // Removes an existing offer.
    function removeOffer(uint256 _tokenId) external override {
        require(
            msg.sender == tokenIdToOffer[_tokenId].seller,
            "This cat isn't yours!"
        );
        require(_isOffer(_tokenId), "This cat isn't on sale!");

        // Delete offer's info:
        delete offers[tokenIdToOfferId[_tokenId]];

        // Remove offer from mapping:
        delete tokenIdToOffer[_tokenId];

        // Delete token approval:
        _catContract.deleteApproval(_tokenId);

        emit MarketTransaction("Cancel offer", msg.sender, _tokenId);
    }

    //Executes the purchase of _tokenId.
    function buyCat(uint256 _tokenId) external payable override {
        require(_isOffer(_tokenId), "This cat isn't for sale!");
        require(
            msg.sender != tokenIdToOffer[_tokenId].seller,
            "This is already your cat!"
        );
        require(msg.value == tokenIdToOffer[_tokenId].price, "Wrong price!");

        // Delete offer info
        delete offers[tokenIdToOfferId[_tokenId]];
        // Remove offer in mapping
        delete tokenIdToOffer[_tokenId];

        tokenIdToOffer[_tokenId].seller.transfer(msg.value);
        _catContract.safeTransferFrom(tokenIdToOffer[_tokenId].seller, msg.sender, _tokenId);

        emit MarketTransaction("Buy", msg.sender, _tokenId);
    }

    function _isOffer(uint256 _tokenId) private view returns (bool) {
        return tokenIdToOffer[_tokenId].active == true;
    }
}
