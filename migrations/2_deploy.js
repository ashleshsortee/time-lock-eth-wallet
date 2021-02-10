const AshToken = artifacts.require("AshToken");
const TimeLockWalletFactory = artifacts.require("TimeLockWalletFactory");

module.exports = function (deployer) {
  deployer.deploy(AshToken);
  deployer.deploy(TimeLockWalletFactory);
};
