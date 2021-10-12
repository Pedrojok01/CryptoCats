const Catcontract = artifacts.require("./Catcontract.sol");
const Marketplace = artifacts.require("./CatMarketPlace.sol");

module.exports = function (deployer) {
  const catContractAddr = Catcontract.address;
  deployer.deploy(Marketplace, catContractAddr);
};
