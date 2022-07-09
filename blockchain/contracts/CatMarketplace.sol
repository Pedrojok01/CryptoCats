// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

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
    }

    uint256[] private offersIds;
    mapping(uint256 => Offer) tokenIdToOffer; // Map from cat Id to offer struct

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
            uint256 tokenId
        )
    {
        Offer memory offer = tokenIdToOffer[_tokenId];

        return (offer.seller, offer.price, offer.index, offer.tokenId);
    }

    //Get all tokenId's that are currently for sale. Returns an empty array if none exist.
    function getAllTokenOnSale() external view override returns (uint256[] memory listOfOffers) {
        listOfOffers = offersIds;
    }

    // Creates a new offer for _tokenId for the price _price.
    function setOffer(uint256 _price, uint256 _tokenId) external override {
        require(msg.sender == _catContract.ownerOf(_tokenId), "You do not own this cat!");
        require(_isOffer(_tokenId) == false, "This cat is already on sale!");

        _catContract.approve(address(this), _tokenId);

        Offer memory _offer = Offer({
            seller: payable(msg.sender),
            price: _price,
            index: offersIds.length,
            tokenId: _tokenId
        });

        offersIds.push(_offer.tokenId);
        tokenIdToOffer[_tokenId] = _offer;

        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }

    // Removes an existing offer.
    function removeOffer(uint256 _tokenId) external override {
        require(_isOffer(_tokenId) == true, "No offer for this cat!");
        require(msg.sender == tokenIdToOffer[_tokenId].seller, "This cat isn't yours!");

        _removeOffer(_tokenId);

        emit MarketTransaction("Cancel offer", msg.sender, _tokenId);
    }

    //Executes the purchase of _tokenId.
    function buyCat(uint256 _tokenId) external payable override {
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(_isOffer(_tokenId) == true, "This cat isn't for sale!");
        require(msg.sender != offer.seller, "This is already your cat!");
        require(msg.value == offer.price, "Wrong price!");

        _removeOffer(_tokenId);

        offer.seller.transfer(offer.price);
        _catContract.transferFrom(offer.seller, msg.sender, _tokenId);

        emit MarketTransaction("Buy", msg.sender, _tokenId);
    }

    function _removeOffer(uint256 _tokenId) private {
        uint256 offerToRemove = tokenIdToOffer[_tokenId].index;
        uint256 temp = offersIds[offersIds.length - 1];

        delete tokenIdToOffer[_tokenId];

        if (_tokenId != temp) {
            // switch offerToRemove and last offer in offers arr
            offersIds[offerToRemove] = temp;
            tokenIdToOffer[temp].index = offerToRemove;
        }

        offersIds.pop();
    }

    // Check if an offer is active
    function _isOffer(uint256 _tokenId) private view returns (bool) {
        return tokenIdToOffer[_tokenId].seller != address(0);
    }
}
