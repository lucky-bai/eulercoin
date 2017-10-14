//var Adoption = artifacts.require("./Adoption.sol");
var EulerCoin = artifacts.require("./EulerCoin.sol");

module.exports = function(deployer) {
  //deployer.deploy(Adoption);
  deployer.deploy(EulerCoin);
};
