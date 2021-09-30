const Token = artifacts.require("./Catcontract.sol");

module.exports = function (deployer) {
  deployer.deploy(Token, "CryptoCat", "CTC", 1000000, 10000);
};
