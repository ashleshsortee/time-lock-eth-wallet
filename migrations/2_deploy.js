const AshToken = artifacts.require("AshToken");
const TimeLockWalletFactory = artifacts.require("TimeLockWalletFactory");
const TimeLockWallet = artifacts.require("TimeLockWallet");

module.exports = function (deployer) {
  deployer.deploy(AshToken);
  deployer.deploy(TimeLockWallet).then((timeLockWallet) => deployer.deploy(TimeLockWalletFactory, timeLockWallet.address));
};
