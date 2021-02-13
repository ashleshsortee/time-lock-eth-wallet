import Provider from './Provider';
// import WalletContract from '../build/TimeLockedWallet.json';
import walletABI from '../constants';

const provider = new Provider();

const Wallet = (contractAddress) => {
  const web3 = provider.web3;

  return new web3.eth.Contract(walletABI, contractAddress);
};

export default Wallet;