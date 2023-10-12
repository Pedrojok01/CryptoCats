// export const isProdEnv = process.env.NODE_ENV === "production" ? true : false;
export const isProdEnv = false; // Bypass Netlify prod deployment

export const SUPPORTED_CHAIN = {
  mainnet: 1,
  testnet: 5,
};

// Goerli Testnet
export const CAT_CONTRACT_ADD_TEST = "0x1755308f558C1ec14d54Fd12D0588E626148a679" as `0x${string}`;
export const MARKETPLACE_CONTRACT_ADD_TEST = "0x3ed18F523e16888eC4D44F6fa25ccD12137605Fa" as `0x${string}`;

// Ethereum Mainnet
export const CAT_CONTRACT_ADD = "" as `0x${string}`;
export const MARKETPLACE_CONTRACT_ADD = "" as `0x${string}`;

export const getContractAddresses = () => {
  if (isProdEnv) {
    return {
      catAddress: CAT_CONTRACT_ADD,
      marketplaceAddress: MARKETPLACE_CONTRACT_ADD,
    };
  } else
    return {
      catAddress: CAT_CONTRACT_ADD_TEST,
      marketplaceAddress: MARKETPLACE_CONTRACT_ADD_TEST,
    };
};

export const getChain = () => {
  if (isProdEnv) {
    return SUPPORTED_CHAIN.mainnet;
  } else {
    return SUPPORTED_CHAIN.testnet;
  }
};
