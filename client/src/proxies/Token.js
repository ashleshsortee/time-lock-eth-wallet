import Provider from './Provider';
import AshToken from '../build/AshToken.json';

const provider = new Provider();

class Token {
  constructor() {
    const web3 = provider.web3;
    const deploymentKey = Object.keys(AshToken.networks)[0];

    this.instance = new web3.eth.Contract(
      AshToken.abi,
      AshToken.networks[deploymentKey].address,
    );
  }

  getInstance = () => this.instance;
}

const token = new Token();
Object.freeze(token);

export default token.getInstance();