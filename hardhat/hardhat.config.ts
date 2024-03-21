import dotenv from "dotenv";
dotenv.config();
import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
import "hardhat-contract-sizer";
// require("hardhat-docgen");

const privateKey: string | undefined = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 9999,
      },
    },
  },
  networks: {
    main: {
      url: `${process.env.PRC_URL_ETH}`,
      accounts: privateKey !== undefined ? [privateKey] : [],
      chainId: 1,
    },
    sepolia: {
      url: `${process.env.PRC_URL_SEPOLIA}`,
      accounts: privateKey !== undefined ? [privateKey] : [],
      chainId: 11155111,
    },
    // Polygon networks
    polygon: {
      url: `${process.env.PRC_URL_POLYGON}`,
      accounts: privateKey !== undefined ? [privateKey] : [],
      chainId: 137,
    },
    mumbai: {
      url: `${process.env.PRC_URL_POLYGON_MUMBAI}`,
      accounts: privateKey !== undefined ? [privateKey] : [],
      chainId: 80001,
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
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  // docgen: {
  //   path: "./docs",
  //   clear: true,
  //   runOnCompile: true,
  // },
};

export default config;
