var Sube = artifacts.require("./Sube.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Sube, accounts[0], accounts[1], accounts[2]);
};
