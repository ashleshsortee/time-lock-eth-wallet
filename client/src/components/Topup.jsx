import React, { Component } from 'react';
import Web3 from 'web3';
import walletFactory from '../proxies/WalletFactory';
import Wallet from '../proxies/Wallet';
import tokenInstance from '../proxies/Token';
import renderNotification from '../utils/notification-handler';

let web3;

class Topup extends Component {
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

  onTopUpWallet = async (e) => {
    try {
      e.preventDefault();
      const sender = await web3.eth.getCoinbase();
      const { wallet, ether, token, receiver } = this.state;
      const walletInstance = Wallet(wallet);


      if (ether) {
        await walletInstance.methods.depositEther().send({ from: sender, gas: 670000, value: web3.utils.toWei(ether, 'ether') });
        renderNotification('success', 'Success', `Ether locked successfully!`);
      }

      if (token) {
        await tokenInstance.methods.transfer(wallet, web3.utils.toWei(token, 'ether')).send({ from: sender, gas: 670000 });
        renderNotification('success', 'Success', `Token locked successfully!`);
      }
    } catch (err) {
      renderNotification('danger', 'Error', err.message);
      console.log('console err', err);
    }
  }

  updateWalletsList = async (receiver) => {
    const sender = await web3.eth.getCoinbase();
    const walletList = await walletFactory.methods.getWalletList(receiver).call({ from: sender });

    const renderData = walletList.map((wallet, i) => (
      <option value={wallet} >{wallet}</option>
    ));

    this.setState({ wallets: renderData });
    this.setState({ wallet: walletList[0] });
  }

  receiverChangeHandler = async (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);

    // update the list of wallets
    const { receiver } = this.state;
    this.updateWalletsList(receiver);
  }

  inputChangedHandler = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  selectHandler = (e) => {
    this.setState({ wallet: e.target.value });
  }

  render() {
    return (

      <div class="container center" >

        <div class="row">
          < div class="container" >
            <div class="container">
              <h5 style={{ padding: "30px 0px 0px 10px" }}>Topup Wallet</h5>
              <form class="" onSubmit={this.onTopUpWallet}>
                <label class="left">Beneficiary Address</label><input id="receiver" placeholder="Receiver Address" type="text" class="validate" name="receiver" onChange={this.receiverChangeHandler} /><br /><br />
                <label class="left">Wallet Address</label><select className="browser-default" value={this.state.wallet || this.state.wallets[0]} onChange={this.selectHandler}>
                  <option value="" disabled selected>Select wallet</option>
                  {this.state.wallets}
                </select><br /><br />

                <label class="left">Ether Amount</label><input id="ether" placeholder="Ether Amount" type="text" className="input-control" name="ether" onChange={this.inputChangedHandler} /><br /><br />
                <label class="left">ASH Token</label><input id="token" placeholder="ASH Token Amount" type="text" className="input-control" name="token" onChange={this.inputChangedHandler} /><br /><br />

                <button type="submit" className="custom-btn login-btn">Topup Wallet</button>
              </form>

            </div >
          </div>
        </div >

      </div >

    )
  }
}

export default Topup;  