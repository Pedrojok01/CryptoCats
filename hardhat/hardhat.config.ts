import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from "hardhat/config";
import "hardhat-contract-sizer";
// require("hardhat-docgen");

const privateKey: string | undefined = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 9999,
      },
    },
  },
  networks: {
    main: {
      url: `${process.env.API_NODE_ETH}`,
      accounts: privateKey !== undefined ? [privateKey] : [],
      chainId: 1,
    },
    goerli: {
      url: `${process.env.API_NODE_GOERLI}`,
      accounts: privateKey !== undefined ? [privateKey] : [],
      chainId: 5,
    },
    // Polygon networks
    polygon: {
      url: `${process.env.API_NODE_POLYGON}`,
      accounts: privateKey !== undefined ? [privateKey] : [],
      chainId: 137,
    },
    mumbai: {
      url: `${process.env.API_NODE_POLYGON_MUMBAI}`,
      accounts: privateKey !== undefined ? [privateKey] : [],
      chainId: 80001,
    },
    // BNB Chain networks
    bnb_chain: {
      url: `${process.env.API_NODE_BSC}`,
      accounts: privateKey !== undefined ? [privateKey] : [],
      chainId: 56,
    },
    bnb_testnet: {
      url: `${process.env.API_NODE_BSC_TEST}`,
      accounts: privateKey !== undefined ? [privateKey] : [],
      chainId: 97,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
  contractSizer: {
    runOnCompile: true,
    strict: true,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  // paths: {
  //     root: "./hardhat/",
  //     sources: "./contracts",
  //     tests: "./test",
  //     cache: "./cache",
  //     artifacts: "./artifacts",
  // },
  // docgen: {
  //   path: "./docs",
  //   clear: true,
  //   runOnCompile: true,
  // },
};

export default config;
