import Provider from './Provider';
import Token from '../build/AshToken.json';

const provider = new Provider();

const WalletFactory = (() => {
  const web3 = provider.web3;
  const deploymentKey = Object.keys(Token.networks)[0];
  return new web3.eth.Contract(
    Token.abi,
    Token.networks[deploymentKey].address,
  );
})();

export default WalletFactory;