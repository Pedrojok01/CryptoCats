// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./interface/IERC721.sol";
import "./Ownable.sol";


contract Catcontract is IERC721, Ownable {


/*Storage:
**********/

    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)")); // To check if contract is ERC721 compliant
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    string public tokenName; // Token name
    string public tokenSymbol; // Token symbol

    uint8 public CREATION_LIMIT_GEN0; // Max Gen0 supply, definied in constructor
    uint8 public gen0Count = 0; // Track the number of Gen0 cats
    uint256 public maxCatsSupply; // Max cats supply, definied in constructor
    uint256 public catsSupplyCount; // Actual cats supply

    struct Cat {
        uint16 generation;
        uint32 dadId;
        uint32 mumId;
        uint64 birthTime;
        uint256 genes;
    }

    Cat[] cats; // Cat storage array
    mapping(uint256 => address) public catOwner;  // Map from token ID to owner address
    mapping(address => uint256) catTokenCount; //Map cats number by owner == get cats per address
    mapping (uint256 => address) public catIndexToApproved;
    mapping (address => mapping ( address => bool)) internal _operatorApprovals; // Check if there is an approval for another address (true or false)



/*Events:
*********/

    event Birth(address indexed owner, uint256 indexed catId, uint256 dadId, uint256 mumId, uint256 genes);



/*Constructor:
**************/

    constructor(string memory _name, string memory _symbol, uint256 _maxCatsSupply, uint8 _CREATION_LIMIT_GEN0) {
        tokenName = _name;
        tokenSymbol = _symbol;
        maxCatsSupply = _maxCatsSupply;
        CREATION_LIMIT_GEN0 = _CREATION_LIMIT_GEN0;
        _createKitty(0, 0, 0, uint256(79132031251211), address(0));
    }



/*Functions:
************/

/* CHECK FUNCTIONS:
===================*/

    // Check is this contract support ERC721 or ERC165 standart
    function supportsInterface(bytes4 _interfaceId) external pure returns (bool) {
        return (_interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
    }

    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns(bool) {
        if (!_isContract(_to)) {
            return true;
        } 
        //Call onERC721Received in the _to contract
        bytes4 returnData = IERC721TokenReceiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
        // Check the return value (in IERC interface)
        return returnData == MAGIC_ERC721_RECEIVED;
    }

    function _isContract(address _to) internal view returns (bool) {
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }
        return size > 0;
    }

    function _isOwnerOrApproved(address _from, address _to, uint256 _tokenId) internal view returns (bool) {
        require(ownerOf(_tokenId) == _from, "the sender address do not own this token");
        require(_to != address(0), "ERC721: transfer to the zero address");
        require(_tokenId < cats.length, "This cat doesn't exist!");

        return (msg.sender == _from || _operatorApprovals[_from][msg.sender] == true || catIndexToApproved[_tokenId] == msg.sender);
    }




/* BASIC FUNCTIONS:
===================*/

    //Returns the name of the token
    function name() external override view returns (string memory _name) {
        _name = tokenName;
        return tokenName;
    }

    //Returns the symbole of the token
    function symbol() external override view returns (string memory _symbol) {
        _symbol = tokenSymbol;
        return tokenSymbol;
    }

    //Returns the actual number of tokens in circulation
    function totalSupply() public override view returns (uint256) {
        return cats.length;
    }

    //Returns the acutal number of Gen0 cats in circulation
    function Gen0Count() external view returns (uint8) {
        return gen0Count;
    }

    //Returns the max number of tokens in circulation
    function maxSupply() external view returns (uint256) {
        return maxCatsSupply;
    }

    //Returns the owner of the `tokenId` token
    function ownerOf(uint256 _tokenId) public view returns (address) {
        return catOwner[_tokenId];
    }

    //Returns the number of tokens in ``owner``'s account
    function balanceOf(address _owner) public view returns (uint256 count) {
        return catTokenCount[_owner];
    }

    // Withdraws ETH from this contract
    function withdrawBalance() public onlyOwner {
        require(address(this).balance > 0, "Balance is zero.");

        payable(msg.sender).transfer(address(this).balance);
  }



