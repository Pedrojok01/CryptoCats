const Token = artifacts.require("./Catcontract.sol");

module.exports = function (deployer) {
  deployer.deploy(Token, 1000000, 50);
};
