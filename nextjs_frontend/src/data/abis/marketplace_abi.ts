import { type Abi } from "viem";

export const MARKET_ABI: Abi = [
  {
    inputs: [{ internalType: "address", name: "_catContractAddress", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "uint256", name: "catId", type: "uint256" }],
    name: "CatMarketplace__AlreadyOnSale",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "catId", type: "uint256" }],
    name: "CatMarketplace__CatAlreadyOwned",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "catId", type: "uint256" }],
    name: "CatMarketplace__CatNotOwned",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "sent", type: "uint256" },
      { internalType: "uint256", name: "wanted", type: "uint256" },
    ],
    name: "CatMarketplace__InvalidPrice",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "catId", type: "uint256" }],
    name: "CatMarketplace__NoOfferForThisCat",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "catId", type: "uint256" }],
    name: "CatMarketplace__NotOnSale",
    type: "error",
  },
  { inputs: [{ internalType: "address", name: "owner", type: "address" }], name: "OwnableInvalidOwner", type: "error" },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "oldCatAddress", type: "address" },
      { indexed: false, internalType: "address", name: "newCatAddress", type: "address" },
    ],
    name: "CatAddressUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "string", name: "TxType", type: "string" },
      { indexed: false, internalType: "address", name: "owner", type: "address" },
      { indexed: false, internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "MarketTransaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "buyCat",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllTokenOnSale",
    outputs: [{ internalType: "uint256[]", name: "listOfOffers", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "getOffer",
    outputs: [
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "uint256", name: "index", type: "uint256" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "isOffer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "removeOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "_catContractAddress", type: "address" }],
    name: "setCatContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
    ],
    name: "setOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "tokenIdToOffer",
    outputs: [
      { internalType: "address payable", name: "seller", type: "address" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "uint256", name: "index", type: "uint256" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
