// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import {ICatMarketplace} from "./interface/ICatMarketplace.sol";
import {Catcontract} from "./Catcontract.sol";
import {Ownable} from "./security/Ownable.sol";
import {ReentrancyGuard} from "./security/ReentrancyGuard.sol";

contract CatMarketplace is ICatMarketplace, Ownable, ReentrancyGuard {
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
    mapping(uint256 => Offer) public tokenIdToOffer; // Map from cat Id to offer struct

    /*Constructor:
     **************/

    constructor(address _catContractAddress) {
        _catContract = Catcontract(_catContractAddress);
    }

    /*Functions:
     ************/

    /// @notice Creates a new offer for _tokenId for the price _price.
    function setOffer(uint256 _price, uint256 _tokenId) external override nonReentrant {
        require(_msgSender() == _catContract.ownerOf(_tokenId), "Market: not owned");
        require(!this.isOffer(_tokenId), "Market: Already on sale");

        _catContract.approve(address(this), _tokenId);

        Offer memory _offer = Offer({
            seller: payable(_msgSender()),
            price: _price,
            index: offersIds.length,
            tokenId: _tokenId
        });

        offersIds.push(_offer.tokenId);
        tokenIdToOffer[_tokenId] = _offer;

        emit MarketTransaction("Create offer", _msgSender(), _tokenId);
    }

    /// @notice Removes an existing offer.
    function removeOffer(uint256 _tokenId) external override {
        require(this.isOffer(_tokenId), "Market: No offer for this cat!");
        require(_msgSender() == tokenIdToOffer[_tokenId].seller, "Market: cat not owned");

        _removeOffer(_tokenId);

        emit MarketTransaction("Cancel offer", _msgSender(), _tokenId);
    }

    /// @notice Executes the purchase of _tokenId.
    function buyCat(uint256 _tokenId) external payable override nonReentrant {
        Offer memory offer = tokenIdToOffer[_tokenId];
        require(this.isOffer(_tokenId), "Market: Not on sale");
        require(_msgSender() != offer.seller, "Market: Already owned");
        require(msg.value == offer.price, "Market: Invalid price");

        _removeOffer(_tokenId);

        offer.seller.transfer(offer.price);
        _catContract.transferFrom(offer.seller, _msgSender(), _tokenId);

        emit MarketTransaction("Buy", _msgSender(), _tokenId);
    }

    /* View:
     *********/

    /// @notice Get the details about a offer for _tokenId.
    function getOffer(
        uint256 _tokenId
    ) external view override returns (address seller, uint256 price, uint256 index, uint256 tokenId) {
        Offer memory offer = tokenIdToOffer[_tokenId];

        return (offer.seller, offer.price, offer.index, offer.tokenId);
    }

    /// @notice Get all tokenId's that are currently for sale. Returns an empty array if none exist.
    function getAllTokenOnSale() external view override returns (uint256[] memory listOfOffers) {
        listOfOffers = offersIds;
    }

    /// @notice Check if an offer is active
    function isOffer(uint256 _tokenId) external view returns (bool) {
        return tokenIdToOffer[_tokenId].seller != address(0);
    }

    /* Restricted:
     ***************/

    /// @notice Set the current Catcontract address and initialize the instance of Catcontract:
    function setCatContract(address _catContractAddress) external override onlyOwner {
        _catContract = Catcontract(_catContractAddress);
    }

    /* Private:
     ************/

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
}
