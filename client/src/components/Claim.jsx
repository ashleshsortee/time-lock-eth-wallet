import React, { Component } from 'react';
import Web3 from 'web3';
import WalletFactory from '../proxies/WalletFactory';
import Wallet from '../proxies/Wallet';
import renderNotification from '../utils/notification-handler';

let web3;

class Claim extends Component {
  constructor() {
    super();
    this.state = {
      receiver: null,
      wallets: [],
      wallet: null,
      ether: 0,
      token: 0,
    };

    web3 = new Web3(window.ethereum);
  }

  async componentDidMount() {
    await this.updateWallets();
  }

  async onWithdrawEther(walletInstance, sender) {
    try {
      const result = await walletInstance.methods.releaseEther().send({ from: sender });
      await this.updateWallets();
      renderNotification('success', 'Success', `Ether deposited successfully!`);
    } catch (err) {
      renderNotification('danger', 'Error', err.message.split(' ').slice(8).join(' '));
    }
  }
  async onWithdrawToken(walletInstance, sender) {
    try {
      const result = await walletInstance.methods.releaseToken().send({ from: sender });
      await this.updateWallets();

      renderNotification('success', 'Success', `Token deposited successfully!`);
    } catch (err) {
      renderNotification('danger', 'Error', err.message.split(' ').slice(9).join(' '));
    }
  }

  async updateWallets() {
    try {
      const sender = await web3.eth.getCoinbase();
      const walletList = await WalletFactory.methods.getWalletList(sender).call({ from: sender });

      const renderData = await Promise.all(walletList.map(async wallet => {
        const walletInstance = Wallet(wallet);
        const walletDetails = await walletInstance.methods.getWalletDetails().call({ from: sender });
        const [beneficiary, creator, releaseTime, createdTime, etherAmount, tokenAmount] = Object.values(walletDetails);
        const eth = web3.utils.fromWei(etherAmount, 'ether');
        const ashToken = web3.utils.fromWei(tokenAmount, 'ether');
        const releaseDateTime = new Date(releaseTime * 1000).toLocaleString();
        const createdDateTime = new Date(createdTime * 1000).toLocaleString();

        return (
          <tr key={wallet}>
            <td class="center">{wallet}</td>
            <td class="center">{creator}</td>
            <td class="center">{createdDateTime}</td>
            <td class="center">{releaseDateTime}</td>
            <td class="center">{eth}</td>
            <td class="center">{ashToken}</td>

            <td class="center"><button type="submit" className="custom-btn login-btn" onClick={this.onWithdrawEther.bind(this, walletInstance, sender)}>Withdraw Ether</button></td>
            <td class="center"><button type="submit" className="custom-btn login-btn" onClick={this.onWithdrawToken.bind(this, walletInstance, sender)}>Withdraw Token</button></td>
          </tr>
        );
      }
      ));

      this.setState({ wallets: renderData });
      this.setState({ wallet: walletList[0] });
    } catch (e) {
      console.log('console err', e, e.reason);
    }
  }

  render() {
    return (

      <div class="container " class="col s12 m6 offset-m3 l4 offset-l4 z-depth-6 card-panel">

        <h4 class="center">Claim Funds</h4>

        <table id='requests' class="responsive-table striped" >
          <thead>
            <tr>
              <th key='wallet' class="center">Wallet</th>
              <th key='from' class="center">From</th>
              <th key='age' class="center">Created Time</th>
              <th key='unlockin' class="center">Release Time</th>
              <th key='ether' class="center">Ether</th>
              <th key='token' class="center">ASH Token</th>
              <th key='withdrawEther' class="center">Withdraw Ether</th>
              <th key='withdrawToken' class="center">Withdraw Token</th>
            </tr>
          </thead>
          <tbody class="striped highlight">
            {this.state.wallets}
          </tbody>
        </table>

      </div >

    )
  }
}

export default Claim;  