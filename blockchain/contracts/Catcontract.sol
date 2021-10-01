// SPDX-License-Identifier: MIT
pragma solidity = 0.8.8;

import "./IERC721.sol";
import "./Ownable.sol";


contract Catcontract is ERC721, Ownable {


/*Storage:
**********/

    uint256 public maxCatsSupply; // Max cats supply
    uint256 public catsSupplyCount; // Actual cats supply
    uint256 public CREATION_LIMIT_GEN0; // Max Gen0 cats
    uint256 public gen0Count = 0; // Actual Gen0 cats

    string public tokenName; // Token name
    string public tokenSymbol; // Token symbol

    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)")); // To check if contract is ERC721 compliant
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;


    struct Cat {
        uint16 generation;
        uint32 dadId;
        uint32 mumId;
        uint64 birthTime;
        uint256 genes;
    }

    Cat[] cats; // Cat storage array
    mapping(uint256 => address) private catOwner;  // Map from token ID to owner address
    mapping(address => uint256) catTokenCount; //Map cats number by owner == get cats per address
    mapping (uint256 => address) public catIndexToApproved;
    mapping (address => mapping ( address => bool)) private _operatorApprovals; // Check if there is an approval for another address (true or false)

    

/*Events:
*********/

    event Birth(address owner, uint256 catId, uint256 dadId, uint256 mumId, uint256 genes);



/*Constructor:
**************/

    constructor(string memory _name, string memory _symbol, uint256 _maxCatsSupply, uint256 _CREATION_LIMIT_GEN0) {
            tokenName = _name;
            tokenSymbol = _symbol;
            maxCatsSupply = _maxCatsSupply;
            CREATION_LIMIT_GEN0 = _CREATION_LIMIT_GEN0;
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
    function totalSupply() external override view returns (uint256) {
        return cats.length;
    }

    //Returns the max number of tokens in circulation
    function maxSupply() external view returns (uint256) {
        return maxCatsSupply;
    }

    //Returns the owner of the `tokenId` token
    function ownerOf(uint256 _tokenId) public view override returns (address) {
        return catOwner[_tokenId];
    }

    //Returns the number of tokens in ``owner``'s account
    function balanceOf(address _owner) external override view returns (uint256) {
        return catTokenCount[_owner];
    }



/* APPROVE FUNCTIONS:
=====================*/

    // Change or reaffirm the approved address for an NFT
    function approve(address _approved, uint256 _tokenId) onlyOwner external {
        require(ownerOf(_tokenId) == msg.sender || _operatorApprovals[msg.sender][_approved] == true || catIndexToApproved[_tokenId] == _approved, "You do not have the required approvals for this action!");
        _approve(_approved, _tokenId);
        emit Approval(msg.sender, _approved, _tokenId);
    }

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
    function getApproved(uint256 _tokenId) external view returns (address) {
        require(_tokenId < cats.length, "This cat doesn't exist!");
        return catIndexToApproved[_tokenId];
    }

    // Query if an address is an authorized operator for another address
    function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
        return _operatorApprovals[_owner][_operator];
    }

    //Delete approval for a token
    function deleteApproval(uint256 _tokenId) internal {
      require(ownerOf(_tokenId) == msg.sender, "You're not the owner of this cat!");
      delete catIndexToApproved[_tokenId];
    }



/* TRANSFER FUNCTIONS:
======================*/

    //Transfers `tokenId` token from `msg.sender` to `to`.
    function transfer(address _to, uint256 _tokenId) external { 
        require(_to != address(0), "ERC721: transfer to the zero address");
        require(_to != address(this), "ERC721: transfer to the contract address");

        _transfer(msg.sender, _to, _tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        require(ownerOf(_tokenId) == _from, "You're not the owner of this cat!");

        if (_from != address(0)) {
          catTokenCount[_from] -= 1;
          deleteApproval(_tokenId);
        }
        catTokenCount[_to] += 1;
        catOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, _data));
    }
    
    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, _data));
    }


    // Transfer ownership of an NFT
    function transferFrom(address _from, address _to, uint256 _tokenId) external {
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

// Create Gen0 cats (to be placed in the constructor)
    function createCatGen0 (uint256 _genes) public onlyOwner returns (uint256) {
        require(catsSupplyCount <= maxCatsSupply);

        gen0Count++;
        
        return _creatKitty(0, 0, 0, _genes, msg.sender);   
    }

    // Create cats
    function _creatKitty(uint256 _generation, uint256 _dadId, uint256 _mumId, uint256 _genes, address _owner) private returns(uint256) {
        Cat memory _cat = Cat({
            generation: uint16(_generation),
            dadId: uint32(_dadId),
            mumId:  uint32(_mumId),
            birthTime: uint64(block.timestamp),
            genes: _genes
        });

        require(gen0Count < CREATION_LIMIT_GEN0);
        
        cats.push(_cat);
        uint256 newCatId = cats.length;
        catsSupplyCount++;

        emit Birth(_owner, newCatId, _dadId, _mumId, _genes);
        _transfer(address(0), _owner, newCatId);
        return newCatId;
    }
    
    //Get Cat genes per Id
    function getCatGenes(uint256 _catId) public view returns (uint256 generation, uint256 dadId, uint256 mumId, uint256 birthTime, uint256 genes) {
        generation = cats[_catId].generation;
        dadId = cats[_catId].dadId; 
        mumId = cats[_catId].mumId; 
        birthTime = cats[_catId].birthTime;
        genes = cats[_catId].genes;
    }

/*    
    //Get Cat genes per Id
    function getCatGenes(uint256 _catId) external view returns (uint256 generation, uint256 dadId, uint256 mumId, uint256 birthTime, uint256 genes) {
        
        Cat storage cat = cats[_catId]; // pointer to storage in order to save GAS

        generation = uint256(cat.generation);
        dadId = uint256(cat.dadId); 
        mumId = uint256(cat.mumId); 
        birthTime = uint256(cat.birthTime);
        genes = uint256(cat.genes);
    }
*/




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
        
        return _creatKitty(_generation, _dadId, _mumId, kidDna, msg.sender);
    }


    function _mixDna(uint256 _dadDna, uint256 _mumDna) internal pure returns (uint256) {
        uint256 firstHalf = _dadDna / 100000000;
        uint256 secondHalf = _mumDna % 100000000;

        return (firstHalf*100000000) + secondHalf;
    }


}


