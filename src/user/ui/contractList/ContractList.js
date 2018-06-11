import React, { Component } from 'react'
import firebase  from 'firebase'
import ContractListItem  from './ContractListItem'
import EscrowContract from '../../../../build/contracts/Escrow.json'
import {BigNumber} from 'bignumber.js';

const contract = require('truffle-contract');

class ContractList extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      contractList: []
    }
  }
  
  componentDidMount() {
    const rootRef = firebase.database().ref().child('contracts')
    rootRef.on('child_added', snapshot => {
      const newContract = {
        contract: snapshot.key
      }
      this.setState(previousState => {
        return { contractList: [ ...previousState.contractList, newContract] }
      })
    })
  }

  async handleClickContract(contractAddress) {
    const escrowContract = contract(EscrowContract);
    escrowContract.setProvider(this.props.web3Instance.currentProvider);
    escrowContract.defaults({from: this.props.web3Instance.eth.coinbase});

    const clickedContract = escrowContract.at(contractAddress);
    console.log(clickedContract);

    const fundingAmount = await clickedContract.getFundingAmount();
    const bigNumFundingAmount = new BigNumber(fundingAmount);
    console.log(bigNumFundingAmount);
    console.log(bigNumFundingAmount.toString());

    //const previewMessage = await clickedContract.getPreviewMessage();
    //console.log(previewMessage);
    const stage = await clickedContract.stage();
    console.log(stage);
    const bigNumStage = new BigNumber(stage);
    console.log('stage', bigNumStage.toString());
  }

  render() {
    return(
      <ContractListItem contractList={this.state.contractList} handleClickContract={this.handleClickContract.bind(this)}/>
    )
  }
}

export default ContractList
