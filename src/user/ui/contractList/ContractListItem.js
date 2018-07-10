import React, {Component} from 'react'
import EscrowContract from '../../../../build/contracts/Escrow.json';
import ContractInfoView from './ContractInfoModal';
import {BigNumber} from 'bignumber.js';

const contract = require('truffle-contract');


class ContractListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open : false,
      bigNumStage : null,
      bigNumFundingAmount : new BigNumber(0),
      previewUrl: null,
      clickedContract : {
        contributeFunding : null
      }
    }
  }

  handleCloseModal () {
    this.setState({ 'open' : false});
  }

  async handleClickContract(contractAddress) {
    this.setState({ 'open' : true, bigNumFundingAmount : new BigNumber(0)});

    const escrowContract = contract(EscrowContract);
    escrowContract.setProvider(this.props.web3Instance.currentProvider);
    escrowContract.defaults({from: this.props.web3Instance.eth.coinbase});

    // Get Contract
    const clickedContract = escrowContract.at(contractAddress);

    // Get Events
    const contributeEvent = clickedContract.Contribute({_from:this.props.web3Instance.eth.coinbase},{fromBlock: 0, toBlock: 'latest'});
    const stageEvent = clickedContract.Stage({_from:this.props.web3Instance.eth.coinbase},{fromBlock: 0, toBlock: 'latest'});
    const setPreviewUrlEvent = clickedContract.SetPreviewUrl({_from:this.props.web3Instance.eth.coinbase},{fromBlock: 0, toBlock: 'latest'});


    // Create Event Waters
    contributeEvent.watch((error, result) => {
      if (!error)
        console.log('contrib', result);
      this.setState({bigNumFundingAmount: this.state.bigNumFundingAmount.plus(result.args._value)})
    });


    stageEvent.watch((error, result) => {
      if (!error) {
        console.log('stage', result);
        this.setState({bigNumStage : result.args._value})
      } else {
        console.log(error);
      }
    });

    setPreviewUrlEvent.watch((error, result) => {
      if (!error) {
        console.log('stage', result);
        this.setState({previewUrl : result.args._value})
      } else {
        console.log(error);
      }
    });

    const stage = await clickedContract.stage();
    const bigNumStage = new BigNumber(stage);

    this.setState({
        bigNumStage,
        clickedContract,
        contractAddress: contractAddress
    });
  }

  handleContributeFunding(contributionAmount) {
    const escrowContract = contract(EscrowContract);
    escrowContract.setProvider(this.props.web3Instance.currentProvider);
    escrowContract.defaults({from: this.props.web3Instance.eth.coinbase});

    const clickedContract = escrowContract.at(this.state.contractAddress);
    clickedContract.contributeFunding({value: contributionAmount, from: this.props.web3Instance.eth.coinbase});
  }

  handleSetPreviewUrl(previewUrl) {
    const escrowContract = contract(EscrowContract);
    escrowContract.setProvider(this.props.web3Instance.currentProvider);
    escrowContract.defaults({from: this.props.web3Instance.eth.coinbase});

    const clickedContract = escrowContract.at(this.state.contractAddress);
    clickedContract.setPreviewMessage(previewUrl);
  }

  renderContractInfoView(contract) {
    if (contract.contributeFunding) {
      return (
        <ContractInfoView contract={this.state}
                          handleCloseModal={this.handleCloseModal.bind(this)}
                          handleContributeFunding={this.handleContributeFunding.bind(this)}
                          handleSetPreviewUrl={this.handleSetPreviewUrl.bind(this)}
                          open={this.state.open}
        />
      )
    }
    return null;
  }

  render() {
    return (
      <ul>
        {
          this.props.contractList.map(contract => {
            return <li key={contract.contract} onClick={() => this.handleClickContract(contract.contract)}>{contract.contract}</li>
          })
        }
          {this.renderContractInfoView(this.state.clickedContract)}
      </ul>
    )
  }
}

export default ContractListItem
