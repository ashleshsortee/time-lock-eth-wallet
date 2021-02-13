import Provider from './Provider';
import WalletFactoryContract from '../build/TimeLockWalletFactory.json';

const provider = new Provider();

class WalletFactory {
  constructor() {
    const web3 = provider.web3;
    const deploymentKey = Object.keys(WalletFactoryContract.networks)[0];

    this.instance = new web3.eth.Contract(
      WalletFactoryContract.abi,
      WalletFactoryContract.networks[deploymentKey].address,
    );
  }

  getInstance = () => this.instance;

}

const walletFactory = new WalletFactory();
Object.freeze(walletFactory);

export default walletFactory.getInstance();