/* APPROVE FUNCTIONS:
=====================*/

    // Change or reaffirm the approved address for an NFT
    function approve(address _approved, uint256 _tokenId) onlyOwner external {
        require(ownerOf(_tokenId) == msg.sender, "You are not entitled to do this!");
        _approve(_approved, _tokenId);
        emit Approval(msg.sender, _approved, _tokenId);
    }
            //(msg.sender == _from || _operatorApprovals[_from][msg.sender] == true || catIndexToApproved[_tokenId] == msg.sender);


    function _approve(address _approved, uint256 _tokenId) internal {
        catIndexToApproved[_tokenId] = _approved;
    }

    ///Enable or disable approval for a third party ("operator") to manage all of `msg.sender`'s assets
    function setApprovalForAll(address _operator, bool _approved) onlyOwner external {
        require(_operator != msg.sender, "There is no point in approving yourself!");
        _setApprovalForAll(_operator,_approved);
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function _setApprovalForAll(address _operator, bool _approved) internal {
        _operatorApprovals[msg.sender][_operator] = _approved;
    }

    // Get the approved address for a single NFT
    function isApproved(uint256 _tokenId) external view returns (address) {
        require(_tokenId < cats.length, "This cat doesn't exist!");
        return catIndexToApproved[_tokenId];
    }

    // Query if an address is an authorized operator for another address
    function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
        return _operatorApprovals[_owner][_operator];
    }

    //Delete approval for a token
    function deleteApproval(uint256 _tokenId) public {
      require(ownerOf(_tokenId) == msg.sender, "You're not the owner of this cat!");
      delete catIndexToApproved[_tokenId];
    }



/* TRANSFER FUNCTIONS:
======================*/


    //Transfers `tokenId` token from `msg.sender` to `to`.
    function transfer(address _to, uint256 _tokenId) external { 
        require(_to != address(0), "ERC721: transfer to the 0 address");
        require(_to != address(this), "ERC721: transfer to the contract address");

        _transfer(msg.sender, _to, _tokenId);
    }


    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        require(ownerOf(_tokenId) == _from, "You're not the owner of this cat!");

        if (_from != address(0)) {
          catTokenCount[_from] -= 1;
          deleteApproval(_tokenId);
        }
        catTokenCount[_to]++;
        catOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        require(_checkERC721Support(_from, _to, _tokenId, _data));
        _transfer(_from, _to, _tokenId);
    }
    
    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        require(_checkERC721Support(_from, _to, _tokenId, _data));
        _transfer(_from, _to, _tokenId);
    }


    // Transfer ownership of an NFT
    function transferFrom(address _from, address _to, uint256 _tokenId) external {
        require(_to != address(0), "ERC721: transfer to the 0 address");
        require(_isOwnerOrApproved(_from, _to, _tokenId));
        _transfer(_from, _to, _tokenId);
    }

    // Transfers the ownership of an NFT from one address to a smart-contract
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) public {
        require(_isOwnerOrApproved(_from, _to, _tokenId));
        _safeTransfer(_from, _to, _tokenId, _data);
    }

    // Transfers the ownership of an NFT from one address to another address
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
        safeTransferFrom(_from, _to, _tokenId, "");
    }




