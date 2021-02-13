import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import Web3 from 'web3';
import Create from "./components/Create";
import Topup from "./components/Topup";
import Claim from "./components/Claim";

class App extends Component {

  constructor() {
    super();
    new Promise((resolve, reject) => {
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable()
          .then(() => {
            resolve(
              new Web3(window.ethereum)
            );
          })
          .catch(e => {
            reject(e);
          });
        return;
      }
      if (typeof window.web3 !== 'undefined') {
        return resolve(
          new Web3(window.web3.currentProvider)
        );
      }
      resolve(new Web3('http://localhost:8545'));
    });
  }

  render() {
    return (
      <Router>
        {/* {this.initWeb3()} */}
        <div >
          <ReactNotification />
          <nav style={{ padding: '0px 30px 0px 30px' }}>
            <div class="nav-wrapper" >
              <a href="/create" class="brand-logo left">Time Locked Wallet</a>
              <ul class="right hide-on-med-and-down 10" >
                <div>
                  <li> <Link to="/create">Create Wallet</Link> </li>
                  <li> <Link to="/topup">Topup Wallet</Link></li>
                  <li><Link to="/claim">Claim Funds</Link></li>
                  <li >
                  </li>
                </div>

              </ul>
            </div>
          </nav>

          <Switch>
            <Route path="/create" component={Create} />
            <Route path="/topup" component={Topup} />
            <Route path="/claim" component={Claim} />
          </Switch>
        </div>
      </Router >
    )
  }
}

export default App;
