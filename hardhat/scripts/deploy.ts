import hre, { ethers } from "hardhat";
import fs from "fs";

const MAX_CAT_SUPPLY = 100_000;
const MAX_GEN_ZERO = 100;

async function main() {
  const Catcontract = await ethers.getContractFactory("Catcontract");
  const catcontract = await Catcontract.deploy(MAX_CAT_SUPPLY, MAX_GEN_ZERO);
  await catcontract.deployed();

  console.log("\n");
  console.log("Catcontract deployed to: ", catcontract.address);
  console.log("\n");

  /** WAITING:
   ************/
  await catcontract.deployTransaction.wait(2);

  const Marketplace = await ethers.getContractFactory("CatMarketplace");
  const marketplace = await Marketplace.deploy(catcontract.address);
  await marketplace.deployed();

  console.log("\n");
  console.log("Marketplace deployed to: ", marketplace.address);
  console.log("\n");

  // Get SkinsNFT ABI
  const abiFile1 = JSON.parse(
    fs.readFileSync("./hardhat/artifacts/contracts/Catcontract.sol/Catcontract.json", "utf8")
  );
  const abi1 = JSON.stringify(abiFile1.abi);

  console.log("Catcontract ABI:");
  console.log("\n");
  console.log(abi1);
  console.log("\n");

  // Get GamifyStaking ABI
  const abiFile2 = JSON.parse(
    fs.readFileSync("./hardhat/artifacts/contracts/CatMarketplace.sol/CatMarketplace.json", "utf8")
  );
  const abi2 = JSON.stringify(abiFile2.abi);

  console.log("Marketplace ABI:");
  console.log("\n");
  console.log(abi2);
  console.log("\n");

  /** WAITING:
   ************/
  await marketplace.deployTransaction.wait(7);

  /** VERIFICATION:
   *****************/
  await hre.run("verify:verify", {
    address: catcontract.address,
    constructorArguments: [MAX_CAT_SUPPLY, MAX_GEN_ZERO],
  });

  await hre.run("verify:verify", {
    address: marketplace.address,
    constructorArguments: [catcontract.address],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
