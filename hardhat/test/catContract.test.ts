import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

import { deploy } from "./deploy";

async function deployFixture() {
  const { owner, user1, user2, user3, catContract, catMarketplace, catAddress,
    marketAddress } =
    await deploy();

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

describe("Cat Contract", function () {
  it("should deploy CatContract correctly", async () => {
    const { catContract, catAddress } = await loadFixture(deployFixture);

    expect(catAddress).to.be.a("string");
    catContract;
    expect(catAddress).to.have.lengthOf(42);

    expect(await catContract.name()).to.equal("CryptoCats");
    expect(await catContract.symbol()).to.equal("CTC");
    expect(await catContract.MAX_CAT_SUPPLY()).to.equal(100_000);
    expect(await catContract.CREATION_LIMIT_GEN0()).to.equal(100);
    expect(await catContract.catsSupplyCount()).to.equal(0);
  });
});
