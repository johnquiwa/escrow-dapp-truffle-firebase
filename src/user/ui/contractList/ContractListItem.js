import React, {Component} from 'react'
import EscrowContract from '../../../../build/contracts/Escrow.json';
import ContractInfoView from './ContractInfoModal';
import {BigNumber} from 'bignumber.js';
import ipfs from '../../../util/ipfs';

const contract = require('truffle-contract');


class ContractListItem extends Component {
  constructor(props) {
    super(props)

    console.log(this.props.web3Instance.utils.toAscii('0x516d5a446f345a7669614d706a4e4b3365666b4b767a6a59556d423242616b6a45674773515678784d5172636263'))

    this.state = {
      open : false,
      bigNumStage : null,
      bigNumFundingAmount : new BigNumber(0),
      previewUrl: null,
      accounts: [],
      clickedContract : {
        contributeFunding : null,
        setPreviewMessage : null
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
    escrowContract.defaults({from: this.state.accounts[0]});

    // Get Contract
    const clickedContract = escrowContract.at(contractAddress);

    // Get Events
    const contributeEvent = clickedContract.Contribute({_from:this.state.accounts[0]},{fromBlock: 0, toBlock: 'latest'});
    const stageEvent = clickedContract.Stage({_from:this.state.accounts[0]},{fromBlock: 0, toBlock: 'latest'});
    const setPreviewUrlEvent = clickedContract.SetPreviewUrl({_from:this.state.accounts[0]},{fromBlock: 0, toBlock: 'latest'});


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
        console.log('url', result);
        this.setState({previewUrl : this.props.web3Instance.utils.toUtf8(result.args._partOne) + this.props.web3Instance.utils.toUtf8(result.args._partTwo)})
      } else {
        console.log(error);
      }
    });

    const stage = await clickedContract.stage();
    const bigNumStage = new BigNumber(stage);

    const accounts = await this.props.web3Instance.eth.getAccounts();
    this.setState({
        bigNumStage,
        clickedContract,
        accounts,
        contractAddress: contractAddress,
    });
  }

  handleContributeFunding(contributionAmount) {
    const escrowContract = contract(EscrowContract);
    escrowContract.setProvider(this.props.web3Instance.currentProvider);
    escrowContract.defaults({from: this.state.accounts[0]});

    const clickedContract = escrowContract.at(this.state.contractAddress);
    clickedContract.contributeFunding({value: contributionAmount, from: this.state.accounts[0]});
  }

  handleSetPreviewUrl = async (previewUrl) => {
    console.log(this.state.accounts[0]);
    const escrowContract = contract(EscrowContract);
    escrowContract.setProvider(this.props.web3Instance.currentProvider);
    escrowContract.defaults({from: this.state.accounts[0]});

    await ipfs.add(previewUrl, (err, ipfsHash) => {
      console.log(err,ipfsHash);
      console.log(this.props.web3Instance);
      const hashArray = ipfsHash[0].hash.split('');
      const partOne = hashArray.slice(0, (hashArray.length - 1)/2).join('');
      const partTwo = hashArray.slice((hashArray.length - 1)/2).join('');

      const clickedContract = escrowContract.at(this.state.contractAddress);
      clickedContract.setPreviewMessage(partOne, partTwo);
    });
  };

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
