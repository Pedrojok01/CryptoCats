// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC721Enumerable} from "./ERC721/ERC721Enumerable.sol";
import {ERC721} from "./ERC721/ERC721.sol";
import {Ownable} from "./security/Ownable.sol";

contract Catcontract is ERC721Enumerable, Ownable {
    /* Storage:
     ***********/

    uint8 public immutable CREATION_LIMIT_GEN0; // Max Gen0 supply, definied in constructor
    uint8 public gen0Count = 0; // Actual number of Gen0 cats
    uint256 public immutable maxCatsSupply; // Max cats supply, definied in constructor
    uint256 public catsSupplyCount; // Actual cats supply

    struct Cat {
        uint16 generation;
        uint32 indexId;
        uint32 dadId;
        uint32 mumId;
        uint64 birthTime;
        uint256 genes;
    }

    Cat[] public cats; // Cat storage array

    /* Events:
     **********/

    event Birth(address indexed owner, uint256 indexed catId, uint256 dadId, uint256 mumId, uint256 genes);

    /* Constructor:
     ***************/

    constructor(uint256 _maxCatsSupply, uint8 _CREATION_LIMIT_GEN0) ERC721("CryptoCats", "CTC") {
        maxCatsSupply = _maxCatsSupply;
        CREATION_LIMIT_GEN0 = _CREATION_LIMIT_GEN0;
    }

    /*//////////////////////////////////////////////////////
                        MINT CAT FUNCTION
    //////////////////////////////////////////////////////*/

    /// @notice Create Gen0 cats
    function createCatGen0(uint256 _genes) public {
        require(gen0Count < CREATION_LIMIT_GEN0, "Catcontract: no more gen-0");

        uint32 tokenId = uint32(catsSupplyCount);
        gen0Count++;
        _createCat(0, tokenId, 0, 0, _genes, _msgSender());
    }

    /// @notice Create cats
    function _createCat(
        uint256 _generation,
        uint256 _tokenId,
        uint256 _dadId,
        uint256 _mumId,
        uint256 _genes,
        address _owner
    ) private returns (uint256) {
        Cat memory _cat = Cat({
            generation: uint16(_generation),
            indexId: uint32(_tokenId),
            dadId: uint32(_dadId),
            mumId: uint32(_mumId),
            birthTime: uint64(block.timestamp),
            genes: _genes
        });

        cats.push(_cat);
        uint256 newCatId = cats.length - 1;
        catsSupplyCount++;

        emit Birth(_owner, newCatId, _dadId, _mumId, _genes);
        _safeMint(_owner, newCatId);
        return newCatId;
    }

    /*//////////////////////////////////////////////////////
                        VIEW CAT FUNCTIONS
    //////////////////////////////////////////////////////*/

    /// @notice Get cat genes per cat id:
    function getCat(
        uint256 _tokenId
    )
        external
        view
        returns (uint256 generation, uint256 indexId, uint256 dadId, uint256 mumId, uint256 birthTime, uint256 genes)
    {
        require(_tokenId < cats.length, "Catcontract: cat doesn't exist");
        Cat storage cat = cats[_tokenId];

        generation = cat.generation;
        indexId = cat.indexId;
        dadId = cat.dadId;
        mumId = cat.mumId;
        birthTime = cat.birthTime;
        genes = cat.genes;
    }

    /// @notice Display all cats per generation:
    function getCatPerGeneration(uint16 _generation) external view returns (uint256[] memory catsPerGen) {
        for (uint256 tokenId = 1; tokenId <= totalSupply(); tokenId++) {
            if (cats[tokenId].generation == _generation) {
                uint256 index = 0;
                catsPerGen[index] = tokenId;
                index++;
            }
        }
        return catsPerGen;
    }

    /// @notice Get all cats per owner:
    function getCatPerOwner(address _owner) external view returns (uint256[] memory tokensOwned) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            tokensOwned = new uint256[](tokenCount);
            uint256 index = 0;
            for (uint256 tokenId = 0; tokenId < totalSupply(); tokenId++) {
                if (ownerOf(tokenId) == _owner) {
                    tokensOwned[index] = tokenId;
                    index++;
                }
            }
            return tokensOwned;
        }
    }

    /*//////////////////////////////////////////////////////
                        BREED CAT FUNCTIONS
    //////////////////////////////////////////////////////*/

    /// @notice Create a new seebling from two existing parents
    function breed(uint256 _dadId, uint256 _mumId) external returns (uint256) {
        require(ownerOf(_dadId) == _msgSender() && ownerOf(_mumId) == _msgSender(), "Catcontract: Not owned");
        require(_dadId != _mumId, "Catcontract: Same cat selected");
        uint256 dadDna = cats[_dadId].genes;
        uint256 mumDna = cats[_mumId].genes;
        uint256 kidDna = _mixDna(dadDna, mumDna);

        uint16 dadGen = cats[_dadId].generation;
        uint16 mumGen = cats[_mumId].generation;
        uint16 _generation = _setGeneration(dadGen, mumGen);

        uint16 newIndexId = uint16(catsSupplyCount);

        return _createCat(_generation, newIndexId, _dadId, _mumId, kidDna, _msgSender());
    }

    /// @notice set new generation
    function _setGeneration(uint16 _dadGen, uint256 _mumGen) private pure returns (uint16 generation) {
        if (_mumGen >= _dadGen) {
            generation = uint16(_mumGen + 1);
        } else {
            generation = uint16(_dadGen + 1);
        }
    }

    /// @notice Mix DNA from both parents with an extra 15% chance of mutation per gene
    function _mixDna(uint256 _dadDna, uint256 _mumDna) private view returns (uint256) {
        uint8 random = uint8(block.timestamp % 255); // binary between 00000000-11111111
        uint8 index = 7;
        uint16 i;
        uint256[8] memory geneArray;
        uint256 newGene;

        for (i = 1; i <= 128; i = i * 2) {
            uint256 randomMutation = _randomPercent();

            // 15% mutation chances
            if (randomMutation < 85) {
                if (random & i != 0) {
                    geneArray[index] = uint8(_mumDna % 100);
                } else {
                    geneArray[index] = uint8(_dadDna % 100);
                }
            } else {
                if (index == 5 || index == 7) {
                    geneArray[index] = uint8(randomCattribute());
                } else {
                    geneArray[index] = uint8(color10to98(_randomPercent()));
                }
            }

            _mumDna = _mumDna / 100;
            _dadDna = _dadDna / 100;

            if (i != 128) {
                index--;
            }
        }

        for (i = 0; i < 8; i++) {
            newGene += geneArray[i];
            if (i != 7) {
                newGene *= 100;
            }
        }

        return newGene;
    }

    /*//////////////////////////////////////////////////////
                       RESTRICTED FUNCTIONS
    //////////////////////////////////////////////////////*/

    /// @notice Withdraws ETH from this contract
    function withdrawBalance() external onlyOwner {
        require(address(this).balance > 0, "Catcontract: Balance is 0");
        payable(_msgSender()).transfer(address(this).balance);
    }

    /*//////////////////////////////////////////////////////
                        UTILS FUNCTIONS
    //////////////////////////////////////////////////////*/

    /// @notice !Pseudo Random number! between 00 and 98 = percent %
    function _randomPercent() private view returns (uint256) {
        uint256 percent = uint256(keccak256(abi.encodePacked(block.timestamp, _msgSender(), gasleft()))) % 98;
        return percent;
    }

    /// @notice return a !pseudo random number! between 10 and 98 for the random color
    function color10to98(uint256 _percent) private view returns (uint256) {
        uint256 result = _percent;
        while (result < 10) {
            result = _randomPercent();
        }
        return result;
    }

    /// @notice Return a random double digits number [from 1 to 6 , from 1 to 5] to match cattributes
    function randomCattribute() private view returns (uint256 result) {
        uint256 randomCattribute1 = color1to6(_randomPercent());
        uint256 randomCattribute2 = color1to5(_randomPercent());

        return randomCattribute1 * 10 + randomCattribute2;
    }

    function color1to6(uint256 _percent) private view returns (uint256) {
        uint256 result = _percent % 10;
        while (result == 0 || result > 6) {
            result = _randomPercent() % 10;
        }
        return result;
    }

    function color1to5(uint256 _percent) private view returns (uint256) {
        uint256 result = _percent % 10;
        while (result == 0 || result > 5) {
            result = _randomPercent() % 10;
        }
        return result;
    }
}
