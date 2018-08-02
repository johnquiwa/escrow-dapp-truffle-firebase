import EscrowContract from '../../build/contracts/Escrow.json'
import store from '../store'
import firebase from '../util/firebase'

const contract = require('truffle-contract');

export function createContract() {
  let web3 = store.getState().web3.web3Instance;
  let contractForm = store.getState().form.ContractCreateForm.values;
  let userWalletAddress = store.getState().user.data.userWalletAddress;

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    console.log('wev3', web3);

    return async function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const accounts = await web3.eth.getAccounts();
      const escrowContract = contract(EscrowContract);
      escrowContract.setProvider(web3.currentProvider);
      escrowContract.defaults({from: accounts[0]});
      return escrowContract.new(contractForm.ethPrice, contractForm.clientAddress)     
        .then(function(instance) {
          const updates = {};

          updates[`contracts/${instance.address}`] = {
            creator: userWalletAddress,
            client: contractForm.clientAddress,
            ethPrice: contractForm.ethPrice,
            txHash: instance.transactionHash
          };

          updates[`users/${contractForm.clientAddress}/contracts/${instance.address}`] = {
            role: 'client'
          };

          updates[`users/${userWalletAddress}/contracts/${instance.address}`] = {
            role: 'creator'
          };

          return firebase.database.ref().update(updates);
        })
        .then(() => {
          return dispatch({type: 'MODAL_CLOSED'})
        })
        .catch(err => {
          console.log('err', JSON.stringify(err));
          return err;
        })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