/* CREATE CAT FUNCTIONS:
========================*/


    // Create Gen0 cats
    function createCatGen0 (uint256 _genes) public {
        require(gen0Count < CREATION_LIMIT_GEN0, "All gen-0 cats are already in circulation!");
  /*      
        // Check if a cat already exist with those specific genes:
        uint[] memory genOCats = getCatsPerGeneration(0);

        for (uint256 i = 0; i < gen0Count; i++) {
            if (_genes == cats[genOCats[i]].genes) {
                revert();
            }
        }
*/
        gen0Count++;
        _createKitty(0, 0, 0, _genes, msg.sender);   
    }


    // Create cats
    function _createKitty(uint256 _generation, uint256 _dadId, uint256 _mumId, uint256 _genes, address _owner) internal returns(uint256) {
        Cat memory _cat = Cat({
            generation: uint16(_generation),
            dadId: uint32(_dadId),
            mumId:  uint32(_mumId),
            birthTime: uint64(block.timestamp),
            genes: _genes
        });
        
        cats.push(_cat);
        uint256 newCatId = cats.length -1;
        catsSupplyCount++;

        emit Birth(_owner, newCatId, _dadId, _mumId, _genes);
        _transfer(address(0), _owner, newCatId);
        return newCatId;
    }



/* GET CAT FUNCTIONS:
======================*/

    //Display all cats per generation:
    function getCatsPerGeneration(uint16 _generation) public view returns (uint256[] memory catsPerGen) {
        for (uint256 tokenId = 1; tokenId <= totalSupply(); tokenId++) {
            if (cats[tokenId].generation == _generation) {
                uint index = 0;
                catsPerGen[index] = tokenId;
                index++;
            }
        }
        return catsPerGen;
    }
    
    
    // Get all cats per owner:
    function tokensPerOwner(address _owner) public view returns(uint256[] memory tokensOwned) {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            tokensOwned = new uint256[](tokenCount);
            uint256 index = 0;
            for (uint tokenId = 0; tokenId < totalSupply(); tokenId++) {
                if (catOwner[tokenId] == _owner) {
                    tokensOwned[index] = tokenId;
                    index++;
                }
            }
            return tokensOwned;
        }
    }

    //Get cat genes per cat id:
    function getCat(uint256 _tokenId) public view returns (
      uint256 generation,
      uint256 dadId,
      uint256 mumId,
      uint256 birthTime,
      uint256 genes      
    )
  {
    require(_tokenId < cats.length, "This cat doesn't exist!");
    Cat storage cat = cats[_tokenId];

    generation = cat.generation;
    dadId = cat.dadId;
    mumId = cat.mumId;
    birthTime = cat.birthTime;
    genes = cat.genes;
  }



/* BREED CAT FUNCTIONS:
=======================*/

    function breed(uint256 _dadId, uint256 _mumId) public returns (uint256) {
        require (ownerOf(_dadId) == msg.sender && ownerOf(_mumId) == msg.sender, "You do not own those cats!");
        uint256 dadDna = cats[_dadId].genes;
        uint256 mumDna = cats[_mumId].genes;
        uint256 kidDna = _mixDna(dadDna, mumDna);
        
        uint16 _generation = 0; 
        if (cats[_mumId].generation >= cats[_dadId].generation) {
            _generation = cats[_mumId].generation++;
        } else {
            _generation = cats[_dadId].generation++;
        }
        
        return _createKitty(_generation, _dadId, _mumId, kidDna, msg.sender);
    }


    function _mixDna(uint256 _dadDna, uint256 _mumDna) internal view returns (uint256) {
        uint256[8] memory geneArray;
        uint8 random = uint8 ( block.timestamp % 255 ); // binary between 00000000-11111111
        uint256 index =7;
        uint256 newGene;
        
        for (uint256 i = 1; i <= 128; i=i*2) {
            if (random & i != 0) {
                geneArray[index] = uint8( _mumDna % 100);
            } else {
                geneArray[index] = uint8( _dadDna % 100);
            }

            _mumDna = _mumDna /100;
            _dadDna = _dadDna /100;

            index--;

            for (i = 0; i < 9; i++) {
                newGene = newGene + geneArray[i];
                if (i == 5 || i == 6) {
                    newGene = newGene * 10;
                }
                else if (i !=8) {
                    newGene = newGene * 100;
                }
            }
        }
        
        return newGene;
        
        /*
        uint256 firstHalf = _dadDna / 100000000;
        uint256 secondHalf = _mumDna % 100000000;

        return (firstHalf*100000000) + secondHalf;
        */
    }


}


