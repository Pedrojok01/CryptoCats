import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ZeroAddress } from "ethers";

import { deploy } from "./deploy";
import { dna } from "./constants";

async function deployFixture() {
  const {
    owner,
    user1,
    user2,
    catContract,
    catMarketplace,
    catAddress,
    marketAddress,
  } = await deploy();

  await catContract.connect(user1).createCatGen0(dna.cat1);
  await catContract.connect(user1).createCatGen0(dna.cat2);

  await catContract.connect(user2).createCatGen0(dna.cat1);
  await catContract.connect(user2).createCatGen0(dna.cat2);

  for (let i = 0; i < 5; i++) {
    await catContract.connect(user1).breed(0, 1);
  }
  for (let i = 0; i < 5; i++) {
    await catContract.connect(user2).breed(3, 2);
  }
  expect(await catContract.catsSupplyCount()).to.equal(14);

  return {
    owner,
    user1,
    user2,
    catContract,
    catMarketplace,
    catAddress,
    marketAddress,
  };
}

describe("Cat Marketplace", function () {
  it("should deploy CatMarketplace correctly", async () => {
    const { catMarketplace, marketAddress } = await loadFixture(deployFixture);

    expect(marketAddress).to.be.a("string");
    expect(marketAddress).to.have.lengthOf(42);

    expect(await catMarketplace.getAllTokenOnSale()).to.deep.equal([]);
  });

  it("should set an offer correctly", async () => {
    const { catMarketplace, marketAddress, catContract, user1 } =
      await loadFixture(deployFixture);

    const price = 1;
    const tokenIdToSell = 4;
    const wrongCatId = 3;

    await catContract.connect(user1).setApprovalForAll(marketAddress, true);

    await expect(
      catMarketplace.connect(user1).setOffer(price, wrongCatId)
    ).to.be.revertedWithCustomError(
      catMarketplace,
      "CatMarketplace__CatNotOwned"
    );

    await expect(catMarketplace.connect(user1).setOffer(price, tokenIdToSell))
      .to.emit(catMarketplace, "MarketTransaction")
      .withArgs("Create offer", user1.address, tokenIdToSell);

    const offer = await catMarketplace.getOffer(tokenIdToSell);
    expect(offer).to.deep.equal([user1.address, price, 0n, tokenIdToSell]);

    await expect(
      catMarketplace.connect(user1).setOffer(price, tokenIdToSell)
    ).to.be.revertedWithCustomError(
      catMarketplace,
      "CatMarketplace__AlreadyOnSale"
    );
  });

  it("should remove an offer correctly", async () => {
    const { catMarketplace, marketAddress, catContract, user1, user2 } =
      await loadFixture(deployFixture);

    const price = 1;
    const tokenIdToSell = 4;

    await catContract.connect(user1).setApprovalForAll(marketAddress, true);

    for (let i = 0; i < 3; i++) {
      await catMarketplace
        .connect(user1)
        .setOffer(price + i, tokenIdToSell + i);
    }

    const offer1 = await catMarketplace.getOffer(tokenIdToSell);
    expect(offer1).to.deep.equal([user1.address, price, 0n, tokenIdToSell]);

    const offer2 = await catMarketplace.getOffer(tokenIdToSell + 1);
    expect(offer2).to.deep.equal([
      user1.address,
      price + 1,
      1n,
      tokenIdToSell + 1,
    ]);

    const offer3 = await catMarketplace.getOffer(tokenIdToSell + 2);
    expect(offer3).to.deep.equal([
      user1.address,
      price + 2,
      2n,
      tokenIdToSell + 2,
    ]);

    const tokenIdToRemove = tokenIdToSell + 1;

    await expect(
      catMarketplace.connect(user2).removeOffer(tokenIdToRemove)
    ).to.be.revertedWithCustomError(
      catMarketplace,
      "CatMarketplace__CatNotOwned"
    );

    await expect(catMarketplace.connect(user1).removeOffer(tokenIdToRemove))
      .to.emit(catMarketplace, "MarketTransaction")
      .withArgs("Cancel offer", user1.address, tokenIdToRemove);

    await expect(
      catMarketplace.connect(user1).removeOffer(tokenIdToRemove)
    ).to.be.revertedWithCustomError(
      catMarketplace,
      "CatMarketplace__NoOfferForThisCat"
    );

    expect(await catMarketplace.getOffer(tokenIdToRemove)).to.deep.equal([
      ZeroAddress,
      0,
      0,
      0,
    ]);
  });

  it("should buy an offer correctly", async () => {
    const { catMarketplace, marketAddress, catContract, user1, user2 } =
      await loadFixture(deployFixture);

    const sellPrice = 1;
    const tokenIdToSell = 4;

    await catContract.connect(user1).setApprovalForAll(marketAddress, true);

    for (let i = 0; i < 3; i++) {
      await catMarketplace
        .connect(user1)
        .setOffer(sellPrice + i, tokenIdToSell + i);
    }

    const tokenIdToBuy = tokenIdToSell + 2;
    const buyPrice = sellPrice + 2;
    const wrongCatId = tokenIdToBuy + 8;
    const wrongPrice = buyPrice + 18;

    await expect(
      catMarketplace.connect(user1).buyCat(tokenIdToBuy, {
        value: buyPrice,
      })
    ).to.be.revertedWithCustomError(
      catMarketplace,
      "CatMarketplace__CatAlreadyOwned"
    );

    await expect(
      catMarketplace.connect(user2).buyCat(wrongCatId, {
        value: buyPrice,
      })
    ).to.be.revertedWithCustomError(
      catMarketplace,
      "CatMarketplace__NotOnSale"
    );

    await expect(
      catMarketplace.connect(user2).buyCat(tokenIdToBuy, {
        value: wrongPrice,
      })
    ).to.be.revertedWithCustomError(
      catMarketplace,
      "CatMarketplace__InvalidPrice"
    );

    await expect(
      catMarketplace.connect(user2).buyCat(tokenIdToBuy, {
        value: buyPrice,
      })
    )
      .to.emit(catMarketplace, "MarketTransaction")
      .withArgs("Buy", user2.address, tokenIdToBuy);
  });

  it("should only be possible for the owner to edit the cat contract address", async () => {
    const { catMarketplace, catAddress, user1 } =
      await loadFixture(deployFixture);

    await expect(
      catMarketplace.connect(user1).setCatContract(user1.address)
    ).to.be.revertedWithCustomError(
      catMarketplace,
      "OwnableUnauthorizedAccount"
    );

    await expect(catMarketplace.setCatContract(user1.address))
      .to.emit(catMarketplace, "CatAddressUpdated")
      .withArgs(catAddress, user1.address);
  });
});
