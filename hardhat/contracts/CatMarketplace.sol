// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {ICatMarketplace} from "./interface/ICatMarketplace.sol";
import {CatContract} from "./CatContract.sol";

contract CatMarketplace is ICatMarketplace, Ownable, ReentrancyGuard {
    CatContract private _catContract;

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

    /* Errors:
     **********/

    error CatMarketplace__CatNotOwned(uint256 catId);
    error CatMarketplace__CatAlreadyOwned(uint256 catId);
    error CatMarketplace__AlreadyOnSale(uint256 catId);
    error CatMarketplace__NotOnSale(uint256 catId);
    error CatMarketplace__NoOfferForThisCat(uint256 catId);
    error CatMarketplace__InvalidPrice(uint256 sent, uint256 wanted);

    /*Constructor:
     **************/

    constructor(address _catContractAddress) Ownable(_msgSender()) {
        _catContract = CatContract(_catContractAddress);
    }

    /*Functions:
     ************/

    /// @notice Creates a new offer for _tokenId for the price _price.
    function setOffer(
        uint256 _price,
        uint256 _tokenId
    ) external override nonReentrant {
        if (_msgSender() != _catContract.ownerOf(_tokenId)) {
            revert CatMarketplace__CatNotOwned({catId: _tokenId});
        }
        if (this.isOffer(_tokenId)) {
            revert CatMarketplace__AlreadyOnSale({catId: _tokenId});
        }

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
        if (!this.isOffer(_tokenId)) {
            revert CatMarketplace__NoOfferForThisCat({catId: _tokenId});
        }
        if (_msgSender() != tokenIdToOffer[_tokenId].seller) {
            revert CatMarketplace__CatNotOwned({catId: _tokenId});
        }

        _removeOffer(_tokenId);

        emit MarketTransaction("Cancel offer", _msgSender(), _tokenId);
    }

    /// @notice Executes the purchase of _tokenId.
    function buyCat(uint256 _tokenId) external payable override nonReentrant {
        Offer memory offer = tokenIdToOffer[_tokenId];

        if (!this.isOffer(_tokenId)) {
            revert CatMarketplace__NotOnSale({catId: _tokenId});
        }
        if (_msgSender() == offer.seller) {
            revert CatMarketplace__CatAlreadyOwned({catId: _tokenId});
        }
        if (msg.value != offer.price) {
            revert CatMarketplace__InvalidPrice({
                sent: msg.value,
                wanted: offer.price
            });
        }

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
    )
        external
        view
        override
        returns (address seller, uint256 price, uint256 index, uint256 tokenId)
    {
        Offer memory offer = tokenIdToOffer[_tokenId];

        return (offer.seller, offer.price, offer.index, offer.tokenId);
    }

    /// @notice Get all tokenId's that are currently for sale. Returns an empty array if none exist.
    function getAllTokenOnSale()
        external
        view
        override
        returns (uint256[] memory listOfOffers)
    {
        listOfOffers = offersIds;
    }

    /// @notice Check if an offer is active
    function isOffer(uint256 _tokenId) external view returns (bool) {
        return tokenIdToOffer[_tokenId].seller != address(0);
    }

    /* Restricted:
     ***************/

    /// @notice Set the current CatContract address and initialize the instance of CatContract:
    function setCatContract(
        address _catContractAddress
    ) external override onlyOwner {
        address oldAddress = address(_catContract);
        _catContract = CatContract(_catContractAddress);
        emit CatAddressUpdated(oldAddress, _catContractAddress);
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
