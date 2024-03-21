import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyUint } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { ethers } from "hardhat";
import { expect } from "chai";

import { deploy } from "./deploy";
import { dna } from "./constants";
import { CatContract } from "../typechain-types";

async function deployFixture() {
  const { owner, user1, user2, catContract, catAddress } = await deploy();

  return {
    owner,
    user1,
    user2,
    catContract,
    catAddress,
  };
}

describe("Cat Contract", function () {
  it("should deploy CatContract correctly", async () => {
    const { catContract, catAddress } = await loadFixture(deployFixture);

    expect(catAddress).to.be.a("string");
    expect(catAddress).to.have.lengthOf(42);

    expect(await catContract.name()).to.equal("CryptoCats");
    expect(await catContract.symbol()).to.equal("CTC");
    expect(await catContract.MAX_CAT_SUPPLY()).to.equal(100_000);
    expect(await catContract.CREATION_LIMIT_GEN0()).to.equal(100);
    expect(await catContract.gen0Count()).to.equal(0);
    expect(await catContract.catsSupplyCount()).to.equal(0);
  });

  it("should be possible to mint a cat gen0", async () => {
    const { catContract, user1, user2 } = await loadFixture(deployFixture);

    await expect(catContract.connect(user1).createCatGen0(dna.default))
      .to.emit(catContract, "Birth")
      .withArgs(user1.address, 0, 0, 0, dna.default);
    const blockNum = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNum);
    const timestamp = block?.timestamp ?? 0;

    expect(await catContract.gen0Count()).to.equal(1);
    expect(await catContract.catsSupplyCount()).to.equal(1);
    expect(await catContract.ownerOf(0)).to.equal(user1.address);

    expect(await catContract.getCat(0)).to.deep.equal([
      0n,
      0n,
      0n,
      0n,
      BigInt(timestamp),
      BigInt(dna.default),
    ]);

    await expect(catContract.connect(user2).createCatGen0(dna.cat1))
      .to.emit(catContract, "Birth")
      .withArgs(user2.address, 1, 0, 0, dna.cat1);
    await expect(catContract.connect(user2).createCatGen0(dna.cat2))
      .to.emit(catContract, "Birth")
      .withArgs(user2.address, 2, 0, 0, dna.cat2);
    expect(await catContract.gen0Count()).to.equal(3);
    expect(await catContract.catsSupplyCount()).to.equal(3);
    expect(await catContract.ownerOf(2)).to.equal(user2.address);
  });

  it("should not be possible to breed some cats in some cases...", async () => {
    const { catContract, user1, user2 } = await loadFixture(deployFixture);

    await expect(catContract.connect(user1).createCatGen0(dna.cat1))
      .to.emit(catContract, "Birth")
      .withArgs(user1.address, 0, 0, 0, dna.cat1);
    await expect(catContract.connect(user1).createCatGen0(dna.cat2))
      .to.emit(catContract, "Birth")
      .withArgs(user1.address, 1, 0, 0, dna.cat2);

    await expect(
      catContract.connect(user2).breed(0, 1)
    ).to.be.revertedWithCustomError(catContract, "CatContract__NotOwned");

    await expect(
      catContract.connect(user1).breed(0, 0)
    ).to.be.revertedWithCustomError(
      catContract,
      "CatContract__SameCatSelected"
    );
  });

  it("should be possible to breed some cats", async () => {
    const { catContract, user1 } = await loadFixture(deployFixture);

    await expect(catContract.connect(user1).createCatGen0(dna.cat1))
      .to.emit(catContract, "Birth")
      .withArgs(user1.address, 0, 0, 0, dna.cat1);
    await expect(catContract.connect(user1).createCatGen0(dna.cat2))
      .to.emit(catContract, "Birth")
      .withArgs(user1.address, 1, 0, 0, dna.cat2);

    await expect(catContract.connect(user1).breed(0, 1))
      .to.emit(catContract, "Birth")
      .withArgs(user1.address, 2, 0, 1, anyUint);
  });

  it("should not be possible to get a non-existent cat", async () => {
    const { catContract } = await loadFixture(deployFixture);

    await expect(catContract.getCat(0)).to.be.revertedWithCustomError(
      catContract,
      "CatContract__NonExistentCat"
    );
  });

  it("should get all cats per owner", async () => {
    const { catContract, user1 } = await loadFixture(deployFixture);

    for (let i = 0; i < 10; i++) {
      await catContract.connect(user1).createCatGen0(dna.default);
    }
    expect(await catContract.gen0Count()).to.equal(10);
    expect(await catContract.catsSupplyCount()).to.equal(10);

    const catsPerOwner = await catContract.getCatPerOwner(user1.address);

    expect(catsPerOwner).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(catsPerOwner.length).to.equal(10);
  });

  it("should breed cats per generation correctly", async () => {
    const { catContract, user1 } = await loadFixture(deployFixture);

    await catContract.connect(user1).createCatGen0(dna.cat1);
    await catContract.connect(user1).createCatGen0(dna.cat2);

    for (let i = 0; i < 10; i++) {
      await catContract.connect(user1).breed(0, 1);
    }
    expect(await catContract.gen0Count()).to.equal(2);
    expect(await catContract.catsSupplyCount()).to.equal(12);

    for (let i = 0; i < 10; i++) {
      await catContract.connect(user1).breed(2 + i, 3 + i);
    }
    expect(await catContract.gen0Count()).to.equal(2);
    expect(await catContract.catsSupplyCount()).to.equal(22);

    const cat1 = await catContract.getCat(1);
    expect(cat1.generation).to.equal(0);
    expect(cat1.indexId).to.equal(1);
    expect(cat1.mumId).to.equal(0);
    expect(cat1.dadId).to.equal(0);
    expect(cat1.genes).to.equal(dna.cat2);

    const cat5 = await catContract.getCat(5);
    expect(cat5.generation).to.equal(1);
    expect(cat5.indexId).to.equal(5);
    expect(cat5.mumId).to.equal(1);
    expect(cat5.dadId).to.equal(0);

    const cat18 = await catContract.getCat(18);
    expect(cat18.generation).to.equal(2);
    expect(cat18.indexId).to.equal(18);
    expect(cat18.mumId).to.equal(9);
    expect(cat18.dadId).to.equal(8);

    await catContract.connect(user1).breed(18, 1);
    const cat22 = await catContract.getCat(22);
    expect(cat22.generation).to.equal(3);
  });

  it("should not create more than max gen0 limit", async () => {
    const maxCatSupply = 100;
    const maxGenZero = 5;

    const CatContract = await ethers.getContractFactory("CatContract");
    const catContract: CatContract = await CatContract.deploy(
      maxCatSupply,
      maxGenZero
    );
    await catContract.waitForDeployment();

    for (let i = 0; i < 5; i++) {
      await catContract.createCatGen0(dna.default);
    }

    await expect(
      catContract.createCatGen0(dna.default)
    ).to.be.revertedWithCustomError(
      catContract,
      "CatContract__NoMoreGen0Available"
    );
  });

  it("should return 0 directly if owner doesn't own cat", async () => {
    const { catContract, user1 } = await loadFixture(deployFixture);

    for (let i = 0; i < 5; i++) {
      await catContract.createCatGen0(dna.default);
    }

    expect(await catContract.getCatPerOwner(user1.address)).to.deep.equal([]);
  });

  it("should correctly check the ownership in the getCatPerOwner function", async () => {
    const { catContract, user1, user2 } = await loadFixture(deployFixture);

    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        await catContract.connect(user1).createCatGen0(dna.cat1);
      } else {
        await catContract.connect(user2).createCatGen0(dna.cat2);
      }
    }

    expect(await catContract.getCatPerOwner(user1.address)).to.deep.equal([
      0, 2, 4, 6, 8,
    ]);
    expect(await catContract.getCatPerOwner(user2.address)).to.deep.equal([
      1, 3, 5, 7, 9,
    ]);
  });
});
