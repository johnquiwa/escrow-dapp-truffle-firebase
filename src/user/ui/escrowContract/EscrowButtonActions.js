import EscrowContract from '../../../../build/contracts/Escrow.json'
import store from '../../../store'
import firebase from '../../../util/firebase'
import { closeModal } from '../../../ducks/contractModal';

const contract = require('truffle-contract');

export const USER_LOGGED_IN = 'USER_LOGGED_IN'

export function createContract() {
  let web3 = store.getState().web3.web3Instance;
  let contractForm = store.getState().form.ContractCreateForm.values;
  let userWalletAddress = store.getState().user.data.userWalletAddress;

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    console.log('wev3', web3);

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const escrowContract = contract(EscrowContract);
      escrowContract.setProvider(web3.currentProvider);
      escrowContract.defaults({from: web3.eth.coinbase});
      return escrowContract.new(contractForm.ethPrice, contractForm.clientAddress)     
        .then(function(instance) {
          const updates = {};

          updates[`contracts/${instance.address}`] = {
            creator: userWalletAddress,
            client: contractForm.clientAddress,
            ethPrice: contractForm.ethPrice,
            txHash: instance.transactionHash
          }

          updates[`users/${contractForm.clientAddress}/contracts/${instance.address}`] = {
            role: 'client'
          }

          updates[`users/${userWalletAddress}/contracts/${instance.address}`] = {
            role: 'creator'
          }

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

// escrowContract.new("10000000", "0xf17f52151ebef6c7334fad080c5704d77216b732")     