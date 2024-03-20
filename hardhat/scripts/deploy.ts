import hre, { ethers } from "hardhat";
import fs from "fs";

const MAX_CAT_SUPPLY = 100_000;
const MAX_GEN_ZERO = 100;

async function main() {
  const CatContract = await ethers.getContractFactory("CatContract");
  const catContract = await CatContract.deploy(MAX_CAT_SUPPLY, MAX_GEN_ZERO);
  await catContract.waitForDeployment();
  const catAddress = await catContract.getAddress();

  console.log("\n");
  console.log("CatContract deployed to: ", catAddress);
  console.log("\n");

  /** WAITING:
   ************/
  await catContract.deploymentTransaction()?.wait(2);

  const Marketplace = await ethers.getContractFactory("CatMarketplace");
  const marketplace = await Marketplace.deploy(catAddress);
  await marketplace.waitForDeployment();
  const marketAddress = await marketplace.getAddress();

  console.log("\n");
  console.log("Marketplace deployed to: ", marketAddress);
  console.log("\n");

  // Get CatContract ABI
  const catABI = JSON.parse(
    fs.readFileSync(
      "./hardhat/artifacts/contracts/CatContract.sol/CatContract.json",
      "utf8"
    )
  );
  const abi1 = JSON.stringify(catABI.abi);

  console.log("CatContract ABI:");
  console.log("\n");
  console.log(abi1);
  console.log("\n");

  // Get CatMarketplace ABI
  const marketABI = JSON.parse(
    fs.readFileSync(
      "./hardhat/artifacts/contracts/CatMarketplace.sol/CatMarketplace.json",
      "utf8"
    )
  );
  const abi2 = JSON.stringify(marketABI.abi);

  console.log("Marketplace ABI:");
  console.log("\n");
  console.log(abi2);
  console.log("\n");

  /** WAITING:
   ************/
  await marketplace.deploymentTransaction()?.wait(5);

  /** VERIFICATION:
   *****************/
  await hre.run("verify:verify", {
    address: catAddress,
    constructorArguments: [MAX_CAT_SUPPLY, MAX_GEN_ZERO],
  });

  await hre.run("verify:verify", {
    address: marketAddress,
    constructorArguments: [catAddress],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
