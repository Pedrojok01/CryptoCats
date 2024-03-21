import { ethers } from "hardhat";
import { CatContract, CatMarketplace } from "../typechain-types";
import { MAX_CAT_SUPPLY, MAX_GEN_ZERO } from "./constants";

export async function deploy() {
  const [owner, user1, user2, user3] = await ethers.getSigners();
  
  // Deploy all contracts:
  const CatContract = await ethers.getContractFactory("CatContract");
  const catContract: CatContract = await CatContract.deploy(MAX_CAT_SUPPLY, MAX_GEN_ZERO);
  await catContract.waitForDeployment();
  const catAddress = await catContract.getAddress();

  const CatMarketplace = await ethers.getContractFactory("CatMarketplace");
  const catMarketplace: CatMarketplace = await CatMarketplace.deploy(catAddress);
  await catMarketplace.waitForDeployment();
  const marketAddress = await catMarketplace.getAddress();

  return {
    owner,
    user1,
    user2,
    user3,
    catContract,
    catMarketplace,
    catAddress,
    marketAddress
  };
}
