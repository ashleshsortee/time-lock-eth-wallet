import Provider from './Provider';
import WalletFactoryContract from '../build/TimeLockWalletFactory.json';

const provider = new Provider();

// class WalletFactory {
//   constructor() {
//     this.web3 = provider.web3;
//   }

//   initContract() {
//     const deploymentKey = Object.keys(WalletFactoryContract.networks)[0];
//     return new this.web3.eth.Contract(
//       WalletFactoryContract.abi,
//       WalletFactoryContract.networks[deploymentKey].address,
//     );
//   }
// }

const WalletFactory = (() => {
  const web3 = provider.web3;
  const deploymentKey = Object.keys(WalletFactoryContract.networks)[0];
  return new web3.eth.Contract(
    WalletFactoryContract.abi,
    WalletFactoryContract.networks[deploymentKey].address,
  );
})();

export default WalletFactory;