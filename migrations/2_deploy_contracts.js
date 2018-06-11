const Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
const Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
const Authentication = artifacts.require("./Authentication.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Authentication);
  deployer.deploy(Authentication);
};
